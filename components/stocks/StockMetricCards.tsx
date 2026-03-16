import type { StockMetric } from "@/lib/stocks/types";

export default function StockMetricCards({ metrics }: { metrics: StockMetric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{metric.label}</div>
          <div className="mt-3 text-2xl font-bold text-white">{metric.value}</div>
          {metric.hint ? <div className="mt-2 text-xs text-slate-400">{metric.hint}</div> : null}
        </article>
      ))}
    </div>
  );
}
