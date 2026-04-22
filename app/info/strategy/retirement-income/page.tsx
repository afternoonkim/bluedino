import type { Metadata } from "next";
import StrategyArticlePage from "@/components/info/StrategyArticlePage";
import { strategyArticles } from "@/lib/info/strategyArticles";

const article = strategyArticles["retirement-income"];
const canonicalPath = "/info/strategy/retirement-income";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = `${article.title} | BlueDino`;

export const metadata: Metadata = {
  title: pageTitle,
  description: article.description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: pageTitle,
    description: article.description,
    url: pageUrl,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: article.description,
  },
};

export default function Page() {
  return <StrategyArticlePage article={article} />;
}
