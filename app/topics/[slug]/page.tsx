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

const bundleUserCopy: Record<
  string,
  { metaDescription?: string; summary?: string; userNeed?: string }
> = {
  "cma-parking-cash": {
    metaDescription:
      "CMA 이자 계산기와 파킹통장 금리 계산기로 예치금별 하루·월 이자, 우대금리 한도와 두 계좌의 차이를 함께 확인하세요.",
    summary:
      "CMA와 파킹통장은 모두 단기 여유자금을 맡길 때 많이 찾지만, 실제 비교는 광고 금리보다 내 예치금에 적용되는 세후 이자에서 시작해야 합니다. 먼저 계산기로 예상 이자를 확인한 뒤 필요하면 계좌 조건과 주의사항을 함께 살펴보세요.",
    userNeed:
      "예치할 금액을 기준으로 하루·월 이자와 우대금리 한도 초과 시 차이를 먼저 확인해보세요.",
  },
  "dividend-cashflow": {
    metaDescription:
      "배당 계산기로 세후 배당금과 월 배당 현금흐름을 확인하고 배당률·배당성향·월배당 ETF·재투자 기준까지 함께 살펴보세요.",
    userNeed:
      "보유 수량을 넣어 월 배당을 먼저 확인하고, 그 배당이 오래 유지될 수 있는지도 함께 살펴보세요.",
  },
  "retirement-tax-accounts": {
    metaDescription:
      "IRP·연금저축 세액공제와 퇴직소득세를 함께 계산하고 환급 예상액, 퇴직금 실수령액, 중도해지 부담을 확인하세요.",
    userNeed:
      "예상 환급액과 나중에 돈을 찾을 때의 세금 부담을 함께 확인해보세요.",
  },
  "theme-stock-map": {
    metaDescription:
      "미국 2차전지·반도체 장비·헬스케어·한국 AI 소프트웨어 관련주를 산업 단계별로 나눠 대표 기업과 실적 변수를 확인하세요.",
    summary:
      "관련주는 종목 수보다 왜 같은 테마로 묶이는지부터 보는 편이 이해하기 쉽습니다. 같은 2차전지라도 완성차·소재·충전 인프라가 다르고, 같은 헬스케어라도 제약·바이오·의료기기·보험은 주가 변수가 다릅니다.",
    userNeed:
      "대표 기업을 먼저 확인한 뒤 각 기업이 산업에서 어떤 역할을 하고 실적에서 무엇을 봐야 하는지 함께 살펴보세요.",
  },
};

function getBundleCopy(bundle: NonNullable<ReturnType<typeof getContentBundle>>) {
  const override = bundleUserCopy[bundle.slug] ?? {};
  return {
    metaDescription: override.metaDescription ?? bundle.metaDescription,
    summary: override.summary ?? bundle.summary,
    userNeed: override.userNeed ?? bundle.userNeed,
  };
}

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
  const copy = getBundleCopy(bundle);

  return {
    title: bundle.metaTitle,
    description: copy.metaDescription,
    keywords: bundle.keywords,
    alternates: { canonical: `/topics/${bundle.slug}` },
    openGraph: {
      title: bundle.metaTitle,
      description: copy.metaDescription,
      url,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: bundle.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default async function ContentBundlePage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const bundle = getContentBundle(safeDecodeSegment(rawSlug));
  if (!bundle) notFound();

  const copy = getBundleCopy(bundle);
  const pageUrl = `${BASE_URL}/topics/${bundle.slug}`;
  const allLinks = bundle.sections.flatMap((section) => section.links);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: bundle.title,
    description: copy.metaDescription,
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
          <p className="bd-text-main mt-4">{copy.summary}</p>
          <p className="bd-text-sub mt-4">{copy.userNeed}</p>
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
              label: "먼저 확인할 내용",
              value: copy.userNeed,
            },
            {
              label: "먼저 볼 페이지",
              value: bundle.sections[0]?.links[0]?.description ?? "가장 가까운 계산기나 가이드를 먼저 열어보세요.",
            },
            {
              label: "더 알아보기",
              value: "결정 기준과 자주 묻는 질문은 아래에서 필요할 때 펼쳐 확인하세요.",
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
          summary="실제 선택 전에 필요한 기준만 펼쳐서 확인하세요."
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
          summary="더 궁금한 내용이 있다면 펼쳐서 확인하세요."
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
          <h2 className="bd-title-md">다른 주제도 이어서 보기</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/topics" className="bd-button-primary">주제 전체보기</Link>
            <Link href="/cal" className="bd-button-secondary">계산기 전체보기</Link>
            <Link href="/finance" className="bd-button-secondary">금융 질문 보기</Link>
            <Link href="/industry" className="bd-button-secondary">관련주 보기</Link>
          </div>
        </section>

        <PageTrustFooter pageKind="주제 가이드" updatedAt={bundle.updatedAt} />
        <ShareAndCite url={`/topics/${bundle.slug}`} title={bundle.title} category="주제 가이드" />
      </div>
    </main>
  );
}
