import { financeCategories } from "@/lib/finance/config";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

const staticRoutes = [
  "",
  "/finance",
  "/cal/calculator",
  "/cal/capital-gains",
  "/cal/compound",
  "/cal/fire",
  "/cal/retirement-tax",
  "/cal/salary-net",
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
] as const;

function getPriority(route: string) {
  if (route === "") return 1;
  if (route === "/finance") return 0.95;
  if (route.startsWith("/finance/")) return route.split("/").length >= 4 ? 0.9 : 0.92;
  if (route.startsWith("/cal/")) return 0.9;
  if (route === "/info/guide" || route === "/info/strategy") return 0.88;
  return 0.8;
}

function getChangeFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "") return "weekly";
  if (route.startsWith("/finance/")) return "weekly";
  if (route.startsWith("/cal/")) return "monthly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const financeHubRoutes = financeCategories.map((category) => category.basePath);
  const financeDetailRoutes = getAllFinanceRoutes().map(
    ({ category, slug }) => `/finance/${category}/${slug}`,
  );

  const allRoutes = Array.from(
    new Set([...staticRoutes, ...financeHubRoutes, ...financeDetailRoutes]),
  );

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));
}
