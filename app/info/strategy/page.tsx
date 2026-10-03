import type { Metadata } from "next";
import Link from "next/link";
import AdFitAd from "@/components/ad/AdFitAd";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { strategyArticles } from "@/lib/info/strategyArticles";

export const metadata: Metadata = {
  title: "투자전략 가이드 | 상황별·연령별 맞춤 투자전략 | BlueDino",
  description:
    "1인 가구, 신혼부부, 출산가정, 자녀 키우는 가정, 고소득자, 프리랜서, 대출 병행 투자, 은퇴 전후까지 상황별 투자전략을 태그와 목록으로 쉽게 찾을 수 있는 BlueDino 투자전략 모음",
  keywords: [
    "투자전략",
    "상황별 투자전략",
    "1인 가구 투자전략",
    "신혼부부 투자전략",
    "프리랜서 투자전략",
    "은퇴 투자전략",
    "대출 병행 투자",
    "연령별 투자전략",
  ],
  alternates: { canonical: "/info/strategy" },
  openGraph: {
    title: "투자전략 가이드 | 상황별·연령별 맞춤 투자전략 | BlueDino",
    description:
      "내 상황에 맞는 투자전략과 절세계좌·자산배분·배당·ETF·하락장 대응 같은 핵심 전략을 한 번에 비교할 수 있습니다.",
    url: "https://bluedino.kr/info/strategy",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
};

const recommendedSteps = [
  { title: "내 상황 고르기", description: "연령, 자녀 유무, 은퇴 준비 여부처럼 지금 가장 가까운 상황부터 선택합니다." },
  { title: "자금 목적 나누기", description: "생활비, 비상금, 장기투자금, 자녀 교육자금처럼 돈의 사용 시점을 분리합니다." },
  { title: "계좌와 자산 연결하기", description: "절세계좌, ETF, 배당, 현금성 자산을 내 목적에 맞게 배치합니다." },
];

function strategyGroup(slug: string, badge: string) {
  if (/single|couple|parent|family|income|freelancer|debt|retirement|housing|age/.test(slug)) return "상황별";
  if (/tax|asset|etf|dividend|downturn|income/.test(slug) || badge.includes("전략")) return "핵심전략";
  return "투자전략";
}

export default function StrategyHubPage() {
  const strategyItems: TaggedListItem[] = Object.values(strategyArticles).map((article) => {
    const group = strategyGroup(article.slug, article.badge);
    return {
      title: article.title,
      href: `/info/strategy/${article.slug}`,
      description: article.description,
      badge: group,
      meta: article.badge,
      tags: [group, article.badge, ...(article.suitableFor ?? []).slice(0, 2)],
      cta: "전략 읽기",
    };
  });

  const filterTags = ["상황별", "핵심전략", "절세계좌 전략", "자산배분", "배당 전략", "은퇴", "대출"];

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자전략 가이드</span>
          <h1 className="bd-title-xl mt-4">내 상황에 맞는 투자전략을 목록에서 골라보세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            투자전략은 남들이 좋다고 하는 상품을 따라가는 일이 아니라, 내 돈을 언제 쓰고 어떤 위험까지 감당할 수 있는지부터 정리하는 일입니다. 지금 내 상황과 필요한 핵심 전략부터 골라 비교해보세요.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이렇게 보세요</h2>
          <div className="bd-list mt-4">
            {recommendedSteps.map((item, index) => (
              <div key={item.title} className="bd-list-item">
                <strong className="text-cyan-200">{index + 1}단계. {item.title}</strong>
                <span className="mt-1 block text-slate-300">{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        <TaggedList
          title="투자전략 목록"
          description="상황별 태그를 먼저 고르고, 세금·배당·은퇴·대출 같은 키워드로 다시 좁혀보세요."
          items={strategyItems}
          filterTags={filterTags}
          searchPlaceholder="예: 1인 가구, 신혼부부, 은퇴, 절세계좌, 배당, 대출"
          countLabel="전략"
          compactItems
        />

        <AdFitAd variant="middle" label="본문 중간 스폰서 배너" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">전략이 어렵다면 기초부터 연결해보세요</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드</Link>
            <Link href="/finance" className="bd-button-secondary">금융 가이드</Link>
            <Link href="/cal/calculator" className="bd-button-primary">배당 계산기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
