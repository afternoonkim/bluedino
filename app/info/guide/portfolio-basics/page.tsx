import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "포트폴리오 기초",
  description: "분산 투자와 자산배분의 기본을 쉽게 정리한 BlueDino 가이드",
};

export default function PortfolioBasicsPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Portfolio Basics</span>
          <h1 className="bd-title-lg mt-4">포트폴리오 기초</h1>
          <p className="bd-text-main mt-4">
            포트폴리오는 단순히 종목을 여러 개 담는 것이 아니라, 내 자산을 어떤 기준으로 배분할지 정하는 구조입니다.
            투자 성향과 투자 기간, 손실 허용 범위를 함께 고려해야 오래 유지할 수 있습니다.
          </p>
        </section>

        <AdBlock label="포트폴리오 가이드 광고 영역" />

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">왜 분산 투자가 중요한가</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">한 자산의 급락이 전체 자산에 미치는 충격을 줄일 수 있습니다.</div>
              <div className="bd-list-item">시장 상황이 바뀌어도 대응력이 더 높아질 수 있습니다.</div>
              <div className="bd-list-item">심리적으로도 버티기 쉬운 구조를 만들 수 있습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">기본 체크 기준</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">주식 비중과 현금성 자산 비중을 어느 정도로 가져갈지 결정합니다.</div>
              <div className="bd-list-item">국내와 해외, 성장과 배당, 공격형과 안정형의 균형을 고민합니다.</div>
              <div className="bd-list-item">정기적으로 점검하고 리밸런싱할 기준을 정해두면 좋습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">같이 보면 좋은 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/risk-management" className="bd-button-primary">리스크 관리 기초</Link>
            <Link href="/info/guide/etf-basics" className="bd-button-secondary">ETF 투자 기초</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
