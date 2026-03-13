import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "ISA 계좌 기초",
  description: "ISA 계좌의 기본 개념과 절세 포인트를 정리한 BlueDino 가이드",
};

export default function IsaBasicsPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">ISA Basics</span>
          <h1 className="bd-title-lg mt-4">ISA 계좌 기초</h1>
          <p className="bd-text-main mt-4">
            ISA는 다양한 금융상품을 한 계좌 안에서 운용하면서 절세 혜택을 기대할 수 있는 계좌입니다.
            단순히 계좌를 하나 더 만드는 개념이 아니라, 세후 수익률을 높이기 위한 구조로 이해하는 것이 중요합니다.
          </p>
        </section>

        <AdBlock label="ISA 가이드 광고 영역" />

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">핵심 포인트</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">일반계좌보다 세금 측면에서 유리할 수 있습니다.</div>
              <div className="bd-list-item">가입 기간, 납입 한도, 상품 범위를 함께 확인해야 합니다.</div>
              <div className="bd-list-item">중개형, 신탁형 등 유형에 따라 활용 방식이 달라질 수 있습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">주의할 점</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">절세만 보고 가입하기보다 실제 운용 방식에 맞는지 확인해야 합니다.</div>
              <div className="bd-list-item">중도 해지나 계좌 이전 시 불이익 여부를 미리 체크하는 것이 좋습니다.</div>
              <div className="bd-list-item">제도는 바뀔 수 있으므로 최신 조건을 반드시 확인해야 합니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">같이 보면 좋은 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax" className="bd-button-primary">계좌별 세금정보</Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">절세계좌 납입순서</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
