import type { Metadata } from "next";
import Script from "next/script";
import PensionPayoutClient from "./PensionPayoutClient";
import CalculatorPageLayout from "../components/CalculatorPageLayout";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/pension-payout";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "연금 수령액 계산기 | BlueDino";
const pageDescription = "은퇴 자산·수령 시작 나이·수령 기간·운용 수익률을 입력하면 월 수령액과 연금소득세 적용 후 세후 수령액을 계산하는 BlueDino 계산기.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["연금 수령액 계산기", "연금소득세 계산", "연금 월 수령액", "55세 vs 65세 연금"],
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
  name: "연금 수령액 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
            { question: "연금 수령 시작은 언제가 유리한가요?", answer: "본인의 다른 자산으로 생활비를 충당 가능하다면 70세 이후 수령이 세율이 가장 낮아 유리합니다. 다만 수령 지연 시 운용 리스크와 사망 리스크가 함께 커지므로 본인 건강·다른 자산 상태를 종합 고려하세요." },
            { question: "연금 수령 중에도 세금이 빠지나요?", answer: "네. 매월 수령 시 연금소득세가 원천징수됩니다. 연 1200만 원 초과 수령 시에는 종합소득세 합산 또는 16.5% 분리과세 중 선택할 수 있습니다." },
            { question: "수령 기간을 짧게 잡으면 세금이 더 많이 나오나요?", answer: "10년 미만으로 수령하면 연금소득세 분리과세 혜택이 적용 안 되고 기타소득세(16.5%)가 적용될 수 있습니다. 10년 이상 분할 수령을 권장합니다." },
            { question: "운용 수익률은 어느 정도로 가정해야 현실적인가요?", answer: "은퇴 후 보수적 포트폴리오 기준 연 3~5%가 일반적입니다. 위험 자산 비중이 높으면 5~7%도 가능하지만 변동성이 커지므로 보수적 시뮬레이션이 부담을 줄일 수 있습니다." },
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
    { "@type": "ListItem", position: 3, name: "연금 수령액 계산기", item: pageUrl },
  ],
};

export default function Page() {
  return (
    <>
      <Script id="pension-payout-app-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(webAppSchema) } } />
      <Script id="pension-payout-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(faqSchema) } } />
      <Script id="pension-payout-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify(breadcrumbSchema) } } />
      <CalculatorPageLayout
        title={`연금 수령액 계산기`}
        hero={`은퇴 시점에 누적된 자산을 매월 얼마씩 받을 수 있는지, 연금소득세 차감 후 세후 수령액까지 시뮬레이션합니다. 수령 시작 나이별로 세율이 달라지는 점도 함께 확인하세요.`}
        calcChildren={<PensionPayoutClient />}
        whenToUse={[
            "은퇴를 5~10년 앞두고 누적 자산으로 매월 얼마씩 받을 수 있는지 미리 알아볼 때",
            "만 55세·60세·65세 중 어느 시점부터 수령하는 게 유리한지 비교할 때",
            "운용을 계속할 때와 안전 자산만 둘 때 인출 가능 금액 차이를 보고 싶을 때",
        ]}
        formula={ {
          title: "계산 기준",
          body: [
              "월 세전 수령액 = 누적 자산 × (수익률 / 12) / (1 - (1 + 수익률/12)^(-수령 개월수))",
              "연금소득세율: 만 55~69세 5.5%, 70~79세 4.4%, 80세 이상 3.3% (지방세 포함)",
              "월 세후 수령액 = 월 세전 수령액 × (1 - 연금소득세율)",
              "총 누적 수령액(세후) = 월 세후 × 12 × 수령 기간",
          ],
        } }
        examples={[
            { title: "예시 1 — 65세 은퇴·자산 5억·25년 수령", body: "수익률 4%·25년 수령 가정 시 월 세전 약 263만 원·세후 약 249만 원. 65세 수령이라 세율 5.5% 적용. 누적 세후 수령 약 7.5억." },
            { title: "예시 2 — 70세부터 수령·자산 5억·20년", body: "65세까지 운용해 자산이 약 6.1억으로 증가 + 세율 4.4% 적용. 월 세전 약 369만 원·세후 약 353만 원. 5년 늦게 받지만 누적 세후 수령은 비슷하거나 더 많을 수 있음." },
        ]}
        faqs={[
            { question: "연금 수령 시작은 언제가 유리한가요?", answer: "본인의 다른 자산으로 생활비를 충당 가능하다면 70세 이후 수령이 세율이 가장 낮아 유리합니다. 다만 수령 지연 시 운용 리스크와 사망 리스크가 함께 커지므로 본인 건강·다른 자산 상태를 종합 고려하세요." },
            { question: "연금 수령 중에도 세금이 빠지나요?", answer: "네. 매월 수령 시 연금소득세가 원천징수됩니다. 연 1200만 원 초과 수령 시에는 종합소득세 합산 또는 16.5% 분리과세 중 선택할 수 있습니다." },
            { question: "수령 기간을 짧게 잡으면 세금이 더 많이 나오나요?", answer: "10년 미만으로 수령하면 연금소득세 분리과세 혜택이 적용 안 되고 기타소득세(16.5%)가 적용될 수 있습니다. 10년 이상 분할 수령을 권장합니다." },
            { question: "운용 수익률은 어느 정도로 가정해야 현실적인가요?", answer: "은퇴 후 보수적 포트폴리오 기준 연 3~5%가 일반적입니다. 위험 자산 비중이 높으면 5~7%도 가능하지만 변동성이 커지므로 보수적 시뮬레이션이 부담을 줄일 수 있습니다." },
        ]}
        relatedCalculators={[
            { label: "FIRE 계산기", href: "/cal/fire" },
            { label: "퇴직소득세 계산기", href: "/cal/retirement-tax" },
            { label: "은퇴 필요 자금 계산기", href: "/cal/retirement-target" },
        ]}
        officialSources={[{ label: "국세청 연금소득 과세 안내", href: "https://www.nts.go.kr" }, { label: "금융감독원 연금저축·IRP 안내", href: "https://www.fss.or.kr" }, { label: "가입 금융회사 연금 상품 설명서", href: "https://www.kofia.or.kr" }]}
        caution={`연금소득세율과 종합소득세 합산 기준은 세법 개정에 따라 변경될 수 있습니다. 본인의 실제 수령 계획 전에 국세청 홈택스 또는 가입 금융회사에서 최신 안내를 확인해 주세요.`}
      />
      <div className="bd-container-narrow bd-section">
        <PageTrustFooter pageKind="연금 수령액 계산기" updatedAt="2026-04-27" />
      </div>
    </>
  );
}
