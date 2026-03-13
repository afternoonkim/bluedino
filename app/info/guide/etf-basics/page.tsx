import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "ETF 투자 기초",
  description: "ETF의 구조와 장점, 체크 포인트를 쉽게 정리한 BlueDino 가이드",
};

export default function EtfBasicsPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">ETF Basics</span>
          <h1 className="bd-title-lg mt-4">ETF 투자 기초</h1>
          <p className="bd-text-main mt-4">
            ETF는 여러 종목을 한 바구니처럼 묶어서 거래할 수 있게 만든 상품입니다.
            한 종목에 집중 투자하는 방식보다 분산 효과를 기대할 수 있어 투자 입문자가 많이 접근하는 방식입니다.
          </p>
        </section>

        <AdBlock label="ETF 가이드 광고 영역" />

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">ETF의 장점</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">한 번에 여러 종목에 분산 투자할 수 있습니다.</div>
              <div className="bd-list-item">개별 종목보다 비교적 구조가 단순한 상품이 많습니다.</div>
              <div className="bd-list-item">주식처럼 장중에 사고팔 수 있어 접근성이 좋습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">확인할 포인트</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">무엇을 추종하는 ETF인지 먼저 확인해야 합니다.</div>
              <div className="bd-list-item">보수, 거래량, 괴리율, 환헤지 여부도 함께 보는 것이 좋습니다.</div>
              <div className="bd-list-item">이름이 비슷해도 실제 편입 종목 구성이 다를 수 있습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이런 분에게 유용합니다</h2>
          <p className="bd-text-sub mt-4">
            개별 종목 분석이 아직 익숙하지 않거나, 특정 시장 전체에 분산해서 투자하고 싶은 투자자에게 ETF는 좋은 출발점이 될 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide" className="bd-button-secondary">가이드 목록으로</Link>
            <Link href="/cal/calculator" className="bd-button-primary">배당 계산기 보기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
