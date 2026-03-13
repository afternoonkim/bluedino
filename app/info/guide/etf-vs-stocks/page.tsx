import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "ETF와 개별주식 차이",
  description: "ETF와 개별주식의 차이와 초보자에게 어떤 선택이 맞는지 정리한 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">ETF vs 개별주식</span>
          <h1 className="bd-title-lg mt-4">ETF와 개별주식 차이, 초보자는 어디서 시작할까</h1>
          <p className="bd-text-main mt-4">
            ETF는 여러 종목을 한 번에 묶어서 투자하는 상품이고, 개별주식은 특정 기업 하나에 직접 투자하는 방식입니다. 둘 다 장점이 있지만 필요한 공부의 양, 리스크, 기대 수익의 구조가 다르기 때문에 투자 성향에 따라 선택이 달라집니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">ETF의 장점과 개별주식의 장점</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">ETF는 자동 분산 효과가 있어서 한 종목 리스크를 줄이기 쉽습니다. 그래서 시장 전체나 특정 테마에 간단히 접근하고 싶은 초보자에게 유리합니다.</p>
            <p className="bd-text-main">개별주식은 내가 분석한 기업이 크게 성장할 경우 ETF보다 높은 수익을 기대할 수 있습니다. 다만 공부하지 않은 상태에서 접근하면 변동성도 훨씬 크게 체감됩니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">어떤 사람이 어떤 쪽에 더 맞을까</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">공부 시간이 부족하고 장기 적립식이 목표라면 ETF가 유리함</div>
            <div className="bd-list-item">특정 산업과 기업 분석에 자신이 있다면 개별주식 비중을 높일 수 있음</div>
            <div className="bd-list-item">한 번의 큰 실수에 취약한 투자자라면 ETF부터 시작하는 것이 안정적임</div>
            <div className="bd-list-item">세금과 계좌 구조까지 고려하면 상품 선택보다 담는 위치도 중요함</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">ETF와 개별주식은 수익률 비교보다 목적 비교가 중요합니다. 분산투자, ISA 계좌 혜택, 해외주식 세금 구조까지 이어서 보면 훨씬 실전적인 판단이 가능합니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/diversification" className="bd-button-secondary">
              분산투자가 왜 중요한가
            </Link>
            <Link href="/info/guide/isa-benefits" className="bd-button-secondary">
              ISA 계좌 혜택
            </Link>
            <Link href="/info/guide/us-stock-tax-basics" className="bd-button-secondary">
              해외주식 세금 구조
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
