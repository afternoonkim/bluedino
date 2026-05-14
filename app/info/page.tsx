import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "투자정보 허브 | 계좌·세금·절세·투자 기초 가이드 | BlueDino",
  description:
    "ISA, IRP, 연금저축, 세금, 절세, 대출, ETF, 투자 기초 개념을 처음부터 쉽게 확인할 수 있는 BlueDino 투자정보 허브입니다.",
  alternates: { canonical: "/info" },
  openGraph: {
    title: "투자정보 허브 | 계좌·세금·절세·투자 기초 가이드 | BlueDino",
    description:
      "계좌 활용, 세금, 절세, ETF, 대출, 투자전략을 초보 투자자도 이해하기 쉽게 정리한 BlueDino 투자정보 허브입니다.",
    url: `${BASE_URL}/info`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const hubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BlueDino 투자정보 허브",
  url: `${BASE_URL}/info`,
  description:
    "ISA, IRP, 연금저축, 세금, 절세, 대출, ETF, 투자 기초 개념을 한곳에서 확인할 수 있는 투자정보 허브입니다.",
  isPartOf: {
    "@type": "WebSite",
    name: "BlueDino",
    url: BASE_URL,
  },
};

const mainSections = [
  {
    badge: "처음 시작",
    title: "투자 기초 가이드",
    description:
      "주식, ETF, 배당, 복리, 포트폴리오처럼 투자 전에 먼저 알아두면 좋은 개념을 쉽게 정리했습니다.",
    href: "/info/guide",
  },
  {
    badge: "금융 생활",
    title: "금융 가이드",
    description:
      "계좌, 대출, 절세, 생활 금융처럼 실제 금융 생활에서 자주 확인하는 주제를 한곳에서 살펴볼 수 있습니다.",
    href: "/finance",
  },
  {
    badge: "상황별 판단",
    title: "투자전략 가이드",
    description:
      "1인 가구, 신혼부부, 자녀가 있는 가정, 은퇴 준비 단계처럼 상황에 따라 달라지는 투자 흐름을 정리했습니다.",
    href: "/info/strategy",
  },
];

const quickLinks = [
  { label: "ISA 계좌 기초", href: "/info/guide/isa-basics" },
  { label: "IRP 세액공제", href: "/info/guide/irp-tax-deduction-by-salary" },
  { label: "연금저축과 IRP 차이", href: "/info/guide/pension-vs-irp" },
  { label: "해외주식 세금 기초", href: "/info/guide/us-stock-tax-basics" },
  { label: "ETF 기초", href: "/info/guide/etf-basics" },
  { label: "주담대 갈아타기", href: "/info/guide/mortgage-refinancing-when" },
];

const supportLinks = [
  { label: "추천 금융 가이드 모음", href: "/info/blog" },
  { label: "영상으로 보는 금융 정보", href: "/info/videos" },
];

const calculatorLinks = [
  { label: "복리 계산기", href: "/cal/compound" },
  { label: "FIRE 계산기", href: "/cal/fire" },
  { label: "DSR 계산기", href: "/cal/dsr" },
  { label: "주담대 계산기", href: "/cal/mortgage" },
  { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings" },
  { label: "해외주식 양도세 계산기", href: "/cal/capital-gains" },
];

export default function InfoHubPage() {
  return (
    <div className="bd-page">
      <Script
        id="info-hub-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보 허브</span>
          <h1 className="bd-title-lg mt-4">계좌·세금·절세·투자 기초를 한곳에서 확인하세요</h1>
          <p className="bd-text-main mt-4">
            BlueDino 투자정보 허브는 금융 용어가 낯선 분도 필요한 내용을 빠르게 찾을 수 있도록 만든 안내 페이지입니다. ISA, IRP, 연금저축, ETF, 대출, 세금처럼 자주 검색하는 주제를 계산기와 가이드로 연결해 정리했습니다.
          </p>
          <p className="bd-text-sub mt-3">
            먼저 개념을 읽고, 이후 계산기에 본인 금액과 기간을 입력해 보면 투자 판단에 필요한 숫자를 더 쉽게 이해할 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide" className="bd-button-primary">
              투자 기초 가이드 보기
            </Link>
            <Link href="/info/strategy" className="bd-button-secondary">
              투자전략 보기
            </Link>
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 보기
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {mainSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bd-card-soft bd-card-padding transition hover:border-cyan-500/30 hover:bg-slate-900"
            >
              <span className="text-xs font-semibold text-cyan-300">{section.badge}</span>
              <h2 className="bd-title-md mt-3">{section.title}</h2>
              <p className="bd-text-sub mt-3">{section.description}</p>
            </Link>
          ))}
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">자주 찾는 투자정보</h2>
          <p className="bd-text-sub mt-3">
            검색 유입이 많은 주제와 처음 투자 공부를 시작할 때 헷갈리기 쉬운 내용을 모았습니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/30 hover:text-cyan-200">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 보조 자료</h2>
          <p className="bd-text-sub mt-3">
            핵심 가이드를 먼저 확인한 뒤, 더 읽어볼 만한 금융 글과 영상 자료를 보조 링크로 살펴볼 수 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {supportLinks.map((link) => (
              <Link key={link.href} href={link.href} className="bd-button-secondary">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">계산기로 함께 확인하기</h2>
          <p className="bd-text-sub mt-3">
            같은 개념이라도 금액, 기간, 금리, 세율에 따라 결과가 달라집니다. 가이드를 읽은 뒤 계산기로 내 상황에 가까운 숫자를 확인해 보세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {calculatorLinks.map((link) => (
              <Link key={link.href} href={link.href} className="bd-button-secondary">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
