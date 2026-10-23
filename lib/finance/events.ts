export type EventCategory = "은행" | "증권" | "가상자산";
export type ParticipationType = "친구 초대" | "신규 가입" | "출석 체크" | "간편 참여";
export type FinanceEvent = {
 slug:string;company:string;category:EventCategory;participationType:ParticipationType;
 title:string;benefit:string;endsAt?:string;verifiedAt:string;
 audience:string[];steps:string[];cautions:string[];officialUrl?:string;sourceType?:"user-supplied-app-screen"|"official-web";
 referralUrl?:string;referralAllowed?:boolean;
 hasRequiredTrade:boolean;hasRequiredPayment:boolean;
};
// 대출·신용카드 발급 및 이용 실적·고액 거래 유도 이벤트는 등록하지 않습니다.
// 친구 초대 코드는 공개 웹 게시 허용이 확인된 경우에만 사용합니다.
export const financeEvents:FinanceEvent[] = [
 {
  slug:"bithumb-daily-roulette-2026",company:"빗썸",category:"가상자산",participationType:"간편 참여",
  title:"빗썸 100만 룰렛: 매일 포인트 추첨",
  benefit:"10·15·20·25·500포인트 등 랜덤 지급, 100만 포인트는 일 최대 1명 추첨",
  verifiedAt:"2026-10-23",sourceType:"user-supplied-app-screen",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["빗썸 앱에서 룰렛 티켓을 보유한 참여 가능 고객","룰렛 참여 조건 및 티켓 획득 방법은 앱 안내에서 확인해야 해요."],
  steps:["빗썸 앱의 혜택 메뉴에서 '100만 룰렛'을 확인해요.","사용할 수 있는 티켓이 있는지 확인해요.","티켓이 있으면 룰렛을 돌리고 포인트 지급 결과를 확인해요.","추가 티켓은 회원 등급별 거래 미션 등으로 받을 수 있으므로 별도 조건을 확인해요."],
  cautions:["스크린샷상 100만 포인트는 매일 최대 1명에게 확률적으로 지급됩니다. 누구나 100만 포인트를 받는 이벤트가 아니에요.","이미지를 촬영한 시점에는 남은 티켓이 0장이었으며, 기본 티켓이 매일 자동으로 지급되는지는 확인되지 않았어요.","추가 티켓을 위한 거래 미션이 있지만 포인트를 받기 위해 무리하게 가상자산을 거래하는 것은 권하지 않아요.","룰렛 포인트는 빗썸 포인트샵의 가상자산 교환에 사용할 수 있으나 세부 교환 조건과 가상자산 가격 변동을 확인하세요.","종료일 및 실제 참여 가능 상태는 빗썸 앱에서 재확인해야 합니다."],
 },
 {
  slug:"bithumb-daily-checkin-oct-2026",company:"빗썸",category:"가상자산",participationType:"출석 체크",
  title:"빗썸 매일매일 출석 체크",
  benefit:"기본 출석 10P, 연속 출석 보너스 최대 1,000P",
  endsAt:"2026-10-31",verifiedAt:"2026-10-23",sourceType:"user-supplied-app-screen",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["빗썸 앱에서 2026년 10월 출석 체크 혜택에 참여 가능한 고객"],
  steps:["빗썸 앱 혜택에서 '매일매일 출석 체크'를 찾아요.","매일 00시~24시 사이 출석 체크에 참여해요.","기본 출석 포인트와 연속 7·14·21일 달성 보너스를 확인해요.","한 달 연속 출석 조건을 충족하면 1,000P 보너스 조건을 확인해요."],
  cautions:["첨부된 2026년 10월 출석표 기준으로 기본 출석은 10P, 연속 출석에 따른 보너스는 50P·100P·200P·1,000P로 표시돼요.","표의 '내일부터 매일오면 +1,070P'는 해당 사용자의 출석 상황에 따른 예상치로 모든 고객에게 지급되는 금액은 아니에요.","포인트는 출석 시 즉시 지급된다고 안내되지만, 포인트샵에서 가상자산 교환 조건을 확인해야 해요.","10월 출석표는 10월 31일 이후 진행 중 목록에서 제외됩니다. 다음 달 행사는 별도 검증이 필요해요."],
 },

 {
  slug:"kakaopay-securities-channel-friend-samsung-2026",
  company:"카카오페이증권",category:"증권",participationType:"간편 참여",
  title:"카카오페이증권 카카오톡 채널 친구 추가하고 삼성전자 1주 추첨",
  benefit:"10명 추첨, 삼성전자 1주",
  endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  sourceType:"user-supplied-app-screen",hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["이벤트 페이지에서 카카오페이증권 카카오톡 채널 친구 추가에 동의하는 고객","이전에 해당 채널 친구 추가 동의를 완료한 고객은 참여 불가"],
  steps:["카카오페이증권 앱에서 '카카오톡 친구 하면 주식 드려요' 이벤트를 찾아요.","친구 추가하기 버튼을 눌러 채널 친구 추가에 동의하면 응모가 완료돼요.","11월 10일 개별 당첨 안내를 확인해요.","당첨된 경우 카카오페이증권 주식계좌 개설 및 주식 약정을 진행해 수령해요."],
  cautions:["응모 기간은 2026년 9월 1일부터 10월 31일까지입니다.","삼성전자 1주는 10명을 추첨해 지급하며, 참가자 전원 지급이 아닙니다.","이미 채널 친구 추가 동의를 완료한 고객은 참여할 수 없습니다.","당첨 통지는 11월 10일 예정이며, 주식은 안내된 수령 기한까지 받아야 합니다.","카카오페이증권 채널 차단·알림 차단 시 당첨 안내를 놓칠 수 있습니다.","해당 행사는 친구 초대 추천 보상이 없는 일반 간편 참여 이벤트입니다.","공식 외부 웹 참여 링크는 확인되지 않았으므로 앱에서 직접 확인해 주세요."]
 },

 {
  slug:"kakaopay-securities-random-stock-invite-2026",
  company:"카카오페이증권",category:"증권",participationType:"친구 초대",
  title:"친구 초대하고 랜덤 주식 뽑기",
  benefit:"추첨 시 100원~최대 100만원 상당 랜덤 주식",
  endsAt:"2026-12-31",verifiedAt:"2026-10-23",
  sourceType:"user-supplied-app-screen",
  referralUrl:"https://kko.kakao.com/P_FTF_SEC_2608V1?invite_code=0RXWXVC70TBD7&sb=y",
  referralAllowed:false,
  hasRequiredTrade:false,hasRequiredPayment:false,
  audience:["만 19세 이상 카카오페이증권 고객","기존 주식 거래 이력에 따라 참여 방법이 다를 수 있는 고객"],
  steps:["카카오페이증권 앱에서 랜덤 주식 뽑기 이벤트를 열어요.","최초 랜덤 주식 뽑기 대상이라면 앱에서 해당 기회를 먼저 사용해요.","앱의 '친구 초대하고 주식 뽑기' 메뉴를 통해 친구에게 초대 링크를 보내요.","친구가 초대 이벤트 페이지에 방문하고 초대가 인정되면 추가 뽑기 기회가 주어질 수 있어요."],
  cautions:["이벤트 기간은 첨부된 카카오페이증권 앱 화면 기준 2026년 8월 12일부터 12월 31일까지예요. 사전 예고 없이 변경·중단될 수 있어요.","100원~100만원은 랜덤 주식의 보상 범위로 특정 주식이나 최대 금액 당첨을 보장하지 않아요.","비회원 친구는 회원가입 이후 초대가 인정될 수 있고, 초대받은 친구의 이벤트 페이지 방문 확인이 필요해요.","최초 뽑기 기회와 추가 친구 초대 기회는 기존 주식 거래 이력에 따라 다르게 적용돼요.","초대 링크는 제공받았지만 공개 웹사이트 게시 허용 여부가 확인되지 않아 현재 참여 버튼에는 연결되지 않습니다.","현재 공개된 공식 웹 이벤트 주소를 확인하지 못했으므로 카카오페이증권 앱에서 직접 최신 조건을 확인해 주세요."]
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
