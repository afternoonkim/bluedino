import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "연금저축과 IRP 차이",
  description: "연금저축과 IRP의 차이를 목적 중심으로 쉽게 비교하는 BlueDino 가이드",
};

export default function Page() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">연금 계좌 비교</span>
          <h1 className="bd-title-lg mt-4">연금저축과 IRP 차이, 비슷해 보여도 활용법은 다릅니다</h1>
          <p className="bd-text-main mt-4">
            연금저축과 IRP는 모두 대표적인 절세계좌이지만, 실제 운용 목적과 활용 순서는 다를 수 있습니다. 그래서 이름이 비슷하다고 같은 방식으로 접근하면 답답함을 느끼기 쉽습니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">핵심 차이는 운용 자유도와 활용 목적</h2>
          <div className="mt-4 space-y-4">
            <p className="bd-text-main">연금저축은 비교적 직관적이고 개인 투자자가 접근하기 쉬운 편입니다. IRP는 퇴직금 관리와 연계되거나 추가 절세를 고려할 때 활용 범위가 넓어질 수 있습니다.</p>
            <p className="bd-text-main">하지만 중요한 것은 어느 쪽이 무조건 좋으냐가 아니라, 나의 소득 구조와 납입 여력, 투자 성향에 어떤 계좌가 먼저 맞느냐입니다.</p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">비교할 때 놓치지 말아야 할 것</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">세액공제만 보고 유동성 제약을 무시하는 것</div>
            <div className="bd-list-item">상품 선택의 폭과 수수료 체감을 비교하지 않는 것</div>
            <div className="bd-list-item">연금저축과 IRP를 둘 다 할 수 있는데 하나만 보는 것</div>
            <div className="bd-list-item">장기 유지 계획 없이 혜택만 보고 급하게 시작하는 것</div>
          </div>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">BlueDino에서 함께 보면 좋은 페이지</h2>
          <p className="bd-text-main mt-4">연금저축과 IRP는 계좌별 세금정보와 절세계좌 활용순서를 함께 봐야 훨씬 이해가 빠릅니다. ISA와의 관계도 같이 보면 전체 자산 배치 그림이 잡힙니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
            </Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">
              절세계좌 활용순서
            </Link>
            <Link href="/info/guide/isa-benefits" className="bd-button-secondary">
              ISA 계좌 혜택
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
