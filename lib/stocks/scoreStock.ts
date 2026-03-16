import { toDisplayPercent } from "@/lib/stocks/metricHelpers";
import type { FinancialYear, RatiosTtm, ScoreBreakdown, StockQuote } from "@/lib/stocks/types";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function round(value: number) {
  return Math.round(value);
}

function growthRate(current?: number, previous?: number) {
  if (current === undefined || previous === undefined || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function scoreGrowth(financials: FinancialYear[]) {
  const latest = financials[0];
  const previous = financials[1];
  const revenueGrowth = growthRate(latest?.revenue, previous?.revenue);
  const epsGrowth = growthRate(latest?.eps, previous?.eps);

  let score = 10;
  if (revenueGrowth !== null) score += clamp(revenueGrowth / 3, -5, 6);
  if (epsGrowth !== null) score += clamp(epsGrowth / 4, -5, 6);
  if ((latest?.operatingIncome ?? 0) > 0 && (previous?.operatingIncome ?? 0) > 0) score += 2;

  return clamp(round(score), 0, 20);
}

function scoreProfitability(ratios?: RatiosTtm | null) {
  let score = 0;
  const opMargin = toDisplayPercent(ratios?.operatingProfitMarginTTM) ?? 0;
  const netMargin = toDisplayPercent(ratios?.netProfitMarginTTM) ?? 0;
  const roe = toDisplayPercent(ratios?.returnOnEquityTTM, "roe") ?? 0;

  score += clamp(opMargin / 2.5, 0, 8);
  score += clamp(netMargin / 3, 0, 5);
  score += clamp(roe / 4, 0, 7);

  return clamp(round(score), 0, 20);
}

function scoreStability(financials: FinancialYear[], ratios?: RatiosTtm | null) {
  const latest = financials[0];
  const equity = latest?.totalEquity ?? 0;
  const liabilities = latest?.totalLiabilities ?? 0;
  const fcfPositiveYears = financials.filter((item) => (item.freeCashFlow ?? 0) > 0).length;
  const debtEquity = ratios?.debtEquityRatioTTM ?? (equity > 0 ? liabilities / equity : 2);
  const currentRatio = ratios?.currentRatioTTM ?? 1;

  let score = 10;
  score += clamp((1.5 - debtEquity) * 4, -6, 5);
  score += clamp((currentRatio - 1) * 4, -2, 3);
  score += clamp((fcfPositiveYears - 2) * 2, -2, 4);

  return clamp(round(score), 0, 20);
}

function getValuationThresholds(sector?: string, industry?: string) {
  const text = `${sector ?? ""} ${industry ?? ""}`.toLowerCase();
  if (text.includes("software") || text.includes("semiconductor") || text.includes("internet") || text.includes("technology")) {
    return { perHigh: 70, perMid: 45, perLow: 30, pbrHigh: 12, pbrMid: 8, psrHigh: 18, psrMid: 12, psrLow: 7 };
  }
  if (text.includes("consumer") || text.includes("healthcare")) {
    return { perHigh: 55, perMid: 38, perLow: 25, pbrHigh: 9, pbrMid: 6, psrHigh: 10, psrMid: 7, psrLow: 4 };
  }
  return { perHigh: 50, perMid: 35, perLow: 25, pbrHigh: 8, pbrMid: 5, psrHigh: 12, psrMid: 8, psrLow: 5 };
}

function scoreValuation(ratios?: RatiosTtm | null, sector?: string, industry?: string) {
  const per = ratios?.priceEarningsRatioTTM;
  const pbr = ratios?.priceToBookRatioTTM;
  const psr = ratios?.priceToSalesRatioTTM;
  const t = getValuationThresholds(sector, industry);

  let score = 20;
  if (per !== undefined && per > 0) {
    if (per > t.perHigh) score -= 8;
    else if (per > t.perMid) score -= 5;
    else if (per > t.perLow) score -= 3;
  }
  if (pbr !== undefined && pbr > t.pbrHigh) score -= 4;
  else if (pbr !== undefined && pbr > t.pbrMid) score -= 2;

  if (psr !== undefined && psr > t.psrHigh) score -= 5;
  else if (psr !== undefined && psr > t.psrMid) score -= 3;
  else if (psr !== undefined && psr > t.psrLow) score -= 1;

  return clamp(round(score), 0, 20);
}

function scoreMomentum(quote?: StockQuote | null) {
  const price = quote?.price;
  const high = quote?.yearHigh;
  const low = quote?.yearLow;
  if (!price || !high || !low || high <= low) return 10;

  const position = ((price - low) / (high - low)) * 100;
  let score = 10;
  score += clamp((position - 50) / 8, -5, 7);

  return clamp(round(score), 0, 20);
}

function buildSummary(total: number) {
  if (total >= 80) return { grade: "A", summary: "정량 지표 기준으로 성장과 수익성이 모두 강한 편입니다." };
  if (total >= 70) return { grade: "B", summary: "전반적인 데이터 흐름은 양호하지만 일부 체크 포인트가 남아 있습니다." };
  if (total >= 60) return { grade: "C", summary: "장점과 부담 요인이 함께 보여 추가 확인이 필요한 구간입니다." };
  return { grade: "D", summary: "정량 지표만 보면 보수적으로 접근할 필요가 있습니다." };
}

export function scoreStock(args: {
  financials: FinancialYear[];
  ratios?: RatiosTtm | null;
  quote?: StockQuote | null;
  sector?: string;
  industry?: string;
}): ScoreBreakdown {
  const growth = scoreGrowth(args.financials);
  const profitability = scoreProfitability(args.ratios);
  const stability = scoreStability(args.financials, args.ratios);
  const valuation = scoreValuation(args.ratios, args.sector, args.industry);
  const momentum = scoreMomentum(args.quote);
  const total = clamp(growth + profitability + stability + valuation + momentum, 0, 100);
  const { grade, summary } = buildSummary(total);

  return {
    total,
    growth,
    profitability,
    stability,
    valuation,
    momentum,
    grade,
    summary,
  };
}
