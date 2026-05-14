import type { Metadata } from "next";
import VideosClient from "./VideosClient";

export const metadata: Metadata = {
  title: "경제 영상 모아보기 | BlueDino",
  description: "주요 경제 유튜브 채널의 최신 영상을 채널별로 모아보는 BlueDino 영상 허브 페이지입니다.",
  openGraph: {
    title: "경제 영상 모아보기 | BlueDino",
    description: "주요 경제 유튜브 채널의 최신 영상을 채널별로 모아보는 BlueDino 영상 허브 페이지입니다.",
    url: "https://bluedino.kr/info/videos",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "경제 영상 모아보기 | BlueDino",
    description: "주요 경제 유튜브 채널의 최신 영상을 채널별로 모아보는 BlueDino 영상 허브 페이지입니다.",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function VideosPage() {
  return <VideosClient />;
}
