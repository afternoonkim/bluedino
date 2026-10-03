import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { INDEX_DATA_UPDATED_AT } from "@/lib/company-analysis/companyMetadata";
import { COMPANY_CUSTOM_NOTES } from "@/lib/company-analysis/companyVariations";
import AdFitAd from "@/components/ad/AdFitAd";
import ShareAndCite from "@/components/share/ShareAndCite";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import TradingViewStockChart from "@/components/company-analysis/TradingViewStockChart";
import CompanyAnalysisUpdateNotice from "@/components/company-analysis/CompanyAnalysisUpdateNotice";
import ExpandableCard from "@/components/common/ExpandableCard";
import DetailPriorityPanel from "@/components/common/DetailPriorityPanel";
import {
  getSitemapCompanyAnalysisRoutes,
  getCompanyArticle,
  getCompanyMarketConfig,
  getRelatedCompanyArticles,
} from "@/lib/company-analysis/data";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";
import { safeDecodeSegment } from "@/lib/route-utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ market: string; slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;


type CompanyCtrSeo = {
  title?: string;
  description?: string;
  h1Alias?: string;
  keywords?: string[];
};

function getCompanyCtrSeo(article: {
  ticker: string;
  companyNameKo: string;
  sector: string;
  seoTitle: string;
  metaDescription: string;
}): CompanyCtrSeo {
  const ticker = article.ticker.toUpperCase();
  const overrides: Record<string, CompanyCtrSeo> = {
    "140860": {
      title: "원자현미경 주가 | 파크시스템스 주가 전망과 기업분석",
      description:
        "원자현미경 주가를 찾는 분을 위해 파크시스템스(140860)의 사업 구조, 반도체·나노계측 장비 수요, 실적 변수와 주가 리스크를 정리했습니다.",
      h1Alias: "원자현미경 주가로 많이 찾는 파크시스템스",
      keywords: ["원자현미경 주가", "파크시스템스 주가", "파크시스템스 주가 전망"],
    },
    "003410": {
      title: "쌍용C&E 주가 | 쌍용시멘트 주가 전망과 기업분석",
      description:
        "쌍용시멘트 주가, 쌍용C&E 주가를 찾는 분을 위해 시멘트·건자재 업황, 유연탄 가격, 건설 경기와 배당·리스크를 정리했습니다.",
      h1Alias: "쌍용시멘트 주가로 많이 찾는 쌍용C&E",
      keywords: ["쌍용시멘트주가", "쌍용C&E 주가", "쌍용 c&e 주가", "쌍용시멘트 주가 전망"],
    },
    "095700": {
      title: "제넥신 주가 전망 | 바이오 신약개발 기업분석",
      description:
        "제넥신 주가 전망을 찾는 분을 위해 신약개발 파이프라인, 임상 변수, 현금흐름과 바이오주 리스크를 사용자 관점으로 정리했습니다.",
      keywords: ["제넥신주가전망", "제넥신 주가", "제넥신 기업분석"],
    },
    "004140": {
      title: "동방 관련주 | 동방 주가와 물류 기업분석",
      description:
        "동방 관련주를 찾는 분을 위해 항만하역·물류 사업 구조, 관련 테마, 실적 변수와 주가 리스크를 정리했습니다.",
      keywords: ["동방 관련주", "동방 주가", "동방 기업분석"],
    },
  };

  return overrides[ticker] ?? {};
}

function getAnalysisLevel(article: { ticker: string; indices: unknown[] }) {
  const hasManualCommentary = Boolean(COMPANY_CUSTOM_NOTES[article.ticker.toUpperCase()]);
  if (hasManualCommentary) return "사업·실적 중심 정리" as const;
  if (article.indices.length > 0) return "주요 지표 중심 정리" as const;
  return "빠른 확인용 정리" as const;
}

export function generateStaticParams() {
  return getSitemapCompanyAnalysisRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: rawMarket, slug: rawSlug } = await params;
  const market = getCompanyMarketConfig(safeDecodeSegment(rawMarket));

  if (!market) {
    return { title: "기업분석 | BlueDino" };
  }

  const article = getCompanyArticle(
    market.key as CompanyAnalysisMarket,
    safeDecodeSegment(rawSlug),
  );

  if (!article) {
    return { title: `${market.title} | BlueDino` };
  }

  const analysisLevel = getAnalysisLevel(article);
  const isIndexable = analysisLevel !== "빠른 확인용 정리";

  const ctrSeo = getCompanyCtrSeo(article);
  const metaTitle = `${ctrSeo.title ?? article.seoTitle} | BlueDino`;
  const metaDescription = ctrSeo.description ?? article.metaDescription;
  const metaKeywords = [...(ctrSeo.keywords ?? []), ...article.keywords];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    robots: isIndexable ? undefined : { index: false, follow: true, googleBot: { index: false, follow: true } },
    alternates: isIndexable ? { canonical: `/company-analysis/${article.market}/${article.slug}` } : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${BASE_URL}/company-analysis/${article.market}/${article.slug}`,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function CompanyAnalysisDetailPage({ params }: PageProps) {
  const { market: rawMarket, slug: rawSlug } = await params;
  const market = getCompanyMarketConfig(safeDecodeSegment(rawMarket));

  if (!market) {
    notFound();
    throw new Error("Company analysis market not found");
  }
  const currentMarket = market;

  const article = getCompanyArticle(
    currentMarket.key as CompanyAnalysisMarket,
    safeDecodeSegment(rawSlug),
  );

  if (!article) {
    notFound();
    throw new Error("Company analysis article not found");
  }
  const currentArticle = article;

  const relatedArticles = getRelatedCompanyArticles(currentArticle, 4);
  const analysisLevel = getAnalysisLevel(currentArticle);
  const ctrSeo = getCompanyCtrSeo(currentArticle);
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
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">구성: {analysisLevel}</span>
              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">사업 구조와 실적 변수 포함</span>
              <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">주요 지수·분류 정보 포함</span>
            </div>
            <h1 className="bd-title-xl mt-4">
              {ctrSeo.h1Alias
                ? `${ctrSeo.h1Alias}(${currentArticle.ticker}) 주가 전망과 기업분석`
                : `${currentArticle.companyNameKo}(${currentArticle.ticker}) 주가 전망과 기업분석`}
            </h1>
            <p className="bd-text-main mt-4">{currentArticle.summary}</p>
            {ctrSeo.keywords?.length ? (
              <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="text-sm font-semibold text-cyan-100">함께 많이 찾는 표현입니다.</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100/90">
                  {ctrSeo.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {analysisLevel === "빠른 확인용 정리" ? (
              <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
이 글은 관심 기업을 빠르게 선별하기 위한 기본 안내입니다. 실제 투자 판단 전에는 같은 산업의 다른 기업, 최근 공시, 실적 발표 자료도 확인해 주세요.
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">{currentArticle.exchange}</span>
              <span className="rounded-full border border-slate-700 px-3 py-1">{currentArticle.subSector}</span>
              {currentArticle.indices.map((idx) => (
                <span
                  key={`idx-${idx}`}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-200"
                >
                  {idx === "S&P500" ? "S&P 500" : idx === "NASDAQ100" ? "NASDAQ 100" : idx === "DJIA" ? "다우존스" : idx === "KOSPI200" ? "KOSPI 200" : idx === "KOSPI50" ? "KOSPI 50" : idx === "KOSDAQ150" ? "KOSDAQ 150" : idx === "RUSSELL1000" ? "Russell 1000" : idx} 편입
                </span>
              ))}
              {currentArticle.classificationLabels.map((tagLabel) => (
                <span
                  key={`tag-${tagLabel}`}
                  className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1"
                >
                  #{tagLabel}
                </span>
              ))}
              <span className="rounded-full border border-slate-700 px-3 py-1">수정일 {currentArticle.updatedAt}</span>
            </div>
          </section>

          <DetailPriorityPanel
            eyebrow="기업분석 핵심"
            title="주가보다 먼저 확인할 사업·실적 기준"
            summary={currentArticle.quickConclusion}
            items={[
              {
                label: "사업 구조",
                value: currentArticle.sections[0]?.body[0] ?? `${currentArticle.companyNameKo}의 매출 구조와 주요 고객을 먼저 확인하세요.`,
              },
              {
                label: "확인 지표",
                value: currentArticle.checkpoints[0] ?? "실적 발표에서 매출 성장, 마진, 수주 또는 비용 변화를 확인하세요.",
              },
              {
                label: "주의 변수",
                value: currentArticle.risks[0] ?? "같은 산업의 경기와 금리, 환율, 규제 변화가 주가에 영향을 줄 수 있습니다.",
              },
            ]}
            note={currentArticle.investorNote}
          />

          <TradingViewStockChart
            ticker={currentArticle.ticker}
            exchange={currentArticle.exchange}
            market={currentArticle.market}
            companyNameKo={currentArticle.companyNameKo}
          />

          <CompanyAnalysisUpdateNotice updatedAt={currentArticle.updatedAt} />

          <AdFitAd variant="middle" label="본문 중간 스폰서 배너" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {currentArticle.sections.map((section, index) =>
                index === 0 ? (
                  <section key={section.title} className="bd-card bd-card-padding">
                    <h2 className="bd-title-md">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph, paragraphIndex) => (
                        <p key={`${section.title}-${paragraphIndex}`} className="bd-text-main">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ) : (
                  <ExpandableCard
                    key={section.title}
                    title={section.title}
                    summary="한줄 결론과 핵심 내용을 읽은 뒤 더 자세히 보고 싶은 분만 펼쳐보세요."
                  >
                    <div className="space-y-4">
                      {section.body.map((paragraph, paragraphIndex) => (
                        <p key={`${section.title}-${paragraphIndex}`} className="bd-text-main">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ExpandableCard>
                ),
              )}

              <ExpandableCard
                title="투자 전 체크포인트"
                summary="매수 여부를 판단하기 전에 확인할 항목만 모았습니다."
                variant="soft"
              >
                <div className="bd-list">
                  {currentArticle.checkpoints.map((item) => (
                    <div key={item} className="bd-list-item">
                      {item}
                    </div>
                  ))}
                </div>
              </ExpandableCard>

              <ExpandableCard
                title="주의해야 할 리스크"
                summary="실적과 주가가 흔들릴 수 있는 변수입니다. 필요한 경우 펼쳐보세요."
              >
                <div className="bd-list">
                  {currentArticle.risks.map((risk) => (
                    <div key={risk} className="bd-list-item">
                      {risk}
                    </div>
                  ))}
                </div>
              </ExpandableCard>

              <ExpandableCard
                title="자주 묻는 질문"
                summary="궁금한 질문이 있다면 펼쳐서 확인하세요."
              >
                <div className="space-y-4">
                  {currentArticle.faq.map((faq) => (
                    <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                      <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                      <p className="bd-text-main mt-3">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </ExpandableCard>

              <ExpandableCard
                title="관련 태그"
                summary="이 기업과 함께 살펴볼 만한 관련 주제입니다."
                variant="soft"
              >
                <div className="flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </ExpandableCard>

              <PageTrustFooter
                updatedAt={currentArticle.updatedAt}
                pageKind={`${currentMarketLabel} 분석`}
              />

              <ShareAndCite
                url={`/company-analysis/${currentArticle.market}/${currentArticle.slug}`}
                title={`${currentArticle.companyNameKo}(${currentArticle.ticker}) 주가 전망과 기업분석`}
                category={`${currentMarketLabel} 분석`}
              />
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
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">시장</span>
                    <span className="text-right">{currentArticle.exchange}</span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-800 pb-3">
                    <span className="text-slate-500">세부 분류</span>
                    <span className="text-right">{currentArticle.subSector}</span>
                  </div>
                  {currentArticle.indices.length > 0 && (
                    <div className="border-b border-slate-800 pb-3">
                      <div className="text-slate-500">지수 편입</div>
                      <div className="mt-2 flex flex-wrap justify-end gap-1">
                        {currentArticle.indices.map((idx) => (
                          <span key={`side-idx-${idx}`} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">
                            {idx === "S&P500" ? "S&P 500" : idx === "NASDAQ100" ? "NASDAQ 100" : idx === "DJIA" ? "다우존스" : idx === "KOSPI200" ? "KOSPI 200" : idx === "KOSPI50" ? "KOSPI 50" : idx === "KOSDAQ150" ? "KOSDAQ 150" : idx === "RUSSELL1000" ? "Russell 1000" : idx}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs leading-5 text-slate-500">지수 편입 정보는 {INDEX_DATA_UPDATED_AT} 기준 수동 정리 자료이며, 기준일 이후 변경될 수 있습니다.</p>
                    </div>
                  )}
                  <div>
                    <div className="text-slate-500">관련 분류</div>
                    <div className="mt-2 flex flex-wrap justify-end gap-1">
                      {currentArticle.classificationLabels.map((label) => (
                        <span key={`side-tag-${label}`} className="rounded-full border border-slate-700 bg-slate-950/60 px-2 py-0.5 text-xs text-slate-300">
                          #{label}
                        </span>
                      ))}
                    </div>
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
