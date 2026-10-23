"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import type { FinanceEvent } from "@/lib/finance/events";
const filters = ["전체", "친구 초대", "은행", "증권", "가상자산"] as const;
export default function EventList({ events }: { events: FinanceEvent[] }) {
 const [filter, setFilter] = useState<(typeof filters)[number]>("전체");
 const [query, setQuery] = useState("");
 const shown = useMemo(() => events.filter(e => (filter === "전체" || (filter === "친구 초대" ? Boolean(e.referralUrl && e.referralAllowed) : e.category === filter)) && [e.company, e.title, e.benefit].join(" ").toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => a.endsAt.localeCompare(b.endsAt)), [events, filter, query]);
 return <section aria-label="금융 이벤트 목록" className="space-y-3">
  <div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" aria-hidden="true" /><label htmlFor="event-search" className="sr-only">금융사나 혜택 검색</label><input id="event-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="금융사·혜택 검색" className="w-full min-h-10 rounded-xl border border-slate-700 bg-slate-950/70 py-2 pl-10 pr-3 text-[14px] text-white outline-none placeholder:text-slate-500 focus:border-blue-400"/></div>
  <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="이벤트 분류">{filters.map(f=><button key={f} type="button" aria-pressed={filter===f} onClick={()=>setFilter(f)} className={`min-h-10 shrink-0 rounded-full border px-3 text-[13px] font-semibold ${filter===f?"border-blue-400/50 bg-[#1E3A5F] text-white":"border-slate-700 bg-slate-950/50 text-slate-300"}`}>{f}</button>)}</div>
  <div className="flex items-center justify-between"><h2 className="text-[16px] font-semibold text-white">진행 중인 이벤트</h2><span className="text-[12px] text-slate-400">{shown.length}건</span></div>
  {shown.length === 0 ? <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-5 py-8 text-center"><p className="text-[14px] font-semibold text-slate-100">{events.length === 0 ? "확인된 진행 이벤트를 준비하고 있어요" : "조건에 맞는 이벤트가 없어요"}</p><p className="mt-2 text-[13px] leading-6 text-slate-400">{events.length === 0 ? "공식 기간과 참여 조건을 확인한 이벤트부터 순서대로 소개할게요." : "검색어나 분류를 변경해 보세요."}</p></div> : <div className="divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50">{shown.map(e=><Link key={e.slug} href={`/finance/events/${e.slug}`} className="flex min-h-24 items-center gap-3 px-4 py-3 hover:bg-slate-900/70 focus-visible:outline-2 focus-visible:outline-blue-400"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 text-[12px] text-slate-400"><span>{e.company}</span><span>· {e.category}</span><span>· {e.endsAt}까지</span></div><h3 className="mt-1 text-[15px] font-semibold leading-6 text-white">{e.title}</h3><p className="mt-0.5 text-[13px] text-slate-300">{e.benefit}</p></div><ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true"/></Link>)}</div>}
 </section>;
}
