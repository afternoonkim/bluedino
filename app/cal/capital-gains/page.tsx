import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import CapitalGainsCalculatorClient from "./CapitalGainsCalculatorClient";

export const metadata: Metadata = {
  title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
  description:
    "해외주식 매매 시 발생하는 양도소득세를 계산할 수 있는 해외주식 양도세 계산기입니다. 매수·매도 금액과 수수료, 환율을 반영해 예상 세금을 확인할 수 있습니다.",
  keywords: ["해외주식 양도세 계산기",
    "양도소득세 계산기",
    "해외주식 세금 계산",
    "capital gains tax calculator",
    "주식 양도세 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/capital-gains",
  },
  openGraph: {
    title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
    description:
      "해외주식 매매 시 발생하는 양도소득세를 계산할 수 있는 해외주식 양도세 계산기입니다. 매수·매도 금액과 수수료, 환율을 반영해 예상 세금을 확인할 수 있습니다.",
    url: "https://bluedino.kr/cal/capital-gains",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
    description:
      "해외주식 매매 시 발생하는 양도소득세를 계산할 수 있는 해외주식 양도세 계산기입니다. 매수·매도 금액과 수수료, 환율을 반영해 예상 세금을 확인할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("capital-gains");
const faqStructuredData = buildCalculatorFaqSchema("capital-gains");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "해외주식 양도세 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "해외주식 매매 시 발생하는 양도소득세를 계산할 수 있는 해외주식 양도세 계산기입니다. 매수·매도 금액과 수수료, 환율을 반영해 예상 세금을 확인할 수 있습니다.",
  url: "https://bluedino.kr/cal/capital-gains",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="capital-gains-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="해외주식-양도세-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CapitalGainsCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}