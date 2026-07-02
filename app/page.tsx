import type { Metadata } from "next";
import Link from "next/link";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";

export const metadata: Metadata = {
  title: "BlueDino | 금융 계산기·금융 가이드·투자정보 허브",
  description:
    "BlueDino는 배당·복리·대출·연금 계산기와 ISA·IRP·연금저축·ETF·기업분석·산업테마 정보를 사용자가 빠르게 찾을 수 있게 정리한 금융 정보 사이트입니다.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BlueDino | 금융 계산기와 투자정보 허브",
    description:
      "계산기, 금융 질문, 투자 가이드, 기업분석을 큰 메뉴 4개와 태그형 목록으로 쉽게 찾아볼 수 있습니다.",
    url: "https://bluedino.kr",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueDino | 금융 계산기와 투자정보 허브",
    description:
      "배당·복리·연금·대출·ETF 투자 정보를 계산기와 가이드로 차근차근 살펴볼 수 있습니다.",
  },
};

const mainEntries: TaggedListItem[] = [
  {
    title: "계산기 전체보기",
    href: "/cal",
    description: "배당, 복리, FIRE, ISA, IRP, DSR, LTV, 주담대 계산기까지 목적별로 바로 찾을 수 있습니다.",
    badge: "계산기",
    tags: ["계산기", "투자", "대출", "절세"],
    cta: "계산기 찾기",
  },
  {
    title: "금융 질문 가이드",
    href: "/finance",
    description: "ISA, IRP, 연금저축, CMA, 파킹통장, 신용대출, 주담대 질문을 태그로 좁혀볼 수 있습니다.",
    badge: "금융가이드",
    tags: ["금융가이드", "절세계좌", "대출", "현금관리"],
    cta: "질문 보기",
  },
  {
    title: "투자정보 허브",
    href: "/info",
    description: "투자 기초, 투자전략, 기업분석, 산업·테마, ETF 정보로 이어지는 입구입니다.",
    badge: "투자정보",
    tags: ["투자정보", "가이드", "기업분석", "ETF"],
    cta: "정보 찾기",
  },
  {
    title: "기업분석",
    href: "/company-analysis",
    description: "국내기업과 해외기업의 사업 구조, 성장 포인트, 리스크를 검색과 태그로 확인할 수 있습니다.",
    badge: "기업분석",
    tags: ["기업분석", "국내주식", "해외주식", "산업"],
    cta: "기업 찾기",
  },
];

const popularLinks: TaggedListItem[] = [
  { title: "배당 계산기", href: "/cal/calculator", description: "보유 수량, 배당률, 재투자 조건을 넣어 장기 배당 흐름을 확인합니다.", badge: "계산기", tags: ["배당", "계산기", "현금흐름"], cta: "계산하기" },
  { title: "복리 계산기", href: "/cal/compound", description: "초기 자산과 월 투자금, 기간, 수익률을 기준으로 목표 자산 흐름을 확인합니다.", badge: "계산기", tags: ["복리", "계산기", "장기투자"], cta: "계산하기" },
  { title: "DSR 계산기", href: "/cal/dsr", description: "연소득 대비 원리금 상환 부담을 확인해 대출 가능성을 미리 점검합니다.", badge: "대출", tags: ["대출", "DSR", "계산기"], cta: "계산하기" },
  { title: "ISA 질문 가이드", href: "/finance/isa", description: "ISA 가입 조건, 절세 구조, ETF 투자, 만기 활용을 질문 중심으로 정리했습니다.", badge: "절세계좌", tags: ["ISA", "절세계좌", "세금"], cta: "질문 보기" },
  { title: "투자 기초 가이드", href: "/info/guide", description: "주식, ETF, 절세계좌, 배당, 복리처럼 처음 투자할 때 필요한 개념을 모았습니다.", badge: "가이드", tags: ["투자기초", "ETF", "배당"], cta: "가이드 보기" },
  { title: "산업·테마 가이드", href: "/industry", description: "반도체, AI, 2차전지, 배당주처럼 여러 기업이 묶이는 테마를 비교합니다.", badge: "테마", tags: ["산업", "AI", "반도체"], cta: "테마 보기" },
];

export default function HomePage() {
  return (
    <main className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">BlueDino · 금융 정보 탐색</span>
          <h1 className="bd-title-xl mt-4">계산기, 금융 질문, 투자정보를 더 단순하게 찾으세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            메뉴가 많으면 필요한 정보를 찾기 어렵습니다. BlueDino는 큰 메뉴를 계산기, 금융가이드, 투자정보로 줄이고 각 페이지 안에서 태그와 검색으로 세부 내용을 찾는 구조로 정리했습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cal" className="bd-button-primary">계산기 찾기</Link>
            <Link href="/finance" className="bd-button-secondary">금융 질문 보기</Link>
            <Link href="/info" className="bd-button-secondary">투자정보 보기</Link>
          </div>
        </section>

        <TaggedList
          title="주요 메뉴"
          description="상단과 하단 메뉴는 최소화하고, 세부 분류는 각 페이지 안에서 태그로 고르는 방식입니다."
          items={mainEntries}
          filterTags={["계산기", "금융가이드", "투자정보", "기업분석"]}
          searchPlaceholder="예: 계산기, ISA, 기업분석, ETF, 대출"
          countLabel="메뉴"
          showSearch={false}
        />

        <TaggedList
          title="자주 찾는 바로가기"
          description="처음 방문한 사용자가 가장 많이 찾을 만한 계산기와 가이드를 목록으로 모았습니다."
          items={popularLinks}
          filterTags={["계산기", "대출", "절세계좌", "가이드", "테마"]}
          searchPlaceholder="예: 배당, 복리, DSR, ISA, ETF"
          countLabel="바로가기"
        />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">사이트를 이렇게 사용하면 편합니다</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">먼저 계산기로 숫자를 확인하고, 결과 하단의 관련 가이드에서 세금과 제도 조건을 같이 봅니다.</div>
            <div className="bd-list-item">금융 상품이 헷갈릴 때는 금융가이드에서 질문을 고르고, 비슷한 질문을 이어서 확인합니다.</div>
            <div className="bd-list-item">기업이나 테마가 궁금할 때는 투자정보에서 기업분석과 산업·테마를 함께 비교합니다.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
