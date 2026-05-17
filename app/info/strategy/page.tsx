import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "투자전략 가이드 | 상황별·연령별 맞춤 투자전략 11가지 | BlueDino",
  description:
    "20대 사회 초년생, 1인 가구, 신혼부부·딩크족, 출산가정, 자녀 키우는 가정, 고소득자, 프리랜서, 대출 병행 투자, 첫 내 집 마련, 은퇴 5~10년 전, 은퇴 후 자산 운용까지 11가지 상황별 투자전략을 실제 투자 판단에 필요한 기준 중심으로 정리한 BlueDino 투자전략 모음",
  keywords: [
    "투자전략",
    "상황별 투자전략",
    "1인 가구 투자전략",
    "신혼부부 투자전략",
    "딩크족 투자전략",
    "프리랜서 투자전략",
    "고소득자 투자전략",
    "은퇴 투자전략",
    "내 집 마련 투자",
    "대출 병행 투자",
    "연령별 투자전략",
    "20대 투자",
    "30대 투자",
    "40대 투자",
    "50대 투자",
  ],
  alternates: { canonical: "/info/strategy" },
  openGraph: {
    title: "투자전략 가이드 | 상황별·연령별 맞춤 투자전략 11가지 | BlueDino",
    description:
      "1인 가구·딩크족·출산가정·고소득자·프리랜서·은퇴 전후·내 집 마련 등 11가지 상황별 투자전략과 절세계좌·자산배분·배당·ETF·하락장 대응 같은 핵심 전략을 한 번에 비교할 수 있는 투자전략 허브입니다.",
    url: "https://bluedino.kr/info/strategy",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "투자전략 가이드 | 상황별·연령별 맞춤 투자전략 11가지 | BlueDino",
    description:
      "내 상황(1인·신혼·출산·자녀·고소득·프리랜서·은퇴 전후·내 집 마련)에 맞는 투자전략을 11가지 카드로 비교할 수 있는 BlueDino 투자전략 허브.",
  },
};

type StrategyCard = {
  title: string;
  href: string;
  summary: string;
  tags: string[];
  audience: string;
  priority: string;
};

const recommendedSteps = [
  {
    step: "1단계",
    title: "내 상황 고르기",
    description: "연령, 자녀 유무, 은퇴 준비 여부처럼 지금 가장 가까운 상황부터 선택합니다.",
  },
  {
    step: "2단계",
    title: "자금 목적 나누기",
    description: "생활비, 비상금, 장기투자금, 자녀 교육자금처럼 돈의 사용 시점을 분리합니다.",
  },
  {
    step: "3단계",
    title: "계좌와 자산 연결하기",
    description: "절세계좌, ETF, 배당, 현금성 자산을 내 목적에 맞게 배치합니다.",
  },
];

const lifeStageCards: StrategyCard[] = [
  {
    title: "연령별 투자전략 어떻게 달라져야 할까",
    href: "/info/strategy/age-based-investing",
    summary: "20대부터 50대 이후까지 투자 기간과 현금흐름에 따라 달라지는 투자전략을 정리합니다.",
    tags: ["연령별 투자전략", "20대 투자", "40대 투자"],
    audience: "나이에 맞는 투자 방향이 헷갈리는 분",
    priority: "투자 기간과 위험 비중 조절",
  },
  {
    title: "출산가정 투자전략 어떻게 시작해야 할까",
    href: "/info/strategy/new-parent-investing",
    summary: "출산 직후 늘어나는 지출과 줄어드는 여유자금 속에서 무리하지 않는 투자 순서를 정리합니다.",
    tags: ["출산가정", "육아비", "비상금"],
    audience: "출산 전후 돈 관리와 투자를 함께 고민하는 가정",
    priority: "비상금과 현금흐름 안정",
  },
  {
    title: "아이 키우는 가정 투자전략 어떻게 짜야 할까",
    href: "/info/strategy/family-with-children-investing",
    summary: "교육비, 주거비, 노후 준비를 동시에 챙겨야 하는 가정을 위한 현실적인 투자전략입니다.",
    tags: ["자녀교육비", "가정 투자", "장기투자"],
    audience: "아이 교육비와 부모 노후를 함께 준비하는 가정",
    priority: "교육비와 노후자금 분리",
  },
  {
    title: "1인 가구 투자전략 어떻게 짜야 할까",
    href: "/info/strategy/single-investor",
    summary: "사회 초년생부터 1인 가구로 살아가는 분이 비상금·고정비·장기 자산을 어떻게 분리할지 정리합니다.",
    tags: ["1인 가구", "사회 초년생", "비상금"],
    audience: "혼자 살면서 자산을 쌓아가는 분",
    priority: "비상금 6개월치 + 고정비 통제",
  },
  {
    title: "신혼부부·딩크족 투자전략 어떻게 세워야 할까",
    href: "/info/strategy/couple-no-kids",
    summary: "맞벌이 신혼부부·딩크족이 두 사람 소득을 합쳐 자산을 빠르게 쌓는 투자전략을 정리합니다.",
    tags: ["신혼부부", "딩크족", "맞벌이"],
    audience: "자녀 계획 없이 두 사람 소득을 운용하는 부부",
    priority: "부부 각자 절세 한도 + 노후 1.5배 준비",
  },
  {
    title: "고소득자 투자전략 — 절세와 분산을 동시에",
    href: "/info/strategy/high-income-investor",
    summary: "연봉 1억 원 이상 고소득자가 종합소득세 누진을 피하고 자산을 분산하는 절세 중심 투자전략입니다.",
    tags: ["고소득자", "종합과세", "절세분산"],
    audience: "연 소득 1억 원 이상이라 종합소득세 누진이 부담스러운 분",
    priority: "ISA·사적연금 풀활용 + 자산 분산",
  },
  {
    title: "프리랜서·자영업자 투자전략 어떻게 짜야 할까",
    href: "/info/strategy/freelancer-investor",
    summary: "월 소득이 들쭉날쭉한 프리랜서·자영업자가 비상금, 사업 자금, 사적연금을 분리해 자산을 쌓는 전략입니다.",
    tags: ["프리랜서", "자영업자", "불규칙 소득"],
    audience: "월 소득 변동이 큰 프리랜서·1인 사업자",
    priority: "비상금 9개월 + 사적연금 자동이체",
  },
  {
    title: "빚 갚으면서 투자전략 — 대출과 투자 동시에 어떻게",
    href: "/info/strategy/debt-while-investing",
    summary: "주담대·신용대출이 있는 상태에서 빚 갚기와 투자를 병행할 때 우선순위와 비율을 정하는 전략입니다.",
    tags: ["대출+투자", "주담대", "병행 전략"],
    audience: "대출이 있는 상태에서 투자를 시작하려는 분",
    priority: "금리 6% 이상은 상환 우선",
  },
  {
    title: "은퇴 5~10년 전 투자전략 — 50대 자산 점검과 인출 준비",
    href: "/info/strategy/pre-retirement-investor",
    summary: "은퇴 5~10년 전 50대가 자산 비중 조정과 인출 시점 설계를 어떻게 시작할지 정리합니다.",
    tags: ["50대", "은퇴 준비", "자산 점검"],
    audience: "은퇴를 5~10년 앞둔 50대",
    priority: "위험자산 점진 조정 + 인출 설계",
  },
  {
    title: "은퇴 후 자산 운용 전략 — 인출과 운용을 동시에",
    href: "/info/strategy/post-retirement-investor",
    summary: "은퇴 후 60대 이상이 자산을 인출하면서도 일정 부분은 계속 운용해 자산 수명을 늘리는 전략입니다.",
    tags: ["은퇴 후", "60대", "인출 + 운용"],
    audience: "은퇴 직후 자산 운용 방향을 정해야 하는 60대",
    priority: "3개 양동이 + SWR 4%",
  },
  {
    title: "첫 내 집 마련과 투자 병행 전략",
    href: "/info/strategy/first-housing-investor",
    summary: "첫 내 집 마련과 투자를 병행할 때 비상금 회복·절세 한도 활용·갈아타기 시점을 정리합니다.",
    tags: ["첫 내 집", "주담대", "병행 투자"],
    audience: "첫 주담대 받고 이사한 신혼부부·가족",
    priority: "비상금 회복 → 절세 한도 활용",
  },
];

const coreCards: StrategyCard[] = [
  {
    title: "절세계좌 활용 투자전략 어떻게 짜야 할까",
    href: "/info/strategy/tax-efficient-investing",
    summary: "ISA, 연금저축, IRP를 어떤 역할로 나누면 좋은지부터 정리합니다.",
    tags: ["절세계좌", "ISA", "세후 수익"],
    audience: "세금까지 고려해 투자 효율을 높이고 싶은 분",
    priority: "계좌별 역할 구분",
  },
  {
    title: "자산배분 전략 꼭 해야 할까",
    href: "/info/strategy/asset-allocation",
    summary: "종목 선택보다 먼저 자산 비중을 정해야 하는 이유를 설명합니다.",
    tags: ["자산배분", "분산투자", "리스크"],
    audience: "투자 비중을 어떻게 나눌지 고민하는 분",
    priority: "변동성 관리",
  },
  {
    title: "ETF 코어-새틀라이트 전략 어떻게 활용할까",
    href: "/info/strategy/etf-core-satellite",
    summary: "핵심 자산과 공격 자산을 나눠 ETF 포트폴리오를 짜는 방법입니다.",
    tags: ["ETF", "코어", "새틀라이트"],
    audience: "ETF 중심으로 단순한 포트폴리오를 만들고 싶은 분",
    priority: "중심 자산과 테마 자산 분리",
  },
  {
    title: "배당 투자 전략 어떻게 세워야 할까",
    href: "/info/strategy/dividend",
    summary: "배당률이 아니라 지속 가능성과 목적까지 함께 보는 배당 전략입니다.",
    tags: ["배당", "현금흐름", "재투자"],
    audience: "월 현금흐름과 장기 재투자를 함께 보고 싶은 분",
    priority: "배당 지속성 점검",
  },
  {
    title: "하락장 대응 전략 어떻게 세워야 할까",
    href: "/info/strategy/market-downturn",
    summary: "급락장에서 감정에 휘둘리지 않기 위한 기준을 정리합니다.",
    tags: ["하락장", "추가매수", "멘탈관리"],
    audience: "시장이 흔들릴 때 매도와 추가매수 사이에서 고민하는 분",
    priority: "현금 여력과 원칙 확인",
  },
  {
    title: "은퇴 후 생활비 전략 어떻게 준비해야 할까",
    href: "/info/strategy/retirement-income",
    summary: "총자산보다 월 생활비와 인출 구조를 먼저 보는 은퇴 전략입니다.",
    tags: ["은퇴", "생활비", "현금흐름"],
    audience: "은퇴 후 매달 쓸 돈을 현실적으로 계산하고 싶은 분",
    priority: "인출 구조와 생활비 설계",
  },
];

export default function StrategyHubPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="bd-card bd-card-padding overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="bd-badge">투자전략 가이드</span>
              <h1 className="mt-4 bd-title-xl">투자전략, 내 상황과 인생 단계에 맞게 골라보세요</h1>
              <p className="mt-4 max-w-4xl bd-text-main">
                투자전략은 남들이 좋다고 하는 상품을 따라가는 일이 아니라, 내 돈을 언제 쓰고 어떤 위험까지 감당할 수 있는지부터 정리하는 일에서 시작됩니다. BlueDino는 1인 가구·신혼부부·딩크족·출산가정·자녀를 키우는 가정·고소득자·프리랜서·대출 병행 투자자·첫 내 집 마련·은퇴 5~10년 전·은퇴 후까지 11가지 상황별 투자전략과 절세계좌·자산배분·배당·ETF 핵심 전략을 한눈에 비교할 수 있도록 비교할 수 있게 구성했습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="#life-stage" className="bd-button-primary">
                  내 상황별 전략 보기
                </Link>
                <Link href="#core-strategy" className="bd-button-secondary">
                  핵심 전략 전체 보기
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm font-semibold text-cyan-200">처음이라면 이렇게 보세요</p>
              <div className="mt-4 space-y-3">
                {recommendedSteps.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <p className="text-xs font-semibold text-cyan-300">{item.step}</p>
                    <h2 className="mt-1 text-base font-bold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bd-grid-3">
          <SummaryBox title="연령별" value="투자 기간" description="나이가 아니라 앞으로 돈을 쓸 시점에 맞춰 위험 비중을 조절합니다." />
          <SummaryBox title="가정별" value="현금흐름" description="출산, 육아, 교육비가 있는 가정은 비상금과 고정지출 관리가 먼저입니다." />
          <SummaryBox title="계좌별" value="세후 수익" description="같은 투자라도 어떤 계좌에 담느냐에 따라 실제 남는 금액이 달라질 수 있습니다." />
        </section>

        <section id="life-stage" className="bd-card-soft bd-card-padding">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="bd-badge">상황별 추천 11가지</span>
              <h2 className="mt-3 bd-title-md">지금 내 상황에서 먼저 볼 투자전략</h2>
              <p className="mt-3 bd-text-sub">
                투자 경험보다 중요한 것은 현재의 생활비, 가족 구성, 소득 형태, 투자 기간입니다. 1인 가구부터 은퇴 후 자산 운용까지 11가지 상황별 카드를 펼쳐, 본인에게 가장 가까운 카드부터 읽어보시면 자기 상황에 바로 대입할 수 있도록 구성했습니다.
              </p>
            </div>
            <Link href="#core-strategy" className="bd-button-secondary">
              전체 전략으로 이동
            </Link>
          </div>
          <div className="mt-6 bd-grid-3">
            {lifeStageCards.map((card) => (
              <StrategyCardLink key={card.href} card={card} highlight />
            ))}
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">투자전략을 고를 때 가장 먼저 확인할 질문</h2>
          <div className="bd-list mt-5">
            <div className="bd-list-item">이 돈은 1년 안에 쓸 돈인가요, 5년 이상 묶어둘 수 있는 돈인가요?</div>
            <div className="bd-list-item">소득이 끊기거나 육아 지출이 늘어도 버틸 비상금이 따로 있나요?</div>
            <div className="bd-list-item">수익률보다 세금, 계좌, 인출 시점까지 함께 보고 있나요?</div>
          </div>
        </section>

        <AdBlock label="투자전략 중간 관련 콘텐츠 영역" format="horizontal" />

        <section id="core-strategy" className="space-y-5">
          <div className="bd-card-soft bd-card-padding">
            <span className="bd-badge">핵심 전략 모음</span>
            <h2 className="mt-3 bd-title-md">목적별로 이어서 보면 좋은 투자전략</h2>
            <p className="mt-3 bd-text-sub">
              절세계좌, 자산배분, 배당, ETF, 하락장, 은퇴 생활비 전략은 서로 따로 떨어진 주제가 아닙니다. 내 상황별 글을 먼저 본 뒤, 필요한 핵심 전략을 이어서 확인하면 포트폴리오 방향을 더 쉽게 잡을 수 있습니다.
            </p>
          </div>
          <div className="bd-grid-2">
            {coreCards.map((card) => (
              <StrategyCardLink key={card.href} card={card} />
            ))}
          </div>
        </section>

        <section className="bd-grid-3">
          <QuickLink
            href="/info/guide"
            label="투자 기초 가이드"
            description="전략이 어렵게 느껴진다면 ETF, 배당, 포트폴리오 같은 기초 개념부터 정리해보세요."
          />
          <QuickLink
            href="/finance"
            label="금융 가이드"
            description="절세계좌, 대출, 연금처럼 실제 생활 판단에 가까운 질문형 콘텐츠를 볼 수 있습니다."
          />
          <QuickLink
            href="/cal/calculator"
            label="배당 계산기"
            description="배당 전략은 예상 배당금과 재투자 효과를 숫자로 넣어볼 때 더 현실적으로 판단할 수 있습니다."
          />
        </section>
      </div>
    </div>
  );
}

function StrategyCardLink({ card, highlight = false }: { card: StrategyCard; highlight?: boolean }) {
  return (
    <Link
      href={card.href}
      className={`group bd-card bd-card-padding transition hover:-translate-y-1 hover:border-slate-700 ${highlight ? "border-cyan-500/30 bg-cyan-950/20" : ""}`}
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
      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
        <p className="text-xs font-semibold text-cyan-300">추천 대상</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{card.audience}</p>
        <p className="mt-3 text-xs font-semibold text-cyan-300">먼저 볼 기준</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{card.priority}</p>
      </div>
      <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
        자세히 보기 →
      </div>
    </Link>
  );
}

function SummaryBox({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="bd-card-soft p-5">
      <p className="text-sm font-semibold text-cyan-300">{title}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
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
    <Link href={href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900">
      <p className="text-sm font-semibold text-cyan-300">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </Link>
  );
}
