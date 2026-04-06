import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | BlueDino",
  description:
    "BlueDino 이용 전 확인해야 할 서비스 성격, 정보 이용 범위, 책임 제한, 정책 변경 기준을 정리한 이용약관입니다.",
  alternates: { canonical: "/info/etc/terms" },
};

const sections = [
  {
    title: "1. 서비스 성격",
    body:
      "BlueDino는 투자 계산기와 금융 가이드를 제공하는 참고용 정보 서비스입니다. 특정 금융상품의 가입, 특정 종목의 매수·매도를 직접 권유하는 서비스를 제공하지 않습니다.",
  },
  {
    title: "2. 정보 이용 범위",
    body:
      "사이트에 제공되는 설명, 계산 결과, 비교 문단, FAQ는 일반적인 이해를 돕기 위한 자료입니다. 개인의 소득, 자산, 세율, 대출 심사, 거주 형태, 연령 조건 등에 따라 실제 적용 결과는 달라질 수 있습니다.",
  },
  {
    title: "3. 정확성과 최신성",
    body:
      "운영자는 정보의 정확성과 가독성을 높이기 위해 노력하지만, 법령·세제·대출 규제·상품 조건은 언제든 바뀔 수 있습니다. 최종 결정 전에는 반드시 공식 자료와 금융회사 안내를 별도로 확인해야 합니다.",
  },
  {
    title: "4. 계산기 결과의 한계",
    body:
      "계산기 결과는 입력값 기반 시뮬레이션이며, 실제 거래 비용, 환율 변동, 세부 공제 조건, 개인별 심사 기준을 완벽하게 반영하지 못할 수 있습니다. 결과는 빠른 판단 보조용으로만 사용해야 합니다.",
  },
  {
    title: "5. 책임의 한계",
    body:
      "이용자가 BlueDino의 정보를 참고해 내린 투자, 대출, 절세, 매수·매도, 자산배분, 계약 관련 의사결정의 결과는 이용자 본인의 책임입니다. 운영자는 참고 정보 제공 범위를 넘어서는 개별 결과를 보장하지 않습니다.",
  },
  {
    title: "6. 서비스 변경과 업데이트",
    body:
      "운영자는 서비스 품질 개선을 위해 페이지 구성, 계산기 입력 항목, 설명 문구, 링크 구조를 사전 고지 없이 변경할 수 있습니다. 다만 정책 문서 성격의 변경은 가능한 범위에서 페이지 내에 반영합니다.",
  },
  {
    title: "7. 외부 링크와 제3자 서비스",
    body:
      "사이트 내에는 외부 링크, 광고, 임베드 콘텐츠, 분석 도구가 포함될 수 있습니다. 외부 페이지로 이동한 이후의 정책과 처리 방식은 해당 서비스 제공자의 기준이 적용됩니다.",
  },
  {
    title: "8. 문의 및 고지",
    body:
      "이용약관 관련 문의나 정책 관련 의견은 문의 페이지 또는 공개된 연락처를 통해 전달할 수 있습니다.",
  },
];

export default function TermsPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Terms of Service</span>
          <h1 className="bd-title-lg mt-4">이용약관</h1>
          <p className="bd-text-main mt-4">
            본 약관은 BlueDino가 어떤 성격의 서비스인지, 방문자가 어떤 범위에서 정보를 활용해야 하는지,
            그리고 운영자가 어디까지 책임을 지는지 명확하게 안내하기 위해 마련되었습니다.
          </p>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{section.title}</h2>
            <p className="bd-text-sub mt-4">{section.body}</p>
          </section>
        ))}

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">시행일</h2>
          <p className="bd-text-main mt-4">본 이용약관은 2026년 4월 6일부터 적용됩니다.</p>
        </section>
      </div>
    </div>
  );
}
