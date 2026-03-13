import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "분산투자가 왜 중요한가",
  description: "수익률보다 손실 관리 관점에서 분산투자를 이해하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">분산투자</span>
          <h1 className="bd-title-lg mt-4">분산투자가 왜 중요한가</h1>
          <p className="bd-text-main mt-4">
            많은 사람은 분산투자를 수익률을 낮추는 행동처럼 오해합니다. 하지만 분산투자의 핵심은 수익을 포기하는 것이 아니라, 한 번의 큰 실수나 특정 자산의 급락으로 전체 포트폴리오가 무너지는 것을 막는 데 있습니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">분산은 왜 필요한가</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">시장은 언제든 예측과 다르게 움직일 수 있습니다. 내가 확신하던 산업이나 기업도 실적 악화, 규제, 금리 변화로 크게 흔들릴 수 있습니다.</p>
            <p className="bd-text-main">그래서 자산, 국가, 업종, 계좌를 나누는 것은 맞히기 위한 전략이 아니라 살아남기 위한 전략입니다. 장기 투자에서 살아남는 것이 결국 복리의 시작점입니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">형식적 분산과 진짜 분산의 차이</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">종목 수만 많고 실제로는 같은 업종에 몰린 포트폴리오</div>
            <div className="bd-list-item">국내 상장 ETF 여러 개를 샀지만 기초자산이 비슷한 경우</div>
            <div className="bd-list-item">배당주라고 나눴지만 모두 금리 민감 업종인 경우</div>
            <div className="bd-list-item">계좌를 나눴지만 세금 구조를 고려하지 않아 효율이 떨어지는 경우</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">분산투자는 포트폴리오 기초와 초보자의 포트폴리오 실수 페이지를 함께 보면 이해가 더 쉬워집니다. 세금 측면에서는 계좌를 어떻게 나누느냐도 중요한 분산 전략이 됩니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/portfolio-basics" className="bd-button-secondary">
              포트폴리오 기초
            </Link>
            <Link href="/info/guide/portfolio-mistakes" className="bd-button-secondary">
              포트폴리오 실수
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
