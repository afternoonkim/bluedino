import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

const heroCalculators = [
  {
    title: "배당 계산기",
    description: "재투자, 배당 성장률, 월 적립 투자까지 반영한 배당 시뮬레이션",
    href: "/cal/calculator",
    badge: "대표 계산기",
    tag: "배당 · 현금흐름",
  },
  {
    title: "복리 계산기",
    description: "초기 자산과 월 투자금, 목표 금액을 기준으로 복리 성장 흐름을 확인",
    href: "/cal/compound",
    badge: "대표 계산기",
    tag: "장기 적립 · 목표 자산",
  },
  {
    title: "FIRE 계산기",
    description: "목표 자산, 생활비, 수익률을 기준으로 경제적 자유 시점을 계산",
    href: "/cal/fire",
    badge: "대표 계산기",
    tag: "은퇴 계획 · FIRE",
  },
  {
    title: "해외주식 양도세 계산기",
    description: "매매차익과 기본공제를 반영해 예상 세금을 빠르게 확인",
    href: "/cal/capital-gains",
    badge: "대표 계산기",
    tag: "세금 · 절세 판단",
  },
  {
    title: "연봉 실수령액 계산기",
    description: "세전 연봉과 부양가족 수를 반영해 월·연 실수령액 추정치를 확인",
    href: "/cal/salary-net",
    badge: "대표 계산기",
    tag: "실수령 · 현금관리",
  },
  {
    title: "주담대 계산기",
    description: "자기자본과 취득비용까지 반영한 자금 계획을 한 번에 점검",
    href: "/cal/mortgage",
    badge: "대표 계산기",
    tag: "대출 · 주택 자금",
  },
];

const categoryCards = [
  {
    title: "배당 · 복리 · FIRE",
    description:
      "현금흐름과 장기 복리, 목표 자산 형성까지 연결해서 보는 투자 시뮬레이션 축입니다.",
    links: [
      { label: "배당 계산기", href: "/cal/calculator" },
      { label: "복리 계산기", href: "/cal/compound" },
      { label: "FIRE 계산기", href: "/cal/fire" },
      { label: "투자전략", href: "/info/strategy" },
    ],
  },
  {
    title: "절세 · 연금 · 계좌 전략",
    description:
      "ISA, IRP, 연금저축, 퇴직소득세 등 절세와 계좌 활용 흐름을 한 묶음으로 정리했습니다.",
    links: [
      { label: "금융 가이드", href: "/finance" },
      { label: "ISA 가이드", href: "/finance/isa" },
      { label: "계좌별 세금정보", href: "/info/investment/account-tax" },
      { label: "퇴직소득세 계산기", href: "/cal/retirement-tax" },
    ],
  },
  {
    title: "대출 판단 · 상환 계획",
    description:
      "DSR, LTV, 대출이자, 주담대 계산기를 기준으로 실제 상환 부담을 함께 점검할 수 있습니다.",
    links: [
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "LTV 계산기", href: "/cal/ltv" },
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
      { label: "주담대 계산기", href: "/cal/mortgage" },
    ],
  },
  {
    title: "투자전략 · 산업 테마",
    description:
      "연령, 가구 형태, 은퇴 준비, 산업·테마 흐름을 기준으로 투자 방향을 비교할 수 있습니다.",
    links: [
      { label: "투자 기초 가이드", href: "/info/guide" },
      { label: "투자전략", href: "/info/strategy" },
      { label: "산업·테마 가이드", href: "/industry" },
      { label: "ETF 순위", href: "/etf/ranking" },
    ],
  },
];

const popularCalculators = [
  {
    rank: "01",
    title: "배당 계산기",
    description: "월 적립 투자와 재투자까지 반영해 배당 성장 흐름을 보기 좋습니다.",
    href: "/cal/calculator",
  },
  {
    rank: "02",
    title: "복리 계산기",
    description: "초기 자산이 적어도 시간과 적립금이 어떤 차이를 만드는지 바로 확인할 수 있습니다.",
    href: "/cal/compound",
  },
  {
    rank: "03",
    title: "FIRE 계산기",
    description: "목표 생활비와 자산 목표를 숫자로 확인하려는 사용자에게 적합합니다.",
    href: "/cal/fire",
  },
  {
    rank: "04",
    title: "주담대 계산기",
    description: "매수 가능 범위와 자기자본 부담을 함께 보려는 흐름에 맞습니다.",
    href: "/cal/mortgage",
  },
];

const recommendedFlows = [
  {
    title: "배당 투자 입문자",
    description: "배당 계산기로 수익 흐름을 본 뒤, 배당 성장 가이드와 복리 계산기로 이어지는 흐름입니다.",
    steps: [
      { label: "배당 계산기", href: "/cal/calculator" },
      { label: "배당 성장 투자", href: "/info/guide/dividend-growth" },
      { label: "복리 계산기", href: "/cal/compound" },
    ],
  },
  {
    title: "절세계좌 고민 중인 직장인",
    description: "계좌별 세금 구조를 이해하고, ISA·IRP·연금저축 흐름으로 이어서 판단할 수 있습니다.",
    steps: [
      { label: "계좌별 세금정보", href: "/info/investment/account-tax" },
      { label: "금융 가이드", href: "/finance" },
      { label: "퇴직소득세 계산기", href: "/cal/retirement-tax" },
    ],
  },
  {
    title: "대출 상환 계획이 필요한 사용자",
    description: "대출 가능 범위, 월 상환 부담, 주택 자금 계획까지 이어지는 실전형 흐름입니다.",
    steps: [
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
      { label: "주담대 계산기", href: "/cal/mortgage" },
    ],
  },
];

const recommendedChoices = [
  {
    label: "처음 투자",
    title: "투자 기초부터 보고 싶다면 ETF·포트폴리오 가이드로 시작해보세요.",
    href: "/info/guide/etf-basics",
  },
  {
    label: "절세 고민",
    title: "ISA·IRP·연금저축 차이가 헷갈린다면 계좌별 세금정보를 먼저 확인해보세요.",
    href: "/info/investment/account-tax",
  },
  {
    label: "ETF 비교",
    title: "배당 ETF와 대표 ETF를 비교하고 싶다면 ETF 순위와 비교 메뉴를 활용해보세요.",
    href: "/etf/ranking",
  },
];

const guideCards = [
  {
    title: "ETF 투자 기초",
    description: "ETF의 구조, 장점, 체크 포인트를 처음부터 이해하기 쉽게 정리했습니다.",
    href: "/info/guide/etf-basics",
  },
  {
    title: "ISA 질문 가이드",
    description: "ISA를 처음 볼 때 자주 헷갈리는 질문을 한 페이지씩 쉽게 정리한 금융 가이드입니다.",
    href: "/finance/isa",
  },
  {
    title: "포트폴리오 기초",
    description: "한 종목 집중 대신 분산 투자와 자산배분의 기준을 빠르게 이해할 수 있습니다.",
    href: "/info/guide/portfolio-basics",
  },
  {
    title: "배당 성장 투자",
    description: "현재 배당률보다 더 중요한 배당 성장의 의미를 현실적으로 설명합니다.",
    href: "/info/guide/dividend-growth",
  },
  {
    title: "리스크 관리 기초",
    description: "수익률만 보지 않고 손실 구간까지 관리하는 기본 원칙을 정리했습니다.",
    href: "/info/guide/risk-management",
  },
  {
    title: "투자전략 모음",
    description: "장기 투자, 자산배분, 테마 접근법을 한 페이지에서 이어볼 수 있습니다.",
    href: "/info/strategy",
  },
];

const trustItems = [
  "계산 결과와 투자 정보는 참고용으로 제공되며 특정 종목 매수·매도를 권유하지 않습니다.",
  "세금과 제도 정보는 이해를 돕기 위한 요약이며 실제 적용은 개인 상황과 제도 변경에 따라 달라질 수 있습니다.",
  "개인정보처리방침, 이용약관, 문의 페이지를 통해 필요한 안내를 확인할 수 있습니다.",
];

export default function HomePage() {
  return (
    <div className="px-4 py-8 text-slate-100 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-2xl md:p-12">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              BlueDino · 금융 계산기 & 투자 정보 허브
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              배당, 세금, 연금, 대출을 한 번에 보는 금융 툴 플랫폼
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              BlueDino는 투자와 금융 판단을 숫자로 확인할 수 있도록 대표 계산기와
              설명형 가이드를 함께 제공하는 도구 허브입니다. 계산기로 바로 확인하고,
              관련 가이드와 최신 콘텐츠로 이어지는 흐름까지 한 화면에서 정리했습니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cal/calculator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                대표 계산기 바로가기
              </Link>
              <Link
                href="/finance"
                className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                금융 가이드 보기
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard title="대표 계산기" value="6개" sub="홈 전면 배치" />
              <StatCard title="핵심 카테고리" value="4축" sub="배당 · 절세 · 대출 · 콘텐츠" />
              <StatCard title="이용 흐름" value="쉽게 연결" sub="계산기 → 가이드 → 최신 콘텐츠" />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="bd-badge">상황별 진입</span>
              <h2 className="mt-3 bd-title-md">지금 가장 가까운 고민에서 시작해보세요</h2>
              <p className="mt-3 bd-text-sub">
                투자·금융 정보가 너무 많아 어디서부터 봐야 할지 헷갈릴 때, 본인 상황과 가장 가까운 카드를 먼저 눌러보시면 관련 가이드·계산기·전략으로 한 번에 이어집니다.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "배당금으로 현금흐름을 만들고 싶어요",
                description: "월 배당 목표 금액을 정한 뒤 필요한 자산 규모와 ETF 선택 기준을 단계별로 확인할 수 있습니다.",
                href: "/cal/calculator",
                tag: "배당 · 현금흐름",
              },
              {
                title: "대출 한도와 이자가 얼마나 나올지 알고 싶어요",
                description: "DSR·LTV 한도부터 월 상환액과 총이자까지 본인 자금 계획에 맞춰 시뮬레이션할 수 있습니다.",
                href: "/finance/loan-basics",
                tag: "대출 · 부동산",
              },
              {
                title: "ISA · IRP · 연금저축 차이가 헷갈려요",
                description: "절세계좌 3가지의 한도·세액공제율·중도해지 조건을 한 번에 비교한 가이드로 정리했습니다.",
                href: "/info/guide/pension-vs-irp",
                tag: "절세 · 계좌",
              },
              {
                title: "해외주식 세금이 궁금해요",
                description: "양도세 250만 원 공제·손익통산·환율 반영까지 매년 절세할 수 있는 5가지 방법을 정리했습니다.",
                href: "/info/guide/us-stock-tax-saving",
                tag: "세금 · 절세",
              },
              {
                title: "기업분석을 산업별로 보고 싶어요",
                description: "반도체·2차전지·AI·배당주·바이오 등 산업·테마별로 묶어 종목을 비교할 수 있는 허브입니다.",
                href: "/industry",
                tag: "기업분석 · 산업",
              },
              {
                title: "은퇴 준비 금액을 계산하고 싶어요",
                description: "월 생활비 기준으로 필요한 노후 자산과 도달 시점을 본인 저축률·수익률에 맞춰 계산해보세요.",
                href: "/cal/fire",
                tag: "은퇴 · FIRE",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <span className="text-xs font-semibold text-cyan-300">{card.tag}</span>
                <h3 className="mt-2 text-base font-bold text-white">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                  바로 시작 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="빠른 진입"
            description="처음 방문해도 대표 계산기 6개를 바로 확인할 수 있도록 핵심 도구를 가장 앞에 배치했습니다."
          />
          <FeatureCard
            title="추천 흐름"
            description="배당, 절세, 대출처럼 실제 사용 목적별로 이어서 눌러볼 수 있는 탐색 흐름을 함께 정리했습니다."
          />
          <FeatureCard
            title="설명형 구조"
            description="계산기만 제공하는 것이 아니라 관련 가이드, 투자전략, 산업·테마 정보로 자연스럽게 이어지도록 구성했습니다."
          />
        </section>

        <AdBlock label="홈 상단 광고 영역" />

        <section className="mt-10">
          <SectionHeader
            eyebrow="대표 계산기"
            title="대표 계산기 6개"
            description="처음 방문한 사용자도 바로 활용할 수 있도록 대표 계산기를 먼저 배치했습니다."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {heroCalculators.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card
                  badge={item.badge}
                  title={item.title}
                  description={item.description}
                  cta={item.tag}
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="주제별 바로가기"
            title="카테고리 진입 구조"
            description="기능이 많아져도 길을 잃지 않도록 사용 목적 기준으로 4개 축을 다시 정리했습니다."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {categoryCards.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.links.map((link) => (
                    <QuickLink key={link.href} href={link.href} label={link.label} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="많이 찾는 계산기"
              title="인기 계산기"
              description="홈에서 바로 활용하기 쉬운 대표 계산기를 짧은 설명과 함께 모았습니다."
            />
            <div className="mt-6 space-y-4">
              {popularCalculators.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700 hover:bg-slate-950"
                >
                  <div className="min-w-12 text-lg font-bold text-cyan-300">{item.rank}</div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="상황별 추천"
              title="바로 선택하기"
              description="현재 상황에 맞는 시작점을 고르면 관련 계산기와 가이드로 자연스럽게 이어집니다."
            />
            <div className="mt-6 space-y-4">
              {recommendedChoices.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700 hover:bg-slate-950"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-slate-300">{item.title}</div>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="추천 이용 흐름"
            title="추천 흐름"
            description="사용자 목적별로 다음에 무엇을 눌러야 할지 보이도록 홈에서 바로 3가지 흐름을 제안합니다."
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {recommendedFlows.map((flow) => (
              <article
                key={flow.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white">{flow.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{flow.description}</p>
                <div className="mt-5 space-y-3">
                  {flow.steps.map((step, index) => (
                    <div key={step.href} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-300">
                        {index + 1}
                      </div>
                      <Link
                        href={step.href}
                        className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-950"
                      >
                        {step.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="핵심 가이드"
            title="가이드와 설명형 콘텐츠"
            description="계산기 사용 후 바로 이해를 이어갈 수 있도록 핵심 가이드를 함께 강화했습니다."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {guideCards.map((item) => (
              <Link key={item.href} href={item.href}>
                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
                  <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    가이드
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                  <div className="mt-6 text-sm font-semibold text-cyan-300">가이드 보기 →</div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <AdBlock label="홈 중단 광고 영역" />

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="BlueDino 소개"
              title="BlueDino는 어떤 사이트인가요"
              description="개인 투자자가 자주 헷갈리는 금융 숫자와 개념을 쉽게 정리하기 위한 정보 사이트입니다."
            />
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <p>특정 상품 가입이나 종목 매수를 권하기보다, 스스로 판단할 때 필요한 계산기와 설명형 가이드를 한 흐름으로 연결해 제공합니다.</p>
              <p>사이트 소개와 문의 페이지를 통해 제공 목적과 기본 안내를 바로 확인할 수 있도록 구성했습니다.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/info/etc/about" className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/50 hover:bg-cyan-500/15">소개 보기</Link>
              <Link href="/info/etc/contact" className="rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-950">문의하기</Link>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="이용 방법"
              title="이렇게 활용하면 좋습니다"
              description="BlueDino를 처음 방문했을 때 가장 빠르게 도움을 받는 흐름을 짧게 정리했습니다."
            />
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">1. 계산기로 내 금액과 기간을 먼저 넣어봅니다.</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">2. 바로 아래 연결 가이드에서 세금·계좌·대출 개념을 다시 확인합니다.</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">3. 실제 실행 전에는 금융회사와 공식 기관의 최신 기준을 한 번 더 확인합니다.</div>
            </div>
          </article>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="신뢰 정보"
              title="신뢰할 수 있는 구조"
              description="사이트를 어떻게 활용하면 좋은지 한눈에 확인할 수 있도록 안내 페이지를 연결했습니다."
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Link href="/info/etc/about" className="bd-button-secondary">BlueDino 소개</Link>
              <Link href="/info/etc/methodology" className="bd-button-secondary">작성 기준</Link>
              <Link href="/info/etc/editorial-policy" className="bd-button-secondary">편집 원칙</Link>
              <Link href="/info/etc/contact" className="bd-button-secondary">문의하기</Link>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{sub}</div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</span>
      <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{description}</p>
    </div>
  );
}

function Card({
  badge,
  title,
  description,
  cta,
}: {
  badge: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-500/30 hover:bg-slate-900">
      <span className="text-xs font-semibold text-cyan-300">{badge}</span>
      <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-5 inline-flex items-center text-sm font-semibold text-cyan-300">
        {cta} →
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900"
    >
      {label}
    </Link>
  );
}

