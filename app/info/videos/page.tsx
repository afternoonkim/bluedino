import type { Metadata } from "next";
import VideosClient from "./VideosClient";

export const metadata: Metadata = {
  title: "경제 영상 모아보기 | BlueDino",
  description:
    "주요 경제 유튜브 채널의 최신 영상을 채널별로 모아보는 BlueDino 영상 허브 페이지",
  // 외부 YouTube 영상 집계 페이지라 원본 콘텐츠 정책상 색인 제외
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function VideosPage() {
  return <VideosClient />;
}
