import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "해외주식 세금 기초",
  description:
    "해외주식 양도소득세와 배당소득세, 연 250만원 공제 구조까지 쉽게 정리한 BlueDino 가이드",
};

export default function TaxGuidePage() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            해외주식 세금 기초
          </span>

          <h1 className="bd-title-lg mt-4">해외주식 세금은 어떻게 계산되나</h1>

          <p className="bd-text-main mt-4">
            해외주식 투자에서 가장 많이 헷갈리는 부분은 세금입니다. 보통
            매매차익에는 양도소득세가, 배당금에는 배당소득세가 적용됩니다.
            둘은 계산 방식과 시점이 다르기 때문에 따로 이해하는 것이 중요합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-grid-2">
          <div className="bd-card bd-card-padding">
            <h2 className="bd-title-md">양도소득세</h2>
            <p className="bd-text-main mt-4">
              해외주식을 팔아서 생긴 순이익에는 기본적으로 양도소득세가
              적용됩니다. 일반적으로 연간 순이익에서 기본공제 250만원을 차감한
              뒤, 남은 금액에 세율이 적용됩니다.
            </p>

            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
              <div className="text-sm text-violet-200">핵심 구조</div>
              <div className="mt-2 text-xl font-bold text-white">
                연간 순이익 - 250만원 공제 → 과세표준
              </div>
              <p className="mt-3 text-sm text-slate-300">
                이후 일반적으로 지방소득세 포함 약 22% 수준으로 계산됩니다.
              </p>
            </div>
          </div>

          <div className="bd-card bd-card-padding">
            <h2 className="bd-title-md">배당소득세</h2>
            <p className="bd-text-main mt-4">
              해외주식에서 받은 배당금은 보통 현지에서 먼저 원천징수됩니다.
              미국 주식의 경우 일반적으로 15% 수준이 많이 언급됩니다. 즉,
              배당금은 매도하지 않아도 세금이 먼저 빠질 수 있습니다.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <div className="text-sm text-slate-400">중요 포인트</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                배당금은 매매차익과 달리 연 250만원 기본공제와 별개의 흐름으로
                이해하는 것이 좋습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">해외주식 세금에서 많이 헷갈리는 부분</h2>

          <div className="bd-list mt-4">
            <div className="bd-list-item">
              수익난 종목과 손실난 종목은 연간 기준으로 합산해서 봅니다.
            </div>
            <div className="bd-list-item">
              배당금과 매매차익은 세금 흐름이 다를 수 있습니다.
            </div>
            <div className="bd-list-item">
              환차익까지 포함된 최종 손익 관점으로 확인해야 합니다.
            </div>
            <div className="bd-list-item">
              실제 신고와 납부는 국가, 증권사, 거래 내역에 따라 차이가 있을 수
              있습니다.
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
            <p className="text-sm leading-7 text-amber-100">
              세금은 계좌 수익률을 체감상 크게 바꿀 수 있기 때문에, 수익 계산
              전에 반드시 세후 기준도 함께 확인하는 것이 좋습니다.
            </p>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">실전에서는 이렇게 활용</h2>

          <div className="mt-4 space-y-4">
            <p className="bd-text-main">
              연말이 가까워질수록 수익 종목과 손실 종목을 함께 보면서 전체 연간
              손익을 점검하는 것이 중요합니다. 무조건 수익률만 보는 것이 아니라,
              세후 기준으로 최종 남는 돈을 계산해야 실제 투자 판단에 도움이 됩니다.
            </p>
            <p className="bd-text-main">
              BlueDino의 해외주식 양도세 계산기는 이런 구조를 빠르게 시뮬레이션할
              수 있도록 만든 도구입니다.
            </p>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/cal/capital-gains" className="bd-button-primary">
            양도세 계산기 바로가기
          </Link>
          <Link href="/info/guide" className="bd-button-secondary">
            투자 가이드 목록
          </Link>
        </section>
      </article>
    </div>
  );
}