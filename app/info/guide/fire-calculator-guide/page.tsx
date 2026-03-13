import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "은퇴 준비에서 FIRE 계산기를 어떻게 활용할까",
  description: "FIRE 계산기 숫자를 현실적인 은퇴 계획으로 해석하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">FIRE 계산기</span>
          <h1 className="bd-title-lg mt-4">은퇴 준비에서 FIRE 계산기를 어떻게 활용할까</h1>
          <p className="bd-text-main mt-4">
            FIRE 계산기는 목표 자산이 얼마나 필요한지 빠르게 보여주는 도구입니다. 하지만 숫자 하나만 보고 가능하다 불가능하다를 판단하면 오히려 실망하기 쉽습니다. 핵심은 계산기의 결과를 현실적인 생활비와 투자 수익률, 인출 전략과 연결해서 해석하는 것입니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">FIRE 계산기의 핵심 입력값</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">가장 중요한 것은 은퇴 후 필요한 생활비입니다. 자산 규모는 결국 생활비 수준에 따라 크게 달라집니다.</p>
            <p className="bd-text-main">그다음은 예상 수익률과 목표 기간입니다. 지나치게 낙관적인 수익률을 넣으면 계산 결과는 좋아 보이지만 실제 계획은 흔들릴 수 있습니다. 그래서 보수적인 가정이 더 중요합니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">계산기를 볼 때 흔한 실수</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">현재 지출이 아니라 희망 지출만 넣는 것</div>
            <div className="bd-list-item">수익률을 지나치게 높게 잡는 것</div>
            <div className="bd-list-item">은퇴 후 세금과 물가 상승을 빼먹는 것</div>
            <div className="bd-list-item">계산 결과를 한 번 보고 끝내고 주기적으로 업데이트하지 않는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">FIRE는 숫자만의 문제가 아니라 포트폴리오, 세금, 현금흐름 전략과 연결된 계획입니다. 복리와 재투자, 장기투자와 단기투자 차이도 함께 보면 도움이 됩니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/compound-interest" className="bd-button-secondary">
              복리의 힘과 재투자
            </Link>
            <Link href="/info/guide/long-vs-short-term" className="bd-button-secondary">
              장기투자와 단기투자 차이
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
