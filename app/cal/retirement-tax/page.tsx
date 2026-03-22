import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import RetirementTaxCalculatorClient from "./RetirementTaxCalculatorClient";

export const metadata: Metadata = {
  title: "퇴직소득세 계산기 | 퇴직금 세금 계산 | BlueDino",
  description:
    "퇴직금 수령 시 발생하는 퇴직소득세를 계산할 수 있는 퇴직소득세 계산기입니다. 근속연수와 퇴직급여를 기준으로 예상 세액을 확인할 수 있습니다.",
  keywords: ["퇴직소득세 계산기",
    "퇴직금 세금 계산",
    "퇴직소득 계산기",
    "retirement tax calculator",
    "퇴직금 실수령액 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/retirement-tax",
  },
  openGraph: {
    title: "퇴직소득세 계산기 | 퇴직금 세금 계산 | BlueDino",
    description:
      "퇴직금 수령 시 발생하는 퇴직소득세를 계산할 수 있는 퇴직소득세 계산기입니다. 근속연수와 퇴직급여를 기준으로 예상 세액을 확인할 수 있습니다.",
    url: "https://bluedino.kr/cal/retirement-tax",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "퇴직소득세 계산기 | 퇴직금 세금 계산 | BlueDino",
    description:
      "퇴직금 수령 시 발생하는 퇴직소득세를 계산할 수 있는 퇴직소득세 계산기입니다. 근속연수와 퇴직급여를 기준으로 예상 세액을 확인할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("retirement-tax");
const faqStructuredData = buildCalculatorFaqSchema("retirement-tax");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "퇴직소득세 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "퇴직금 수령 시 발생하는 퇴직소득세를 계산할 수 있는 퇴직소득세 계산기입니다. 근속연수와 퇴직급여를 기준으로 예상 세액을 확인할 수 있습니다.",
  url: "https://bluedino.kr/cal/retirement-tax",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="retirement-tax-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="퇴직소득세-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RetirementTaxCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}