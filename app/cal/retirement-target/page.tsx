import type { Metadata } from "next";
import Script from "next/script";
import RetirementTargetClient from "./RetirementTargetClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/retirement-target";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "은퇴 필요 자금 계산기 | BlueDino";
const pageDescription = "월 노후 생활비·은퇴 기간·인플레이션·수익률·현재 자산·은퇴까지 남은 기간으로 필요 자산과 매월 적립금을 계산하는 BlueDino 은퇴 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["은퇴 필요 자금 계산기", "노후 자금 계산", "은퇴 자산 목표", "노후 적립금"],
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
  name: "은퇴 필요 자금 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "노후 생활비는 어느 정도로 가정해야 하나요?", answer: "국민연금공단 노후생활비 적정 수준 조사 기준 부부 약 268만 원, 1인 가구 약 165만 원입니다. 본인의 노후 라이프스타일(자가·해외여행·의료비 등)을 고려해 조정하시는 게 정확합니다." },
            { question: "은퇴 기간을 30년으로 가정해도 되나요?", answer: "한국 평균 기대수명이 약 83세이므로 65세 은퇴 기준 25~30년이 일반적입니다. 의학 발전을 고려하면 30년이 안전합니다. 본인 가족력·건강 상태를 함께 보세요." },
            { question: "운용 수익률은 어느 정도가 현실적인가요?", answer: "은퇴 전 적립기에는 연 5~7%(주식·ETF 비중 큰 포트폴리오), 은퇴 후 운용기에는 연 3~5%(채권·배당 비중 늘림)가 일반적입니다. 보수적으로 잡으시려면 4~5%를 권합니다." },
            { question: "필요 자산이 너무 커 보이는데 어떻게 하나요?", answer: "월 적립금이 부담스러우면 1) 은퇴 시점을 늦추거나, 2) 노후 생활비 목표를 조정하거나, 3) 저축률을 단계적으로 늘리는 방법이 있습니다. 시뮬레이션 값을 여러 번 바꿔보며 본인에게 맞는 조합을 찾으세요." },
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
    { "@type": "ListItem", position: 3, name: "은퇴 필요 자금 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="retirement-target-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="retirement-target-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="retirement-target-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`은퇴 필요 자금 계산기`}
        hero={`은퇴 시점 월 노후 생활비·은퇴 기간·인플레이션·운용 수익률을 종합 반영해 필요 노후 자산과 "지금부터 매월 얼마씩 적립해야 하는지"를 계산합니다.`}
        calcChildren={<RetirementTargetClient />}
        whenToUse={[
            "은퇴 준비를 본격적으로 시작하면서 필요 자산 목표를 정할 때",
            "현재 적립 속도로 노후 자산이 충분한지 점검할 때",
            "은퇴 시점·생활비·수익률 가정을 바꿔보며 시나리오를 비교할 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "은퇴 시점 월 생활비 = 현재 월 생활비 × (1 + 인플레이션)^(은퇴까지 남은 기간)",
              "실질 수익률 = (1 + 명목 수익률) / (1 + 인플레이션) - 1",
              "필요 자산 = 은퇴 시 연 생활비 × ((1 - (1 + 실질 수익률)^(-은퇴 기간)) / 실질 수익률)",
              "매월 적립금 = (필요 자산 - 현재 자산의 미래가치) × 월 수익률 / ((1 + 월 수익률)^총 개월수 - 1)",
          ],
        } }
        examples={[
            { title: "예시 1 — 35세·월 노후 생활비 300만·은퇴 65세·기간 30년·물가 2.5%·수익률 5%·현재 5천만", body: "은퇴 시 월 생활비 약 629만 원. 필요 자산 약 17.5억 원. 매월 약 162만 원 적립 필요." },
            { title: "예시 2 — 45세·동일 조건·은퇴까지 20년만 남음·현재 1.5억", body: "은퇴 시 월 생활비 약 491만 원. 필요 자산 약 13.7억 원. 매월 약 230만 원 적립 필요. 시작이 늦을수록 매월 부담이 큼." },
        ]}
        faqs={[
            { question: "노후 생활비는 어느 정도로 가정해야 하나요?", answer: "국민연금공단 노후생활비 적정 수준 조사 기준 부부 약 268만 원, 1인 가구 약 165만 원입니다. 본인의 노후 라이프스타일(자가·해외여행·의료비 등)을 고려해 조정하시는 게 정확합니다." },
            { question: "은퇴 기간을 30년으로 가정해도 되나요?", answer: "한국 평균 기대수명이 약 83세이므로 65세 은퇴 기준 25~30년이 일반적입니다. 의학 발전을 고려하면 30년이 안전합니다. 본인 가족력·건강 상태를 함께 보세요." },
            { question: "운용 수익률은 어느 정도가 현실적인가요?", answer: "은퇴 전 적립기에는 연 5~7%(주식·ETF 비중 큰 포트폴리오), 은퇴 후 운용기에는 연 3~5%(채권·배당 비중 늘림)가 일반적입니다. 보수적으로 잡으시려면 4~5%를 권합니다." },
            { question: "필요 자산이 너무 커 보이는데 어떻게 하나요?", answer: "월 적립금이 부담스러우면 1) 은퇴 시점을 늦추거나, 2) 노후 생활비 목표를 조정하거나, 3) 저축률을 단계적으로 늘리는 방법이 있습니다. 시뮬레이션 값을 여러 번 바꿔보며 본인에게 맞는 조합을 찾으세요." },
        ]}
        relatedCalculators={[
            { label: "FIRE 계산기", href: "/cal/fire" },
            { label: "연금 수령액 계산기", href: "/cal/pension-payout" },
            { label: "복리 계산기", href: "/cal/compound" },
        ]}
        officialSources={["금융감독원 노후 준비 안내", "국민연금공단 노후 준비 자료", "개인별 생활비·투자 수익률 가정"]}
        caution={`본 계산기는 일정한 수익률·인플레이션이 유지된다는 단순 가정입니다. 실제는 시장 변동성·세금·국민연금 수령 등이 함께 영향을 주므로 5년 단위로 재점검해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="은퇴 필요 자금 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
