import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SearchDemandPanel from "@/components/growth/SearchDemandPanel";
import ContentBundlePanel from "@/components/growth/ContentBundlePanel";
import { searchDemandClusters } from "@/lib/growth/searchDemand";
import { contentBundles } from "@/lib/growth/contentBundles";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bluedino.kr";

export const metadata: Metadata = {
  title: "CMA 이자 계산기·관련주·ISA/IRP 질문 모음 | BlueDino",
  description:
    "CMA·파킹통장·배당 계산기, 미국 2차전지·반도체 장비 관련주, ISA·IRP 질문을 필요한 목적별로 한곳에서 찾아보세요.",
  keywords: ["CMA 이자 계산기", "파킹통장 금리 계산기", "미국 2차전지 관련주", "미국 반도체 장비주", "헬스케어 관련주", "ISA 계좌 몇개", "IRP 계좌 여러개"],
  alternates: { canonical: "/topics" },
  openGraph: {
    title: "CMA 이자 계산기·관련주·계좌 질문 모음 | BlueDino",
    description: "계산기, 관련주, 기업분석, ISA·IRP 질문 중 지금 필요한 주제부터 바로 확인하세요.",
    url: `${BASE_URL}/topics`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BlueDino 많이 찾는 금융·투자 주제",
  numberOfItems: searchDemandClusters.length + contentBundles.length,
  itemListElement: [
    ...searchDemandClusters.map((cluster, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cluster.title,
      item: `${BASE_URL}/topics#${cluster.key}`,
    })),
    ...contentBundles.map((bundle, index) => ({
      "@type": "ListItem",
      position: searchDemandClusters.length + index + 1,
      name: bundle.title,
      item: `${BASE_URL}/topics/${bundle.slug}`,
    })),
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BlueDino", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "많이 찾는 주제", item: `${BASE_URL}/topics` },
  ],
};

export default function TopicsPage() {
  return (
    <main className="bd-page">
      <Script id="topics-itemlist-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="topics-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">많이 찾는 주제</span>
          <h1 className="bd-title-xl mt-4">CMA 이자 계산기부터 관련주·ISA 질문까지 한곳에서 확인하세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            계산이 필요하면 계산기부터, 관련주가 궁금하면 산업·테마부터, 계좌 조건을 확인하려면 금융가이드부터 시작하세요. 자세한 설명은 필요할 때 이어서 확인할 수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cal" className="bd-button-primary">계산기 먼저 보기</Link>
            <Link href="/industry" className="bd-button-secondary">관련주 보기</Link>
            <Link href="/finance" className="bd-button-secondary">계좌 질문 보기</Link>
          </div>
        </section>

        <ContentBundlePanel
          title="함께 보면 좋은 정보"
          description="계산기·질문·가이드·관련주를 주제별로 이어서 확인할 수 있습니다."
        />

        <SearchDemandPanel
          title="필요에 따라 바로 시작하세요"
          description="계산, 계좌, 기업, 산업처럼 지금 궁금한 주제부터 골라보세요."
        />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">어디서 시작하면 좋을까요?</h2>
          <div className="bd-list mt-5">
            <div className="bd-list-item">CMA·파킹통장처럼 숫자가 궁금하면 계산기로 예상 이자를 먼저 확인하세요.</div>
            <div className="bd-list-item">배당은 세후 배당금을 계산한 뒤 배당 지속성, 월배당 ETF, 재투자 기준을 함께 살펴보세요.</div>
            <div className="bd-list-item">관련주를 찾을 때는 종목명보다 먼저 산업 단계와 실적 변수를 확인하세요.</div>
            <div className="bd-list-item">ISA·IRP·CMA처럼 조건이 있는 금융상품은 핵심 답부터 확인하고 필요한 세부 내용만 펼쳐보세요.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
