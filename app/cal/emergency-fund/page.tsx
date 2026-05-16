import type { Metadata } from "next";
import Script from "next/script";
import EmergencyFundClient from "./EmergencyFundClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/emergency-fund";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "비상금 필요 금액 계산기 | BlueDino";
const pageDescription = "월 생활비·직장 안정성·부양가족 유무로 본인 권장 비상금을 계산하는 BlueDino 비상금 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["비상금 계산기", "비상금 얼마", "비상금 6개월", "비상자금 마련"],
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
  name: "비상금 필요 금액 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "비상금 6개월치가 너무 많은 거 아닌가요?", answer: "안정 직장이라면 3~4개월로 줄여도 무방합니다. 다만 \"이직·실직·갑작스러운 의료비\"가 동시에 올 수 있다는 점을 고려하면 6개월은 보수적이고 안전한 기준입니다." },
            { question: "비상금은 어디에 보관해야 하나요?", answer: "파킹통장 또는 CMA가 가장 일반적입니다. 즉시 인출이 가능하면서도 연 3% 안팎의 이자를 받을 수 있습니다. 예적금은 중도해지 시 이자 손실이 있어 비상금에는 적합하지 않습니다." },
            { question: "비상금이 부족한데 투자를 시작해도 될까요?", answer: "최소 3개월치 비상금은 확보하신 후 시작하시는 것을 권합니다. 그렇지 않으면 시장 하락 + 갑작스러운 지출이 동시에 올 때 손해 보고 자산을 매도하게 됩니다." },
            { question: "맞벌이 부부는 한 사람 기준 비상금이면 충분한가요?", answer: "부부 합산 월 생활비 기준으로 6개월치를 권장합니다. 한 명의 소득이 일시 중단되어도 다른 한 명이 받쳐주면 4~5개월로 줄여도 무방합니다." },
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
    { "@type": "ListItem", position: 3, name: "비상금 필요 금액 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="emergency-fund-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="emergency-fund-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="emergency-fund-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`비상금 필요 금액 계산기`}
        hero={`본인의 월 생활비·직장 안정성·가족 구성에 따라 적정 비상금 규모는 다릅니다. 3·6·9·12개월치 중 본인에게 맞는 권장치를 추천합니다.`}
        calcChildren={<EmergencyFundClient />}
        whenToUse={[
            "투자를 시작하기 전 비상금부터 만들고 싶을 때",
            "프리랜서·자영업자라 소득이 들쭉날쭉할 때 비상금 두께를 정하고 싶을 때",
            "결혼·출산 후 가족 단위 비상금이 얼마나 필요한지 점검할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "기본 권장: 안정 직장 3개월 / 보통 6개월 / 불안정 9개월",
              "부양가족 있음 시 +2개월 추가 (불안정 + 부양가족 = 12개월)",
              "권장 비상금 = 월 생활비 × 권장 개월수",
              "보관 위치: 파킹통장 또는 CMA (즉시 인출 + 약 3% 이자)",
          ],
        } }
        examples={[
            { title: "예시 1 — 월 생활비 250만·일반 직장·미혼", body: "보통 안정성 6개월 권장 → 비상금 1,500만 원. 파킹통장에 보관 시 연 3.5% 가정 약 45만 원 이자." },
            { title: "예시 2 — 월 생활비 350만·프리랜서·부양가족 있음", body: "불안정 + 부양가족 → 12개월 권장 → 비상금 4,200만 원. 비상금 자체가 두꺼워야 본업 변동성을 흡수할 수 있음." },
        ]}
        faqs={[
            { question: "비상금 6개월치가 너무 많은 거 아닌가요?", answer: "안정 직장이라면 3~4개월로 줄여도 무방합니다. 다만 \"이직·실직·갑작스러운 의료비\"가 동시에 올 수 있다는 점을 고려하면 6개월은 보수적이고 안전한 기준입니다." },
            { question: "비상금은 어디에 보관해야 하나요?", answer: "파킹통장 또는 CMA가 가장 일반적입니다. 즉시 인출이 가능하면서도 연 3% 안팎의 이자를 받을 수 있습니다. 예적금은 중도해지 시 이자 손실이 있어 비상금에는 적합하지 않습니다." },
            { question: "비상금이 부족한데 투자를 시작해도 될까요?", answer: "최소 3개월치 비상금은 확보하신 후 시작하시는 것을 권합니다. 그렇지 않으면 시장 하락 + 갑작스러운 지출이 동시에 올 때 손해 보고 자산을 매도하게 됩니다." },
            { question: "맞벌이 부부는 한 사람 기준 비상금이면 충분한가요?", answer: "부부 합산 월 생활비 기준으로 6개월치를 권장합니다. 한 명의 소득이 일시 중단되어도 다른 한 명이 받쳐주면 4~5개월로 줄여도 무방합니다." },
        ]}
        relatedCalculators={[
            { label: "월 지출 예산 계산기", href: "/cal/monthly-budget" },
            { label: "파킹통장 이자 계산기", href: "/cal/parking-account" },
            { label: "CMA 이자 계산기", href: "/cal/cma-interest" },
        ]}
        officialSources={["개인별 월 고정비와 생활비 기준", "금융감독원 가계 재무관리 안내"]}
        caution={`비상금 권장치는 일반적 기준이며 본인의 의료비 위험·자녀 학비·주거 안정성 등 개별 상황에 따라 달라질 수 있습니다. 권장치를 기본으로 두고 본인 상황에 맞게 조정해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="비상금 필요 금액 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
