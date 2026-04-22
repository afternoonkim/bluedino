import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
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
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}