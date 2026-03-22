import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import { financeCategories } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";

export const metadata: Metadata = {
  title: "금융 질문 가이드 | 절세계좌·대출·배당 중심 정보 | BlueDino",
  description:
    "ISA, IRP, 연금저축 같은 절세계좌와 대출기초, 신용대출, 주담대, 배당 투자 연결 가이드를 한 흐름으로 정리한 BlueDino 금융 가이드",
  alternates: { canonical: "/finance" },
};

function CategoryCard({
  title,
  description,
  href,
  badge,
  count,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
  count: number;
}) {
  return (
    <article className="bd-card bd-card-padding">
      <div className="flex items-center justify-between gap-3">
        <span className="bd-badge">{badge}</span>
        <span className="text-sm text-slate-400">질문 {count}개</span>
      </div>
      <h3 className="bd-title-md mt-4">{title}</h3>
      <p className="bd-text-main mt-4">{description}</p>
      <div className="mt-6">
        <Link href={href} className="bd-button-primary">
          질문 보러가기
        </Link>
      </div>
    </article>
  );
}

function ResourceCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
}) {
  return (
    <article className="bd-card bd-card-padding">
      <span className="bd-badge">{badge}</span>
      <h3 className="bd-title-md mt-4">{title}</h3>
      <p className="bd-text-main mt-4">{description}</p>
      <div className="mt-6">
        <Link href={href} className="bd-button-secondary">
          바로가기
        </Link>
      </div>
    </article>
  );
}

const dividendResources = [
  {
    title: "배당 투자 기초",
    description: "배당률만 보는 실수를 줄이고 배당 지속성, 성장성, 세후 현금흐름까지 함께 보는 기본 가이드",
    href: "/info/guide/dividend-basics",
    badge: "배당가이드",
  },
  {
    title: "배당 투자 전략",
    description: "현금흐름 중심 투자 관점에서 배당주와 배당 ETF를 어떻게 바라보면 좋은지 정리한 전략 페이지",
    href: "/info/strategy/dividend",
    badge: "배당전략",
  },
  {
    title: "배당 계산기",
    description: "월 배당금, 보유 수량, 재투자 조건을 숫자로 점검할 수 있는 대표 계산기",
    href: "/cal/calculator",
    badge: "대표계산기",
  },
  {
    title: "월배당 ETF 체크포인트",
    description: "월분배만 보고 접근하기 전에 총수익과 구조를 같이 확인하기 위한 체크리스트",
    href: "/info/guide/monthly-dividend-etf-checklist",
    badge: "ETF",
  },
];

export default function FinancePage() {
  const categories = financeCategories.map((category) => ({
    ...category,
    count: getQuestionsByCategory(category.key).length,
  }));

  const taxAccountCategories = categories.filter((category) =>
    ["isa", "irp", "pension", "cma", "parking"].includes(category.key)
  );
  const loanCategories = categories.filter((category) =>
    ["loan-basics", "credit-loan", "mortgage-loan"].includes(category.key)
  );

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">금융 가이드</span>
          <h1 className="bd-title-xl mt-4">절세계좌 · 대출 · 배당 중심 금융 가이드</h1>
          <p className="bd-text-main mt-4">
            BlueDino의 금융 가이드는 이제 절세계좌, 대출, 배당이라는 세 축을 중심으로 다시 정리했습니다.
            계좌를 만들지, 대출을 줄일지, 배당 현금흐름을 키울지처럼 실제 돈의 흐름에 바로 연결되는 주제부터 찾아볼 수 있도록 구성했습니다.
          </p>
          <p className="bd-text-sub mt-3">
            먼저 절세계좌로 세후 수익률의 틀을 잡고, 대출로 고정비와 상환 부담을 점검한 뒤, 배당과 복리 전략으로 장기 현금흐름을 확장하는 흐름으로 보면 이해가 훨씬 쉬워집니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">추천 탐색 순서</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">절세계좌 먼저 보기: ISA · IRP · 연금저축으로 세후 수익률 구조 정리하기</div>
            <div className="bd-list-item">대출 구조 점검하기: DSR · LTV · 신용대출 · 주담대로 월 상환 부담 확인하기</div>
            <div className="bd-list-item">배당 전략 연결하기: 배당 가이드와 배당 계산기로 현금흐름 계획 세우기</div>
          </div>
        </section>

        <section className="bd-section">
          <div>
            <span className="bd-badge">1순위 허브</span>
            <h2 className="bd-title-lg mt-4">절세계좌 중심 질문 모음</h2>
            <p className="bd-text-sub mt-3">
              세금, 연금, 현금관리까지 함께 연결되는 계좌형 콘텐츠를 먼저 정리해두면 이후 투자 전략도 훨씬 명확해집니다.
            </p>
          </div>
          <div className="bd-grid-3">
            {taxAccountCategories.map((category) => (
              <CategoryCard
                key={category.key}
                title={category.shortTitle}
                description={category.description}
                href={category.basePath}
                badge={category.badge}
                count={category.count}
              />
            ))}
          </div>
        </section>

        <AdBlock slotKey="inline" label="금융 가이드 중간 광고 영역" />

        <section className="bd-section">
          <div>
            <span className="bd-badge">2순위 허브</span>
            <h2 className="bd-title-lg mt-4">대출 판단 · 상환 계획 질문 모음</h2>
            <p className="bd-text-sub mt-3">
              대출은 금리만이 아니라 한도, 상환 방식, 규제, 갈아타기 조건까지 함께 봐야 하므로 별도 축으로 정리했습니다.
            </p>
          </div>
          <div className="bd-grid-3">
            {loanCategories.map((category) => (
              <CategoryCard
                key={category.key}
                title={category.shortTitle}
                description={category.description}
                href={category.basePath}
                badge={category.badge}
                count={category.count}
              />
            ))}
          </div>
        </section>

        <section className="bd-section">
          <div>
            <span className="bd-badge">3순위 허브</span>
            <h2 className="bd-title-lg mt-4">배당 · 복리 · 현금흐름 연결 콘텐츠</h2>
            <p className="bd-text-sub mt-3">
              금융 가이드의 질문형 콘텐츠를 읽은 뒤에는 배당 가이드, 전략, 계산기로 이어서 실제 투자 흐름을 숫자로 확인할 수 있도록 연결했습니다.
            </p>
          </div>
          <div className="bd-grid-2">
            {dividendResources.map((resource) => (
              <ResourceCard key={resource.href} {...resource} />
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 바로가기</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
            </Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">
              절세계좌 활용순서
            </Link>
            <Link href="/cal/dsr" className="bd-button-secondary">
              DSR 계산기
            </Link>
            <Link href="/cal/loan-interest" className="bd-button-secondary">
              대출이자 계산기
            </Link>
            <Link href="/cal/calculator" className="bd-button-primary">
              배당 계산기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
