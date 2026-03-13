import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "손실이 났을 때 세금은 어떻게 되는가",
  description: "투자 손실과 세금의 관계를 상품과 계좌별로 이해하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">손실과 세금</span>
          <h1 className="bd-title-lg mt-4">손실이 났을 때 세금은 어떻게 되는가</h1>
          <p className="bd-text-main mt-4">
            손실이 났으니 세금은 아예 없다고 생각하기 쉽지만, 실제 세금 구조는 상품과 계좌에 따라 다르게 작동합니다. 어떤 경우는 손실이 발생해도 다른 소득과 관계없이 과세가 남고, 어떤 경우는 손익을 통산해 실제 부담이 줄어들기도 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">왜 손실인데도 세금 구조를 봐야 할까</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">세금은 전체 투자 성과를 체감 수익으로 바꾸는 마지막 단계입니다. 그래서 손실이 날 때일수록 세금 구조를 이해하면 복구 전략이나 계좌 운용 전략을 더 현실적으로 짤 수 있습니다.</p>
            <p className="bd-text-main">특히 해외주식처럼 양도세 구조가 있는 자산은 손익통산과 기본공제 개념을 이해하는 것이 중요합니다. 배당소득은 또 별개의 구조로 보아야 합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">손실 구간에서 자주 하는 오해</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">주가 손실이 났으니 모든 세금이 자동으로 없어질 것이라 생각하는 것</div>
            <div className="bd-list-item">배당소득세와 양도소득세를 같은 구조로 보는 것</div>
            <div className="bd-list-item">계좌별 손익 처리가 모두 동일하다고 생각하는 것</div>
            <div className="bd-list-item">세후 기준이 아니라 세전 기준으로만 손실 회복을 계산하는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">손실과 세금의 관계는 해외주식 세금 구조, 계좌별 세금정보, 양도세 계산기와 연결해서 보는 것이 가장 좋습니다. 그래야 손익과 과세를 실제 숫자로 확인할 수 있습니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/us-stock-tax-basics" className="bd-button-secondary">
              해외주식 세금 기본 구조
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
