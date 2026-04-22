import type { Metadata } from "next";
import GuideArticlePage from "@/components/info/GuideArticlePage";
import { guideArticles } from "@/lib/info/guideArticles";

const article = guideArticles["stock-basics"];
const canonicalPath = "/info/guide/stock-basics";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = `${article.title} | BlueDino`;

export const metadata: Metadata = {
  title: pageTitle,
  description: article.description,
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: pageTitle,
    description: article.description,
    url: pageUrl,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: article.description,
  },
};

export default function Page() {
  return <GuideArticlePage article={article} />;
}
