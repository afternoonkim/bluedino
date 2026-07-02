import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdFitAd from "@/components/ad/AdFitAd";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { industryHubs } from "@/lib/industry/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "산업·테마 가이드 | 반도체·2차전지·AI·배당주 관련주 정리 | BlueDino",
  description:
    "한국·미국 종목을 반도체, 2차전지, AI, 배당주, 바이오, 금융, 자동차, K-콘텐츠 등 산업·테마별로 묶어 비교하는 BlueDino 산업 가이드",
  keywords: ["산업별 관련주", "테마별 관련주", "반도체 관련주", "AI 관련주", "2차전지 관련주", "배당주", "바이오 관련주", "금융주", "자동차 관련주"],
  alternates: { canonical: "/industry" },
  openGraph: {
    title: "산업·테마 가이드 | BlueDino",
    description: "한국·미국 종목을 산업·테마별로 묶어 비교하는 BlueDino 산업 가이드입니다.",
    url: `${BASE_URL}/industry`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BlueDino 산업·테마 가이드",
  numberOfItems: industryHubs.length,
  itemListElement: industryHubs.map((hub, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${BASE_URL}/industry/${hub.slug}`,
    name: hub.title,
    description: hub.description,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "산업·테마 가이드", item: `${BASE_URL}/industry` },
  ],
};

function themeTags(hub: (typeof industryHubs)[number]) {
  const text = `${hub.title} ${hub.description} ${hub.keywords.join(" ")}`;
  const tags = new Set<string>(["산업·테마", hub.shortTitle]);
  if (/반도체|HBM|파운드리/.test(text)) tags.add("반도체");
  if (/AI|데이터센터|클라우드/.test(text)) tags.add("AI");
  if (/2차전지|배터리|전기차/.test(text)) tags.add("2차전지");
  if (/배당|리츠/.test(text)) tags.add("배당");
  if (/바이오|헬스케어/.test(text)) tags.add("바이오");
  if (/금융|은행|보험/.test(text)) tags.add("금융");
  if (/자동차|모빌리티/.test(text)) tags.add("자동차");
  if (/콘텐츠|엔터/.test(text)) tags.add("K-콘텐츠");
  return Array.from(tags);
}

export default function IndustryIndexPage() {
  const industryItems: TaggedListItem[] = industryHubs.map((hub) => ({
    title: hub.shortTitle,
    href: `/industry/${hub.slug}`,
    description: hub.description,
    badge: "산업·테마",
    meta: hub.keywords.slice(0, 2).join(" · "),
    tags: themeTags(hub),
    cta: "테마 보기",
  }));

  return (
    <>
      <Script id="industry-index-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="industry-index-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">산업·테마 가이드</span>
            <h1 className="bd-title-xl mt-4">관련주를 산업·테마별 목록으로 비교해 보세요</h1>
            <p className="bd-text-main mt-4 max-w-4xl">
              반도체 관련주, AI 관련주, 배당주처럼 검색어로 들어오면 종목이 너무 많이 보여서 판단이 어렵습니다. 그래서 산업·테마 페이지는 카드 대신 목록형으로 바꾸고, 핵심 태그를 눌러 필요한 테마만 남기도록 정리했습니다.
            </p>
          </section>

          <TaggedList
            title="산업·테마 목록"
            description="관심 테마를 누르면 관련 기업과 함께 봐야 할 지표를 이어서 확인할 수 있습니다."
            items={industryItems}
            filterTags={["반도체", "AI", "2차전지", "배당", "바이오", "금융", "자동차", "K-콘텐츠"]}
            searchPlaceholder="예: 반도체, AI, 데이터센터, 배당, 바이오, 금융"
            countLabel="테마"
          />

          <AdFitAd variant="middle" label="본문 중간 광고 영역" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">산업·테마 가이드를 활용하는 방법</h2>
            <div className="bd-list mt-5">
              <div className="bd-list-item">관심 산업을 누른 뒤, 세부 영역과 대표 기업이 실제로 어디에서 돈을 버는지 먼저 확인합니다.</div>
              <div className="bd-list-item">좋은 테마라도 이미 기대가 가격에 반영됐는지, 분기 실적에서 확인할 지표가 무엇인지 따로 봅니다.</div>
              <div className="bd-list-item">관련 기업을 본 뒤에는 기업분석, 투자전략, 계산기로 이어서 본인 자금 계획에 맞춰 판단합니다.</div>
            </div>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">함께 보면 좋은 페이지</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/company-analysis" className="bd-button-secondary">기업분석 메인</Link>
              <Link href="/info/strategy" className="bd-button-secondary">투자 전략</Link>
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드</Link>
              <Link href="/cal/calculator" className="bd-button-secondary">배당 계산기</Link>
              <Link href="/finance" className="bd-button-primary">금융 가이드 메인</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
