import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "FIRE 전략 기초",
  description:
    "FIRE의 의미와 4% 룰, 필요한 자산 규모 계산 방법까지 쉽게 정리한 BlueDino FIRE 가이드",
};

export default function FireGuidePage() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
            FIRE 전략 기초
          </span>

          <h1 className="bd-title-lg mt-4">FIRE란 무엇인가</h1>

          <p className="bd-text-main mt-4">
            FIRE는 Financial Independence, Retire Early의 줄임말로 경제적
            자유를 먼저 달성한 뒤 더 이른 시점에 은퇴하거나, 일에 덜 의존하는
            삶을 목표로 하는 전략입니다. 핵심은 빨리 은퇴 그 자체보다,
            생활비를 자산 소득으로 감당할 수 있는 구조를 만드는 데 있습니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">FIRE의 기본 공식</h2>

          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6 text-center">
            <div className="text-sm text-orange-200">기본 개념</div>
            <div className="mt-2 text-2xl font-bold text-white">
              필요 자산 ≈ 연간 생활비 × 25
            </div>
            <p className="bd-text-main mt-3">
              흔히 말하는 4% 룰을 단순화하면, 연간 생활비의 25배 정도 자산이
              있으면 자산 인출을 통해 생활을 이어갈 가능성이 있다는 개념입니다.
            </p>
          </div>

          <div className="bd-grid-3 mt-6">
            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">수입</h3>
              <p className="bd-text-sub mt-2">
                수입이 높을수록 투자 가능한 금액이 커집니다. FIRE 속도는 결국
                얼마나 많이 버느냐와 얼마나 남기느냐의 조합입니다.
              </p>
            </div>

            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">지출</h3>
              <p className="bd-text-sub mt-2">
                같은 자산이라도 지출이 적으면 필요한 목표 자산이 줄어듭니다.
                FIRE에서는 수입보다 지출 통제가 더 큰 영향을 주는 경우도 많습니다.
              </p>
            </div>

            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">수익률</h3>
              <p className="bd-text-sub mt-2">
                복리 수익률이 높을수록 목표 도달 속도는 빨라집니다. 다만 무리한
                고수익 추구는 변동성과 손실 위험을 키울 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">FIRE 전략을 현실적으로 보는 법</h2>

          <div className="mt-4 space-y-4">
            <p className="bd-text-main">
              FIRE는 단순히 극단적으로 아끼는 전략이 아닙니다. 현재 삶의 질을
              완전히 포기하면 오래 유지하기 어렵기 때문에, 자신에게 맞는
              저축률과 투자 방식이 중요합니다.
            </p>
            <p className="bd-text-main">
              또 은퇴 이후의 의료비, 자녀 교육비, 물가 상승, 세금 문제까지 함께
              고려해야 실제와 가까운 계획이 됩니다. 그래서 FIRE 계산은 목표 금액
              하나만 보는 것보다, 월 저축액과 기대 수익률, 목표 생활비를 함께
              조정해보는 것이 중요합니다.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <p className="text-sm leading-7 text-slate-300">
              FIRE는 빠른 은퇴를 위한 공식이라기보다
              <span className="font-semibold text-white">
                {" "}
                돈 때문에 원하지 않는 선택을 줄이기 위한 구조
              </span>
              에 가깝습니다.
            </p>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">FIRE 준비 전에 체크할 것</h2>

          <div className="bd-list mt-4">
            <div className="bd-list-item">
              현재 월 지출과 은퇴 후 예상 지출을 따로 계산했는지
            </div>
            <div className="bd-list-item">
              연평균 수익률을 너무 낙관적으로 잡지 않았는지
            </div>
            <div className="bd-list-item">
              비상자금과 장기 투자 자금을 구분했는지
            </div>
            <div className="bd-list-item">
              물가상승률과 세금을 반영한 시뮬레이션인지
            </div>
            <div className="bd-list-item">
              완전 은퇴가 아니라 선택 가능한 삶이 목표인지
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/cal/fire" className="bd-button-primary">
            FIRE 계산기 바로가기
          </Link>
          <Link href="/info/guide" className="bd-button-secondary">
            투자 가이드 목록
          </Link>
        </section>
      </article>
    </div>
  );
}