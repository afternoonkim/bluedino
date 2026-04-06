import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Contact</span>
          <h1 className="bd-title-lg mt-4">문의하기</h1>
          <p className="bd-text-main mt-4">
            BlueDino 이용 중 오류, 계산기 동작 문제, 콘텐츠 제안, 잘못 보이는 설명이 있다면 아래 기준에 맞춰 연락해 주세요.
            방문자 의견은 계산기 개선과 가이드 보강 우선순위를 정하는 데 활용합니다.
          </p>
          <p className="bd-text-sub mt-3">
            현재는 회원 문의 시스템 대신 이메일 방식으로 운영하고 있으며, 내용 확인 후 필요한 경우 순차적으로 반영합니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이런 문의를 받습니다</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">서비스 오류 제보: 어떤 페이지에서 어떤 문제가 발생했는지, 입력값과 함께 적어 주세요.</div>
            <div className="bd-list-item">콘텐츠 수정 제안: 제도 설명이나 문장이 헷갈리는 부분이 있다면 해당 URL과 함께 보내 주세요.</div>
            <div className="bd-list-item">새 기능 제안: 필요한 계산기나 허브 페이지 주제가 있다면 사용 목적까지 적어 주세요.</div>
            <div className="bd-list-item">협업 문의: 간단한 소개와 목적을 함께 보내 주시면 확인에 도움이 됩니다.</div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">문의 전에 같이 보면 좋은 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/about" className="bd-button-secondary">
              소개 보기
            </Link>
            <Link href="/info/etc/editorial-policy" className="bd-button-secondary">
              사이트 이용 대상 보기
            </Link>
            <Link href="/info/etc/methodology" className="bd-button-secondary">
              이용 안내 보기
            </Link>
            <Link href="/info/etc/privacy" className="bd-button-secondary">
              개인정보처리방침
            </Link>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">연락처</h2>
          <div className="space-y-3 mt-4">
            <p className="bd-text-main">
              이메일: <span className="font-semibold text-cyan-300">afternoonkim93@gmail.com</span>
            </p>
            <p className="bd-text-sub">
              가능하면 제목에 문의 유형을 함께 적어 주세요. 예: [오류 제보], [콘텐츠 수정], [기능 제안]
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
