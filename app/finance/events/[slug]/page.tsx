import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { financeEvents, publishedEvents } from "@/lib/finance/events";
export const revalidate = 3600;
export function generateStaticParams(){return financeEvents.map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const e=publishedEvents().find(x=>x.slug===slug);
 if(!e)return {title:"종료되었거나 확인되지 않은 이벤트",robots:{index:false}};
 return {title:`${e.company} ${e.title} | BlueDino`,description:`${e.benefit}. 참여 대상과 추가 조건을 확인하세요.`,alternates:{canonical:`/finance/events/${slug}`}};
}
export default async function EventDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const e=publishedEvents().find(x=>x.slug===slug);
 if(!e)notFound();
 const usesReferral=Boolean(e.referralAllowed && e.referralUrl);
 const url=usesReferral?e.referralUrl!:e.officialUrl;
 return <main className="bd-page"><article className="bd-container mx-auto max-w-3xl space-y-5 pb-10">
 <Link href="/finance/events" className="inline-flex min-h-10 items-center text-[13px] text-blue-200">← 금융 혜택 전체</Link>
 <header className="space-y-2"><p className="text-[12px] text-slate-400">{e.company} · {e.participationType}</p><h1 className="text-[22px] font-bold leading-snug text-white md:text-3xl">{e.title}</h1><p className="text-[12px] text-slate-400">{e.endsAt ? `응모 마감 ${e.endsAt}` : "종료일 별도 공지"} · 최종 확인 {e.verifiedAt}</p></header>
 <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4"><h2 className="text-[13px] font-semibold text-slate-300">받을 수 있는 혜택</h2><p className="mt-2 text-[19px] font-bold leading-7 text-white">{e.benefit}</p><p className="mt-2 text-[13px] leading-6 text-amber-100">추가 혜택에는 별도의 거래 등 조건이 있을 수 있습니다. 필요 없는 거래를 혜택만을 위해 진행하지 마세요.</p></section>
 <section className="space-y-2"><h2 className="text-[17px] font-semibold text-white">누가 참여할 수 있나요?</h2><ul className="list-disc space-y-1 pl-5 text-[14px] leading-6 text-slate-200">{e.audience.map(s=><li key={s}>{s}</li>)}</ul></section>
 <section className="space-y-2"><h2 className="text-[17px] font-semibold text-white">참여 방법</h2><ol className="list-decimal space-y-2 pl-5 text-[14px] leading-6 text-slate-200">{e.steps.map(s=><li key={s}>{s}</li>)}</ol></section>
 <section className="space-y-2"><h2 className="text-[17px] font-semibold text-white">참여 전 확인할 사항</h2><ul className="list-disc space-y-1 pl-5 text-[14px] leading-6 text-slate-200">{e.cautions.map(s=><li key={s}>{s}</li>)}</ul></section>
 {usesReferral&&<p className="rounded-xl border border-blue-800/60 bg-blue-950/40 p-3 text-[13px] leading-6 text-blue-100">이 페이지에는 운영자가 추천 보상을 받을 수 있는 초대 링크가 포함되어 있습니다.</p>}
 <a href={url} target="_blank" rel={usesReferral?"noopener noreferrer sponsored":"noopener noreferrer"} className="flex min-h-12 items-center justify-center rounded-xl bg-[#1E3A5F] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#27496f]">공식 이벤트 상세 조건 확인하기 ↗</a>
 <p className="text-[12px] leading-5 text-slate-400">상품 이용 및 응모 전에 금융사 공식 안내에서 최신 조건과 유의사항을 확인하세요.</p>
 </article></main>;
}
