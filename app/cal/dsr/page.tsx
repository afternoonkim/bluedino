import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "DSR 계산기", item: "https://bluedino.kr/cal/dsr" },
  ],
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
      <Script
        id="dsr-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DsrCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="제도 기준 반영"
        basisLabel="기준: 2026년 5월 현재 공개 대출 규제와 입력값 기준"
        officialSources={[{ label: "금융위원회 가계대출·DSR 제도 안내", href: "https://www.fsc.go.kr" }, { label: "금융감독원 금융소비자 정보", href: "https://www.fss.or.kr" }, { label: "취급 금융회사 대출 심사 기준", href: "https://portal.kfb.or.kr" }]}
        relatedCalculators={[{ label: "LTV 계산기", href: "/cal/ltv", description: "담보가치 기준 대출 가능 금액을 함께 확인할 수 있습니다." }, { label: "주담대 계산기", href: "/cal/mortgage", description: "월 상환액과 DSR 부담을 함께 볼 수 있습니다." }, { label: "대출이자 계산기", href: "/cal/loan-interest", description: "대출 조건별 상환액을 상세히 확인할 수 있습니다." }]}
        caution="DSR은 금융회사 심사 기준, 금리 스트레스 적용, 대출 종류, 소득 인정 방식에 따라 실제 한도와 차이가 날 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="dsr" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}