import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdFitAd from "@/components/ad/AdFitAd";
import CompanyAnalysisSearchList from "@/components/company-analysis/CompanyAnalysisSearchList";
import {
  companyAnalysisMarkets,
  getCompanyArticlesByMarket,
  getCompanyMarketConfig,
  getSitemapCompanyAnalysisRoutes,
} from "@/lib/company-analysis/data";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ market: string }> };

export function generateStaticParams() {
  return companyAnalysisMarkets.map((market) => ({ market: market.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: rawMarket } = await params;
  const market = getCompanyMarketConfig(decodeURIComponent(rawMarket));

  if (!market) {
    return { title: "기업분석 | BlueDino" };
  }

  return {
    title: `${market.title} | 주가 전망과 투자 체크포인트 | BlueDino`,
    description: market.description,
    keywords:
      market.key === "korea"
        ? ["국내기업 분석", "국내주식 주가 전망", "코스피 기업분석", "코스닥 기업분석", "국내주식 투자정보"]
        : ["해외기업 분석", "미국주식 주가 전망", "해외 주식 투자", "미국 기업분석", "미국주식 티커"],
    alternates: { canonical: market.basePath },
    openGraph: {
      title: `${market.title} | BlueDino`,
      description: market.description,
      url: `${BASE_URL}${market.basePath}`,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${market.title} | BlueDino`,
      description: market.description,
    },
  };
}

export default async function CompanyAnalysisMarketPage({ params }: PageProps) {
  const { market: rawMarket } = await params;
  const marketKey = decodeURIComponent(rawMarket);
  const market = getCompanyMarketConfig(marketKey);

  if (!market) {
    notFound();
    throw new Error("Company analysis market not found");
  }

  const indexableRouteSet = new Set(
    getSitemapCompanyAnalysisRoutes().map((route) => `${route.market}:${route.slug}`),
  );
  const articles = getCompanyArticlesByMarket(market.key as CompanyAnalysisMarket);
  const visibleArticles = articles.filter((article) =>
    indexableRouteSet.has(`${article.market}:${article.slug}`),
  );
  const cardArticles = visibleArticles.map((article) => ({
    market: article.market,
    slug: article.slug,
    ticker: article.ticker,
    exchange: article.exchange,
    companyNameKo: article.companyNameKo,
    companyNameEn: article.companyNameEn,
    sector: article.sector,
    badge: article.badge,
    summary: article.summary,
    keywords: article.keywords,
  }));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: market.title,
    numberOfItems: visibleArticles.length,
    itemListElement: visibleArticles.slice(0, 100).map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/company-analysis/${article.market}/${article.slug}`,
      name: article.seoTitle,
      description: article.metaDescription,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "기업분석", item: `${BASE_URL}/company-analysis` },
      { "@type": "ListItem", position: 3, name: market.title, item: `${BASE_URL}${market.basePath}` },
    ],
  };

  return (
    <>
      <Script
        id={`company-analysis-${market.key}-itemlist`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id={`company-analysis-${market.key}-breadcrumb`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/company-analysis" className="bd-badge">
                기업분석
              </Link>
              <span className="bd-badge">{market.badge}</span>
            </div>
            <h1 className="bd-title-xl mt-4">{market.title}</h1>
            <p className="bd-text-main mt-4">{market.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">
                분석글 {visibleArticles.length.toLocaleString("ko-KR")}개
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">검색 기능 제공</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">사업 구조 중심</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">리스크 체크 포함</span>
            </div>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">
              {market.shortTitle} 분석을 처음 보는 분에게
            </h2>
            <p className="bd-text-main mt-4">
              BlueDino의 {market.shortTitle} 분석은 단순한 주가 그래프가 아니라
              {market.key === "korea"
                ? " 매출 구조, 산업 위치, 실적 변수, 밸류에이션 부담, 리스크 요인을 사용자가 한 흐름으로 이해할 수 있도록 비교할 수 있게 구성했습니다. 코스피·코스닥 상장사 중 거래량과 시가총액이 큰 기업을 우선 다루며, 산업 분류와 사업 모델 차이까지 함께 비교할 수 있도록 구성되어 있습니다."
                : " 사업 모델, 매출 구성, 경쟁 구도, 환율과 금리에 대한 민감도, 밸류에이션 부담, 리스크 요인을 사용자가 한 흐름으로 이해할 수 있도록 비교할 수 있게 구성했습니다. 미국주식 주요 기업을 거래소(NASDAQ·NYSE)별로 다루며, 빅테크부터 헬스케어·금융·소비재·산업재까지 폭넓게 비교할 수 있습니다."}
            </p>
            <div className="bd-list mt-5">
              <div className="bd-list-item">기업명, 티커, 산업 키워드로 빠르게 검색해 원하는 기업을 찾아보세요.</div>
              <div className="bd-list-item">관심 기업의 사업 구조와 실적 변수를 본 뒤, 같은 산업의 다른 기업과 비교해 차이를 확인해보세요.</div>
              <div className="bd-list-item">분석 글 마지막에 연결된 계산기와 가이드를 활용하면 본인 자금 계획에 맞춰 판단하기 쉽습니다.</div>
            </div>
          </section>

          <AdFitAd variant="middle" label="본문 중간 광고 영역" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

          {visibleArticles.length > 0 ? (
            <CompanyAnalysisSearchList
              articles={cardArticles}
              marketTitle={market.title}
              marketShortTitle={market.shortTitle}
            />
          ) : (
            <section className="bd-card-soft bd-card-padding">
              <h2 className="bd-title-md">아직 표시할 기업분석이 없습니다</h2>
              <p className="bd-text-main mt-4">
                현재 이 분류에서 바로 볼 수 있는 기업분석 글이 없습니다. 다른 분류의 기업분석이나 산업·테마 가이드를 먼저 확인해 보세요.
              </p>
              <div className="mt-6">
                <Link href="/company-analysis" className="bd-button-primary">
                  기업분석 메인으로
                </Link>
              </div>
            </section>
          )}

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{market.shortTitle} 분석과 함께 보면 좋은 콘텐츠</h2>
            <p className="bd-text-main mt-4">
              개별 기업의 사업 구조를 본 뒤에는 본인의 투자 기간·자금·세후 수익까지 함께 점검해야 의사결정이 더 단단해집니다. 아래 페이지를 같이 보면 흐름이 자연스러워집니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/info/strategy/asset-allocation" className="bd-button-secondary">
                자산배분 전략 보기
              </Link>
              <Link href="/info/guide/etf-vs-stocks" className="bd-button-secondary">
                개별주 vs ETF 비교
              </Link>
              <Link href="/cal/compound" className="bd-button-secondary">
                복리 계산기
              </Link>
              {market.key === "korea" ? (
                <Link href="/info/guide/loss-tax" className="bd-button-secondary">
                  국내주식 손익 통산
                </Link>
              ) : (
                <Link href="/cal/capital-gains" className="bd-button-secondary">
                  해외주식 양도세 계산기
                </Link>
              )}
              <Link href="/finance" className="bd-button-primary">
                금융 가이드 메인
              </Link>
            </div>
            <p className="bd-text-sub mt-6">
              {market.key === "korea"
                ? "참고 자료: 한국거래소(KRX) 상장공시시스템과 금융감독원 전자공시(DART)에서 각 기업의 사업보고서·분기보고서 원문을 확인할 수 있습니다."
                : "참고 자료: 미국 SEC EDGAR(https://www.sec.gov/edgar)에서 각 기업의 10-K, 10-Q, 프록시 자료 원문을 확인할 수 있고, IR 페이지에서 가이던스와 실적 발표 자료를 함께 볼 수 있습니다."}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
