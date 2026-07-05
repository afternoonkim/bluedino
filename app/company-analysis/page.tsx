import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdFitAd from "@/components/ad/AdFitAd";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import SearchDemandPanel from "@/components/growth/SearchDemandPanel";
import {
  companyAnalysisMarkets,
  getCompanyArticlesByMarket,
  getPublishedCompanyArticles,
  getSitemapCompanyAnalysisRoutes,
} from "@/lib/company-analysis/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "기업분석 | 원자현미경·쌍용C&E·제넥신 주가 체크포인트 | BlueDino",
  description:
    "국내기업과 해외기업의 사업 구조, 주가 변수, 실적 체크포인트를 정리합니다. 원자현미경 주가, 쌍용C&E 주가, 제넥신 주가 전망처럼 검색 유입이 있는 기업도 빠르게 찾을 수 있습니다.",
  keywords: ["기업분석", "국내기업 분석", "해외기업 분석", "주가 전망", "원자현미경 주가", "쌍용C&E 주가", "제넥신 주가 전망"],
  alternates: { canonical: "/company-analysis" },
  openGraph: {
    title: "기업분석 | 주가 변수와 실적 체크포인트 | BlueDino",
    description:
      "국내기업과 해외기업의 사업 구조, 주가 변수, 실적 체크포인트를 검색과 태그로 확인합니다.",
    url: `${BASE_URL}/company-analysis`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const indexableRouteSet = new Set(
  getSitemapCompanyAnalysisRoutes().map((route) => `${route.market}:${route.slug}`),
);
const publishedArticles = getPublishedCompanyArticles().filter((article) =>
  indexableRouteSet.has(`${article.market}:${article.slug}`),
);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BlueDino 기업분석",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: publishedArticles.length,
  itemListElement: publishedArticles.slice(0, 100).map((article, index) => ({
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
  ],
};

export default function CompanyAnalysisPage() {
  const marketItems: TaggedListItem[] = companyAnalysisMarkets.map((market) => {
    const count = getCompanyArticlesByMarket(market.key).filter((article) => indexableRouteSet.has(`${article.market}:${article.slug}`)).length;
    return {
      title: market.title,
      href: market.basePath,
      description: market.description,
      badge: market.shortTitle,
      meta: `분석글 ${count.toLocaleString("ko-KR")}개`,
      tags: [market.shortTitle, market.key === "korea" ? "국내주식" : "해외주식", "기업분석"],
      cta: `${market.shortTitle} 보기`,
    };
  });

  return (
    <>
      <Script id="company-analysis-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="company-analysis-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">기업분석</span>
            <h1 className="bd-title-xl mt-4">주가 전망을 찾기 전에 사업 구조와 실적 변수를 먼저 확인하세요</h1>
            <p className="bd-text-main mt-4 max-w-4xl">
              원자현미경 주가, 쌍용C&E 주가, 제넥신 주가 전망처럼 검색으로 들어온 사용자가 바로 확인할 수 있도록 국내·해외 기업분석을 목록으로 정리했습니다. 종목 이름보다 먼저 매출 구조, 실적 변수, 관련 산업을 확인하세요.
            </p>
          </section>

          <SearchDemandPanel
            keys={["company-check", "theme-stocks"]}
            title="개별 종목을 보기 전에 함께 볼 흐름"
            description="주가 전망 키워드로 들어온 사용자가 바로 이탈하지 않도록, 기업분석은 산업·테마와 실적 체크포인트로 이어지게 구성했습니다."
            compact
          />

          <TaggedList
            title="기업분석 분류"
            description="먼저 국내기업 또는 해외기업을 고른 뒤, 상세 목록에서 기업명·티커·업종 태그로 좁혀보세요."
            items={marketItems}
            filterTags={["국내기업", "해외기업", "국내주식", "해외주식"]}
            searchPlaceholder="예: 국내기업, 해외기업, 미국주식, 코스피"
            countLabel="분류"
            showSearch={false}
          />

          <AdFitAd variant="middle" label="본문 중간 스폰서 배너" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">기업분석 글을 볼 때의 기준</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">기업이 돈을 버는 핵심 사업이 무엇인지 먼저 확인합니다.</div>
              <div className="bd-list-item">성장 포인트가 실제 실적 개선으로 이어질 수 있는지 살펴봅니다.</div>
              <div className="bd-list-item">좋은 기업이라도 가격 부담과 산업 리스크는 따로 점검합니다.</div>
              <div className="bd-list-item">마지막 판단은 자신의 투자 기간, 현금흐름, 리스크 감당 범위에 맞춰 결정합니다.</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/industry" className="bd-button-secondary">산업·테마 먼저 보기</Link>
              <Link href="/info/strategy" className="bd-button-secondary">투자전략 보기</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
