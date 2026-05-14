import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.FINNHUB_API_KEY;
const QUERY_PATTERN = /^[a-zA-Z0-9 .\-]{1,30}$/;

type FinnhubSearchItem = {
  symbol?: string;
  description?: string;
  type?: string;
};

type FinnhubSearchResponse = {
  count?: number;
  result?: FinnhubSearchItem[];
};

type EtfSearchItem = {
  symbol: string;
  name: string;
  market: "US";
  currency: "USD";
};

type EtfSearchResponse = {
  items: EtfSearchItem[];
};

type EtfSearchError = {
  error: string;
  message: string;
};

function jsonError(error: string, message: string, status: number) {
  return NextResponse.json<EtfSearchError>({ error, message }, { status });
}

function isFinnhubSearchResponse(value: unknown): value is FinnhubSearchResponse {
  return typeof value === "object" && value !== null;
}

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q");
  const q = rawQuery?.trim() ?? "";

  if (!q) {
    return NextResponse.json<EtfSearchResponse>({ items: [] });
  }

  if (!QUERY_PATTERN.test(q)) {
    return jsonError("invalid_query", "검색어는 영문, 숫자, 공백, 점, 하이픈을 포함해 30자 이내로 입력해 주세요.", 400);
  }

  if (!API_KEY) {
    return jsonError("missing_api_key", "현재 ETF 검색 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.", 503);
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(q)}&token=${API_KEY}`,
      { next: { revalidate: 60 * 60 } },
    );

    if (!response.ok) {
      return jsonError("upstream_error", "ETF 검색 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.", 502);
    }

    const data: unknown = await response.json();

    if (!isFinnhubSearchResponse(data)) {
      return jsonError("invalid_response", "ETF 검색 응답 형식을 확인할 수 없습니다.", 502);
    }

    const items: EtfSearchItem[] = (data.result ?? [])
      .filter((item) => typeof item.symbol === "string" && typeof item.description === "string")
      .slice(0, 10)
      .map((item) => ({
        symbol: item.symbol as string,
        name: item.description as string,
        market: "US",
        currency: "USD",
      }));

    return NextResponse.json<EtfSearchResponse>({ items });
  } catch (error) {
    console.error("ETF search API failed", error);
    return jsonError("request_failed", "외부 ETF 검색 요청 중 문제가 발생했습니다.", 500);
  }
}
