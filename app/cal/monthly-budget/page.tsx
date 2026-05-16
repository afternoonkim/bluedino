import type { Metadata } from "next";
import Script from "next/script";
import MonthlyBudgetClient from "./MonthlyBudgetClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/monthly-budget";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "월 지출 예산 계산기 (50/30/20 룰) | BlueDino";
const pageDescription = "월 소득과 50/30/20 비율로 카테고리별 예산을 자동 분배하는 BlueDino 월 지출 예산 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["월 지출 예산 계산기", "50 30 20 법칙", "가계부 예산", "월 소득 분배"],
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
  name: "월 지출 예산 계산기 (50/30/20 룰)",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "50/30/20 비율은 한국에서도 맞나요?", answer: "한국은 주거비(전세대출 이자·월세) 비중이 큰 편이라 필수 지출이 50%를 넘는 분이 많습니다. 본인 상황에 맞춰 60/20/20·70/10/20 등으로 조정해 보시는 게 현실적입니다." },
            { question: "필수 지출과 자유 지출은 어떻게 구분하나요?", answer: "\"한 달 안 쓰면 일상이 멈추는가\"로 구분합니다. 월세·통신비·기본 식비는 필수, 외식·여행·OTT는 자유로 분류합니다. 구독 서비스가 너무 많으면 자유 지출이 부풀어 있는 신호입니다." },
            { question: "저축 20%는 너무 많지 않나요?", answer: "본인 상황에 따라 다릅니다. 비상금이 충분하다면 10~15%도 무방하고, 노후·교육비 준비가 시급하다면 25~30%까지 늘리시는 것을 권합니다." },
            { question: "이 예산을 어떻게 실천하면 좋을까요?", answer: "월급 입금 직후 \"저축 → 필수 → 자유\" 순서로 통장을 나눠 자동이체로 분리하시는 게 가장 효과적입니다. 자유 지출 통장 한도가 0원이 되면 그 달 자유 지출이 끝나는 구조입니다." },
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
    { "@type": "ListItem", position: 3, name: "월 지출 예산 계산기 (50/30/20 룰)", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="monthly-budget-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="monthly-budget-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="monthly-budget-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`월 지출 예산 계산기 (50/30/20 룰)`}
        hero={`월 소득을 필수 지출 50% / 자유 지출 30% / 저축·투자 20% 비율로 자동 분배해 가계 예산을 한눈에 볼 수 있습니다. 본인 상황에 맞게 비율을 조정할 수 있어 가계부 정리를 시작하는 분에게 유용합니다.`}
        calcChildren={<MonthlyBudgetClient />}
        whenToUse={[
            "가계부를 처음 정리하면서 본인 소득의 적정 지출·저축 비율을 정할 때",
            "월급이 올라간 후 추가 자금을 자유 지출과 저축에 어떻게 분배할지 결정할 때",
            "지출이 소득의 절반을 넘는다고 느낄 때 본인 비율을 50/30/20과 비교할 때",
        ]}
        formula={ {
          title: "계산 기준 (50/30/20 룰)",
          body: [
              "필수 지출 50%: 월세·관리비·식비·교통·통신·보험 등 \"안 쓰면 일상이 안 되는\" 항목",
              "자유 지출 30%: 외식·여행·취미·쇼핑·구독 서비스 등 \"줄일 수 있는\" 항목",
              "저축·투자 20%: 비상금·예적금·ETF·연금 등 \"미래 자산을 만드는\" 항목",
              "세 비율의 합 = 100% (본인 상황에 맞게 조정 가능)",
          ],
        } }
        examples={[
            { title: "예시 1 — 월 소득 350만 (세후)", body: "필수 175만 / 자유 105만 / 저축 70만 원. 일반적인 사회 초년생 기준 적정 비율. 1년 저축액 약 840만 원." },
            { title: "예시 2 — 비상금 부족 시 70/10/20 조정", body: "월 소득 350만 → 필수 245만 / 자유 35만 / 저축 70만 원. 자유 지출을 줄여 비상금·노후 자산을 빠르게 만들 때 활용. 6개월 후 비상금 회복되면 다시 50/30/20으로." },
        ]}
        faqs={[
            { question: "50/30/20 비율은 한국에서도 맞나요?", answer: "한국은 주거비(전세대출 이자·월세) 비중이 큰 편이라 필수 지출이 50%를 넘는 분이 많습니다. 본인 상황에 맞춰 60/20/20·70/10/20 등으로 조정해 보시는 게 현실적입니다." },
            { question: "필수 지출과 자유 지출은 어떻게 구분하나요?", answer: "\"한 달 안 쓰면 일상이 멈추는가\"로 구분합니다. 월세·통신비·기본 식비는 필수, 외식·여행·OTT는 자유로 분류합니다. 구독 서비스가 너무 많으면 자유 지출이 부풀어 있는 신호입니다." },
            { question: "저축 20%는 너무 많지 않나요?", answer: "본인 상황에 따라 다릅니다. 비상금이 충분하다면 10~15%도 무방하고, 노후·교육비 준비가 시급하다면 25~30%까지 늘리시는 것을 권합니다." },
            { question: "이 예산을 어떻게 실천하면 좋을까요?", answer: "월급 입금 직후 \"저축 → 필수 → 자유\" 순서로 통장을 나눠 자동이체로 분리하시는 게 가장 효과적입니다. 자유 지출 통장 한도가 0원이 되면 그 달 자유 지출이 끝나는 구조입니다." },
        ]}
        relatedCalculators={[
            { label: "비상금 필요 금액 계산기", href: "/cal/emergency-fund" },
            { label: "연봉 실수령액 계산기", href: "/cal/salary-net" },
            { label: "복리 계산기", href: "/cal/compound" },
        ]}
        officialSources={["입력한 소득·지출 조건 기준", "개인별 실제 카드·계좌 지출 내역"]}
        caution={`50/30/20 비율은 미국 표준 기준이며 한국 가계 평균은 주거비 비중이 더 큽니다. 본인 가계부를 1~2개월 작성한 후 실제 비율과 비교해 조정하시는 게 안전합니다.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="월 지출 예산 계산기 (50/30/20 룰)" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
