import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "월배당 ETF 투자 전 체크포인트",
  description: "월배당 ETF 투자 전에 총수익과 분배 구조를 확인하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">월배당 ETF</span>
          <h1 className="bd-title-lg mt-4">월배당 ETF 투자 전 체크포인트</h1>
          <p className="bd-text-main mt-4">
            월배당 ETF는 매달 현금이 들어온다는 점 때문에 심리적으로 만족감이 큽니다. 하지만 분배금 빈도만 보고 투자하면 실제 총수익과 리스크를 놓칠 수 있습니다. 그래서 월배당이라는 형식보다 그 안의 구조를 먼저 확인해야 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">분배금이 많다고 무조건 좋은 것은 아니다</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">분배금은 투자자에게 현금흐름을 제공하지만, 그 자체가 높은 총수익을 보장하지는 않습니다. 어떤 상품은 분배금을 많이 주는 대신 성장성이 제한될 수 있습니다.</p>
            <p className="bd-text-main">특히 커버드콜 전략이 섞인 상품은 상승장에서 수익 상단이 제한될 수 있으므로, 내 투자 목적이 월 현금흐름인지 장기 총수익인지부터 명확히 해야 합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">투자 전 체크리스트</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">분배율이 아니라 장기 총수익률도 함께 보기</div>
            <div className="bd-list-item">기초자산과 운용 전략을 이해하고 투자하기</div>
            <div className="bd-list-item">세후 기준 현금흐름이 얼마나 남는지 확인하기</div>
            <div className="bd-list-item">생활비용인지 재투자용인지 목적을 미리 정하기</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">월배당 ETF는 배당 투자 기초, 현금흐름 투자와 자본차익 투자 비교, 배당 계산기와 연결해서 보면 훨씬 실용적입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/dividend-basics" className="bd-button-secondary">
              배당 투자 기초
            </Link>
            <Link href="/info/guide/cashflow-vs-capital-gains" className="bd-button-secondary">
              현금흐름 투자와 자본차익 투자 차이
            </Link>
            <Link href="/cal/calculator" className="bd-button-secondary">
              배당 계산기
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
