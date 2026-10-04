import type { Metadata } from "next";
import Link from "next/link";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { calculatorLandingData } from "./components/calculatorLandingData";

export const metadata: Metadata = {
  title: "금융 계산기 모음 | CMA·할부·파킹통장·배당·대출 계산기 | BlueDino",
  description: "자동차 할부, CMA 이자, 신용카드 할부, 파킹통장, 배당금, 청년도약계좌, DSR·주담대 계산기를 목적별로 바로 찾을 수 있습니다.",
  alternates: { canonical: "/cal" },
};

const groups = [
  { tag: "대출·할부", slugs: ["car-installment", "credit-card-installment", "loan-interest", "mortgage", "dsr", "ltv", "home-affordability", "prepayment-fee", "loan-refinance-saving", "jeonse-loan-interest", "jeonse-vs-monthly"] },
  { tag: "현금관리", slugs: ["cma-interest", "parking-account", "deposit-interest", "installment-savings", "monthly-budget", "emergency-fund"] },
  { tag: "청년·절세·연금", slugs: ["youth-leap-account", "youth-future-savings", "isa-tax-savings", "irp-tax-credit", "pension-tax-credit", "pension-payout", "retirement-tax", "retirement-target", "salary-net"] },
  { tag: "투자", slugs: ["calculator", "compound", "fire", "capital-gains", "child-education-fund"] },
] as const;

const fallback: Record<string, [string, string]> = {
  "car-installment": ["자동차 할부 계산기", "차량 가격과 할부 조건으로 월 납입액과 총이자를 계산합니다."],
  "credit-card-installment": ["신용카드 할부 이자 계산기", "할부 개월과 수수료율에 따른 월 청구액과 총수수료를 확인합니다."],
  "cma-interest": ["CMA 이자 계산기", "예치금과 금리, 기간으로 하루·월·세후 이자를 계산합니다."],
  "parking-account": ["파킹통장 이자 계산기", "우대금리 한도와 초과 금리를 나눠 예상 이자를 계산합니다."],
  "deposit-interest": ["예금 이자 계산기", "예치금, 금리, 기간으로 만기 이자를 계산합니다."],
  "installment-savings": ["적금 이자 계산기", "월 납입액과 기간으로 적금 만기액을 계산합니다."],
  "monthly-budget": ["월 예산 계산기", "월 소득을 지출과 저축·투자 기준으로 나눠 봅니다."],
  "emergency-fund": ["비상금 계산기", "월 지출을 기준으로 필요한 비상금 규모를 계산합니다."],
  "youth-leap-account": ["청년도약계좌 예상금액 계산기", "납입액과 조건에 따른 예상 만기 금액을 확인합니다."],
  "youth-future-savings": ["청년미래적금 계산기", "공개된 조건을 기준으로 예상 만기액을 시뮬레이션합니다."],
  "loan-interest": ["대출이자 계산기", "대출금, 금리, 기간별 월 상환액과 총이자를 계산합니다."],
  "mortgage": ["주담대 계산기", "주택담보대출의 월 상환액과 총이자를 확인합니다."],
  "dsr": ["DSR 계산기", "연소득 대비 연간 원리금 상환 부담을 계산합니다."],
  "ltv": ["LTV 계산기", "주택가격 기준 대출 비율을 계산합니다."],
  "calculator": ["배당금 계산기", "보유 수량과 배당 조건으로 예상 배당금을 계산합니다."],
  "home-affordability": ["주택 구매 가능 금액 계산기", "보유 자금과 대출 가능 금액을 바탕으로 현실적인 주택 구매 예산을 계산합니다."],
  "prepayment-fee": ["중도상환수수료 계산기", "대출 잔액과 상환 시점, 수수료율을 기준으로 중도상환수수료를 계산합니다."],
  "loan-refinance-saving": ["대환대출 절감액 계산기", "기존 대출과 새 대출 조건을 비교해 이자 절감 가능액을 계산합니다."],
  "jeonse-loan-interest": ["전세대출 이자 계산기", "전세대출 금액과 금리 기준으로 월 이자와 연간 이자 부담을 계산합니다."],
  "jeonse-vs-monthly": ["전세·월세 비교 계산기", "보증금과 월세, 기회비용을 함께 반영해 전세와 월세 부담을 비교합니다."],
  "irp-tax-credit": ["IRP 세액공제 계산기", "IRP 납입액과 소득 구간을 기준으로 예상 세액공제 금액을 계산합니다."],
  "pension-tax-credit": ["연금저축 세액공제 계산기", "연금저축 납입액에 따른 예상 세액공제 금액을 계산합니다."],
  "pension-payout": ["연금 수령액 계산기", "적립금과 수령 기간을 기준으로 예상 연금 수령액을 계산합니다."],
  "retirement-tax": ["퇴직연금 세금 계산기", "퇴직연금 수령 방식에 따른 예상 세금 부담을 비교합니다."],
  "retirement-target": ["은퇴 목표자금 계산기", "은퇴 시점과 목표 생활비를 기준으로 필요한 목표자금을 계산합니다."],
  "salary-net": ["연봉 실수령액 계산기", "연봉을 기준으로 세금과 사회보험료를 반영한 예상 실수령액을 계산합니다."],
  "compound": ["복리 계산기", "원금과 수익률, 기간을 기준으로 복리 성장 금액을 계산합니다."],
  "fire": ["FIRE 은퇴 계산기", "목표 생활비와 자산 규모를 기준으로 경제적 독립 목표를 계산합니다."],
  "capital-gains": ["해외주식 양도세 계산기", "매매차익과 기본공제를 반영해 예상 양도소득세를 계산합니다."],
  "child-education-fund": ["자녀 교육비 계산기", "목표 교육비와 준비 기간을 기준으로 필요한 월 저축액을 계산합니다."],
  "isa-tax-savings": ["ISA 절세 계산기", "예상 투자수익을 기준으로 ISA의 절세 효과를 계산합니다."],
};

function itemFor(slug: string) {
  const data = calculatorLandingData[slug];
  const fb = fallback[slug];
  if (data) return { title: data.title, description: data.description };
  if (fb) return { title: fb[0], description: fb[1] };
  return { title: slug.replaceAll("-", " "), description: "입력값을 바탕으로 필요한 금액을 계산합니다." };
}

const popular = ["youth-future-savings", "car-installment", "cma-interest", "credit-card-installment", "parking-account", "calculator"];

export default function CalculatorHubPage() {
  const listItems: TaggedListItem[] = groups.flatMap((group) => group.slugs.map((slug) => { const item = itemFor(slug); return { title: item.title, description: item.description, href: `/cal/${slug}`, badge: group.tag, tags: [group.tag, item.title], cta: "계산하기" }; }));
  return (
    <main className="bd-page">
      <div className="bd-container space-y-10 md:space-y-14">
        <header className="max-w-3xl py-4 md:py-8">
          <span className="bd-badge">계산기</span>
          <h1 className="bd-title-xl mt-4">필요한 숫자부터 바로 계산하세요</h1>
          <p className="bd-text-main mt-4">할부·이자·배당·대출·절세 계산기를 한곳에서 찾을 수 있습니다. 필요한 계산기를 골라 내 숫자로 바로 확인해보세요.</p>
        </header>

        <section>
          <h2 className="bd-title-md">많이 찾는 계산기</h2>
          <p className="bd-text-sub mt-2">자주 사용하는 계산기를 빠르게 이용해보세요.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((slug) => { const item = itemFor(slug); return <Link key={slug} href={`/cal/${slug}`} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-cyan-400/40 hover:shadow-sm"><div className="font-bold text-white">{item.title}</div><p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p><div className="mt-4 text-sm font-semibold text-cyan-300">계산하기 →</div></Link>; })}
          </div>
        </section>

        <TaggedList title="계산기 전체보기" description="목적별로 좁히거나 검색어를 입력해 필요한 계산기를 찾으세요." items={listItems} filterTags={groups.map((g) => g.tag)} searchPlaceholder="예: 자동차 할부, CMA, 배당금, DSR, ISA" countLabel="계산기" />
      </div>
    </main>
  );
}
