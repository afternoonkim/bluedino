import type { Metadata } from "next";
import Script from "next/script";
import PrepaymentFeeClient from "./PrepaymentFeeClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/prepayment-fee";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "중도상환수수료 계산기 | BlueDino";
const pageDescription = "대출 잔액·최초 수수료율·경과 기간·면제 시점을 입력해 현시점 부담 수수료를 계산하는 BlueDino 중도상환수수료 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["중도상환수수료 계산기", "주담대 중도상환수수료", "대출 면제 시점", "조기 상환 수수료"],
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
  name: "중도상환수수료 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "중도상환수수료는 모든 대출에 있나요?", answer: "고정금리 상품에 주로 있고, 변동금리 상품 중에도 일부 부과됩니다. 정확한 약정 조건은 대출 계약서에서 확인하세요." },
            { question: "수수료 면제 시점 직전에 갈아타는 게 유리한가요?", answer: "면제 시점이 1~2개월 안이면 보통 기다리는 게 유리합니다. 단, 그동안의 이자 차이가 수수료보다 크다면 즉시 갈아타기도 합리적입니다. 갈아타기 절감 계산기로 비교해 보세요." },
            { question: "수수료가 슬라이딩이 아닌 정액 부과인 상품도 있나요?", answer: "네. 일부 상품은 약정 기간 내 일정한 비율(예: 1.2% 일괄)로 부과되거나 단계별 감액 구조를 가집니다. 본 계산기는 일반적인 슬라이딩 가정이므로 상품 약관과 함께 확인하세요." },
            { question: "신용대출 중도상환수수료는?", answer: "보통 0~2% 수준이고 1~2년 후 면제되는 경우가 많습니다. 마이너스통장은 수수료가 없는 경우가 일반적입니다." },
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
    { "@type": "ListItem", position: 3, name: "중도상환수수료 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="prepayment-fee-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="prepayment-fee-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="prepayment-fee-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`중도상환수수료 계산기`}
        hero={`주담대·신용대출의 중도상환수수료를 잔액과 경과 기간 기준으로 계산합니다. 보통 면제 시점에 가까울수록 수수료율이 줄어드는 슬라이딩 구조입니다.`}
        calcChildren={<PrepaymentFeeClient />}
        whenToUse={[
            "여유자금이 생겨 대출을 조기 상환할 때 수수료 부담을 미리 알아볼 때",
            "갈아타기 시점 결정 전에 수수료 면제 시점까지 남은 기간을 확인할 때",
            "주담대·신용대출의 약정 조건을 비교해 어느 쪽 상환이 유리한지 점검할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "면제까지 남은 기간 = MAX(0, 면제 시점 - 경과 기간)",
              "현재 적용 수수료율 = 최초 수수료율 × (면제까지 남은 기간 / 면제 시점) — 슬라이딩 방식 가정",
              "예상 수수료 = 중도상환금액 × 현재 적용 수수료율 / 100",
              "면제 시점 도달 후에는 수수료 0원",
          ],
        } }
        examples={[
            { title: "예시 1 — 주담대 3억·1.2%·경과 2년·면제 3년", body: "면제까지 1년 남음 → 현재 수수료율 약 0.4%·예상 수수료 120만 원. 1년 더 기다리면 면제." },
            { title: "예시 2 — 주담대 4억·1.5%·경과 3.5년·면제 3년", body: "이미 면제 시점 통과 → 수수료 0원. 갈아타기·일부 상환 자유롭게 가능." },
        ]}
        faqs={[
            { question: "중도상환수수료는 모든 대출에 있나요?", answer: "고정금리 상품에 주로 있고, 변동금리 상품 중에도 일부 부과됩니다. 정확한 약정 조건은 대출 계약서에서 확인하세요." },
            { question: "수수료 면제 시점 직전에 갈아타는 게 유리한가요?", answer: "면제 시점이 1~2개월 안이면 보통 기다리는 게 유리합니다. 단, 그동안의 이자 차이가 수수료보다 크다면 즉시 갈아타기도 합리적입니다. 갈아타기 절감 계산기로 비교해 보세요." },
            { question: "수수료가 슬라이딩이 아닌 정액 부과인 상품도 있나요?", answer: "네. 일부 상품은 약정 기간 내 일정한 비율(예: 1.2% 일괄)로 부과되거나 단계별 감액 구조를 가집니다. 본 계산기는 일반적인 슬라이딩 가정이므로 상품 약관과 함께 확인하세요." },
            { question: "신용대출 중도상환수수료는?", answer: "보통 0~2% 수준이고 1~2년 후 면제되는 경우가 많습니다. 마이너스통장은 수수료가 없는 경우가 일반적입니다." },
        ]}
        relatedCalculators={[{ label: "대출 갈아타기 절감 계산기", href: "/cal/loan-refinance-saving" },
            { label: "주담대 계산기", href: "/cal/mortgage" },
            { label: "대출이자 계산기", href: "/cal/loan-interest" },
            { label: "주택 구매 가능 금액 계산기", href: "/cal/home-affordability" },
        ]}
        officialSources={["금융감독원 대출 약정 및 중도상환수수료 안내", "취급 금융회사 대출 상품 설명서"]}
        caution={`중도상환수수료 부과 방식은 상품별로 다릅니다. 본 계산기는 일반적인 슬라이딩 차감 가정이므로 정확한 수수료는 대출 약정서 또는 은행 상담에서 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="중도상환수수료 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
