import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "ISA 계좌로 투자하면 뭐가 좋은가",
  description: "ISA 계좌의 핵심 혜택과 일반계좌 대비 차이를 쉽게 정리한 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">ISA 계좌</span>
          <h1 className="bd-title-lg mt-4">ISA 계좌로 투자하면 뭐가 좋은가</h1>
          <p className="bd-text-main mt-4">
            ISA는 단순히 하나 더 만드는 금융계좌가 아니라, 세후 수익을 높이는 도구에 가깝습니다. 같은 투자 상품이라도 어떤 계좌에 담느냐에 따라 실제로 손에 남는 돈이 달라질 수 있기 때문입니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">ISA의 핵심은 세후 수익률</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">많은 투자자가 수익률은 꼼꼼히 비교하면서도 세금 차이는 가볍게 넘깁니다. 하지만 장기 투자에서는 세전 수익보다 세후 수익이 훨씬 중요합니다.</p>
            <p className="bd-text-main">ISA는 일정 부분 비과세와 분리과세 혜택을 통해 일반계좌보다 유리한 결과를 만들 수 있습니다. 그래서 국내 투자자에게는 상품 선택만큼 계좌 선택도 중요합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">ISA를 볼 때 확인할 점</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">내 투자 대상이 ISA에서 가능한지 먼저 확인하기</div>
            <div className="bd-list-item">중개형인지 다른 유형인지 구조 차이를 이해하기</div>
            <div className="bd-list-item">장기 보유와 절세 효과가 잘 맞는 상품인지 보기</div>
            <div className="bd-list-item">ISA만 믿고 다른 절세계좌 활용을 놓치지 않기</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">ISA는 단독으로 보기보다 절세계좌 전체 흐름 속에서 보는 것이 가장 좋습니다. 연금저축, IRP와 어떤 순서로 활용할지까지 보면 전략이 더 명확해집니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/pension-vs-irp" className="bd-button-secondary">
              연금저축과 IRP 차이
            </Link>
            <Link href="/info/guide/why-tax-advantaged-accounts" className="bd-button-secondary">
              절세계좌를 먼저 써야 하는 이유
            </Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">
              절세계좌 활용순서
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
