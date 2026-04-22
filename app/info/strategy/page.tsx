import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "투자 전략 가이드 | BlueDino",
  description:
    "절세계좌, 자산배분, 배당, ETF 코어-새틀라이트, 하락장 대응, 은퇴 생활비까지 실전 판단이 필요한 주제를 한 번에 정리한 BlueDino 투자 전략 모음",
  alternates: { canonical: "/info/strategy" },
  openGraph: {
    title: "투자 전략 가이드 | BlueDino",
    description:
      "절세계좌, 자산배분, 배당, ETF 코어-새틀라이트, 하락장 대응, 은퇴 생활비까지 실전 판단이 필요한 주제를 한 번에 정리한 BlueDino 투자 전략 모음",
    url: "https://bluedino.kr/info/strategy",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "투자 전략 가이드 | BlueDino",
    description:
      "절세계좌, 자산배분, 배당, ETF 코어-새틀라이트, 하락장 대응, 은퇴 생활비까지 실전 판단이 필요한 주제를 한 번에 정리한 BlueDino 투자 전략 모음",
  },
};

const cards = [
  {
    title: "절세계좌 활용 투자전략 어떻게 짜야 할까",
    href: "/info/strategy/tax-efficient-investing",
    summary: "ISA, 연금저축, IRP를 어떤 역할로 나누면 좋은지부터 정리합니다.",
    tags: ["절세계좌", "ISA", "세후 수익"],
  },
  {
    title: "은퇴 후 생활비 전략 어떻게 준비해야 할까",
    href: "/info/strategy/retirement-income",
    summary: "총자산보다 월 생활비와 인출 구조를 먼저 보는 은퇴 전략입니다.",
    tags: ["은퇴", "생활비", "현금흐름"],
  },
  {
    title: "자산배분 전략 꼭 해야 할까",
    href: "/info/strategy/asset-allocation",
    summary: "종목 선택보다 먼저 자산 비중을 정해야 하는 이유를 설명합니다.",
    tags: ["자산배분", "분산투자", "리스크"],
  },
  {
    title: "하락장 대응 전략 어떻게 세워야 할까",
    href: "/info/strategy/market-downturn",
    summary: "급락장에서 감정에 휘둘리지 않기 위한 기준을 정리합니다.",
    tags: ["하락장", "추가매수", "멘탈관리"],
  },
  {
    title: "배당 투자 전략 어떻게 세워야 할까",
    href: "/info/strategy/dividend",
    summary: "배당률이 아니라 지속 가능성과 목적까지 함께 보는 배당 전략입니다.",
    tags: ["배당", "현금흐름", "재투자"],
  },
  {
    title: "ETF 코어-새틀라이트 전략 어떻게 활용할까",
    href: "/info/strategy/etf-core-satellite",
    summary: "핵심 자산과 공격 자산을 나눠 ETF 포트폴리오를 짜는 방법입니다.",
    tags: ["ETF", "코어", "새틀라이트"],
  },
];

export default function StrategyHubPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자 전략</span>
          <h1 className="mt-4 bd-title-xl">투자 전략, 내 상황에 맞게 정리해보세요</h1>
          <p className="mt-4 max-w-4xl bd-text-main">
            투자 전략은 대단한 비법보다도 내 자금의 목적과 기간, 감당할 수 있는 변동성을 먼저 정리하는 데서 시작됩니다.
            BlueDino의 투자 전략 메뉴는 절세계좌, 배당, ETF, 하락장 대응 같은 주제를 한 번에 이해하기 쉽게 묶어두었습니다.
          </p>

          <div className="mt-6 bd-grid-3">
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">먼저 생각할 것</p>
              <p className="mt-2 text-2xl font-black text-white">목적과 기간</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                이 돈을 언제 쓸지 먼저 정하면 계좌 선택과 자산배분도 훨씬 쉬워집니다.
              </p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">같이 보면 좋은 메뉴</p>
              <p className="mt-2 text-2xl font-black text-white">투자 기초 가이드</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                기초 개념을 먼저 잡고 전략을 읽으면 훨씬 덜 헷갈립니다.
              </p>
            </div>
            <div className="bd-card-soft p-5">
              <p className="text-sm font-semibold text-cyan-300">직접 확인</p>
              <p className="mt-2 text-2xl font-black text-white">계산기로 점검</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                이해한 전략을 내 금액과 기간에 넣어보면 판단이 훨씬 또렷해집니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이런 순서로 읽으면 더 쉽습니다</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">내 자금이 단기용인지 장기용인지부터 정리하기</div>
            <div className="bd-list-item">절세계좌와 일반계좌의 역할 구분하기</div>
            <div className="bd-list-item">배당, ETF, 자산배분 전략을 목적에 맞게 연결하기</div>
          </div>
        </section>

        <AdBlock label="투자전략 중간 광고 영역" format="horizontal" />

        <section className="bd-grid-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bd-card bd-card-padding transition hover:-translate-y-1 hover:border-slate-700"
            >
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="bd-badge">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 text-xl font-bold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{card.summary}</p>
              <div className="mt-6 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
                자세히 보기 →
              </div>
            </Link>
          ))}
        </section>

        <section className="bd-grid-3">
          <QuickLink
            href="/info/guide"
            label="투자 기초 가이드"
            description="전략이 어렵게 느껴진다면 먼저 기초 개념부터 정리해보세요."
          />
          <QuickLink
            href="/finance"
            label="금융 가이드"
            description="절세계좌와 대출 판단처럼 실생활에 가까운 질문형 콘텐츠를 볼 수 있습니다."
          />
          <QuickLink
            href="/cal/calculator"
            label="배당 계산기"
            description="배당 전략은 숫자로 직접 넣어볼 때 체감이 훨씬 쉬워집니다."
          />
        </section>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link href={href} className="bd-card bd-card-padding transition hover:border-slate-700">
      <p className="text-sm font-semibold text-cyan-300">바로가기</p>
      <h3 className="mt-3 text-lg font-bold text-white">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
    </Link>
  );
}
