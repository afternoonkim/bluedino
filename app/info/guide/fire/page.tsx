import type { Metadata } from "next";
import GuideArticlePage from "@/components/info/GuideArticlePage";
import { guideArticles } from "@/lib/info/guideArticles";

const article = guideArticles["fire"];

export const metadata: Metadata = {
  title: `${article.title} | BlueDino`,
  description: article.description,
};

export default function Page() {
  return <GuideArticlePage article={article} />;
}
