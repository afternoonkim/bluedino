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
