import type { Metadata } from "next";
import Script from "next/script";
import ParkingAccountClient from "./ParkingAccountClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/parking-account";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "파킹통장 이자 계산기 | BlueDino";
const pageDescription = "예치금·우대 금리 적용 한도·연 금리·보유 기간으로 파킹통장 월 이자와 누적 이자를 계산하는 BlueDino 계산기. 한도 초과분 안내 포함.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["파킹통장 이자 계산기", "파킹통장 한도", "파킹통장 비교", "비상금 이자"],
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
  name: "파킹통장 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "파킹통장과 CMA 중 어느 게 좋나요?", answer: "예금자보호 측면에서 파킹통장(은행)이 더 명확합니다. CMA는 증권사 예치금이라 RP형의 경우 예금자보호 적용 방식이 다릅니다. 평상시 안전성 차이는 거의 없습니다." },
            { question: "파킹통장 한도를 초과하면 어떻게 되나요?", answer: "한도 초과분은 일반 입출금 금리(약 0.05~0.1%)가 적용되어 이자가 거의 없습니다. 한도가 큰 상품을 찾거나 여러 은행에 분산하시는 편이 효율적입니다." },
            { question: "우대 금리 조건은 보통 어떤 게 있나요?", answer: "월 이용 횟수·자동이체·신용카드 사용·다른 상품 가입 등이 일반적입니다. 우대 조건이 까다로우면 실효 금리가 광고보다 낮아질 수 있으니 가입 전 약관을 확인하세요." },
            { question: "이자는 언제 입금되나요?", answer: "보통 매월 같은 날 자동 입금됩니다. 일부 상품은 분기·반기 단위로 지급하기도 하므로 약관에서 \"이자 지급 주기\"를 확인하세요." },
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
    { "@type": "ListItem", position: 3, name: "파킹통장 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="parking-account-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="parking-account-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="parking-account-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`파킹통장 이자 계산기`}
        hero={`파킹통장의 우대 금리·한도·보유 기간을 반영해 매월 받는 이자와 총 누적 이자를 계산합니다. 한도 초과분은 일반 입출금 금리가 적용되어 우대 금리에 포함되지 않습니다.`}
        calcChildren={<ParkingAccountClient />}
        whenToUse={[
            "여러 파킹통장 상품을 비교해 본인 자금에 가장 유리한 곳을 고를 때",
            "비상금 보관 시 매월 받는 이자가 얼마인지 미리 알아볼 때",
            "한도가 큰 파킹통장 vs 분산 보관(여러 통장) 중 어느 쪽이 유리한지 점검할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "유효 예치금 = MIN(예치금, 한도)",
              "한도 초과분 = MAX(0, 예치금 - 한도) — 일반 입출금 금리(약 0.1%) 적용됨",
              "세전 이자 = 유효 예치금 × 연 금리 × (보유 개월수 / 12)",
              "월 평균 세후 이자 = (세전 이자 × (1 - 15.4%)) / 보유 개월수",
          ],
        } }
        examples={[
            { title: "예시 1 — 5천만 원·한도 5천·연 3.5%·12개월", body: "예치 전액이 우대 금리 한도 안 → 세전 175만 원·세금 27만 원·세후 약 148만 원. 월 평균 약 12만 원 입금." },
            { title: "예시 2 — 1억 원·한도 5천·연 4.0%·6개월", body: "한도 초과분 5천만 원은 우대 금리 적용 안 됨. 유효 5천만 원만 6개월 4.0%로 세전 100만 원·세후 약 85만 원. 큰 자금이라면 두 통장에 분산하는 게 유리." },
        ]}
        faqs={[
            { question: "파킹통장과 CMA 중 어느 게 좋나요?", answer: "예금자보호 측면에서 파킹통장(은행)이 더 명확합니다. CMA는 증권사 예치금이라 RP형의 경우 예금자보호 적용 방식이 다릅니다. 평상시 안전성 차이는 거의 없습니다." },
            { question: "파킹통장 한도를 초과하면 어떻게 되나요?", answer: "한도 초과분은 일반 입출금 금리(약 0.05~0.1%)가 적용되어 이자가 거의 없습니다. 한도가 큰 상품을 찾거나 여러 은행에 분산하시는 편이 효율적입니다." },
            { question: "우대 금리 조건은 보통 어떤 게 있나요?", answer: "월 이용 횟수·자동이체·신용카드 사용·다른 상품 가입 등이 일반적입니다. 우대 조건이 까다로우면 실효 금리가 광고보다 낮아질 수 있으니 가입 전 약관을 확인하세요." },
            { question: "이자는 언제 입금되나요?", answer: "보통 매월 같은 날 자동 입금됩니다. 일부 상품은 분기·반기 단위로 지급하기도 하므로 약관에서 \"이자 지급 주기\"를 확인하세요." },
        ]}
        relatedCalculators={[
            { label: "CMA 이자 계산기", href: "/cal/cma-interest" },
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "비상금 필요 금액 계산기", href: "/cal/emergency-fund" },
        ]}
        officialSources={["금융감독원 금융상품 안내", "예금보험공사 예금자보호 안내", "취급 금융회사 수시입출금 상품 설명서"]}
        caution={`파킹통장 금리와 우대 조건은 매월 변동됩니다. 가입 전 금융감독원 금융상품통합비교공시 또는 각 은행 상품 설명서에서 최신 정보를 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="파킹통장 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
