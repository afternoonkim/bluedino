import type { FinanceCategory } from "./types";

export const financeCategories: FinanceCategory[] = [
  {
    key: "isa",
    title: "ISA 질문 가이드",
    shortTitle: "ISA",
    description: "ISA 가입 조건, 절세 구조, ETF 투자, 만기, 손익통산까지 한눈에 이해할 수 있게 정리한 BlueDino 금융 가이드",
    intro:
      "ISA는 단순히 하나 더 만드는 계좌가 아니라 세후 수익률을 관리하는 도구에 가깝습니다. BlueDino는 가입 여부부터 절세 전략, 만기 활용까지 실제로 헷갈리기 쉬운 핵심을 한 페이지씩 이해하기 쉽게 정리합니다.",
    badge: "절세계좌",
    status: "live",
    basePath: "/finance/isa",
  },
  {
    key: "irp",
    title: "IRP 질문 가이드",
    shortTitle: "IRP",
    description: "IRP 세액공제, 납입 전략, 수령 방식과 연금 활용 방법을 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "IRP는 세액공제와 노후 준비, 퇴직금 관리까지 연결되는 연금계좌입니다. BlueDino는 IRP의 납입, 운용, 인출, 수령 포인트를 실제 활용 흐름에 맞춰 한 페이지씩 정리합니다.",
    badge: "연금계좌",
    status: "live",
    basePath: "/finance/irp",
  },
  {
    key: "pension",
    title: "연금저축 질문 가이드",
    shortTitle: "연금저축",
    description: "연금저축계좌 세액공제, ETF 투자, 수령 전략과 중도해지 기준을 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "연금저축은 세액공제만 보고 시작하면 오래 유지하기 어렵고, 장기 복리와 연금 수령까지 함께 보면 활용 가치가 커집니다. BlueDino는 연금저축계좌의 가입, 납입, 투자, 인출, 수령 전략을 이해하기 쉽게 정리합니다.",
    badge: "연금계좌",
    status: "live",
    basePath: "/finance/pension",
  },
  {
    key: "cma",
    title: "CMA 질문 가이드",
    shortTitle: "CMA",
    description: "CMA 금리, 이자 지급 방식, RP형·MMF형 차이, 예금자보호, 활용 전략까지 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "CMA는 단순한 통장이 아니라 현금 보관, 비상금 관리, 투자 대기자금 운용에 강점이 있는 계좌입니다. BlueDino는 CMA의 개념, 금리, 안전성, 활용 전략을 실제 사용 기준으로 정리합니다.",
    badge: "현금관리",
    status: "live",
    basePath: "/finance/cma",
  },
  {
    key: "parking",
    title: "파킹통장 질문 가이드",
    shortTitle: "파킹통장",
    description: "파킹통장 금리, 예금자보호, 우대조건, 이자 지급 방식, CMA 비교까지 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "파킹통장은 비상금, 생활비, 단기 대기자금을 효율적으로 보관할 때 많이 활용됩니다. BlueDino는 파킹통장의 금리, 안전성, 활용 전략을 실제 생활 기준으로 정리합니다.",
    badge: "현금관리",
    status: "live",
    basePath: "/finance/parking",
  },
  {
    key: "loan-basics",
    title: "대출기초 질문 가이드",
    shortTitle: "대출기초",
    description: "대출 금리, 한도, 상환 방식, 신용점수, 중도상환수수료, DSR·LTV 같은 핵심 개념을 쉽게 이해할 수 있게 정리한 BlueDino 금융 가이드",
    intro:
      "대출은 금리만 비교해서 결정하기보다 한도, 상환 방식, 신용 영향, 수수료, 규제 구조를 함께 이해해야 실수 확률이 줄어듭니다. BlueDino는 대출기초의 핵심 개념을 처음 보는 사람도 이해하기 쉽게 한 페이지씩 정리합니다.",
    badge: "대출기초",
    status: "live",
    basePath: "/finance/loan-basics",
  },
  {
    key: "credit-loan",
    title: "신용대출 질문 가이드",
    shortTitle: "신용대출",
    description: "신용대출 한도, 금리, 심사 기준, 마이너스통장 차이, 갈아타기, 상환 전략까지 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "신용대출은 급할 때 받는 돈으로만 볼 것이 아니라, 신용점수와 상환 구조, 대환 가능성까지 함께 관리해야 하는 금융상품입니다. BlueDino는 신용대출의 조건, 심사, 상환, 갈아타기 포인트를 실제 판단에 도움이 되도록 정리합니다.",
    badge: "신용대출",
    status: "live",
    basePath: "/finance/credit-loan",
  },
  {
    key: "mortgage-loan",
    title: "주담대 질문 가이드",
    shortTitle: "주담대",
    description: "주택담보대출 LTV·DSR, 한도, 금리, 상환 방식, 갈아타기, 중도상환수수료까지 이해하기 쉽게 정리한 BlueDino 금융 가이드",
    intro:
      "주택담보대출은 금리 하나보다 LTV, DSR, 상환 기간, 부대비용, 갈아타기 조건을 함께 봐야 총비용이 달라집니다. BlueDino는 주담대의 구조와 실전 체크포인트를 실제 자금계획에 맞춰 정리합니다.",
    badge: "주담대",
    status: "live",
    basePath: "/finance/mortgage-loan",
  },
];

export function getFinanceCategory(category: string) {
  return financeCategories.find((item) => item.key === category);
}
