import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "복리의 힘과 재투자",
  description: "수익을 다시 투자할 때 시간이 어떤 차이를 만드는지 설명하는 BlueDino 복리 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">복리와 재투자</span>
          <h1 className="bd-title-lg mt-4">복리의 힘과 재투자, 시간이 만드는 차이</h1>
          <p className="bd-text-main mt-4">
            복리는 수익이 다시 수익을 낳는 구조입니다. 처음에는 차이가 작아 보여도 시간이 길어질수록 격차가 크게 벌어집니다. 그래서 장기 투자에서 가장 중요한 변수 중 하나는 단순 수익률이 아니라 수익을 계속 재투자할 수 있는 구조를 만드는 것입니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">왜 재투자가 중요한가</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">배당금을 받거나 자본차익을 실현했을 때 그 돈을 다시 투자하면 원금이 커지고, 그 커진 원금에서 다시 수익이 발생합니다. 이 반복이 복리의 핵심입니다.</p>
            <p className="bd-text-main">반대로 수익을 계속 소비해버리면 복리의 가속 구간에 진입하지 못합니다. 그래서 장기 투자 초기에는 수익률보다 재투자 습관이 더 중요할 때가 많습니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">복리를 방해하는 요소</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">잦은 매매로 수수료와 세금이 반복적으로 발생하는 것</div>
            <div className="bd-list-item">수익이 날 때마다 투자 원칙 없이 소비로 빠지는 것</div>
            <div className="bd-list-item">단기 변동성 때문에 장기 전략을 자주 바꾸는 것</div>
            <div className="bd-list-item">목표 기간이 짧아서 복리 효과를 체감하기 전에 전략을 포기하는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">복리는 배당 투자와 FIRE 전략에서 특히 중요합니다. 내가 원하는 생활비와 목표 자산을 계산할 때도 결국 복리 성장을 가정하게 되므로 관련 페이지를 함께 보는 것이 좋습니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/dividend-basics" className="bd-button-secondary">
              배당 투자 기초
            </Link>
            <Link href="/info/guide/fire-calculator-guide" className="bd-button-secondary">
              FIRE 계산기 활용법
            </Link>
            <Link href="/cal/fire" className="bd-button-secondary">
              FIRE 계산기
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
