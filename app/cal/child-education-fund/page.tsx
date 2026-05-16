import type { Metadata } from "next";
import Script from "next/script";
import ChildEducationFundClient from "./ChildEducationFundClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/child-education-fund";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "자녀 교육비 준비 계산기 | BlueDino";
const pageDescription = "자녀 나이·대학 진학 시기·연 등록금·인플레이션·수익률로 필요 자금과 매월 적립금을 계산하는 BlueDino 자녀 교육비 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["자녀 교육비 계산기", "대학 등록금 준비", "자녀 적금", "교육비 적립"],
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
  name: "자녀 교육비 준비 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "자녀 명의 적금과 부모 명의 ETF 중 어느 게 좋나요?", answer: "자녀 명의 적금은 \"증여세 비과세 한도\"(미성년 자녀 10년 2천만 원) 안에서 절세 효과가 있고, 부모 명의 ETF·연금저축은 운용 자유도가 높고 절세계좌 활용이 가능합니다. 자금이 크다면 두 가지를 병행하시는 게 효율적입니다." },
            { question: "교육비 상승률을 얼마로 잡아야 하나요?", answer: "한국 대학 등록금은 2010년대 이후 동결·소폭 상승해 평균 약 2~3%입니다. 사립대·의학계열은 더 클 수 있고, 해외 유학은 환율까지 함께 고려해야 합니다." },
            { question: "자녀 적금에 들어간 자금에 세금이 부과되나요?", answer: "자녀 명의 적금 이자는 일반 적금과 같이 15.4% 과세됩니다. 다만 미성년 자녀에게 증여한 자금이 10년 합산 2천만 원 이내라면 증여세가 없습니다. ISA는 자녀가 가입 연령과 소득 요건을 충족하는 시점에 별도로 검토하는 것이 좋습니다." },
            { question: "자녀가 어릴수록 적립 금액이 작아지는 이유는?", answer: "복리 효과 때문입니다. 자녀 0세에 시작하면 18년 동안 적립과 운용이 가능해 매월 부담이 가장 작고, 자녀가 클수록 같은 목표 자금에 도달하기 위한 월 부담이 커집니다." },
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
    { "@type": "ListItem", position: 3, name: "자녀 교육비 준비 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="child-education-fund-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="child-education-fund-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="child-education-fund-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`자녀 교육비 준비 계산기`}
        hero={`자녀의 현재 나이와 대학 진학 시기·연 등록금을 입력하면 인플레이션 반영 후 총 필요 자금과 "지금부터 매월 얼마씩 적립해야 하는지"를 계산합니다.`}
        calcChildren={<ChildEducationFundClient />}
        whenToUse={[
            "자녀가 태어났거나 어려서 대학 학자금을 미리 준비하기 시작할 때",
            "사립대·의학계열·해외 유학 등 학비가 큰 옵션을 고려할 때",
            "자녀 명의 적금, 부모 명의 ETF·연금저축, 자녀가 요건을 충족한 뒤의 ISA 활용까지 단계별로 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "대학 진학까지 남은 기간 = 진학 나이 - 현재 나이",
              "진학 시점 첫 학년 등록금 = 현재 등록금 × (1 + 교육비 상승률)^남은 기간",
              "총 필요 자금 = 진학 기간 동안의 각 학년 등록금 합 (매년 상승률 누적 반영)",
              "매월 적립금 = (총 필요 - 현재 모은 자금의 미래가치) × 월 수익률 / ((1+월 수익률)^총 개월수 - 1)",
          ],
        } }
        examples={[
            { title: "예시 1 — 자녀 5세·진학 19세·연 1,500만·4년·물가 3%·수익률 5%", body: "진학 시점 첫 학년 약 2,267만 원. 4년 누적 약 9,490만 원 필요. 14년 동안 매월 약 38만 원 적립 필요." },
            { title: "예시 2 — 자녀 10세·진학 19세·연 2,000만·4년·물가 4%·수익률 5%·현재 1천만", body: "9년 후 첫 학년 약 2,847만 원. 총 12,083만 원 필요. 현재 자금 미래가치 1,551만 원 차감 후 매월 약 79만 원 적립 필요." },
        ]}
        faqs={[
            { question: "자녀 명의 적금과 부모 명의 ETF 중 어느 게 좋나요?", answer: "자녀 명의 적금은 \"증여세 비과세 한도\"(미성년 자녀 10년 2천만 원) 안에서 절세 효과가 있고, 부모 명의 ETF·연금저축은 운용 자유도가 높고 절세계좌 활용이 가능합니다. 자금이 크다면 두 가지를 병행하시는 게 효율적입니다." },
            { question: "교육비 상승률을 얼마로 잡아야 하나요?", answer: "한국 대학 등록금은 2010년대 이후 동결·소폭 상승해 평균 약 2~3%입니다. 사립대·의학계열은 더 클 수 있고, 해외 유학은 환율까지 함께 고려해야 합니다." },
            { question: "자녀 적금에 들어간 자금에 세금이 부과되나요?", answer: "자녀 명의 적금 이자는 일반 적금과 같이 15.4% 과세됩니다. 다만 미성년 자녀에게 증여한 자금이 10년 합산 2천만 원 이내라면 증여세가 없습니다. ISA는 자녀가 가입 연령과 소득 요건을 충족하는 시점에 별도로 검토하는 것이 좋습니다." },
            { question: "자녀가 어릴수록 적립 금액이 작아지는 이유는?", answer: "복리 효과 때문입니다. 자녀 0세에 시작하면 18년 동안 적립과 운용이 가능해 매월 부담이 가장 작고, 자녀가 클수록 같은 목표 자금에 도달하기 위한 월 부담이 커집니다." },
        ]}
        relatedCalculators={[
            { label: "적금 이자 계산기", href: "/cal/installment-savings" },
            { label: "복리 계산기", href: "/cal/compound" },
            { label: "월 지출 예산 계산기", href: "/cal/monthly-budget" },
        ]}
        accuracyLevel="참고 시뮬레이션"
        officialSources={["국세청 증여세 안내", "금융감독원 자녀 금융교육 안내", "금융회사별 계좌 개설·상품 설명서"]}
        caution={`교육비는 학교·계열·해외 여부에 따라 크게 다릅니다. 본 계산기는 평균 등록금 기준이며, 실제 진학 시 사립·의·약·해외 등은 추가 비용을 따로 산정하시는 게 정확합니다.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="자녀 교육비 준비 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
