import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

const strategyCards = [
  {
    title: "배당 투자 전략",
    href: "/info/strategy/dividend",
    summary: "배당률만이 아니라 배당 지속성, 성장성, 세후 현금흐름까지 함께 보는 전략입니다.",
    tags: ["현금흐름", "배당 성장", "장기 보유"],
  },
  {
    title: "자산배분 전략",
    href: "/info/strategy/asset-allocation",
    summary: "주식, 채권, 현금, 대체자산 비중을 나눠 변동성을 관리하는 기본 전략입니다.",
    tags: ["분산투자", "리스크 관리", "비중 조절"],
  },
  {
    title: "ETF 코어-새틀라이트 전략",
    href: "/info/strategy/etf-core-satellite",
    summary: "핵심 자산은 안정적으로, 위성 자산은 공격적으로 운용하는 구조를 설명합니다.",
    tags: ["ETF", "코어", "성장 자산"],
  },
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
  {
    title: "하락장 대응 전략",
    href: "/info/strategy/market-downturn",
    summary: "시장 급락 시 추가 매수, 현금 비중, 멘탈 관리 원칙을 정리합니다.",
    tags: ["하락장", "멘탈관리", "추가매수"],
  },
];

export default function StrategyHubPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="mt-4 bd-title-xl">투자전략</h1>
          <p className="mt-4 max-w-4xl bd-text-main">
            BlueDino의 투자전략 페이지는 단순 종목 추천이 아니라 투자 방향을 잡는 기준을 정리하는 공간입니다.
            배당, 자산배분, 절세계좌, 은퇴, 하락장 대응처럼 실제 투자 판단에 자주 연결되는 주제를 중심으로 구성했습니다.
          </p>

          <div className="mt-6 bd-grid-3">
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">전략 콘텐츠</p>
              <p className="mt-2 text-2xl font-black text-white">6개</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">투자 판단에 연결되는 핵심 전략을 우선 정리했습니다.</p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">함께 보면 좋은 메뉴</p>
              <p className="mt-2 text-2xl font-black text-white">투자정보</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">계좌별 세금정보, 절세계좌 활용순서와 함께 보면 세후 수익률 감각이 더 잘 잡힙니다.</p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">실전 연결</p>
              <p className="mt-2 text-2xl font-black text-white">계산기 연계</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">배당 계산기와 FIRE 계산기를 함께 사용하면 전략을 숫자로 검증할 수 있습니다.</p>
            </div>
          </div>
        </section>

        <AdBlock label="투자전략 중간 광고 영역" format="horizontal" />

        <section className="bd-grid-3">
          {strategyCards.map((card) => (
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
              <h2 className="mt-5 text-xl font-bold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{card.summary}</p>
              <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
                자세히 보기 →
              </div>
            </Link>
          ))}
        </section>

        <section className="bd-grid-3">
          <QuickLink
            href="/info/investment/account-tax"
            label="계좌별 세금정보"
            description="어떤 전략이든 세후 수익률이 중요하므로 계좌별 과세 구조를 먼저 확인해 보세요."
          />
          <QuickLink
            href="/info/investment/account-tax-step"
            label="절세계좌 활용순서"
            description="절세계좌를 어떤 순서로 활용할지 기준이 있으면 전략 실행이 훨씬 쉬워집니다."
          />
          <QuickLink
            href="/cal/fire"
            label="FIRE 계산기"
            description="은퇴 전략과 현금흐름 전략은 숫자로 검증할수록 더 현실적인 계획이 됩니다."
          />
        </section>
      </div>
    </div>
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
