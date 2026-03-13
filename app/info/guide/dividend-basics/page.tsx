import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "배당 투자 기초",
  description: "배당률, 배당 성장, 지속 가능성을 함께 이해하는 BlueDino 배당 입문 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">배당 투자 기초</span>
          <h1 className="bd-title-lg mt-4">배당 투자 기초, 배당률만 보면 안 되는 이유</h1>
          <p className="bd-text-main mt-4">
            배당 투자는 기업이 벌어들인 이익 일부를 주주에게 나눠주는 구조를 활용하는 투자입니다. 많은 초보자가 높은 배당률만 보고 접근하지만, 실제로 중요한 것은 그 배당이 오래 유지될 수 있는지와 시간이 지나며 성장할 수 있는지입니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">배당 투자에서 꼭 봐야 할 3가지</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">첫째는 현재 배당률입니다. 지금 주가 대비 얼마를 배당으로 주는지 보여주기 때문에 현금흐름 관점에서 중요합니다.</p>
            <p className="bd-text-main">둘째는 배당 성장입니다. 시간이 갈수록 배당금을 늘리는 기업은 장기 투자에 더 유리할 수 있습니다. 셋째는 지속 가능성입니다. 배당은 결국 기업의 현금흐름에서 나오기 때문에 실적과 부채 구조를 함께 봐야 합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">초보자가 자주 놓치는 포인트</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">배당률이 높아도 감익과 주가 하락 때문에 생긴 착시일 수 있음</div>
            <div className="bd-list-item">배당소득세를 고려하지 않고 세후 수익을 과대평가함</div>
            <div className="bd-list-item">배당만 받고 끝낼지 재투자할지 목적이 불명확함</div>
            <div className="bd-list-item">배당주와 고배당주를 같은 개념으로 보는 실수</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">배당 투자 기초를 이해했다면 다음 단계는 재투자와 복리 구조를 확인하는 것입니다. 그리고 실제 수치는 배당 계산기로 확인해 보는 것이 가장 빠릅니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/compound-interest" className="bd-button-secondary">
              복리의 힘과 재투자
            </Link>
            <Link href="/info/guide/high-dividend-risks" className="bd-button-secondary">
              고배당주 투자 시 주의점
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
