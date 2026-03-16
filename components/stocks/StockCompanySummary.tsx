// components/stocks/StockCompanySummary.tsx

type StockCompanySummaryProps = {
  lines: string[];
};

export default function StockCompanySummary({ lines }: StockCompanySummaryProps) {
  if (!lines || lines.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white md:text-xl">기업 / 산업 이해하기</h2>
        <p className="mt-1 text-sm text-slate-400">
          이 기업이 어떤 산업에 속해 있고, 투자할 때 무엇을 같이 봐야 하는지 빠르게 정리했습니다.
        </p>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <p
            key={`${line}-${index}`}
            className="text-sm leading-7 text-slate-200 md:text-[15px]"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}