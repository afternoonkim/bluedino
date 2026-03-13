import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "해외주식 투자 시 세금 기본 구조",
  description: "해외주식 투자에서 배당소득세와 양도소득세를 구분해 이해하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">해외주식 세금</span>
          <h1 className="bd-title-lg mt-4">해외주식 투자 시 세금 기본 구조</h1>
          <p className="bd-text-main mt-4">
            해외주식은 국내주식과 세금 구조가 다르기 때문에 수익률만 보고 접근하면 실제 체감 결과가 달라질 수 있습니다. 특히 배당소득세와 양도소득세가 서로 다른 구조로 작동한다는 점을 먼저 이해해야 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">배당소득세와 양도소득세는 다르다</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">배당소득세는 배당을 받을 때 발생하는 세금이고, 양도소득세는 매도해서 차익이 확정될 때 발생하는 세금입니다. 두 세금은 계산 방식과 발생 시점이 다릅니다.</p>
            <p className="bd-text-main">따라서 배당을 자주 받는 투자와 매매차익 중심 투자는 세후 구조가 달라질 수 있습니다. 특히 손실이 있을 때의 해석도 서로 다르므로 구분해서 봐야 합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">초보자가 자주 헷갈리는 부분</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">배당세와 양도세를 합쳐서 하나의 세금처럼 생각하는 것</div>
            <div className="bd-list-item">기본공제 개념을 이해하지 못한 채 세금을 과대평가하는 것</div>
            <div className="bd-list-item">계좌별 세금 차이를 고려하지 않는 것</div>
            <div className="bd-list-item">세전 수익만 보고 전략을 비교하는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">해외주식 세금은 손실과 세금 관계, 계좌별 세금정보, 양도세 계산기와 함께 보면 가장 실전적으로 이해됩니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/loss-tax" className="bd-button-secondary">
              손실이 났을 때 세금은 어떻게 되는가
            </Link>
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
            </Link>
            <Link href="/cal/capital-gains" className="bd-button-secondary">
              해외주식 양도세 계산기
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
