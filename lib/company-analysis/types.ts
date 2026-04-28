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
