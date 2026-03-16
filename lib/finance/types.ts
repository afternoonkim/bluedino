export type FinanceCategoryKey =
  | "isa"
  | "irp"
  | "pension"
  | "cma"
  | "parking"
  | "loan-basics"
  | "credit-loan"
  | "mortgage-loan";

export type FinanceCategory = {
  key: FinanceCategoryKey;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  badge: string;
  status: "live" | "coming-soon";
  basePath: string;
};

export type FinanceSection = {
  title: string;
  body: string[];
};

export type FinanceFaqItem = {
  question: string;
  answer: string;
};

export type FinanceLinkItem = {
  href: string;
  label: string;
};

export type FinanceQuestionItem = {
  question: string;
  slug: string;
  summary?: string;
  quickAnswer?: string;
  sections?: FinanceSection[];
  checklist?: string[];
  relatedCalculatorLinks?: FinanceLinkItem[];
  faq?: FinanceFaqItem[];
  keywords?: string[];
  caution?: string;
  relatedSlugs?: string[];
  answer?: string[];
  searchPriority?: number;
};

export type FinanceQuestionEntry = {
  category: FinanceCategoryKey;
  title: string;
  description: string;
  summary: string;
  quickAnswer: string;
  sections: FinanceSection[];
  checklist: string[];
  relatedCalculatorLinks: FinanceLinkItem[];
  faq: FinanceFaqItem[];
  keywords: string[];
  caution: string;
} & FinanceQuestionItem;
