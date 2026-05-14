import type { Metadata } from "next";
import { getEtfRankings, isFmpConfigured } from "@/lib/etf/fmp";
import { EmptyState, formatCurrency, formatPercent, InfoNotice, NavPills, PageHero, StatBox } from "@/components/etf/EtfUi";

export const metadata: Metadata = {
  title: "ETF 순위 | 배당수익률·운용보수·AUM 비교",
  description: "주요 미국 ETF의 배당수익률, 운용보수, 자산규모와 참고 점수를 함께 비교할 수 있는 ETF 순위 페이지입니다.",
  alternates: { canonical: "/etf/ranking" },
  openGraph: {
    title: "ETF 순위 | 배당수익률·운용보수·AUM 비교",
    description: "주요 미국 ETF의 배당수익률, 운용보수, 자산규모와 참고 점수를 함께 비교할 수 있는 ETF 순위 페이지입니다.",
    url: "https://bluedino.kr/etf/ranking",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETF 순위 | 배당수익률·운용보수·AUM 비교",
    description: "주요 미국 ETF의 배당수익률, 운용보수, 자산규모와 참고 점수를 함께 비교할 수 있는 ETF 순위 페이지입니다.",
  },
};

export const dynamic = "force-dynamic";

export default async function EtfRankingPage() {
  if (!isFmpConfigured()) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="ETF 순위 비교"
            title="ETF 순위"
            description="주요 ETF의 배당수익률, 운용보수, 자산규모를 한눈에 비교할 수 있는 ETF 순위 메뉴입니다."
            actions={<NavPills />}
          />
          <InfoNotice>현재 ETF 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</InfoNotice>
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
          badge="ETF 순위 비교"
          title="ETF 순위"
          description="배당수익률, 운용보수, 자산규모를 함께 보면서 주요 ETF를 빠르게 비교할 수 있습니다."
          actions={<NavPills />}
        />

        <section className="grid gap-4 md:grid-cols-3">
          <StatBox label="추적 ETF" value={`${rows.length}개`} sub="대표 ETF 유니버스 기반" />
          <StatBox label="비교 기준" value="수익률·비용" sub="배당수익률과 운용보수 참고" />
          <StatBox label="현재 1위" value={top?.symbol ?? "-"} sub={top?.displayName ?? "데이터 없음"} />
        </section>

        <InfoNotice>
          순위 점수는 배당수익률, 자산규모(AUM), 운용보수를 함께 반영한 내부 참고용 지표입니다. 실제 투자 판단보다는 빠른 비교와 탐색을 위한 용도로 활용하세요.
        </InfoNotice>

        {rows.length === 0 ? (
          <EmptyState title="표시할 ETF 데이터가 없습니다" description="현재 ETF 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요." />
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
