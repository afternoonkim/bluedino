import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "배당 성장 투자",
  description: "배당 성장 투자의 핵심 개념을 정리한 BlueDino 가이드",
};

export default function DividendGrowthPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Dividend Growth</span>
          <h1 className="bd-title-lg mt-4">배당 성장 투자</h1>
          <p className="bd-text-main mt-4">
            배당 투자는 단순히 현재 배당수익률이 높은 종목을 고르는 것만으로 끝나지 않습니다.
            시간이 지나면서 배당이 꾸준히 늘어나는지까지 함께 봐야 장기 투자 관점에서 더 안정적인 구조를 만들 수 있습니다.
          </p>
        </section>

        <AdBlock label="배당 성장 가이드 광고 영역" />

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">배당 성장의 의미</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">기업이 이익과 현금흐름을 지속적으로 늘리고 있다는 신호가 될 수 있습니다.</div>
              <div className="bd-list-item">장기 보유 시 나의 원금 대비 배당수익률이 점점 높아질 수 있습니다.</div>
              <div className="bd-list-item">재투자 전략과 결합하면 복리 효과를 더 크게 기대할 수 있습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">같이 봐야 할 것</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">배당성향이 지나치게 높지는 않은지 확인합니다.</div>
              <div className="bd-list-item">일시적으로 높은 배당이 아니라 지속 가능한 배당인지 체크합니다.</div>
              <div className="bd-list-item">실적, 현금흐름, 부채 구조도 함께 살펴보는 것이 좋습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <div className="mt-0 flex flex-wrap gap-3">
            <Link href="/info/guide/dividend" className="bd-button-primary">배당 투자 기초</Link>
            <Link href="/cal/calculator" className="bd-button-secondary">배당 계산기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
