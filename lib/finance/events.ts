export type EventCategory = "은행" | "증권" | "가상자산";
export type ParticipationType = "친구 초대" | "신규 가입" | "출석 체크" | "간편 참여";
export type FinanceEvent = {
 slug:string;company:string;category:EventCategory;participationType:ParticipationType;
 title:string;benefit:string;endsAt?:string;verifiedAt:string;
 audience:string[];steps:string[];cautions:string[];officialUrl:string;
 referralUrl?:string;referralAllowed?:boolean;
 hasRequiredTrade:boolean;hasRequiredPayment:boolean;
};
// 대출·신용카드 발급 및 이용 실적·고액 거래 유도 이벤트는 등록하지 않습니다.
// 친구 초대 코드는 공개 웹 게시 허용이 확인된 경우에만 사용합니다.
export const financeEvents:FinanceEvent[] = [
 {
  slug:"bithumb-friend-invite",company:"빗썸",category:"가상자산",participationType:"친구 초대",
  title:"빗썸 친구 초대: 신규 가입·계좌 연결 혜택",benefit:"계좌 연결 시 1만원, 거래 시 추가 4만원(신규 초대받은 고객)",
  verifiedAt:"2026-10-23",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["빗썸에 가입한 이력이 없는 생애 최초 가입 고객","초대 코드를 유효 기간 내 등록하고 고객확인 및 KB국민은행 계좌 연결 조건을 충족하는 고객"],
  steps:["빗썸 공식 친구 초대 안내의 최신 조건을 확인해요.","생애 최초 회원가입 후 안내된 기간 내 고객확인을 완료해요.","가입 시점 이전에 만들어진 친구 초대 코드를 유효 기간 안에 등록해요.","KB국민은행 원화 계좌를 연결하면 계좌 연결 단계의 혜택 조건을 확인할 수 있어요."],
  cautions:["2026년 3월 26일부터 신규 초대받은 고객의 혜택은 계좌 연결 시 1만원, 원화마켓 30만원 이상 거래 시 추가 4만원으로 변경되었습니다.","추가 4만원을 받으려면 가상자산 거래가 필요합니다. 가격 변동과 수수료로 손실이 발생할 수 있으므로 보상만을 위해 거래하지 마세요.","공식 서비스의 유지·종료 여부 및 이벤트 대상 제한은 참여 직전에 다시 확인하세요.","추천인의 보상은 공식 조건과 별개이며, 공개 웹사이트의 개인 추천 코드 게시는 아직 허용 확인되지 않아 제공하지 않습니다.","다른 생애 최초 가입 혜택과 중복되지 않을 수 있고, 지급받은 혜택에는 출금·소멸 조건이 있습니다."],
  officialUrl:"https://feed.bithumb.com/notice/1648694"
 }
];
export const targetCompanies = ["카카오페이증권","카카오뱅크","케이뱅크","토스증권","토스뱅크","빗썸","업비트"] as const;
export function publishedEvents(now=new Date()){
 const date=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
 return financeEvents.filter(e=>e.verifiedAt && e.officialUrl.startsWith("https://") && (!e.endsAt||e.endsAt>=date) && !e.hasRequiredPayment && !e.hasRequiredTrade);
}
