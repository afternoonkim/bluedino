import type { Metadata } from "next";
import Script from "next/script";
import ParkingAccountClient from "./ParkingAccountClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/parking-account";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "파킹통장 이자 계산기 | 금리·우대 한도·월 이자 계산 | BlueDino";
const pageDescription = "파킹통장 예치금과 금액별 적용금리, 보유기간을 입력해 세전·세후 예상 이자를 비교하세요. 실제 지급액은 잔액·금리 변동과 상품별 지급일에 따라 달라집니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["파킹통장 금리 계산기", "파킹통장 금리계산", "파킹통장 이자 계산기", "파킹통장 한도", "파킹통장 비교", "비상금 이자"],
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
  name: "파킹통장 이자 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "파킹통장과 CMA 중 어느 게 좋나요?", answer: "은행의 보호대상 예금은 금융회사별 1인당 원금과 소정의 이자를 합쳐 1억 원까지 보호됩니다. 일반적인 증권사 RP형 CMA는 예금자보호 대상이 아니므로 상품설명서에서 유형과 보호 여부를 확인하세요." },
            { question: "파킹통장 한도를 초과하면 어떻게 되나요?", answer: "우대금리 적용 한도를 넘는 금액에는 별도 금리가 적용될 수 있습니다. 초과분 금리는 상품마다 다르므로 설명서의 금리 구간을 확인하고 계산기에 직접 입력하세요." },
            { question: "우대 금리 조건은 보통 어떤 게 있나요?", answer: "급여이체, 카드 이용, 신규 고객 또는 금리쿠폰 등 상품마다 조건이 다릅니다. 내 예치금 전체에 적용되는지, 조건이 유지되는 기간은 언제까지인지 확인하세요." },
            { question: "이자는 언제 입금되나요?", answer: "매일 잔액을 기준으로 계산하더라도 실제 지급일은 상품마다 다릅니다. 월 정기 지급일 또는 고객이 직접 받는 기능이 있을 수 있으니 약관에서 \"이자 지급일\"을 확인하세요." },
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
    { "@type": "ListItem", position: 2, name: "금융 계산기", item: "https://bluedino.kr/cal" },
    { "@type": "ListItem", position: 3, name: "파킹통장 이자 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="parking-account-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="parking-account-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="parking-account-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`파킹통장 이자 계산기 - 금리와 우대 한도별 월 이자 확인`}
        hero={`예치금 전체에 광고 금리가 적용되는지 헷갈릴 때 사용하세요. 우대금리 한도와 초과분 금리를 나눠 월 이자와 세후 수령액을 계산합니다.`}
        calcChildren={<ParkingAccountClient />}
        whenToUse={[
            "여러 파킹통장 상품을 비교해 본인 자금에 가장 유리한 곳을 고를 때",
            "비상금 보관 시 매월 받는 이자가 얼마인지 미리 알아볼 때",
            "한도가 큰 파킹통장 vs 분산 보관(여러 통장) 중 어느 쪽이 유리한지 점검할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "유효 예치금 = MIN(예치금, 한도)",
              "한도 초과분 = MAX(0, 예치금 - 한도) — 입력한 초과분 금리 적용",
              "세전 예상 이자 = (한도 내 예치금 × 한도 내 연 금리 + 초과분 × 초과분 연 금리) × 보유 개월수 ÷ 12",
              "월 평균 세후 이자 = 세전 예상 이자 × (1 - 15.4%) ÷ 보유 개월수 — 실제 월별 지급액과 다를 수 있음",
          ],
        } }
        examples={[
            { title: "예시 1 — 5천만 원·한도 5천만 원·연 3.5%·12개월", body: "잔액과 금리가 일정한 가정에서 세전 175만 원, 15.4% 단순 원천징수 후 세후 약 148만 500원입니다. 월 평균은 약 12만 3,375원이지만 실제 월별 지급액과는 다릅니다." },
            { title: "예시 2 — 1억 원·한도 5천만 원·연 4.0%·초과분 0.1%·6개월", body: "한도 내 5천만 원의 세전 이자 100만 원과 초과분 5천만 원의 세전 이자 2만 5천 원을 합쳐 세전 102만 5천 원, 15.4% 단순 공제 후 세후 약 86만 7,150원입니다. 분산 보관이 항상 유리한 것은 아닙니다." },
        ]}
        faqs={[
            { question: "파킹통장과 CMA 중 어느 게 좋나요?", answer: "은행의 보호대상 예금은 금융회사별 1인당 원금과 소정의 이자를 합쳐 1억 원까지 보호됩니다. 일반적인 증권사 RP형 CMA는 예금자보호 대상이 아니므로 상품설명서에서 유형과 보호 여부를 확인하세요." },
            { question: "파킹통장 한도를 초과하면 어떻게 되나요?", answer: "우대금리 적용 한도를 넘는 금액에는 별도 금리가 적용될 수 있습니다. 초과분 금리는 상품마다 다르므로 설명서의 금리 구간을 확인하고 계산기에 직접 입력하세요." },
            { question: "우대 금리 조건은 보통 어떤 게 있나요?", answer: "급여이체, 카드 이용, 신규 고객 또는 금리쿠폰 등 상품마다 조건이 다릅니다. 내 예치금 전체에 적용되는지, 조건이 유지되는 기간은 언제까지인지 확인하세요." },
            { question: "이자는 언제 입금되나요?", answer: "매일 잔액을 기준으로 계산하더라도 실제 지급일은 상품마다 다릅니다. 월 정기 지급일 또는 고객이 직접 받는 기능이 있을 수 있으니 약관에서 \"이자 지급일\"을 확인하세요." },
        ]}
        relatedCalculators={[
            { label: "CMA 이자 계산기", href: "/cal/cma-interest" },
            { label: "예금 이자 계산기", href: "/cal/deposit-interest" },
            { label: "비상금 필요 금액 계산기", href: "/cal/emergency-fund" },
        ]}
        officialSources={["금융감독원 금융상품 안내", "예금보험공사 예금자보호 안내", "취급 금융회사 수시입출금 상품 설명서"]}
        caution={`파킹통장 금리와 우대 조건은 상품별로 수시로 달라질 수 있습니다. 이 계산은 일정한 잔액·금리와 일반적인 이자소득 원천징수 15.4%를 가정한 단순 추정이며, 실제 지급일·원 단위 처리·개인별 세금은 다를 수 있습니다. 가입 전 상품설명서를 확인하세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="파킹통장 이자 계산기" updatedAt="2026-10-15" />
      </div>
    </>
  );
}
