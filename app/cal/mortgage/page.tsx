import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import MortgageCalculatorClient from "./MortgageCalculatorClient";

export const metadata: Metadata = {
  title: "주담대 계산기 | 주택담보대출 상환 계산 | BlueDino",
  description:
    "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
  keywords: ["주담대 계산기", "주택담보대출 계산기", "주담대 월 상환액", "주담대 총이자", "내 집 마련 계산기", "BlueDino"],
  alternates: { canonical: "/cal/mortgage" },
  openGraph: {
    title: "주담대 계산기 | 주택담보대출 상환 계산 | BlueDino",
    description:
      "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
    url: "https://bluedino.kr/cal/mortgage",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "주담대 계산기 | 주택담보대출 한도·월상환 계산 | BlueDino",
    description:
      "주택가격, 자기자본, 금리, 기간을 넣으면 주담대 한도와 월 상환액, 총이자, DSR 추정치를 한 번에 확인할 수 있는 주담대 계산기입니다.",
  },
};

const landingData = getCalculatorLandingData("mortgage");
const faqStructuredData = buildCalculatorFaqSchema("mortgage");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "주담대 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "주택 가격, 보유 자금, 대출 금리와 기간을 입력하면 주담대 월 상환액과 총이자, 자기자본 규모를 함께 볼 수 있는 주담대 계산기입니다.",
  url: "https://bluedino.kr/cal/mortgage",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "주택담보대출 계산기", item: "https://bluedino.kr/cal/mortgage" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="mortgage-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="주담대-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="mortgage-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MortgageCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="제도 기준 반영"
        basisLabel="기준: 2026년 5월 현재 공개 대출 규제와 입력값 기준"
        officialSources={[{ label: "금융위원회 주택담보대출 제도 안내", href: "https://www.fsc.go.kr" }, { label: "금융감독원 대출 안내", href: "https://www.fss.or.kr" }, { label: "취급 금융회사 대출 상품 설명서", href: "https://portal.kfb.or.kr" }]}
        relatedCalculators={[{ label: "DSR 계산기", href: "/cal/dsr", description: "상환 부담이 소득 대비 적정한지 확인할 수 있습니다." }, { label: "LTV 계산기", href: "/cal/ltv", description: "담보가치 기준 대출 비율을 비교할 수 있습니다." }, { label: "중도상환수수료 계산기", href: "/cal/prepayment-fee", description: "대출 갈아타기나 조기상환 비용을 계산할 수 있습니다." }]}
        caution="주담대 실제 한도와 금리는 개인 신용도, 규제지역, 금융회사 심사, 우대금리 충족 여부에 따라 달라질 수 있습니다."
      />
      <CalculatorResultSeoNote calculator="mortgage" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-04-27" />
    </>
  );
}