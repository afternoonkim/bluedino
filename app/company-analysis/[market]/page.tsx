import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import CompanyAnalysisSearchList from "@/components/company-analysis/CompanyAnalysisSearchList";
import {
  companyAnalysisMarkets,
  getCompanyArticlesByMarket,
  getCompanyMarketConfig,
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

  const articles = getCompanyArticlesByMarket(market.key as CompanyAnalysisMarket);
  const cardArticles = articles.map((article) => ({
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
    numberOfItems: articles.length,
    itemListElement: articles.slice(0, 100).map((article, index) => ({
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
                분석글 {articles.length.toLocaleString("ko-KR")}개
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">검색 기능 제공</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">사업 구조 중심</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">리스크 체크 포함</span>
            </div>
          </section>

          <AdBlock slotKey="inline" label={`${market.title} 목록 중간 광고 영역`} />

          {articles.length > 0 ? (
            <CompanyAnalysisSearchList
              articles={cardArticles}
              marketTitle={market.title}
              marketShortTitle={market.shortTitle}
            />
          ) : (
            <section className="bd-card-soft bd-card-padding">
              <h2 className="bd-title-md">준비 중입니다</h2>
              <p className="bd-text-main mt-4">
                현재 이 분류에는 공개된 기업분석 글이 없습니다. 새로운 글이 추가되면 이 목록에 자동으로 표시됩니다.
              </p>
              <div className="mt-6">
                <Link href="/company-analysis" className="bd-button-primary">
                  기업분석 메인으로
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
