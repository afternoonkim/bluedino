import type { MetadataRoute } from "next";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { financeCategories } from "@/lib/finance/config";
import { guideArticles } from "@/lib/info/guideArticles";
import {
  companyAnalysisMarkets,
  getCompanyAnalysisRoutes,
  getCompanyArticle,
} from "@/lib/company-analysis/data";
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
  "/info/etc/about",
  "/info/etc/contact",
  "/info/etc/privacy",
  "/info/etc/terms",
  "/info/etc/methodology",
  "/info/etc/editorial-policy",
  "/info/guide",
  "/info/investment/account-tax",
  "/info/investment/account-tax-step",
  "/info/strategy",
  "/info/strategy/asset-allocation",
  "/info/strategy/dividend",
  "/info/strategy/etf-core-satellite",
  "/info/strategy/market-downturn",
  "/info/strategy/retirement-income",
  "/info/strategy/tax-efficient-investing",
  // "/info/videos" — 외부 YouTube 영상 집계 페이지라 색인 제외 (noindex)
];

const guideRoutes = Object.keys(guideArticles).map((slug) => `/info/guide/${slug}`);
const companyMarketRoutes = companyAnalysisMarkets.map((market) => market.basePath);
const companyDetailRoutes = getCompanyAnalysisRoutes().map(
  ({ market, slug }) => `/company-analysis/${market}/${slug}`,
);

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
    ]),
  );

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: resolveLastModified(route, now),
    changeFrequency:
      route === "/" ? "weekly" : route.startsWith("/finance/") || route.startsWith("/cal/") || route.startsWith("/company-analysis") ? "weekly" : "monthly",
    priority:
      route === "/" ? 1 :
      route === "/finance" || route.startsWith("/finance/") || route.startsWith("/cal/") || route.startsWith("/company-analysis") ? 0.9 : 0.8,
  }));
}
