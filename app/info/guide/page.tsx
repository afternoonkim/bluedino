import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { guideArticles, guideCategories } from "@/lib/info/guideArticles";
import EditorialTrustPanel from "@/components/trust/EditorialTrustPanel";

export const metadata: Metadata = {
  title: "투자 기초 가이드 | 주식·ETF·ISA·연금저축·배당 | BlueDino",
  description:
    "주식, ETF, ISA, 연금저축, 배당, 복리까지 투자 입문자가 먼저 이해하면 좋은 핵심 개념을 태그와 목록으로 쉽게 찾을 수 있는 BlueDino 가이드 모음",
  alternates: { canonical: "/info/guide" },
  openGraph: {
    title: "투자 기초 가이드 | BlueDino",
    description:
      "주식, ETF, ISA, 연금저축, 배당, 복리까지 투자 입문자가 먼저 이해하면 좋은 핵심 개념을 쉽게 정리한 BlueDino 가이드 모음",
    url: "https://bluedino.kr/info/guide",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "투자 기초 가이드 | BlueDino",
    description:
      "주식, ETF, ISA, 연금저축, 배당, 복리까지 투자 입문자가 먼저 이해하면 좋은 핵심 개념을 쉽게 정리한 BlueDino 가이드 모음",
  },
};

const guideSlugs = guideCategories.flatMap((category) => category.items);
const categoryBySlug = new Map(
  guideCategories.flatMap((category) => category.items.map((slug) => [slug, category] as const)),
);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BlueDino 투자 기초 가이드",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: guideSlugs.length,
  itemListElement: guideSlugs.map((slug, index) => {
    const article = guideArticles[slug];
    return {
      "@type": "ListItem",
      position: index + 1,
      url: `https://bluedino.kr/info/guide/${slug}`,
      name: article.title,
      description: article.description,
    };
  }),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
    { "@type": "ListItem", position: 2, name: "투자 기초 가이드", item: "https://bluedino.kr/info/guide" },
  ],
};

export default function GuidePage() {
  const guideItems: TaggedListItem[] = guideSlugs.map((slug) => {
    const article = guideArticles[slug];
    const category = categoryBySlug.get(slug);
    return {
      title: article.title,
      href: `/info/guide/${slug}`,
      description: article.description,
      badge: category?.badge ?? article.badge,
      meta: article.calculators[0]?.label,
      tags: [category?.badge ?? article.badge, article.badge, ...(article.calculators[0] ? [article.calculators[0].label.replace(" 계산기", "")] : [])],
      cta: "가이드 읽기",
    };
  });

  return (
    <div className="bd-page">
      <Script id="guide-index-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="guide-index-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자 기초 가이드</span>
          <h1 className="bd-title-xl mt-4">투자를 처음 시작할 때 필요한 개념을 태그로 골라보세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            주식, ETF, 절세계좌, 배당, 복리처럼 많이 듣지만 한 번에 정리하기 어려운 주제를 목록형으로 바꿨습니다. 긴 카드들을 훑기보다 절세, 투자입문, 현금흐름, 대출 태그 중 지금 필요한 분류를 먼저 눌러보세요.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이 순서로 보세요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">투자 기본부터: 주식·ETF·포트폴리오 개념을 먼저 정리합니다.</div>
            <div className="bd-list-item">세후 결과까지 보기: ISA·연금저축·IRP처럼 계좌에 따라 달라지는 세금을 확인합니다.</div>
            <div className="bd-list-item">돈의 흐름 연결하기: 배당·복리·FIRE 계산기로 내 숫자에 맞춰 다시 점검합니다.</div>
          </div>
        </section>

        <TaggedList
          title="투자 기초 가이드 목록"
          description="태그와 검색을 같이 쓰면 모바일에서도 필요한 글을 빠르게 찾을 수 있습니다."
          items={guideItems}
          filterTags={guideCategories.map((category) => category.badge)}
          searchPlaceholder="예: ISA, ETF, 배당, 복리, 대출, 세금"
          countLabel="가이드"
          compactItems
        />

        <EditorialTrustPanel compact />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">직접 계산해보면 더 쉬운 주제</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cal/compound" className="bd-button-secondary">복리 계산기</Link>
            <Link href="/cal/calculator" className="bd-button-secondary">배당 계산기</Link>
            <Link href="/cal/fire" className="bd-button-secondary">FIRE 계산기</Link>
            <Link href="/cal/capital-gains" className="bd-button-secondary">양도소득세 계산기</Link>
            <Link href="/finance" className="bd-button-primary">금융 가이드 메인</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
