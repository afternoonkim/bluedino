import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "초보자가 포트폴리오를 만들 때 흔한 실수",
  description: "초보 투자자가 포트폴리오를 구성할 때 자주 하는 실수를 정리한 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">포트폴리오 실수</span>
          <h1 className="bd-title-lg mt-4">초보자가 포트폴리오를 만들 때 흔한 실수</h1>
          <p className="bd-text-main mt-4">
            포트폴리오는 종목을 많이 담는다고 완성되지 않습니다. 중요한 것은 각 자산이 왜 들어가 있는지, 서로 어떤 역할을 하는지, 전체 목표와 맞는지입니다. 초보자는 좋은 자산을 모으는 데 집중하지만, 실제로는 구조를 짜는 것이 더 중요합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자주 하는 대표 실수</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">유명한 종목과 ETF를 이것저것 담았지만 전체적으로는 비슷한 자산에 과도하게 노출되는 경우가 많습니다.</p>
            <p className="bd-text-main">또한 배당용, 성장용, 단기 매매용 자산을 한 계좌 안에서 목적 없이 섞으면 성과 평가도 어려워지고 감정적인 매매가 늘어나기 쉽습니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">실수를 줄이려면</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">각 자산의 역할을 한 줄로 설명할 수 있어야 함</div>
            <div className="bd-list-item">비중 기준과 리밸런싱 기준을 미리 정해두기</div>
            <div className="bd-list-item">계좌별 목적을 나눠 관리하기</div>
            <div className="bd-list-item">내 리스크 허용 범위에 맞는 자산만 담기</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">포트폴리오는 분산투자와 장기투자, 절세계좌 전략과 함께 설계해야 실전에서 흔들리지 않습니다. 포트폴리오 기초 페이지와 함께 보는 것을 추천합니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/diversification" className="bd-button-secondary">
              분산투자가 왜 중요한가
            </Link>
            <Link href="/info/guide/long-vs-short-term" className="bd-button-secondary">
              장기투자와 단기투자 차이
            </Link>
            <Link href="/info/guide/portfolio-basics" className="bd-button-secondary">
              포트폴리오 기초
            </Link>
            <Link href="/info/guide" className="bd-button-primary">
              투자 기초 가이드 목록
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
