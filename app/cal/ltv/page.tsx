import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import LtvCalculatorClient from "./LtvCalculatorClient";

export const metadata: Metadata = {
  title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
  description:
    "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
  keywords: ["LTV 계산기", "담보인정비율", "주택담보대출 계산", "주담대 한도", "필요 자기자본", "BlueDino"],
  alternates: { canonical: "/cal/ltv" },
  openGraph: {
    title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
    description:
      "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
    url: "https://bluedino.kr/cal/ltv",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const landingData = getCalculatorLandingData("ltv");
const faqStructuredData = buildCalculatorFaqSchema("ltv");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LTV 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
  url: "https://bluedino.kr/cal/ltv",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="ltv-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="ltv-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LtvCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}