import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "장기투자와 단기투자의 차이",
  description: "투자 기간에 따라 전략과 리스크 관리가 어떻게 달라지는지 정리한 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자 기간</span>
          <h1 className="bd-title-lg mt-4">장기투자와 단기투자의 차이</h1>
          <p className="bd-text-main mt-4">
            장기투자와 단기투자는 단순히 보유 기간 차이만이 아닙니다. 필요한 분석 방식, 감당해야 할 변동성, 세금과 수수료의 영향, 심리 관리까지 전부 달라집니다. 그래서 기간이 다르면 전략도 달라져야 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">장기와 단기의 핵심 차이</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">장기투자는 기업의 성장과 복리 효과를 믿고 시간을 내 편으로 만드는 전략입니다. 그래서 분산과 꾸준함, 계좌 구조가 중요합니다.</p>
            <p className="bd-text-main">단기투자는 타이밍과 변동성을 적극적으로 활용하려는 성격이 강합니다. 그래서 리스크 관리, 진입과 이탈 기준, 손절 규칙이 훨씬 중요해집니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">혼동하면 생기는 문제</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">장기투자라고 해놓고 매일 가격에 흔들리는 것</div>
            <div className="bd-list-item">단기 매매를 하면서 명확한 기준 없이 감으로 대응하는 것</div>
            <div className="bd-list-item">세금과 거래 비용이 단기 전략에 더 크게 작용하는 점을 무시하는 것</div>
            <div className="bd-list-item">포트폴리오 목적 없이 장기와 단기 자산을 섞는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">장기와 단기의 차이를 이해하면 FIRE 전략, 복리, 포트폴리오 실수 같은 주제도 훨씬 명확해집니다. 내 전략을 정한 후 계산기를 보는 것이 가장 효율적입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/compound-interest" className="bd-button-secondary">
              복리의 힘과 재투자
            </Link>
            <Link href="/info/guide/portfolio-mistakes" className="bd-button-secondary">
              포트폴리오 실수
            </Link>
            <Link href="/info/guide/fire-calculator-guide" className="bd-button-secondary">
              FIRE 계산기 활용법
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
