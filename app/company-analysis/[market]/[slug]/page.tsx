import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import TradingViewStockChart from "@/components/company-analysis/TradingViewStockChart";
import {
  getCompanyAnalysisRoutes,
  getCompanyArticle,
  getCompanyMarketConfig,
  getRelatedCompanyArticles,
} from "@/lib/company-analysis/data";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ market: string; slug: string }> };

export function generateStaticParams() {
  return getCompanyAnalysisRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: rawMarket, slug: rawSlug } = await params;
  const market = getCompanyMarketConfig(decodeURIComponent(rawMarket));

  if (!market) {
    return { title: "기업분석 | BlueDino" };
  }

  const article = getCompanyArticle(
    market.key as CompanyAnalysisMarket,
    decodeURIComponent(rawSlug),
  );

  if (!article) {
    return { title: `${market.title} | BlueDino` };
  }

  return {
    title: `${article.seoTitle} | BlueDino`,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `/company-analysis/${article.market}/${article.slug}` },
    openGraph: {
      title: `${article.seoTitle} | BlueDino`,
      description: article.metaDescription,
      url: `${BASE_URL}/company-analysis/${article.market}/${article.slug}`,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.seoTitle} | BlueDino`,
      description: article.metaDescription,
    },
  };
}

export default async function CompanyAnalysisDetailPage({ params }: PageProps) {
  const { market: rawMarket, slug: rawSlug } = await params;
  const market = getCompanyMarketConfig(decodeURIComponent(rawMarket));

  if (!market) {
    notFound();
    throw new Error("Company analysis market not found");
  }
  const currentMarket = market;

  const article = getCompanyArticle(
    currentMarket.key as CompanyAnalysisMarket,
    decodeURIComponent(rawSlug),
  );

  if (!article) {
    notFound();
    throw new Error("Company analysis article not found");
  }
  const currentArticle = article;

  const relatedArticles = getRelatedCompanyArticles(currentArticle, 4);
  const currentMarketLabel = currentArticle.market === "korea" ? "국내기업" : "해외기업";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: currentArticle.seoTitle,
    description: currentArticle.metaDescription,
    datePublished: currentArticle.publishedAt,
    dateModified: currentArticle.updatedAt,
    author: { "@type": "Organization", name: "BlueDino" },
    publisher: { "@type": "Organization", name: "BlueDino" },
    mainEntityOfPage: `${BASE_URL}/company-analysis/${currentArticle.market}/${currentArticle.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: currentArticle.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "기업분석", item: `${BASE_URL}/company-analysis` },
      { "@type": "ListItem", position: 3, name: currentMarket.title, item: `${BASE_URL}${currentMarket.basePath}` },
      {
        "@type": "ListItem",
        position: 4,
        name: `${currentArticle.companyNameKo}(${currentArticle.ticker})`,
        item: `${BASE_URL}/company-analysis/${currentArticle.market}/${currentArticle.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`company-analysis-article-${currentArticle.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`company-analysis-faq-${currentArticle.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`company-analysis-breadcrumb-${currentArticle.slug}`}
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
              <Link href={currentMarket.basePath} className="bd-badge">
                {currentMarket.shortTitle}
              </Link>
              <span className="bd-badge">{currentArticle.badge}</span>
            </div>
            <h1 className="bd-title-xl mt-4">
              {currentArticle.companyNameKo}({currentArticle.ticker}) 주가 전망과 기업분석
            </h1>
            <p className="bd-text-main mt-4">{currentArticle.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">{currentArticle.exchange}</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">{currentArticle.sector}</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">수정일 {currentArticle.updatedAt}</span>
            </div>
          </section>

          <TradingViewStockChart
            ticker={currentArticle.ticker}
            exchange={currentArticle.exchange}
            market={currentArticle.market}
            companyNameKo={currentArticle.companyNameKo}
          />

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">한줄 결론</h2>
            <p className="bd-text-main mt-4">{currentArticle.quickConclusion}</p>
            <p className="bd-text-sub mt-4">{currentArticle.investorNote}</p>
          </section>

          <AdBlock slotKey="inline" label={`${currentArticle.companyNameKo} 기업분석 본문 중간 광고 영역`} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {currentArticle.sections.map((section) => (
                <section key={section.title} className="bd-card bd-card-padding">
                  <h2 className="bd-title-md">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph, index) => (
                      <p key={`${section.title}-${index}`} className="bd-text-main">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section className="bd-card-soft bd-card-padding">
                <h2 className="bd-title-md">투자 전 체크포인트</h2>
                <div className="bd-list mt-4">
                  {currentArticle.checkpoints.map((item) => (
                    <div key={item} className="bd-list-item">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bd-card bd-card-padding">
                <h2 className="bd-title-md">주의해야 할 리스크</h2>
                <div className="bd-list mt-4">
                  {currentArticle.risks.map((risk) => (
                    <div key={risk} className="bd-list-item">
                      {risk}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bd-card bd-card-padding">
                <h2 className="bd-title-md">자주 묻는 질문</h2>
                <div className="mt-6 space-y-4">
                  {currentArticle.faq.map((faq) => (
                    <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                      <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                      <p className="bd-text-main mt-3">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="bd-card-soft bd-card-padding">
                <h2 className="bd-title-md">관련 태그</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="bd-card bd-card-padding">
                <h2 className="bd-title-sm text-base font-semibold text-white">기업 정보</h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">기업명</span>
                    <span className="text-right">{currentArticle.companyNameKo}</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">영문명</span>
                    <span className="text-right">{currentArticle.companyNameEn}</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">티커</span>
                    <span className="text-right">{currentArticle.ticker}</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">구분</span>
                    <span className="text-right">{currentMarketLabel}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">시장</span>
                    <span className="text-right">{currentArticle.exchange}</span>
                  </div>
                </div>
              </section>

              {currentArticle.relatedLinks.length > 0 && (
                <section className="bd-card bd-card-padding">
                  <h2 className="bd-title-sm text-base font-semibold text-white">함께 보면 좋은 콘텐츠</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {currentArticle.relatedLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="bd-button-secondary text-center">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {relatedArticles.length > 0 && (
                <section className="bd-card bd-card-padding">
                  <h2 className="bd-title-sm text-base font-semibold text-white">같은 산업·관련 {currentMarketLabel} 분석</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {relatedArticles.map((related) => {
                      const relatedMarketLabel = related.market === "korea" ? "국내기업" : "해외기업";

                      return (
                        <Link
                          key={related.slug}
                          href={`/company-analysis/${related.market}/${related.slug}`}
                          className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900"
                        >
                          <span className="mb-2 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                            {relatedMarketLabel} 분석
                          </span>
                          <span className="block font-semibold text-white">
                            {related.companyNameKo}({related.ticker})
                          </span>
                          <span className="mt-1 block text-xs text-slate-400">관련 산업: {related.sector}</span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
