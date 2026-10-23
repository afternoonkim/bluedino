"use client";
import { useState } from "react";
import { Copy, ExternalLink, Check } from "lucide-react";
import { track } from "@vercel/analytics";
const items = [
 {id:"kbank-alpha",name:"케이뱅크 알파카드",code:"파란담비0470",url:"https://s.kbanknow.com/c3xHlsq",benefit:"친구와 나 각각 5,000원",target:"만 14세 이상~19세 미만 청소년 대상",steps:["아래 링크로 케이뱅크 알파카드 신청 화면에 이동","카드 발급 마지막 단계에서 추천인 코드 입력","발급 및 지급 조건을 확인"],note:"추천인 코드는 발급 신청 과정에서 입력합니다. 실제 지급 조건은 케이뱅크 안내를 확인하세요."},
 {id:"bithumb",name:"빗썸",code:"PSZCWYVMNH",url:"https://m.bithumb.com/react/referral/guide?referral=PSZCWYVMNH",benefit:"신규 가입·계좌 연결 친구 초대 혜택",target:"생애 최초 신규 가입자 등 대상 조건 적용",steps:["추천 링크에서 빗썸의 최신 초대 혜택 확인","신규 가입 후 이벤트 안내에 따라 코드 등록","고객 확인 및 계좌 연결 등 보상 조건 충족"],note:"추가 보상에는 가상자산 거래가 필요할 수 있습니다. 불필요한 거래는 하지 마세요."},
 {id:"kakaopay",name:"카카오페이증권",code:"0RXWXVC70TBD7",url:"https://kko.kakao.com/P_FTF_SEC_2608V1?invite_code=0RXWXVC70TBD7&sb=y",benefit:"친구 초대 시 랜덤 주식 뽑기 기회",target:"만 19세 이상 등 이벤트별 대상 조건 적용",steps:["친구 초대 링크로 이벤트 화면 열기","카카오페이증권 가입·로그인 후 참여 대상 확인","이벤트 페이지 방문 및 초대 인정 절차 완료"],note:"행사 안내상 2026년 12월 31일 종료 예정입니다. 당첨 주식과 지급액은 랜덤입니다."},
 {id:"monimo",name:"모니모",code:"OXGWCWK",url:"https://m.monimo.com/monimo/homepage/friend/PGIFPMCHomepageFriendInviteBridge001?mnmExcnCmpActiId=MM26072220_002_0001&frndInvtCd=OXGWCWK&invateDate=20261023&isAllJunior=false",benefit:"신규 가입 후 초대코드 입력 시 스페셜젤리 1개",target:"처음 가입하는 사용자 대상",steps:["링크로 모니모 가입","가입 과정에서 코드 입력","젤리 지급 및 교환 확인"],note:"2026년 10월 화면상 초대인은 친구당 모니머니 5천원 추가 혜택(최대 5만원)이 안내됩니다. 가입·코드 입력 기한 10월 31일까지."},
 {id:"lapl",name:"라플",code:"20250499410",url:"https://m.lifeplanet.co.kr/bridge/bm/BM07000S.dev?shareCd=20250499410",benefit:"친구 초대 1,000P 및 추가 NFT 신발 이벤트",target:"라플레이 친구 초대 행사 참여 대상",steps:["라플 회원가입","라플레이 서비스 이용 동의 후 플레이코드 입력","초대 및 포인트 지급 조건 확인"],note:"NFT 신발은 친구 3명 초대 등 별도 조건이 필요합니다. NFT의 현금 가치나 수익은 보장되지 않습니다."},
] as const;
export default function ReferralCodeList() {
 const [copied,setCopied]=useState<string|null>(null);
 function copyCode(id:string,code:string) {
  void navigator.clipboard.writeText(code).then(()=>{setCopied(id);track("referral_code_copy",{app:id});}).catch(()=>{setCopied(null);});
 }
 return <section aria-label="앱테크 추천인 코드 목록" className="divide-y divide-slate-800 border-y border-slate-800">
  {items.map(item=><article key={item.id} className="space-y-3 py-5 first:pt-2">
   <div className="space-y-1">
    <h2 className="text-[17px] font-bold text-white">{item.name}</h2>
    <p className="text-[13px] font-semibold text-blue-200">{item.benefit}</p>
    <p className="text-[12px] leading-5 text-slate-400">{item.target}</p>
   </div>
   <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
    <div className="min-w-0"><p className="text-[11px] text-slate-400">추천인 코드</p><p className="break-all text-[16px] font-bold tracking-wide text-white">{item.code}</p></div>
    <button type="button" onClick={()=>copyCode(item.id,item.code)} aria-label={item.name+" 코드 복사"} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-[#1E3A5F] px-3 text-[13px] font-semibold text-white hover:bg-[#27496f]">{copied===item.id?<Check className="h-4 w-4"/>:<Copy className="h-4 w-4"/>}{copied===item.id?"복사됨":"복사"}</button>
   </div>
   <div>
    <h3 className="text-[13px] font-semibold text-slate-100">입력·참여 방법</h3>
    <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-[13px] leading-6 text-slate-300">{item.steps.map(step=><li key={step}>{step}</li>)}</ol>
   </div>
   <p className="text-[12px] leading-5 text-slate-400">{item.note}</p>
   <p className="text-[11px] leading-5 text-slate-400">이 링크로 가입·참여하면 BlueDino 운영자가 추천 보상을 받을 수 있습니다. 공개 게시 시 보상 인정 여부는 서비스별 약관에 따릅니다.</p>
   <a href={item.url} target="_blank" rel="noopener noreferrer sponsored" onClick={()=>track("referral_link_click",{app:item.id})} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#27496f]">{item.name} 참여하러 가기 <ExternalLink className="h-4 w-4" /></a>
  </article>)}
 </section>;
}
