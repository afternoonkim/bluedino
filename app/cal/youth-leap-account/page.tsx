import type { Metadata } from "next";
import Script from "next/script";
import YouthLeapClient from "./YouthLeapClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/youth-leap-account";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "청년도약계좌 만기 시뮬레이션 계산기 | BlueDino";
const pageDescription = "신규 가입이 종료된 청년도약계좌 기존 가입자를 위한 5년 만기 예상 계산기. 월 납입액, 가입 당시 소득 구간, 약정 금리와 2025년 확대 기여금 구조를 반영해 만기 예상액을 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["청년도약계좌 계산기", "청년도약계좌 만기", "정부 매칭 청년 적금", "청년 적금 계산"],
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
  name: "청년도약계좌 만기 시뮬레이션 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "청년도약계좌는 지금 신규 가입할 수 있나요?", answer: "청년도약계좌는 신규 가입이 종료된 상품입니다. 이 페이지는 기존 가입자의 만기 예상액을 확인하기 위한 참고용 계산기이며, 가구소득과 개인소득 요건은 가입 당시 기준을 확인해야 합니다." },
            { question: "5년 만기 전에 해지하면 어떻게 되나요?", answer: "특별 사유(혼인·출산·실직·해외 이주·천재지변 등)가 아닌 일반 중도해지 시 정부 매칭금과 비과세 혜택이 환수되어 일반 적금과 비슷한 수준으로 떨어집니다. 5년 묶을 수 있는 자금만 가입하시는 것이 안전합니다." },
            { question: "청년도약계좌와 ISA 동시 가입 가능한가요?", answer: "네. 두 상품은 별개라 동시 가입 가능하고, 함께 활용하시면 절세 효과가 더 커집니다. 청년도약계좌는 5년 묶임·정부 매칭, ISA는 자유 운용·비과세·분리과세 9.9%로 성격이 다릅니다." },
            { question: "매칭 비율이 소득 구간별로 차이가 큰가요?", answer: "네. 연 소득 2400만 원 이하 6.0%, 6000만 원 초과 3.0%로 두 배 차이입니다. 2025년 확대 구조에서는 기존 매칭 한도까지는 소득별 매칭률, 확대 구간에는 3.0%가 적용되므로 월 납입액 전체에 단일 매칭률을 곱하면 과대 계산될 수 있습니다." },
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
    { "@type": "ListItem", position: 3, name: "청년도약계좌 만기 시뮬레이션 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="youth-leap-account-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="youth-leap-account-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="youth-leap-account-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`청년도약계좌 만기 시뮬레이션 계산기`}
        hero={`청년도약계좌는 신규 가입이 종료된 정책 금융상품입니다. 기존 가입자가 월 납입액과 가입 당시 소득 구간, 약정 금리를 기준으로 5년 만기 예상액을 확인할 수 있도록 정리했습니다.`}
        calcChildren={<YouthLeapClient />}
        whenToUse={[
            "기존 청년도약계좌 가입자가 만기 예상 금액을 미리 확인하고 싶을 때",
            "가입 당시 개인소득 구간에 따른 정부기여금 차이를 확인하고 싶을 때",
            "일반 적금 대비 청년도약계좌가 얼마나 유리한지 비교하고 싶을 때",
            "월 30·50·70만 원 등 납입 금액별 결과를 비교해 본인 가계에 맞춰 선택할 때",
        ]}
        formula={ {
          title: "청년도약계좌 계산 기준",
          body: [
              "총 납입원금 = 월 납입액 × 60개월 (최대 70만 × 60 = 4,200만 원)",
              "정부기여금 = 기존 매칭 한도 구간 × 소득별 매칭률 + 확대 구간 × 3.0%. 예: 총급여 2,400만 원 이하 월 70만 원 납입 시 40만 원 × 6% + 30만 원 × 3% = 월 33,000원",
              "비과세 이자 = 본인 납입원금 × 약정 금리 × (평균 적립 기간 / 12)를 기본값으로 계산합니다. 정부기여금 이자 반영 여부는 은행별 처리 방식에 따라 달라질 수 있어 계산기에서 선택할 수 있습니다.",
              "5년 만기 평가금액 = 납입원금 + 매칭금 + 비과세 이자 (이자·매칭 모두 비과세)",
          ],
        } }
        examples={[
            { title: "예시 1 — 연봉 4,000만 원 직장인 (월 70만 원 납입)", body: "총 납입 4,200만 원 + 매칭 비율 3.7% 적용 매칭금 약 155만 원 + 약정 5.5% 비과세 이자. 5년 만기 평가금액 약 5,000만 원 안팎. 같은 금액 일반 적금(3.5%·세후) 대비 약 600~900만 원 차이." },
            { title: "예시 2 — 연봉 2,300만 원 사회 초년생 (월 50만 원 납입)", body: "매칭 비율 6.0% 적용 → 매칭금이 가장 큰 구간. 총 납입 3,000만 원 + 매칭 약 180만 원 + 비과세 이자. 일반 적금 대비 절대 차액은 작아도 \"매칭 효율\"이 가장 높아 청년도약계좌 효과가 큼." },
        ]}
        faqs={[
            { question: "청년도약계좌는 지금 신규 가입할 수 있나요?", answer: "청년도약계좌는 신규 가입이 종료된 상품입니다. 이 페이지는 기존 가입자의 만기 예상액을 확인하기 위한 참고용 계산기이며, 가구소득과 개인소득 요건은 가입 당시 기준을 확인해야 합니다." },
            { question: "5년 만기 전에 해지하면 어떻게 되나요?", answer: "특별 사유(혼인·출산·실직·해외 이주·천재지변 등)가 아닌 일반 중도해지 시 정부 매칭금과 비과세 혜택이 환수되어 일반 적금과 비슷한 수준으로 떨어집니다. 5년 묶을 수 있는 자금만 가입하시는 것이 안전합니다." },
            { question: "청년도약계좌와 ISA 동시 가입 가능한가요?", answer: "네. 두 상품은 별개라 동시 가입 가능하고, 함께 활용하시면 절세 효과가 더 커집니다. 청년도약계좌는 5년 묶임·정부 매칭, ISA는 자유 운용·비과세·분리과세 9.9%로 성격이 다릅니다." },
            { question: "매칭 비율이 소득 구간별로 차이가 큰가요?", answer: "네. 연 소득 2400만 원 이하 6.0%, 6000만 원 초과 3.0%로 두 배 차이입니다. 2025년 확대 구조에서는 기존 매칭 한도까지는 소득별 매칭률, 확대 구간에는 3.0%가 적용되므로 월 납입액 전체에 단일 매칭률을 곱하면 과대 계산될 수 있습니다." },
        ]}
        relatedCalculators={[
            { label: "청년미래적금 계산기", href: "/cal/youth-future-savings" },
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "적금 이자 계산기", href: "/cal/installment-savings" },
            { label: "ISA 절세 효과 계산기", href: "/cal/isa-tax-savings" },
        ]}
        accuracyLevel="제도 기준 반영"
        officialSources={[{ label: "금융위원회 청년도약계좌 제도 안내", href: "https://www.fsc.go.kr" }, { label: "서민금융진흥원 청년도약계좌 안내", href: "https://www.kinfa.or.kr" }, { label: "가입 은행별 상품 설명서", href: "https://portal.kfb.or.kr" }]}
        caution={`청년도약계좌는 신규 가입이 종료된 상품입니다. 기존 가입자의 실제 기여금, 우대금리, 중도해지 처리, 가구소득 요건은 가입 당시 조건과 은행 안내에 따라 달라질 수 있습니다.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="청년도약계좌 만기 시뮬레이션 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
