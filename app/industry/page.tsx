import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import { industryHubs } from "@/lib/industry/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "산업·테마 가이드 | 반도체·2차전지·AI·배당주·바이오 관련주 정리 | BlueDino",
  description:
    "한국·미국 종목을 산업·테마별로 묶어 비교하는 BlueDino 산업 가이드. 반도체·2차전지·AI·배당주·K-콘텐츠·바이오·금융·자동차 8개 카테고리에서 종목별 사업 구조와 분기 추적 지표까지 정리.",
  keywords: [
    "산업별 관련주",
    "테마별 관련주",
    "반도체 관련주",
    "AI 관련주",
    "2차전지 관련주",
    "배당주",
    "K-콘텐츠 관련주",
    "바이오 관련주",
    "금융주",
    "자동차 관련주",
    "BlueDino",
  ],
  alternates: { canonical: "/industry" },
  openGraph: {
    title: "산업·테마 가이드 | BlueDino",
    description:
      "한국·미국 종목을 산업·테마별로 묶어 비교하는 BlueDino 산업 가이드. 8개 카테고리에서 종목별 사업 구조와 분기 추적 지표까지 정리.",
    url: `${BASE_URL}/industry`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "산업·테마 가이드 | BlueDino",
    description:
      "한국·미국 종목을 산업·테마별로 묶어 비교하는 BlueDino 산업 가이드.",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BlueDino 산업·테마 가이드",
  numberOfItems: industryHubs.length,
  itemListElement: industryHubs.map((hub, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${BASE_URL}/industry/${hub.slug}`,
    name: hub.title,
    description: hub.description,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "산업·테마 가이드", item: `${BASE_URL}/industry` },
  ],
};

export default function IndustryIndexPage() {
  return (
    <>
      <Script id="industry-index-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="industry-index-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">산업·테마 가이드</span>
            <h1 className="bd-title-xl mt-4">한국·미국 종목을 산업·테마별로 묶어 비교해 보세요</h1>
            <p className="bd-text-main mt-4">
              \"반도체 관련주\", \"AI 관련주\", \"배당주\" 같은 검색어로 들어오시면 보통 종목 목록이 한꺼번에 쏟아져 정리하기 어렵습니다. BlueDino 산업·테마 가이드는 같은 \"반도체\"라도 메모리·HBM·파운드리·장비·PCB로 sub-sector를 나누고, 같은 \"AI\"라도 반도체·소프트웨어·인프라·서비스로 가치사슬 단계를 나눠서 비교할 수 있도록 정리했습니다.
            </p>
            <p className="bd-text-sub mt-3">
              1,500개 가까운 한국·미국 종목 데이터에서 각 카테고리에 해당하는 종목을 자동 추출하고, customNote(수기 분석)와 주요 지수(KOSPI 200·S&P 500·NASDAQ 100 등) 편입 종목을 우선 노출하도록 정렬했습니다. 종목 카드를 누르시면 해당 종목의 사업 구조와 분기 추적 지표까지 자세히 보실 수 있습니다.
            </p>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">8개 산업·테마 카테고리</h2>
            <div className="mt-6 bd-grid-2">
              {industryHubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/industry/${hub.slug}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
                >
                  <div className="text-base font-semibold text-white">{hub.shortTitle}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{hub.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <AdBlock slotKey="inline" label="산업·테마 가이드 인덱스 광고 영역" />

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">산업·테마 가이드를 활용하는 방법</h2>
            <div className="bd-list mt-5">
              <div className="bd-list-item">관심 산업의 카테고리를 누르면 sub-sector(메모리·HBM·파운드리 등) 단위로 비교가 정리되어 있습니다.</div>
              <div className="bd-list-item">customNote가 있는 종목(상세분석 배지)은 수기 작성 단락이 있어 사업 구조를 더 자세히 확인하실 수 있습니다.</div>
              <div className="bd-list-item">주요 지수(KOSPI 200·S&P 500 등) 편입 배지로 인지도와 검색 수요를 가늠해 볼 수 있습니다.</div>
              <div className="bd-list-item">종목 비교 후 관련 계산기·전략 가이드로 이어서 본인 투자 판단에 적용해 보세요.</div>
            </div>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">함께 보면 좋은 페이지</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/company-analysis" className="bd-button-secondary">기업분석 메인</Link>
              <Link href="/info/strategy" className="bd-button-secondary">투자 전략</Link>
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드</Link>
              <Link href="/cal/calculator" className="bd-button-secondary">배당 계산기</Link>
              <Link href="/finance" className="bd-button-primary">금융 가이드 메인</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
