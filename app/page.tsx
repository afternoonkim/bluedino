import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

const calculators = [
  {
    title: "배당 계산기",
    description: "재투자, 배당 성장률, 월 적립 투자까지 반영한 배당 시뮬레이션",
    href: "/cal/calculator",
    badge: "Calculator",
  },
  {
    title: "복리 계산기",
    description: "초기 자산과 월 투자금, 목표 금액을 바탕으로 복리 성장 흐름을 확인",
    href: "/cal/compound",
    badge: "Calculator",
  },
  {
    title: "FIRE 계산기",
    description: "목표 자산, 생활비, 수익률을 기준으로 경제적 자유 시점을 계산",
    href: "/cal/fire",
    badge: "Calculator",
  },
  {
    title: "해외주식 양도세 계산기",
    description: "매매차익과 기본공제를 반영해 예상 세금을 빠르게 확인",
    href: "/cal/capital-gains",
    badge: "Calculator",
  },
  {
    title: "퇴직소득세 계산기",
    description: "퇴직금과 근속연수를 기준으로 예상 퇴직소득세를 계산",
    href: "/cal/retirement-tax",
    badge: "Calculator",
  },
  {
    title: "연봉 실수령액 계산기",
    description: "세전 연봉과 부양가족 수를 반영해 월·연 실수령액 추정치를 확인",
    href: "/cal/salary-net",
    badge: "Calculator",
  },
];

const guideCards = [
  {
    title: "ETF 투자 기초",
    description: "ETF의 구조, 장점, 체크 포인트를 처음부터 이해하기 쉽게 정리했습니다.",
    href: "/info/guide/etf-basics",
  },
  {
    title: "ISA 계좌 기초",
    description: "절세계좌를 처음 이해하는 사람도 흐름을 잡을 수 있도록 정리했습니다.",
    href: "/info/guide/isa-basics",
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
              BlueDino · 투자 계산기 & 투자 정보 플랫폼
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              투자 판단을 감이 아닌 숫자로
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              BlueDino는 배당 계산기, FIRE 계산기, 세금 계산기와 함께 투자
              기초 가이드와 절세 정보를 제공하는 데이터 기반 투자 도구
              플랫폼입니다. 계산기만 있는 사이트가 아니라, 왜 그런 숫자가
              나오는지 이해할 수 있는 설명형 콘텐츠까지 함께 제공합니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* <Link
                href="/cal/calculator"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                배당 계산기 시작하기
              </Link> */}
              <Link
                href="/info/guide"
                className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
              >
                투자 기초 가이드 보기
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard title="투자 계산기" value="6개" sub="배당 · 복리 · FIRE · 세금 · 실수령액" />
              <StatCard title="기초 콘텐츠" value="20개+" sub="배당 · ETF · ISA · 자산배분 · 리스크 관리" />
              <StatCard title="핵심 방향" value="설명형" sub="도구와 콘텐츠를 함께 제공" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="왜 BlueDino인가"
            description="단순 계산 결과만 보여주는 것이 아니라, 투자자가 숫자를 이해할 수 있도록 콘텐츠를 함께 제공합니다."
          />
          <FeatureCard
            title="처음 방문했다면"
            description="투자 기초 가이드에서 개념을 먼저 읽고, 이후 계산기로 자신의 상황을 직접 시뮬레이션해보는 흐름을 추천합니다."
          />
          <FeatureCard
            title="광고보다 정보 중심"
            description="승인 준비를 위해 광고 위치를 반영하되, 페이지 구조는 계산기와 설명 콘텐츠 중심으로 유지하고 있습니다."
          />
        </section>

        <AdBlock label="홈 상단 광고 영역" />

        <section className="mt-10">
          <SectionHeader
            eyebrow="Start Here"
            title="처음 방문했다면 여기부터 보세요"
            description="BlueDino를 처음 쓰는 분이 대표 계산기와 핵심 투자 정보, 절세 흐름을 한 번에 파악할 수 있도록 주요 메뉴를 먼저 배치했습니다."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {calculators.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card
                  badge={item.badge}
                  title={item.title}
                  description={item.description}
                  cta="바로 이동"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeader
            eyebrow="Core Contents"
            title="콘텐츠 페이지를 함께 강화했습니다"
            description="애드센스 승인 준비에서 중요한 것은 계산기만 있는 사이트가 아니라, 방문자가 읽을 수 있는 설명형 콘텐츠가 충분한 구조입니다."
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
              title="신뢰할 수 있는 구조를 계속 보강하고 있습니다"
              description="애드센스 승인 관점에서도 중요한 것은 사이트 목적이 분명하고, 운영 정보와 정책 페이지가 잘 연결되어 있는 구조입니다."
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
              소개, 문의, 개인정보처리방침, 이용약관 페이지를 통해 방문자가
              사이트 목적과 운영 기준을 쉽게 확인할 수 있도록 구성했습니다.
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
