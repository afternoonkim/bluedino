import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { publishedEvents, targetCompanies } from "@/lib/finance/events";
import EventList from "@/components/finance/EventList";
export const metadata: Metadata = {
 title: "금융 혜택·이벤트 | 은행·증권·가상자산 | BlueDino",
 description: "카카오뱅크·케이뱅크·토스·빗썸·업비트 등 7개 금융사의 공식 이벤트와 친구 초대 혜택을 확인하세요.",
 alternates: { canonical: "/finance/events" },
};
export const revalidate = 3600;
export default function FinanceEventsPage() {
 const events = publishedEvents();
 return <main className="bd-page"><div className="bd-container mx-auto max-w-4xl space-y-5 pb-8">
   <header className="space-y-2 py-3 md:py-6">
     <div className="flex items-center gap-2 text-sm font-semibold text-blue-300"><Gift className="h-4 w-4" aria-hidden="true" /> 금융 혜택</div>
     <h1 className="text-[22px] font-bold tracking-tight text-white md:text-3xl">지금 확인할 금융 이벤트</h1>
     <p className="max-w-2xl text-[14px] leading-6 text-slate-300">은행·증권·가상자산 이벤트를 한곳에서 확인하세요. 받을 수 있는 혜택과 참여 조건을 먼저 알려드립니다.</p>
   </header>
   <EventList events={events}/>
   <section className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-4">
     <h2 className="text-[15px] font-semibold text-white">확인하는 금융사 7곳</h2>
     <p className="mt-2 text-[13px] leading-6 text-slate-300">{targetCompanies.join(" · ")}</p>
   </section>
   <section className="rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-4">
     <h2 className="text-[15px] font-semibold text-white">참여 전 확인하세요</h2>
     <p className="mt-2 text-[13px] leading-6 text-slate-300">혜택과 기간은 금융사 사정에 따라 달라질 수 있습니다. 최종 조건은 공식 이벤트 안내를 확인해 주세요. 추천 링크를 통한 보상이 발생할 수 있는 경우에는 별도로 표시합니다.</p>
     <Link href="/finance/events/guide" className="mt-3 inline-flex min-h-10 items-center gap-1 text-[13px] font-semibold text-blue-200">이벤트 확인 방법 <ArrowRight className="h-4 w-4" /></Link>
   </section>
 </div></main>;
}
