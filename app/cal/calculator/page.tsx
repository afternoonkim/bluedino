import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import DividendCalculatorClient from "./DividendCalculatorClient";

export const metadata: Metadata = {
  title: "배당 계산기 | 배당 수익 계산기 | BlueDino",
  description:
    "주식 배당 수익을 계산할 수 있는 배당 계산기입니다. 보유 주식 수, 주가, 배당수익률을 기준으로 예상 배당금과 장기 투자 흐름을 확인할 수 있습니다.",
  keywords: ["배당 계산기",
    "배당 수익 계산기",
    "배당금 계산기",
    "dividend calculator",
    "배당 투자 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/calculator",
  },
  openGraph: {
    title: "배당 계산기 | 배당 수익 계산기 | BlueDino",
    description:
      "주식 배당 수익을 계산할 수 있는 배당 계산기입니다. 보유 주식 수, 주가, 배당수익률을 기준으로 예상 배당금과 장기 투자 흐름을 확인할 수 있습니다.",
    url: "https://bluedino.kr/cal/calculator",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "배당 계산기 | 배당 수익 계산기 | BlueDino",
    description:
      "주식 배당 수익을 계산할 수 있는 배당 계산기입니다. 보유 주식 수, 주가, 배당수익률을 기준으로 예상 배당금과 장기 투자 흐름을 확인할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("calculator");
const faqStructuredData = buildCalculatorFaqSchema("calculator");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "배당 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "주식 배당 수익을 계산할 수 있는 배당 계산기입니다. 보유 주식 수, 주가, 배당수익률을 기준으로 예상 배당금과 장기 투자 흐름을 확인할 수 있습니다.",
  url: "https://bluedino.kr/cal/calculator",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "종합 금융 계산기", item: "https://bluedino.kr/cal/calculator" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="calculator-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="배당-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="calculator-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DividendCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}