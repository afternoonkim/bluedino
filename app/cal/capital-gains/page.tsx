import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "양도소득세 계산기", item: "https://bluedino.kr/cal/capital-gains" },
  ],
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
      <Script
        id="capital-gains-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CapitalGainsCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="제도 기준 반영"
        basisLabel="기준: 2026년 5월 현재 공개 세법과 입력값 기준"
        officialSources={[{ label: "국세청 양도소득세 안내", href: "https://www.nts.go.kr" }, { label: "홈택스 세금 신고 안내", href: "https://www.hometax.go.kr" }, { label: "증권사 해외주식 거래·환전 수수료 안내", href: "https://www.kofia.or.kr" }]}
        relatedCalculators={[{ label: "배당 계산기", href: "/cal/calculator", description: "배당소득과 양도차익을 함께 점검할 수 있습니다." }, { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings", description: "국내 절세계좌 활용 가능성을 비교해 볼 수 있습니다." }, { label: "복리 계산기", href: "/cal/compound", description: "세후 수익을 장기 투자 결과로 이어서 계산할 수 있습니다." }]}
        caution="실제 양도세는 연간 전체 거래 내역, 환율 적용일, 수수료, 기본공제 적용 여부에 따라 달라질 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="capital-gains" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}