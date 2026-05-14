import type { MetadataRoute } from "next";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { financeCategories } from "@/lib/finance/config";
import { guideArticles } from "@/lib/info/guideArticles";
import { strategyArticles } from "@/lib/info/strategyArticles";
import {
  companyAnalysisMarkets,
  getCompanyAnalysisRoutes,
  getCompanyArticle,
} from "@/lib/company-analysis/data";
import { COMPANY_CUSTOM_NOTES } from "@/lib/company-analysis/companyVariations";
import { industryHubs } from "@/lib/industry/config";
import { getCompanyIndices } from "@/lib/company-analysis/companyMetadata";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

const staticRoutes = [
  "/",
  "/finance",
  "/info",
  "/company-analysis",
  "/stocks",
  "/etf/compare",
  "/etf/dividend-calendar",
  "/etf/ranking",
  "/cal/calculator",
  "/cal/capital-gains",
  "/cal/compound",
  "/cal/fire",
  "/cal/retirement-tax",
  "/cal/salary-net",
  "/cal/dsr",
  "/cal/ltv",
  "/cal/loan-interest",
  "/cal/mortgage",
  "/cal/pension-tax-credit",
  "/cal/irp-tax-credit",
  "/cal/isa-tax-savings",
  "/cal/jeonse-loan-interest",
  "/cal/jeonse-vs-monthly",
  // "/info/blog" — 별도 noindex 설정을 적용하는 보조 콘텐츠 페이지
  "/info/guide",
  "/info/investment/account-tax",
  "/info/investment/account-tax-step",
  "/info/strategy",
  "/info/strategy/age-based-investing",
  "/info/strategy/new-parent-investing",
  "/info/strategy/family-with-children-investing",
  "/info/strategy/asset-allocation",
  "/info/strategy/dividend",
  "/info/strategy/etf-core-satellite",
  "/info/strategy/market-downturn",
  "/info/strategy/retirement-income",
  "/info/etc/about",
  "/info/etc/contact",
  "/info/etc/privacy",
  "/info/etc/terms",
  "/info/etc/editorial-policy",
  "/info/etc/methodology",
  "/info/strategy/tax-efficient-investing",
  "/industry",
  // "/info/videos" — 별도 noindex 설정을 적용하는 보조 영상 페이지
];

const guideRoutes = Object.keys(guideArticles).map((slug) => `/info/guide/${slug}`);
const strategyRoutes = Object.keys(strategyArticles).map((slug) => `/info/strategy/${slug}`);
const companyMarketRoutes = companyAnalysisMarkets.map((market) => market.basePath);
const industryRoutes = industryHubs.map((hub) => `/industry/${hub.slug}`);
/**
 * 기업분석 상세 페이지는 주요 콘텐츠 중심으로 사이트맵 범위를 구성합니다.
 *  - customNote(수기 단락)가 있는 종목
 *  - 주요 지수(KOSPI200/KOSDAQ150/S&P500/NASDAQ100/DJIA) 편입 종목
 *
 * 그 외 기업분석 페이지도 라우트는 유지되어 사이트 내부 검색과 관련 종목 링크에서 접근할 수 있습니다.
 */
const companyDetailRoutes = getCompanyAnalysisRoutes()
  .filter(({ market, slug }) => {
    const article = getCompanyArticle(market, slug);
    if (!article) return false;
    const tickerUpper = article.ticker.toUpperCase();
    if (COMPANY_CUSTOM_NOTES[tickerUpper]) return true;
    if (getCompanyIndices(article.ticker).length > 0) return true;
    return false;
  })
  .map(({ market, slug }) => `/company-analysis/${market}/${slug}`);

function parseDate(value: string | undefined, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function getArticleLastModified(article: unknown, fallback: Date): Date {
  if (!article || typeof article !== "object") return fallback;

  const articleRecord = article as Record<string, unknown>;
  const updatedAt = typeof articleRecord.updatedAt === "string" ? articleRecord.updatedAt : undefined;
  const publishedAt = typeof articleRecord.publishedAt === "string" ? articleRecord.publishedAt : undefined;

  return parseDate(updatedAt ?? publishedAt, fallback);
}

function resolveLastModified(route: string, fallback: Date): Date {
  if (route.startsWith("/info/guide/")) {
    const slug = route.slice("/info/guide/".length);
    const article = guideArticles[slug];
    if (article) {
      return getArticleLastModified(article, fallback);
    }
  }

  if (route.startsWith("/info/strategy/")) {
    const slug = route.slice("/info/strategy/".length);
    const article = strategyArticles[slug];
    if (article) {
      return getArticleLastModified(article, fallback);
    }
  }

  if (route.startsWith("/company-analysis/")) {
    const [, , market, slug] = route.split("/");
    if (market && slug && market !== "korea" && market !== "global") {
      return fallback;
    }
    if (market && slug) {
      const article = getCompanyArticle(market as CompanyAnalysisMarket, slug);
      if (article) {
        return parseDate(article.updatedAt ?? article.publishedAt, fallback);
      }
    }
  }

  return fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryRoutes = financeCategories.map((category) => category.basePath);
  const financeRoutes = getAllFinanceRoutes().map(({ category, slug }) => `/finance/${category}/${slug}`);

  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...guideRoutes,
      ...strategyRoutes,
      ...categoryRoutes,
      ...financeRoutes,
      ...companyMarketRoutes,
      ...companyDetailRoutes,
      ...industryRoutes,
    ]),
  );

  /**
   * 주요 콘텐츠와 일반 콘텐츠의 중요도에 따라 사이트맵 priority를 구분합니다.
   * - 1.0  : 메인 페이지
   * - 0.9  : 주요 가이드/전략/금융/계산기 페이지
   * - 0.8  : 기업분석 중 customNote(수기 단락)가 있는 종목
   * - 0.7  : 기업분석 중 KOSPI200/S&P500 등 주요 지수 편입 종목
   * - 0.5  : 기본 기업분석 페이지
   * - 0.4  : 기타 정적 페이지
   */
  function computePriorityForRoute(route: string): number {
    if (route === "/") return 1;
    if (
      route.startsWith("/info/guide/") ||
      route.startsWith("/info/strategy/") ||
      route.startsWith("/info/investment/") ||
      route.startsWith("/industry")
    ) {
      return 0.9;
    }
    if (route === "/finance" || route.startsWith("/cal/")) return 0.9;
    if (route.startsWith("/finance/")) return 0.85;

    if (route.startsWith("/company-analysis")) {
      // 기업분석 상세 페이지의 중요도를 종목별 메타데이터로 구분
      if (
        route === "/company-analysis" ||
        route === "/company-analysis/korea" ||
        route === "/company-analysis/global"
      ) {
        return 0.85;
      }
      const parts = route.split("/");
      const market = parts[2] as "korea" | "global" | undefined;
      const slug = parts[3];
      if (market && slug) {
        const article = getCompanyArticle(market, slug);
        if (article) {
          // customNote가 있으면 높은 중요도로 설정
          const ticker = article.ticker.toUpperCase();
          if (COMPANY_CUSTOM_NOTES[ticker]) return 0.8;
          // 주요 지수 편입 종목은 중간 중요도로 설정
          const indices = getCompanyIndices(article.ticker);
          if (indices.length > 0) return 0.7;
          // 그 외 기본 페이지는 낮은 중요도로 설정
          return 0.5;
        }
      }
      return 0.6;
    }

    return 0.6;
  }

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: resolveLastModified(route, now),
    changeFrequency:
      route === "/"
        ? "weekly"
        : route.startsWith("/finance/") || route.startsWith("/cal/") || route.startsWith("/company-analysis")
        ? "weekly"
        : "monthly",
    priority: computePriorityForRoute(route),
  }));
}
