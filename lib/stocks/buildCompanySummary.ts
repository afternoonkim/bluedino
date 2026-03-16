// lib/stocks/buildCompanySummary.ts

type SummaryInput = {
  companyName?: string | null;
  exchange?: string | null;
  exchangeShortName?: string | null;
  sector?: string | null;
  industry?: string | null;
  marketCap?: number | null;
  currentPrice?: number | null;
};

function formatExchangeName(exchange?: string | null, exchangeShortName?: string | null) {
  const value = exchangeShortName || exchange || "";

  if (!value) return "미국 증시";
  if (value.toUpperCase().includes("NASDAQ")) return "미국 나스닥";
  if (value.toUpperCase().includes("NYSE")) return "미국 뉴욕증권거래소";

  return `${value} 시장`;
}

function formatMarketCap(marketCap?: number | null) {
  if (!marketCap || marketCap <= 0) return null;

  if (marketCap >= 1_000_000_000_000) {
    return `${(marketCap / 1_000_000_000_000).toFixed(2)}조 달러`;
  }

  if (marketCap >= 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(1)}억 달러`;
  }

  if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(1)}백만 달러`;
  }

  return `${marketCap.toLocaleString("en-US")}달러`;
}

function formatPrice(price?: number | null) {
  if (price == null || Number.isNaN(price)) return null;
  return `$${price.toFixed(2)}`;
}

function getIndustryDescription(industry?: string | null) {
  const value = (industry || "").toLowerCase();

  if (value.includes("semiconductor")) {
    return "반도체 산업은 데이터센터, AI, 스마트폰, 자동차, 산업 장비 등 다양한 분야와 연결되며 기술 경쟁력과 수요 사이클의 영향을 크게 받습니다.";
  }

  if (value.includes("software")) {
    return "소프트웨어 산업은 기업용 솔루션, 클라우드, 생산성 도구, 보안 서비스 등으로 확장되며 반복 매출 구조와 고객 유지율이 중요한 평가 요소입니다.";
  }

  if (value.includes("internet") || value.includes("content") || value.includes("information")) {
    return "인터넷 플랫폼 산업은 검색, 광고, 콘텐츠, 데이터 기반 서비스와 연결되며 사용자 트래픽과 플랫폼 경쟁력이 핵심 변수로 작용합니다.";
  }

  if (value.includes("consumer electronics")) {
    return "소비자 전자기기 산업은 제품 경쟁력, 브랜드 파워, 생태계 확장성, 신제품 수요 흐름이 실적에 큰 영향을 줍니다.";
  }

  if (value.includes("credit") || value.includes("financial")) {
    return "금융 관련 산업은 금리 환경, 대손 비용, 자산 건전성, 규제 변화가 수익성과 밸류에이션에 중요한 영향을 줍니다.";
  }

  if (value.includes("biotechnology") || value.includes("biotech")) {
    return "바이오 산업은 연구개발 성과, 임상 진행 상황, 규제 승인 여부에 따라 기업 가치가 크게 변동할 수 있는 특징이 있습니다.";
  }

  if (value.includes("oil") || value.includes("gas") || value.includes("energy")) {
    return "에너지 산업은 원자재 가격, 생산 비용, 글로벌 경기 흐름과 지정학적 변수에 민감하게 반응하는 경향이 있습니다.";
  }

  if (value.includes("industrial") || value.includes("machinery")) {
    return "산업재 관련 업종은 경기 민감도가 높고 설비 투자, 수주 흐름, 원가 관리 능력이 실적에 중요한 영향을 줍니다.";
  }

  if (value.includes("retail") || value.includes("apparel") || value.includes("specialty")) {
    return "소비재 및 유통 산업은 경기와 소비 심리의 영향을 받으며 브랜드 경쟁력과 판매 효율성이 핵심 포인트가 됩니다.";
  }

  if (value.includes("telecom") || value.includes("communication")) {
    return "통신 및 커뮤니케이션 산업은 가입자 기반, 네트워크 투자, 서비스 확장성, 안정적인 현금흐름이 중요한 평가 요소입니다.";
  }

  return "이 산업은 시장 점유율, 수요 흐름, 경쟁 강도, 수익성 유지 능력에 따라 기업 가치가 달라질 수 있습니다.";
}

function getSectorFocus(sector?: string | null, industry?: string | null) {
  const s = (sector || "").toLowerCase();
  const i = (industry || "").toLowerCase();

  if (i.includes("semiconductor")) {
    return "투자 관점에서는 AI 수요, 데이터센터 투자, 고객사 확대 여부를 함께 살펴보는 것이 중요합니다.";
  }

  if (i.includes("software")) {
    return "투자 관점에서는 매출 성장률, 영업이익률, 구독형 매출 비중과 같은 질적 요소를 함께 보는 것이 좋습니다.";
  }

  if (i.includes("internet") || i.includes("content")) {
    return "투자 관점에서는 광고 수익성, 사용자 기반 확대, 플랫폼 체류 시간, 신규 서비스 확장성을 함께 확인할 필요가 있습니다.";
  }

  if (i.includes("consumer electronics")) {
    return "투자 관점에서는 제품 판매량, 생태계 확장성, 서비스 매출 비중, 브랜드 충성도를 함께 확인하는 것이 중요합니다.";
  }

  if (s.includes("financial")) {
    return "투자 관점에서는 금리 환경, 자산 건전성, 대손 비용, 자본 효율성을 함께 체크하는 것이 중요합니다.";
  }

  if (s.includes("technology")) {
    return "투자 관점에서는 매출 성장성과 수익성, 밸류에이션 부담, 기술 경쟁 우위를 함께 보는 것이 좋습니다.";
  }

  if (s.includes("healthcare")) {
    return "투자 관점에서는 연구개발 성과, 제품 상용화 가능성, 규제 리스크를 함께 고려할 필요가 있습니다.";
  }

  return "투자 관점에서는 매출 성장률, 수익성 지표, 밸류에이션 수준을 함께 확인하는 것이 중요합니다.";
}

export function buildCompanySummary(input: SummaryInput): string[] {
  const companyName = input.companyName || "이 기업";
  const exchangeName = formatExchangeName(input.exchange, input.exchangeShortName);
  const sector = input.sector || "주요 산업";
  const industry = input.industry || "일반 기업";
  const marketCapText = formatMarketCap(input.marketCap);
  const priceText = formatPrice(input.currentPrice);

  const firstLineParts = [`${companyName}은(는) ${exchangeName}에 상장된 ${industry} 기업입니다.`];

  const secondLineParts = [`현재 분류상 ${sector} 섹터에 속해 있으며,`];
  if (marketCapText && priceText) {
    secondLineParts.push(`시가총액은 약 ${marketCapText}, 주가는 ${priceText} 수준입니다.`);
  } else if (marketCapText) {
    secondLineParts.push(`시가총액은 약 ${marketCapText} 수준입니다.`);
  } else if (priceText) {
    secondLineParts.push(`현재 주가는 ${priceText} 수준입니다.`);
  } else {
    secondLineParts.push(`미국 기업분석 관점에서 기본 사업 구조를 먼저 이해할 필요가 있습니다.`);
  }

  return [
    firstLineParts.join(" "),
    secondLineParts.join(" "),
    getIndustryDescription(industry),
    getSectorFocus(sector, industry),
  ];
}