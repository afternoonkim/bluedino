export type BundleLink = {
  label: string;
  href: string;
  description: string;
  tag?: string;
};

export type ContentBundleSection = {
  title: string;
  description: string;
  links: BundleLink[];
};

export type ContentBundle = {
  slug: string;
  badge: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string;
  userNeed: string;
  firstStep: string;
  sections: ContentBundleSection[];
  checklist: string[];
  faqs: { question: string; answer: string }[];
  updatedAt: string;
};

export const contentBundles: ContentBundle[] = [
  {
    slug: "cma-parking-cash",
    badge: "현금관리 묶음",
    title: "CMA 이자 계산기·파킹통장 금리 계산기 한 번에 비교",
    metaTitle: "CMA 이자 계산기·파킹통장 금리 계산기 | 하루·월 이자 비교 | BlueDino",
    metaDescription:
      "CMA 이자 계산기와 파킹통장 금리 계산기를 한 흐름으로 묶었습니다. 예치금별 하루 이자, 월 이자, 우대금리 한도, CMA·파킹통장 차이를 바로 확인하세요.",
    keywords: [
      "CMA 이자 계산기",
      "CMA 계좌 이자 계산기",
      "파킹통장 금리 계산기",
      "파킹통장 금리계산",
      "CMA 파킹통장 차이",
    ],
    summary:
      "CMA와 파킹통장은 모두 단기 여유자금을 맡길 때 많이 찾지만, 실제 비교는 광고 금리보다 내 예치금에 적용되는 세후 이자에서 시작해야 합니다. 이 페이지는 계산기에서 숫자를 먼저 보고, 필요한 경우에만 계좌 조건과 주의사항으로 이어지게 정리했습니다.",
    userNeed:
      "검색자는 긴 상품 설명보다 ‘1,000만 원을 넣으면 하루 이자가 얼마인지’, ‘우대금리 한도를 넘으면 얼마가 줄어드는지’를 먼저 알고 싶어합니다.",
    firstStep:
      "예치금과 금리를 알고 있다면 CMA 이자 계산기나 파킹통장 금리 계산기를 먼저 열고, 상품을 고르는 중이라면 계좌 질문 가이드로 차이를 확인하세요.",
    sections: [
      {
        title: "먼저 숫자로 확인하기",
        description: "금리 광고보다 실제 세후 이자가 먼저입니다. 금액·기간·한도를 넣어보면 선택 기준이 빨라집니다.",
        links: [
          { label: "CMA 이자 계산기", href: "/cal/cma-interest", description: "예치금, 연 금리, 보유일수 기준으로 세전·세후 이자를 계산합니다.", tag: "CMA" },
          { label: "파킹통장 금리 계산기", href: "/cal/parking-account", description: "우대금리 한도와 초과분 금리를 나눠 월 이자를 확인합니다.", tag: "파킹통장" },
          { label: "예금 이자 계산기", href: "/cal/deposit-interest", description: "자금을 조금 더 오래 묶어도 되는 경우 예금 만기 이자와 비교합니다.", tag: "예금" },
        ],
      },
      {
        title: "계좌 조건을 짧은 질문으로 확인하기",
        description: "계산 결과가 비슷하다면 예금자보호, 이자 지급일, 출금 편의성, 한도 초과 금리를 봐야 합니다.",
        links: [
          { label: "CMA 질문 가이드", href: "/finance/cma", description: "RP형·MMF형·발행어음형 차이와 CMA 이자 구조를 질문별로 봅니다.", tag: "CMA" },
          { label: "파킹통장 질문 가이드", href: "/finance/parking", description: "우대금리 조건, 한도 초과분, 예금자보호 기준을 확인합니다.", tag: "파킹통장" },
          { label: "월 예산 계산기", href: "/cal/monthly-budget", description: "생활비와 비상금, 투자 대기자금을 나눠둘 금액을 정합니다.", tag: "생활자금" },
        ],
      },
    ],
    checklist: [
      "광고 금리만 보지 말고 내 예치금 전체에 적용되는 평균 금리를 확인합니다.",
      "우대금리 조건을 충족하지 못해도 괜찮은지 기본금리를 따로 봅니다.",
      "CMA는 상품 유형에 따라 원금 손실 가능성과 예금자보호 여부가 달라질 수 있습니다.",
      "파킹통장은 금리 적용 한도와 이자 지급 주기가 은행마다 다르므로 월 이자로 다시 계산합니다.",
    ],
    faqs: [
      {
        question: "CMA와 파킹통장 중 무엇을 먼저 봐야 하나요?",
        answer:
          "주식·ETF 매수 대기자금이면 CMA가 편할 수 있고, 비상금처럼 은행권에서 안정적으로 보관하고 싶다면 파킹통장이 더 익숙할 수 있습니다. 다만 실제 선택은 금리보다 한도, 보호 여부, 출금 편의성을 함께 봐야 합니다.",
      },
      {
        question: "CMA 이자 계산기와 파킹통장 계산기를 둘 다 써야 하나요?",
        answer:
          "금액이 크지 않다면 차이가 작을 수 있지만, 우대금리 한도가 있거나 보관 기간이 길어지면 결과가 달라질 수 있습니다. 같은 금액을 두 계산기에 넣어보면 비교가 빠릅니다.",
      },
    ],
    updatedAt: "2026-07-05",
  },
  {
    slug: "dividend-cashflow",
    badge: "배당 묶음",
    title: "배당 계산기와 세후 배당금·월 배당 현금흐름",
    metaTitle: "배당 계산기 | 세후 배당금·월 배당 현금흐름 가이드 | BlueDino",
    metaDescription:
      "배당 계산기로 세후 배당금과 월 배당 현금흐름을 먼저 확인하고, 배당률·배당성향·월배당 ETF·재투자 기준까지 이어서 볼 수 있게 묶었습니다.",
    keywords: ["배당 계산기", "배당금 계산기", "월배당 ETF", "배당 투자", "세후 배당금"],
    summary:
      "배당 투자는 배당률이 높아 보인다고 끝나는 주제가 아닙니다. 세후 배당금이 얼마나 남는지, 배당이 지속될 수 있는지, 주가 하락으로 총수익이 훼손되지 않는지를 함께 봐야 합니다.",
    userNeed:
      "검색자는 보유 수량을 넣어 월 배당이 얼마인지 먼저 확인한 뒤, 그 배당이 오래 유지될 수 있는지 알고 싶어합니다.",
    firstStep:
      "배당금이 궁금하면 배당 계산기부터 쓰고, 종목이나 ETF를 고르는 중이라면 배당 투자 기초와 월배당 ETF 체크포인트를 이어서 보세요.",
    sections: [
      {
        title: "배당금을 먼저 계산하기",
        description: "세전 배당보다 실제로 받는 세후 금액을 기준으로 월 현금흐름을 가늠합니다.",
        links: [
          { label: "배당 계산기", href: "/cal/calculator", description: "보유 수량, 주당 배당금, 세율을 넣어 세후 배당금을 계산합니다.", tag: "계산기" },
          { label: "복리 계산기", href: "/cal/compound", description: "배당금을 재투자했을 때 장기 자산 흐름이 어떻게 달라지는지 봅니다.", tag: "재투자" },
          { label: "은퇴 목표자금 계산기", href: "/cal/retirement-target", description: "배당 현금흐름을 은퇴 자금 계획과 연결해 봅니다.", tag: "은퇴" },
        ],
      },
      {
        title: "배당의 질을 확인하기",
        description: "높은 배당률만 보면 위험할 수 있습니다. 배당 지속성, 이익 성장, 분배 구조를 함께 확인합니다.",
        links: [
          { label: "배당 투자 기초", href: "/info/guide/dividend-basics", description: "배당률, 배당성향, 배당 성장, 세후 수익을 쉽게 정리했습니다.", tag: "기초" },
          { label: "배당 투자 전략", href: "/info/strategy/dividend", description: "배당주와 배당 ETF를 현금흐름 관점에서 보는 기준입니다.", tag: "전략" },
          { label: "월배당 ETF 체크포인트", href: "/info/guide/monthly-dividend-etf-checklist", description: "월분배만 보고 접근하기 전 확인할 총수익과 분배 구조입니다.", tag: "ETF" },
        ],
      },
    ],
    checklist: [
      "배당률은 주가 하락 때문에 높아 보일 수 있으므로 배당성향과 이익 흐름을 같이 봅니다.",
      "세후 배당금 기준으로 월 현금흐름을 계산합니다.",
      "월배당 ETF는 분배금 지급 주기보다 총수익과 보수, 기초자산을 먼저 확인합니다.",
      "배당 재투자를 할지 생활비로 쓸지에 따라 계산 결과의 의미가 달라집니다.",
    ],
    faqs: [
      {
        question: "배당 계산기는 어떤 순서로 쓰면 좋나요?",
        answer:
          "주당 배당금이나 배당률을 넣어 연간 배당금을 먼저 보고, 세후 금액과 월평균 현금흐름으로 다시 나눠보면 현실적인 금액을 파악하기 쉽습니다.",
      },
      {
        question: "배당률이 높으면 좋은 배당주인가요?",
        answer:
          "항상 그렇지는 않습니다. 배당률은 주가가 내려가도 높아질 수 있기 때문에 배당 지속성, 이익 증가, 부채 부담, 배당성향을 함께 확인해야 합니다.",
      },
    ],
    updatedAt: "2026-07-05",
  },
  {
    slug: "retirement-tax-accounts",
    badge: "연금·절세 묶음",
    title: "IRP 세액공제·연금저축·퇴직소득세 계산 순서",
    metaTitle: "IRP 세액공제·연금저축·퇴직소득세 계산기 | 환급·실수령액 비교 | BlueDino",
    metaDescription:
      "IRP 세액공제 계산기, 연금저축 세액공제 계산기, 퇴직소득세 계산기를 한 흐름으로 묶었습니다. 환급 예상액, 퇴직금 실수령액, 중도해지 부담을 함께 확인하세요.",
    keywords: ["IRP 계좌 여러개", "IRP 세액공제", "연금저축 세액공제", "퇴직소득세 세율 계산기", "절세계좌 순서"],
    summary:
      "IRP와 연금저축은 연말정산 환급만 보고 가입하면 중도해지나 연금수령 시점에서 다시 막힐 수 있습니다. 납입 전에는 세액공제 금액, 55세 이후 수령 계획, 중도해지 세금 부담을 같은 흐름으로 봐야 합니다.",
    userNeed:
      "검색자는 ‘얼마나 환급되는지’와 동시에 ‘나중에 돈을 빼면 세금이 어떻게 되는지’를 알고 싶어합니다.",
    firstStep:
      "올해 납입액을 정하려면 IRP·연금저축 세액공제 계산기부터 보고, 퇴직금 수령이나 중도해지가 고민이면 질문 가이드로 이동하세요.",
    sections: [
      {
        title: "세액공제와 퇴직세금 계산하기",
        description: "납입액과 소득 구간에 따라 환급 예상액이 달라집니다. 퇴직금은 근속연수와 지급액 기준으로 따로 계산합니다.",
        links: [
          { label: "IRP 세액공제 계산기", href: "/cal/irp-tax-credit", description: "IRP 납입액과 소득 구간 기준 예상 세액공제를 확인합니다.", tag: "IRP" },
          { label: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit", description: "연금저축 납입액 기준 세액공제 효과를 계산합니다.", tag: "연금저축" },
          { label: "퇴직소득세 계산기", href: "/cal/retirement-tax", description: "퇴직금과 근속연수 기준 예상 세금과 실수령액을 봅니다.", tag: "퇴직" },
        ],
      },
      {
        title: "계좌 질문으로 제도 확인하기",
        description: "계산 결과가 좋아 보여도 돈이 오래 묶일 수 있습니다. 중도해지, 연금수령, 여러 계좌 운영 기준을 확인합니다.",
        links: [
          { label: "IRP 질문 가이드", href: "/finance/irp", description: "IRP 계좌 여러 개, 퇴직금 수령, ETF 투자, 중도해지를 질문별로 봅니다.", tag: "IRP" },
          { label: "연금저축 질문 가이드", href: "/finance/pension", description: "연금저축 납입, 세액공제, 수령, 중도해지를 정리했습니다.", tag: "연금저축" },
          { label: "절세계좌 활용순서", href: "/info/investment/account-tax-step", description: "ISA·연금저축·IRP를 어떤 순서로 볼지 정리합니다.", tag: "순서" },
        ],
      },
    ],
    checklist: [
      "환급액만 보지 말고 55세 이후 수령 계획과 중도해지 가능성을 함께 봅니다.",
      "IRP와 연금저축은 납입한도와 세액공제 한도를 구분해서 계산합니다.",
      "퇴직금은 IRP 입금 후 연금수령과 일시수령의 세금 차이를 확인합니다.",
      "올해 생활비와 비상금을 먼저 확보한 뒤 절세계좌 납입액을 정합니다.",
    ],
    faqs: [
      {
        question: "IRP와 연금저축 중 무엇부터 채우면 좋나요?",
        answer:
          "정답이 하나로 고정되지는 않습니다. 투자 자유도, 중도인출 가능성, 퇴직금 수령 여부, 연말정산 환급 목표를 같이 보고 순서를 정하는 편이 안전합니다.",
      },
      {
        question: "퇴직소득세 계산기는 언제 써야 하나요?",
        answer:
          "퇴직금 규모와 근속연수를 알고 있거나 이직·퇴직을 앞두고 있다면 미리 써보는 것이 좋습니다. 예상 실수령액을 알면 IRP에 남길 금액과 인출할 금액을 나누기 쉽습니다.",
      },
    ],
    updatedAt: "2026-07-05",
  },
  {
    slug: "theme-stock-map",
    badge: "관련주 묶음",
    title: "미국 2차전지 관련주·반도체 장비주·헬스케어 관련주 지도",
    metaTitle: "미국 2차전지 관련주·반도체 장비주·헬스케어 관련주 정리 | BlueDino",
    metaDescription:
      "미국 2차전지 관련주, 미국 반도체 장비주, 헬스케어 관련주, 한국 AI 소프트웨어 관련주를 산업 단계별로 묶었습니다. 대표 기업과 실적 변수를 함께 확인하세요.",
    keywords: ["미국 2차전지 관련주", "미국 반도체 장비주", "헬스케어 관련주", "AI 소프트웨어 관련주 한국", "관련주 정리"],
    summary:
      "관련주 검색은 종목을 많이 보는 것보다 ‘왜 같은 테마로 묶이는지’를 먼저 나눠야 합니다. 같은 2차전지라도 완성차·소재·충전 인프라가 다르고, 같은 헬스케어라도 제약·바이오·의료기기·보험은 주가 변수가 다릅니다.",
    userNeed:
      "검색자는 대표 기업 목록을 빠르게 보고 싶지만, 실제로 오래 남는 정보는 각 기업이 어떤 역할을 하는지와 실적에서 무엇을 확인해야 하는지입니다.",
    firstStep:
      "관심 테마가 정해져 있다면 해당 산업 페이지로 이동하고, 개별 종목을 이미 알고 있다면 기업분석에서 사업 구조를 확인하세요.",
    sections: [
      {
        title: "노출 가능성이 보인 핵심 테마",
        description: "검색 유입 신호가 있는 관련주 주제를 먼저 묶었습니다. 테마별로 국내·미국 종목과 실적 변수를 나눠 봅니다.",
        links: [
          { label: "미국 2차전지 관련주", href: "/industry/us-battery-stocks", description: "전기차, 리튬, 배터리 소재, 충전 인프라 기업을 역할별로 봅니다.", tag: "2차전지" },
          { label: "미국 반도체 장비주", href: "/industry/us-semiconductor-equipment", description: "노광·식각·증착·검사 장비 기업을 공정별로 확인합니다.", tag: "반도체" },
          { label: "헬스케어 관련주", href: "/industry/healthcare-stocks", description: "제약·바이오·의료기기·헬스케어 서비스를 나눠 비교합니다.", tag: "헬스케어" },
          { label: "AI 소프트웨어 관련주 한국", href: "/industry/korea-ai-software", description: "국내 AI 플랫폼, 보안, 클라우드, 산업용 소프트웨어 기업을 묶었습니다.", tag: "AI" },
        ],
      },
      {
        title: "기업분석으로 이어서 확인하기",
        description: "테마를 고른 뒤에는 개별 기업의 매출 구조, 이익률, 현금흐름, 리스크를 확인해야 합니다.",
        links: [
          { label: "기업분석 메인", href: "/company-analysis", description: "국내·미국 기업을 기업명, 티커, 업종으로 찾아봅니다.", tag: "기업분석" },
          { label: "산업·테마 전체", href: "/industry", description: "반도체, AI, 2차전지, 바이오, 배당 등 전체 테마를 목록으로 봅니다.", tag: "테마" },
          { label: "투자전략 가이드", href: "/info/strategy", description: "테마 투자 전 자산배분과 리스크 관리 기준을 잡습니다.", tag: "전략" },
        ],
      },
    ],
    checklist: [
      "관련주 이름만 보지 말고 기업이 밸류체인 어느 단계에 있는지 확인합니다.",
      "테마 뉴스와 실제 매출 반영 여부를 구분합니다.",
      "미국주식과 국내주식은 환율, 공시, 세금, 시장 변동성이 다르다는 점을 고려합니다.",
      "개별 종목을 고르기 전 같은 산업 안의 경쟁사와 실적 지표를 비교합니다.",
    ],
    faqs: [
      {
        question: "관련주는 종목이 많을수록 좋은가요?",
        answer:
          "아닙니다. 종목이 많으면 오히려 판단이 흐려질 수 있습니다. 먼저 산업 단계를 나누고, 그 안에서 실적이 실제로 연결되는 기업을 좁혀 보는 편이 좋습니다.",
      },
      {
        question: "미국 관련주와 국내 관련주는 같은 기준으로 보면 되나요?",
        answer:
          "기본 산업 구조는 비슷하게 볼 수 있지만 환율, 세금, 고객사, 시장 규모, 공시 체계가 다릅니다. 같은 테마라도 미국과 국내를 나눠 보는 것이 안전합니다.",
      },
    ],
    updatedAt: "2026-07-05",
  },
];

export function getContentBundle(slug: string) {
  return contentBundles.find((bundle) => bundle.slug === slug);
}

export function getContentBundleSlugs() {
  return contentBundles.map((bundle) => bundle.slug);
}
