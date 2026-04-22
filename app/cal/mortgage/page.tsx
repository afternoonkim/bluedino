import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import MortgageCalculatorClient from "./MortgageCalculatorClient";

export const metadata: Metadata = {
  title: "주담대 계산기 | 주택담보대출 상환 계산 | BlueDino",
  description:
    "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
  keywords: ["주담대 계산기", "주택담보대출 계산기", "주담대 월 상환액", "주담대 총이자", "내 집 마련 계산기", "BlueDino"],
  alternates: { canonical: "/cal/mortgage" },
  openGraph: {
    title: "주담대 계산기 | 주택담보대출 상환 계산 | BlueDino",
    description:
      "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
    url: "https://bluedino.kr/cal/mortgage",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const landingData = getCalculatorLandingData("mortgage");
const faqStructuredData = buildCalculatorFaqSchema("mortgage");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "주담대 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
  url: "https://bluedino.kr/cal/mortgage",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "주택담보대출 계산기", item: "https://bluedino.kr/cal/mortgage" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="mortgage-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="주담대-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="mortgage-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MortgageCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}