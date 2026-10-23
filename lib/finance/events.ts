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
  slug:"kakaopay-securities-random-stock-invite-2026",
  company:"카카오페이증권",category:"증권",participationType:"친구 초대",
  title:"친구 초대하고 랜덤 주식 뽑기",
  benefit:"추첨 시 100원~최대 100만원 상당 랜덤 주식",
  endsAt:"2026-12-31",verifiedAt:"2026-10-23",
  sourceType:"user-supplied-app-screen",
  hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["만 19세 이상 카카오페이증권 고객","기존 주식 거래 이력에 따라 참여 방법이 다를 수 있는 고객"],
  steps:["카카오페이증권 앱에서 랜덤 주식 뽑기 이벤트를 열어요.","최초 랜덤 주식 뽑기 대상이라면 앱에서 해당 기회를 먼저 사용해요.","앱의 '친구 초대하고 주식 뽑기' 메뉴를 통해 친구에게 초대 링크를 보내요.","친구가 초대 이벤트 페이지에 방문하고 초대가 인정되면 추가 뽑기 기회가 주어질 수 있어요."],
  cautions:["이벤트 기간은 첨부된 카카오페이증권 앱 화면 기준 2026년 8월 12일부터 12월 31일까지예요. 사전 예고 없이 변경·중단될 수 있어요.","100원~100만원은 랜덤 주식의 보상 범위로 특정 주식이나 최대 금액 당첨을 보장하지 않아요.","비회원 친구는 회원가입 이후 초대가 인정될 수 있고, 초대받은 친구의 이벤트 페이지 방문 확인이 필요해요.","최초 뽑기 기회와 추가 친구 초대 기회는 기존 주식 거래 이력에 따라 다르게 적용돼요.","개인 초대 링크의 공개 웹사이트 게시 허용 여부는 확인되지 않아 링크를 제공하지 않아요.","현재 공개된 공식 웹 이벤트 주소를 확인하지 못했으므로 카카오페이증권 앱에서 직접 최신 조건을 확인해 주세요."]
 },

 {
  slug:"kakaobank-mirae-first-account-2026",company:"카카오뱅크",category:"은행",participationType:"신규 가입",
  title:"카카오뱅크에서 미래에셋증권 첫 계좌 개설",benefit:"첫 계좌 개설 축하금 1만원",
  endsAt:"2026-12-31",verifiedAt:"2026-10-23",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["미래에셋증권 계좌를 이전에 개설한 적 없는 최초 신규 고객","카카오뱅크에서 미래에셋증권 다이렉트 주식계좌를 개설하는 고객"],
  steps:["카카오뱅크 공식 증권계좌 개설 안내에서 대상 조건을 확인해요.","카카오뱅크 앱에서 미래에셋증권 주식계좌를 최초로 개설해요.","계좌 상태가 정상인지와 개설축하금 지급 여부를 확인해요."],
  cautions:["첫 계좌 개설 축하금 1만원은 2026년 12월 31일까지의 신규 개설 혜택입니다.","추가로 안내되는 투자지원금 2만원은 국내주식 매수에 사용해야 하며 기한 내 사용하지 않으면 회수됩니다. 기본 축하금과 구분하세요.","다른 신규 개설 행사와 보상이 중복되지 않을 수 있습니다.","공식 페이지에서 상세 조건과 변경 여부를 확인하세요."],
  officialUrl:"https://www.kakaobank.com/products/miraeStockAccount"
 },
 {
  slug:"kbank-samsung-first-account-2026",company:"케이뱅크",category:"은행",participationType:"신규 가입",
  title:"케이뱅크에서 삼성증권 첫 계좌 개설",benefit:"신규 개설 후 행사 신청 시 투자지원금 3만원",
  endsAt:"2026-10-30",verifiedAt:"2026-10-23",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["삼성증권 최초 신규 계좌 개설 고객","케이뱅크를 통해 이벤트 기간 내 계좌를 개설하고 삼성증권 앱에서 대상 이벤트를 신청하는 고객"],
  steps:["케이뱅크 공식 안내에서 최초 신규 고객 자격을 확인해요.","이벤트 기한 내 케이뱅크 경유 삼성증권 계좌를 개설해요.","삼성증권 mPOP 앱에서 국내주식 고객감사 이벤트를 신청해요.","3만원 신청 혜택과 별도로 안내된 추가 실적 조건을 구분해 확인해요."],
  cautions:["투자지원금 최대 10만원 가운데 기본 신청 혜택은 3만원이며, 나머지 7만원은 100만원 이상 매수와 잔고 유지 조건을 충족해야 합니다.","케이뱅크 별도 현금 최대 2만원도 잔고 조건에 따라 지급됩니다.","이벤트 신청이 필요하며 계좌 개설만으로 모든 혜택을 받을 수 없습니다.","투자지원금의 출금·사용 제한은 공식 안내를 확인하세요."],
  officialUrl:"https://www.kbanknow.com/web/product/invest/samsung"
 },

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
 return financeEvents.filter(e=>e.verifiedAt && (e.officialUrl?.startsWith("https://") || e.sourceType==="user-supplied-app-screen") && (!e.endsAt||e.endsAt>=date) && !e.hasRequiredPayment && !e.hasRequiredTrade);
}
