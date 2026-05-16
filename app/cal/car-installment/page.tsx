import type { Metadata } from "next";
import Script from "next/script";
import CarInstallmentClient from "./CarInstallmentClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/car-installment";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "자동차 할부 계산기 | BlueDino";
const pageDescription = "차량 가격·선수금·할부 금리·할부 개월로 월 할부금·총이자·총 상환액을 계산하는 BlueDino 자동차 할부 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["자동차 할부 계산기", "신차 할부 이자", "중고차 할부 계산", "자동차 캐피탈"],
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
  name: "자동차 할부 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "캐피탈 할부와 은행 자동차 대출 중 어느 쪽이 유리한가요?", answer: "은행 자동차 대출이 보통 금리가 낮지만 심사 기준이 까다롭고, 캐피탈 할부는 빠른 승인이 장점입니다. 본인 신용점수와 차량 가격에 따라 다르므로 두 곳 모두 견적을 받아보시는 것이 안전합니다." },
            { question: "선수금을 늘리면 얼마나 이득인가요?", answer: "선수금이 클수록 원금이 줄어 총이자가 비례 이상으로 감소합니다. 예: 4천만 원·5%·36개월에서 선수금 1천 → 2천으로 늘리면 총이자가 약 75만 원 줄어듭니다." },
            { question: "할부 중 차량 매각 가능한가요?", answer: "보통 잔액 일시 상환 후 매각이 가능합니다. 캐피탈사·은행마다 중도상환수수료 부과 여부가 다르므로 약정서 확인이 필요합니다." },
            { question: "리스와 할부 어느 쪽이 절세에 유리한가요?", answer: "법인·개인사업자는 리스가 비용 처리에 유리한 경우가 많고, 일반 직장인은 할부 또는 일시불이 일반적입니다. 차량 사용 형태와 세무 처리 방식을 함께 고려하세요." },
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
    { "@type": "ListItem", position: 3, name: "자동차 할부 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="car-installment-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="car-installment-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="car-installment-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`자동차 할부 계산기`}
        hero={`신차·중고차 구매 시 차량 가격·선수금·할부 금리·기간을 입력하면 매월 부담할 할부금과 총이자, 총 상환액을 한 번에 확인합니다.`}
        calcChildren={<CarInstallmentClient />}
        whenToUse={[
            "신차·중고차 구매 전 월 부담을 미리 알아볼 때",
            "현금 일시불 vs 할부 vs 리스 중 무엇이 본인 가계에 맞는지 비교할 때",
            "선수금 비율(20% vs 30% vs 50%)에 따라 월 부담 차이를 점검할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "할부 원금 = 차량 가격 - 선수금",
              "월 할부금 = 원리금균등 분할 PMT 공식: 원금 × 월금리 / (1 - (1 + 월금리)^(-개월수))",
              "총 상환액 = 월 할부금 × 개월수",
              "총 이자 = 총 상환액 - 할부 원금",
          ],
        } }
        examples={[
            { title: "예시 1 — 차량 4천·선수금 1천·5.0%·36개월", body: "할부 원금 3천만 원·월 할부금 약 89만 원·총 상환 약 3,224만 원·총 이자 약 224만 원." },
            { title: "예시 2 — 차량 4천·선수금 2천·5.0%·48개월", body: "할부 원금 2천만 원·월 할부금 약 46만 원·총 상환 약 2,210만 원·총 이자 약 210만 원. 선수금이 클수록 월 부담이 작아지고 총이자도 줄어듦." },
        ]}
        faqs={[
            { question: "캐피탈 할부와 은행 자동차 대출 중 어느 쪽이 유리한가요?", answer: "은행 자동차 대출이 보통 금리가 낮지만 심사 기준이 까다롭고, 캐피탈 할부는 빠른 승인이 장점입니다. 본인 신용점수와 차량 가격에 따라 다르므로 두 곳 모두 견적을 받아보시는 것이 안전합니다." },
            { question: "선수금을 늘리면 얼마나 이득인가요?", answer: "선수금이 클수록 원금이 줄어 총이자가 비례 이상으로 감소합니다. 예: 4천만 원·5%·36개월에서 선수금 1천 → 2천으로 늘리면 총이자가 약 75만 원 줄어듭니다." },
            { question: "할부 중 차량 매각 가능한가요?", answer: "보통 잔액 일시 상환 후 매각이 가능합니다. 캐피탈사·은행마다 중도상환수수료 부과 여부가 다르므로 약정서 확인이 필요합니다." },
            { question: "리스와 할부 어느 쪽이 절세에 유리한가요?", answer: "법인·개인사업자는 리스가 비용 처리에 유리한 경우가 많고, 일반 직장인은 할부 또는 일시불이 일반적입니다. 차량 사용 형태와 세무 처리 방식을 함께 고려하세요." },
        ]}
        relatedCalculators={[
            { label: "대출이자 계산기", href: "/cal/loan-interest" },
            { label: "신용카드 할부 이자 계산기", href: "/cal/credit-card-installment" },
            { label: "월 지출 예산 계산기", href: "/cal/monthly-budget" },
        ]}
        officialSources={["여신금융협회 자동차금융 안내", "카드사·캐피탈사 할부 상품 설명서"]}
        caution={`본 계산기는 원리금균등 분할 기준입니다. 실제 캐피탈·은행 상품은 거치 기간·중간 일시 상환·취득세·할인 조건에 따라 부담이 달라질 수 있어 견적 시 정확히 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="자동차 할부 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
