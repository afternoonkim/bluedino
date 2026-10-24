import type { Metadata } from "next";
import Script from "next/script";
import DepositInterestClient from "./DepositInterestClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/deposit-interest";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "예금 이자 계산기 | 세후 이자·만기 수령액 비교 | BlueDino";
const pageDescription = "예치 원금·만기·연 금리를 입력해 정기예금의 세전·세후 이자와 만기 수령액을 계산하세요. 단리·일반과세 가정이며 우대금리·중도해지 조건은 상품별로 다릅니다.";

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

const depositFaqs = [
  { question: "예금 이자에서 항상 15.4%가 빠지나요?", answer: "일반적인 과세 정기예금의 이자에는 소득세 14%와 지방소득세 1.4%를 합한 15.4% 원천징수를 가정할 수 있습니다. 비과세·세금우대 상품이나 개인별 과세 상황에서는 달라질 수 있으니 상품설명서와 세금 적용 조건을 확인하세요." },
  { question: "복리 예금도 이 계산기로 확인할 수 있나요?", answer: "이 계산기는 원금에만 이자가 붙는 단리·만기 일시 지급 가정입니다. 복리 상품은 이자 계산·지급 주기와 재투자 조건에 따라 만기 금액이 달라지므로 해당 상품의 안내를 따로 확인하세요." },
  { question: "만기 전에 해지하면 이자는 어떻게 되나요?", answer: "중도해지이율은 은행·상품·보유 기간에 따라 다르며 약정금리보다 낮아질 수 있습니다. 중간에 쓸 가능성이 있는 돈이라면 중도해지이율과 파킹통장 등 수시입출금 상품의 조건을 비교하세요." },
  { question: "연간 금융소득이 2,000만 원을 넘으면 어떻게 되나요?", answer: "비과세·분리과세 대상을 제외한 연간 이자·배당소득 합계가 2,000만 원을 초과하면 금융소득 종합과세 대상이 될 수 있습니다. 예금 이자뿐 아니라 다른 금융소득을 합산해 확인하고, 실제 세금은 다른 소득과 공제 등에 따라 달라집니다." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: depositFaqs.map((f) => ({
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
              "세금 = 세전 이자 × 15.4% (일반과세 가정: 소득세 14% + 지방소득세 1.4%)",
              "세후 이자 = 세전 이자 - 세금",
              "만기 수령액 = 원금 + 세후 이자 (단리·만기 일시 지급식 기준)",
          ],
        } }
        examples={[
            { title: "예시 1 — 5천만 원·12개월·연 3.5%", body: "세전 이자 175만 원, 일반과세 가정 시 세금 26만 9,500원, 세후 이자 148만 500원, 만기 수령액 5,148만 500원입니다. 실제 우대금리 충족 여부와 세금 조건은 별도로 확인하세요." },
            { title: "예시 2 — 1억 원·24개월·연 4.0%", body: "금리가 24개월 내내 연 4.0%로 유지된다는 단리 가정입니다. 세전 이자 800만 원, 세금 123만 2,000원, 세후 이자 676만 8,000원, 만기 수령액 1억 676만 8,000원입니다. 회전형·변동금리 상품에는 그대로 적용되지 않습니다." },
        ]}
        faqs={depositFaqs}
        resultInterpretation={[
          "세후 이자는 일반적인 원천징수세율을 적용한 예상 금액이며 실제 세금은 계좌·상품 조건에 따라 달라질 수 있습니다.",
          "예금 비교 시에는 표시 금리보다 실제 받을 수 있는 우대금리와 만기 수령액을 같은 기간으로 비교하세요.",
          "만기 전에 자금을 쓸 수 있다면 중도해지이율과 예금자보호 적용 여부를 함께 확인하세요.",
        ]}
        commonMistakes={[
          "연 금리를 월 금리로 계산하거나 약정 기간이 다른 상품의 이자를 그대로 비교하지 마세요.",
          "우대금리 조건을 충족하지 못하는데 최고 금리를 적용하면 수령액이 과대 계산됩니다.",
          "중도해지이율을 확인하지 않고 만기 이자만 비교하면 자금 계획이 달라질 수 있습니다.",
        ]}
        relatedCalculators={[
            { label: "적금 이자 계산기", href: "/cal/installment-savings" },
            { label: "파킹통장 이자 계산기", href: "/cal/parking-account" },
            { label: "복리 계산기", href: "/cal/compound" },
        ]}
        officialSources={[{ label: "국세청 이자소득 원천징수 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7914&mi=40359" }, { label: "금융위원회 예금보호한도 1억 원 시행 안내", href: "https://www.fsc.go.kr/no010101/85200" }, { label: "은행연합회 금융상품 비교공시", href: "https://portal.kfb.or.kr" }]}
        caution={`이 계산기는 입력한 연 금리가 만기까지 유지되는 단리·만기 일시 지급식 일반과세 가정입니다. 고정금리·변동금리 여부, 우대금리 충족 조건, 중도해지이율을 가입 전 확인하세요. 보호대상 예금의 예금보호한도는 동일 금융회사 기준 원금과 이자를 합쳐 1억 원입니다.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="예금 이자 계산기" updatedAt="2026-10-24" />
      </div>
    </>
  );
}
