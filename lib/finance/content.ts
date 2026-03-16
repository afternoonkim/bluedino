import { getFinanceCategory } from "./config";
import { getQuestionBySlug, getQuestionsByCategory } from "./data";
import type {
  FinanceCategoryKey,
  FinanceFaqItem,
  FinanceLinkItem,
  FinanceQuestionEntry,
  FinanceQuestionItem,
  FinanceSection,
} from "./types";

function detectTopic(question: string) {
  if (question.includes("세금") || question.includes("세액공제") || question.includes("절세")) return "tax";
  if (question.includes("가입") || question.includes("조건") || question.includes("누가") || question.includes("가능")) return "eligibility";
  if (question.includes("만기") || question.includes("자동") || question.includes("언제부터") || question.includes("수령")) return "maturity";
  if (question.includes("ETF") || question.includes("주식") || question.includes("펀드") || question.includes("배당")) return "investment";
  if (question.includes("이전") || question.includes("옮기") || question.includes("증권사") || question.includes("금융사")) return "transfer";
  if (question.includes("해지") || question.includes("인출") || question.includes("출금")) return "withdrawal";
  if (question.includes("차이") || question.includes("뭐가 더") || question.includes("비교") || question.includes("같이")) return "comparison";
  if (question.includes("대출") || question.includes("금리") || question.includes("이자")) return "loan";
  if (question.includes("상환") || question.includes("만기일시") || question.includes("원리금") || question.includes("원금균등") || question.includes("조기상환") || question.includes("중도상환")) return "repayment";
  if (question.includes("한도") || question.includes("DSR") || question.includes("DTI") || question.includes("LTV")) return "limit";
  if (question.includes("신용점수") || question.includes("심사") || question.includes("거절") || question.includes("재직") || question.includes("소득증빙")) return "screening";
  if (question.includes("갈아타기") || question.includes("대환")) return "refinance";
  return "general";
}

function accountName(category: FinanceCategoryKey) {
  if (category === "isa") return "ISA 계좌";
  if (category === "irp") return "IRP 계좌";
  if (category === "pension") return "연금저축계좌";
  if (category === "cma") return "CMA 계좌";
  if (category === "parking") return "파킹통장";
  if (category === "loan-basics") return "대출";
  if (category === "credit-loan") return "신용대출";
  return "주택담보대출";
}

function isLoanCategory(category: FinanceCategoryKey) {
  return category === "loan-basics" || category === "credit-loan" || category === "mortgage-loan";
}

function genericIntro(category: FinanceCategoryKey, question: string) {
  const name = accountName(category);

  if (isLoanCategory(category)) {
    return `${question} 같은 질문은 대출을 처음 알아보는 사람뿐 아니라 이미 대출을 보유한 사람도 자주 다시 확인합니다. 이유는 ${name}가 단순히 금리만 비교해서 결정할 수 있는 상품이 아니라 한도, 상환 방식, 신용 영향, 규제, 중도상환수수료까지 함께 봐야 하는 구조이기 때문입니다.`;
  }

  return `${question} 같은 질문은 실제로 ${name}를 처음 만들려는 사람뿐 아니라 이미 보유한 사람도 자주 다시 확인합니다. 이유는 ${name}가 단순한 통장이 아니라 세금, 투자 대상, 유지기간, 인출 규칙, 수령 방식까지 함께 봐야 하는 구조이기 때문입니다.`;
}

function currentRuleParagraphs(category: FinanceCategoryKey): string[] {
  if (category === "loan-basics") {
    return [
      "대출은 금리만 비교하면 단순해 보이지만 실제로는 한도, 상환 방식, 중도상환수수료, 신용점수 영향, 규제 지표까지 함께 봐야 체감 결과가 달라질 수 있습니다.",
      "특히 DSR, DTI, LTV처럼 용어가 비슷해 보여도 적용 대상과 의미가 다를 수 있어 실제 실행 전에는 최신 금융회사 안내와 상품설명서를 함께 확인하는 편이 안전합니다.",
    ];
  }

  if (category === "credit-loan") {
    return [
      "신용대출은 담보 없이 소득, 재직, 신용도를 바탕으로 심사하는 구조이기 때문에 금리와 한도가 사람마다 크게 달라질 수 있습니다.",
      "마이너스통장과 일반 신용대출은 사용 방식과 이자 부담 구조가 달라 필요한 자금 규모와 상환 계획을 기준으로 비교하는 편이 실전적입니다.",
    ];
  }

  if (category === "mortgage-loan") {
    return [
      "주택담보대출은 금리만 보는 상품이 아니라 LTV, DSR, 상환 기간, 부대비용, 중도상환수수료까지 합쳐서 총비용을 비교해야 판단이 쉬워집니다.",
      "고정금리, 변동금리, 혼합형, 정책형 상품 여부에 따라 체감 부담이 달라질 수 있으므로 실행 전 최신 조건을 함께 확인하는 편이 안전합니다.",
    ];
  }

  if (category === "cma") {
    return [
      "CMA는 예금처럼 단순 보관만 하는 계좌가 아니라 증권사 기반의 현금관리 상품으로 이해하는 편이 정확합니다.",
      "RP형, MMF형, MMW형처럼 운용 구조가 다르고 예금자보호 여부와 출금 편의성도 금융사별로 차이가 날 수 있습니다.",
    ];
  }

  if (category === "parking") {
    return [
      "파킹통장은 일반 입출금 통장보다 금리가 높을 수 있지만 우대 조건, 지급 주기, 예치 한도에 따라 실제 체감 수익은 달라질 수 있습니다.",
      "예금자보호, 수수료, 앱 사용성, 이벤트 조건이 다를 수 있어 단순 최고금리만 보고 선택하면 기대와 다를 수 있습니다.",
    ];
  }

  return [
    "상품 구조, 세제 혜택, 유지기간, 인출 규칙을 함께 봐야 큰 틀이 잡힙니다. 다만 개인 조건과 금융사 정책에 따라 적용 서류와 세부 요건은 달라질 수 있습니다.",
    "세부 한도, 과세 방식, 제출 서류, 이전 절차는 수시로 바뀔 수 있으므로 실제 개설·이전·해지 전에는 금융회사 안내와 최신 공지를 함께 확인하는 편이 안전합니다.",
  ];
}

function topicSections(category: FinanceCategoryKey, question: string, topic: string): FinanceSection[] {
  const name = accountName(category);
  const intro = genericIntro(category, question);
  const rules = currentRuleParagraphs(category);
  const isLoan = isLoanCategory(category);

  const ending: FinanceSection = {
    title: isLoan ? "실전에서 이렇게 보면 대출 판단이 훨씬 쉬워집니다" : "실전에서 이렇게 판단하면 정리가 쉽습니다",
    body: isLoan
      ? [
          "내 소득과 기존 부채 기준으로 감당 가능한 월 상환액을 먼저 계산하고, 금리 외에 한도·상환 방식·중도상환수수료까지 함께 확인하는 것이 좋습니다.",
          "실제 실행 전에는 계산기와 상품설명서를 같이 보면서 총이자와 월 부담, 갈아타기 가능성까지 함께 점검하는 편이 안전합니다.",
        ]
      : [
          "가입 가능 여부, 유지기간을 버틸 수 있는 자금 성격, 그리고 다른 계좌와의 역할 분담을 먼저 확인하는 것이 좋습니다.",
          "상품 하나만 따로 보기보다 전체 자산관리 구조 안에서 어떤 역할을 맡길지 정하면 판단이 훨씬 쉬워집니다.",
        ],
  };

  const bodyMap: Record<string, string[]> = {
    tax: [
      `${name}의 핵심은 표면 수익률보다 세후 결과를 어떻게 만들 수 있는지에 있습니다.`,
      "세액공제, 비과세, 분리과세, 과세이연처럼 단어는 달라도 실제로는 세후 수익률과 현금흐름에 어떤 차이를 만드는지가 더 중요합니다.",
    ],
    eligibility: [
      "소득 형태, 재직 상태, 제출 서류, 기존 보유 상품 여부처럼 생각보다 여러 요소가 함께 작용할 수 있습니다.",
      "가입 자체가 가능하더라도 실제로 나에게 유리한지, 유지할 수 있는지도 같이 판단하는 편이 좋습니다.",
    ],
    maturity: [
      "만기일 자체보다 이후 자금을 어디로 옮길지, 유지할지, 인출할지에 따라 결과가 크게 달라질 수 있습니다.",
      "자동 재예치, 연장, 이전, 연금 수령 전환처럼 다음 단계까지 같이 설계하면 훨씬 안정적입니다.",
    ],
    investment: [
      "ETF, 펀드, 예금형 상품은 각각 변동성, 유동성, 세후 구조가 다르기 때문에 단순 인기보다 목적과 기간이 더 중요합니다.",
      "특히 장기 투자 목적이라면 수수료, 분산, 세후 결과까지 함께 보는 편이 안정적입니다.",
    ],
    transfer: [
      "혜택이 좋아 보여도 이전 절차 중 거래 공백, 출금 제한, 서류 준비, 수수료 같은 현실 요소가 더 중요할 수 있습니다.",
      "금융사 앱 사용성, 고객지원, 수수료 체계까지 함께 비교하면 만족도가 높아집니다.",
    ],
    withdrawal: [
      "세제 혜택 반환, 과세 방식 변경, 유지 혜택 상실, 목적 자금 붕괴처럼 생각보다 영향이 클 수 있습니다.",
      "급하게 꺼내기 전에 다른 자금으로 대체할 수 있는지 먼저 점검하는 편이 좋습니다.",
    ],
    comparison: [
      `${name}는 다른 상품보다 무조건 우월하다기보다, 절세·유동성·노후 준비·현금 관리·대출 상환 중 어떤 목적에 맞는지로 판단해야 합니다.`,
      "비상금, 투자금, 노후자금, 대출 상환 재원을 섞지 않는 것이 실제 관리에서는 더 중요합니다.",
    ],
    loan: [
      `${name}는 표면 금리 외에도 한도, 상환 방식, 실행 시점, 중도상환수수료, 신용 영향까지 함께 봐야 실제 부담이 보입니다.`,
      "같은 금리라도 상환 기간과 원금 구조에 따라 총이자와 월 부담이 크게 달라질 수 있습니다.",
    ],
    limit: [
      "대출은 받을 수 있는 최대 금액과 실제로 감당 가능한 금액이 다를 수 있습니다. 그래서 한도보다 월 상환 부담과 총이자를 먼저 계산하는 편이 안전합니다.",
      "특히 DSR, DTI, LTV 같은 지표는 단순 숫자가 아니라 상환 능력과 담보가치를 함께 보는 기준으로 이해해야 판단이 쉬워집니다.",
    ],
    repayment: [
      "월 부담이 낮아 보이는 방식이 항상 유리한 것은 아닙니다. 상환 초반 부담, 총이자 규모, 만기 시점 리스크를 함께 봐야 오해가 줄어듭니다.",
      "장기 대출일수록 원리금균등, 원금균등, 만기일시상환의 차이가 장기간 누적되므로 미리 계산기로 비교해보는 것이 좋습니다.",
    ],
    screening: [
      "재직기간, 소득 안정성, 기존 부채, 신용점수, 최근 조회 이력은 심사 체감 결과에 영향을 줄 수 있습니다.",
      "조건이 비슷해 보여도 금융회사마다 선호하는 차주 특성이 다를 수 있어 한 곳에서 안 된다고 끝은 아닙니다.",
    ],
    refinance: [
      "새 금리만 보지 말고 남은 기간, 중도상환수수료, 부대비용, 실행 편의성을 함께 비교해야 실제 이득이 보입니다.",
      "금리 차이가 작을 때는 단순 체감보다 계산기를 통한 총이자 비교가 더 정확합니다.",
    ],
    general: [
      `${name}는 단일 포인트만 보고 결정하기보다 목적, 기간, 세금, 유동성, 비용 구조를 함께 봐야 실수가 줄어듭니다.`,
      "처음 시작할수록 상품 자체보다 내가 왜 이 금융상품을 쓰려는지부터 정리하는 편이 훨씬 도움이 됩니다.",
    ],
  };

  const titleMap: Record<string, string> = {
    tax: `${name}의 세금 구조를 먼저 이해해야 하는 이유`,
    eligibility: `${name} 가입 조건을 확인할 때 핵심`,
    maturity: `${name}의 만기·수령 시점을 볼 때 중요한 점`,
    investment: `${name}에서 투자 상품을 볼 때 핵심`,
    transfer: `${name} 이전·금융사 변경을 볼 때 핵심`,
    withdrawal: `${name} 해지·출금·인출을 볼 때 핵심`,
    comparison: `다른 금융상품과 ${name}를 비교할 때 핵심`,
    loan: `${name}를 이해할 때 먼저 볼 것`,
    limit: `${name} 한도와 규제를 볼 때 핵심`,
    repayment: `${name} 상환 방식을 볼 때 먼저 이해할 것`,
    screening: `${name} 심사에서 많이 보는 포인트`,
    refinance: `${name} 갈아타기를 볼 때 핵심`,
    general: `${name}를 볼 때 가장 먼저 정리해야 할 것`,
  };

  return [
    { title: titleMap[topic] ?? titleMap.general, body: [intro, ...rules] },
    {
      title: isLoan && topic !== "general" ? "실제 판단 기준을 같이 봐야 합니다" : "질문 하나보다 전체 구조를 같이 보는 편이 좋습니다",
      body: bodyMap[topic] ?? bodyMap.general,
    },
    ending,
  ];
}

function checklistByTopic(category: FinanceCategoryKey, topic: string): string[] {
  const name = accountName(category);
  const isLoan = isLoanCategory(category);

  const base = isLoan
    ? [
        "월 상환 부담을 소득과 현금흐름 기준으로 계산하기",
        "금리뿐 아니라 한도, 상환 방식, 중도상환수수료까지 비교하기",
        "기존 부채와 신용 영향까지 함께 점검하기",
      ]
    : [
        `${name}를 얼마나 오래 유지할 수 있는 자금인지 확인하기`,
        "다른 금융상품과 역할을 나눠서 볼지 정하기",
        "금융사 앱, 수수료, 이전 가능 여부까지 함께 비교하기",
      ];

  const extra: Record<string, string[]> = {
    tax: ["세전이 아니라 세후 결과 기준으로 보기", "혜택 유지 조건과 과세 구조를 함께 확인하기"],
    eligibility: ["필요 서류를 미리 준비하기", "내 조건에서 실제로 유리한 상품인지 같이 보기"],
    maturity: ["만기 전후 자금 이동 계획 세우기", "자동 재예치나 수령 방식을 미리 결정하기"],
    investment: ["수수료와 변동성을 함께 보기", "목적 자금과 투자 자금을 섞지 않기"],
    transfer: ["이전 절차와 매매 공백 여부 확인하기", "이벤트보다 실제 사용 편의성 보기"],
    withdrawal: ["중간 인출의 세금·불이익 체크하기", "대체 가능한 자금이 있는지 먼저 보기"],
    comparison: ["비교 대상의 역할을 먼저 정리하기", "내 목적에 맞는 상품인지 기준 세우기"],
    loan: ["표면 금리보다 총이자와 월 부담을 같이 보기", "금리 외 수수료와 부대비용을 함께 확인하기"],
    limit: ["한도보다 실제 감당 가능한 월 상환액을 먼저 계산하기", "DSR·DTI·LTV 같은 규제 지표를 함께 보기"],
    repayment: ["상환 방식별 총이자와 월 납입액을 비교하기", "만기 시점 리스크와 조기상환 계획을 함께 점검하기"],
    screening: ["소득증빙과 재직 상태를 미리 점검하기", "신용조회 이력과 기존 부채 수준을 함께 확인하기"],
    refinance: ["새 금리와 기존 대출의 남은 조건을 함께 비교하기", "중도상환수수료와 실행 비용을 계산기에 넣어보기"],
  };

  return [...(extra[topic] ?? []), ...base];
}

function relatedCalculatorLinks(category: FinanceCategoryKey, topic: string): FinanceLinkItem[] {
  const common: FinanceLinkItem[] = [
    { href: "/info/investment/account-tax", label: "계좌별 세금정보" },
    { href: "/info/investment/account-tax-step", label: "절세계좌 활용순서" },
    { href: "/cal/compound", label: "복리 계산기" },
  ];

  if (category === "loan-basics") {
    return [
      { href: "/cal/loan-interest", label: "대출이자 계산기" },
      { href: "/cal/dsr", label: "DSR 계산기" },
      { href: "/cal/ltv", label: "LTV 계산기" },
      { href: "/cal/mortgage", label: "주담대 계산기" },
    ];
  }

  if (category === "credit-loan") {
    return [
      { href: "/cal/loan-interest", label: "대출이자 계산기" },
      { href: "/cal/dsr", label: "DSR 계산기" },
      { href: "/cal/ltv", label: "LTV 계산기" },
    ];
  }

  if (category === "mortgage-loan") {
    return [
      { href: "/cal/mortgage", label: "주담대 계산기" },
      { href: "/cal/ltv", label: "LTV 계산기" },
      { href: "/cal/dsr", label: "DSR 계산기" },
      { href: "/cal/loan-interest", label: "대출이자 계산기" },
    ];
  }

  if (topic === "investment") return [{ href: "/cal/calculator", label: "배당 계산기" }, ...common];
  if (topic === "maturity") return [{ href: "/cal/fire", label: "FIRE 계산기" }, ...common];
  return common;
}

function buildFaq(category: FinanceCategoryKey, question: string, topic: string): FinanceFaqItem[] {
  const name = accountName(category);
  const isLoan = isLoanCategory(category);

  const firstAnswer =
    topic === "tax"
      ? "핵심은 세전 수익보다 세후 결과를 비교하는 것입니다."
      : topic === "maturity"
        ? `${name}는 만기 자체보다 이후 연결 전략이 더 중요할 수 있습니다.`
        : isLoan
          ? `${name}는 금리 하나만 보고 결정하기보다 한도, 상환 방식, 신용 영향, 중도상환수수료까지 함께 봐야 실제 부담이 보입니다.`
          : `${name}는 계좌를 만드는 것보다 목적 자금으로 오래 활용하는 것이 중요합니다.`;

  const secondAnswer = isLoan
    ? "내 소득과 기존 부채 기준으로 감당 가능한 월 상환액을 먼저 계산하고, 금리 외에 한도·상환 방식·중도상환수수료까지 함께 확인하는 것이 좋습니다."
    : "가입 가능 여부, 유지기간을 버틸 수 있는 자금 성격, 그리고 다른 계좌와의 역할 분담을 먼저 확인하는 것이 좋습니다.";

  return [
    { question, answer: firstAnswer },
    { question: `${name}를 보기 전에 가장 먼저 확인할 것은 무엇인가요?`, answer: secondAnswer },
  ];
}

function keywordSet(question: string, categoryTitle: string): string[] {
  const third =
    categoryTitle === "CMA" ||
    categoryTitle === "파킹통장" ||
    categoryTitle === "대출기초" ||
    categoryTitle === "신용대출" ||
    categoryTitle === "주담대"
      ? `${categoryTitle} 금리`
      : `${categoryTitle} 절세`;

  return [question, `${categoryTitle} 질문`, third, "BlueDino 금융 가이드"];
}

function cautionByCategory(category: FinanceCategoryKey): string {
  if (isLoanCategory(category)) {
    return "대출 금리와 한도, 규제 기준, 우대 조건은 수시로 바뀔 수 있으므로 실제 신청 전에는 금융회사 상품설명서와 최신 공지를 다시 확인하는 편이 안전합니다.";
  }

  return "제도와 세율, 가입 요건은 바뀔 수 있으므로 실제 계좌 개설이나 해지 전에는 금융회사 공지와 최신 안내를 반드시 다시 확인하는 편이 안전합니다.";
}

function buildQuickAnswer(category: FinanceCategoryKey, item: FinanceQuestionItem, topic: string): string {
  if (item.quickAnswer) return item.quickAnswer;
  if (item.answer && item.answer.length > 0) return item.answer[0];

  const name = accountName(category);

  if (isLoanCategory(category)) {
    return `${item.question}에 대한 판단은 금리 하나보다 한도, 상환 방식, 신용 영향, 중도상환수수료까지 함께 봐야 정확해집니다.`;
  }

  if (topic === "tax") {
    return `${item.question}의 핵심은 세전이 아니라 세후 결과를 기준으로 비교하는 것입니다.`;
  }

  return `${item.question}은(는) ${name}를 고를 때 실제로 많이 헷갈리는 포인트입니다.`;
}

export function mergeEntry(category: FinanceCategoryKey, item: FinanceQuestionItem): FinanceQuestionEntry {
  const categoryInfo = getFinanceCategory(category);
  const categoryTitle = categoryInfo?.shortTitle ?? accountName(category);
  const topic = detectTopic(item.question);

  const sections = item.sections ?? topicSections(category, item.question, topic);
  const checklist = item.checklist ?? checklistByTopic(category, topic);
  const calculatorLinks = item.relatedCalculatorLinks ?? relatedCalculatorLinks(category, topic);
  const faq = item.faq ?? buildFaq(category, item.question, topic);
  const caution = item.caution ?? cautionByCategory(category);
  const quickAnswer = buildQuickAnswer(category, item, topic);
  const summary = item.summary ?? `${item.question}에 대해 실제로 많이 헷갈리는 기준을 먼저 정리한 요약입니다.`;

  return {
    ...item,
    category,
    title: item.question,
    description: item.summary ?? `${item.question}에 대한 핵심 기준을 정리한 BlueDino ${categoryTitle} 질문 가이드입니다.`,
    summary,
    quickAnswer,
    sections,
    checklist,
    relatedCalculatorLinks: calculatorLinks,
    faq,
    keywords: item.keywords ?? keywordSet(item.question, categoryTitle),
    caution,
  };
}

export function getFinanceEntry(category: FinanceCategoryKey, slug: string): FinanceQuestionEntry | null {
  const item = getQuestionBySlug(category, slug);
  return item ? mergeEntry(category, item) : null;
}

export function getRelatedEntries(category: FinanceCategoryKey, currentSlug: string, limit = 6): FinanceQuestionEntry[] {
  return getQuestionsByCategory(category)
    .filter((item) => item.slug !== currentSlug)
    .sort((a, b) => (b.searchPriority ?? 0) - (a.searchPriority ?? 0))
    .slice(0, limit)
    .map((item) => mergeEntry(category, item));
}