export default function ContactPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Contact</span>
          <h1 className="bd-title-lg mt-4">문의하기</h1>
          <p className="bd-text-main mt-4">
            BlueDino 이용 중 오류, 제안, 협업 문의가 있다면 아래 내용을 참고해
            연락해 주세요.
          </p>
          <p className="bd-text-sub mt-3">
            현재는 간단한 피드백과 서비스 개선 의견을 중심으로 확인하고 있으며,
            답변에는 다소 시간이 걸릴 수 있습니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">문의 안내</h2>

          <div className="bd-list mt-4">
            <div className="bd-list-item">
              서비스 오류 제보: 어떤 페이지에서 어떤 문제가 발생했는지 함께
              남겨 주세요.
            </div>
            <div className="bd-list-item">
              기능 제안: 필요한 계산기나 정보 페이지가 있다면 구체적으로 적어
              주세요.
            </div>
            <div className="bd-list-item">
              제휴 및 협업: 서비스 성격과 목적을 간단히 함께 보내 주세요.
            </div>
          </div>

          <div className="bd-divider my-6" />

          <div className="space-y-3">
            <p className="bd-text-main">
              이메일: <span className="font-semibold text-cyan-300">afternoonkim93@gmail.com</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}