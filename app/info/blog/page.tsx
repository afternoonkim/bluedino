import type { Metadata } from "next";
import BlogFeedClient from "./BlogFeedClient";

export const metadata: Metadata = {
  title: "자기남블로그 최신글",
  description:
    "자기남블로그 최신 게시글을 카드형으로 모아보는 BlueDino 블로그 허브 페이지",
  // 외부 RSS 집계 페이지라 원본 콘텐츠 정책상 색인 제외
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BlogPage() {
  return <BlogFeedClient />;
}
