import type { Checkpoints } from "@/lib/stocks/types";

export default function StockCheckpoints({ checkpoints }: { checkpoints: Checkpoints }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
        <div className="text-sm font-semibold text-emerald-200">긍정 포인트</div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-emerald-50/90">
          {checkpoints.positives.map((item) => (
            <li key={item} className="rounded-2xl border border-emerald-500/10 bg-slate-950/40 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">
        <div className="text-sm font-semibold text-amber-100">유의 포인트</div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-50/90">
          {checkpoints.cautions.map((item) => (
            <li key={item} className="rounded-2xl border border-amber-500/10 bg-slate-950/40 p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
