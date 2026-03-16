import { buildCheckpoints } from "@/lib/stocks/buildCheckpoints";
import { toDisplayPercent } from "@/lib/stocks/metricHelpers";
import { scoreStock } from "@/lib/stocks/scoreStock";
import type {
  BalanceSheetItem,
  CashFlowItem,
  DataIssue,
  FinancialYear,
  HistoricalPoint,
  IncomeStatementItem,
  RatiosTtm,
  SecurityType,
  StockAnalysisResult,
  StockMetric,
  StockProfile,
  StockQuote,
} from "@/lib/stocks/types";

const API_KEY = process.env.FMP_API_KEY;
const LEGACY_BASE = "https://financialmodelingprep.com/api/v3";
const STABLE_BASE = "https://financialmodelingprep.com/stable";

type SourceMode = "stable" | "legacy" | "mixed" | "unknown";

function normalizeTicker(raw: string) {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

function joinUrl(base: string, path: string, params?: Record<string, string | number | undefined>) {
  const url = new URL(`${base}${path}`);
  url.searchParams.set("apikey", API_KEY ?? "");
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

async function jsonFetch<T>(url: string, revalidate: number): Promise<T | null> {
  const response = await fetch(url, {
    next: { revalidate },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as T;
  if (data === null || data === undefined) return null;
  return data;
}

async function fetchWithFallback<T>(args: {
  stablePath: string;
  legacyPath?: string;
  stableParams?: Record<string, string | number | undefined>;
  legacyParams?: Record<string, string | number | undefined>;
  revalidate: number;
}) {
  const stable = await jsonFetch<T>(
    joinUrl(STABLE_BASE, args.stablePath, args.stableParams),
    args.revalidate
  );
  if (stable !== null) {
    return { data: stable, mode: "stable" as const };
  }

  if (args.legacyPath) {
    const legacy = await jsonFetch<T>(
      joinUrl(LEGACY_BASE, args.legacyPath, args.legacyParams),
      args.revalidate
    );
    if (legacy !== null) {
      return { data: legacy, mode: "legacy" as const };
    }
  }

  return { data: null, mode: "unknown" as const };
}

function firstItem<T>(input: unknown): T | null {
  if (Array.isArray(input)) return (input[0] as T) ?? null;
  if (input && typeof input === "object") return input as T;
  return null;
}

function listItems<T>(input: unknown): T[] {
  if (Array.isArray(input)) return input as T[];
  return [];
}

function pickHistorical(input: unknown): HistoricalPoint[] {
  let raw: unknown[] = [];

  if (Array.isArray(input)) raw = input;
  else if (input && typeof input === "object") {
    const record = input as { historical?: unknown[] };
    if (Array.isArray(record.historical)) raw = record.historical;
  }

  return raw
    .map((item) => {
      const row = item as { date?: string; close?: number };
      return row.date && typeof row.close === "number"
        ? { date: row.date, close: row.close }
        : null;
    })
    .filter((item): item is HistoricalPoint => Boolean(item))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-260);
}

function pickHistoricalLight(input: unknown): HistoricalPoint[] {
  const raw = Array.isArray(input) ? input : [];

  return raw
    .map((item) => {
      const row = item as { date?: string; close?: number; price?: number };
      const close = typeof row.close === "number" ? row.close : row.price;
      return row.date && typeof close === "number"
        ? { date: row.date, close }
        : null;
    })
    .filter((item): item is HistoricalPoint => Boolean(item))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-260);
}

function formatNumber(value?: number | null, options?: Intl.NumberFormatOptions) {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", options).format(value);
}

function formatMoney(value?: number | null, currency = "USD") {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatCompactMoney(value?: number | null, currency = "USD") {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value?: number | null, digits = 1) {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return `${value.toFixed(digits)}%`;
}

function pickNumber(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return undefined;
}

function asPercentFraction(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;
  if (value > 1 && value <= 100) return value / 100;
  return value;
}

function normalizeRatios(rawRatios?: unknown, rawKeyMetrics?: unknown): RatiosTtm | null {
  const ratios = firstItem<Record<string, unknown>>(rawRatios);
  const keyMetrics = firstItem<Record<string, unknown>>(rawKeyMetrics);

  const merged = { ...(keyMetrics ?? {}), ...(ratios ?? {}) };

  if (!Object.keys(merged).length) return null;

  const normalized: RatiosTtm = {
    priceEarningsRatioTTM: pickNumber(merged, [
      "priceEarningsRatioTTM",
      "peRatioTTM",
      "peRatio",
      "priceToEarningsRatioTTM",
      "priceToEarnings",
    ]),
    priceToBookRatioTTM: pickNumber(merged, [
      "priceToBookRatioTTM",
      "pbRatioTTM",
      "pbRatio",
      "priceToBook",
    ]),
    priceToSalesRatioTTM: pickNumber(merged, [
      "priceToSalesRatioTTM",
      "priceToSalesTTM",
      "psRatioTTM",
      "psRatio",
      "priceSalesRatioTTM",
    ]),
    returnOnEquityTTM: pickNumber(merged, [
      "returnOnEquityTTM",
      "roeTTM",
      "roe",
      "returnOnEquity",
    ]),
    operatingProfitMarginTTM: asPercentFraction(
      pickNumber(merged, [
        "operatingProfitMarginTTM",
        "operatingMarginTTM",
        "operatingMargin",
      ])
    ),
    netProfitMarginTTM: asPercentFraction(
      pickNumber(merged, [
        "netProfitMarginTTM",
        "netMarginTTM",
        "netMargin",
      ])
    ),
    debtEquityRatioTTM: pickNumber(merged, [
      "debtEquityRatioTTM",
      "debtToEquityTTM",
      "debtEquityRatio",
      "debtToEquity",
    ]),
    currentRatioTTM: pickNumber(merged, [
      "currentRatioTTM",
      "currentRatio",
    ]),
  };

  return Object.values(normalized).some((item) => item !== undefined) ? normalized : null;
}

function parseRangeValue(range?: string, index?: 0 | 1) {
  if (!range) return undefined;
  const parts = range.split("-").map((item) => Number(item.trim()));
  const value = parts[index ?? 0];
  return Number.isFinite(value) ? value : undefined;
}

function createFallbackQuoteFromProfile(
  ticker: string,
  profile?: StockProfile | null
): StockQuote | null {
  if (!profile) return null;

  const profileAny = profile as StockProfile & {
    price?: number;
    change?: number;
    changesPercentage?: number;
    volume?: number;
    avgVolume?: number;
    range?: string;
    exchange?: string;
    exchangeShortName?: string;
    currency?: string;
  };

  const price =
    typeof profileAny.price === "number" && Number.isFinite(profileAny.price)
      ? profileAny.price
      : undefined;

  const marketCap =
    typeof profile.marketCap === "number" && Number.isFinite(profile.marketCap)
      ? profile.marketCap
      : undefined;

  if (price === undefined && marketCap === undefined) return null;

  return {
    symbol: profile.symbol ?? ticker,
    name: profile.companyName ?? ticker,
    price,
    marketCap,
    change:
      typeof profileAny.change === "number" && Number.isFinite(profileAny.change)
        ? profileAny.change
        : 0,
    changesPercentage:
      typeof profileAny.changesPercentage === "number" &&
      Number.isFinite(profileAny.changesPercentage)
        ? profileAny.changesPercentage
        : 0,
    yearLow: parseRangeValue(profileAny.range, 0),
    yearHigh: parseRangeValue(profileAny.range, 1),
    volume:
      typeof profileAny.volume === "number" && Number.isFinite(profileAny.volume)
        ? profileAny.volume
        : undefined,
    avgVolume:
      typeof profileAny.avgVolume === "number" && Number.isFinite(profileAny.avgVolume)
        ? profileAny.avgVolume
        : undefined,
    exchange: profileAny.exchange,
    exchangeShortName: profileAny.exchangeShortName,
    currency: profileAny.currency ?? "USD",
  } as StockQuote;
}

function createFallbackProfile(ticker: string, quote?: StockQuote | null): StockProfile | null {
  if (!quote) return null;

  return {
    symbol: quote.symbol ?? ticker,
    companyName: quote.name ?? ticker,
    currency: "USD",
    exchange: "US Market",
    exchangeShortName: "US",
    sector: "기타",
    industry: "일반 기업",
    marketCap: quote.marketCap,
    isEtf: false,
    isFund: false,
    isAdr: false,
    isActivelyTrading: true,
  } as StockProfile;
}

function classifySecurity(profile?: StockProfile | null): SecurityType {
  if (!profile) return "unknown";

  const blob = [
    profile.companyName ?? "",
    profile.sector ?? "",
    profile.industry ?? "",
    profile.exchangeShortName ?? "",
    profile.exchange ?? "",
  ]
    .join(" ")
    .toLowerCase();

  if (profile.isEtf || /\betf\b|exchange traded fund/.test(blob)) return "etf";
  if (profile.isFund || /\bfund\b|mutual fund|closed end/.test(blob)) return "fund";
  if (/reit|real estate investment trust/.test(blob)) return "reit";

  if (profile.isActivelyTrading === false) return "unknown";

  return "stock";
}

function mergeFinancials(
  income: IncomeStatementItem[] = [],
  balance: BalanceSheetItem[] = [],
  cashflow: CashFlowItem[] = []
): FinancialYear[] {
  const years = new Map<string, FinancialYear>();

  const ensure = (date: string) => {
    const year = date.slice(0, 4);
    if (!years.has(year)) years.set(year, { year });
    return years.get(year)!;
  };

  income.forEach((item) => {
    const target = ensure(item.date);
    target.revenue = item.revenue;
    target.operatingIncome = item.operatingIncome;
    target.netIncome = item.netIncome;
    target.eps = item.eps;
  });

  balance.forEach((item) => {
    const target = ensure(item.date);
    target.totalAssets = item.totalAssets;
    target.totalLiabilities = item.totalLiabilities;
    target.totalEquity = item.totalStockholdersEquity;
  });

  cashflow.forEach((item) => {
    const target = ensure(item.date);
    target.freeCashFlow = item.freeCashFlow;
  });

  return Array.from(years.values()).sort((a, b) => Number(b.year) - Number(a.year));
}

function buildMetrics(args: {
  quote?: StockQuote | null;
  profile?: StockProfile | null;
  ratios?: RatiosTtm | null;
  financials: FinancialYear[];
}): StockMetric[] {
  const { quote, profile, ratios, financials } = args;
  const latest = financials[0];
  const previous = financials[1];

  const revenueGrowth =
    latest?.revenue && previous?.revenue
      ? ((latest.revenue - previous.revenue) / Math.abs(previous.revenue)) * 100
      : null;

  const epsGrowth =
    latest?.eps && previous?.eps
      ? ((latest.eps - previous.eps) / Math.abs(previous.eps)) * 100
      : null;

  return [
    { label: "현재 주가", value: formatMoney(quote?.price, profile?.currency ?? "USD") },
    {
      label: "시가총액",
      value: formatCompactMoney(quote?.marketCap ?? profile?.marketCap, profile?.currency ?? "USD"),
    },
    {
      label: "PER",
      value: formatNumber(ratios?.priceEarningsRatioTTM, { maximumFractionDigits: 1 }),
      hint:
        ratios?.priceEarningsRatioTTM === undefined
          ? "TTM 밸류에이션 데이터가 없거나 적자 구간일 수 있습니다."
          : undefined,
    },
    { label: "PBR", value: formatNumber(ratios?.priceToBookRatioTTM, { maximumFractionDigits: 1 }) },
    { label: "PSR", value: formatNumber(ratios?.priceToSalesRatioTTM, { maximumFractionDigits: 1 }) },
    {
      label: "ROE",
      value: formatPercent(toDisplayPercent(ratios?.returnOnEquityTTM, "roe") ?? null),
      hint:
        ratios?.returnOnEquityTTM === undefined
          ? "ROE는 ratios 또는 key metrics TTM 기준으로 표시됩니다."
          : undefined,
    },
    {
      label: "영업이익률",
      value: formatPercent(
        ratios?.operatingProfitMarginTTM !== undefined ? ratios.operatingProfitMarginTTM * 100 : null
      ),
    },
    { label: "매출 성장률", value: formatPercent(revenueGrowth) },
    { label: "EPS 성장률", value: formatPercent(epsGrowth) },
  ];
}

function hasEnoughData(financials: FinancialYear[], ratios?: RatiosTtm | null) {
  const latestThree = financials.slice(0, 3);
  const countValidYears = latestThree.filter(
    (item) => item.revenue !== undefined && item.netIncome !== undefined
  ).length;

  const ratioMisses = [
    ratios?.priceEarningsRatioTTM,
    ratios?.priceToBookRatioTTM,
    ratios?.priceToSalesRatioTTM,
    ratios?.returnOnEquityTTM,
    ratios?.operatingProfitMarginTTM,
  ].filter((item) => item === undefined || item === null).length;

  return {
    hasEnoughFinancialData: countValidYears >= 3,
    missingMetricCount: ratioMisses,
  };
}

function combineSourceMode(modes: string[]): SourceMode {
  const unique = Array.from(new Set(modes.filter(Boolean)));
  if (unique.length === 1 && unique[0] === "stable") return "stable";
  if (unique.length === 1 && unique[0] === "legacy") return "legacy";
  if (unique.length >= 2) return "mixed";
  return "unknown";
}

function buildMissingData(args: {
  profile?: StockProfile | null;
  quote?: StockQuote | null;
  chart: HistoricalPoint[];
  financials: FinancialYear[];
  ratios?: RatiosTtm | null;
}) {
  const missing: DataIssue[] = [];
  if (!args.profile) missing.push("missing_profile");
  if (!args.quote) missing.push("missing_quote");
  if (args.chart.length === 0) missing.push("missing_chart");
  if (args.financials.length === 0) missing.push("missing_financials");
  if (!args.ratios) missing.push("missing_ratios");
  return missing;
}

function buildUnsupportedReason(securityType: SecurityType) {
  if (securityType === "etf") return "ETF는 현재 기업분석 점수를 지원하지 않습니다.";
  if (securityType === "reit") return "리츠는 일반 기업과 재무 해석 기준이 달라 현재는 제외했습니다.";
  if (securityType === "fund") return "펀드형 상품은 일반 기업 분석 페이지 대상이 아닙니다.";
  return "현재는 미국 일반 기업만 기업분석을 지원합니다.";
}

export async function buildStockAnalysis(rawTicker: string): Promise<StockAnalysisResult> {
  const ticker = normalizeTicker(rawTicker);

  if (!ticker) {
    return {
      status: "error",
      securityType: "unknown",
      symbol: ticker,
      normalizedTicker: ticker,
      chart: [],
      financials: [],
      metrics: [],
      meta: {
        hasEnoughFinancialData: false,
        missingMetricCount: 0,
        missingData: [],
        sourceMode: "unknown",
      },
      reason: "티커를 입력해주세요.",
    };
  }

  if (!API_KEY) {
    return {
      status: "error",
      securityType: "unknown",
      symbol: ticker,
      normalizedTicker: ticker,
      chart: [],
      financials: [],
      metrics: [],
      meta: {
        hasEnoughFinancialData: false,
        missingMetricCount: 0,
        missingData: [],
        sourceMode: "unknown",
      },
      reason: "FMP API 키가 설정되지 않았습니다. .env.local 또는 배포 환경변수를 확인해주세요.",
    };
  }

  try {
    const [
      profileRes,
      quoteRes,
      historicalRes,
      lightHistoricalRes,
      incomeRes,
      balanceRes,
      cashflowRes,
      ratiosRes,
      keyMetricsRes,
    ] = await Promise.all([
      fetchWithFallback<unknown>({
        stablePath: "/profile",
        stableParams: { symbol: ticker },
        legacyPath: `/profile/${ticker}`,
        revalidate: 60 * 60 * 24,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/quote",
        stableParams: { symbol: ticker },
        legacyPath: `/quote/${ticker}`,
        revalidate: 60 * 10,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/historical-price-eod/full",
        stableParams: { symbol: ticker },
        legacyPath: `/historical-price-full/${ticker}`,
        legacyParams: { serietype: "line", timeseries: 260 },
        revalidate: 60 * 30,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/historical-price-eod/light",
        stableParams: { symbol: ticker },
        legacyPath: `/historical-price-full/${ticker}`,
        legacyParams: { serietype: "line", timeseries: 260 },
        revalidate: 60 * 30,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/income-statement",
        stableParams: { symbol: ticker, period: "annual", limit: 5 },
        legacyPath: `/income-statement/${ticker}`,
        legacyParams: { period: "annual", limit: 5 },
        revalidate: 60 * 60 * 24,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/balance-sheet-statement",
        stableParams: { symbol: ticker, period: "annual", limit: 5 },
        legacyPath: `/balance-sheet-statement/${ticker}`,
        legacyParams: { period: "annual", limit: 5 },
        revalidate: 60 * 60 * 24,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/cash-flow-statement",
        stableParams: { symbol: ticker, period: "annual", limit: 5 },
        legacyPath: `/cash-flow-statement/${ticker}`,
        legacyParams: { period: "annual", limit: 5 },
        revalidate: 60 * 60 * 24,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/ratios-ttm",
        stableParams: { symbol: ticker },
        legacyPath: `/ratios-ttm/${ticker}`,
        revalidate: 60 * 60 * 24,
      }),
      fetchWithFallback<unknown>({
        stablePath: "/key-metrics-ttm",
        stableParams: { symbol: ticker },
        legacyPath: `/key-metrics-ttm/${ticker}`,
        revalidate: 60 * 60 * 24,
      }),
    ]);

    const rawProfile = firstItem<StockProfile>(profileRes.data);
    const rawQuote = firstItem<StockQuote>(quoteRes.data);
    const fallbackQuote = createFallbackQuoteFromProfile(ticker, rawProfile);
    const quote = rawQuote ?? fallbackQuote;
    const profile = rawProfile ?? createFallbackProfile(ticker, quote);

    const fullChart = pickHistorical(historicalRes.data);
    const lightChart = pickHistoricalLight(lightHistoricalRes.data);
    const chart = fullChart.length > 0 ? fullChart : lightChart;

    const financials = mergeFinancials(
      listItems<IncomeStatementItem>(incomeRes.data),
      listItems<BalanceSheetItem>(balanceRes.data),
      listItems<CashFlowItem>(cashflowRes.data)
    );
    const ratios = normalizeRatios(ratiosRes.data, keyMetricsRes.data);
    const metrics = buildMetrics({ quote, profile, ratios, financials });

    const metaBase = hasEnoughData(financials, ratios);
    const missingData = buildMissingData({ profile, quote, chart, financials, ratios });
    const sourceMode = combineSourceMode([
      profileRes.mode,
      quoteRes.mode,
      historicalRes.mode,
      lightHistoricalRes.mode,
      incomeRes.mode,
      balanceRes.mode,
      cashflowRes.mode,
      ratiosRes.mode,
      keyMetricsRes.mode,
    ]);
    const meta = { ...metaBase, missingData, sourceMode };

    if (!profile && !quote) {
      return {
        status: "not_found",
        securityType: "unknown",
        symbol: ticker,
        normalizedTicker: ticker,
        chart: [],
        financials: [],
        metrics: [],
        meta,
        reason: "입력한 티커를 찾을 수 없습니다.",
      };
    }

    const securityType = classifySecurity(profile);

    if (securityType === "etf" || securityType === "reit" || securityType === "fund") {
      return {
        status: "unsupported",
        securityType,
        symbol: profile?.symbol ?? quote?.symbol ?? ticker,
        normalizedTicker: ticker,
        profile,
        quote,
        chart,
        financials,
        metrics,
        meta,
        reason: buildUnsupportedReason(securityType),
      };
    }

    const baseCheckpoints = buildCheckpoints({
      financials,
      ratios,
      quote,
      score: null,
    });

    if (!quote) {
      return {
        status: "partial",
        securityType: securityType === "unknown" ? "stock" : securityType,
        symbol: profile?.symbol ?? ticker,
        normalizedTicker: ticker,
        profile,
        quote,
        chart,
        financials,
        metrics,
        checkpoints: baseCheckpoints,
        meta,
        reason: "현재가 데이터가 부족해 제한된 분석만 제공합니다.",
      };
    }

    if (!meta.hasEnoughFinancialData || meta.missingMetricCount >= 3) {
      return {
        status: "partial",
        securityType: securityType === "unknown" ? "stock" : securityType,
        symbol: profile?.symbol ?? quote.symbol ?? ticker,
        normalizedTicker: ticker,
        profile,
        quote,
        chart,
        financials,
        metrics,
        checkpoints: baseCheckpoints,
        meta,
        reason: "재무 이력 또는 핵심 지표가 부족해 종합 점수를 제한적으로 제공합니다.",
      };
    }

    const score = scoreStock({
      financials,
      ratios,
      quote,
      sector: profile?.sector,
      industry: profile?.industry,
    });

    const scoredCheckpoints = buildCheckpoints({
      financials,
      ratios,
      quote,
      score,
    });

    return {
      status: "analyzable",
      securityType: securityType === "unknown" ? "stock" : securityType,
      symbol: profile?.symbol ?? quote.symbol ?? ticker,
      normalizedTicker: ticker,
      profile,
      quote,
      chart,
      financials,
      metrics,
      score,
      checkpoints: scoredCheckpoints,
      meta,
    };
  } catch {
    return {
      status: "error",
      securityType: "unknown",
      symbol: ticker,
      normalizedTicker: ticker,
      chart: [],
      financials: [],
      metrics: [],
      meta: {
        hasEnoughFinancialData: false,
        missingMetricCount: 0,
        missingData: [],
        sourceMode: "unknown",
      },
      reason: "데이터 제공사 응답을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}