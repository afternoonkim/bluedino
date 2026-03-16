import Link from "next/link";
import type { Metadata } from "next";
import StockSearchForm from "@/components/stocks/StockSearchForm";

export const metadata: Metadata = {
  title: "미국 기업분석",
  description: "미국 상장 기업의 현재 주가, 재무 흐름, 핵심 지표를 바탕으로 BlueDino 정량 점수를 확인할 수 있는 기업분석 페이지입니다.",
};

const popularTickers = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "PLTR", "SOFI"];

export default function StocksPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="bd-card bd-card-padding overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-4xl space-y-5">
            <span className="bd-badge">BlueDino Stocks</span>
            <h1 className="bd-title-xl">미국 기업분석 콘텐츠</h1>
            <p className="bd-text-sub">
              미국 일반 기업 티커를 검색하면 현재 주가, 최근 가격 흐름, 핵심 재무지표,
              재무 추이, BlueDino 정량 점수를 한 번에 확인할 수 있습니다. 현재는 ETF와
              리츠를 제외한 미국 일반 기업만 지원합니다.
            </p>
            <StockSearchForm />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">이 페이지에서 보는 항목</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "현재 주가와 52주 범위",
                "1년 가격 흐름 차트",
                "PER · PBR · PSR · ROE",
                "최근 4~5년 재무 추이",
                "BlueDino 종합 점수",
                "투자 체크포인트 요약",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">빠른 예시 티커</h2>
            <p className="mt-3 bd-text-sub">
              아래 티커를 눌러 바로 기업분석 페이지를 열어볼 수 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {popularTickers.map((ticker) => (
                <Link
                  key={ticker}
                  href={`/stocks/${ticker}`}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  {ticker}
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
