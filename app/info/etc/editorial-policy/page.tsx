import Link from "next/link";

export default function EditorialPolicyPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">도움말 안내</span>
          <h1 className="bd-title-lg mt-4">BlueDino는 이런 분들을 위한 사이트입니다</h1>
          <p className="bd-text-main mt-4">
            BlueDino는 금융 정보를 어렵게 느끼는 사용자도 숫자와 개념을 함께 이해할 수 있도록 만든 사이트입니다.
            단순히 계산 결과만 보여주는 데서 끝나지 않고, 그 숫자를 어떻게 읽고 어디에 활용하면 좋은지까지 이어서 설명합니다.
          </p>
          <p className="bd-text-sub mt-3">
            절세계좌, 배당, 복리, 연봉 실수령액, 대출 같은 주제는 처음 접하면 용어가 복잡하고 서로 연결되는 부분도 많습니다.
            그래서 BlueDino는 계산기와 가이드, 질문형 문서를 함께 제공해 한 번에 이해할 수 있도록 구성하고 있습니다.
          </p>
        </section>

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">이런 분들에게 도움이 됩니다</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">투자를 막 시작했지만 계좌, 세금, 수익률 개념이 헷갈리는 분</div>
              <div className="bd-list-item">내 소득과 대출 부담을 숫자로 먼저 확인하고 싶은 분</div>
              <div className="bd-list-item">배당과 복리, 연금과 절세를 하나의 흐름으로 이해하고 싶은 분</div>
              <div className="bd-list-item">복잡한 금융 정보를 짧고 쉽게 정리해서 보고 싶은 분</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">사이트에서 할 수 있는 것</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">계산기로 월 상환액, 세후 수익, 장기 복리 효과를 직접 확인할 수 있습니다.</div>
              <div className="bd-list-item">금융 가이드에서 계좌별 차이와 활용 포인트를 빠르게 정리할 수 있습니다.</div>
              <div className="bd-list-item">자주 묻는 질문을 통해 실제로 많이 막히는 부분을 바로 확인할 수 있습니다.</div>
              <div className="bd-list-item">관련 계산기와 가이드를 이어보며 다음 단계까지 자연스럽게 살펴볼 수 있습니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이렇게 활용하면 더 편합니다</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">먼저 가이드에서 개념을 익히고, 계산기에서 본인 숫자를 넣어보세요.</div>
            <div className="bd-list-item">결과가 낯설면 FAQ와 함께 보면 좋은 페이지를 순서대로 확인해 보세요.</div>
            <div className="bd-list-item">세금, 대출, 제도 정보는 바뀔 수 있으므로 중요한 결정 전에는 공식 안내도 함께 확인하세요.</div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/about" className="bd-button-primary">소개 보기</Link>
            <Link href="/info/etc/methodology" className="bd-button-secondary">이용 안내 보기</Link>
            <Link href="/info/etc/contact" className="bd-button-secondary">문의하기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
