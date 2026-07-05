export type SearchDemandLink = {
  label: string;
  href: string;
  description: string;
  tag?: string;
};

export type SearchDemandCluster = {
  key: "cash-calculators" | "theme-stocks" | "company-check" | "account-guides";
  badge: string;
  title: string;
  description: string;
  userNeed: string;
  upgradeDirection: string;
  keywords: string[];
  tags: string[];
  links: SearchDemandLink[];
};

export const searchDemandClusters: SearchDemandCluster[] = [
  {
    key: "cash-calculators",
    badge: "계산기",
    title: "CMA 이자·파킹통장 금리·배당금을 바로 계산하는 주제",
    description:
      "CMA 이자 계산기, 파킹통장 금리 계산기, 배당 계산기처럼 금액을 넣고 바로 결과를 보고 싶은 검색에서 유입 신호가 강합니다.",
    userNeed:
      "사용자는 긴 설명보다 먼저 금액을 넣어보고, 계산 결과 아래에서 세금·한도·주의사항을 짧게 확인하길 원합니다.",
    upgradeDirection:
      "계산기 상단은 입력 영역을 유지하고, 예시·FAQ·관련 가이드는 접힌 카드로 정리해 계산을 방해하지 않게 합니다.",
    keywords: ["CMA 이자 계산기", "파킹통장 금리계산", "배당 계산기", "청년도약계좌 계산기", "퇴직소득세 계산기"],
    tags: ["계산기", "현금관리", "배당", "절세"],
    links: [
      { label: "CMA·파킹통장 이자 묶음", href: "/topics/cma-parking-cash", description: "CMA 계산기, 파킹통장 계산기, 계좌 질문을 한 흐름으로 확인합니다.", tag: "현금관리" },
      { label: "배당 현금흐름 묶음", href: "/topics/dividend-cashflow", description: "배당 계산기와 배당 투자 가이드를 세후 현금흐름 기준으로 연결합니다.", tag: "배당" },
      { label: "CMA 이자 계산기", href: "/cal/cma-interest", description: "예치금·금리·보유일수 기준으로 세전·세후 이자를 계산합니다.", tag: "현금관리" },
      { label: "파킹통장 금리 계산기", href: "/cal/parking-account", description: "우대금리 한도와 초과분 금리를 나눠 월 이자를 확인합니다.", tag: "현금관리" },
      { label: "배당 계산기", href: "/cal/calculator", description: "세전·세후 배당금과 월 배당 현금흐름을 계산합니다.", tag: "배당" },
      { label: "청년도약계좌 만기 계산기", href: "/cal/youth-leap-account", description: "월 납입액과 정부기여금 기준 만기 예상액을 확인합니다.", tag: "청년" },
      { label: "퇴직소득세 계산기", href: "/cal/retirement-tax", description: "퇴직금 실수령액과 예상 세금을 근속연수 기준으로 점검합니다.", tag: "퇴직" },
    ],
  },
  {
    key: "theme-stocks",
    badge: "산업·테마",
    title: "미국 2차전지 관련주·반도체 장비주·헬스케어 관련주",
    description:
      "관련주 검색은 종목 목록만 많으면 이탈이 커집니다. 대표 기업을 보여주되 산업 단계와 실적 변수를 먼저 나누는 허브가 필요합니다.",
    userNeed:
      "사용자는 ‘어떤 기업이 관련주인지’와 함께 왜 같은 테마로 묶이는지, 어떤 실적 지표를 봐야 하는지 빠르게 확인하고 싶어합니다.",
    upgradeDirection:
      "관련주 허브는 국내·미국 종목을 구분하고, 밸류체인·실적 변수·리스크를 접힌 카드로 제공해 목록 피로도를 줄입니다.",
    keywords: ["미국 2차전지 관련주", "미국 반도체 장비주", "헬스케어 관련주", "AI 소프트웨어 관련주 한국"],
    tags: ["관련주", "미국주식", "국내주식", "산업"],
    links: [
      { label: "관련주 테마 묶음", href: "/topics/theme-stock-map", description: "미국 2차전지·반도체 장비·헬스케어 관련주를 산업 단계별로 봅니다.", tag: "관련주" },
      { label: "미국 2차전지 관련주", href: "/industry/us-battery-stocks", description: "테슬라·리튬·배터리 소재 기업을 역할별로 비교합니다.", tag: "미국주식" },
      { label: "미국 반도체 장비주", href: "/industry/us-semiconductor-equipment", description: "노광·식각·증착·검사 장비 기업을 나눠 봅니다.", tag: "미국주식" },
      { label: "헬스케어 관련주", href: "/industry/healthcare-stocks", description: "제약·바이오·의료기기·헬스케어 서비스를 구분합니다.", tag: "헬스케어" },
      { label: "AI 소프트웨어 관련주 한국", href: "/industry/korea-ai-software", description: "국내 AI 플랫폼·보안·클라우드·소프트웨어 기업을 묶었습니다.", tag: "국내주식" },
    ],
  },
  {
    key: "company-check",
    badge: "기업분석",
    title: "원자현미경 주가·쌍용C&E 주가처럼 기업분석으로 이어지는 주제",
    description:
      "개별 종목명과 주가 전망 키워드는 클릭 가능성이 있습니다. 단정적인 전망보다 사업 구조, 실적 변수, 관련 산업 링크로 이어져야 체류가 길어집니다.",
    userNeed:
      "사용자는 오늘 주가가 왜 움직였는지보다 이 회사가 무엇으로 돈을 벌고, 다음 실적에서 무엇을 확인해야 하는지 알고 싶어합니다.",
    upgradeDirection:
      "기업분석 페이지는 전망 표현을 줄이고 사업 구조, 주가 변수, 실적 체크포인트, 관련 산업으로 이어지는 링크를 강화합니다.",
    keywords: ["원자현미경 주가", "쌍용C&E 주가", "제넥신 주가 전망", "동방 관련주"],
    tags: ["기업분석", "주가", "체크포인트", "산업연결"],
    links: [
      { label: "관련주 테마 묶음", href: "/topics/theme-stock-map", description: "개별 종목을 보기 전에 같은 산업과 실적 변수를 먼저 확인합니다.", tag: "산업" },
      { label: "기업분석 메인", href: "/company-analysis", description: "국내·미국 기업을 기업명·티커·업종으로 찾아봅니다.", tag: "검색" },
      { label: "산업·테마 가이드", href: "/industry", description: "개별 종목을 보기 전에 같은 산업에 묶인 기업을 비교합니다.", tag: "산업" },
      { label: "투자전략 가이드", href: "/info/strategy", description: "종목 선택 전 자산배분과 리스크 기준을 먼저 잡습니다.", tag: "전략" },
    ],
  },
  {
    key: "account-guides",
    badge: "금융가이드",
    title: "ISA 계좌 몇 개·IRP 계좌 여러 개처럼 바로 답이 필요한 주제",
    description:
      "‘ISA 계좌 몇 개’, ‘IRP 계좌 여러 개’처럼 짧고 구체적인 질문은 금융 Q&A 구조와 잘 맞습니다. 첫 화면에서 답을 주고 세부 내용은 접어두는 방식이 적합합니다.",
    userNeed:
      "사용자는 법령 문장보다 내 상황에서 가능한지, 만들기 전에 무엇을 확인해야 하는지 짧게 알고 싶어합니다.",
    upgradeDirection:
      "계좌형 콘텐츠는 첫 답변을 짧게 두고, 세금·중도해지·연금수령 같은 세부 내용은 필요할 때만 펼쳐보게 구성합니다.",
    keywords: ["ISA 계좌 몇 개", "IRP 계좌 여러 개", "CMA 계좌 이자 계산", "파킹통장 금리 계산"],
    tags: ["ISA", "IRP", "CMA", "파킹통장"],
    links: [
      { label: "IRP·연금·퇴직세금 묶음", href: "/topics/retirement-tax-accounts", description: "IRP 세액공제, 연금저축, 퇴직소득세 계산을 한 흐름으로 봅니다.", tag: "연금" },
      { label: "CMA·파킹통장 이자 묶음", href: "/topics/cma-parking-cash", description: "CMA와 파킹통장을 계산기와 질문 가이드로 함께 비교합니다.", tag: "현금관리" },
      { label: "ISA 질문 가이드", href: "/finance/isa", description: "ISA 가입 조건, 1인 1계좌, 만기, 절세 구조를 질문별로 봅니다.", tag: "ISA" },
      { label: "IRP 질문 가이드", href: "/finance/irp", description: "IRP 가입, 퇴직금 수령, 세액공제, 중도해지를 확인합니다.", tag: "IRP" },
      { label: "CMA 질문 가이드", href: "/finance/cma", description: "CMA 계좌 이자와 파킹통장 차이를 함께 확인합니다.", tag: "CMA" },
      { label: "파킹통장 질문 가이드", href: "/finance/parking", description: "우대금리, 한도 초과분, 예금자보호 기준을 짧게 봅니다.", tag: "파킹통장" },
    ],
  },
];

export function getSearchDemandCluster(key: SearchDemandCluster["key"]) {
  return searchDemandClusters.find((cluster) => cluster.key === key);
}
