import Script from "next/script";
import type { Metadata } from "next";
import CalculatorLandingSection from "../components/CalculatorLandingSection";
import CalculatorResultSeoNote from "../components/CalculatorResultSeoNote";
import CalculatorMetaSections from "../components/CalculatorMetaSections";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { buildCalculatorFaqSchema, getCalculatorLandingData } from "../components/calculatorLandingData";
import CapitalGainsCalculatorClient from "./CapitalGainsCalculatorClient";

export const metadata: Metadata = {
  title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
  description:
    "해외주식의 같은 연도 매매손익을 합산하고 연 250만 원 기본공제를 적용해 양도소득세를 추정하세요. 거래별 환율과 수수료를 입력하고 전년도 손실은 차감하지 않습니다.",
  keywords: ["해외주식 양도세 계산기",
    "양도소득세 계산기",
    "해외주식 세금 계산",
    "capital gains tax calculator",
    "주식 양도세 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/capital-gains",
  },
  openGraph: {
    title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
    description:
      "해외주식의 같은 연도 매매손익을 합산하고 연 250만 원 기본공제를 적용해 양도소득세를 추정하세요. 거래별 환율과 수수료를 입력하고 전년도 손실은 차감하지 않습니다.",
    url: "https://bluedino.kr/cal/capital-gains",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "해외주식 양도세 계산기 | 주식 세금 계산 | BlueDino",
    description:
      "해외주식의 같은 연도 매매손익을 합산하고 연 250만 원 기본공제를 적용해 양도소득세를 추정하세요. 거래별 환율과 수수료를 입력하고 전년도 손실은 차감하지 않습니다.",
  },
};

const landingData = getCalculatorLandingData("capital-gains");
const faqStructuredData = buildCalculatorFaqSchema("capital-gains");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "해외주식 양도세 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "해외주식의 같은 연도 매매손익을 합산하고 연 250만 원 기본공제를 적용해 양도소득세를 추정하세요. 거래별 환율과 수수료를 입력하고 전년도 손실은 차감하지 않습니다.",
  url: "https://bluedino.kr/cal/capital-gains",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "계산기", item: "https://bluedino.kr/cal" },
    { "@type": "ListItem", position: 3, name: "양도소득세 계산기", item: "https://bluedino.kr/cal/capital-gains" },
  ],
};

export default function Page() {
  return (
    <>
      {faqStructuredData ? (
        <Script
          id="capital-gains-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      ) : null}
      <Script
        id="해외주식-양도세-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="capital-gains-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CapitalGainsCalculatorClient />
      <CalculatorMetaSections
        accuracyLevel="제도 기준 반영"
        basisLabel="기준: 2026년 10월 10일 확인한 국세청 주식 양도소득세 안내와 입력값 기준"
        officialSources={[{ label: "국세청 주식 양도소득세 계산요령", href: "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=8800&mi=12274" }, { label: "국세청 양도소득세 신고납부기한", href: "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7708&mi=2309" }, { label: "홈택스 신고 안내", href: "https://www.hometax.go.kr" }]}
        relatedCalculators={[{ label: "배당 계산기", href: "/cal/calculator", description: "배당소득과 양도차익을 함께 점검할 수 있습니다." }, { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings", description: "국내 절세계좌 활용 가능성을 비교해 볼 수 있습니다." }, { label: "복리 계산기", href: "/cal/compound", description: "세후 수익을 장기 투자 결과로 이어서 계산할 수 있습니다." }]}
        caution="주식 양도소득 기본공제는 과세대상 국내·국외주식을 합쳐 연 250만 원입니다. 이 계산기는 일반적인 해외주식 세율을 가정하며, 과세되지 않는 국내 상장주식 매매차익과 전년도 손실은 넣지 마세요. 실제 신고 시 거래별 환율·필요경비와 납세자별 적용 세율을 확인하세요."
      />
      <CalculatorResultSeoNote calculator="capital-gains" />
      {landingData ? <CalculatorLandingSection data={landingData} /> : null}
      <PageTrustFooter pageKind="계산기" updatedAt="2026-10-10" />
    </>
  );
}