import type { MetadataRoute } from "next";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { financeCategories } from "@/lib/finance/config";
import { guideArticles } from "@/lib/info/guideArticles";
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
  "/company-analysis",
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
  // "/info/blog" — 외부 네이버 RSS 집계 페이지라 색인 제외 (noindex)
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
  "/info/strategy/tax-efficient-investing",
  "/industry",
  // "/info/videos" — 외부 YouTube 영상 집계 페이지라 색인 제외 (noindex)
];

const guideRoutes = Object.keys(guideArticles).map((slug) => `/info/guide/${slug}`);
const companyMarketRoutes = companyAnalysisMarkets.map((market) => market.basePath);
const industryRoutes = industryHubs.map((hub) => `/industry/${hub.slug}`);
/**
 * 사이트맵 색인 가치가 있는 기업분석 종목만 선별:
 *  - customNote(수기 단락)가 있는 종목 (검색 수요·고품질 콘텐츠)
 *  - 주요 지수(KOSPI200/KOSDAQ150/S&P500/NASDAQ100/DJIA) 편입 종목 (인지도·검색량)
 * 둘 다 해당 안 되는 1,000여 개 저품질 페이지는 사이트맵에서 제외해
 * 검색엔진 크롤 예산을 색인 가치 있는 페이지에 집중시킨다.
 *
 * 페이지 자체는 라우트로 살아 있어 사이트 내부 링크(검색·관련 종목)에서 접근 가능.
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

function resolveLastModified(route: string, fallback: Date): Date {
  if (route.startsWith("/info/guide/")) {
    const slug = route.slice("/info/guide/".length);
    const article = guideArticles[slug];
    if (article) {
      return parseDate(article.updatedAt ?? article.publishedAt, fallback);
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
      ...categoryRoutes,
      ...financeRoutes,
      ...companyMarketRoutes,
      ...companyDetailRoutes,
      ...industryRoutes,
    ]),
  );

  /**
   * 사이트맵 priority 차등화 — 검색엔진 크롤 예산을 효율적으로 분배하기 위함.
   * - 1.0  : 메인 페이지
   * - 0.9  : 직접 작성한 가이드/전략/금융/계산기 (가장 우선 색인)
   * - 0.8  : 기업분석 중 customNote(수기 단락)가 있는 종목
   * - 0.7  : 기업분석 중 KOSPI200/S&P500 등 주요 지수 편입 종목
   * - 0.5  : 기타 자동 생성 기업분석 페이지
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
      // 기업분석 상세 페이지의 우선순위를 종목별 메타데이터로 차등화
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
          // customNote가 있으면 가장 높은 우선순위
          const ticker = article.ticker.toUpperCase();
          if (COMPANY_CUSTOM_NOTES[ticker]) return 0.8;
          // 주요 지수 편입 종목은 중간 우선순위
          const indices = getCompanyIndices(article.ticker);
          if (indices.length > 0) return 0.7;
          // 그 외 자동 생성 페이지는 후순위
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
