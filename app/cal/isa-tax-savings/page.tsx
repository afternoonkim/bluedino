import type { Metadata } from "next";
import Script from "next/script";
import IsaTaxSavingsClient from "./IsaTaxSavingsClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/isa-tax-savings";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "ISA 절세 효과 계산기 | BlueDino";
const pageDescription = "ISA 운용 수익에 대한 비과세·분리과세(9.9%)와 일반 계좌 배당세(15.4%)를 비교한 절세 효과 계산기";

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
  name: "ISA 절세 효과 계산기",
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
    { "@type": "ListItem", position: 3, name: "ISA 절세 효과 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="isa-tax-savings-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } } />
      <Script id="isa-tax-savings-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <IsaTaxSavingsClient />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="ISA 절세 효과 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
