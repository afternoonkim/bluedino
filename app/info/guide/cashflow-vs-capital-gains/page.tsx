import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "현금흐름 투자와 자본차익 투자의 차이",
  description: "현금흐름 중심 투자와 자본차익 중심 투자의 차이를 비교하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">전략 비교</span>
          <h1 className="bd-title-lg mt-4">현금흐름 투자와 자본차익 투자의 차이</h1>
          <p className="bd-text-main mt-4">
            투자 목표는 사람마다 다릅니다. 누군가는 매달 들어오는 배당과 분배금이 중요하고, 누군가는 장기적으로 자산이 크게 불어나는 것이 더 중요합니다. 그래서 현금흐름 투자와 자본차익 투자는 어느 쪽이 더 좋다기보다 목적이 다른 전략으로 봐야 합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">두 전략의 차이</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">현금흐름 투자는 배당주, 월배당 ETF, 채권형 자산처럼 정기적으로 현금이 들어오는 구조를 중시합니다. 생활비나 심리적 안정감을 원하는 사람에게 맞을 수 있습니다.</p>
            <p className="bd-text-main">자본차익 투자는 성장주나 지수 투자처럼 시간이 지나며 자산 가치가 커지는 것을 중시합니다. 당장 현금은 적더라도 장기 총수익을 높이는 데 초점이 있습니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">어떤 사람이 어떤 전략에 더 맞을까</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">생활비 보조나 현금 유입이 중요하면 현금흐름 전략이 유리할 수 있음</div>
            <div className="bd-list-item">장기 자산 성장과 재투자를 중시하면 자본차익 전략이 유리할 수 있음</div>
            <div className="bd-list-item">둘을 섞더라도 목적별 비중을 명확히 해야 함</div>
            <div className="bd-list-item">세후 수익과 계좌 구조를 함께 고려해야 진짜 비교가 가능함</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">현금흐름과 자본차익은 배당 투자, 월배당 ETF, FIRE 전략과 모두 연결됩니다. 계산기로 수치를 확인하면서 전략을 비교하면 더 명확해집니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/dividend-basics" className="bd-button-secondary">
              배당 투자 기초
            </Link>
            <Link href="/info/guide/monthly-dividend-etf-checklist" className="bd-button-secondary">
              월배당 ETF 체크포인트
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
