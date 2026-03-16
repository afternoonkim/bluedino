
import type { FinanceCategory } from "./types";

export const financeCategories: FinanceCategory[] = [
  {
    key: "isa",
    title: "ISA 질문 가이드",
    shortTitle: "ISA",
    description: "ISA 가입 조건, 절세 구조, ETF 투자, 만기, 손익통산까지 실제 검색 질문 중심으로 정리한 BlueDino 금융 가이드",
    intro:
      "ISA는 단순히 하나 더 만드는 계좌가 아니라 세후 수익률을 관리하는 도구에 가깝습니다. BlueDino는 사람들이 실제로 많이 찾는 질문을 기준으로, 가입 여부부터 절세 전략과 만기 활용까지 한 페이지씩 정리합니다.",
    badge: "절세계좌",
    status: "live",
    basePath: "/finance/isa",
  },
  {
    key: "irp",
    title: "IRP 질문 가이드",
    shortTitle: "IRP",
    description: "IRP 세액공제, 납입 전략, 수령 방식, 투자 운용과 해지 이슈까지 실제 검색 질문 중심으로 정리한 BlueDino 금융 가이드",
    intro:
      "IRP는 연말정산 절세만 보고 접근하기보다, 퇴직금 관리와 노후 준비, 장기 운용 전략까지 같이 봐야 제대로 활용할 수 있습니다. BlueDino는 실제 검색 질문을 기준으로 IRP의 가입부터 세금, 인출, 투자 전략까지 정리합니다.",
    badge: "노후준비",
    status: "live",
    basePath: "/finance/irp",
  },
  {
    key: "pension",
    title: "연금저축 질문 가이드",
    shortTitle: "연금저축",
    description: "연금저축계좌 세액공제, ETF 투자, 수령 전략, 중도해지와 금융사 선택까지 실제 검색 질문 중심으로 정리한 BlueDino 금융 가이드",
    intro:
      "연금저축은 세액공제만 보고 시작하면 오래 유지하기 어렵고, 반대로 장기 복리와 연금 수령까지 함께 보면 활용 가치가 커집니다. BlueDino는 실제 검색 질문을 기준으로 연금저축계좌의 가입, 납입, 투자, 인출, 수령 전략을 정리합니다.",
    badge: "연금계좌",
    status: "live",
    basePath: "/finance/pension",
  },
];

export function getFinanceCategory(category: string) {
  return financeCategories.find((item) => item.key === category);
}
