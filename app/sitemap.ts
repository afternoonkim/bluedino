import type { MetadataRoute } from "next";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { financeCategories } from "@/lib/finance/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

const staticRoutes = [
  "/",
  "/finance",
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
  "/info/blog",
  "/info/etc/about",
  "/info/etc/contact",
  "/info/etc/privacy",
  "/info/etc/terms",
  "/info/guide",
  "/info/guide/cashflow-vs-capital-gains",
  "/info/guide/compound-interest",
  "/info/guide/diversification",
  "/info/guide/dividend",
  "/info/guide/dividend-basics",
  "/info/guide/dividend-growth",
  "/info/guide/etf-basics",
  "/info/guide/etf-vs-stocks",
  "/info/guide/fire",
  "/info/guide/fire-calculator-guide",
  "/info/guide/high-dividend-risks",
  "/info/guide/isa-basics",
  "/info/guide/isa-benefits",
  "/info/guide/long-vs-short-term",
  "/info/guide/loss-tax",
  "/info/guide/monthly-dividend-etf-checklist",
  "/info/guide/pension",
  "/info/guide/pension-vs-irp",
  "/info/guide/portfolio-basics",
  "/info/guide/portfolio-mistakes",
  "/info/guide/risk-management",
  "/info/guide/stock-basics",
  "/info/guide/tax",
  "/info/guide/us-stock-tax-basics",
  "/info/guide/why-tax-advantaged-accounts",
  "/info/investment/account-tax",
  "/info/investment/account-tax-step",
  "/info/strategy",
  "/info/strategy/asset-allocation",
  "/info/strategy/dividend",
  "/info/strategy/etf-core-satellite",
  "/info/strategy/market-downturn",
  "/info/strategy/retirement-income",
  "/info/strategy/tax-efficient-investing",
  "/info/videos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryRoutes = financeCategories.map((category) => category.basePath);
  const financeRoutes = getAllFinanceRoutes().map(({ category, slug }) => `/finance/${category}/${slug}`);

  const allRoutes = Array.from(new Set([...staticRoutes, ...categoryRoutes, ...financeRoutes]));

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency:
      route === "/" ? "weekly" : route.startsWith("/finance/") || route.startsWith("/cal/") ? "weekly" : "monthly",
    priority:
      route === "/" ? 1 :
      route === "/finance" || route.startsWith("/finance/") || route.startsWith("/cal/") ? 0.9 : 0.8,
  }));
}
