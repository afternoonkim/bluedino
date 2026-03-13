import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">About BlueDino</span>
          <h1 className="bd-title-lg mt-4">BlueDino 소개</h1>
          <p className="bd-text-main mt-4">
            BlueDino는 투자 계산기와 데이터 기반 투자 정보를 한곳에서 보기 쉽게
            정리하는 플랫폼입니다. 배당, FIRE, 세금, 절세계좌처럼 개인 투자자가
            실제로 자주 확인하는 주제를 중심으로 계산 도구와 설명형 콘텐츠를
            함께 제공합니다.
          </p>
          <p className="bd-text-sub mt-3">
            단순히 계산기만 모아둔 사이트가 아니라, 계산 결과를 이해하는 데
            필요한 배경 정보까지 함께 확인할 수 있도록 구성하는 것이 BlueDino의
            운영 방향입니다.
          </p>
        </section>

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">무엇을 제공하나요</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">배당 재투자, FIRE, 양도소득세, 퇴직소득세 관련 계산기</div>
              <div className="bd-list-item">투자 기초 개념을 쉽게 정리한 설명형 가이드 콘텐츠</div>
              <div className="bd-list-item">계좌별 세금 정보와 절세계좌 활용 흐름 정리</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">운영 기준</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">초보자도 빠르게 이해할 수 있는 구조를 우선합니다.</div>
              <div className="bd-list-item">과도한 자극보다 오래 참고할 수 있는 정보를 지향합니다.</div>
              <div className="bd-list-item">특정 종목이나 상품의 매수·매도를 직접 권유하지 않습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">참고 및 면책 안내</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">
              BlueDino의 계산 결과와 정보 콘텐츠는 이해를 돕기 위한 참고 자료입니다.
            </div>
            <div className="bd-list-item">
              세금, 제도, 계좌 혜택, 투자 수익률은 개인 상황과 정책 변경에 따라 실제와 차이가 발생할 수 있습니다.
            </div>
            <div className="bd-list-item">
              중요한 의사결정 전에는 금융회사, 세무 전문가, 공공기관의 최신 안내를 함께 확인하는 것을 권장합니다.
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">사이트 신뢰 구조</h2>
          <p className="bd-text-sub mt-4">
            방문자가 사이트 운영 목적과 기준을 쉽게 확인할 수 있도록 정책 페이지와
            문의 페이지를 함께 운영하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/contact" className="bd-button-primary">
              문의 페이지 보기
            </Link>
            <Link href="/info/etc/privacy" className="bd-button-secondary">
              개인정보처리방침
            </Link>
            <Link href="/info/etc/terms" className="bd-button-secondary">
              이용약관
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
