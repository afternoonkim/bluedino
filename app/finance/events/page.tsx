import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { publishedEvents } from "@/lib/finance/events";
import EventList from "@/components/finance/EventList";

export const metadata: Metadata = {
 title: "금융 혜택·이벤트 | 은행·증권·가상자산 | BlueDino",
 description: "카카오뱅크·케이뱅크·토스·빗썸·업비트 등 7개 금융사의 공식 이벤트와 친구 초대 혜택을 확인하세요.",
 alternates: { canonical: "/finance/events" },
};
export const revalidate = 3600;

export default function FinanceEventsPage() {
 const events = publishedEvents();
 return (
  <main className="bd-page">
   <div className="bd-container mx-auto max-w-4xl space-y-5 pb-8">
    <header className="space-y-2 py-3 md:py-6">
     <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
      <Gift className="h-4 w-4" aria-hidden="true" /> 금융 혜택
     </div>
     <h1 className="text-[22px] font-bold tracking-tight text-white md:text-3xl">지금 확인할 금융 이벤트</h1>
     <p className="max-w-2xl text-[14px] leading-6 text-slate-300">
      친구 초대·신규 가입·출석 체크·간편 참여 혜택을 모았어요.
     </p>
    </header>
    <EventList events={events} />
   </div>
  </main>
 );
}
