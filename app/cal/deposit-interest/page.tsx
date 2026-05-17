import type { Metadata } from "next";
import Script from "next/script";
import DepositInterestClient from "./DepositInterestClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/deposit-interest";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "예금 이자 계산기 | BlueDino";
const pageDescription = "예금 원금·만기·금리를 입력하면 세전 이자, 15.4% 세금 차감, 세후 이자와 만기 수령액을 계산하는 BlueDino 정기예금 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["예금 이자 계산기", "정기예금 이자", "예금 세후 이자", "만기 수령액"],
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

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "예금 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "예금 이자에서 정확히 15.4%가 빠지나요?", answer: "네. 소득세 14% + 지방소득세 1.4%가 만기 이자에 자동 원천징수됩니다. 다만 ISA·생계형 저축·농수신협 조합원 예금처럼 비과세·우대 상품을 활용하면 세율을 줄일 수 있습니다." },
            { question: "복리 예금은 어떻게 계산하나요?", answer: "이 계산기는 단리·만기 일시 지급 기준입니다. 월 복리 예금은 만기 이자가 단리보다 약간 더 크고, 만기 시점이 길수록 차이가 커집니다." },
            { question: "만기 전에 해지하면 이자는 어떻게 되나요?", answer: "보통 \"중도해지이율\"이 적용되어 약정 이자의 30~70% 정도만 받게 됩니다. 6개월 안에 쓸 가능성이 있는 자금은 예금보다 파킹통장이 더 부담을 줄일 수 있습니다." },
            { question: "이자가 연 2,000만 원을 넘으면 어떻게 되나요?", answer: "다른 금융소득과 합산해 2,000만 원을 초과하면 종합소득세 합산이 되어 누진세율(최대 45%)이 적용될 수 있습니다. 자산이 크다면 ISA 활용을 권장드립니다." },
  ].map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "예금 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="deposit-interest-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="deposit-interest-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="deposit-interest-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`예금 이자 계산기`}
        hero={`정기예금에 일정 금액을 예치하고 만기일까지 보유했을 때 받게 되는 세전·세후 이자와 만기 수령액을 한 번에 확인합니다.`}
        calcChildren={<DepositInterestClient />}
        whenToUse={[
            "가입할 정기예금의 만기 수령액을 미리 확인하고 싶을 때",
            "여러 은행 예금 상품의 금리를 같은 조건으로 비교하고 싶을 때",
            "예금 + 적금 또는 예금 + 파킹통장 조합의 총 이자를 계산하고 싶을 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "세전 이자 = 원금 × 연 금리 × (만기 개월수 / 12)",
              "세금 = 세전 이자 × 15.4% (소득세 14% + 지방세 1.4%)",
              "세후 이자 = 세전 이자 - 세금",
              "만기 수령액 = 원금 + 세후 이자 (단리·만기 일시 지급식 기준)",
          ],
        } }
        examples={[
            { title: "예시 1 — 5천만 원·12개월·연 3.5%", body: "세전 이자 175만 원·세금 약 27만 원·세후 이자 약 148만 원·만기 수령 약 5,148만 원. 같은 조건으로 ISA에 담으면 비과세 한도 안에서 세후 175만 원 그대로 수령." },
            { title: "예시 2 — 1억 원·24개월·연 4.0%", body: "세전 이자 800만 원·세금 약 123만 원·세후 이자 약 677만 원·만기 수령 약 1억 677만 원. 24개월 동안 이자율이 변동되는 회전형 상품이라면 만기 시 실효 금리는 다를 수 있음." },
        ]}
        faqs={[
            { question: "예금 이자에서 정확히 15.4%가 빠지나요?", answer: "네. 소득세 14% + 지방소득세 1.4%가 만기 이자에 자동 원천징수됩니다. 다만 ISA·생계형 저축·농수신협 조합원 예금처럼 비과세·우대 상품을 활용하면 세율을 줄일 수 있습니다." },
            { question: "복리 예금은 어떻게 계산하나요?", answer: "이 계산기는 단리·만기 일시 지급 기준입니다. 월 복리 예금은 만기 이자가 단리보다 약간 더 크고, 만기 시점이 길수록 차이가 커집니다." },
            { question: "만기 전에 해지하면 이자는 어떻게 되나요?", answer: "보통 \"중도해지이율\"이 적용되어 약정 이자의 30~70% 정도만 받게 됩니다. 6개월 안에 쓸 가능성이 있는 자금은 예금보다 파킹통장이 더 부담을 줄일 수 있습니다." },
            { question: "이자가 연 2,000만 원을 넘으면 어떻게 되나요?", answer: "다른 금융소득과 합산해 2,000만 원을 초과하면 종합소득세 합산이 되어 누진세율(최대 45%)이 적용될 수 있습니다. 자산이 크다면 ISA 활용을 권장드립니다." },
        ]}
        relatedCalculators={[
            { label: "적금 이자 계산기", href: "/cal/installment-savings" },
            { label: "파킹통장 이자 계산기", href: "/cal/parking-account" },
            { label: "복리 계산기", href: "/cal/compound" },
        ]}
        officialSources={[{ label: "금융감독원 금융상품 안내", href: "https://www.fss.or.kr" }, { label: "예금보험공사 예금자보호 안내", href: "https://www.kdic.or.kr" }, { label: "취급 금융회사 예금 상품 설명서", href: "https://portal.kfb.or.kr" }]}
        caution={`예금 금리는 매월 변동되며 본 계산기는 단리·만기 일시 지급 기준입니다. 실제 가입 상품의 이자 지급 방식과 우대 조건은 가입 시 약관에서 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="예금 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
