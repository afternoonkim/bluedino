import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

const taxStrategyCards = [
  {
    title: "절세계좌 활용 투자전략",
    href: "/info/strategy/tax-efficient-investing",
    summary: "ISA, 연금저축, IRP를 활용해 세후 수익률을 높이는 방법을 정리했습니다.",
    tags: ["ISA", "연금저축", "세후수익"],
  },
  {
    title: "은퇴 현금흐름 전략",
    href: "/info/strategy/retirement-income",
    summary: "은퇴 후 생활비를 감당할 수 있는 인출 구조와 자산 구성을 생각하는 전략입니다.",
    tags: ["은퇴", "현금흐름", "인출 계획"],
  },
];

const loanStrategyCards = [
  {
    title: "자산배분 전략",
    href: "/info/strategy/asset-allocation",
    summary: "주식, 채권, 현금, 대체자산 비중을 나눠 변동성을 관리하는 기본 전략입니다.",
    tags: ["분산투자", "리스크 관리", "비중 조절"],
  },
  {
    title: "하락장 대응 전략",
    href: "/info/strategy/market-downturn",
    summary: "시장 급락 시 추가 매수, 현금 비중, 멘탈 관리 원칙을 정리합니다.",
    tags: ["하락장", "멘탈관리", "추가매수"],
  },
];

const dividendStrategyCards = [
  {
    title: "배당 투자 전략",
    href: "/info/strategy/dividend",
    summary: "배당률만이 아니라 배당 지속성, 성장성, 세후 현금흐름까지 함께 보는 전략입니다.",
    tags: ["현금흐름", "배당 성장", "장기 보유"],
  },
  {
    title: "ETF 코어-새틀라이트 전략",
    href: "/info/strategy/etf-core-satellite",
    summary: "핵심 자산은 안정적으로, 위성 자산은 공격적으로 운용하는 구조를 설명합니다.",
    tags: ["ETF", "코어", "성장 자산"],
  },
];

export default function StrategyHubPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="mt-4 bd-title-xl">절세계좌 · 대출 판단 · 배당 중심 투자전략</h1>
          <p className="mt-4 max-w-4xl bd-text-main">
            BlueDino의 투자전략 페이지는 단순 종목 추천이 아니라 절세계좌로 세후 수익률을 높이고,
            대출과 리스크를 관리하며, 배당과 현금흐름 전략으로 장기 구조를 만드는 기준을 정리하는 공간입니다.
          </p>

          <div className="mt-6 bd-grid-3">
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">핵심 축</p>
              <p className="mt-2 text-2xl font-black text-white">절세계좌 · 대출 · 배당</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">수익률을 높이는 방법보다 남는 돈의 구조를 먼저 정리하는 흐름으로 바꿨습니다.</p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">함께 보면 좋은 메뉴</p>
              <p className="mt-2 text-2xl font-black text-white">금융 가이드</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">질문형 금융 가이드와 함께 보면 전략이 실제 행동으로 더 쉽게 이어집니다.</p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">실전 연결</p>
              <p className="mt-2 text-2xl font-black text-white">계산기 연계</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">배당, 대출, FIRE 계산기로 전략을 숫자로 검증할 수 있도록 연결했습니다.</p>
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">전략 페이지 활용 순서</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">절세계좌 전략으로 세후 구조를 먼저 잡기</div>
            <div className="bd-list-item">대출과 리스크 전략으로 월 고정비와 변동성 관리하기</div>
            <div className="bd-list-item">배당 전략으로 장기 현금흐름과 재투자 구조 확장하기</div>
          </div>
        </section>

        <AdBlock label="투자전략 중간 광고 영역" format="horizontal" />

        <StrategySection
          badge="1순위"
          title="절세계좌 중심 전략"
          description="세후 수익률을 올리는 구조가 장기 투자 전략의 출발점이 되도록 먼저 배치했습니다."
          cards={taxStrategyCards}
        />

        <StrategySection
          badge="2순위"
          title="대출 판단 · 리스크 관리 전략"
          description="대출 부담과 하락장 대응, 자산배분 감각을 함께 보도록 재정렬했습니다."
          cards={loanStrategyCards}
        />

        <StrategySection
          badge="3순위"
          title="배당 · ETF · 현금흐름 전략"
          description="배당 투자와 ETF 활용을 장기 현금흐름 관점으로 연결해 볼 수 있게 구성했습니다."
          cards={dividendStrategyCards}
        />

        <section className="bd-grid-3">
          <QuickLink
            href="/finance"
            label="금융 가이드"
            description="절세계좌와 대출 질문형 콘텐츠를 먼저 보면 전략 페이지가 훨씬 쉽게 읽힙니다."
          />
          <QuickLink
            href="/info/investment/account-tax-step"
            label="절세계좌 활용순서"
            description="절세계좌를 어떤 순서로 활용할지 기준이 있으면 전략 실행이 훨씬 쉬워집니다."
          />
          <QuickLink
            href="/cal/calculator"
            label="배당 계산기"
            description="배당 전략은 숫자로 검증할수록 더 현실적인 현금흐름 계획으로 바뀝니다."
          />
        </section>
      </div>
    </div>
  );
}

function StrategySection({
  badge,
  title,
  description,
  cards,
}: {
  badge: string;
  title: string;
  description: string;
  cards: { title: string; href: string; summary: string; tags: string[] }[];
}) {
  return (
    <section className="space-y-4">
      <div>
        <span className="bd-badge">{badge}</span>
        <h2 className="mt-4 bd-title-lg">{title}</h2>
        <p className="mt-3 bd-text-sub">{description}</p>
      </div>
      <div className="bd-grid-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bd-card bd-card-padding transition hover:-translate-y-1 hover:border-slate-700"
          >
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span key={tag} className="bd-badge">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{card.summary}</p>
            <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
              자세히 보기 →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuickLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link href={href} className="bd-card bd-card-padding transition hover:border-slate-700">
      <p className="text-sm font-semibold text-cyan-300">바로가기</p>
      <h3 className="mt-3 text-lg font-bold text-white">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
    </Link>
  );
}
