import { calculatorLandingData } from "@/app/cal/components/calculatorLandingData";
import { financeCategories } from "@/lib/finance/config";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { getFinanceEntry } from "@/lib/finance/content";
import type { FinanceCategoryKey } from "@/lib/finance/types";
import { guideArticles } from "@/lib/info/guideArticles";
import { strategyArticles } from "@/lib/info/strategyArticles";
import { industryHubs } from "@/lib/industry/config";
import {
  companyAnalysisMarkets,
  getCompanyArticle,
  getSitemapCompanyAnalysisRoutes,
} from "@/lib/company-analysis/data";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";
const DEFAULT_UPDATED_AT = "2026-05-17";
const FEED_TITLE = "BlueDino 금융 계산기와 투자 가이드";
const FEED_DESCRIPTION =
  "배당·복리·대출·연금 계산기, 절세계좌 가이드, ETF 투자전략, 산업·기업분석을 실제 금융 결정을 앞두고 필요한 기준을 정리한 BlueDino 최신 콘텐츠입니다.";

export type RssFeedItem = {
  title: string;
  description: string;
  path: string;
  updatedAt?: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function escapeXml(value: string) {
  return stripHtml(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(path: string) {
  const normalizedBaseUrl = SITE_URL.replace(/\/$/, "");
  return `${normalizedBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function toRssDate(value?: string) {
  const date = new Date(value ?? DEFAULT_UPDATED_AT);
  if (Number.isNaN(date.getTime())) {
    return new Date(DEFAULT_UPDATED_AT).toUTCString();
  }
  return date.toUTCString();
}

function buildStaticFeedItems(): RssFeedItem[] {
  return [
    {
      title: "BlueDino 금융 계산기와 투자 가이드",
      description:
        "배당 계산기, 복리 계산기, 대출이자 계산기, DSR 계산기, LTV 계산기와 ISA·IRP·연금저축·ETF 투자 가이드를 계산기와 가이드로 함께 살펴볼 수 있습니다.",
      path: "/",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "금융 계산기 모음 | 배당·복리·대출·연금 계산",
      description:
        "투자와 대출, 연금 계획에 자주 필요한 계산기를 목적별로 모아 사용 흐름과 함께 정리했습니다.",
      path: "/cal",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "금융 질문 가이드 | ISA·IRP·연금저축·대출 기초 정리",
      description:
        "처음 금융상품을 비교할 때 헷갈리는 조건, 세금, 한도, 상환 구조를 질문별로 차근차근 살펴볼 수 있습니다.",
      path: "/finance",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "투자 기초 가이드 | ETF·배당·복리·포트폴리오 이해",
      description:
        "주식과 ETF 투자를 시작하기 전 알아두면 좋은 기본 개념을 사용자 상황 중심으로 정리했습니다.",
      path: "/info/guide",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "투자전략 가이드 | 자산배분·배당·하락장 대응",
      description:
        "투자 목적과 기간에 따라 참고할 수 있는 자산배분, 배당, 은퇴, 하락장 전략을 정리했습니다.",
      path: "/info/strategy",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "기업분석 모음 | 국내기업·해외기업 투자 체크포인트",
      description:
        "국내외 주요 기업의 사업 구조, 실적 변수, 리스크와 투자 체크포인트를 한눈에 비교할 수 있습니다.",
      path: "/company-analysis",
      updatedAt: DEFAULT_UPDATED_AT,
    },
    {
      title: "산업·테마 가이드 | 반도체·2차전지·AI 관련주 비교",
      description:
        "주요 산업과 테마를 사업 구조, 핵심 변수, 관련 기업분석으로 연결해 이해할 수 있게 정리했습니다.",
      path: "/industry",
      updatedAt: DEFAULT_UPDATED_AT,
    },
  ];
}

function buildCalculatorFeedItems(): RssFeedItem[] {
  return Object.values(calculatorLandingData).map((calculator) => ({
    title: `${calculator.title} | 사용법과 결과 해석`,
    description: calculator.description || calculator.intro,
    path: `/cal/${calculator.slug}`,
    updatedAt: DEFAULT_UPDATED_AT,
  }));
}

function buildFinanceFeedItems(): RssFeedItem[] {
  const categoryItems = financeCategories.map((category) => ({
    title: `${category.shortTitle} 가이드 | 핵심 질문과 활용 기준`,
    description: category.description,
    path: category.basePath,
    updatedAt: DEFAULT_UPDATED_AT,
  }));

  const questionItems = getAllFinanceRoutes().map(({ category, slug }) => {
    const entry = getFinanceEntry(category as FinanceCategoryKey, slug);
    return {
      title: entry?.title ?? `${category} 금융 질문`,
      description:
        entry?.description ??
        entry?.summary ??
        "금융상품을 선택하기 전에 확인해야 할 조건, 비용, 세금, 현금흐름을 사용자 기준으로 정리했습니다.",
      path: `/finance/${category}/${slug}`,
      updatedAt: DEFAULT_UPDATED_AT,
    };
  });

  return [...categoryItems, ...questionItems];
}

function getContentUpdatedAt(article: unknown) {
  if (!article || typeof article !== "object") return DEFAULT_UPDATED_AT;
  const record = article as Record<string, unknown>;
  const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : undefined;
  const publishedAt = typeof record.publishedAt === "string" ? record.publishedAt : undefined;
  return updatedAt ?? publishedAt ?? DEFAULT_UPDATED_AT;
}

function buildGuideFeedItems(): RssFeedItem[] {
  return Object.values(guideArticles).map((article) => ({
    title: article.title,
    description: article.description,
    path: `/info/guide/${article.slug}`,
    updatedAt: getContentUpdatedAt(article),
  }));
}

function buildStrategyFeedItems(): RssFeedItem[] {
  return Object.values(strategyArticles).map((article) => ({
    title: article.title,
    description: article.description,
    path: `/info/strategy/${article.slug}`,
    updatedAt: getContentUpdatedAt(article),
  }));
}

function buildIndustryFeedItems(): RssFeedItem[] {
  return industryHubs.map((hub) => ({
    title: hub.title,
    description: hub.description,
    path: `/industry/${hub.slug}`,
    updatedAt: DEFAULT_UPDATED_AT,
  }));
}

function buildCompanyFeedItems(): RssFeedItem[] {
  const marketItems = companyAnalysisMarkets.map((market) => ({
    title: `${market.shortTitle} 분석 | 기업별 사업 구조와 투자 체크포인트`,
    description: market.description,
    path: market.basePath,
    updatedAt: DEFAULT_UPDATED_AT,
  }));

  const companyItems = getSitemapCompanyAnalysisRoutes()
    .map(({ market, slug }) => getCompanyArticle(market as CompanyAnalysisMarket, slug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .map((article) => ({
      title: article.seoTitle,
      description: article.metaDescription,
      path: `/company-analysis/${article.market}/${article.slug}`,
      updatedAt: article.updatedAt ?? article.publishedAt ?? DEFAULT_UPDATED_AT,
    }));

  return [...marketItems, ...companyItems];
}

export function getRssFeedItems(): RssFeedItem[] {
  const items = [
    ...buildStaticFeedItems(),
    ...buildCalculatorFeedItems(),
    ...buildFinanceFeedItems(),
    ...buildGuideFeedItems(),
    ...buildStrategyFeedItems(),
    ...buildIndustryFeedItems(),
    ...buildCompanyFeedItems(),
  ];

  const uniqueItems = Array.from(new Map(items.map((item) => [item.path, item])).values());

  return uniqueItems.sort((a, b) => {
    const aTime = new Date(a.updatedAt ?? DEFAULT_UPDATED_AT).getTime();
    const bTime = new Date(b.updatedAt ?? DEFAULT_UPDATED_AT).getTime();
    return bTime - aTime;
  });
}

export function buildRssXml() {
  const items = getRssFeedItems();
  const latestUpdatedAt = items[0]?.updatedAt ?? DEFAULT_UPDATED_AT;
  const selfUrl = toAbsoluteUrl("/rss.xml");

  const itemXml = items
    .map((item) => {
      const url = toAbsoluteUrl(item.path);
      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${toRssDate(item.updatedAt)}</pubDate>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${toRssDate(latestUpdatedAt)}</lastBuildDate>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />${itemXml}
  </channel>
</rss>`;
}
