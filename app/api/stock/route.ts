import { NextResponse } from "next/server";

const API_KEY = process.env.FMP_API_KEY;
const SYMBOL_PATTERN = /^[A-Z0-9.\-]{1,12}$/;

type FmpQuote = {
  symbol?: string;
  name?: string;
  price?: number | null;
  dividendYield?: number | null;
};

type StockApiSuccess = {
  symbol: string;
  name: string;
  price: number | null;
  dividendYieldPercent: number;
};

type StockApiError = {
  error: string;
  message: string;
};

function jsonError(error: string, message: string, status: number) {
  return NextResponse.json<StockApiError>({ error, message }, { status });
}

function isFmpQuoteArray(value: unknown): value is FmpQuote[] {
  return Array.isArray(value);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbolParam = searchParams.get("symbol");
  const symbol = symbolParam?.trim().toUpperCase() ?? "";

  if (!symbol) {
    return jsonError("missing_symbol", "조회할 티커를 입력해 주세요.", 400);
  }

  if (!SYMBOL_PATTERN.test(symbol)) {
    return jsonError("invalid_symbol", "티커는 영문, 숫자, 점, 하이픈을 포함해 12자 이내로 입력해 주세요.", 400);
  }

  if (!API_KEY) {
    return jsonError("missing_api_key", "현재 시세 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.", 503);
  }

  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(symbol)}?apikey=${API_KEY}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return jsonError("upstream_error", "시세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.", 502);
    }

    const data: unknown = await response.json();

    if (!isFmpQuoteArray(data) || !data[0]) {
      return jsonError("symbol_not_found", "입력한 티커의 시세 데이터를 찾을 수 없습니다.", 404);
    }

    const quote = data[0];
    const result: StockApiSuccess = {
      symbol: quote.symbol ?? symbol,
      name: quote.name ?? symbol,
      price: typeof quote.price === "number" ? quote.price : null,
      dividendYieldPercent: typeof quote.dividendYield === "number" ? quote.dividendYield * 100 : 0,
    };

    return NextResponse.json<StockApiSuccess>(result);
  } catch (error) {
    console.error("Stock quote API failed", error);
    return jsonError("request_failed", "현재 데이터를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.", 500);
  }
}
