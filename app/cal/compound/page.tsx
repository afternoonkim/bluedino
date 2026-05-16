import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "복리 계산기", item: "https://bluedino.kr/cal/compound" },
  ],
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
      <Script
        id="compound-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CompoundCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="공식 산식 기반"
        basisLabel="기준: 입력한 원금·수익률·기간을 적용한 단순 복리 수식 기준"
        officialSources={["복리 수식과 입력값 기준", "금융상품별 실제 수익률·수수료·세금 안내"]}
        relatedCalculators={[{ label: "배당 계산기", href: "/cal/calculator", description: "배당 현금흐름과 장기 재투자 효과를 함께 볼 수 있습니다." }, { label: "FIRE 계산기", href: "/cal/fire", description: "복리 투자 결과를 은퇴 목표와 연결해 볼 수 있습니다." }, { label: "예금 이자 계산기", href: "/cal/deposit-interest", description: "확정금리 상품과 복리 투자 가정을 비교할 수 있습니다." }]}
        caution="복리 계산 결과는 입력한 수익률이 매년 동일하게 유지된다는 가정입니다. 실제 투자 수익률은 시장 상황에 따라 달라질 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="compound" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}