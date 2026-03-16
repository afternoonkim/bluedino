export type AnalysisStatus =
  | "analyzable"
  | "partial"
  | "unsupported"
  | "not_found"
  | "error";

export type SecurityType = "stock" | "etf" | "reit" | "fund" | "spac" | "adr" | "unknown";

export type DataIssue =
  | "missing_quote"
  | "missing_profile"
  | "missing_chart"
  | "missing_financials"
  | "missing_ratios";

export type StockProfile = {
  symbol: string;
  companyName: string;
  exchangeShortName?: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  description?: string;
  website?: string;
  image?: string;
  currency?: string;
  marketCap?: number;
  country?: string;
  isEtf?: boolean;
  isFund?: boolean;
  isAdr?: boolean;
  isActivelyTrading?: boolean;
  ipoDate?: string;
};

export type StockQuote = {
  symbol: string;
  name?: string;
  price?: number;
  change?: number;
  changesPercentage?: number;
  yearHigh?: number;
  yearLow?: number;
  marketCap?: number;
  avgVolume?: number;
};

export type HistoricalPoint = {
  date: string;
  close: number;
};

export type IncomeStatementItem = {
  date: string;
  revenue?: number;
  operatingIncome?: number;
  netIncome?: number;
  eps?: number;
};

export type BalanceSheetItem = {
  date: string;
  totalAssets?: number;
  totalLiabilities?: number;
  totalStockholdersEquity?: number;
};

export type CashFlowItem = {
  date: string;
  freeCashFlow?: number;
  operatingCashFlow?: number;
};

export type RatiosTtm = {
  priceEarningsRatioTTM?: number;
  priceToBookRatioTTM?: number;
  priceToSalesRatioTTM?: number;
  returnOnEquityTTM?: number;
  operatingProfitMarginTTM?: number;
  netProfitMarginTTM?: number;
  debtEquityRatioTTM?: number;
  currentRatioTTM?: number;
};

export type FinancialYear = {
  year: string;
  revenue?: number;
  operatingIncome?: number;
  netIncome?: number;
  eps?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  totalEquity?: number;
  freeCashFlow?: number;
};

export type ScoreBreakdown = {
  total: number;
  growth: number;
  profitability: number;
  stability: number;
  valuation: number;
  momentum: number;
  grade: string;
  summary: string;
};

export type StockMetric = {
  label: string;
  value: string;
  hint?: string;
};

export type Checkpoints = {
  positives: string[];
  cautions: string[];
};

export type StockAnalysisResult = {
  status: AnalysisStatus;
  securityType: SecurityType;
  symbol: string;
  normalizedTicker: string;
  profile?: StockProfile | null;
  quote?: StockQuote | null;
  chart: HistoricalPoint[];
  financials: FinancialYear[];
  metrics: StockMetric[];
  score?: ScoreBreakdown | null;
  checkpoints?: Checkpoints | null;
  meta: {
    hasEnoughFinancialData: boolean;
    missingMetricCount: number;
    missingData: DataIssue[];
    sourceMode?: "stable" | "legacy" | "mixed" | "unknown";
  };
  reason?: string;
};
