import { toDisplayPercent } from "@/lib/stocks/metricHelpers";
import type { Checkpoints, FinancialYear, RatiosTtm, ScoreBreakdown, StockQuote } from "@/lib/stocks/types";

function growthRate(current?: number, previous?: number) {
  if (current === undefined || previous === undefined || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function buildCheckpoints(args: {
  financials: FinancialYear[];
  ratios?: RatiosTtm | null;
  score?: ScoreBreakdown | null;
  quote?: StockQuote | null;
}): Checkpoints {
  const { financials, ratios, score, quote } = args;
  const positives: string[] = [];
  const cautions: string[] = [];

  const latest = financials[0];
  const previous = financials[1];
  const revenueGrowth = growthRate(latest?.revenue, previous?.revenue);
  const epsGrowth = growthRate(latest?.eps, previous?.eps);
  const fcfPositiveYears = financials.filter((item) => (item.freeCashFlow ?? 0) > 0).length;

  if (revenueGrowth !== null && revenueGrowth > 8) {
    positives.push(`최근 연간 매출이 전년 대비 ${formatPercent(revenueGrowth)} 증가했습니다.`);
  }
  if (epsGrowth !== null && epsGrowth > 8) {
    positives.push("주당순이익(EPS)이 개선되며 이익 성장 흐름이 확인됩니다.");
  }
  const roePercent = toDisplayPercent(ratios?.returnOnEquityTTM, "roe") ?? 0;

  if (roePercent >= 15) {
    positives.push(`ROE가 ${roePercent.toFixed(1)}% 수준으로 자본 효율이 양호합니다.`);
  }
  const operatingMarginPercent = toDisplayPercent(ratios?.operatingProfitMarginTTM) ?? 0;

  if (operatingMarginPercent >= 15) {
    positives.push(`영업이익률이 ${operatingMarginPercent.toFixed(1)}% 수준으로 수익성이 안정적입니다.`);
  }
  if (fcfPositiveYears >= 3) {
    positives.push(`최근 ${fcfPositiveYears}개 연도에서 잉여현금흐름이 플러스였습니다.`);
  }
  if ((score?.total ?? 0) >= 75) {
    positives.push(`BlueDino 정량 점수가 ${score?.total}점으로 상대적으로 우수한 편입니다.`);
  }

  if (revenueGrowth !== null && revenueGrowth < 0) {
    cautions.push("최근 연간 매출이 전년 대비 감소해 성장 둔화 여부를 확인할 필요가 있습니다.");
  }
  if (epsGrowth !== null && epsGrowth < 0) {
    cautions.push("EPS가 전년 대비 감소해 실적 변동성이 커졌을 수 있습니다.");
  }
  if ((ratios?.priceEarningsRatioTTM ?? 0) > 35) {
    cautions.push("PER이 높아 시장 기대가 선반영됐을 가능성이 있습니다.");
  }
  if ((ratios?.priceToSalesRatioTTM ?? 0) > 10) {
    cautions.push("PSR이 높은 편이라 밸류에이션 부담을 함께 점검해야 합니다.");
  }
  if ((ratios?.debtEquityRatioTTM ?? 0) > 1.5) {
    cautions.push("부채비율이 높은 편이라 금리·실적 환경 변화에 민감할 수 있습니다.");
  }
  if (quote?.price && quote?.yearHigh && quote.price >= quote.yearHigh * 0.95) {
    cautions.push("현재 주가가 52주 고점권에 가까워 단기 조정 가능성도 염두에 둘 필요가 있습니다.");
  }
  if ((score?.total ?? 0) < 55 && score) {
    cautions.push("정량 점수가 낮아 추가적인 사업 경쟁력과 성장 지속성을 따로 확인하는 편이 좋습니다.");
  }

  if (positives.length === 0) {
    positives.push("매출, 수익성, 밸류에이션을 함께 보는 기본 점검용 데이터는 확보되었습니다.");
  }
  if (cautions.length === 0) {
    cautions.push("정량 지표만으로는 산업 사이클과 제품 경쟁력을 완전히 설명하기 어렵습니다.");
  }

  return {
    positives: positives.slice(0, 3),
    cautions: cautions.slice(0, 3),
  };
}
