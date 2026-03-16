import type { ScoreBreakdown } from "@/lib/stocks/types";

const scoreLabels: Array<{ key: keyof Omit<ScoreBreakdown, "total" | "grade" | "summary">; label: string }> = [
  { key: "growth", label: "성장성" },
  { key: "profitability", label: "수익성" },
  { key: "stability", label: "안정성" },
  { key: "valuation", label: "밸류에이션" },
  { key: "momentum", label: "주가 흐름" },
];

export default function StockScoreCard({ score }: { score: ScoreBreakdown }) {
  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="bd-badge">BlueDino Score</div>
          <h2 className="mt-4 bd-title-lg">종합 정량 점수 {score.total}점</h2>
          <p className="mt-3 max-w-2xl bd-text-sub">{score.summary}</p>
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-5 text-center">
          <div className="text-sm text-cyan-200">등급</div>
          <div className="mt-2 text-5xl font-black text-white">{score.grade}</div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {scoreLabels.map((item) => (
          <article key={item.key} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</div>
            <div className="mt-3 text-3xl font-bold text-white">{score[item.key]}</div>
            <div className="text-xs text-slate-400">/ 20점</div>
          </article>
        ))}
      </div>
    </section>
  );
}
