export type SpotlightCompany = {
  slug: string;
  market: "korea" | "global";
  ticker: string;
  exchange: string;
  companyNameKo: string;
  companyNameEn: string;
  sector: string;
  updatedAt: string;
  summary: string;
  headline: string;
  business: string[];
  checkpoints: string[];
  risks: string[];
  sources: { label: string; href: string }[];
};

const UPDATED_AT = "2026-10-11";

export const spotlightCompanies: SpotlightCompany[] = [
  {
    slug: "spacex-spcx-stock-analysis",
    market: "global",
    ticker: "SPCX",
    exchange: "NASDAQ",
    companyNameKo: "스페이스X",
    companyNameEn: "Space Exploration Technologies",
    sector: "우주발사 · 위성통신 · AI 인프라",
    updatedAt: UPDATED_AT,
    summary: "2026년 6월 상장한 SpaceX는 Starlink와 발사체, Starship에 더해 AI 데이터센터 투자까지 사업 범위를 넓히고 있습니다.",
    headline: "Starlink의 반복매출과 발사 경쟁력이 강점이지만, Starship·AI 인프라에 필요한 막대한 자본투자가 새 핵심 변수입니다.",
    business: [
      "SpaceX의 핵심 현금창출 축은 Starlink 위성인터넷과 Falcon 발사 서비스이며, Starship은 장기적으로 발사비용과 우주 운송시장 구조를 바꿀 수 있는 프로젝트입니다.",
      "2026년 6월 NASDAQ에 SPCX로 상장했고 이후 Nasdaq-100에 편입되면서 비상장 성장기업이 아니라 공개시장에서 실적과 자본효율을 평가받는 기업이 됐습니다.",
      "최근에는 Nvidia 가속기 확보를 위한 대규모 자금조달을 추진하면서 우주·통신 기업을 넘어 AI 컴퓨팅 인프라까지 확장하려는 전략이 부각되고 있습니다.",
    ],
    checkpoints: [
      "Starlink 가입자와 ARPU, 기업·모바일 연결 서비스가 반복매출로 얼마나 빠르게 확대되는지",
      "Starship 발사·회수 성공률과 상업 운항 일정이 실제 비용 절감으로 이어지는지",
      "AI 데이터센터 투자와 차입 증가가 기존 우주사업의 현금흐름을 훼손하지 않는지",
    ],
    risks: [
      "Starship 개발 일정과 규제·발사 실패 위험",
      "대규모 AI 인프라 투자에 따른 부채와 자본집약도 상승",
      "위성통신·모바일 시장에서 기존 통신사 및 경쟁 위성사업자와의 경쟁 심화",
    ],
    sources: [
      { label: "SpaceX IPO 발표", href: "https://ir.spacex.com/updates/releases-details/2026/Space-Exploration-Technologies-Corp--Announces-Closing-of-Initial-Public-Offering-Including-Full-Exercise-of-Underwriters-Option-to-Purchase-Additional-Shares-2026-RgoR-Y1Vwh/" },
      { label: "Nasdaq-100 편입 발표", href: "https://ir.nasdaq.com/news-releases/news-release-details/space-exploration-technologies-corporation-join-nasdaq-100" },
      { label: "Reuters - AI 인프라 자금조달", href: "https://www.reuters.com/business/media-telecom/spacex-seeks-40-billion-buy-nvidia-chips-ft-reports-2026-10-06/" },
    ],
  },
  {
    slug: "coreweave-crwv-stock-analysis",
    market: "global",
    ticker: "CRWV",
    exchange: "NASDAQ",
    companyNameKo: "코어위브",
    companyNameEn: "CoreWeave",
    sector: "AI 클라우드 · GPU 인프라",
    updatedAt: UPDATED_AT,
    summary: "CoreWeave는 Nvidia GPU를 중심으로 AI 학습·추론 인프라를 임대하는 네오클라우드 사업자입니다.",
    headline: "AI 컴퓨팅 수요와 수주잔고는 강하지만, 높은 CAPEX와 부채를 감당하며 현금흐름을 만드는 속도가 가장 중요합니다.",
    business: [
      "CoreWeave는 범용 클라우드보다 GPU 집약형 AI 워크로드에 집중해 대형 AI 모델 개발사와 기업에 고성능 컴퓨팅을 제공합니다.",
      "2026년 2분기 수주잔고가 1,000억 달러를 넘어섰고 계약 가격도 개선되면서 AI 인프라 수요가 매출 가시성으로 연결되고 있습니다.",
      "반면 데이터센터와 GPU 확보를 위해 계속 대규모 자금이 필요해 성장률보다 자본조달 비용과 계약의 수익성을 함께 봐야 합니다.",
    ],
    checkpoints: [
      "수주잔고가 실제 매출과 영업현금흐름으로 전환되는 속도",
      "신규 GPU 세대 도입 시 자산 회전율과 기존 장비의 경제성",
      "고객 집중도와 장기계약 가격이 투자비용 상승을 상쇄하는지",
    ],
    risks: [
      "대규모 차입·전환사채 발행에 따른 이자비용과 희석 가능성",
      "AI 고객 투자계획 변화에 따른 데이터센터 가동률 변동",
      "GPU 공급사와 일부 대형 고객에 대한 높은 의존도",
    ],
    sources: [
      { label: "Reuters - AI 인프라 수요와 수주잔고", href: "https://www.reuters.com/business/coreweave-super-micro-climb-signs-sustained-ai-buildout-2026-08-12/" },
      { label: "Reuters - 30억달러 전환사채", href: "https://www.reuters.com/legal/transactional/coreweave-launches-3-billion-convertible-debt-sale-2026-09-17/" },
    ],
  },
  {
    slug: "nebius-nbis-stock-analysis",
    market: "global",
    ticker: "NBIS",
    exchange: "NASDAQ",
    companyNameKo: "네비우스",
    companyNameEn: "Nebius Group",
    sector: "AI 클라우드 · GPU 인프라",
    updatedAt: UPDATED_AT,
    summary: "Nebius는 유럽을 중심으로 GPU 클라우드와 AI 개발 인프라를 확장하는 AI 컴퓨팅 사업자입니다.",
    headline: "GPU 임대 가격을 연속 인상할 만큼 수요는 강하지만, 빠른 증설을 위해 조달한 자본을 얼마나 효율적으로 배치하는지가 핵심입니다.",
    business: [
      "Nebius는 AI 모델 학습과 추론용 GPU 클러스터, 개발 플랫폼과 Token Factory 등을 제공하며 네오클라우드 시장에서 CoreWeave와 비교되는 기업입니다.",
      "2026년 들어 AI 컴퓨팅 수요가 공급을 웃돌면서 일부 GPU 서비스 가격을 두 차례 인상했고, 인프라 확장을 위한 대규모 전환사채 발행도 진행했습니다.",
      "Palantir와의 협력 등 소프트웨어 생태계 확장은 단순 GPU 임대를 넘어 고부가 AI 플랫폼으로 이동할 수 있는지 보여주는 지표입니다.",
    ],
    checkpoints: [
      "계약 전력과 실제 가동 GPU 용량이 계획대로 확대되는지",
      "가격 인상이 고객 유지율과 마진 개선으로 이어지는지",
      "AI 플랫폼·추론 서비스 비중이 단순 인프라 임대보다 빠르게 커지는지",
    ],
    risks: [
      "대규모 전환사채 발행에 따른 희석 가능성",
      "AI GPU 공급과 전력 확보 지연",
      "CoreWeave·하이퍼스케일러와의 가격·서비스 경쟁",
    ],
    sources: [
      { label: "Nebius Newsroom", href: "https://nebius.com/newsroom" },
      { label: "Reuters - AI 클라우드 가격 인상", href: "https://www.reuters.com/technology/nebius-hikes-ai-cloud-prices-again-demand-computing-power-soars-2026-09-17/" },
    ],
  },
  {
    slug: "cerebras-cbrs-stock-analysis",
    market: "global",
    ticker: "CBRS",
    exchange: "NASDAQ",
    companyNameKo: "세레브라스 시스템즈",
    companyNameEn: "Cerebras Systems",
    sector: "AI 반도체 · 추론 인프라",
    updatedAt: UPDATED_AT,
    summary: "Cerebras는 웨이퍼 스케일 AI 프로세서와 이를 이용한 초고속 추론 시스템을 공급하는 AI 반도체 기업입니다.",
    headline: "Nvidia와 다른 웨이퍼 스케일 구조가 차별점이지만, OpenAI 등 소수 대형 고객 의존도와 신규 시스템 배치 속도를 함께 봐야 합니다.",
    business: [
      "Cerebras는 여러 개의 GPU를 연결하는 방식과 달리 거대한 단일 웨이퍼 기반 프로세서를 사용해 AI 학습·추론 속도를 높이는 전략을 취합니다.",
      "2026년 상장 후 OpenAI와의 대형 계약이 기업가치의 중요한 근거가 됐고, 최근에는 Gimlet Labs에 약 100MW 규모 AI 시스템을 공급하기로 했습니다.",
      "기술 차별성이 매출의 반복성과 고객 다변화로 연결되는지가 장기 평가의 핵심입니다.",
    ],
    checkpoints: [
      "OpenAI 계약의 실제 시스템 배치와 매출 인식 속도",
      "CS-4 등 차세대 시스템의 가격·성능 경쟁력",
      "클라우드·기업 고객으로 고객 기반이 넓어지는지",
    ],
    risks: [
      "대형 고객에 대한 매출 집중",
      "Nvidia·AMD 및 커스텀 AI 칩과의 경쟁",
      "신규 반도체 아키텍처의 생산·배치 실행 위험",
    ],
    sources: [
      { label: "Reuters - Gimlet Labs 공급계약", href: "https://www.reuters.com/technology/cerebras-supply-ai-systems-cloud-computing-startup-gimlet-labs-2026-09-28/" },
    ],
  },
  {
    slug: "oklo-oklo-stock-analysis",
    market: "global",
    ticker: "OKLO",
    exchange: "NYSE",
    companyNameKo: "오클로",
    companyNameEn: "Oklo",
    sector: "SMR · 원전 · 데이터센터 전력",
    updatedAt: UPDATED_AT,
    summary: "Oklo는 소형 첨단원자로를 개발해 데이터센터와 산업시설에 장기 전력을 판매하려는 초기 단계 원전 기업입니다.",
    headline: "AI 데이터센터의 24시간 전력 수요가 큰 기회지만, 아직 상용 원자로의 인허가·건설·운영을 증명해야 하는 단계입니다.",
    business: [
      "Oklo의 모델은 원자로 설비를 단순 판매하기보다 직접 개발·운영하고 고객에게 장기 전력계약으로 전기를 판매하는 방식에 가깝습니다.",
      "빅테크의 데이터센터 전력 확보 경쟁이 원전 수요를 키우면서 SMR 기업에 대한 관심이 높아졌고, Oklo도 대형 기술기업과 장기 전력 협력을 추진하고 있습니다.",
      "현재 가치의 상당 부분은 미래 프로젝트에 대한 기대이므로 수주 발표보다 인허가와 실제 착공의 진척도를 더 중요하게 볼 필요가 있습니다.",
    ],
    checkpoints: [
      "미 NRC 인허가 절차가 계획대로 진행되는지",
      "발표된 전력계약이 확정 프로젝트와 착공으로 전환되는지",
      "첫 상용 원자로의 자본비용과 발전단가가 경쟁 가능한지",
    ],
    risks: [
      "상업운전 전 단계 기업으로서 매출 가시성이 낮음",
      "원전 인허가와 건설 일정 지연",
      "대규모 자금조달에 따른 주주가치 희석 가능성",
    ],
    sources: [
      { label: "Oklo 투자자 정보", href: "https://oklo.com/investors/default.aspx" },
    ],
  },
  {
    slug: "nuscale-power-smr-stock-analysis",
    market: "global",
    ticker: "SMR",
    exchange: "NYSE",
    companyNameKo: "뉴스케일 파워",
    companyNameEn: "NuScale Power",
    sector: "SMR · 원전 기술",
    updatedAt: UPDATED_AT,
    summary: "NuScale Power는 미국 NRC 설계 인증을 받은 소형모듈원자로 기술을 상용 프로젝트로 연결하려는 원전 기술기업입니다.",
    headline: "설계 인증이라는 선점 효과는 분명하지만, 실제 발전소 계약과 자금조달이 상업화를 결정합니다.",
    business: [
      "NuScale은 모듈당 77MW급 원자로를 여러 기 조합하는 방식의 SMR 설계를 개발했고, 미국에서 설계 인증을 확보한 것이 가장 큰 자산입니다.",
      "데이터센터와 산업용 전력 수요 증가로 SMR의 잠재 고객군은 넓어졌지만, 기술 인증과 실제 프로젝트 경제성은 별개의 문제입니다.",
      "따라서 기술 뉴스보다 고객의 최종투자결정, EPC 구조, 건설비와 금융조달 조건을 중심으로 봐야 합니다.",
    ],
    checkpoints: [
      "구체적 프로젝트의 최종투자결정과 착공 여부",
      "모듈 제조 공급망과 실제 건설비가 목표 수준에 접근하는지",
      "데이터센터·산업 고객이 장기 전력계약으로 연결되는지",
    ],
    risks: [
      "대규모 프로젝트 취소·지연 가능성",
      "초도호기 비용 상승과 금융조달 부담",
      "다른 SMR·대형 원전 및 가스발전과의 경제성 경쟁",
    ],
    sources: [
      { label: "NuScale 투자자 정보", href: "https://www.nuscalepower.com/investors" },
      { label: "NuScale 2026년 3분기 일정", href: "https://www.nuscalepower.com/press-releases/2026/nuscale-power-to-hold-third-quarter-2026-earnings-conference-call" },
    ],
  },
  {
    slug: "sanil-electric-062040-stock-analysis",
    market: "korea",
    ticker: "062040",
    exchange: "KOSPI",
    companyNameKo: "산일전기",
    companyNameEn: "Sanil Electric",
    sector: "특수변압기 · 데이터센터 전력",
    updatedAt: UPDATED_AT,
    summary: "산일전기는 신재생에너지·데이터센터·ESS 등에 사용되는 특수변압기를 생산하며 북미와 유럽 전력 인프라 투자 수혜를 받고 있습니다.",
    headline: "특수변압기 수주가 급증하고 미국 공급망 재편이 기회가 되고 있지만, 증설 이후에도 높은 수익성을 유지할 수 있는지가 중요합니다.",
    business: [
      "산일전기는 일반 전력망용 변압기보다 신재생에너지, 데이터센터, ESS 등에 사용되는 특수변압기 비중이 빠르게 커지고 있습니다.",
      "2026년 2분기 매출과 영업이익이 모두 성장했고 특수변압기 신규수주·수주잔고 비중이 높은 수준으로 확대됐습니다.",
      "미국과 유럽의 중국산 전력기기 의존도 축소는 GE·TMEIC 등 글로벌 고객과 거래하는 산일전기에 추가 수주 기회가 될 수 있습니다.",
    ],
    checkpoints: [
      "특수변압기 수주 증가가 매출과 영업이익으로 전환되는 속도",
      "3공장 등 생산능력 증설 이후 가동률과 마진 유지 여부",
      "미국 데이터센터와 유럽 신재생에너지 고객 다변화",
    ],
    risks: [
      "급격한 증설 이후 전력기기 사이클 둔화",
      "원재료·인건비 상승과 환율 변동",
      "높아진 주가 기대와 실제 이익 성장의 괴리",
    ],
    sources: [
      { label: "연합뉴스 - 미국·유럽 공급망 규제 수혜", href: "https://www.yna.co.kr/view/AKR20261006027600008" },
      { label: "연합뉴스 - 데이터센터 수주 확대", href: "https://www.yna.co.kr/amp/view/AKR20260810017900008" },
    ],
  },
];

export function getSpotlightCompany(slug: string) {
  return spotlightCompanies.find((company) => company.slug === slug);
}
