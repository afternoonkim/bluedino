import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">이용 안내</span>
          <h1 className="bd-title-lg mt-4">BlueDino 정보는 이렇게 활용하면 좋습니다</h1>
          <p className="bd-text-main mt-4">
            이 사이트의 계산기와 가이드는 이해를 돕기 위한 참고 자료입니다.
            숫자를 빠르게 가늠하고 개념을 정리하는 데 도움을 주지만, 실제 조건은 개인 상황과 시점에 따라 달라질 수 있습니다.
          </p>
          <p className="bd-text-sub mt-3">
            그래서 BlueDino는 결과를 그대로 믿고 결정하기보다, 먼저 방향을 잡고 필요한 부분을 추가 확인하는 데 쓰는 방식을 권장합니다.
          </p>
        </section>

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">계산기 결과를 볼 때 체크할 점</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">입력한 금리, 수익률, 세율, 기간이 달라지면 결과도 함께 달라집니다.</div>
              <div className="bd-list-item">대출과 세금은 개인 신용, 소득, 보유 자산, 제도 변경에 따라 실제 값이 달라질 수 있습니다.</div>
              <div className="bd-list-item">하나의 숫자보다 월 부담, 총이자, 세후 금액, 장기 누적 효과를 함께 보는 것이 좋습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">가이드를 읽을 때 도움이 되는 방법</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">처음이라면 용어를 외우기보다 계좌의 역할과 쓰임부터 이해해 보세요.</div>
              <div className="bd-list-item">질문형 문서는 실제로 많이 헷갈리는 부분부터 빠르게 정리할 때 유용합니다.</div>
              <div className="bd-list-item">관련 계산기를 함께 써보면 글에서 본 내용을 숫자로 바로 확인할 수 있습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">꼭 기억하면 좋은 점</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">BlueDino는 특정 종목, 계좌, 대출 상품 가입이나 매수·매도를 직접 권유하지 않습니다.</div>
            <div className="bd-list-item">세금과 제도는 바뀔 수 있으니 중요한 결정 전에는 금융회사, 공공기관, 전문가의 최신 안내를 함께 확인하세요.</div>
            <div className="bd-list-item">정보가 헷갈리거나 수정이 필요해 보이면 문의 페이지를 통해 알려주시면 점검에 도움이 됩니다.</div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">바로 이어서 보기</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/about" className="bd-button-primary">소개 보기</Link>
            <Link href="/info/etc/editorial-policy" className="bd-button-secondary">사이트 이용 대상 보기</Link>
            <Link href="/info/etc/contact" className="bd-button-secondary">문의하기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
