import { unstable_cache } from "next/cache";
import { ETF_SYMBOLS, getUniverseItem } from "./universe";

const API_KEY = process.env.FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/stable";
const CACHE_WINDOW_SECONDS = 60 * 60 * 6;

export type EtfQuote = {
  symbol: string;
  name?: string;
  price?: number;
  changesPercentage?: number;
  marketCap?: number;
  volume?: number;
  exchange?: string;
  yearHigh?: number;
  yearLow?: number;
  dividendYield?: number;
};

export type EtfInfo = {
  symbol: string;
  name?: string;
  expenseRatio?: number;
  assetsUnderManagement?: number;
  avgVolume?: number;
  description?: string;
  domicile?: string;
  inceptionDate?: string;
  issuer?: string;
  holdingsCount?: number;
  dividendYield?: number;
};

export type EtfHolding = {
  asset?: string;
  name?: string;
  weightPercentage?: number;
  sharesNumber?: number;
};

export type DividendEvent = {
  symbol: string;
  date?: string;
  recordDate?: string;
  paymentDate?: string;
  declarationDate?: string;
  dividend?: number;
  adjDividend?: number;
  yield?: number;
  frequency?: string;
};

export type EtfRankingRow = {
  symbol: string;
  displayName: string;
  category: string;
  price: number | null;
  changePercent: number | null;
  dividendYieldPercent: number | null;
  expenseRatioPercent: number | null;
  assetsUnderManagement: number | null;
  score: number;
};

export type CompareEtfResult = {
  symbol: string;
  displayName: string;
  quote: EtfQuote | null;
  info: EtfInfo | null;
  topHoldings: EtfHolding[];
  dividendEvents: DividendEvent[];
};

function hasApiKey() {
  return Boolean(API_KEY);
}

async function safeFetchFmp<T>(
  path: string,
  params: Record<string, string> = {},
  fallback: T
): Promise<T> {
  if (!API_KEY) {
    return fallback;
  }

  try {
    const url = new URL(`${BASE_URL}${path}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
    url.searchParams.set("apikey", API_KEY);

    const response = await fetch(url.toString(), {
      headers: { accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.warn(`[FMP 429] ${path} ${JSON.stringify(params)}`);
        return fallback;
      }

      console.warn(`[FMP ERROR] ${response.status} ${response.statusText} - ${path}`);
      return fallback;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[FMP FETCH FAILED] ${path}`, error);
    return fallback;
  }
}

const getCachedBatchQuotes = unstable_cache(
  async (symbols: string[]) => {
    if (!hasApiKey()) return [] as EtfQuote[];
    return safeFetchFmp<EtfQuote[]>("/batch-quote", { symbols: symbols.join(",") }, []);
  },
  ["fmp-etf-batch-quotes"],
  { revalidate: CACHE_WINDOW_SECONDS }
);

const getCachedEtfInfo = unstable_cache(
  async (symbol: string) => {
    if (!hasApiKey()) return null as EtfInfo | null;
    const response = await safeFetchFmp<EtfInfo[] | EtfInfo | null>(
      "/etf/info",
      { symbol },
      null
    );

    if (!response) return null;
    if (Array.isArray(response)) return response[0] ?? null;
    return response ?? null;
  },
  ["fmp-etf-info"],
  { revalidate: CACHE_WINDOW_SECONDS }
);

const getCachedEtfHoldings = unstable_cache(
  async (symbol: string) => {
    if (!hasApiKey()) return [] as EtfHolding[];
    const response = await safeFetchFmp<EtfHolding[] | { holdings?: EtfHolding[] }>(
      "/etf/holdings",
      { symbol },
      []
    );

    if (Array.isArray(response)) return response;
    return response.holdings ?? [];
  },
  ["fmp-etf-holdings"],
  { revalidate: CACHE_WINDOW_SECONDS }
);

const getCachedDividendsCalendar = unstable_cache(
  async () => {
    if (!hasApiKey()) return [] as DividendEvent[];
    return safeFetchFmp<DividendEvent[]>("/dividends-calendar", {}, []);
  },
  ["fmp-dividends-calendar"],
  { revalidate: CACHE_WINDOW_SECONDS }
);

const getCachedCompanyDividends = unstable_cache(
  async (symbol: string) => {
    if (!hasApiKey()) return [] as DividendEvent[];
    return safeFetchFmp<DividendEvent[]>("/dividends", { symbol }, []);
  },
  ["fmp-company-dividends"],
  { revalidate: CACHE_WINDOW_SECONDS }
);

function normalizeEtfInfo(symbol: string, info: EtfInfo | null): EtfInfo | null {
  if (!info) return null;
  return {
    ...info,
    symbol,
    name: info.name || getUniverseItem(symbol)?.name || symbol,
  };
}

function normalizeQuote(symbol: string, quote: EtfQuote | undefined): EtfQuote | null {
  if (!quote) return null;
  return {
    ...quote,
    symbol,
    name: quote.name || getUniverseItem(symbol)?.name || symbol,
  };
}

function sortDividendEvents(events: DividendEvent[]) {
  return [...events].sort((a, b) => {
    const left = new Date(a.date ?? 0).getTime();
    const right = new Date(b.date ?? 0).getTime();
    return left - right;
  });
}

function getUpcomingEvents(events: DividendEvent[], symbol?: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = today.getTime();
  const end = new Date(today);
  end.setDate(today.getDate() + 90);

  return sortDividendEvents(events).filter((event) => {
    if (symbol && event.symbol !== symbol) return false;
    const time = new Date(event.date ?? "").getTime();
    if (!Number.isFinite(time)) return false;
    return time >= start && time <= end.getTime();
  });
}

export async function getEtfRankings(symbols: string[] = ETF_SYMBOLS) {
  const normalized = symbols.map((item) => item.toUpperCase());

  const [quotes, infos] = await Promise.all([
    getCachedBatchQuotes(normalized),
    Promise.all(normalized.map((symbol) => getCachedEtfInfo(symbol))),
  ]);

  const quoteMap = new Map(quotes.map((item) => [item.symbol, item]));

  const rankingRows: EtfRankingRow[] = normalized.map((symbol, index) => {
    const quote = normalizeQuote(symbol, quoteMap.get(symbol));
    const info = normalizeEtfInfo(symbol, infos[index]);

    const infoDividendYield = info?.dividendYield;
    const quoteDividendYield = quote?.dividendYield;

    const dividendYield = typeof infoDividendYield === "number"
      ? infoDividendYield * 100
      : typeof quoteDividendYield === "number"
        ? quoteDividendYield * 100
        : null;

    const expenseRatioPercent = typeof info?.expenseRatio === "number"
      ? info.expenseRatio * (info.expenseRatio <= 1 ? 100 : 1)
      : null;

    const aum = typeof info?.assetsUnderManagement === "number"
      ? info.assetsUnderManagement
      : null;

    const score = Number(
      (
        (dividendYield ?? 0) * 9 +
        (aum ? Math.min(aum / 1_000_000_000, 30) : 0) -
        (expenseRatioPercent ?? 0) * 12
      ).toFixed(2)
    );

    return {
      symbol,
      displayName: info?.name || quote?.name || getUniverseItem(symbol)?.name || symbol,
      category: getUniverseItem(symbol)?.category || "ETF",
      price: quote?.price ?? null,
      changePercent: quote?.changesPercentage ?? null,
      dividendYieldPercent: dividendYield,
      expenseRatioPercent,
      assetsUnderManagement: aum,
      score,
    };
  });

  return rankingRows.sort((a, b) => b.score - a.score);
}

export async function getEtfCompare(symbolA: string, symbolB: string) {
  const [quotes, infoA, infoB, holdingsA, holdingsB, calendar] = await Promise.all([
    getCachedBatchQuotes([symbolA, symbolB]),
    getCachedEtfInfo(symbolA),
    getCachedEtfInfo(symbolB),
    getCachedEtfHoldings(symbolA),
    getCachedEtfHoldings(symbolB),
    getCachedDividendsCalendar(),
  ]);

  const quoteMap = new Map(quotes.map((item) => [item.symbol, item]));

  const mergeEvents = (symbol: string) => {
    const marketEvents = getUpcomingEvents(calendar, symbol);
    return sortDividendEvents(marketEvents).slice(-4).reverse();
  };

  const makeResult = (
    symbol: string,
    info: EtfInfo | null,
    holdings: EtfHolding[]
  ): CompareEtfResult => ({
    symbol,
    displayName: info?.name || quoteMap.get(symbol)?.name || getUniverseItem(symbol)?.name || symbol,
    quote: normalizeQuote(symbol, quoteMap.get(symbol)),
    info: normalizeEtfInfo(symbol, info),
    topHoldings: holdings
      .filter((item) => typeof item.weightPercentage === "number")
      .sort((a, b) => (b.weightPercentage ?? 0) - (a.weightPercentage ?? 0))
      .slice(0, 10),
     dividendEvents: mergeEvents(symbol),
  });

  return {
    left: makeResult(symbolA, infoA, holdingsA),
    right: makeResult(symbolB, infoB, holdingsB),
  };
}

export async function getEtfDividendCalendar(symbols: string[] = ETF_SYMBOLS) {
  const calendar = await getCachedDividendsCalendar();
  if (!calendar.length) return [];

  const normalizedSet = new Set(symbols.map((symbol) => symbol.toUpperCase()));

  const filtered = getUpcomingEvents(calendar).filter((event) =>
    normalizedSet.has(event.symbol.toUpperCase())
  );

  return filtered.map((event) => ({
    ...event,
    displayName: getUniverseItem(event.symbol)?.name || event.symbol,
    category: getUniverseItem(event.symbol)?.category || "ETF",
  }));
}

export function isFmpConfigured() {
  return hasApiKey();
}