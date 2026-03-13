import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "배당 투자 기초",
  description:
    "배당 투자란 무엇인지, 배당률과 배당 성장, DRIP 재투자 전략까지 쉽게 정리한 BlueDino 가이드",
};

export default function DividendGuidePage() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">배당 투자 기초</span>
          <h1 className="bd-title-lg mt-4">배당 투자란 무엇인가</h1>
          <p className="bd-text-main mt-4">
            배당 투자는 기업이 벌어들인 이익 중 일부를 주주에게 현금이나 주식
            형태로 나누어주는 배당을 중심으로 수익을 쌓아가는 투자 방식입니다.
            단순히 높은 배당률만 보는 것이 아니라, 배당이 지속 가능한지, 시간이
            지날수록 배당이 성장하는지까지 함께 봐야 장기 투자에 유리합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">배당 투자 핵심 3가지</h2>

          <div className="bd-grid-3 mt-6">
            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">배당률</h3>
              <p className="bd-text-sub mt-2">
                현재 주가 대비 얼마의 배당금을 주는지를 보여주는 지표입니다.
                배당률이 높다고 무조건 좋은 것은 아니고, 일시적으로 주가가 급락해
                높아 보이는 경우도 있습니다.
              </p>
            </div>

            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">배당 성장</h3>
              <p className="bd-text-sub mt-2">
                시간이 지나면서 배당금을 꾸준히 늘려온 기업은 장기적으로 투자
                매력이 높을 수 있습니다. 현재 배당률보다 미래 배당 성장성이 더
                중요할 때도 많습니다.
              </p>
            </div>

            <div className="bd-list-item">
              <h3 className="text-lg font-semibold text-white">지속 가능성</h3>
              <p className="bd-text-sub mt-2">
                배당은 결국 기업의 이익과 현금흐름에서 나옵니다. 수익성, 부채,
                경기 민감도까지 함께 봐야 배당이 오래 유지될 가능성을 판단할 수
                있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">DRIP 재투자 전략은 왜 중요한가</h2>

          <div className="mt-4 space-y-4">
            <p className="bd-text-main">
              DRIP는 받은 배당금을 다시 같은 자산에 재투자하는 전략입니다.
              배당이 배당을 낳는 구조가 만들어지기 때문에 시간이 길어질수록
              복리 효과가 커집니다.
            </p>
            <p className="bd-text-main">
              특히 배당 성장주나 장기 우상향 자산은 DRIP 전략과 잘 맞는 편입니다.
              다만 세금, 환전 비용, 거래 비용까지 함께 고려해야 실제 체감 수익이
              더 정확해집니다.
            </p>
            <p className="bd-text-main">
              BlueDino의 배당 계산기는 이런 재투자 구조를 숫자로 확인할 수 있도록
              설계되어 있습니다.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="text-sm leading-7 text-emerald-200">
              핵심은 높은 배당률 하나보다
              <span className="font-semibold"> 배당 성장 + 재투자 + 지속 가능성</span>
              을 함께 보는 것입니다.
            </p>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">배당 투자 전에 꼭 체크할 것</h2>

          <div className="bd-list mt-4">
            <div className="bd-list-item">
              배당률이 비정상적으로 높은 이유가 있는지
            </div>
            <div className="bd-list-item">
              최근 5년 이상 배당을 유지하거나 늘려왔는지
            </div>
            <div className="bd-list-item">
              배당성향과 현금흐름이 무리 없는 수준인지
            </div>
            <div className="bd-list-item">
              배당소득세와 계좌 유형별 세금 차이를 이해하고 있는지
            </div>
            <div className="bd-list-item">
              재투자 전략을 쓸지, 현금흐름 용도로 받을지 목적이 명확한지
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/cal/calculator" className="bd-button-primary">
            배당 계산기 바로가기
          </Link>
          <Link href="/info/guide" className="bd-button-secondary">
            투자 가이드 목록
          </Link>
        </section>
      </article>
    </div>
  );
}