import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";

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

const infoItems: TaggedListItem[] = [
  {
    title: "투자 기초 가이드",
    description: "주식, ETF, 배당, 복리, 포트폴리오처럼 투자 전에 먼저 알아두면 좋은 개념을 쉽게 비교합니다.",
    href: "/info/guide",
    badge: "처음 시작",
    tags: ["투자기초", "ETF", "배당", "복리"],
    cta: "가이드 보기",
  },
  {
    title: "금융 가이드",
    description: "ISA, IRP, 연금저축, CMA, 파킹통장, 대출처럼 실제 금융 생활에서 자주 확인하는 질문을 정리했습니다.",
    href: "/finance",
    badge: "금융 생활",
    tags: ["절세계좌", "대출", "현금관리"],
    cta: "질문 보기",
  },
  {
    title: "투자전략 가이드",
    description: "1인 가구, 신혼부부, 자녀가 있는 가정, 은퇴 준비 단계처럼 상황에 따라 달라지는 투자 흐름을 비교합니다.",
    href: "/info/strategy",
    badge: "상황별 판단",
    tags: ["투자전략", "가정", "은퇴", "자산배분"],
    cta: "전략 보기",
  },
  {
    title: "기업분석",
    description: "국내기업과 해외기업의 사업 구조, 성장 포인트, 리스크를 한 목록에서 검색해 볼 수 있습니다.",
    href: "/company-analysis",
    badge: "기업",
    tags: ["기업분석", "국내주식", "해외주식"],
    cta: "기업 찾기",
  },
  {
    title: "산업·테마 가이드",
    description: "반도체, AI, 2차전지, 배당주처럼 여러 종목이 묶이는 테마를 산업 구조 중심으로 정리했습니다.",
    href: "/industry",
    badge: "테마",
    tags: ["산업·테마", "관련주", "AI", "반도체"],
    cta: "테마 보기",
  },
  {
    title: "ETF 순위",
    description: "ETF를 비교할 때 필요한 순위와 기본 지표를 빠르게 확인할 수 있습니다.",
    href: "/etf/ranking",
    badge: "ETF",
    tags: ["ETF", "투자기초", "순위"],
    cta: "ETF 보기",
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
      <Script id="info-hub-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />

      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보 허브</span>
          <h1 className="bd-title-xl mt-4">계좌·세금·투자 기초를 한 목록에서 찾으세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            금융 정보가 많아질수록 메뉴를 늘리는 것보다, 큰 목적을 고르고 태그로 좁혀보는 편이 더 편합니다. 이 페이지에서는 가이드, 전략, 기업분석, 산업·테마로 이어지는 주요 입구만 정리했습니다.
          </p>
        </section>

        <TaggedList
          title="투자정보 주요 입구"
          description="처음에는 넓은 분류만 고르고, 각 페이지 안에서 세부 태그로 필요한 글을 찾아보세요."
          items={infoItems}
          filterTags={["투자기초", "절세계좌", "대출", "투자전략", "기업분석", "산업·테마", "ETF"]}
          searchPlaceholder="예: ISA, ETF, 기업분석, 대출, 배당"
          countLabel="메뉴"
        />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">자주 찾는 투자정보</h2>
          <p className="bd-text-sub mt-2">처음 투자 공부를 시작할 때 자주 헷갈리는 주제를 먼저 모았습니다.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/30 hover:text-cyan-200">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">계산기로 함께 확인하기</h2>
          <p className="bd-text-sub mt-2">같은 개념이라도 금액, 기간, 금리, 세율에 따라 결과가 달라집니다. 가이드를 읽은 뒤 내 숫자를 넣어보세요.</p>
          <div className="mt-5 flex flex-wrap gap-3">
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
