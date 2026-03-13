export default function TermsPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Terms of Service</span>
          <h1 className="bd-title-lg mt-4">이용약관</h1>
          <p className="bd-text-main mt-4">
            BlueDino는 투자 정보와 계산 도구를 제공하는 참고용 서비스입니다.
          </p>
          <p className="bd-text-sub mt-3">
            사이트 이용 전 아래 기본 사항을 확인해 주세요.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <div className="space-y-6">
            <div>
              <h2 className="bd-title-md">1. 서비스 성격</h2>
              <p className="bd-text-sub mt-3">
                BlueDino에서 제공하는 정보와 계산 결과는 일반적인 참고 자료이며,
                특정 투자 판단이나 매매를 직접 권유하는 것이 아닙니다.
              </p>
            </div>

            <div className="bd-divider" />

            <div>
              <h2 className="bd-title-md">2. 정보의 정확성</h2>
              <p className="bd-text-sub mt-3">
                제공되는 정보는 정확성을 높이기 위해 노력하지만, 일부 데이터는
                지연되거나 변경될 수 있습니다. 최종 판단 전 반드시 공식 자료를
                함께 확인해야 합니다.
              </p>
            </div>

            <div className="bd-divider" />

            <div>
              <h2 className="bd-title-md">3. 책임의 한계</h2>
              <p className="bd-text-sub mt-3">
                사이트 이용자가 제공 정보를 바탕으로 내린 의사결정의 결과에
                대해서는 이용자 본인의 책임이 따릅니다.
              </p>
            </div>

            <div className="bd-divider" />

            <div>
              <h2 className="bd-title-md">4. 서비스 변경</h2>
              <p className="bd-text-sub mt-3">
                BlueDino는 서비스 개선을 위해 일부 기능, 구성, 제공 범위를 사전
                공지 없이 변경할 수 있습니다.
              </p>
            </div>

            <div className="bd-divider" />

            <div>
              <h2 className="bd-title-md">5. 문의</h2>
              <p className="bd-text-sub mt-3">
                서비스 이용과 관련한 문의는 별도의 문의 페이지를 통해 전달할 수
                있습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}