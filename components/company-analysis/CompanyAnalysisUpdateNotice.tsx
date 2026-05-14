type CompanyAnalysisUpdateNoticeProps = {
  updatedAt: string;
};

function formatUpdatedMonth(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
  }).format(date);
}

export default function CompanyAnalysisUpdateNotice({ updatedAt }: CompanyAnalysisUpdateNoticeProps) {
  return (
    <section className="bd-card-soft bd-card-padding border-amber-400/20 bg-amber-400/5">
      <h2 className="bd-title-sm text-base font-semibold text-white">기업분석 확인 안내</h2>
      <p className="bd-text-main mt-3">
        최종 업데이트: {formatUpdatedMonth(updatedAt)}
      </p>
      <p className="bd-text-sub mt-3">
        기업 실적, 주가, 밸류에이션은 수시로 변동될 수 있으므로 투자 판단 전 최신 공시와 실적 자료를 함께 확인해 주세요.
      </p>
    </section>
  );
}
