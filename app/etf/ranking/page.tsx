import type { Metadata } from "next";
import { getEtfRankings, isFmpConfigured } from "@/lib/etf/fmp";
import { EmptyState, formatCurrency, formatPercent, InfoNotice, NavPills, PageHero, StatBox } from "@/components/etf/EtfUi";

export const metadata: Metadata = {
  title: "ETF 순위",
  description: "BlueDino가 추적하는 주요 미국 ETF의 배당수익률, 운용보수, AUM을 한 화면에서 비교할 수 있는 ETF 순위 페이지입니다.",
};

export const dynamic = "force-dynamic";

export default async function EtfRankingPage() {
  if (!isFmpConfigured()) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="BlueDino ETF Ranking"
            title="ETF 순위"
            description="FMP API 데이터를 서버 캐시에 저장한 뒤 사용자에게 제공하는 구조로 설계된 ETF 순위 메뉴입니다."
            actions={<NavPills />}
          />
          <InfoNotice>현재는 FMP_API_KEY가 설정되지 않아 실데이터를 불러오지 못하고 있습니다. Vercel 또는 로컬 환경변수에 키를 추가하면 바로 동작합니다.</InfoNotice>
        </div>
      </div>
    );
  }

  let rows: Awaited<ReturnType<typeof getEtfRankings>> = [];

  try {
    rows = await getEtfRankings();
  } catch (error) {
    console.error("ETF rankings load failed", error);
  }
  const top = rows[0];

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <PageHero
          badge="BlueDino ETF Ranking"
          title="ETF 순위"
          description="배당수익률, 운용보수, 자산규모를 함께 반영해 BlueDino 방식으로 주요 ETF를 정리했습니다. API 응답은 서버 캐시에 저장되므로 방문자가 늘어나도 FMP 호출을 반복하지 않도록 설계했습니다."
          actions={<NavPills />}
        />

        <section className="grid gap-4 md:grid-cols-3">
          <StatBox label="추적 ETF" value={`${rows.length}개`} sub="대표 ETF 유니버스 기반" />
          <StatBox label="캐시 정책" value="6시간" sub="서버 캐시 후 재사용" />
          <StatBox label="현재 1위" value={top?.symbol ?? "-"} sub={top?.displayName ?? "데이터 없음"} />
        </section>

        <InfoNotice>
          순위 점수는 배당수익률, 자산규모(AUM), 운용보수를 함께 반영한 내부 참고용 지표입니다. 실제 투자 판단보다는 빠른 비교와 탐색을 위한 용도로 활용하세요.
        </InfoNotice>

        {rows.length === 0 ? (
          <EmptyState title="표시할 ETF 데이터가 없습니다" description="FMP 응답이 비어 있거나 일시적으로 불안정할 수 있습니다. 잠시 후 다시 시도해 주세요." />
        ) : (
          <section className="bd-card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-slate-200">
                <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-4">순위</th>
                    <th className="px-4 py-4">ETF</th>
                    <th className="px-4 py-4">카테고리</th>
                    <th className="px-4 py-4">가격</th>
                    <th className="px-4 py-4">1일 등락</th>
                    <th className="px-4 py-4">배당수익률</th>
                    <th className="px-4 py-4">운용보수</th>
                    <th className="px-4 py-4">AUM</th>
                    <th className="px-4 py-4">BlueDino 점수</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.symbol} className="border-t border-slate-800 bg-slate-900/70 hover:bg-slate-900">
                      <td className="px-4 py-4 font-semibold text-white">#{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">{row.symbol}</div>
                        <div className="text-xs text-slate-400">{row.displayName}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-300">{row.category}</td>
                      <td className="px-4 py-4">{formatCurrency(row.price)}</td>
                      <td className={`px-4 py-4 font-medium ${row.changePercent !== null && row.changePercent >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                        {formatPercent(row.changePercent)}
                      </td>
                      <td className="px-4 py-4">{formatPercent(row.dividendYieldPercent)}</td>
                      <td className="px-4 py-4">{formatPercent(row.expenseRatioPercent)}</td>
                      <td className="px-4 py-4">{formatCurrency(row.assetsUnderManagement, true)}</td>
                      <td className="px-4 py-4 font-semibold text-cyan-300">{row.score.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
