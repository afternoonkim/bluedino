import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import ShareAndCite from "@/components/share/ShareAndCite";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import {
  getIndustryHub,
  getAllIndustrySlugs,
  type IndustryHub,
} from "@/lib/industry/config";
import {
  getPublishedCompanyArticles,
  getSitemapCompanyAnalysisRoutes,
} from "@/lib/company-analysis/data";
import { COMPANY_CUSTOM_NOTES } from "@/lib/company-analysis/companyVariations";
import { getCompanyIndices } from "@/lib/company-analysis/companyMetadata";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getIndustryHub(decodeURIComponent(slug));
  if (!hub) return { title: "산업·테마 가이드 | BlueDino" };

  const url = `${BASE_URL}/industry/${hub.slug}`;
  return {
    title: `${hub.title} | BlueDino`,
    description: hub.description,
    keywords: hub.keywords,
    alternates: { canonical: `/industry/${hub.slug}` },
    openGraph: {
      title: `${hub.title} | BlueDino`,
      description: hub.description,
      url,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${hub.title} | BlueDino`,
      description: hub.description,
    },
  };
}

function matchesHub(
  hub: IndustryHub,
  article: { sector: string; ticker: string },
): boolean {
  const tickerUpper = article.ticker.toUpperCase();
  if (hub.match.tickerExcludes?.includes(tickerUpper)) return false;
  if (hub.match.tickerIncludes?.includes(tickerUpper)) return true;
  return hub.match.sectorIncludes.some((re) => re.test(article.sector));
}

function rankArticle(article: {
  ticker: string;
  market: string;
}): number {
  const tickerUpper = article.ticker.toUpperCase();
  let score = 0;
  if (COMPANY_CUSTOM_NOTES[tickerUpper]) score += 100;
  const indices = getCompanyIndices(article.ticker);
  score += indices.length * 30;
  // KOSPI 종목과 미국 빅인덱스 종목을 우선
  if (
    indices.includes("KOSPI200") ||
    indices.includes("S&P500") ||
    indices.includes("NASDAQ100") ||
    indices.includes("DJIA")
  ) {
    score += 30;
  }
  return score;
}

export default async function IndustryHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getIndustryHub(decodeURIComponent(slug));
  if (!hub) notFound();
  const currentHub = hub;

  const indexableRouteSet = new Set(
    getSitemapCompanyAnalysisRoutes().map((route) => `${route.market}:${route.slug}`),
  );
  const allArticles = getPublishedCompanyArticles();
  const matched = allArticles
    .filter((a) => indexableRouteSet.has(`${a.market}:${a.slug}`))
    .filter((a) => matchesHub(currentHub, a))
    .map((a) => ({
      market: a.market,
      slug: a.slug,
      ticker: a.ticker,
      companyNameKo: a.companyNameKo,
      sector: a.sector,
      subSector: a.subSector,
      classifications: a.classificationLabels,
      indices: a.indices,
      hasCustomNote: !!COMPANY_CUSTOM_NOTES[a.ticker.toUpperCase()],
      score: rankArticle({ ticker: a.ticker, market: a.market }),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 60);

  const koreaMatched = matched.filter((m) => m.market === "korea");
  const globalMatched = matched.filter((m) => m.market === "global");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: currentHub.title,
    description: currentHub.description,
    inLanguage: "ko-KR",
    datePublished: "2026-04-27",
    dateModified: "2026-04-27",
    author: {
      "@type": "Organization",
      name: "BlueDino 편집팀",
      url: "https://bluedino.kr/info/etc/about",
    },
    publisher: {
      "@type": "Organization",
      name: "BlueDino",
      url: "https://bluedino.kr",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/industry/${currentHub.slug}`,
    },
    keywords: currentHub.keywords,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: currentHub.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "산업·테마 가이드", item: `${BASE_URL}/industry` },
      { "@type": "ListItem", position: 3, name: currentHub.shortTitle, item: `${BASE_URL}/industry/${currentHub.slug}` },
    ],
  };

  return (
    <>
      <Script id={`industry-${currentHub.slug}-article`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`industry-${currentHub.slug}-faq`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`industry-${currentHub.slug}-breadcrumb`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/industry" className="bd-badge">산업·테마 가이드</Link>
              <span className="bd-badge">{currentHub.shortTitle}</span>
            </div>
            <h1 className="bd-title-xl mt-4">{currentHub.title}</h1>
            <p className="bd-text-main mt-4">{currentHub.heroIntro}</p>
          </section>

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">{currentHub.shortTitle}을 처음 알아보는 분에게</h2>
            <p className="bd-text-main mt-4">{currentHub.introBody}</p>
          </section>

          <AdBlock slotKey="inline" label={`${currentHub.shortTitle} 산업 페이지 관련 콘텐츠 영역`} />

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{currentHub.shortTitle}을 비교할 때 봐야 할 핵심 지표</h2>
            <div className="bd-list mt-5">
              {currentHub.watchPoints.map((point) => (
                <div key={point} className="bd-list-item">{point}</div>
              ))}
            </div>
          </section>

          {koreaMatched.length > 0 && (
            <section className="bd-card bd-card-padding">
              <h2 className="bd-title-md">{currentHub.shortTitle} — 국내 주요 종목</h2>
              <p className="bd-text-sub mt-3">
                사업 설명이 충분하거나 주요 지수에 포함된 종목을 우선 정렬했습니다. 종목명을 누르시면 사업 구조와 분기 추적 지표를 자세히 확인하실 수 있습니다.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {koreaMatched.map((m) => (
                  <Link
                    key={`k-${m.slug}`}
                    href={`/company-analysis/${m.market}/${m.slug}`}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/30 hover:bg-slate-900"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-white">{m.companyNameKo}</span>
                      <span className="text-xs text-slate-400">({m.ticker})</span>
                      {m.hasCustomNote && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">사업·실적 설명</span>
                      )}
                      {m.indices.map((idx) => (
                        <span key={`${m.ticker}-${idx}`} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-200">
                          {idx === "KOSPI200" ? "KOSPI 200" : idx === "KOSPI50" ? "KOSPI 50" : idx === "KOSDAQ150" ? "KOSDAQ 150" : idx}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{m.subSector}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {globalMatched.length > 0 && (
            <section className="bd-card bd-card-padding">
              <h2 className="bd-title-md">{currentHub.shortTitle} — 미국·해외 주요 종목</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {globalMatched.map((m) => (
                  <Link
                    key={`g-${m.slug}`}
                    href={`/company-analysis/${m.market}/${m.slug}`}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/30 hover:bg-slate-900"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-white">{m.companyNameKo}</span>
                      <span className="text-xs text-slate-400">({m.ticker})</span>
                      {m.hasCustomNote && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">사업·실적 설명</span>
                      )}
                      {m.indices.slice(0, 2).map((idx) => (
                        <span key={`${m.ticker}-${idx}`} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-200">
                          {idx === "S&P500" ? "S&P 500" : idx === "NASDAQ100" ? "NASDAQ 100" : idx === "DJIA" ? "다우존스" : idx}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{m.subSector}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">자주 묻는 질문</h2>
            <div className="mt-6 space-y-4">
              {currentHub.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="bd-text-main mt-3">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{currentHub.shortTitle}와 함께 보면 좋은 가이드·계산기</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {currentHub.related.map((r) => (
                <Link key={r.href} href={r.href} className="bd-button-secondary">
                  {r.label}
                </Link>
              ))}
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드</Link>
              <Link href="/industry" className="bd-button-primary">산업·테마 가이드 전체</Link>
            </div>
          </section>

          <PageTrustFooter pageKind="산업·테마 가이드" updatedAt="2026-04-27" />

          <ShareAndCite
            url={`/industry/${currentHub.slug}`}
            title={currentHub.title}
            category="산업·테마 가이드"
          />
        </div>
      </div>
    </>
  );
}
