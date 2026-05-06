export type CompanyAnalysisMarket = "korea" | "global";

export type CompanyAnalysisStatus = "published" | "draft";

export type CompanyAnalysisSection = {
  title: string;
  body: string[];
};

export type CompanyAnalysisFaq = {
  question: string;
  answer: string;
};

export type CompanyAnalysisLink = {
  label: string;
  href: string;
};

export type CompanyAnalysisArticle = {
  status: CompanyAnalysisStatus;
  market: CompanyAnalysisMarket;
  slug: string;
  ticker: string;
  exchange: string;
  companyNameKo: string;
  companyNameEn: string;
  sector: string;
  /** 세부 sub-sector 분류 라벨 (예: "메모리·HBM 반도체") */
  subSector: string;
  /** 지수 편입 정보 (KOSPI200 등) */
  indices: string[];
  /** 종목 분류 태그 키 (성장주/배당주/AI 테마 등) */
  classifications: string[];
  /** 종목 분류 태그 사람이 읽는 라벨 */
  classificationLabels: string[];
  badge: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string;
  quickConclusion: string;
  investorNote: string;
  publishedAt: string;
  updatedAt: string;
  sections: CompanyAnalysisSection[];
  checkpoints: string[];
  risks: string[];
  relatedLinks: CompanyAnalysisLink[];
  faq: CompanyAnalysisFaq[];
  tags: string[];
};

export type CompanyAnalysisMarketConfig = {
  key: CompanyAnalysisMarket;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  badge: string;
  basePath: string;
};
