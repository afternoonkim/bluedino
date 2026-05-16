import type { Metadata } from "next";
import Script from "next/script";
import CreditCardInstallmentClient from "./CreditCardInstallmentClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/credit-card-installment";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "신용카드 할부 이자 계산기 | BlueDino";
const pageDescription = "결제 금액·할부 개월·연 환산 수수료율로 월 부담·총 수수료·할부 회차별 스케줄을 계산하는 BlueDino 신용카드 할부 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["신용카드 할부 이자 계산기", "신용카드 할부 수수료", "할부 개월 비교", "카드 할부 부담"],
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
  name: "신용카드 할부 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "무이자 할부와 부분 무이자의 차이는?", answer: "무이자 할부는 카드사·가맹점이 수수료를 부담해 소비자가 추가 비용이 없는 구조입니다. 부분 무이자는 1~3개월만 무이자고 이후 회차부터 수수료가 부과됩니다." },
            { question: "신용카드 할부 수수료와 신용대출 금리 중 어느 게 더 비싼가요?", answer: "보통 신용카드 할부 수수료가 신용대출 금리보다 높습니다(15~22% vs 5~10%). 큰 금액 결제 시 신용대출이 일반적으로 더 유리합니다." },
            { question: "할부 중도 변경(상환·승급)이 가능한가요?", answer: "네. 카드사 앱이나 콜센터를 통해 \"할부 일부 상환\"·\"할부 개월 변경\"이 가능합니다. 일부 상환 시 잔액에 비례해 수수료가 감소합니다." },
            { question: "할부도 신용점수에 영향이 있나요?", answer: "정상 사용·상환은 큰 영향이 없지만, 미납이나 연체가 발생하면 신용점수가 떨어집니다. 신용대출과 마찬가지로 미납 1회로도 점수 영향이 큽니다." },
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
    { "@type": "ListItem", position: 3, name: "신용카드 할부 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="credit-card-installment-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="credit-card-installment-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="credit-card-installment-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`신용카드 할부 이자 계산기`}
        hero={`고액 결제 시 신용카드 할부를 선택하면 매월 부담은 줄어들지만 수수료가 발생합니다. 결제 금액·할부 개월·연 환산 수수료율로 매월 부담과 총 수수료를 계산해 잔액 기준 차감 스케줄까지 확인할 수 있습니다.`}
        calcChildren={<CreditCardInstallmentClient />}
        whenToUse={[
            "큰 금액을 신용카드 할부로 결제하기 전 월 부담을 미리 알아볼 때",
            "3개월 무이자·6개월 부분 무이자·12개월 유이자 등 옵션을 비교할 때",
            "할부 수수료와 신용대출 금리 중 어느 쪽이 더 부담이 작은지 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "월 원금 = 결제 금액 / 할부 개월",
              "각 회차 수수료 = 남은 잔액 × (연 환산 수수료율 / 12)",
              "월 부담 = 월 원금 + 회차별 수수료 (회차가 갈수록 잔액이 줄어 수수료도 감소)",
              "총 수수료 = 각 회차 수수료의 합",
          ],
        } }
        examples={[
            { title: "예시 1 — 결제 120만 원·6개월·연 18%", body: "월 원금 20만 원 + 첫 회 수수료 약 1.8만 → 첫 회 부담 약 21.8만 원. 매월 잔액 감소로 수수료가 줄어 마지막 회 약 20.3만 원. 총 수수료 약 6만 원." },
            { title: "예시 2 — 결제 360만 원·12개월·연 20%", body: "월 원금 30만 원 + 첫 회 수수료 6만 원 → 첫 회 부담 36만 원. 총 수수료 약 39만 원. 같은 결제를 신용대출 8%로 받으면 약 16만 원으로 절반 이하." },
        ]}
        faqs={[
            { question: "무이자 할부와 부분 무이자의 차이는?", answer: "무이자 할부는 카드사·가맹점이 수수료를 부담해 소비자가 추가 비용이 없는 구조입니다. 부분 무이자는 1~3개월만 무이자고 이후 회차부터 수수료가 부과됩니다." },
            { question: "신용카드 할부 수수료와 신용대출 금리 중 어느 게 더 비싼가요?", answer: "보통 신용카드 할부 수수료가 신용대출 금리보다 높습니다(15~22% vs 5~10%). 큰 금액 결제 시 신용대출이 일반적으로 더 유리합니다." },
            { question: "할부 중도 변경(상환·승급)이 가능한가요?", answer: "네. 카드사 앱이나 콜센터를 통해 \"할부 일부 상환\"·\"할부 개월 변경\"이 가능합니다. 일부 상환 시 잔액에 비례해 수수료가 감소합니다." },
            { question: "할부도 신용점수에 영향이 있나요?", answer: "정상 사용·상환은 큰 영향이 없지만, 미납이나 연체가 발생하면 신용점수가 떨어집니다. 신용대출과 마찬가지로 미납 1회로도 점수 영향이 큽니다." },
        ]}
        relatedCalculators={[
            { label: "대출이자 계산기", href: "/cal/loan-interest" },
            { label: "자동차 할부 계산기", href: "/cal/car-installment" },
            { label: "월 지출 예산 계산기", href: "/cal/monthly-budget" },
        ]}
        officialSources={["여신금융협회 카드 수수료 안내", "카드사별 할부 수수료·무이자 행사 안내"]}
        caution={`카드사·상품에 따라 "잔액 기준"·"균등 기준" 수수료 계산이 다를 수 있습니다. 본 계산기는 잔액 차감 방식 기준이며, 실제 청구액은 카드사 명세서에서 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="신용카드 할부 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
