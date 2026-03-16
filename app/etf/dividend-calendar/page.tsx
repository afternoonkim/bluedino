import type { Metadata } from "next";
import { getEtfDividendCalendar, isFmpConfigured } from "@/lib/etf/fmp";
import { EmptyState, formatDate, formatPercent, InfoNotice, NavPills, PageHero, StatBox } from "@/components/etf/EtfUi";

export const metadata: Metadata = {
  title: "ETF 배당 캘린더",
  description: "BlueDino가 추적하는 대표 ETF의 예정 배당 일정을 ex-date, 지급일, 배당수익률 기준으로 정리한 페이지입니다.",
};

export const dynamic = "force-dynamic";

export default async function EtfDividendCalendarPage() {
  if (!isFmpConfigured()) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="BlueDino Dividend Calendar"
            title="ETF 배당 캘린더"
            description="배당 일정 데이터를 서버 캐시에 저장한 뒤 방문자에게 재사용하는 구조의 ETF 배당 캘린더입니다."
            actions={<NavPills />}
          />
          <InfoNotice>현재는 FMP_API_KEY가 설정되지 않아 배당 일정을 불러오지 못하고 있습니다. 환경변수를 설정하면 자동으로 캘린더가 채워집니다.</InfoNotice>
        </div>
      </div>
    );
  }

  let events: Awaited<ReturnType<typeof getEtfDividendCalendar>> = [];

  try {
    events = await getEtfDividendCalendar();
  } catch (error) {
    console.error("ETF dividend calendar load failed", error);
  }
  const thisMonth = new Intl.DateTimeFormat("ko-KR", { month: "long" }).format(new Date());

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <PageHero
          badge="BlueDino Dividend Calendar"
          title="ETF 배당 캘린더"
          description="향후 예정된 ETF 배당 일정을 ex-date, record date, payment date 기준으로 빠르게 확인할 수 있는 메뉴입니다."
          actions={<NavPills />}
        />

        <section className="grid gap-4 md:grid-cols-3">
          <StatBox label="이번 캘린더" value={thisMonth} sub="다가오는 ETF 일정" />
          <StatBox label="예정 이벤트" value={`${events.length}건`} sub="대표 ETF만 필터링" />
          <StatBox label="캐시 정책" value="6시간" sub="API 호출 절감용" />
        </section>

        <InfoNotice>
          FMP의 Dividends Calendar API는 시장 전체 배당 이벤트를 제공하며, 이 페이지는 그중 BlueDino가 추적하는 ETF만 추려서 보여줍니다. 이렇게 하면 한 번의 API 응답을 여러 사용자에게 재사용할 수 있어 호출량을 크게 줄일 수 있습니다.
        </InfoNotice>

        {events.length === 0 ? (
          <EmptyState title="표시할 배당 일정이 없습니다" description="현재 추적 중인 ETF의 예정 배당 일정이 없거나 API 응답이 비어 있습니다." />
        ) : (
          <section className="bd-card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-slate-200">
                <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-4">ETF</th>
                    <th className="px-4 py-4">카테고리</th>
                    <th className="px-4 py-4">Ex-Date</th>
                    <th className="px-4 py-4">Record Date</th>
                    <th className="px-4 py-4">Payment Date</th>
                    <th className="px-4 py-4">배당금</th>
                    <th className="px-4 py-4">배당수익률</th>
                    <th className="px-4 py-4">빈도</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={`${event.symbol}-${event.date}-${index}`} className="border-t border-slate-800 bg-slate-900/70 hover:bg-slate-900">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-white">{event.symbol}</div>
                        <div className="text-xs text-slate-400">{event.displayName}</div>
                      </td>
                      <td className="px-4 py-4">{event.category}</td>
                      <td className="px-4 py-4">{formatDate(event.date)}</td>
                      <td className="px-4 py-4">{formatDate(event.recordDate)}</td>
                      <td className="px-4 py-4">{formatDate(event.paymentDate)}</td>
                      <td className="px-4 py-4">{typeof event.dividend === "number" ? `$${event.dividend.toFixed(3)}` : "-"}</td>
                      <td className="px-4 py-4">{formatPercent(typeof event.yield === "number" ? event.yield * 100 : null)}</td>
                      <td className="px-4 py-4">{event.frequency || "-"}</td>
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
