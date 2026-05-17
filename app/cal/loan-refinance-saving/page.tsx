import type { Metadata } from "next";
import Script from "next/script";
import LoanRefinanceSavingClient from "./LoanRefinanceSavingClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/loan-refinance-saving";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "대출 갈아타기 절감액 계산기 | BlueDino";
const pageDescription = "대출 잔액·기존 금리·새 금리·잔존 기간·중도상환수수료·부대비용을 입력해 갈아타기 손익분기점과 순절감액을 계산하는 BlueDino 대환대출 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["대출 갈아타기 계산기", "주담대 대환 절감", "대환대출 손익분기점", "중도상환수수료 갈아타기"],
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
  name: "대출 갈아타기 절감액 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "잔존 기간이 짧을 때도 갈아타기가 유리할 수 있나요?", answer: "보통 잔존 5년 미만 + 금리 차이 0.3%p 미만이면 효과가 미미합니다. 다만 중도상환수수료가 이미 면제된 상품이라면 짧은 기간에도 약간의 절감이 가능합니다." },
            { question: "정책상품(보금자리·디딤돌)에서 시중은행으로 갈아타도 되나요?", answer: "가능하지만 정책상품 우대 조건이 사라져 시중은행 금리가 정책상품보다 충분히 낮아야 이득입니다. 일반적으로 정책상품을 만기까지 유지하시는 편이 유리합니다." },
            { question: "변동금리 → 고정금리 갈아타기는 손익을 어떻게 봐야 하나요?", answer: "현재 변동금리가 높고 향후 금리 하락이 예상된다면 변동 유지가 유리하고, 금리 상승 우려가 크다면 고정으로 갈아타기가 유리합니다. \"본인 현금흐름 안정성\"을 우선 기준으로 삼는 것이 부담을 줄일 수 있습니다." },
            { question: "갈아타기 시 신용점수에 영향이 큰가요?", answer: "신규 대출 심사 자체는 단기 영향을 줄 수 있지만, 기존 대출이 정상 상환 종료되면 회복됩니다. 동시 대출 보유 기간을 최소화하면 영향이 줄어듭니다." },
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
    { "@type": "ListItem", position: 3, name: "대출 갈아타기 절감액 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="loan-refinance-saving-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="loan-refinance-saving-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="loan-refinance-saving-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`대출 갈아타기 절감액 계산기`}
        hero={`기존 대출 금리와 새 대출 금리·중도상환수수료·신규 부대비용까지 모두 반영해 "갈아타기로 정말 이득이 되는지"와 "손익분기점이 몇 년인지"를 계산합니다.`}
        calcChildren={<LoanRefinanceSavingClient />}
        whenToUse={[
            "현재 주담대 금리가 시중 평균보다 높아 갈아타기를 고민할 때",
            "고정금리 종료 시점이 다가와 변동금리로 자동 전환을 앞두고 결정해야 할 때",
            "중도상환수수료 면제 시점(3~5년차) 이후 갈아타기 효과를 미리 계산할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "연 이자 절감 = 대출 잔액 × (기존 금리 - 새 금리) / 100",
              "총 비용 = 대출 잔액 × 중도상환수수료율 + 부대비용 (설정비·인지세·감정평가비 등)",
              "손익분기점(년) = 총 비용 / 연 이자 절감",
              "순 절감액 = (연 이자 절감 × 잔존 기간) - 총 비용",
          ],
        } }
        examples={[
            { title: "예시 1 — 잔액 4억·5.0% → 4.3%·20년 남음", body: "연 이자 절감 약 280만 원, 중도상환수수료 1.2%(480만 원) + 부대비용 200만 원 = 총비용 680만 원. 손익분기점 약 2.4년, 잔존 20년 → 순절감 약 5,000만 원." },
            { title: "예시 2 — 잔액 2억·4.5% → 4.2%·5년 남음", body: "연 이자 절감 60만 원, 총비용 약 280만 원 → 손익분기점 약 4.7년. 잔존 5년이라 갈아타기 효과가 거의 없거나 손해. 이 경우 갈아타기 보류가 안전." },
        ]}
        faqs={[
            { question: "잔존 기간이 짧을 때도 갈아타기가 유리할 수 있나요?", answer: "보통 잔존 5년 미만 + 금리 차이 0.3%p 미만이면 효과가 미미합니다. 다만 중도상환수수료가 이미 면제된 상품이라면 짧은 기간에도 약간의 절감이 가능합니다." },
            { question: "정책상품(보금자리·디딤돌)에서 시중은행으로 갈아타도 되나요?", answer: "가능하지만 정책상품 우대 조건이 사라져 시중은행 금리가 정책상품보다 충분히 낮아야 이득입니다. 일반적으로 정책상품을 만기까지 유지하시는 편이 유리합니다." },
            { question: "변동금리 → 고정금리 갈아타기는 손익을 어떻게 봐야 하나요?", answer: "현재 변동금리가 높고 향후 금리 하락이 예상된다면 변동 유지가 유리하고, 금리 상승 우려가 크다면 고정으로 갈아타기가 유리합니다. \"본인 현금흐름 안정성\"을 우선 기준으로 삼는 것이 부담을 줄일 수 있습니다." },
            { question: "갈아타기 시 신용점수에 영향이 큰가요?", answer: "신규 대출 심사 자체는 단기 영향을 줄 수 있지만, 기존 대출이 정상 상환 종료되면 회복됩니다. 동시 대출 보유 기간을 최소화하면 영향이 줄어듭니다." },
        ]}
        relatedCalculators={[
            { label: "주담대 계산기", href: "/cal/mortgage" },
            { label: "DSR 계산기", href: "/cal/dsr" },
            { label: "중도상환수수료 계산기", href: "/cal/prepayment-fee" },
        ]}
        officialSources={["금융감독원 대출 갈아타기 안내", "취급 금융회사 대출 상품 설명서"]}
        caution={`갈아타기 시 신규 대출 심사에서 DSR·LTV가 다시 적용되어 한도가 줄어들 수 있습니다. 정책상품 우대 조건 상실·신용점수 단기 영향도 함께 고려하세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="대출 갈아타기 절감액 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
