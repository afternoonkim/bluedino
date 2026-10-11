import type { Metadata } from "next";
import Script from "next/script";
import IsaTaxSavingsClient from "./IsaTaxSavingsClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import CalculatorReferenceBox, { RelatedCalculatorLinks } from "../components/CalculatorReferenceBox";

const canonicalPath = "/cal/isa-tax-savings";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "ISA 절세 효과 계산기 | 과세 대상 순이익·비과세 한도 비교 | BlueDino";
const pageDescription = "ISA 과세 대상 순이익을 입력해 일반형 200만 원·서민형 400만 원 비과세와 초과분 9.9% 분리과세를 비교하세요. 일반 계좌에서도 비과세인 국내 상장주식 매매차익은 제외합니다.";

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
    { "@type": "ListItem", position: 2, name: "금융 계산기", item: "https://bluedino.kr/cal" },
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
        <CalculatorReferenceBox sources={[{ label: "KB증권 ISA 과세·상품별 세금 안내", href: "https://www.kbsec.com/go.able?linkcd=m05080009" }, { label: "신한투자증권 ISA 손익통산·가입 조건", href: "https://open.shinhansec.com/mobilealpha/html/FP/SB5491T01.html" }]} />
        <RelatedCalculatorLinks links={[{ label: "청년도약계좌 계산기", href: "/cal/youth-leap-account" }, { label: "청년미래적금 계산기", href: "/cal/youth-future-savings" }, { label: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit" }, { label: "IRP 세액공제 계산기", href: "/cal/irp-tax-credit" }]} />
        <PageTrustFooter pageKind="ISA 절세 효과 계산기" updatedAt="2026-10-11" />
      </div>
    </>
  );
}
