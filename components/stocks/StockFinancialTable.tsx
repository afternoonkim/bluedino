import type { FinancialYear } from "@/lib/stocks/types";

function compact(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function fixed(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(value);
}

export default function StockFinancialTable({ financials }: { financials: FinancialYear[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-950/60 text-left text-sm text-slate-200">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-4">연도</th>
              <th className="px-4 py-4">매출</th>
              <th className="px-4 py-4">영업이익</th>
              <th className="px-4 py-4">순이익</th>
              <th className="px-4 py-4">EPS</th>
              <th className="px-4 py-4">자기자본</th>
              <th className="px-4 py-4">FCF</th>
            </tr>
          </thead>
          <tbody>
            {financials.map((row) => (
              <tr key={row.year} className="border-t border-slate-800">
                <td className="px-4 py-4 font-semibold text-white">{row.year}</td>
                <td className="px-4 py-4">{compact(row.revenue)}</td>
                <td className="px-4 py-4">{compact(row.operatingIncome)}</td>
                <td className="px-4 py-4">{compact(row.netIncome)}</td>
                <td className="px-4 py-4">{fixed(row.eps)}</td>
                <td className="px-4 py-4">{compact(row.totalEquity)}</td>
                <td className="px-4 py-4">{compact(row.freeCashFlow)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
