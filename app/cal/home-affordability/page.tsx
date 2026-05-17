import type { Metadata } from "next";
import Script from "next/script";
import HomeAffordabilityClient from "./HomeAffordabilityClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/home-affordability";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "주택 구매 가능 금액 계산기 | BlueDino";
const pageDescription = "연 소득·보유 자금·DSR·LTV·금리·기간으로 매수 가능 주택가 상한과 월 상환액을 계산하는 BlueDino 주택 구매 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["주택 구매 가능 금액", "주담대 한도 계산", "DSR LTV 계산", "내 집 마련 자금"],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "주택 구매 가능 금액 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "DSR과 LTV 중 어느 쪽이 더 자주 한도를 묶나요?", answer: "보유 자금이 적고 연봉이 큰 경우 LTV가, 보유 자금이 많고 연봉이 평균적인 경우 DSR이 한도를 묶습니다. 본인 사례 기준으로 확인하시는 게 정확합니다." },
            { question: "정책상품(보금자리·디딤돌)을 활용하면 어떻게 달라지나요?", answer: "디딤돌·보금자리는 자격 조건이 맞으면 LTV·DSR 한도가 일반 시중은행보다 완화될 수 있고 금리도 1~2%p 낮습니다. 본인 자격 여부를 먼저 확인하세요." },
            { question: "기존 신용대출이 있으면 매수 가능 주택가가 줄어드나요?", answer: "네. 기존 신용대출·마이너스통장 한도가 DSR 산정에 포함되어 신규 주담대 한도가 줄어듭니다. 매수 전에 한도 정리 또는 일부 상환을 검토하세요." },
            { question: "취득세·등기비·이사비 같은 부대비용도 보유 자금에 포함시켜야 하나요?", answer: "네. 보통 주택가의 5~10%가 부대비용이므로 \"보유 자금\"에서 부대비용을 빼고 본 계산기에 입력하시는 게 부담을 줄일 수 있습니다." },
  ].map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "주택 구매 가능 금액 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="home-affordability-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="home-affordability-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="home-affordability-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`주택 구매 가능 금액 계산기`}
        hero={`연봉(DSR)과 보유 자금(LTV) 두 제약 조건을 동시에 적용해 본인이 매수 가능한 주택가 상한과 매월 상환 부담을 계산합니다.`}
        calcChildren={<HomeAffordabilityClient />}
        whenToUse={[
            "내 집 마련 자금 계획을 세우기 전 본인 매수 가능한 가격대를 파악할 때",
            "DSR과 LTV 중 어느 쪽이 본인 한도를 묶고 있는지 확인할 때",
            "연봉 인상 또는 추가 자기자본 마련 시 매수 가능 금액이 얼마나 늘어나는지 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "DSR 기반 최대 연 원리금 = 연 소득 × DSR 한도(%)",
              "DSR 기반 최대 대출 = 위 연 원리금에서 PMT 공식으로 역산한 대출 원금",
              "LTV 기반 최대 주택가 = 보유 자금 / (1 - LTV 한도%)",
              "최종 최대 대출 = MIN(DSR 기반, LTV 기반)",
              "매수 가능 주택가 = 보유 자금 + 최종 최대 대출",
          ],
        } }
        examples={[
            { title: "예시 1 — 연봉 6,000만·보유 1.5억·DSR 40%·LTV 70%·금리 4%·30년", body: "DSR 한도로 최대 약 5.0억 대출 가능, LTV 한도로 최대 3.5억 대출 가능 → LTV가 한도 → 최종 대출 3.5억·매수 가능 주택가 5억·월 상환 약 167만 원." },
            { title: "예시 2 — 연봉 8,000만·보유 3억·DSR 40%·LTV 70%·금리 4%·30년", body: "DSR 한도로 약 6.7억·LTV 한도로 약 7억 대출 가능 → DSR이 한도 → 최종 대출 6.7억·매수 가능 주택가 9.7억·월 상환 약 320만 원." },
        ]}
        faqs={[
            { question: "DSR과 LTV 중 어느 쪽이 더 자주 한도를 묶나요?", answer: "보유 자금이 적고 연봉이 큰 경우 LTV가, 보유 자금이 많고 연봉이 평균적인 경우 DSR이 한도를 묶습니다. 본인 사례 기준으로 확인하시는 게 정확합니다." },
            { question: "정책상품(보금자리·디딤돌)을 활용하면 어떻게 달라지나요?", answer: "디딤돌·보금자리는 자격 조건이 맞으면 LTV·DSR 한도가 일반 시중은행보다 완화될 수 있고 금리도 1~2%p 낮습니다. 본인 자격 여부를 먼저 확인하세요." },
            { question: "기존 신용대출이 있으면 매수 가능 주택가가 줄어드나요?", answer: "네. 기존 신용대출·마이너스통장 한도가 DSR 산정에 포함되어 신규 주담대 한도가 줄어듭니다. 매수 전에 한도 정리 또는 일부 상환을 검토하세요." },
            { question: "취득세·등기비·이사비 같은 부대비용도 보유 자금에 포함시켜야 하나요?", answer: "네. 보통 주택가의 5~10%가 부대비용이므로 \"보유 자금\"에서 부대비용을 빼고 본 계산기에 입력하시는 게 부담을 줄일 수 있습니다." },
        ]}
        relatedCalculators={[{ label: "DSR 계산기", href: "/cal/dsr" },
            { label: "LTV 계산기", href: "/cal/ltv" },
            { label: "주담대 계산기", href: "/cal/mortgage" },
            { label: "중도상환수수료 계산기", href: "/cal/prepayment-fee" },
        ]}
        officialSources={[{ label: "금융위원회 가계대출·DSR 제도 안내", href: "https://www.fsc.go.kr" }, { label: "금융감독원 금융상품 및 대출 안내", href: "https://www.fss.or.kr" }, { label: "국토교통부 주택 정책 자료", href: "https://www.molit.go.kr" }, { label: "한국부동산원 부동산 통계", href: "https://www.reb.or.kr" }]}
        caution={`DSR·LTV 한도는 규제지역·상품 종류·생애최초 여부에 따라 달라집니다. 정책상품 자격이 있으면 매수 가능 금액이 크게 늘 수 있으니 가입 전 본인 자격을 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="주택 구매 가능 금액 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
