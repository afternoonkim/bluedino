import type { Metadata } from "next";
import Script from "next/script";
import JeonseLoanInterestClient from "./JeonseLoanInterestClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/jeonse-loan-interest";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "전세대출 이자 계산기 | BlueDino";
const pageDescription = "전세 보증금·대출 한도·금리·기간을 입력해 월 이자와 총 이자 부담을 계산";

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
  name: "전세대출 이자 계산기",
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
    { "@type": "ListItem", position: 3, name: "전세대출 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="jeonse-loan-interest-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } } />
      <Script id="jeonse-loan-interest-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <JeonseLoanInterestClient />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="전세대출 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
