import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import FireCalculatorClient from "./FireCalculatorClient";

export const metadata: Metadata = {
  title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
  description:
    "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  keywords: ["FIRE 계산기",
    "경제적 자유 계산기",
    "조기 은퇴 계산기",
    "early retirement calculator",
    "은퇴 자금 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/fire",
  },
  openGraph: {
    title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
    description:
      "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
    url: "https://bluedino.kr/cal/fire",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
    description:
      "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("fire");
const faqStructuredData = buildCalculatorFaqSchema("fire");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FIRE 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  url: "https://bluedino.kr/cal/fire",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "FIRE 계산기", item: "https://bluedino.kr/cal/fire" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="fire-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="FIRE-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="fire-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FireCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="참고 시뮬레이션"
        basisLabel="기준: 입력한 수익률·저축률·생활비 가정 기준"
        officialSources={[{ label: "금융감독원 통합연금포털", href: "https://100lifeplan.fss.or.kr" }, { label: "국세청 금융소득·연금 과세 안내", href: "https://www.nts.go.kr" }, { label: "국민연금공단 노후준비 자료", href: "https://www.nps.or.kr" }]}
        relatedCalculators={[
          { label: "복리 계산기", href: "/cal/compound", description: "은퇴 목표자산까지 누적되는 자산 흐름을 확인합니다." },
          { label: "배당 계산기", href: "/cal/calculator", description: "은퇴 후 현금흐름을 배당 기준으로 점검합니다." },
          { label: "연봉 실수령액 계산기", href: "/cal/salary-net", description: "현재 저축 가능 금액을 현실적으로 다시 계산합니다." },
        ]}
        caution="FIRE 계산은 장기 수익률과 지출 가정에 크게 좌우됩니다. 실제 은퇴 판단 전에는 세금, 건강보험료, 주거비, 가족 상황, 시장 변동성을 함께 검토해 주세요."
      />
      <CalculatorResultSeoNote calculator="fire" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}