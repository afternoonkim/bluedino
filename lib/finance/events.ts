export type EventCategory = "은행" | "증권" | "가상자산";
export type FinanceEvent = {
 slug: string; company: string; category: EventCategory;
 title: string; benefit: string; endsAt: string; verifiedAt: string;
 audience: string[]; steps: string[]; cautions: string[];
 officialUrl: string; referralUrl?: string; referralAllowed?: boolean;
};
// 공식 이벤트에 명시된 응모 기간만 사용합니다. 추정된 종료일을 입력하지 않습니다.
export const financeEvents: FinanceEvent[] = [
 {
  slug:"kbank-lottecard-oct-2026",company:"케이뱅크",category:"은행",
  title:"롯데카드 신청 시 조건별 캐시백·할인",
  benefit:"조건 충족 시 최대 46만원 상당 혜택",endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["케이뱅크 이벤트 페이지에서 안내하는 대상 롯데카드 신청자","카드 발급 및 이벤트별 이용 조건을 충족하는 고객"],
  steps:["공식 페이지에서 대상 카드와 응모 조건을 확인해요.","10월 31일까지 이벤트에 응모해요.","카드 이용·구독료 결제 등 원하는 혜택의 조건을 충족해요.","해당 혜택의 지급 기준과 기한을 확인해요."],
  cautions:["46만원 상당은 조건별 캐시백과 할인·쿠폰을 합친 최대 규모예요.","일부 혜택은 해외 이용 및 리볼빙 신청 등이 필요해요. 리볼빙은 이자 비용이 발생할 수 있으니 혜택만을 위해 신청하지 마세요.","연회비와 지급·환수 조건을 반드시 확인하세요."],
  officialUrl:"https://www.kbanknow.com/web/service/benefit-detail/2346"
 },
 {
  slug:"kakaobank-mortgage-compare-2026",company:"카카오뱅크",category:"은행",
  title:"주택담보대출 비교하기 이벤트",
  benefit:"금리·한도 비교만 해도 추첨 자동 응모",endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["카카오뱅크의 주택담보대출 비교 서비스를 이용할 수 있는 고객","공식 이벤트 조건에 따라 비교 또는 대출 실행 대상이 되는 고객"],
  steps:["공식 이벤트 페이지에서 대상과 제외 금융사를 확인해요.","10월 31일까지 주택담보대출 금리·한도를 비교해요.","대출 실행 관련 별도 추첨은 금액과 금융사 제외 조건을 확인해요.","공식 공지에서 당첨 및 지급 조건을 확인해요."],
  cautions:["최대 1,000만원은 이벤트 전체 혜택 안내이며 누구나 받는 보상이 아니에요.","대출 실행 관련 혜택은 1억원 이상 실행과 제휴 금융사 등 별도 기준이 적용돼요.","대출을 이벤트 보상만을 목적으로 실행하지 마세요. 금리·상환 부담과 총비용이 우선입니다."],
  officialUrl:"https://event.kakaobank.com/p/event?i=hc_loan"
 },
 {
  slug:"kakaobank-shinhan-card-oct-2026",company:"카카오뱅크",category:"은행",
  title:"신한카드 처음 이용 시 캐시백 혜택",
  benefit:"조건 충족 시 최대 39만원 혜택",endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["2026년 4~9월 신한 개인 신용카드 이용 및 탈회 이력이 없는 등 공식 신규 이용 조건을 충족한 고객","이벤트 대상 카드의 발급·응모·이용 조건을 충족한 고객"],
  steps:["공식 페이지에서 이벤트 카드와 참여 대상 여부를 확인해요.","10월 31일까지 이벤트에 응모해요.","11월 30일까지 해당 카드 이용 실적과 필요한 마케팅 동의 조건을 확인해요.","12월 말 예정된 카드 결제대금 차감 방식 등을 확인해요."],
  cautions:["39만원은 해외 오프라인 이용 등 추가 조건을 포함한 최대 금액이에요.","신용카드 최근 이용 이력, 마케팅 동의 및 카드 브랜드 조건이 적용돼요.","연회비와 과도한 카드 이용에 따른 부담을 확인하세요."],
  officialUrl:"https://www.kakaobank.com/products/creditCard/events?card_gds_code=000100022&use_event_code=1269"
 },
 {
  slug:"kakaobank-kb-dadam-oct-2026",company:"카카오뱅크",category:"은행",
  title:"KB국민 다담카드 신규 이용 혜택",
  benefit:"조건 충족 시 최대 16만원 캐시백",endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["이벤트 직전 6개월 동안 KB국민 신용카드 이용 이력이 없는 등 공식 대상 조건을 충족하는 고객","KB국민 다담카드 이벤트에 응모하고 필요한 사용 실적을 충족한 고객"],
  steps:["공식 페이지에서 신규 이용 조건과 카드 연회비를 확인해요.","10월 31일까지 이벤트에 응모해요.","안내된 기간에 20만원 이용과 KB Pay 사용 등 해당 조건을 충족해요.","마케팅 동의 추가 혜택을 원하면 관련 조건과 유지 기간을 확인해요."],
  cautions:["16만원은 13만원 기본 조건과 3만원 추가 조건의 합계예요.","조기 카드 해지 시 받은 혜택을 일부 환수하는 조건이 있으므로 반드시 확인하세요.","대출 관련 마케팅 동의 조건이 포함되어 있어 동의 범위를 확인하세요."],
  officialUrl:"https://www.kakaobank.com/products/creditCard/events?card_gds_code=000200011&use_event_code=1260"
 },

 {
  slug:"kbank-kbcard-oct-2026",company:"케이뱅크",category:"은행",
  title:"케이뱅크에서 KB국민카드 신청 시 캐시백",
  benefit:"조건 충족 시 최대 103만원 캐시백",
  endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["케이뱅크 이벤트 페이지에서 안내하는 대상 KB국민카드 신청자","카드별 신규 발급·이용 실적 등 개별 조건을 충족하는 고객"],
  steps:["공식 이벤트 페이지에서 대상 카드와 조건을 확인해요.","2026년 10월 31일까지 이벤트에 응모해요.","카드별 이용 실적, 해외 이용, 자동납부 등 해당 조건을 충족해요.","지급 시점과 제외 조건을 확인해요."],
  cautions:["최대 103만원은 여러 조건별 혜택을 합산한 상한으로, 신청만으로 지급되지 않아요.","일부 혜택은 해외 이용, 자동납부, 마케팅 동의 등 추가 조건이 있어요.","카드 발급 조건, 연회비, 전월 이용 실적과 지급일을 공식 안내에서 확인하세요."],
  officialUrl:"https://www.kbanknow.com/web/service/benefit-detail/2340"
 },
 {
  slug:"kbank-samsungcard-oct-2026",company:"케이뱅크",category:"은행",
  title:"케이뱅크에서 삼성카드 신청 시 캐시백",
  benefit:"조건 충족 시 최대 51만원 캐시백",
  endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["이벤트에 안내된 삼성카드 신청 대상 고객","이용 금액 및 추가 혜택별 적용 조건을 충족한 고객"],
  steps:["공식 안내에서 대상 카드와 응모 조건을 살펴봐요.","2026년 10월 31일까지 응모해요.","카드 이용, 생활요금 정기결제 등 해당 실적 조건을 충족해요.","공식 페이지에 안내된 지급 시점을 확인해요."],
  cautions:["최대 51만원은 기본 캐시백과 조건부 추가 혜택을 합친 금액이에요.","해외 이용 및 별도 LINK 혜택 등이 포함되어 누구나 최대 금액을 받는 것은 아니에요.","카드별 연회비, 실적 인정 기간, 제외 거래를 확인하세요."],
  officialUrl:"https://www.kbanknow.com/web/service/benefit-detail/2342"
 },
 {
  slug:"kbank-nhcard-oct-2026",company:"케이뱅크",category:"은행",
  title:"케이뱅크에서 NH농협카드 신청 시 캐시백",
  benefit:"조건 충족 시 최대 19만5천원 캐시백",
  endsAt:"2026-10-31",verifiedAt:"2026-10-23",
  audience:["이벤트 페이지에 안내된 대상 NH농협카드 신청자","카드 이용 및 추가 조건을 충족하는 고객"],
  steps:["공식 안내에서 대상 카드와 응모 대상을 확인해요.","2026년 10월 31일까지 이벤트에 응모해요.","카드 이용 금액, NH Pay, 마케팅 동의 또는 정기결제 등 해당 조건을 확인하고 충족해요.","혜택 지급 시기와 방식은 공식 안내에서 확인해요."],
  cautions:["최대 금액은 여러 선택·추가 조건을 충족할 때의 합계예요.","기본 이용 실적과 NH Pay·정기결제 등 개별 혜택의 조건이 다릅니다.","카드별 연회비와 혜택 제외·취소 조건을 확인하세요."],
  officialUrl:"https://www.kbanknow.com/web/service/benefit-detail/2341"
 }
];
export const targetCompanies = ["카카오페이증권", "카카오뱅크", "케이뱅크", "토스증권", "토스뱅크", "빗썸", "업비트"] as const;
export function publishedEvents(now = new Date()) {
 const today = new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(now);
 return financeEvents.filter(e=>e.verifiedAt && e.officialUrl.startsWith("https://") && e.endsAt>=today);
}
