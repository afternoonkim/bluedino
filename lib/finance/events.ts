export type EventCategory = "은행" | "증권" | "가상자산";
export type FinanceEvent = {
  slug: string;
  company: string;
  category: EventCategory;
  title: string;
  benefit: string;
  endsAt: string;
  verifiedAt: string;
  audience: string[];
  steps: string[];
  cautions: string[];
  officialUrl: string;
  referralUrl?: string;
  referralAllowed?: boolean;
};
// 확인되지 않은 이벤트나 추천 링크는 게시하지 않습니다.
// 2차에서 공식 약관과 유효기간을 확인한 항목만 추가합니다.
export const financeEvents: FinanceEvent[] = [];
export const targetCompanies = ["카카오페이증권", "카카오뱅크", "케이뱅크", "토스증권", "토스뱅크", "빗썸", "업비트"] as const;
export function publishedEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return financeEvents.filter(e => e.verifiedAt && e.officialUrl.startsWith("https://") && e.endsAt >= today);
}
