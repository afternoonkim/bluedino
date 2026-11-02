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
    "주택가격과 직접 선택한 LTV 비율로 추가 대출 여력을 비교합니다. 실제 주담대 한도에는 규제지역·주택가격별 금액 상한·DSR이 추가 적용될 수 있습니다.",
  keywords: ["LTV 계산기", "담보인정비율", "주택담보대출 계산", "주담대 한도", "필요 자기자본", "BlueDino"],
  alternates: { canonical: "/cal/ltv" },
  openGraph: {
    title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
    description:
      "주택가격과 직접 선택한 LTV 비율로 추가 대출 여력을 비교합니다. 실제 주담대 한도에는 규제지역·주택가격별 금액 상한·DSR이 추가 적용될 수 있습니다.",
    url: "https://bluedino.kr/cal/ltv",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LTV 계산기 | 담보인정비율 계산 | BlueDino",
    description:
      "주택가격과 직접 선택한 LTV 비율로 추가 대출 여력을 비교합니다. 실제 주담대 한도에는 규제지역·주택가격별 금액 상한·DSR이 추가 적용될 수 있습니다.",
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
    "주택가격과 직접 선택한 LTV 비율로 추가 대출 여력을 비교합니다. 실제 주담대 한도에는 규제지역·주택가격별 금액 상한·DSR이 추가 적용될 수 있습니다.",
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
        accuracyLevel="참고 시뮬레이션"
        basisLabel="2026년 11월 1일 확인한 금융위 공개 자료와 직접 선택한 LTV 가정 기준"
        officialSources={[{ label: "금융위원회 2025년 10월 주택가격별 대출한도·LTV 안내", href: "https://www.fsc.go.kr/no010101/85432" }, { label: "금융위원회 2026년 6월 규제지역 추가 지정 안내", href: "https://fsc.go.kr/po010102/87222" }, { label: "금융위원회 2025년 6월 생애최초 LTV 안내", href: "https://www.fsc.go.kr/no010101/84824" }]}
        relatedCalculators={[{ label: "DSR 계산기", href: "/cal/dsr", description: "소득 기준 상환 여력을 함께 점검할 수 있습니다." }, { label: "주담대 계산기", href: "/cal/mortgage", description: "LTV와 월 상환액을 한 번에 이어서 볼 수 있습니다." }, { label: "주택 구매 가능 금액 계산기", href: "/cal/home-affordability", description: "부대비용과 현금 여력을 함께 계산할 수 있습니다." }]}
        caution="초기 70%는 예시입니다. 지역·주택 수·생애최초 여부에 맞는 LTV를 직접 선택해야 하며, 주택가격별 대출 금액 상한·DSR·대출 취급 제한·선순위 채권은 이 계산기에 자동 반영되지 않습니다."
      />
      <CalculatorResultSeoNote calculator="ltv" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-11-02" />
    </>
  );
}