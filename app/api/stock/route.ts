import { NextResponse } from "next/server";

const API_KEY = process.env.FMP_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "symbol required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!data || !data[0]) {
      return NextResponse.json({ error: "symbol not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: data[0].name,
      price: data[0].price,
      dividendYieldPercent: data[0].dividendYield
        ? data[0].dividendYield * 100
        : 0,
    });

  } catch (err) {
    return NextResponse.json({ error: "API error" }, { status: 500 });
  }
}
