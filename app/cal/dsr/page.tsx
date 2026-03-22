import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import DsrCalculatorClient from "./DsrCalculatorClient";

export const metadata: Metadata = {
  title: "DSR 계산기 | 총부채원리금상환비율 계산 | BlueDino",
  description:
    "연 소득과 기존 대출, 신규 대출 정보를 입력하면 DSR을 계산하고 추가 대출 가능 여력을 확인할 수 있는 DSR 계산기입니다.",
  keywords: ["DSR 계산기", "총부채원리금상환비율", "대출 한도 계산", "대출 가능 금액", "주담대 DSR", "BlueDino"],
  alternates: { canonical: "/cal/dsr" },
  openGraph: {
    title: "DSR 계산기 | 총부채원리금상환비율 계산 | BlueDino",
    description:
      "연 소득과 기존 대출, 신규 대출 정보를 입력하면 DSR을 계산하고 추가 대출 가능 여력을 확인할 수 있는 DSR 계산기입니다.",
    url: "https://bluedino.kr/cal/dsr",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSR 계산기 | 총부채원리금상환비율 계산 | BlueDino",
    description:
      "연 소득과 기존 대출, 신규 대출 정보를 입력하면 DSR을 계산하고 추가 대출 가능 여력을 확인할 수 있는 DSR 계산기입니다.",
  },
};

const landingData = getCalculatorLandingData("dsr");
const faqStructuredData = buildCalculatorFaqSchema("dsr");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DSR 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "연 소득과 기존 대출, 신규 대출 정보를 입력하면 DSR을 계산하고 추가 대출 가능 여력을 확인할 수 있는 DSR 계산기입니다.",
  url: "https://bluedino.kr/cal/dsr",
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="dsr-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="dsr-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DsrCalculatorClient />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
    </>
  );
}