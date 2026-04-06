import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import EditorialTrustPanel from "@/components/trust/EditorialTrustPanel";

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
    title: "가이드 · 블로그 · 유튜브",
    description:
      "계산기만 보는 흐름에서 끝나지 않도록 설명형 콘텐츠와 최신 경제 콘텐츠 진입을 따로 배치했습니다.",
    links: [
      { label: "투자 기초 가이드", href: "/info/guide" },
      { label: "블로그 최신글", href: "/info/blog" },
      { label: "경제 유튜버 모아보기", href: "/info/videos" },
      { label: "소개", href: "/info/etc/about" },
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

const recentUpdates = [
  {
    label: "홈 구조 개편",
    title: "대표 계산기 6개를 전면 배치해 첫 진입 동선을 단순화했습니다.",
    href: "/",
  },
  {
    label: "카테고리 정리",
    title: "배당 · 절세 · 대출 · 콘텐츠 4축으로 탐색 구조를 다시 묶었습니다.",
    href: "/finance",
  },
  {
    label: "계산기 허브",
    title: "주요 계산기와 설명형 가이드를 한 흐름으로 연결해 체류 동선을 강화했습니다.",
    href: "/info/guide",
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
    description: "실제 검색 문장 기준으로 ISA 질문을 한 페이지씩 정리한 SEO형 허브입니다.",
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
  "개인정보처리방침, 이용약관, 문의 페이지를 함께 운영해 사이트 신뢰 구조를 강화하고 있습니다.",
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
              <StatCard title="탐색 구조" value="허브형" sub="계산기 → 가이드 → 최신 콘텐츠" />
            </div>
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
            description="계산기만 제공하는 것이 아니라 관련 가이드, 블로그, 유튜브로 자연스럽게 이어지도록 구성했습니다."
          />
        </section>

        <AdBlock label="홈 상단 광고 영역" />

        <section className="mt-10">
          <SectionHeader
            eyebrow="Top Tools"
            title="대표 계산기 6개"
            description="방문자가 가장 먼저 활용할 가능성이 높은 계산기만 앞에 모아 첫 진입 동선을 단순하게 만들었습니다."
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
            eyebrow="Category Entry"
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
              eyebrow="Popular"
              title="인기 계산기"
              description="홈에서 바로 많이 클릭될 가능성이 높은 계산기를 짧은 설명과 함께 따로 모았습니다."
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
              eyebrow="Recently Updated"
              title="최근 업데이트"
              description="방문자가 홈 구조 변화와 현재 사이트 방향을 빠르게 파악할 수 있도록 요약했습니다."
            />
            <div className="mt-6 space-y-4">
              {recentUpdates.map((item) => (
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
            eyebrow="Recommended Flow"
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
            eyebrow="Core Contents"
            title="가이드와 설명형 콘텐츠"
            description="계산기 사용 후 바로 이해를 이어갈 수 있도록 핵심 가이드를 함께 강화했습니다."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {guideCards.map((item) => (
              <Link key={item.href} href={item.href}>
                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
                  <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    Guide
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

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <SectionHeader
              eyebrow="Trust"
              title="신뢰할 수 있는 구조"
              description="사이트 목적과 운영 기준을 명확히 보여주는 페이지를 함께 연결해 신뢰 구조를 유지하고 있습니다."
            />
            <div className="mt-6 space-y-3">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white">운영 페이지</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              소개, 문의, 개인정보처리방침, 이용약관 페이지를 통해 방문자가 사이트 목적과 운영 기준을 쉽게 확인할 수 있도록 구성했습니다.
            </p>

            <div className="mt-6 grid gap-3">
              <QuickLink href="/info/etc/about" label="BlueDino 소개" />
              <QuickLink href="/info/etc/contact" label="문의하기" />
              <QuickLink href="/info/etc/privacy" label="개인정보처리방침" />
              <QuickLink href="/info/etc/terms" label="이용약관" />
              <QuickLink href="/sitemap.xml" label="사이트맵" />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{sub}</div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </article>
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
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">{description}</p>
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
    <article className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
      <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
        {badge}
      </span>
      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      <div className="mt-6 text-sm font-semibold text-cyan-300">{cta} →</div>
    </article>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-950"
    >
      {label}
    </Link>
  );
}
