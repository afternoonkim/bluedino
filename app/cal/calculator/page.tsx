import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
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
      <CalculatorMetaSections
        accuracyLevel="참고 시뮬레이션"
        basisLabel="기준: 입력한 배당수익률·성장률·세율 가정 기준"
        officialSources={[{ label: "전자공시시스템 배당 공시", href: "https://dart.fss.or.kr" }, { label: "국세청 배당소득 과세 안내", href: "https://www.nts.go.kr" }, { label: "금융투자협회 금융투자상품 안내", href: "https://www.kofia.or.kr" }]}
        relatedCalculators={[
          { label: "복리 계산기", href: "/cal/compound", description: "배당 재투자와 적립식 투자 효과를 함께 비교합니다." },
          { label: "FIRE 계산기", href: "/cal/fire", description: "배당 현금흐름을 경제적 자유 목표와 연결합니다." },
          { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings", description: "배당·이자 수익의 세후 차이를 확인합니다." },
        ]}
        caution="배당금은 기업의 이사회 결정, 환율, 세율, 배당락, 계좌 유형에 따라 달라질 수 있습니다. 계산 결과는 투자 판단을 위한 참고용으로 활용해 주세요."
      />
      <CalculatorResultSeoNote calculator="dividend" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}