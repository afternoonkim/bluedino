import type { Metadata } from "next";
import Script from "next/script";
import IrpTaxCreditClient from "./IrpTaxCreditClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import CalculatorReferenceBox, { RelatedCalculatorLinks } from "../components/CalculatorReferenceBox";

const canonicalPath = "/cal/irp-tax-credit";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "IRP 세액공제 계산기 | BlueDino";
const pageDescription = "IRP·연금저축 합산 한도 900만 원 기준 세액공제 환급액 계산기";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "IRP 세액공제 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "IRP 세액공제 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="irp-tax-credit-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } } />
      <Script id="irp-tax-credit-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <IrpTaxCreditClient />
      <div className="bd-container-narrow bd-section">
        <CalculatorReferenceBox sources={[{ label: "국세청 연금계좌 세액공제 안내", href: "https://www.nts.go.kr" }, { label: "금융감독원 통합연금포털", href: "https://100lifeplan.fss.or.kr" }, { label: "근로복지공단 퇴직연금 안내", href: "https://www.comwel.or.kr" }]} />
        <RelatedCalculatorLinks links={[{ label: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit" }, { label: "연금 수령액 계산기", href: "/cal/pension-payout" }, { label: "연봉 실수령액 간이 계산기", href: "/cal/salary-net" }, { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings" }]} />
        <PageTrustFooter pageKind="IRP 세액공제 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
