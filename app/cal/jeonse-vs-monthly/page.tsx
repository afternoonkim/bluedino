import type { Metadata } from "next";
import Script from "next/script";
import JeonseVsMonthlyClient from "./JeonseVsMonthlyClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/jeonse-vs-monthly";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "월세 vs 전세 비교 계산기 | BlueDino";
const pageDescription = "전세대출 이자·자기자본 기회비용 vs 월세·보증금 기회비용으로 월 부담을 비교";

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
  name: "월세 vs 전세 비교 계산기",
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
    { "@type": "ListItem", position: 3, name: "월세 vs 전세 비교 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="jeonse-vs-monthly-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(structuredData) } } />
      <Script id="jeonse-vs-monthly-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <JeonseVsMonthlyClient />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="월세 vs 전세 비교 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
