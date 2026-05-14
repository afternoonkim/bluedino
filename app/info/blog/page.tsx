import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BlueDino 추천 금융 가이드 모음",
  description:
    "BlueDino에서 먼저 읽기 좋은 금융 가이드와 계산기를 주제별로 모아 안내합니다.",
  // 외부 RSS 집계 페이지라 원본 콘텐츠 정책상 색인 제외
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

const popularGuides = [
  {
    badge: "ISA 활용",
    title: "ISA 계좌란 무엇인가",
    description: "ISA의 비과세·분리과세 구조를 처음 보는 분 기준으로 정리.",
    href: "/info/guide/isa-basics",
  },
  {
    badge: "ISA 절세",
    title: "ISA 만기 후 연금계좌 이체 — 3000만 원 한도",
    description: "ISA 만기일에 연금저축·IRP로 이체할 때 추가 세액공제 한도 활용법.",
    href: "/info/guide/isa-maturity-rollover",
  },
  {
    badge: "IRP 환급",
    title: "연봉별 IRP 세액공제 환급액",
    description: "연봉 5500 분기점·IRP 900만 원 한도 기준 실제 환급액 정리.",
    href: "/info/guide/irp-tax-deduction-by-salary",
  },
  {
    badge: "투자 첫 1년",
    title: "투자 처음 1년 — 비상금·절세계좌·ETF 순서",
    description: "투자를 처음 시작하는 분이 1년 동안 따라가면 좋은 4단계.",
    href: "/info/guide/first-investor-1year-checklist",
  },
  {
    badge: "주담대",
    title: "주담대 갈아타기 — 언제 하면 가장 이득일까",
    description: "금리 차이·중도상환수수료·잔존 기간으로 손익분기점 계산.",
    href: "/info/guide/mortgage-refinancing-when",
  },
  {
    badge: "해외주식 세금",
    title: "해외주식 양도세 250만 원 공제 활용 5가지",
    description: "12월 손익통산·연도별 분산 매도·환율 시점 절세 팁.",
    href: "/info/guide/us-stock-tax-saving",
  },
];

const popularCalculators = [
  { label: "복리 계산기", href: "/cal/compound" },
  { label: "FIRE 계산기", href: "/cal/fire" },
  { label: "배당 계산기", href: "/cal/calculator" },
  { label: "DSR 계산기", href: "/cal/dsr" },
  { label: "주담대 계산기", href: "/cal/mortgage" },
  { label: "해외주식 양도세 계산기", href: "/cal/capital-gains" },
];

const popularStrategies = [
  { label: "절세계좌 활용 전략", href: "/info/strategy/tax-efficient-investing" },
  { label: "자산배분 전략", href: "/info/strategy/asset-allocation" },
  { label: "은퇴 후 자산 운용 전략", href: "/info/strategy/post-retirement-investor" },
  { label: "1인 가구 투자전략", href: "/info/strategy/single-investor" },
];

export default function BlogPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">추천 금융 가이드</span>
          <h1 className="bd-title-lg mt-4">처음 보면 좋은 금융 가이드 모음</h1>
          <p className="bd-text-main mt-4">
            투자와 금융을 처음 정리할 때 바로 도움이 되는 가이드와 계산기를 모았습니다. ISA, IRP, 연금저축, 대출, 해외주식 세금처럼 자주 헷갈리는 주제부터 차례대로 확인해 보세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide" className="bd-button-primary">
              투자 기초 가이드 보기
            </Link>
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 메인
            </Link>
            <Link href="/info/strategy" className="bd-button-secondary">
              투자전략 가이드
            </Link>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">먼저 보면 도움 되는 인기 가이드</h2>
          <p className="bd-text-sub mt-3">
            ISA·IRP·연금저축·주담대·해외주식 세금처럼 사용자가 가장 자주 검색하는 주제부터 정리했습니다. 제도와 세율은 매년 변경될 수 있으므로 각 글 하단의 최종 업데이트일과 공식 자료 확인 안내를 함께 참고해 주세요.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {popularGuides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
              >
                <span className="text-xs font-semibold text-cyan-300">{g.badge}</span>
                <div className="mt-2 text-base font-semibold text-white">{g.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{g.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">자주 활용되는 계산기</h2>
          <p className="bd-text-sub mt-3">
            가이드를 본 후 본인 금액·기간을 직접 넣어보시면 이해가 훨씬 빠릅니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {popularCalculators.map((c) => (
              <Link key={c.href} href={c.href} className="bd-button-secondary">
                {c.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 투자전략</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {popularStrategies.map((s) => (
              <Link key={s.href} href={s.href} className="bd-button-secondary">
                {s.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
