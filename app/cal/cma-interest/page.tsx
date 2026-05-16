import type { Metadata } from "next";
import Script from "next/script";
import CmaInterestClient from "./CmaInterestClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/cma-interest";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "CMA 이자 계산기 | BlueDino";
const pageDescription = "CMA 예치금·연 금리·보유 일수로 일별 평균 이자와 총 누적 세후 이자를 계산하는 BlueDino 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["CMA 이자 계산기", "CMA 금리", "RP형 CMA", "투자 대기자금 이자"],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "CMA의 RP형·MMF형·발행어음형 차이는?", answer: "RP형은 환매조건부 채권에 운용되어 안정적이고 가장 일반적입니다. MMF형은 단기 채권형 펀드, 발행어음형은 증권사 자체 어음에 운용되어 약간 더 높은 금리를 받기도 합니다. 안전성·금리 트레이드오프를 확인하세요." },
            { question: "CMA도 예금자보호가 되나요?", answer: "발행어음형 CMA(증권사 어음 발행)는 예금자보호 대상이 아닙니다. RP형·MMF형은 운용 방식과 증권사별 차이가 있어 가입 전 보장 범위를 약관에서 확인하세요." },
            { question: "CMA에서 주식 매수가 바로 되나요?", answer: "네. CMA 계좌는 일반 증권 계좌와 연결되어 주식·ETF 매수 시 즉시 차감됩니다. 매수 대기 자금을 그대로 두면 이자가 붙어 \"투자 대기자금 보관\"에 적합합니다." },
            { question: "CMA와 파킹통장 둘 다 가입할 가치가 있나요?", answer: "네. 비상금·생활비는 파킹통장에, 투자 대기자금은 CMA에 두는 식으로 \"용도별 분리\"가 효율적입니다." },
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
        title={`CMA 이자 계산기`}
        hero={`증권사 CMA(RP형·MMF형·발행어음형) 계좌의 일별 이자 계산을 보유 기간 기준으로 합산합니다. 보통 매일 이자가 붙어 매월 입금되는 구조입니다.`}
        calcChildren={<CmaInterestClient />}
        whenToUse={[
            "주식·ETF 매수 대기 자금을 일반 통장 대신 CMA에 보관 시 받을 이자를 확인할 때",
            "한 달·6개월·1년 등 기간별 누적 이자를 비교하고 싶을 때",
            "CMA와 파킹통장 중 어느 쪽이 본인 자금에 유리한지 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "세전 이자 = 예치금 × 연 금리 × (보유 일수 / 365)",
              "세금 = 세전 이자 × 15.4%",
              "세후 이자 = 세전 이자 - 세금",
              "일 평균 세후 이자 = 세후 이자 / 보유 일수",
          ],
        } }
        examples={[
            { title: "예시 1 — 2천만 원·연 3.0%·365일", body: "세전 60만 원·세금 약 9.2만 원·세후 약 50.8만 원. 일 평균 약 1,390원. 일반 통장이라면 거의 0원." },
            { title: "예시 2 — 1억 원·연 3.5%·90일", body: "세전 약 86만 원·세후 약 73만 원. 3개월 단기 대기자금을 일반 통장 대신 CMA에 두면 73만 원 차이." },
        ]}
        faqs={[
            { question: "CMA의 RP형·MMF형·발행어음형 차이는?", answer: "RP형은 환매조건부 채권에 운용되어 안정적이고 가장 일반적입니다. MMF형은 단기 채권형 펀드, 발행어음형은 증권사 자체 어음에 운용되어 약간 더 높은 금리를 받기도 합니다. 안전성·금리 트레이드오프를 확인하세요." },
            { question: "CMA도 예금자보호가 되나요?", answer: "발행어음형 CMA(증권사 어음 발행)는 예금자보호 대상이 아닙니다. RP형·MMF형은 운용 방식과 증권사별 차이가 있어 가입 전 보장 범위를 약관에서 확인하세요." },
            { question: "CMA에서 주식 매수가 바로 되나요?", answer: "네. CMA 계좌는 일반 증권 계좌와 연결되어 주식·ETF 매수 시 즉시 차감됩니다. 매수 대기 자금을 그대로 두면 이자가 붙어 \"투자 대기자금 보관\"에 적합합니다." },
            { question: "CMA와 파킹통장 둘 다 가입할 가치가 있나요?", answer: "네. 비상금·생활비는 파킹통장에, 투자 대기자금은 CMA에 두는 식으로 \"용도별 분리\"가 효율적입니다." },
        ]}
        relatedCalculators={[
            { label: "파킹통장 이자 계산기", href: "/cal/parking-account" },
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "비상금 필요 금액 계산기", href: "/cal/emergency-fund" },
        ]}
        officialSources={["금융감독원 금융투자상품 안내", "증권사 CMA 상품 설명서", "예금자보호 적용 여부 안내"]}
        caution={`CMA 금리는 시장 단기금리에 연동되어 매일 변동됩니다. 본 계산기는 현재 금리가 유지된다는 단순 가정이므로 장기 보유 시 실제 이자가 다를 수 있습니다.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="CMA 이자 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
