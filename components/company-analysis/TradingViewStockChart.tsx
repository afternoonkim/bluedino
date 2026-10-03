"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

type TradingViewStockChartProps = {
  ticker: string;
  exchange: string;
  market: CompanyAnalysisMarket;
  companyNameKo: string;
};

type FallbackPeriod = "day" | "week" | "month" | "year" | "3year";

const fallbackChartPeriods: { key: FallbackPeriod; label: string }[] = [
  { key: "day", label: "일봉" },
  { key: "week", label: "주봉" },
  { key: "month", label: "월봉" },
  { key: "year", label: "1년" },
  { key: "3year", label: "3년" },
];

function normalizeKoreaTicker(ticker: string) {
  const numericTicker = ticker.replace(/[^0-9]/g, "");
  return numericTicker ? numericTicker.padStart(6, "0") : ticker.trim();
}

function getTradingViewSymbol(args: {
  ticker: string;
  exchange: string;
  market: CompanyAnalysisMarket;
}) {
  const ticker = args.ticker.trim().toUpperCase();
  const exchange = args.exchange.trim().toUpperCase().replace(/\s+/g, "");

  if (args.market === "korea") {
    return `KRX:${normalizeKoreaTicker(ticker)}`;
  }

  if (exchange.includes("NASDAQ")) return `NASDAQ:${ticker}`;
  if (exchange.includes("NYSEARCA")) return `AMEX:${ticker}`;
  if (exchange.includes("AMEX") || exchange.includes("NYSEMKT")) return `AMEX:${ticker}`;
  if (exchange.includes("NYSE")) return `NYSE:${ticker}`;
  if (exchange.includes("BATS") || exchange.includes("CBOE")) return `BATS:${ticker}`;

  return ticker;
}

function getTradingViewWidgetUrl(symbol: string) {
  const params = new URLSearchParams({
    symbol,
    interval: "D",
    range: "12M",
    autosize: "1",
    width: "100%",
    height: "100%",
    hidesidetoolbar: "0",
    symboledit: "1",
    saveimage: "0",
    toolbarbg: "131722",
    studies: "[]",
    theme: "dark",
    style: "1",
    timezone: "Asia/Seoul",
    withdateranges: "1",
    hideideas: "1",
    showpopupbutton: "1",
    locale: "kr",
  });

  return `https://s.tradingview.com/widgetembed/?${params.toString()}`;
}

function getNaverFinanceChartUrl(ticker: string, period: FallbackPeriod) {
  const code = normalizeKoreaTicker(ticker);
  return `https://ssl.pstatic.net/imgfinance/chart/item/candle/${period}/${code}.png`;
}

function getLiveQuoteHref(args: {
  ticker: string;
  exchange: string;
  market: CompanyAnalysisMarket;
}) {
  if (args.market === "korea") {
    return `https://finance.naver.com/item/main.naver?code=${normalizeKoreaTicker(args.ticker)}`;
  }

  const symbol = getTradingViewSymbol(args);
  return `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(symbol)}`;
}

function NaverFallbackChart({
  ticker,
  companyNameKo,
}: {
  ticker: string;
  companyNameKo: string;
}) {
  const [period, setPeriod] = useState<FallbackPeriod>("day");
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const code = normalizeKoreaTicker(ticker);
  const chartUrl = getNaverFinanceChartUrl(code, period);
  const quoteHref = getLiveQuoteHref({ ticker: code, exchange: "KOSPI", market: "korea" });

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-end gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-2">
        {fallbackChartPeriods.map((item) => {
          const isActive = item.key === period;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setPeriod(item.key)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-200"
                  : "border-slate-700 bg-slate-900/70 text-slate-400 hover:border-slate-500 hover:text-slate-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center bg-[#081124] p-4 md:p-6" style={{ minHeight: "560px" }}>
        {failedImageUrl === chartUrl ? (
          <div className="max-w-xl text-center">
            <h3 className="text-lg font-bold text-white">차트를 불러오지 못했습니다</h3>
            <p className="bd-text-main mt-3">
              잠시 후 다시 확인하거나 아래 버튼을 눌러 {companyNameKo}의 현재가와 차트를 확인해 주세요.
            </p>
            <a href={quoteHref} target="_blank" rel="noreferrer" className="bd-button-primary mt-6 inline-flex">
              현재 주가 확인하기
            </a>
          </div>
        ) : (
          <Image
            src={chartUrl}
            alt={`${companyNameKo}(${code}) ${period} 주가 차트`}
            width={1200}
            height={720}
            className="h-auto w-full max-w-6xl rounded-2xl bg-white object-contain p-3 shadow-2xl shadow-slate-950/40"
            style={{ maxHeight: "720px" }}
            unoptimized
            onError={() => setFailedImageUrl(chartUrl)}
          />
        )}
      </div>
    </div>
  );
}

function UnifiedTradingViewChart({
  ticker,
  exchange,
  market,
  companyNameKo,
}: TradingViewStockChartProps) {
  const symbol = useMemo(
    () => getTradingViewSymbol({ ticker, exchange, market }),
    [ticker, exchange, market],
  );
  const widgetUrl = useMemo(() => getTradingViewWidgetUrl(symbol), [symbol]);
  const isKorea = market === "korea";

  if (isKorea) {
    return (
      <div className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-2">
          <div className="text-xs font-semibold text-slate-400">네이버 금융 차트</div>
          <div className="text-xs text-slate-500">현재가는 네이버 금융에서 확인</div>
        </div>
        <NaverFallbackChart ticker={ticker} companyNameKo={companyNameKo} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-2">
        <div className="text-xs font-semibold text-slate-400">TradingView 차트</div>
        <div className="text-xs text-slate-500">{symbol}</div>
      </div>
      <div
        className="w-full bg-[#131722]"
        style={{
          height: "clamp(560px, 72vh, 880px)",
          minHeight: "560px",
        }}
      >
        <iframe
          key={symbol}
          title={`${companyNameKo}(${ticker}) 실시간 주가 차트`}
          src={widgetUrl}
          width="100%"
          height="100%"
          className="block w-full border-0"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            minHeight: "560px",
          }}
          loading="eager"
          allow="clipboard-write; encrypted-media; fullscreen"
        />
      </div>
    </div>
  );
}

export default function TradingViewStockChart({
  ticker,
  exchange,
  market,
  companyNameKo,
}: TradingViewStockChartProps) {
  const symbol = useMemo(
    () => getTradingViewSymbol({ ticker, exchange, market }),
    [ticker, exchange, market],
  );
  const quoteHref = getLiveQuoteHref({ ticker, exchange, market });
  const isKorea = market === "korea";

  return (
    <section className="bd-card bd-card-padding">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="bd-badge">주가 차트</span>
          <h2 className="bd-title-md mt-4">
            {companyNameKo}({ticker}) 주가 흐름
          </h2>
          <p className="bd-text-main mt-3">
            현재 주가가 어느 구간에 있는지 추세와 이전 고점·저점을 함께 확인해보세요. 단기 등락만 보기보다 실적 발표 전후의 흐름도 같이 보는 편이 좋습니다.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-300">
          <div className="font-semibold text-white">종목 코드</div>
          <div>{symbol}</div>
          <a href={quoteHref} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-semibold text-cyan-300 hover:text-cyan-200">
            {isKorea ? "네이버 금융에서 보기 →" : "TradingView에서 크게 보기 →"}
          </a>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60">
        <UnifiedTradingViewChart
          ticker={ticker}
          exchange={exchange}
          market={market}
          companyNameKo={companyNameKo}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs leading-6 text-slate-500">
        해외 종목은 TradingView에서, 국내 종목은 네이버 금융 차트로 확인할 수 있습니다. 국내 종목은 위 기간 버튼으로 일·주·월·1년·3년 흐름을 볼 수 있으며, 현재가는 네이버 금융에서 확인해 주세요. 시세는 실제 거래와 차이가 날 수 있으므로 투자 전 최신 정보를 함께 확인하세요.
      </div>
    </section>
  );
}
