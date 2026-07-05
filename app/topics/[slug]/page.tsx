import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import ExpandableCard from "@/components/common/ExpandableCard";
import DetailPriorityPanel from "@/components/common/DetailPriorityPanel";
import ShareAndCite from "@/components/share/ShareAndCite";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import { getContentBundle, getContentBundleSlugs } from "@/lib/growth/contentBundles";
import { safeDecodeSegment } from "@/lib/route-utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getContentBundleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const bundle = getContentBundle(safeDecodeSegment(rawSlug));
  if (!bundle) return { title: "많이 찾는 주제 | BlueDino" };

  const url = `${BASE_URL}/topics/${bundle.slug}`;
  return {
    title: bundle.metaTitle,
    description: bundle.metaDescription,
    keywords: bundle.keywords,
    alternates: { canonical: `/topics/${bundle.slug}` },
    openGraph: {
      title: bundle.metaTitle,
      description: bundle.metaDescription,
      url,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: bundle.metaTitle,
      description: bundle.metaDescription,
    },
  };
}

export default async function ContentBundlePage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const bundle = getContentBundle(safeDecodeSegment(rawSlug));
  if (!bundle) notFound();

  const pageUrl = `${BASE_URL}/topics/${bundle.slug}`;
  const allLinks = bundle.sections.flatMap((section) => section.links);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: bundle.title,
    description: bundle.metaDescription,
    inLanguage: "ko-KR",
    datePublished: bundle.updatedAt,
    dateModified: bundle.updatedAt,
    author: { "@type": "Organization", name: "BlueDino", url: `${BASE_URL}/info/etc/about` },
    publisher: { "@type": "Organization", name: "BlueDino", url: BASE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    keywords: bundle.keywords,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${bundle.title} 바로가기`,
    itemListElement: allLinks.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.label,
      description: link.description,
      url: `${BASE_URL}${link.href}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bundle.faqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "많이 찾는 주제", item: `${BASE_URL}/topics` },
      { "@type": "ListItem", position: 3, name: bundle.title, item: pageUrl },
    ],
  };

  return (
    <main className="bd-page">
      <Script id={`bundle-${bundle.slug}-article`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`bundle-${bundle.slug}-items`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id={`bundle-${bundle.slug}-faq`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`bundle-${bundle.slug}-breadcrumb`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/topics" className="bd-badge">많이 찾는 주제</Link>
            <span className="bd-badge">{bundle.badge}</span>
          </div>
          <h1 className="bd-title-xl mt-4">{bundle.title}</h1>
          <p className="bd-text-main mt-4">{bundle.summary}</p>
          <p className="bd-text-sub mt-4">{bundle.userNeed}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {bundle.keywords.slice(0, 5).map((keyword) => (
              <span key={keyword} className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {keyword}
              </span>
            ))}
          </div>
        </section>

        <DetailPriorityPanel
          eyebrow={bundle.badge}
          title="먼저 이렇게 보세요"
          summary={bundle.firstStep}
          items={[
            {
              label: "검색 의도",
              value: bundle.userNeed,
            },
            {
              label: "첫 이동",
              value: bundle.sections[0]?.links[0]?.description ?? "가장 가까운 계산기나 가이드를 먼저 열어보세요.",
            },
            {
              label: "추가 정보",
              value: "결정 기준과 FAQ는 아래 접힌 카드에 넣어 필요한 사용자만 볼 수 있게 했습니다.",
            },
          ]}
        />

        {bundle.sections.map((section) => (
          <section key={section.title} className="bd-card bd-card-padding">
            <h2 className="bd-title-md">{section.title}</h2>
            <p className="bd-text-sub mt-3">{section.description}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {section.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/35 hover:bg-slate-900">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{link.label}</span>
                    {link.tag ? <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] font-semibold text-slate-400">{link.tag}</span> : null}
                  </div>
                  <p className="bd-text-main mt-2">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <ExpandableCard
          title="결정 전에 확인할 기준"
          summary="핵심 경로를 본 뒤, 실제 선택 전에 필요한 기준만 펼쳐서 확인하세요."
          variant="soft"
        >
          <div className="bd-list">
            {bundle.checklist.map((item) => (
              <div key={item} className="bd-list-item">{item}</div>
            ))}
          </div>
        </ExpandableCard>

        <ExpandableCard
          title="자주 묻는 질문"
          summary="추가 설명은 필요한 사용자만 펼쳐볼 수 있게 접어두었습니다."
        >
          <div className="space-y-4">
            {bundle.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="bd-text-main mt-3">{faq.answer}</p>
              </article>
            ))}
          </div>
        </ExpandableCard>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">다른 묶음도 이어서 보기</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/topics" className="bd-button-primary">주제 전체보기</Link>
            <Link href="/cal" className="bd-button-secondary">계산기 전체보기</Link>
            <Link href="/finance" className="bd-button-secondary">금융 질문 보기</Link>
            <Link href="/industry" className="bd-button-secondary">관련주 보기</Link>
          </div>
        </section>

        <PageTrustFooter pageKind="분야별 콘텐츠 묶음" updatedAt={bundle.updatedAt} />
        <ShareAndCite url={`/topics/${bundle.slug}`} title={bundle.title} category="분야별 콘텐츠 묶음" />
      </div>
    </main>
  );
}
