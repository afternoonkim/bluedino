import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "고배당주 투자 시 주의점",
  description: "고배당주 투자에서 흔한 함정을 정리한 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">고배당주</span>
          <h1 className="bd-title-lg mt-4">고배당주 투자 시 주의점</h1>
          <p className="bd-text-main mt-4">
            고배당주는 매달 혹은 정기적으로 현금흐름을 받고 싶은 투자자에게 매력적으로 보입니다. 하지만 높은 배당률이 항상 좋은 기회는 아닙니다. 때로는 실적 악화와 주가 하락이 만들어낸 위험 신호일 수 있습니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">왜 배당률이 높아졌는지 먼저 봐야 한다</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">배당률은 배당금과 주가의 관계로 계산됩니다. 그래서 배당금이 그대로여도 주가가 급락하면 배당률은 높아집니다. 이 경우 숫자는 좋아 보이지만 실제 상황은 나빠졌을 수 있습니다.</p>
            <p className="bd-text-main">또한 실적이 흔들리는 기업은 현재 배당을 유지하더라도 나중에 감배나 무배당으로 전환할 가능성이 있습니다. 그래서 배당률보다 배당의 질이 더 중요합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">고배당주에서 꼭 체크할 것</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">최근 실적과 현금흐름이 안정적인지</div>
            <div className="bd-list-item">배당성향이 과도하게 높지 않은지</div>
            <div className="bd-list-item">특정 업종 리스크에 집중되어 있지 않은지</div>
            <div className="bd-list-item">세후 기준으로도 매력이 있는지</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">고배당주는 배당 투자 기초와 월배당 ETF 체크포인트를 함께 보면 더 균형 있게 이해할 수 있습니다. 실제 수익 구조는 배당 계산기를 통해 직접 확인해보는 것이 좋습니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/dividend-basics" className="bd-button-secondary">
              배당 투자 기초
            </Link>
            <Link href="/info/guide/monthly-dividend-etf-checklist" className="bd-button-secondary">
              월배당 ETF 체크포인트
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
