import type { Metadata } from "next";
import Link from "next/link";
import AdFitAd from "@/components/ad/AdFitAd";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { financeCategories } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";
import SearchDemandPanel from "@/components/growth/SearchDemandPanel";
import ContentBundlePanel from "@/components/growth/ContentBundlePanel";

export const metadata: Metadata = {
  title: "금융 질문 가이드 | ISA·IRP·연금저축·대출·CMA | BlueDino",
  description:
    "ISA, IRP, 연금저축, CMA, 파킹통장, 대출기초, 신용대출, 주담대까지 자주 묻는 금융 질문을 태그와 목록으로 쉽게 찾을 수 있는 BlueDino 금융 가이드",
  alternates: { canonical: "/finance" },
  openGraph: {
    title: "금융 질문 가이드 | BlueDino",
    description:
      "절세계좌, 현금관리, 대출 질문을 한 화면에서 태그로 좁혀보고 필요한 가이드로 이동할 수 있습니다.",
    url: "https://bluedino.kr/finance",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const dividendResources = [
  {
    title: "배당 투자 기초",
    description: "배당률만 보는 실수를 줄이고 배당 지속성, 성장성, 세후 현금흐름까지 함께 보는 기본 가이드입니다.",
    href: "/info/guide/dividend-basics",
    badge: "배당",
    tags: ["배당", "투자기초", "현금흐름"],
  },
  {
    title: "배당 투자 전략",
    description: "현금흐름 중심 투자 관점에서 배당주와 배당 ETF를 어떻게 바라보면 좋은지 정리했습니다.",
    href: "/info/strategy/dividend",
    badge: "배당",
    tags: ["배당", "투자전략", "현금흐름"],
  },
  {
    title: "배당 계산기",
    description: "월 배당금, 보유 수량, 재투자 조건을 숫자로 점검할 수 있는 대표 계산기입니다.",
    href: "/cal/calculator",
    badge: "계산기",
    tags: ["배당", "계산기", "현금흐름"],
  },
  {
    title: "월배당 ETF 체크포인트",
    description: "월분배만 보고 접근하기 전에 총수익과 분배 구조를 같이 확인하기 위한 체크리스트입니다.",
    href: "/info/guide/monthly-dividend-etf-checklist",
    badge: "ETF",
    tags: ["배당", "ETF", "투자기초"],
  },
];

function categoryGroup(key: string) {
  if (["isa", "irp", "pension"].includes(key)) return "절세계좌";
  if (["cma", "parking"].includes(key)) return "현금관리";
  if (["loan-basics", "credit-loan", "mortgage-loan"].includes(key)) return "대출";
  return "금융";
}

export default function FinancePage() {
  const categoryItems: TaggedListItem[] = financeCategories.map((category) => {
    const group = categoryGroup(category.key);
    const count = getQuestionsByCategory(category.key).length;
    return {
      title: `${category.shortTitle} 질문 가이드`,
      href: category.basePath,
      description: category.description,
      badge: group,
      meta: `질문 ${count}개`,
      tags: [group, category.badge, category.shortTitle, "질문"],
      cta: "질문 보기",
    };
  });

  const resourceItems: TaggedListItem[] = dividendResources.map((item) => ({
    ...item,
    cta: "함께 보기",
  }));

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">금융 가이드</span>
          <h1 className="bd-title-xl mt-4">절세계좌·현금관리·대출 질문을 목록으로 빠르게 찾으세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            ISA, IRP, 연금저축, CMA, 파킹통장, 신용대출, 주담대처럼 실제 돈 관리에서 자주 막히는 질문을 큰 메뉴가 아니라 태그 목록으로 정리했습니다. 먼저 내 상황과 가까운 태그를 누른 뒤, 필요한 질문만 골라보세요.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이렇게 보세요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">세후 수익률이 궁금하면 ISA · IRP · 연금저축을 먼저 봅니다.</div>
            <div className="bd-list-item">비상금과 단기 여유자금은 CMA · 파킹통장 차이를 먼저 비교합니다.</div>
            <div className="bd-list-item">대출 실행 전에는 한도보다 월 상환액, 신용 영향, 중도상환 조건을 함께 봅니다.</div>
          </div>
        </section>

        <ContentBundlePanel
          slugs={["cma-parking-cash", "retirement-tax-accounts", "dividend-cashflow"]}
          title="금융 질문에서 이어지는 분야별 묶음"
          description="CMA·파킹통장, IRP·연금저축, 배당 현금흐름처럼 사용자가 이어서 확인할 주제를 질문과 계산기 기준으로 묶었습니다."
          compact
        />

        <SearchDemandPanel
          keys={["account-guides", "cash-calculators"]}
          title="계좌 질문과 계산기를 함께 보는 흐름"
          description="ISA·IRP 같은 계좌 질문은 짧은 답변으로 시작하고, CMA·파킹통장처럼 숫자가 필요한 주제는 계산기로 이어지도록 묶었습니다."
          compact
        />

        <TaggedList
          title="금융 질문 카테고리"
          description="태그를 누르면 해당 분류만 남고, 검색어를 입력하면 제목·설명 기준으로 다시 좁혀집니다."
          items={categoryItems}
          filterTags={["절세계좌", "현금관리", "대출"]}
          searchPlaceholder="예: ISA, IRP, 연금저축, CMA, 주담대, 신용대출"
          countLabel="카테고리"
        />

        <AdFitAd variant="middle" label="본문 중간 스폰서 배너" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

        <TaggedList
          title="배당·현금흐름으로 이어서 보기"
          description="계좌와 대출 구조를 정리한 뒤에는 배당, 복리, ETF 흐름으로 이어서 볼 수 있습니다."
          items={resourceItems}
          filterTags={["배당", "ETF", "계산기"]}
          searchPlaceholder="예: 배당, ETF, 계산기, 현금흐름"
          countLabel="콘텐츠"
        />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 바로가기</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax" className="bd-button-secondary">계좌별 세금정보</Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">절세계좌 활용순서</Link>
            <Link href="/cal/dsr" className="bd-button-secondary">DSR 계산기</Link>
            <Link href="/cal/loan-interest" className="bd-button-secondary">대출이자 계산기</Link>
            <Link href="/topics/cma-parking-cash" className="bd-button-secondary">CMA·파킹통장 묶음</Link>
            <Link href="/topics/retirement-tax-accounts" className="bd-button-secondary">IRP·연금 묶음</Link>
            <Link href="/cal/calculator" className="bd-button-primary">배당 계산기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
