import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import CompoundCalculatorClient from "./CompoundCalculatorClient";

export const metadata: Metadata = {
  title: "복리 계산기 | 투자 복리 수익 계산 | BlueDino",
  description:
    "투자 금액과 기간, 수익률을 입력하면 복리 투자 결과를 계산할 수 있는 복리 계산기입니다. 장기 투자와 적립식 투자 시뮬레이션에 활용할 수 있습니다.",
  keywords: ["복리 계산기",
    "투자 복리 계산",
    "복리 수익 계산",
    "compound interest calculator",
    "적립식 투자 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/compound",
  },
  openGraph: {
    title: "복리 계산기 | 투자 복리 수익 계산 | BlueDino",
    description:
      "투자 금액과 기간, 수익률을 입력하면 복리 투자 결과를 계산할 수 있는 복리 계산기입니다. 장기 투자와 적립식 투자 시뮬레이션에 활용할 수 있습니다.",
    url: "https://bluedino.kr/cal/compound",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "복리 계산기 | 투자 복리 수익 계산 | BlueDino",
    description:
      "투자 금액과 기간, 수익률을 입력하면 복리 투자 결과를 계산할 수 있는 복리 계산기입니다. 장기 투자와 적립식 투자 시뮬레이션에 활용할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("compound");
const faqStructuredData = buildCalculatorFaqSchema("compound");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "복리 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "투자 금액과 기간, 수익률을 입력하면 복리 투자 결과를 계산할 수 있는 복리 계산기입니다. 장기 투자와 적립식 투자 시뮬레이션에 활용할 수 있습니다.",
  url: "https://bluedino.kr/cal/compound",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="compound-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="복리-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CompoundCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}