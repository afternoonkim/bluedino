
import { getFinanceCategory } from "./config";
import { getQuestionBySlug, getQuestionsByCategory } from "./data";
import type { FinanceCategoryKey, FinanceQuestionEntry, FinanceQuestionItem } from "./types";

function detectTopic(question: string) {
  if (question.includes("가입 조건") || question.includes("누가 가입") || question.includes("누가 만들") || question.includes("직장인") || question.includes("연봉") || question.includes("프리랜서") || question.includes("자영업자") || question.includes("무직자")) return "eligibility";
  if (question.includes("세금") || question.includes("세액") || question.includes("절세") || question.includes("연말정산") || question.includes("금융소득 종합과세")) return "tax";
  if (question.includes("출금") || question.includes("인출") || question.includes("돈은 언제든지") || question.includes("중도 해지") || question.includes("해지")) return "withdrawal";
  if (question.includes("납입") || question.includes("한도") || question.includes("목돈") || question.includes("적립식")) return "contribution";
  if (question.includes("금융사") || question.includes("은행") || question.includes("증권사") || question.includes("이전") || question.includes("수수료") || question.includes("변경")) return "transfer";
  if (question.includes("연금 수령") || question.includes("언제부터 연금") || question.includes("일시금") || question.includes("수령 기간")) return "payout";
  if (question.includes("ETF") || question.includes("펀드") || question.includes("주식") || question.includes("포트폴리오") || question.includes("배당") || question.includes("성장주") || question.includes("분산 투자") || question.includes("위험 자산")) return "investment";
  if (question.includes("차이") || question.includes("뭐가 더") || question.includes("같이 운영")) return "comparison";
  if (question.includes("노후") || question.includes("지금 시작") || question.includes("초보") || question.includes("처음 시작") || question.includes("좋은 나이")) return "basics";
  return "general";
}

function accountName(category: FinanceCategoryKey) {
  if (category === "isa") return "ISA 계좌";
  if (category === "irp") return "IRP 계좌";
  return "연금저축계좌";
}

function accountPurpose(category: FinanceCategoryKey) {
  if (category === "isa") return "세후 수익률을 높이는 절세계좌";
  if (category === "irp") return "세액공제와 노후 준비, 퇴직금 관리까지 연결되는 연금계좌";
  return "세액공제와 장기 복리를 함께 노릴 수 있는 대표 연금계좌";
}

function buildSummary(category: FinanceCategoryKey, question: string, topic: string) {
  const name = accountName(category);
  const common = `${name}를 이해할 때는 혜택만 보지 말고 유지 기간, 인출 규칙, 투자 활용 방식까지 함께 봐야 합니다.`;
  const map: Record<string, string> = {
    basics: `${name}의 기본 개념과 활용 목적을 먼저 이해하면 ${question} 같은 질문이 훨씬 선명해집니다.`,
    eligibility: `${name} 가입 가능 여부는 직업명보다 실제 소득 구조와 개설 조건을 함께 보는 것이 중요합니다.`,
    tax: `${name}의 핵심은 세전 수익보다 세후 결과와 실제 체감 절세 효과를 바꾸는 데 있습니다.`,
    withdrawal: `${name}는 중도 인출 가능 여부보다 인출 시 불이익과 세제혜택 변화가 더 중요합니다.`,
    contribution: `${name} 납입 전략은 한도 관리와 투자 시점 분산을 같이 봐야 효율이 높아집니다.`,
    transfer: `${name} 금융사 선택은 이벤트보다 수수료, 운용 편의성, 상품 폭이 더 중요합니다.`,
    payout: `${name}는 받는 시점보다 어떤 방식으로 연금화할지에 따라 세후 결과가 달라질 수 있습니다.`,
    investment: `${name} 안에서의 투자 전략은 수익률만이 아니라 계좌 규칙과 장기 운용의 궁합을 함께 봐야 합니다.`,
    comparison: `${name}를 다른 계좌와 비교할 때는 무엇이 더 좋냐보다 역할 분담을 먼저 정하는 편이 실전적입니다.`,
    general: common,
  };
  return `${map[topic] ?? common} ${question}에 맞춰 핵심만 정리했습니다.`;
}

function quickAnswer(category: FinanceCategoryKey, topic: string) {
  const name = accountName(category);
  const purpose = accountPurpose(category);
  const base = `결론부터 말하면 ${name}는 누구에게나 무조건 정답인 계좌는 아니지만, 조건이 맞고 장기적으로 활용할 수 있다면 ${purpose}입니다.`;
  const map: Record<string, string> = {
    eligibility: `가입 가능 여부는 소득, 거주 요건, 계좌 목적을 함께 봐야 합니다. 자격이 된다면 미리 개설해 두는 것만으로도 선택지가 넓어질 수 있습니다.`,
    tax: `${name}의 핵심은 세액공제나 세후 과세 구조를 통해 실제 손에 남는 금액을 바꾸는 데 있습니다. 다만 한도와 수령 조건까지 함께 봐야 오해가 줄어듭니다.`,
    withdrawal: `${name}는 중간 출금이나 해지가 가능하더라도 세제혜택과 장기 운용 구조에 영향을 줄 수 있습니다. 생활비 통장처럼 쓰기보다는 목적 자금으로 분리하는 편이 일반적으로 유리합니다.`,
    contribution: `${name} 납입 방식은 한 번에 넣느냐 나눠 넣느냐보다, 내 현금흐름과 한도 활용을 얼마나 일관되게 관리하느냐가 더 중요합니다.`,
    transfer: `${name} 금융사 변경은 가능 여부보다 수수료, 상품 다양성, 이전 절차의 번거로움을 함께 비교해야 의미가 있습니다.`,
    payout: `${name}는 연금으로 천천히 받느냐 일시금으로 인출하느냐에 따라 세금과 현금흐름의 차이가 커질 수 있습니다.`,
    investment: `${name} 안에서 ETF나 펀드, 예금 등을 활용할 수 있어도 모든 전략이 다 맞는 것은 아닙니다. 장기 투자와 계좌 규칙의 궁합을 먼저 봐야 합니다.`,
    comparison: `${name}를 다른 계좌와 비교할 때는 단순 혜택보다 절세, 유동성, 노후 준비 중 무엇이 목적이냐를 먼저 정하는 것이 중요합니다.`,
  };
  return map[topic] ?? base;
}

function genericIntro(category: FinanceCategoryKey, question: string) {
  const name = accountName(category);
  return `${question} 같은 질문은 ${name}를 처음 만들려는 사람뿐 아니라 이미 계좌를 갖고 있는 사람도 자주 다시 확인합니다. 이유는 ${name}가 단순한 통장이 아니라 세금, 투자 대상, 유지기간, 인출 규칙, 수령 방식까지 함께 봐야 하는 구조이기 때문입니다.`;
}

function currentRuleParagraphs(category: FinanceCategoryKey) {
  if (category === "isa") {
    return [
      "현재 일반적으로 알려진 ISA 기본 구조는 1인 1계좌, 의무가입기간 3년, 연간 납입한도 2천만원, 총 납입한도 1억원을 중심으로 이해하면 큰 틀이 잡힙니다. 다만 상품 유형이나 개인 조건에 따라 적용 서류와 세부 요건은 달라질 수 있습니다.",
      "또한 일반형과 서민형은 비과세 한도와 제출 서류가 다를 수 있고, 직전 과세기간의 금융소득종합과세 해당 여부도 가입 판단에 영향을 줍니다. 실제 개설 전에는 반드시 해당 금융회사 안내와 최신 공지까지 함께 확인하는 편이 안전합니다.",
    ];
  }
  return [
    "연금계좌는 세액공제, 운용 중 과세이연, 연금 수령 시 과세 구조를 함께 봐야 큰 그림이 잡힙니다. 단순히 연말정산 혜택만 보고 접근하면 장기 유지 단계에서 흔들릴 수 있습니다.",
    "또한 중도 인출이나 해지, 연금 수령 시점, 금융사 선택, 투자 가능한 상품 범위는 계좌 운영 결과에 직접 영향을 줍니다. 실제 개설 전에는 최신 금융회사 공지와 세법 안내를 함께 확인하는 편이 안전합니다.",
  ];
}

function topicSections(category: FinanceCategoryKey, question: string, topic: string) {
  const intro = genericIntro(category, question);
  const currentRules = currentRuleParagraphs(category);
  const name = accountName(category);
  const finalTitle = category === "isa" ? "실전에서 이렇게 판단하면 정리가 쉽습니다" : "실전에서 이렇게 운영하면 흔들림이 줄어듭니다";
  const commonFinal = {
    title: finalTitle,
    body: [
      `첫째, ${name}를 생활비 통장처럼 볼지 장기 목적 자금으로 볼지부터 나누어 생각해야 합니다. 자금의 목적이 흐려지면 계좌 장점을 온전히 누리기 어렵습니다.`,
      `둘째, ${name} 하나만 놓고 판단하지 말고 일반 증권계좌, ISA, IRP, 연금저축 같은 다른 계좌와 역할을 나눠 봐야 합니다. 같은 돈이라도 어디에 배치하느냐에 따라 세후 결과와 유동성이 달라집니다.`,
    ],
  };
  const map: Record<string, Array<{ title: string; body: string[] }>> = {
    basics: [
      { title: `${name}를 먼저 이해해야 하는 이유`, body: [intro, ...currentRules] },
      { title: "이 질문에서 가장 중요한 판단 기준", body: [
        `${name}는 혜택만 좋은 계좌가 아니라 오래 유지할수록 효과가 커지는 구조에 가깝습니다. 그래서 계좌를 만들기 전에 내가 이 돈을 얼마나 오래 가져갈 수 있는지부터 보는 편이 좋습니다.`,
        `특히 초보자라면 무조건 고수익 전략보다 이해 가능한 상품과 규칙부터 익히는 편이 흔들림이 적습니다. ${name}는 계좌를 여는 순간보다 유지와 운용에서 차이가 벌어집니다.`,
      ] },
      commonFinal,
    ],
    eligibility: [
      { title: "가입 가능 여부를 볼 때 체크할 것", body: [intro, ...currentRules] },
      { title: "실무적으로 많이 놓치는 부분", body: [
        `${name}는 직업 이름보다 실제 소득 구조와 금융회사 개설 기준이 더 중요합니다. 직장인, 프리랜서, 자영업자, 무직자 여부에 따라 필요한 증빙과 활용 포인트가 달라질 수 있습니다.`,
        "조건이 애매하다면 계좌를 서둘러 만들기보다, 홈택스 자료나 금융회사 안내를 먼저 맞춰 보는 편이 좋습니다.",
      ] },
      commonFinal,
    ],
    tax: [
      { title: "세금 구조를 먼저 단순하게 보면", body: [intro, ...currentRules] },
      { title: "세후 결과에서 차이가 나는 이유", body: [
        `${name}는 세액공제 또는 과세이연, 연금 수령 시 과세 구조를 통해 실제 손에 남는 결과를 바꿀 수 있습니다. 그래서 단순 수익률보다 세후 기준으로 비교하는 습관이 중요합니다.`,
        "다만 혜택만 보고 무리하게 납입하거나 중간에 해지하면 기대했던 효과가 줄어들 수 있습니다. 한도와 유지기간, 수령 시점까지 함께 봐야 오해가 줄어듭니다.",
      ] },
      commonFinal,
    ],
    withdrawal: [
      { title: "출금과 해지를 볼 때 핵심", body: [intro, ...currentRules] },
      { title: "중도 인출이 문제가 되는 이유", body: [
        `${name}는 중간에 돈을 뺄 수 있느냐보다, 그때 세제혜택과 장기 운용 구조가 얼마나 흔들리느냐가 더 중요합니다.`,
        "비상금과 노후 준비 자금을 한 계좌에 섞어 두기보다, 비상금은 별도 계좌로 두고 연금계좌는 목적 자금으로 분리하는 방식이 실전에서 관리가 쉽습니다.",
      ] },
      commonFinal,
    ],
    contribution: [
      { title: "납입 전략을 볼 때 먼저 볼 기준", body: [intro, ...currentRules] },
      { title: "목돈형과 적립식형의 차이", body: [
        "목돈은 시간을 빨리 태울 수 있다는 장점이 있고, 적립식은 타이밍 부담을 줄이는 데 강점이 있습니다. 어떤 방식이 정답이라기보다 자금의 출처와 투자 대상 변동성에 맞춰 조합하는 방식이 더 현실적입니다.",
        "연간 한도는 그 해가 지나면 다시 전략적으로 확인해야 하는 요소입니다. 특히 연말이 되기 전에 남은 한도와 세액공제 활용 여력을 점검하는 습관이 유리합니다.",
      ] },
      commonFinal,
    ],
    transfer: [
      { title: "금융사 선택과 이전을 볼 때 핵심", body: [intro, ...currentRules] },
      { title: "이벤트보다 중요한 비교 포인트", body: [
        "금융사 이동은 단순 사은품보다 수수료, 상품 다양성, 앱 사용성, 이전 절차 편의성까지 합쳐서 봐야 합니다.",
        "보유 상품이 있는 상태에서 이전을 검토한다면, 기존 상품 처리 방식과 이전 중 운용 공백 여부까지 확인하는 것이 좋습니다.",
      ] },
      commonFinal,
    ],
    payout: [
      { title: "연금 수령을 볼 때 먼저 볼 기준", body: [intro, ...currentRules] },
      { title: "받는 방식이 왜 중요한가", body: [
        `${name}는 언제 받느냐만큼 어떻게 받느냐가 중요합니다. 연금으로 나눠 받을지, 일시금 인출을 고려할지에 따라 세금과 현금흐름의 차이가 커질 수 있습니다.`,
        "노후 생활비가 필요한 시점, 다른 연금 자산과의 조합, 세금 부담까지 함께 고려해야 실제 체감 결과가 좋아집니다.",
      ] },
      commonFinal,
    ],
    investment: [
      { title: `${name} 안에서 투자를 볼 때 핵심`, body: [intro, ...currentRules] },
      { title: "모든 투자 전략이 다 맞는 것은 아닙니다", body: [
        `${name}에서 ETF나 펀드, 예금 등을 활용할 수 있어도 계좌의 목적은 단기 매매보다 장기 운용에 더 가깝습니다.`,
        "수익률만 보고 접근하기보다, 변동성 감내 수준과 인출 계획, 리밸런싱 빈도까지 함께 생각해야 장기적으로 유지가 쉬워집니다.",
      ] },
      commonFinal,
    ],
    comparison: [
      { title: "다른 계좌와 비교할 때 기준", body: [intro, ...currentRules] },
      { title: "비교할수록 더 선명해지는 역할 분담", body: [
        `${name}는 다른 계좌보다 무조건 우월하다기보다, 절세·유동성·노후 준비 중 어떤 목적에 맞는지로 판단해야 합니다.`,
        "비상금, 절세 투자금, 노후자금, 단기 운용 자금을 섞지 않는 것이 실제 관리에서는 더 중요합니다.",
      ] },
      commonFinal,
    ],
    general: [
      { title: "이 질문을 볼 때 먼저 이해할 것", body: [intro, ...currentRules] },
      { title: "실전에서 놓치기 쉬운 포인트", body: [
        `${name}는 상품 하나가 아니라 계좌 구조입니다. 무엇을 담을지, 얼마나 오래 유지할지, 필요할 때 어떻게 꺼낼지까지 같이 봐야 오해가 줄어듭니다.`,
        "혜택만 보고 시작하면 오래 유지하기 어렵습니다. 본인 자금 성격과 투자 습관에 맞는지 먼저 확인하는 편이 결과적으로 더 유리합니다.",
      ] },
      commonFinal,
    ],
  };
  return map[topic] ?? map.general;
}

function checklistByTopic(category: FinanceCategoryKey, topic: string) {
  const name = accountName(category);
  const base = [
    `${name}를 얼마나 오래 유지할 수 있는 자금인지 확인하기`,
    "다른 계좌와 역할을 나눠서 볼지 정하기",
    "금융사 앱, 수수료, 이전 가능 여부까지 함께 비교하기",
  ];
  const extra: Record<string, string[]> = {
    tax: ["세액공제 한도 또는 세후 과세 구조를 함께 보기", "세전 수익이 아니라 세후 결과 기준으로 비교하기"],
    eligibility: ["필요한 소득·신분 서류를 미리 확인하기", "개설 조건과 계좌 목적이 맞는지 점검하기"],
    investment: ["투자 가능한 상품 범위와 위험도를 확인하기", "잦은 단기 매매보다 장기 운용이 맞는지 점검하기"],
    transfer: ["이벤트 조건보다 이전 절차와 수수료를 먼저 확인하기", "기존 상품 처리 방식과 운용 공백 여부 확인하기"],
    withdrawal: ["비상금과 목적 자금을 계좌에서 분리하기", "해지 대신 유지가 가능한지 먼저 점검하기"],
    payout: ["수령 시점과 수령 방식을 함께 설계하기", "다른 연금 자산과 합쳐서 현금흐름을 점검하기"],
  };
  return [...(extra[topic] ?? []), ...base];
}

function relatedCalculatorLinks(category: FinanceCategoryKey, topic: string) {
  const common = [
    { href: "/info/investment/account-tax", label: "계좌별 세금정보" },
    { href: "/info/investment/account-tax-step", label: "절세계좌 활용순서" },
    { href: "/cal/compound", label: "복리 계산기" },
  ];
  if (topic === "investment") {
    return [{ href: "/cal/fire", label: "FIRE 계산기" }, ...common];
  }
  if (category === "isa") {
    return common;
  }
  return [{ href: "/info/guide/pension-vs-irp", label: "연금저축과 IRP 차이" }, ...common];
}

function buildFaq(category: FinanceCategoryKey, question: string, topic: string) {
  const name = accountName(category);
  const second = category === "isa"
    ? "가입 가능 여부, 의무가입기간을 버틸 수 있는 자금 성격, 그리고 일반 증권계좌·연금저축·IRP와의 역할 분담을 먼저 확인하는 것이 좋습니다."
    : "세액공제 한도, 유지기간, 인출 가능성, 다른 계좌와의 역할 분담을 먼저 확인하는 것이 좋습니다.";
  const firstAnswer =
    topic === "tax"
      ? `${name}의 핵심은 세전 수익보다 세후 결과를 비교하는 것입니다. 세액공제 또는 세후 과세 구조를 함께 보면 실제 체감 차이가 더 선명해집니다.`
      : topic === "payout"
        ? `${name}는 연금으로 천천히 받느냐, 일시금 인출을 고려하느냐에 따라 세금과 현금흐름이 달라질 수 있습니다.`
        : `${name}는 계좌를 만드는 것보다 목적 자금으로 오래 활용하는 것이 중요합니다. 단기 자금과 섞이면 장점이 줄어드는 경우가 많습니다.`;
  return [
    { question, answer: firstAnswer },
    {
      question: `${name}를 보기 전에 가장 먼저 확인할 것은 무엇인가요?`,
      answer: second,
    },
  ];
}

function keywordSet(question: string, categoryTitle: string) {
  return [question, `${categoryTitle} 질문`, `${categoryTitle} 절세`, "BlueDino 금융 가이드"];
}

function mergeEntry(category: FinanceCategoryKey, item: FinanceQuestionItem): FinanceQuestionEntry {
  const categoryMeta = getFinanceCategory(category);
  if (!categoryMeta) throw new Error(`Unknown finance category: ${category}`);
  const topic = detectTopic(item.question);
  return {
    ...item,
    category,
    title: item.question,
    description: `${item.question}에 대한 핵심 답변과 절세 구조, 유리한 경우와 주의할 점, 관련 계산기까지 정리한 BlueDino 금융 가이드`,
    summary: item.summary ?? buildSummary(category, item.question, topic),
    quickAnswer: item.quickAnswer ?? quickAnswer(category, topic),
    sections: item.sections ?? topicSections(category, item.question, topic),
    checklist: item.checklist ?? checklistByTopic(category, topic),
    relatedCalculatorLinks: item.relatedCalculatorLinks ?? relatedCalculatorLinks(category, topic),
    faq: item.faq ?? buildFaq(category, item.question, topic),
    keywords: item.keywords ?? keywordSet(item.question, categoryMeta.shortTitle),
    caution:
      item.caution ??
      "제도와 세율, 가입 요건은 바뀔 수 있으므로 실제 계좌 개설이나 해지 전에는 금융회사 공지와 최신 세법 안내를 반드시 다시 확인하는 편이 안전합니다.",
  };
}

export function buildFinanceEntry(category: FinanceCategoryKey, item: FinanceQuestionItem) {
  return mergeEntry(category, item);
}

export function getFinanceEntry(category: FinanceCategoryKey, slug: string) {
  const item = getQuestionBySlug(category, slug);
  return item ? mergeEntry(category, item) : null;
}

export function getRelatedEntries(category: FinanceCategoryKey, slug: string, limit = 6) {
  return getQuestionsByCategory(category)
    .filter((item) => item.slug !== slug)
    .sort((a, b) => (b.searchPriority ?? 0) - (a.searchPriority ?? 0))
    .slice(0, limit)
    .map((item) => mergeEntry(category, item));
}
