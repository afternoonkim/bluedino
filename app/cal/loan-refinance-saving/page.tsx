import type { Metadata } from "next";
import Script from "next/script";
import LoanRefinanceSavingClient from "./LoanRefinanceSavingClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/loan-refinance-saving";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "대출 갈아타기 절감액 계산기 | BlueDino";
const pageDescription = "기존·신규 대출을 동일한 잔여 만기의 원리금균등상환으로 비교해 월 상환액, 전체 이자 차이, 수수료 차감 후 절감액과 비용 회수 시점을 확인하세요.";

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

const refinancingFaqs = [
  { question: "갈아타기 비용을 언제 회수하나요?", answer: "현재 계산기는 같은 잔액·남은 만기·원리금균등상환을 가정하고 매월 이자 차이가 누적 비용을 넘는 시점을 보여줍니다. 중간 시점에는 두 대출의 남은 원금도 달라질 수 있어 실제 조기 상환 손익과는 다릅니다." },
  { question: "금리 차이만 비교하면 되나요?", answer: "아니요. 기존 대출의 실제 중도상환수수료, 신규 인지세·설정비 등 부대비용, 우대금리 유지 조건을 함께 확인해야 합니다. 수수료율은 대출 약정과 실행 시기에 따라 달라질 수 있습니다." },
  { question: "갈아타면서 만기를 늘리거나 줄이면 어떻게 되나요?", answer: "이 계산기는 남은 만기가 동일하다는 가정으로만 비교합니다. 만기가 바뀌면 월 납입액과 총이자가 크게 달라지므로 금융회사에서 받은 두 상환예정표를 직접 비교하세요." },
  { question: "변동금리나 정책대출에도 결과를 그대로 적용할 수 있나요?", answer: "현재 입력한 금리가 만기까지 유지된다고 가정하므로 변동금리에는 오차가 생깁니다. 정책대출의 우대 조건 상실 여부와 신규 DSR·LTV 심사도 확인해야 합니다." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: refinancingFaqs.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "투자 계산기", item: "https://bluedino.kr/cal" },
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
        hero={`기존 대출과 새 대출을 같은 남은 만기의 원리금균등상환으로 비교합니다. 월 상환액·전체 이자 차이·수수료 차감 결과를 확인하고 실제 상환예정표와 대조하세요.`}
        calcChildren={<LoanRefinanceSavingClient />}
        whenToUse={[
            "현재 주담대 금리가 시중 평균보다 높아 갈아타기를 고민할 때",
            "고정금리 종료 시점이 다가와 변동금리로 자동 전환을 앞두고 결정해야 할 때",
            "중도상환수수료와 신규 대출 비용을 감안해 실제로 이득인지 확인하고 싶을 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "월 상환액 = 대출잔액 × 월이율 ÷ [1 - (1 + 월이율)^(-남은 개월 수)] (원리금균등, 0%면 잔액 ÷ 개월 수)",
              "매월 이자 = 해당 월 상환 전 잔액 × 월이율. 기존·신규 대출 각각의 전체 이자를 합산해 차이를 계산합니다.",
              "총 갈아타기 비용 = 기존 대출 잔액 × 입력한 중도상환수수료율 + 신규 부대비용",
              "수수료 차감 후 이자 차이 = 전체 기간의 이자 차이 - 총 갈아타기 비용. 비용 회수 시점은 월별 누적 이자 차이 기준 참고값입니다.",
          ],
        } }
        examples={[
            { title: "예시 1 — 잔액 4억 원·5.0% → 4.3%·20년 남음", body: "원리금균등상환 기준 첫 12개월 이자 차이는 약 278만 원, 전체 이자 차이는 약 3,653만 원입니다. 중도상환수수료 480만 원과 부대비용 200만 원을 빼면 약 2,973만 원의 이자 차이가 남고, 월별 누적 이자 차이는 약 30개월째 비용을 넘습니다." },
            { title: "예시 2 — 잔액 2억 원·4.5% → 4.2%·5년 남음", body: "전체 이자 차이는 약 163만 원인데 중도상환수수료 240만 원과 부대비용 40만 원을 합치면 280만 원입니다. 같은 만기·원리금균등상환 가정에서는 비용이 더 커 약 117만 원 불리합니다." },
        ]}
        faqs={refinancingFaqs}
        relatedCalculators={[
            { label: "주담대 계산기", href: "/cal/mortgage" },
            { label: "DSR 계산기", href: "/cal/dsr" },
            { label: "중도상환수수료 계산기", href: "/cal/prepayment-fee" },
        ]}
        officialSources={[{ label: "금융위원회 대출 갈아타기 서비스 안내", href: "https://www.fsc.go.kr/no010101/82366" }, { label: "금융위원회 중도상환수수료 개편 안내", href: "https://www.fsc.go.kr/no010101?curPage=2&srchKey=sj&srchText=%EC%88%98%EC%88%98%EB%A3%8C" }, "취급 금융회사 대출 상품 설명서·상환예정표"]}
        caution={`계산은 같은 잔액·만기·원리금균등상환·고정금리를 가정한 이자 비교입니다. 실제 갈아타기는 DSR·LTV 재심사, 만기·상환방식 변경, 중도상환수수료 실제 견적, 정책상품 우대 조건 상실 등을 함께 확인하세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="대출 갈아타기 절감액 계산기" updatedAt="2026-10-29" />
      </div>
    </>
  );
}
