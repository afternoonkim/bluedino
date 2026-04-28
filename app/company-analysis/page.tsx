import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import {
  companyAnalysisMarkets,
  getCompanyArticlesByMarket,
  getPublishedCompanyArticles,
} from "@/lib/company-analysis/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "기업분석 | 국내기업·해외기업 주가 전망과 투자 체크포인트 | BlueDino",
  description:
    "국내기업과 해외기업의 사업 구조, 성장성, 리스크, 주가 관전 포인트를 초보 투자자도 이해하기 쉽게 정리한 BlueDino 기업분석 허브입니다.",
  keywords: ["기업분석", "국내기업 분석", "해외기업 분석", "주가 전망", "투자 체크포인트"],
  alternates: { canonical: "/company-analysis" },
  openGraph: {
    title: "기업분석 | 국내기업·해외기업 주가 전망과 투자 체크포인트 | BlueDino",
    description:
      "국내기업과 해외기업의 사업 구조, 성장성, 리스크, 주가 관전 포인트를 사용자 관점에서 쉽게 정리합니다.",
    url: `${BASE_URL}/company-analysis`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const publishedArticles = getPublishedCompanyArticles();

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
  const featuredArticles = publishedArticles.slice(0, 3);

  return (
    <>
      <Script
        id="company-analysis-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="company-analysis-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">기업분석</span>
            <h1 className="bd-title-xl mt-4">국내기업 · 해외기업 분석</h1>
            <p className="bd-text-main mt-4">
              BlueDino 기업분석은 종목 이름만 보고 따라가는 콘텐츠가 아니라, 사용자가 스스로 판단할 수 있도록 사업 구조와 성장 포인트, 리스크를 한 번에 정리하는 메뉴입니다.
            </p>
            <p className="bd-text-sub mt-3">
              주가가 왜 움직이는지, 어떤 숫자와 이슈를 먼저 봐야 하는지, 장기 투자 관점에서 어떤 부분을 조심해야 하는지 중심으로 구성했습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/company-analysis/korea" className="bd-button-primary">
                국내기업 분석 보기
              </Link>
              <Link href="/company-analysis/global" className="bd-button-secondary">
                해외기업 분석 보기
              </Link>
            </div>
          </section>

          <section className="bd-grid-2">
            {companyAnalysisMarkets.map((market) => {
              const count = getCompanyArticlesByMarket(market.key).length;
              return (
                <article key={market.key} className="bd-card bd-card-padding">
                  <div className="flex items-center justify-between gap-3">
                    <span className="bd-badge">{market.badge}</span>
                    <span className="text-sm text-slate-400">분석글 {count}개</span>
                  </div>
                  <h2 className="bd-title-md mt-4">{market.title}</h2>
                  <p className="bd-text-main mt-4">{market.description}</p>
                  <div className="mt-6">
                    <Link href={market.basePath} className="bd-button-secondary">
                      {market.shortTitle} 보러가기
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>

          <AdBlock slotKey="inline" label="기업분석 허브 중간 광고 영역" />

          {/* <section className="bd-section">
            <div>
              <span className="bd-badge">먼저 읽기 좋은 글</span>
              <h2 className="bd-title-lg mt-4">대표 기업분석</h2>
              <p className="bd-text-sub mt-3">
                관심 종목을 처음 확인할 때 사업 구조, 성장 포인트, 리스크를 빠르게 잡을 수 있도록 대표 기업부터 정리했습니다.
              </p>
            </div>

            <div className="bd-grid-3">
              {featuredArticles.map((article) => (
                <Link key={article.slug} href={`/company-analysis/${article.market}/${article.slug}`}>
                  <article className="h-full bd-card bd-card-padding transition hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900">
                    <span className="bd-badge">{article.badge}</span>
                    <h3 className="bd-title-md mt-4">{article.companyNameKo}({article.ticker})</h3>
                    <p className="bd-text-main mt-4">{article.summary}</p>
                    <div className="mt-5 text-sm font-semibold text-cyan-300">분석글 보기 →</div>
                  </article>
                </Link>
              ))}
            </div>
          </section> */}

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">기업분석 글을 볼 때의 기준</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">기업이 돈을 버는 핵심 사업이 무엇인지 먼저 확인합니다.</div>
              <div className="bd-list-item">성장 포인트가 실제 실적 개선으로 이어질 수 있는지 살펴봅니다.</div>
              <div className="bd-list-item">좋은 기업이라도 가격 부담과 산업 리스크는 따로 점검합니다.</div>
              <div className="bd-list-item">마지막 판단은 자신의 투자 기간, 현금흐름, 리스크 감당 범위에 맞춰 결정합니다.</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
