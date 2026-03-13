import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "절세계좌를 먼저 써야 하는 이유",
  description: "같은 투자도 담는 계좌에 따라 결과가 달라지는 이유를 설명하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">절세계좌</span>
          <h1 className="bd-title-lg mt-4">절세계좌를 먼저 써야 하는 이유</h1>
          <p className="bd-text-main mt-4">
            많은 투자자가 어떤 종목을 살지에는 많은 시간을 쓰지만, 어떤 계좌에 담을지는 뒤로 미룹니다. 하지만 장기 투자에서는 세금 차이가 누적되기 때문에 계좌 선택이 투자 상품만큼 중요해질 수 있습니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">왜 계좌가 결과를 바꾸는가</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">같은 수익률이라도 세금이 적게 나가면 재투자할 수 있는 원금이 더 커집니다. 이 차이는 시간이 갈수록 누적됩니다.</p>
            <p className="bd-text-main">그래서 절세계좌는 단순히 세금을 덜 내는 장치가 아니라, 복리 성장을 더 유리하게 만드는 환경이라고 볼 수 있습니다. 특히 장기 투자자에게 효과가 큽니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">절세계좌를 볼 때의 기준</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">내가 투자하는 상품이 해당 계좌에 적합한지</div>
            <div className="bd-list-item">단기 유동성이 필요한 자금인지 장기 자금인지</div>
            <div className="bd-list-item">세액공제와 과세이연의 차이를 이해하고 있는지</div>
            <div className="bd-list-item">계좌를 여러 개 써야 할지 우선순위를 정했는지</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">절세계좌는 ISA, 연금저축, IRP를 각각 따로 보기보다 전체 흐름으로 보는 것이 중요합니다. 그래서 계좌별 세금정보와 활용순서 페이지를 함께 확인하는 것이 가장 좋습니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/isa-benefits" className="bd-button-secondary">
              ISA 계좌로 투자하면 뭐가 좋은가
            </Link>
            <Link href="/info/guide/pension-vs-irp" className="bd-button-secondary">
              연금저축과 IRP 차이
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
