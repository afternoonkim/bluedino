import type { Metadata } from "next";
import Script from "next/script";
import InstallmentSavingsClient from "./InstallmentSavingsClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/installment-savings";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "적금 이자 계산기 | BlueDino";
const pageDescription = "월 납입액·만기 개월·연 금리를 입력하면 적금 평균 적립 기간을 반영한 세전·세후 이자와 만기 수령액을 계산하는 BlueDino 적금 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["적금 이자 계산기", "정기적금 이자", "적금 세후 이자", "월 납입 적금"],
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
  name: "적금 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "왜 적금은 같은 금리·같은 원금이어도 예금보다 이자가 적은가요?", answer: "정기예금은 첫날부터 원금 전액이 예치되어 만기까지 이자가 붙는 반면, 정기적금은 매월 새로 납입되어 평균 적립 기간이 만기의 절반 수준입니다. 그래서 단순 비교 시 이자가 적게 보입니다." },
            { question: "선납 적금과 일반 적금의 차이는?", answer: "선납 적금은 첫 회차에 여러 회차를 한 번에 미리 납입하는 방식이라 평균 적립 기간이 길어져 이자가 많아집니다. 다만 한 번에 큰 금액이 필요하므로 자금 여유가 있을 때 활용됩니다." },
            { question: "납입 일자가 매월 1일과 25일이 다른가요?", answer: "은행마다 \"가입일 기준\"·\"매월 약정일 기준\"이 다릅니다. 보통 가입일을 기준으로 매월 같은 날 자동이체로 납입되며, 약정일을 지나면 이자가 그달분만큼 빠집니다." },
            { question: "ISA에 적금을 담을 수 있나요?", answer: "네. ISA에는 예적금·펀드·ETF를 함께 담을 수 있고, ISA 안에서 발생한 이자는 비과세 한도 안에서 절세됩니다." },
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
    { "@type": "ListItem", position: 3, name: "적금 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="installment-savings-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="installment-savings-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="installment-savings-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`적금 이자 계산기`}
        hero={`매월 일정 금액을 납입하는 정기적금의 만기 수령액을 세전·세후로 계산합니다. 매월 적립되는 시점이 다르기 때문에 평균 적립 기간을 반영한 정확한 계산식을 적용했습니다.`}
        calcChildren={<InstallmentSavingsClient />}
        whenToUse={[
            "정기적금 가입 전 만기 수령액을 미리 확인할 때",
            "월 납입 금액별로 만기 시 차이를 비교해 본인 가계에 맞게 결정할 때",
            "적금 vs 정기예금 vs 파킹통장의 총 이자를 비교하고 싶을 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "세전 이자 = 월 납입액 × 연 금리 × (만기 개월수 × (만기 개월수 + 1) / 2) / 12",
              "위 공식은 첫 회차는 만기 개월수만큼·마지막 회차는 1개월만 이자가 붙는 \"적금 평균 적립\" 구조를 반영합니다.",
              "세금 = 세전 이자 × 15.4%",
              "만기 수령액 = 원금 합계 + 세후 이자",
          ],
        } }
        examples={[
            { title: "예시 1 — 월 50만 원·24개월·연 3.5%", body: "원금 1,200만 원 + 세전 이자 약 36만 원 + 세금 5.5만 원 = 만기 약 1,231만 원. 정기예금 1,200만 원·24개월보다 이자가 적은 이유는 매월 적립이라 평균 적립 기간이 절반 정도이기 때문." },
            { title: "예시 2 — 월 100만 원·36개월·연 4.0%", body: "원금 3,600만 원 + 세전 이자 약 222만 원 + 세금 34만 원 = 만기 약 3,788만 원. 같은 금리라도 기간이 길어질수록 적립 기간 평균이 늘어 이자 차이가 비례 이상으로 커짐." },
        ]}
        faqs={[
            { question: "왜 적금은 같은 금리·같은 원금이어도 예금보다 이자가 적은가요?", answer: "정기예금은 첫날부터 원금 전액이 예치되어 만기까지 이자가 붙는 반면, 정기적금은 매월 새로 납입되어 평균 적립 기간이 만기의 절반 수준입니다. 그래서 단순 비교 시 이자가 적게 보입니다." },
            { question: "선납 적금과 일반 적금의 차이는?", answer: "선납 적금은 첫 회차에 여러 회차를 한 번에 미리 납입하는 방식이라 평균 적립 기간이 길어져 이자가 많아집니다. 다만 한 번에 큰 금액이 필요하므로 자금 여유가 있을 때 활용됩니다." },
            { question: "납입 일자가 매월 1일과 25일이 다른가요?", answer: "은행마다 \"가입일 기준\"·\"매월 약정일 기준\"이 다릅니다. 보통 가입일을 기준으로 매월 같은 날 자동이체로 납입되며, 약정일을 지나면 이자가 그달분만큼 빠집니다." },
            { question: "ISA에 적금을 담을 수 있나요?", answer: "네. ISA에는 예적금·펀드·ETF를 함께 담을 수 있고, ISA 안에서 발생한 이자는 비과세 한도 안에서 절세됩니다." },
        ]}
        relatedCalculators={[
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "복리 계산기", href: "/cal/compound" },
            { label: "청년도약계좌 계산기", href: "/cal/youth-leap-account" },
        ]}
        officialSources={[{ label: "금융감독원 금융상품 안내", href: "https://www.fss.or.kr" }, { label: "예금보험공사 예금자보호 안내", href: "https://www.kdic.or.kr" }, { label: "취급 금융회사 적금 상품 설명서", href: "https://portal.kfb.or.kr" }]}
        caution={`본 계산기는 단리·매월 동일 금액 납입 기준입니다. 매월 변동 적립·우대 금리 조건은 가입 상품 약관에 따라 다를 수 있어 가입 전 약관을 함께 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="적금 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
