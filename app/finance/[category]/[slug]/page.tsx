
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import ShareAndCite from "@/components/share/ShareAndCite";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { getFinanceCategory } from "@/lib/finance/config";
import { getAllFinanceRoutes } from "@/lib/finance/data";
import { getFinanceEntry, getRelatedEntries } from "@/lib/finance/content";
import type { FinanceCategoryKey } from "@/lib/finance/types";

type PageProps = { params: Promise<{ category: string; slug: string }> };

function getFinanceToneLabels(categoryKey: FinanceCategoryKey) {
  if (categoryKey === "loan-basics" || categoryKey === "credit-loan" || categoryKey === "mortgage-loan") {
    return {
      quick: "대출 실행 전 핵심 정리",
      checklist: "신청 전에 확인할 항목",
      faq: "대출 판단에서 자주 나오는 질문",
      calculators: "월 상환액과 한도를 같이 볼 계산기",
      related: "같은 주제로 이어서 볼 질문",
    };
  }

  if (categoryKey === "cma" || categoryKey === "parking") {
    return {
      quick: "현금관리 기준으로 먼저 보면",
      checklist: "계좌를 고르기 전 체크할 항목",
      faq: "현금관리 계좌를 고를 때 자주 묻는 질문",
      calculators: "이자와 생활비를 같이 볼 계산기",
      related: "함께 비교하면 좋은 질문",
    };
  }

  return {
    quick: "계좌를 만들기 전 핵심 정리",
    checklist: "가입·유지 전에 확인할 항목",
    faq: "절세계좌를 볼 때 자주 묻는 질문",
    calculators: "세금과 장기 자금을 같이 볼 계산기",
    related: "같은 계좌에서 이어서 볼 질문",
  };
}


export async function generateStaticParams() {
  return getAllFinanceRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = getFinanceCategory(decodeURIComponent(rawCategory));
  if (!category) {
    return { title: "질문 가이드 | BlueDino" };
  }
  const entry = getFinanceEntry(category.key as FinanceCategoryKey, decodeURIComponent(rawSlug));
  if (!entry) {
    return { title: `${category.shortTitle} 질문 가이드 | BlueDino` };
  }
  const canonicalPath = `${category.basePath}/${encodeURIComponent(entry.slug)}`;
  const fullUrl = `https://bluedino.kr${canonicalPath}`;
  const fullTitle = `${entry.title} | ${category.shortTitle} 질문 가이드 | BlueDino`;

  return {
    title: fullTitle,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: fullTitle,
      description: entry.description,
      url: fullUrl,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: entry.description,
    },
  };
}

export default async function FinanceQuestionPage({ params }: PageProps) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = getFinanceCategory(decodeURIComponent(rawCategory));
  if (!category) notFound();

  const decodedSlug = decodeURIComponent(rawSlug);
  const entry = getFinanceEntry(category.key as FinanceCategoryKey, decodedSlug);
  if (!entry) notFound();

  const categoryKey = category.key as FinanceCategoryKey;
  const labels = getFinanceToneLabels(categoryKey);
  const relatedEntries = getRelatedEntries(categoryKey, entry.slug, 6);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleUrl = `https://bluedino.kr${category.basePath}/${encodeURIComponent(entry.slug)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    inLanguage: "ko-KR",
    datePublished: "2025-01-01",
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
      "@id": articleUrl,
    },
    articleSection: category.shortTitle,
    keywords: entry.keywords,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "금융 가이드", item: "https://bluedino.kr/finance" },
      { "@type": "ListItem", position: 2, name: category.shortTitle, item: `https://bluedino.kr${category.basePath}` },
      { "@type": "ListItem", position: 3, name: entry.title, item: articleUrl },
    ],
  };

  return (
    <>
      <Script id={`finance-article-${entry.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`finance-faq-${entry.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`finance-breadcrumb-${entry.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/finance" className="bd-badge">금융 가이드</Link>
              <Link href={category.basePath} className="bd-badge">{category.shortTitle}</Link>
            </div>
            <h1 className="bd-title-xl mt-4">{entry.title}</h1>
            <p className="bd-text-main mt-4">{entry.summary}</p>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{labels.quick}</h2>
            <p className="bd-text-main mt-4">{entry.quickAnswer}</p>
            {entry.caution ? <p className="bd-text-sub mt-4">{entry.caution}</p> : null}
          </section>

          <AdBlock slotKey="inline" label={`${entry.title} 본문 중간 보조 콘텐츠 영역`} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {entry.sections.map((section) => (
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

              {entry.checklist.length > 0 && (
                <section className="bd-card-soft bd-card-padding">
                  <h2 className="bd-title-md">{labels.checklist}</h2>
                  <div className="bd-list mt-4">
                    {entry.checklist.map((item) => (
                      <div key={item} className="bd-list-item">{item}</div>
                    ))}
                  </div>
                </section>
              )}

              {entry.faq.length > 0 && (
                <section className="bd-card bd-card-padding">
                  <h2 className="bd-title-md">{labels.faq}</h2>
                  <div className="mt-6 space-y-4">
                    {entry.faq.map((faq) => (
                      <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                        <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                        <p className="bd-text-main mt-3">{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <PageTrustFooter
                updatedAt="2026-04-27"
                pageKind={`${category.shortTitle} 질문 가이드`}
              />

              <ShareAndCite
                url={`${category.basePath}/${encodeURIComponent(entry.slug)}`}
                title={entry.title}
                category={`${category.shortTitle} 질문 가이드`}
              />
            </div>

            <aside className="space-y-6">
              <section className="bd-card bd-card-padding">
                <h2 className="bd-title-sm">{labels.calculators}</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {entry.relatedCalculatorLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="bd-button-secondary text-center">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>

              {relatedEntries.length > 0 && (
                <section className="bd-card bd-card-padding">
                  <h2 className="bd-title-sm">{labels.related}</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {relatedEntries.map((related) => (
                      <Link key={related.slug} href={`${category.basePath}/${encodeURIComponent(related.slug)}`} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900">
                        {related.title}
                      </Link>
                    ))}
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
