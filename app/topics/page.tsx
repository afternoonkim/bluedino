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
    "CMA 이자 계산기, 파킹통장 금리 계산기, 배당 계산기, 미국 2차전지 관련주, 반도체 장비주, ISA·IRP 질문을 검색 의도별로 묶었습니다.",
  keywords: ["CMA 이자 계산기", "파킹통장 금리 계산기", "미국 2차전지 관련주", "미국 반도체 장비주", "헬스케어 관련주", "ISA 계좌 몇개", "IRP 계좌 여러개"],
  alternates: { canonical: "/topics" },
  openGraph: {
    title: "CMA 이자 계산기·관련주·계좌 질문 모음 | BlueDino",
    description: "계산기, 관련주, 기업분석, ISA·IRP 질문을 사용자가 자주 찾는 흐름으로 묶었습니다.",
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
      description: cluster.description,
      item: `${BASE_URL}/topics#${cluster.key}`,
    })),
    ...contentBundles.map((bundle, index) => ({
      "@type": "ListItem",
      position: searchDemandClusters.length + index + 1,
      name: bundle.title,
      description: bundle.metaDescription,
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
          <h1 className="bd-title-xl mt-4">CMA 이자 계산기부터 관련주·ISA 질문까지 많이 찾는 흐름으로 모았습니다</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            금액을 바로 계산하려는 사용자, 관련주 목록을 빠르게 확인하려는 사용자, 계좌 조건을 짧게 알고 싶은 사용자가 서로 다른 길로 이동할 수 있게 정리했습니다. 핵심 페이지를 먼저 열고, 자세한 설명은 필요한 경우에만 이어서 확인하세요.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cal" className="bd-button-primary">계산기 먼저 보기</Link>
            <Link href="/industry" className="bd-button-secondary">관련주 보기</Link>
            <Link href="/finance" className="bd-button-secondary">계좌 질문 보기</Link>
          </div>
        </section>

        <ContentBundlePanel
          title="바로 이어서 볼 수 있는 분야별 묶음"
          description="사용자가 많이 찾는 키워드를 한 페이지로만 받지 않고, 계산기·질문·가이드·관련주가 이어지도록 묶었습니다."
        />

        <SearchDemandPanel
          title="집중해서 강화할 4개 흐름"
          description="각 주제는 한 페이지에서 끝나지 않고 계산기, 가이드, 기업분석, 산업·테마 페이지로 이어지도록 연결했습니다."
        />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">이 페이지를 활용하는 방법</h2>
          <div className="bd-list mt-5">
            <div className="bd-list-item">CMA·파킹통장처럼 숫자가 먼저인 주제는 분야별 묶음에서 계산기와 질문 가이드를 같이 엽니다.</div>
            <div className="bd-list-item">배당은 세후 배당금 계산 후 배당 지속성, 월배당 ETF, 재투자 기준으로 이어서 확인합니다.</div>
            <div className="bd-list-item">관련주를 찾을 때는 종목명보다 먼저 산업 단계와 실적 변수를 확인합니다.</div>
            <div className="bd-list-item">ISA·IRP·CMA처럼 조건이 있는 금융상품은 첫 답변만 먼저 읽고, 세부 내용은 필요한 카드만 펼쳐봅니다.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
