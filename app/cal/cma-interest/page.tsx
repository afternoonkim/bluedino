import type { Metadata } from "next";
import Script from "next/script";
import CmaInterestClient from "./CmaInterestClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/cma-interest";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "CMA 이자 계산기 | 보유일수별 세전·세후 예상 수익 | BlueDino";
const pageDescription = "CMA에 보관할 금액, 가정 수익률, 보유일수를 입력해 세전·세후 예상 수익과 일평균 금액을 확인하세요. 실제 수익과 예금자보호 여부는 CMA 유형별로 다릅니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["CMA 이자 계산기", "CMA 계좌 이자 계산기", "CMA 이자계산기", "CMA 이자 계산", "CMA 이자 계산 예시", "CMA 금리", "RP형 CMA", "투자 대기자금 이자"],
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
  name: "CMA 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const cmaFaqs = [
  {
    question: "CMA RP형·발행어음형·MMF형·MMW형은 어떻게 다른가요?",
    answer: "RP형과 발행어음형은 약정 조건에 따른 수익률을 적용하고, MMF형과 MMW형은 운용 실적에 따라 수익이 달라질 수 있습니다. 가입 전 운용 대상과 출금·재투자 조건을 비교하세요.",
  },
  {
    question: "CMA도 예금자보호를 받을 수 있나요?",
    answer: "일반 증권사의 RP·MMF·MMW·발행어음형 CMA는 예금자보호 대상이 아닙니다. 예외적으로 보호대상인 종금형 CMA가 있으므로 상품설명서에서 유형과 보호 여부를 확인하세요.",
  },
  {
    question: "CMA 잔액으로 주식이나 ETF를 바로 살 수 있나요?",
    answer: "계좌와 증권사 설정에 따라 다릅니다. 주식매매 계좌 연계, 자동환매 가능 여부와 매수 가능 시간을 확인해야 합니다.",
  },
  {
    question: "CMA와 파킹통장을 둘 다 만들어야 하나요?",
    answer: "꼭 그렇지는 않습니다. 자금을 사용할 시점, 실제 적용 수익률, 출금 편의성과 예금자보호 여부를 비교해 필요한 계좌만 선택하세요.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cmaFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal/calculator" },
    { "@type": "ListItem", position: 3, name: "CMA 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="cma-interest-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="cma-interest-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="cma-interest-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`CMA 이자 계산기 - 하루 이자와 세후 수익 바로 확인`}
        hero={`보관할 금액과 예상 수익률, 보유일수를 입력하면 세전·세후 예상 수익을 비교할 수 있습니다. 실제 수익은 CMA 유형과 운용·재투자 조건에 따라 달라집니다.`}
        calcChildren={<CmaInterestClient />}
        whenToUse={[
            "주식·ETF 매수 대기 자금을 일반 통장 대신 CMA에 보관 시 받을 이자를 확인할 때",
            "30일·90일·365일 등 보유기간별 예상 수익을 비교하고 싶을 때",
            "CMA와 예금자보호 대상 파킹통장의 세후 예상 이자와 위험을 함께 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "세전 이자 = 예치금 × 연 금리 × (보유 일수 / 365)",
              "세금 = 세전 이자 × 15.4%",
              "세후 이자 = 세전 이자 - 세금",
              "일평균 세후 예상 수익 = 세후 예상 수익 / 보유 일수(실제 일별 지급액과 다름)",
          ],
        } }
        examples={[
            { title: "예시 1 — 2천만 원·연 3.0%·365일", body: "잔액과 수익률이 일정하다고 가정하면 세전 60만 원, 일반적인 15.4% 원천징수 적용 시 세후 약 50만 7,600원입니다. 실제 수익은 운용 조건에 따라 달라집니다." },
            { title: "예시 2 — 1억 원·연 3.5%·90일", body: "단순 계산상 세전 약 86만 3천 원, 세후 약 73만 원입니다. 이는 CMA 자체의 예상 수익이지 다른 통장과의 수익 차이가 아닙니다. 비교하려는 통장의 이자도 따로 계산하세요." },
        ]}
        faqs={cmaFaqs}
        relatedCalculators={[
            { label: "파킹통장 이자 계산기", href: "/cal/parking-account" },
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "비상금 필요 금액 계산기", href: "/cal/emergency-fund" },
        ]}
        officialSources={["증권사 CMA 핵심상품설명서", "국세청 이자소득 원천징수 안내", "예금자보호 적용 여부 안내"]}
        caution={`이 계산기는 잔액·수익률이 일정한 단리 가정입니다. CMA 유형별 정산·재투자·세금과 수익률 변동을 반영하지 못하며, 일반 증권사 CMA는 예금자보호 대상이 아니고 원금손실 가능성이 있습니다. 상품설명서를 확인하세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="CMA 이자 계산기" updatedAt="2026-10-20" />
      </div>
    </>
  );
}
