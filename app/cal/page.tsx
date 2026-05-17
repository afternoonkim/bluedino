import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { calculatorLandingData } from "./components/calculatorLandingData";

const calculatorGroups = [
  {
    title: "투자·자산 계산기",
    description: "배당, 복리, FIRE, 양도세처럼 투자 계획을 세울 때 자주 쓰는 계산기입니다.",
    slugs: ["calculator", "compound", "fire", "capital-gains", "retirement-tax", "pension-payout", "retirement-target"],
  },
  {
    title: "절세·연금 계산기",
    description: "ISA, IRP, 연금저축, 청년도약계좌처럼 세제와 제도 조건을 함께 확인해야 하는 계산기입니다.",
    slugs: ["isa-tax-savings", "irp-tax-credit", "pension-tax-credit", "youth-leap-account", "youth-future-savings", "salary-net"],
  },
  {
    title: "예금·적금·현금관리 계산기",
    description: "예금 이자, 적금 이자, 파킹통장, CMA, 월 예산처럼 생활 자금 관리에 필요한 계산기입니다.",
    slugs: ["deposit-interest", "installment-savings", "parking-account", "cma-interest", "monthly-budget", "emergency-fund", "child-education-fund"],
  },
  {
    title: "대출·주택 계산기",
    description: "DSR, LTV, 주담대, 대출이자, 중도상환수수료처럼 대출 실행 전 확인해야 하는 계산기입니다.",
    slugs: ["loan-interest", "mortgage", "dsr", "ltv", "home-affordability", "prepayment-fee", "loan-refinance-saving", "jeonse-loan-interest", "jeonse-vs-monthly", "car-installment", "credit-card-installment"],
  },
];


const calculatorHubFaqs = [
  {
    question: "처음 방문했다면 어떤 계산기부터 보면 되나요?",
    answer: "투자 계획은 복리·배당 계산기부터, 대출 계획은 DSR·LTV·대출이자 계산기부터 확인하는 흐름이 적합합니다.",
  },
  {
    question: "계산 결과와 실제 금융회사 조건이 다를 수 있나요?",
    answer: "그럴 수 있습니다. 계산기는 입력값 기준의 참고 결과이며 실제 금리, 세금, 수수료, 심사 기준은 금융회사와 제도 변경에 따라 달라질 수 있습니다.",
  },
  {
    question: "계산기만 보고 바로 결정해도 되나요?",
    answer: "계산 결과는 첫 판단 기준으로 쓰고, 연결된 금융 Q&A와 가이드에서 세금·한도·상환 조건을 한 번 더 확인하는 방식이 적합합니다.",
  },
];

const extraCalculatorLabels: Record<string, { title: string; href: string; description: string }> = {
  "deposit-interest": { title: "예금 이자 계산기", href: "/cal/deposit-interest", description: "예치금, 금리, 기간을 기준으로 만기 이자를 확인합니다." },
  "installment-savings": { title: "적금 이자 계산기", href: "/cal/installment-savings", description: "월 납입액과 기간을 기준으로 적금 만기액을 계산합니다." },
  "parking-account": { title: "파킹통장 계산기", href: "/cal/parking-account", description: "금리 적용 한도와 초과분 금리를 나눠 이자를 확인합니다." },
  "cma-interest": { title: "CMA 이자 계산기", href: "/cal/cma-interest", description: "단기 자금 보관 시 예상 이자를 계산합니다." },
  "monthly-budget": { title: "월 예산 계산기", href: "/cal/monthly-budget", description: "월 소득을 필수지출, 자유지출, 저축·투자로 나눠 봅니다." },
  "emergency-fund": { title: "비상금 계산기", href: "/cal/emergency-fund", description: "월 지출 기준으로 적정 비상금 규모를 계산합니다." },
  "child-education-fund": { title: "자녀 교육비 계산기", href: "/cal/child-education-fund", description: "장기 교육비 목표를 적립식으로 준비하는 흐름을 확인합니다." },
  "pension-payout": { title: "연금 수령액 계산기", href: "/cal/pension-payout", description: "연금 수령 기간과 나이에 따른 세후 수령액을 가늠합니다." },
  "retirement-target": { title: "은퇴 목표자금 계산기", href: "/cal/retirement-target", description: "목표 은퇴자산까지 필요한 저축 규모를 계산합니다." },
  "isa-tax-savings": { title: "ISA 절세 계산기", href: "/cal/isa-tax-savings", description: "예상 순이익 기준 ISA 비과세와 분리과세 효과를 확인합니다." },
  "irp-tax-credit": { title: "IRP 세액공제 계산기", href: "/cal/irp-tax-credit", description: "소득 기준별 IRP 세액공제 예상액을 계산합니다." },
  "pension-tax-credit": { title: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit", description: "연금저축 납입액에 따른 세액공제 효과를 확인합니다." },
  "youth-leap-account": { title: "청년도약계좌 만기 계산기", href: "/cal/youth-leap-account", description: "기존 가입자의 만기 예상액과 정부기여금을 확인합니다." },
  "youth-future-savings": { title: "청년미래적금 계산기", href: "/cal/youth-future-savings", description: "출시 전 공개 구조를 기준으로 예상 만기액을 시뮬레이션합니다." },
  "loan-interest": { title: "대출이자 계산기", href: "/cal/loan-interest", description: "대출금, 금리, 기간별 월 상환액과 총이자를 계산합니다." },
  "mortgage": { title: "주담대 계산기", href: "/cal/mortgage", description: "주택담보대출 월 상환액과 총이자 부담을 확인합니다." },
  "dsr": { title: "DSR 계산기", href: "/cal/dsr", description: "연소득 대비 연간 원리금 상환 부담을 계산합니다." },
  "ltv": { title: "LTV 계산기", href: "/cal/ltv", description: "주택가격 기준 대출 가능 비율을 가늠합니다." },
  "home-affordability": { title: "주택 구매 가능 금액 계산기", href: "/cal/home-affordability", description: "대출 가능 금액과 부대비용, 남겨둘 현금을 함께 봅니다." },
  "prepayment-fee": { title: "중도상환수수료 계산기", href: "/cal/prepayment-fee", description: "일부 상환금액 기준 예상 수수료를 계산합니다." },
  "loan-refinance-saving": { title: "대환대출 절감액 계산기", href: "/cal/loan-refinance-saving", description: "갈아타기 전후 이자 절감 가능성을 비교합니다." },
  "jeonse-loan-interest": { title: "전세대출 이자 계산기", href: "/cal/jeonse-loan-interest", description: "전세대출 금리와 금액 기준 월 이자를 확인합니다." },
  "jeonse-vs-monthly": { title: "전세 월세 비교 계산기", href: "/cal/jeonse-vs-monthly", description: "전세와 월세의 월 부담을 기회비용까지 비교합니다." },
  "car-installment": { title: "자동차 할부 계산기", href: "/cal/car-installment", description: "차량 할부 월 납입액과 총비용을 계산합니다." },
  "credit-card-installment": { title: "신용카드 할부 계산기", href: "/cal/credit-card-installment", description: "무이자·부분 무이자·수수료율별 월 청구액을 확인합니다." },
};

function getCalculator(slug: string) {
  const data = calculatorLandingData[slug];
  if (data) return { title: data.title, href: `/cal/${slug}`, description: data.description };
  return extraCalculatorLabels[slug];
}

export const metadata: Metadata = {
  title: "계산기 전체보기 | 금융·투자·대출 계산기 모음 | BlueDino",
  description: "배당 계산기, 복리 계산기, FIRE 계산기, ISA 절세 계산기, DSR·LTV·주담대 계산기까지 BlueDino의 금융 계산기를 한곳에서 확인할 수 있습니다.",
  alternates: { canonical: "/cal" },
  openGraph: {
    title: "계산기 전체보기 | BlueDino",
    description: "투자, 절세, 예금·적금, 대출·주택 계산기를 목적별로 모아 확인할 수 있습니다.",
    url: "https://bluedino.kr/cal",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

export default function CalculatorHubPage() {
  const total = calculatorGroups.reduce((sum, group) => sum + group.slugs.length, 0);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculatorHubFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "금융 계산기", item: "https://bluedino.kr/cal" },
    ],
  };

  return (
    <main className="bd-page">
      <Script id="calculator-hub-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="calculator-hub-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">계산기 전체보기</span>
          <h1 className="bd-title-xl mt-4">금융·투자 계산기 모음</h1>
          <p className="bd-text-main mt-4 max-w-4xl">배당, 복리, FIRE, 예금·적금, ISA·IRP, DSR·LTV·주담대 계산기까지 자주 쓰는 금융 계산기를 목적별로 비교할 수 있게 구성했습니다. 먼저 계산기로 숫자를 확인하고, 연결된 가이드에서 세금과 제도 조건을 함께 점검해 보세요.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-300">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">총 {total}개 계산기</span>
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">투자·절세·대출·생활자금</span>
          </div>
        </section>
        <div className="mt-8 space-y-8">
          {calculatorGroups.map((group) => (
            <section key={group.title} className="bd-card-soft bd-card-padding">
              <h2 className="bd-title-md">{group.title}</h2>
              <p className="bd-text-main mt-3">{group.description}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.slugs.map((slug) => {
                  const item = getCalculator(slug);
                  if (!item) return null;
                  return (
                    <Link key={slug} href={item.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-400/50 hover:bg-cyan-400/10">
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-cyan-300">계산기 열기 →</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="bd-card bd-card-padding mt-8">
          <h2 className="bd-title-md">계산기를 고를 때 먼저 나눠볼 기준</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-base font-bold text-white">투자 계획</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">배당, 복리, FIRE 계산기는 목표 금액과 기간을 먼저 정한 뒤 월 적립액을 조정할 때 유용합니다.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-base font-bold text-white">대출 판단</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">DSR, LTV, 대출이자 계산기는 가능한 한도보다 실제 상환 부담을 먼저 보는 데 초점을 둡니다.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h3 className="text-base font-bold text-white">현금관리</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">예금, 적금, 파킹통장, CMA 계산기는 세후 이자와 자금 사용 시점을 나누어 비교할 때 적합합니다.</p>
            </article>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding mt-8">
          <h2 className="bd-title-md">계산기 전체보기에서 자주 묻는 질문</h2>
          <div className="mt-6 space-y-4">
            {calculatorHubFaqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="bd-text-main mt-3">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
