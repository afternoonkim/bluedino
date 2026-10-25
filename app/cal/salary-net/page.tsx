import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import CalculatorReferenceBox, { RelatedCalculatorLinks } from "../components/CalculatorReferenceBox";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import SalaryNetCalculatorClient from "./SalaryNetCalculatorClient";

export const metadata: Metadata = {
  title: "연봉 실수령액 간이 계산기 | 세후 월급 참고 계산 | BlueDino",
  description:
    "연봉과 비과세액을 입력해 예상 월급 실수령액을 확인하세요. 2026년 7월 국민연금 상·하한액과 보험료율을 반영한 간이 추정이며 실제 급여명세서와 다를 수 있습니다.",
  keywords: ["연봉 실수령액 계산기",
    "세후 월급 계산기",
    "월급 실수령액 계산",
    "salary calculator",
    "연봉 계산기",
    "BlueDino"],
  alternates: {
    canonical: "/cal/salary-net",
  },
  openGraph: {
    title: "연봉 실수령액 간이 계산기 | 세후 월급 참고 계산 | BlueDino",
    description:
      "연봉과 비과세액을 입력해 예상 월급 실수령액을 확인하세요. 2026년 7월 국민연금 상·하한액과 보험료율을 반영한 간이 추정이며 실제 급여명세서와 다를 수 있습니다.",
    url: "https://bluedino.kr/cal/salary-net",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "연봉 실수령액 간이 계산기 | 세후 월급 참고 계산 | BlueDino",
    description:
      "연봉과 비과세액을 입력해 예상 월급 실수령액을 확인하세요. 2026년 7월 국민연금 상·하한액과 보험료율을 반영한 간이 추정이며 실제 급여명세서와 다를 수 있습니다.",
  },
};

const landingData = getCalculatorLandingData("salary-net");
const faqStructuredData = buildCalculatorFaqSchema("salary-net");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "연봉 실수령액 간이 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "연봉과 비과세액을 입력해 예상 월급 실수령액을 확인하세요. 2026년 7월 국민연금 상·하한액과 보험료율을 반영한 간이 추정이며 실제 급여명세서와 다를 수 있습니다.",
  url: "https://bluedino.kr/cal/salary-net",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "연봉 실수령액 간이 계산기", item: "https://bluedino.kr/cal/salary-net" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="salary-net-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="연봉-실수령액-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="salary-net-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SalaryNetCalculatorClient />
      <CalculatorResultSeoNote calculator="salary-net" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <div className="bd-container-narrow bd-section">
        <RelatedCalculatorLinks links={[
          { label: "월 예산 계산기", href: "/cal/monthly-budget", description: "월급 실수령액을 기준으로 생활비와 저축 여력을 나눠볼 수 있습니다." },
          { label: "복리 계산기", href: "/cal/compound", description: "매월 투자 가능한 금액이 장기적으로 얼마나 커지는지 확인할 수 있습니다." },
          { label: "IRP 세액공제 계산기", href: "/cal/irp-tax-credit", description: "연말정산 절세 가능 금액을 함께 점검할 수 있습니다." },
          { label: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit", description: "연금계좌 납입액에 따른 세액공제 효과를 확인할 수 있습니다." },
        ]} />
        <CalculatorReferenceBox sources={[{ label: "국세청 근로소득세 안내", href: "https://www.nts.go.kr" }, { label: "국민건강보험공단 2026년 보험료율", href: "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html" }, { label: "국민연금공단 2026년 기준소득월액 안내", href: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do?menuId=MN24001113" }, { label: "근로복지공단 고용보험료 안내", href: "https://www.comwel.or.kr" }]} />
      </div>
      <PageTrustFooter pageKind="계산기" updatedAt="2026-10-25" />
    </>
  );
}