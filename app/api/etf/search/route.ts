import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ items: [] });

  const res = await fetch(
    `https://finnhub.io/api/v1/search?q=${q}&token=${process.env.FINNHUB_API_KEY}`
  );

  const data = await res.json();

  const items = (data.result ?? [])
    .slice(0, 10)
    .map((r: any) => ({
      symbol: r.symbol,
      name: r.description,
      market: "US",
      currency: "USD",
    }));

  return NextResponse.json({ items });
}