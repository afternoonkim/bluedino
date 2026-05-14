import type { Metadata } from "next";
import { getEtfDividendCalendar, isFmpConfigured } from "@/lib/etf/fmp";
import { EmptyState, formatDate, formatPercent, InfoNotice, NavPills, PageHero, StatBox } from "@/components/etf/EtfUi";

export const metadata: Metadata = {
  title: "ETF 배당 캘린더 | 미국 ETF 배당 일정 확인",
  description: "대표 미국 ETF의 예정 배당 일정, 배당락일, 지급일, 배당수익률을 한 화면에서 확인할 수 있는 ETF 배당 캘린더입니다.",
  alternates: { canonical: "/etf/dividend-calendar" },
  openGraph: {
    title: "ETF 배당 캘린더 | 미국 ETF 배당 일정 확인",
    description: "대표 미국 ETF의 예정 배당 일정, 배당락일, 지급일, 배당수익률을 한 화면에서 확인할 수 있는 ETF 배당 캘린더입니다.",
    url: "https://bluedino.kr/etf/dividend-calendar",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETF 배당 캘린더 | 미국 ETF 배당 일정 확인",
    description: "대표 미국 ETF의 예정 배당 일정, 배당락일, 지급일, 배당수익률을 한 화면에서 확인할 수 있는 ETF 배당 캘린더입니다.",
  },
};

export const dynamic = "force-dynamic";

export default async function EtfDividendCalendarPage() {
  if (!isFmpConfigured()) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="ETF 배당 캘린더"
            title="ETF 배당 캘린더"
            description="대표 미국 ETF의 배당락일, 기준일, 지급일을 한 화면에서 확인할 수 있는 ETF 배당 캘린더입니다."
            actions={<NavPills />}
          />
          <InfoNotice>현재 ETF 배당 일정을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</InfoNotice>
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
          badge="ETF 배당 캘린더"
          title="ETF 배당 캘린더"
          description="주요 ETF의 예정 배당락일, 기준일, 지급일, 배당금을 한곳에서 확인할 수 있습니다."
          actions={<NavPills />}
        />

        <section className="grid gap-4 md:grid-cols-3">
          <StatBox label="이번 캘린더" value={thisMonth} sub="다가오는 ETF 일정" />
          <StatBox label="예정 이벤트" value={`${events.length}건`} sub="대표 ETF만 필터링" />
          <StatBox label="확인 항목" value="배당 일정" sub="배당락일·지급일 중심" />
        </section>

        <InfoNotice>
          이 페이지는 BlueDino가 추적하는 주요 ETF의 배당 일정을 모아 보여줍니다. 배당락일과 지급일이 가까운 ETF를 확인하고, 월별 현금흐름을 점검할 때 참고해 보세요.
        </InfoNotice>

        {events.length === 0 ? (
          <EmptyState title="표시할 배당 일정이 없습니다" description="현재 확인 가능한 예정 배당 일정이 없습니다. 잠시 후 다시 확인해 주세요." />
        ) : (
          <section className="bd-card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-slate-200">
                <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-4">ETF</th>
                    <th className="px-4 py-4">카테고리</th>
                    <th className="px-4 py-4">배당락일</th>
                    <th className="px-4 py-4">기준일</th>
                    <th className="px-4 py-4">지급일</th>
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
