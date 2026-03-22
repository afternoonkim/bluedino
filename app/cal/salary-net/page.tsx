import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import SalaryNetCalculatorClient from "./SalaryNetCalculatorClient";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 | 세후 월급 계산 | BlueDino",
  description:
    "연봉을 입력하면 세금과 4대 보험을 제외한 실제 실수령액을 계산할 수 있는 연봉 실수령액 계산기입니다. 월 실수령액과 연간 공제액을 한눈에 확인할 수 있습니다.",
  keywords: ["연봉 실수령액 계산기",
    "세후 월급 계산기",
    "월급 실수령액 계산",
    "salary calculator",
    "연봉 계산기",
    "BlueDino"],
  alternates: {
    canonical: "/cal/salary-net",
  },
  openGraph: {
    title: "연봉 실수령액 계산기 | 세후 월급 계산 | BlueDino",
    description:
      "연봉을 입력하면 세금과 4대 보험을 제외한 실제 실수령액을 계산할 수 있는 연봉 실수령액 계산기입니다. 월 실수령액과 연간 공제액을 한눈에 확인할 수 있습니다.",
    url: "https://bluedino.kr/cal/salary-net",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "연봉 실수령액 계산기 | 세후 월급 계산 | BlueDino",
    description:
      "연봉을 입력하면 세금과 4대 보험을 제외한 실제 실수령액을 계산할 수 있는 연봉 실수령액 계산기입니다. 월 실수령액과 연간 공제액을 한눈에 확인할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("salary-net");
const faqStructuredData = buildCalculatorFaqSchema("salary-net");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "연봉 실수령액 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "연봉을 입력하면 세금과 4대 보험을 제외한 실제 실수령액을 계산할 수 있는 연봉 실수령액 계산기입니다. 월 실수령액과 연간 공제액을 한눈에 확인할 수 있습니다.",
  url: "https://bluedino.kr/cal/salary-net",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="salary-net-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="연봉-실수령액-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SalaryNetCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}