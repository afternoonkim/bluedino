import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import LoanInterestCalculatorClient from "./LoanInterestCalculatorClient";

export const metadata: Metadata = {
  title: "대출이자 계산기 | 월 상환액·총이자 계산 | BlueDino",
  description:
    "대출금액, 금리, 기간, 상환방식을 입력하면 월 상환액과 총이자, 상환 스케줄을 확인할 수 있는 대출이자 계산기입니다.",
  keywords: ["대출이자 계산기", "원리금균등 계산기", "원금균등 계산기", "월 상환액 계산", "총이자 계산", "BlueDino"],
  alternates: { canonical: "/cal/loan-interest" },
  openGraph: {
    title: "대출이자 계산기 | 월 상환액·총이자 계산 | BlueDino",
    description:
      "대출금액, 금리, 기간, 상환방식을 입력하면 월 상환액과 총이자, 상환 스케줄을 확인할 수 있는 대출이자 계산기입니다.",
    url: "https://bluedino.kr/cal/loan-interest",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "대출이자 계산기 | 월 상환액·총이자 계산 | BlueDino",
    description:
      "대출금액, 금리, 기간, 상환방식을 입력하면 월 상환액과 총이자, 상환 스케줄을 확인할 수 있는 대출이자 계산기입니다.",
  },
};

const landingData = getCalculatorLandingData("loan-interest");
const faqStructuredData = buildCalculatorFaqSchema("loan-interest");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "대출이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "대출금액, 금리, 기간, 상환방식을 입력하면 월 상환액과 총이자, 상환 스케줄을 확인할 수 있는 대출이자 계산기입니다.",
  url: "https://bluedino.kr/cal/loan-interest",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "대출이자 계산기", item: "https://bluedino.kr/cal/loan-interest" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="loan-interest-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="대출이자-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="loan-interest-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LoanInterestCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="공식 산식 기반"
        basisLabel="기준: 입력한 대출금·금리·기간·상환방식 기준"
        officialSources={["금융감독원 대출 상환 안내", "취급 금융회사 대출 상품 설명서"]}
        relatedCalculators={[{ label: "주담대 계산기", href: "/cal/mortgage", description: "주택담보대출 조건을 함께 확인할 수 있습니다." }, { label: "중도상환수수료 계산기", href: "/cal/prepayment-fee", description: "일부 상환이나 조기상환 비용을 계산할 수 있습니다." }, { label: "DSR 계산기", href: "/cal/dsr", description: "대출 상환액이 소득 대비 적정한지 점검할 수 있습니다." }]}
        caution="대출이자는 금리 변동, 거치기간, 우대금리, 상환일 계산 방식에 따라 실제 납부액과 차이가 날 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="loan-interest" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}