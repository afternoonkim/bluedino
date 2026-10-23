"use client";
import { track } from "@vercel/analytics";
type Props = {href:string;slug:string;kind:"referral"|"official"};
export default function EventOutboundLink({href,slug,kind}:Props){
 const label=kind==="referral"?"초대 링크로 참여하기":"공식 이벤트에서 조건 확인하기";
 return <a href={href} target="_blank" rel={kind==="referral"?"noopener noreferrer sponsored":"noopener noreferrer"} onClick={()=>{
  try {track("finance_event_outbound_click",{event_slug:slug,link_type:kind});}catch{}
 }} className="flex min-h-12 items-center justify-center rounded-xl bg-[#1E3A5F] px-4 py-3 text-center text-[14px] font-semibold text-white hover:bg-[#27496f] focus-visible:outline-2 focus-visible:outline-blue-300">{label} ↗</a>;
}
