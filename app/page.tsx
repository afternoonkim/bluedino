import type { Metadata } from "next";
import Link from "next/link";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import SearchDemandPanel from "@/components/growth/SearchDemandPanel";
import ContentBundlePanel from "@/components/growth/ContentBundlePanel";

export const metadata: Metadata = {
  title: "BlueDino | CMA 이자 계산기·파킹통장·배당·관련주 정보",
  description:
    "CMA 이자 계산기, 파킹통장 금리 계산기, 배당 계산기, ISA·IRP 질문, 미국 2차전지·반도체 장비·헬스케어 관련주를 빠르게 찾을 수 있습니다.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BlueDino | 금융 계산기와 관련주 정보",
    description:
      "CMA·파킹통장·배당 계산기, ISA·IRP 질문, 관련주와 기업분석을 태그형 목록으로 쉽게 찾아볼 수 있습니다.",
    url: "https://bluedino.kr",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueDino | 금융 계산기와 관련주 정보",
    description:
      "CMA·파킹통장·배당·연금·관련주 정보를 계산기와 가이드로 바로 확인할 수 있습니다.",
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
  { title: "CMA·파킹통장 이자 묶음", href: "/topics/cma-parking-cash", description: "CMA 이자 계산기, 파킹통장 금리 계산기, 계좌 질문을 한 흐름으로 봅니다.", badge: "현금관리", tags: ["CMA", "파킹통장", "현금관리"], cta: "묶음 보기" },
  { title: "CMA 이자 계산기", href: "/cal/cma-interest", description: "단기 여유자금과 투자 대기자금의 세후 이자를 바로 확인합니다.", badge: "계산기", tags: ["CMA", "이자", "현금관리"], cta: "계산하기" },
  { title: "파킹통장 금리 계산기", href: "/cal/parking-account", description: "우대금리 한도와 초과분 금리를 나눠 월 이자를 확인합니다.", badge: "계산기", tags: ["파킹통장", "금리", "현금관리"], cta: "계산하기" },
  { title: "배당 계산기", href: "/cal/calculator", description: "보유 수량, 배당률, 재투자 조건을 넣어 장기 배당 흐름을 확인합니다.", badge: "계산기", tags: ["배당", "계산기", "현금흐름"], cta: "계산하기" },
  { title: "관련주 테마 묶음", href: "/topics/theme-stock-map", description: "미국 2차전지, 반도체 장비, 헬스케어 관련주를 산업 단계별로 이어서 봅니다.", badge: "관련주", tags: ["미국주식", "관련주", "산업"], cta: "묶음 보기" },
  { title: "미국 2차전지 관련주", href: "/industry/us-battery-stocks", description: "미국 배터리·리튬·전기차 기업을 역할별로 비교합니다.", badge: "관련주", tags: ["미국주식", "2차전지", "관련주"], cta: "테마 보기" },
  { title: "미국 반도체 장비주", href: "/industry/us-semiconductor-equipment", description: "노광·식각·증착·검사 장비 기업을 따로 나눠 확인합니다.", badge: "관련주", tags: ["미국주식", "반도체", "장비"], cta: "테마 보기" },
  { title: "ISA 질문 가이드", href: "/finance/isa", description: "ISA 가입 조건, 절세 구조, ETF 투자, 만기 활용을 질문 중심으로 정리했습니다.", badge: "절세계좌", tags: ["ISA", "절세계좌", "세금"], cta: "질문 보기" },
];

export default function HomePage() {
  return (
    <main className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">BlueDino · 금융 정보 탐색</span>
          <h1 className="bd-title-xl mt-4">CMA 이자 계산기부터 관련주 정보까지 필요한 것만 바로 찾으세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            BlueDino는 사용자가 많이 찾는 CMA 이자, 파킹통장 금리, 배당금, ISA·IRP 질문, 미국 2차전지·반도체 장비 관련주를 계산기와 가이드로 연결합니다. 먼저 필요한 페이지를 열고, 추가 정보는 펼쳐서 확인하세요.
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

        <ContentBundlePanel
          title="분야별로 이어서 보는 콘텐츠 묶음"
          description="검색자가 한 번에 해결하고 싶은 흐름을 기준으로 계산기·질문·가이드·관련주를 함께 묶었습니다."
          compact
          limit={4}
        />

        <SearchDemandPanel compact limit={4} />

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
            <div className="bd-list-item">먼저 분야별 묶음에서 내 목적에 맞는 흐름을 고른 뒤 계산기나 가이드로 이동합니다.</div>
            <div className="bd-list-item">CMA·파킹통장처럼 숫자가 중요한 주제는 계산 결과를 보고 계좌 질문으로 이어서 확인합니다.</div>
            <div className="bd-list-item">기업이나 테마가 궁금할 때는 관련주 묶음에서 산업 단계와 기업분석을 함께 비교합니다.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
