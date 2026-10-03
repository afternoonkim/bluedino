import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdFitAd from "@/components/ad/AdFitAd";
import ShareAndCite from "@/components/share/ShareAndCite";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import ExpandableCard from "@/components/common/ExpandableCard";
import DetailPriorityPanel from "@/components/common/DetailPriorityPanel";
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
import { safeDecodeSegment } from "@/lib/route-utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ slug: string }> };

type IndustryCtrSeo = {
  title: string;
  description: string;
  keywords: string[];
  searchNote: string;
  h1?: string;
};

function getIndustryCtrSeo(hub: IndustryHub): IndustryCtrSeo | undefined {
  const overrides: Record<string, IndustryCtrSeo> = {
    "us-battery-stocks": {
      title: "미국 2차전지 관련주 정리 | 전기차·리튬·배터리 기업 비교",
      description:
        "미국 2차전지 관련주를 전기차, 리튬, 배터리 소재, 충전 인프라로 나눠 비교합니다. 대표 기업과 실적 변수를 한 페이지에서 확인하세요.",
      keywords: ["미국 2차전지 관련주", "미국 2차전지", "미국 배터리 관련주", "미국 리튬 관련주"],
      h1: "미국 2차전지 관련주를 전기차·리튬·배터리 소재로 나눠 보세요",
      searchNote: "미국 2차전지 관련주는 테슬라만 보는 주제가 아닙니다. 전기차, 리튬, 소재, 충전 인프라를 나눠야 실제 수혜 경로가 보입니다.",
    },
    "us-semiconductor-equipment": {
      title: "미국 반도체 장비주 정리 | 노광·식각·증착·검사 기업 비교",
      description:
        "미국 반도체 장비주를 노광, 식각, 증착, 검사, 후공정 장비 기업으로 나눠 비교합니다. 설비투자와 수주 흐름을 함께 확인하세요.",
      keywords: ["미국 반도체 장비주", "미국 반도체 장비 관련주", "반도체 장비 관련주", "반도체 검사장비 관련주"],
      h1: "미국 반도체 장비주를 공정별로 나눠 비교하세요",
      searchNote: "반도체 장비주는 칩 회사보다 고객사의 설비투자와 수주 흐름에 민감합니다. 노광·식각·증착·검사 공정을 나누면 종목 차이가 빨리 보입니다.",
    },
    "korea-ai-software": {
      title: "AI 소프트웨어 관련주 한국 정리 | 플랫폼·보안·클라우드 비교",
      description:
        "AI 소프트웨어 관련주 한국 종목을 플랫폼, 보안, 클라우드, 산업용 소프트웨어로 나눠 비교합니다. 뉴스보다 매출 연결 경로를 먼저 확인하세요.",
      keywords: ["AI 소프트웨어 관련주 한국", "한국 AI 소프트웨어 관련주", "국내 AI 관련주", "AI 보안 관련주"],
      h1: "AI 소프트웨어 관련주 한국 종목을 매출 경로별로 확인하세요",
      searchNote: "국내 AI 관련주는 기술 발표보다 유료 사용자, B2B 계약, 클라우드 비용, 데이터센터 수요가 실제 실적에 연결되는지 확인해야 합니다.",
    },
    "healthcare-stocks": {
      title: "헬스케어 관련주 정리 | 제약·바이오·의료기기 비교",
      description:
        "헬스케어 관련주를 제약, 바이오, 의료기기, 진단, 서비스 기업으로 나눠 비교합니다. 임상 기대감과 실제 매출 기업을 구분해 확인하세요.",
      keywords: ["헬스케어 관련주", "바이오 관련주", "제약 관련주", "의료기기 관련주", "미국 헬스케어 관련주"],
      h1: "헬스케어 관련주를 제약·바이오·의료기기로 나눠 보세요",
      searchNote: "헬스케어 관련주는 범위가 넓습니다. 제약, 임상 바이오, 의료기기, 서비스 기업을 나눠 보면 각 기업의 차이를 이해하기 쉽습니다.",
    },
    "ev-battery": {
      title: "2차전지 관련주 정리 | 배터리·소재·전기차 기업 비교",
      description:
        "2차전지 관련주를 셀, 양극재, 음극재, 동박, 전해액, 전기차 흐름으로 비교합니다. 한국 소재주와 미국 배터리 기업을 역할별로 나눠 볼 수 있게 정리했습니다.",
      keywords: ["2차전지 관련주", "배터리 관련주", "전기차 관련주", "양극재 관련주"],
      searchNote: "2차전지 관련주는 범위가 넓어 셀·소재·전기차·인프라를 먼저 나눠 보는 편이 이해하기 쉽습니다.",
    },
    semiconductor: {
      title: "반도체 관련주 정리 | 메모리·HBM·파운드리·장비 기업 비교",
      description:
        "반도체 관련주를 메모리, HBM, 파운드리, 반도체 장비, 소재 흐름으로 비교합니다. 같은 반도체라도 실적을 움직이는 변수를 나눠 볼 수 있게 정리했습니다.",
      keywords: ["반도체 관련주", "HBM 관련주", "반도체 장비 관련주", "AI 반도체 관련주"],
      searchNote: "반도체 관련주는 메모리·HBM·장비·파운드리처럼 세부 영역별로 봐야 종목 차이가 보입니다.",
    },
    biotech: {
      title: "헬스케어 관련주 정리 | 바이오·의료기기·제약주 비교",
      description:
        "헬스케어 관련주를 바이오, 제약, 의료기기, 진단 기업으로 나눠 비교합니다. 단순 테마보다 실적·임상·규제 리스크를 함께 확인할 수 있게 정리했습니다.",
      keywords: ["헬스케어 관련주", "바이오 관련주", "제약 관련주", "의료기기 관련주"],
      searchNote: "헬스케어 관련주는 범위가 넓어 제약·바이오·의료기기·서비스를 먼저 나눠 봐야 이해하기 쉽습니다.",
    },
    ai: {
      title: "AI 관련주 정리 | 반도체·소프트웨어·데이터센터 기업 비교",
      description:
        "AI 관련주를 반도체, 소프트웨어, 클라우드, 데이터센터, 보안 흐름으로 비교합니다. 국내·미국 종목을 가치사슬 기준으로 나눠 정리했습니다.",
      keywords: ["AI 관련주", "AI 반도체 관련주", "AI 소프트웨어 관련주", "데이터센터 관련주"],
      searchNote: "AI 관련주는 반도체·인프라·소프트웨어·서비스를 나눠 봐야 실제 매출 경로가 보입니다.",
    },
  };

  return overrides[hub.slug];
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getIndustryHub(safeDecodeSegment(slug));
  if (!hub) return { title: "산업·테마 가이드 | BlueDino" };

  const url = `${BASE_URL}/industry/${hub.slug}`;
  const ctrSeo = getIndustryCtrSeo(hub);
  const metaTitle = `${ctrSeo?.title ?? hub.title} | BlueDino`;
  const metaDescription = ctrSeo?.description ?? hub.description;
  const metaKeywords = [...(ctrSeo?.keywords ?? []), ...hub.keywords];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    alternates: { canonical: `/industry/${hub.slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
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

function matchesHub(
  hub: IndustryHub,
  article: { sector: string; ticker: string; market: string },
): boolean {
  const tickerUpper = article.ticker.toUpperCase();
  if (hub.match.marketIncludes?.length && !hub.match.marketIncludes.includes(article.market as "korea" | "global")) return false;
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
  const hub = getIndustryHub(safeDecodeSegment(slug));
  if (!hub) notFound();
  const currentHub = hub;
  const ctrSeo = getIndustryCtrSeo(currentHub);

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

  const displayTitle = ctrSeo?.h1 ?? ctrSeo?.title ?? currentHub.title;
  const displayDescription = ctrSeo?.description ?? currentHub.description;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: displayTitle,
    description: displayDescription,
    inLanguage: "ko-KR",
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
            <h1 className="bd-title-xl mt-4">{displayTitle}</h1>
            <p className="bd-text-main mt-4">{currentHub.heroIntro}</p>
          </section>

          <DetailPriorityPanel
            eyebrow="테마 분석 핵심"
            title={`${currentHub.shortTitle}을 처음 본다면 종목 목록보다 역할을 먼저 나누세요`}
            summary={currentHub.introBody}
            items={[
              {
                label: "첫 번째 기준",
                value: currentHub.watchPoints[0] ?? "같은 테마 안에서도 매출이 나는 위치가 다른 기업을 구분하세요.",
              },
              {
                label: "두 번째 기준",
                value: currentHub.watchPoints[1] ?? "실적에서 확인할 지표와 주가를 움직이는 변수를 나눠보세요.",
              },
              {
                label: "아래에서 볼 것",
                value: "국내·미국 주요 종목은 바로 보이고, 세부 지표와 FAQ는 접힌 카드로 정리했습니다.",
              },
            ]}
          />

          {ctrSeo ? (
            <ExpandableCard
              title="함께 쓰이는 표현과 다루는 범위"
              summary="같은 테마가 여러 표현으로 불릴 때 헷갈리지 않도록 범위를 정리했습니다."
              variant="soft"
            >
              <p className="bd-text-main">{ctrSeo.searchNote}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100/90">
                {ctrSeo.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
            </ExpandableCard>
          ) : null}

          <AdFitAd variant="middle" label="본문 중간 스폰서 배너" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

          <ExpandableCard
            title={`${currentHub.shortTitle}을 비교할 때 봐야 할 핵심 지표`}
            summary="종목 목록을 먼저 본 뒤, 더 깊게 비교하고 싶을 때 펼쳐보세요."
            variant="soft"
          >
            <div className="bd-list">
              {currentHub.watchPoints.map((point) => (
                <div key={point} className="bd-list-item">{point}</div>
              ))}
            </div>
          </ExpandableCard>

          {koreaMatched.length > 0 && (
            <section className="bd-card bd-card-padding">
              <h2 className="bd-title-md">{currentHub.shortTitle} — 국내 주요 종목</h2>
              <p className="bd-text-sub mt-3">
                각 종목의 산업 내 역할과 사업 구조, 실적 확인 포인트를 함께 살펴보세요. 종목명을 누르면 기업별 상세 분석으로 이동합니다.
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

          <ExpandableCard
            title="자주 묻는 질문"
            summary="기본 목록을 본 뒤 추가로 궁금한 점만 펼쳐서 확인하세요."
          >
            <div className="space-y-4">
              {currentHub.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="bd-text-main mt-3">{faq.answer}</p>
                </article>
              ))}
            </div>
          </ExpandableCard>

          <ExpandableCard
            title={`${currentHub.shortTitle}와 함께 보면 좋은 가이드·계산기`}
            summary="종목을 더 비교하거나 숫자로 점검하고 싶을 때 확인하세요."
            variant="soft"
          >
            <div className="flex flex-wrap gap-3">
              {currentHub.related.map((r) => (
                <Link key={r.href} href={r.href} className="bd-button-secondary">
                  {r.label}
                </Link>
              ))}
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드</Link>
              <Link href="/industry" className="bd-button-primary">산업·테마 가이드 전체</Link>
            </div>
          </ExpandableCard>

          <PageTrustFooter pageKind="산업·테마 가이드" />

          <ShareAndCite
            url={`/industry/${currentHub.slug}`}
            title={displayTitle}
            category="산업·테마 가이드"
          />
        </div>
      </div>
    </>
  );
}
