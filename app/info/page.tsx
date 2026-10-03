import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "투자정보 | 기업분석·산업·ETF·투자기초 | BlueDino",
  description: "기업분석, 산업·관련주, ETF, 투자 기초와 투자전략을 목적별로 확인할 수 있습니다.",
  alternates: { canonical: "/info" },
};

const sections = [
  ["산업·관련주", "/industry", "반도체·AI·2차전지·전력 인프라 등 산업 구조와 관련 기업을 봅니다."],
  ["기업분석", "/company-analysis", "국내외 기업의 사업 구조, 성장 포인트와 리스크를 확인합니다."],
  ["ETF", "/etf/ranking", "ETF 비교에 필요한 순위와 기본 지표를 확인합니다."],
  ["투자 기초", "/info/guide", "주식·ETF·배당·복리·포트폴리오의 기본 개념을 정리합니다."],
  ["투자전략", "/info/strategy", "상황과 목표에 따라 달라지는 투자 판단 기준을 확인합니다."],
] as const;

export default function InfoHubPage() {
  return (
    <main className="bd-page">
      <div className="bd-container space-y-10 md:space-y-14">
        <header className="max-w-3xl py-4 md:py-8"><span className="bd-badge">투자정보</span><h1 className="bd-title-xl mt-4">기업·산업·ETF 정보를 필요한 만큼만 보세요</h1><p className="bd-text-main mt-4">관심 있는 기업이나 산업, ETF 정보를 바로 확인하고 필요한 경우 투자 기초와 전략도 함께 살펴보세요.</p></header>
        <section className="divide-y divide-slate-800 border-y border-slate-800 bg-slate-950/40">
          {sections.map(([title, href, desc]) => <Link key={href} href={href} className="group flex items-start justify-between gap-4 px-1 py-5 transition hover:bg-slate-900/70 md:px-2"><div><h2 className="text-[16px] font-bold text-white group-hover:text-cyan-200 md:text-lg">{title}</h2><p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-400">{desc}</p></div><span className="mt-1 text-lg text-slate-500 group-hover:text-cyan-300">→</span></Link>)}
        </section>
      </div>
    </main>
  );
}
