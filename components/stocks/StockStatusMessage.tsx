import Link from "next/link";
import StockSearchForm from "@/components/stocks/StockSearchForm";

const popularTickers = ["AAPL", "MSFT", "NVDA", "AMZN", "META", "PLTR"];

export default function StockStatusMessage({
  title,
  description,
  ticker,
  severity = "neutral",
}: {
  title: string;
  description: string;
  ticker?: string;
  severity?: "neutral" | "warning" | "error";
}) {
  const tone = severity === "error"
    ? "border-rose-500/20 bg-rose-500/10"
    : severity === "warning"
    ? "border-amber-500/20 bg-amber-500/10"
    : "border-slate-800 bg-slate-900/70";

  const eyebrow = severity === "error" ? "오류 안내" : severity === "warning" ? "지원 범위 안내" : "안내";

  return (
    <section className={`rounded-3xl border ${tone} p-6 md:p-8`}>
      <div className="max-w-4xl space-y-5">
        <span className="bd-badge">{eyebrow}</span>
        <h1 className="bd-title-lg">{title}</h1>
        <p className="bd-text-sub">{description}</p>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="mb-1 text-sm font-semibold text-slate-100">다른 미국 기업 티커 바로 검색</div>
          <p className="mb-3 text-xs leading-6 text-slate-400">현재는 미국 일반 기업만 지원합니다. ETF, 리츠, 펀드, SPAC은 제외됩니다.</p>
          <StockSearchForm initialTicker={ticker ?? ""} compact />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/stocks" className="bd-button-primary">미국 기업분석 홈으로</Link>
          {ticker ? (
            <Link href={`/stocks/${ticker}`} className="bd-button-secondary">현재 티커 다시 시도</Link>
          ) : null}
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">빠른 예시 티커</div>
          <div className="flex flex-wrap gap-2">
            {popularTickers.map((item) => (
              <Link
                key={item}
                href={`/stocks/${item}`}
                className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
