import VideosClient from "./VideosClient";

export const metadata = {
  title: "경제 영상 모아보기 | BlueDino",
  description:
    "주요 경제 유튜브 채널의 최신 영상을 채널별로 모아보는 BlueDino 영상 허브 페이지",
};

export default function VideosPage() {
  return <VideosClient />;
}