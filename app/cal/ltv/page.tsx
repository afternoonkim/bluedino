import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import LtvCalculatorClient from "./LtvCalculatorClient";

export const metadata: Metadata = {
  title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
  description:
    "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
  keywords: ["LTV 계산기", "담보인정비율", "주택담보대출 계산", "주담대 한도", "필요 자기자본", "BlueDino"],
  alternates: { canonical: "/cal/ltv" },
  openGraph: {
    title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
    description:
      "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
    url: "https://bluedino.kr/cal/ltv",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
    description:
      "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
  },
};

const landingData = getCalculatorLandingData("ltv");
const faqStructuredData = buildCalculatorFaqSchema("ltv");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LTV 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "주택 가격과 보유 자금, 기존 담보대출을 입력하면 LTV를 계산하고 필요한 자기자본 규모를 확인할 수 있는 LTV 계산기입니다.",
  url: "https://bluedino.kr/cal/ltv",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "LTV 계산기", item: "https://bluedino.kr/cal/ltv" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="ltv-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="ltv-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="ltv-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LtvCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="제도 기준 반영"
        basisLabel="기준: 2026년 5월 현재 공개 대출 규제와 입력값 기준"
        officialSources={[{ label: "금융위원회 주택담보대출 제도 안내", href: "https://www.fsc.go.kr" }, { label: "금융감독원 금융소비자 정보", href: "https://www.fss.or.kr" }, { label: "국토교통부 부동산 정책 자료", href: "https://www.molit.go.kr" }]}
        relatedCalculators={[{ label: "DSR 계산기", href: "/cal/dsr", description: "소득 기준 상환 여력을 함께 점검할 수 있습니다." }, { label: "주담대 계산기", href: "/cal/mortgage", description: "LTV와 월 상환액을 한 번에 이어서 볼 수 있습니다." }, { label: "주택 구매 가능 금액 계산기", href: "/cal/home-affordability", description: "부대비용과 현금 여력을 함께 계산할 수 있습니다." }]}
        caution="LTV는 규제지역, 주택 수, 대출 목적, 금융회사 심사 기준에 따라 실제 적용 한도가 달라질 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="ltv" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}