import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "주식 투자 기초",
  description: "주식이 무엇이고 수익이 어떻게 발생하는지 이해하는 BlueDino 입문 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">주식 투자 기초</span>
          <h1 className="bd-title-lg mt-4">주식 투자 기초, 가장 먼저 이해해야 할 것</h1>
          <p className="bd-text-main mt-4">
            주식 투자는 회사의 일부를 소유하는 것에서 시작합니다. 그래서 주가는 단순한 숫자가 아니라 기업의 성장 기대, 실적, 시장 심리가 함께 반영된 결과입니다. 초보자는 차트보다 먼저 주식이 왜 오르고 왜 떨어지는지, 그리고 내가 어떤 방식으로 수익을 얻게 되는지를 이해해야 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">주식 수익은 어디서 나오는가</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">주식 투자 수익은 크게 두 가지입니다. 하나는 주가가 올라서 생기는 자본차익이고, 다른 하나는 기업이 이익을 나눠주는 배당입니다. 어떤 투자자는 성장성을 보고 자본차익을 기대하고, 어떤 투자자는 현금흐름을 위해 배당을 중시합니다.</p>
            <p className="bd-text-main">즉 주식은 단순히 싸게 사서 비싸게 파는 것만이 아니라, 기업의 가치가 시간이 지나며 높아지는 과정을 함께 소유하는 투자이기도 합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">처음 시작할 때 많이 하는 오해</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">좋은 회사면 무조건 지금 사도 된다고 생각하는 것</div>
            <div className="bd-list-item">주가가 많이 빠졌으니 곧 반등할 것이라고 단정하는 것</div>
            <div className="bd-list-item">내가 이해하지 못한 사업인데도 유명하다는 이유로 매수하는 것</div>
            <div className="bd-list-item">목적 없이 단기 매매와 장기 투자를 동시에 섞는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">주식 투자 기초를 이해한 뒤에는 ETF와 개별주식 차이, 분산투자, 계좌별 세금 구조까지 함께 보는 것이 좋습니다. 구조를 먼저 이해하면 이후의 계산기 결과도 훨씬 현실적으로 읽을 수 있습니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/etf-vs-stocks" className="bd-button-secondary">
              ETF와 개별주식 차이
            </Link>
            <Link href="/info/guide/diversification" className="bd-button-secondary">
              분산투자가 왜 중요한가
            </Link>
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
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
