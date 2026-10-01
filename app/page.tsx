import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Landmark, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "BlueDino | 금융 계산기·금융가이드·투자정보",
  description: "CMA 이자, 자동차·신용카드 할부, 파킹통장, 배당금 계산기와 ISA·IRP·대출 가이드를 빠르게 확인하세요.",
  alternates: { canonical: "/" },
};

const popular = [
  ["자동차 할부 계산기", "/cal/car-installment", "월 납입액과 총이자 확인"],
  ["CMA 이자 계산기", "/cal/cma-interest", "하루·월·세후 이자 확인"],
  ["신용카드 할부 계산기", "/cal/credit-card-installment", "할부 수수료와 월 청구액 확인"],
  ["파킹통장 이자 계산기", "/cal/parking-account", "구간별 금리 적용 이자 확인"],
  ["배당금 계산기", "/cal/calculator", "예상 배당금과 현금흐름 확인"],
  ["청년도약계좌 계산기", "/cal/youth-leap-account", "예상 만기 금액 확인"],
] as const;

const financeLinks = [["ISA", "/finance/isa"], ["IRP", "/finance/irp"], ["연금저축", "/finance/pension"], ["CMA", "/finance/cma"], ["파킹통장", "/finance/parking"], ["대출", "/finance/loan-basics"]] as const;

export default function HomePage() {
  return (
    <main className="bd-page">
      <div className="bd-container space-y-12 md:space-y-16">
        <section className="py-6 md:py-12">
          <p className="text-sm font-bold text-cyan-300">BlueDino</p>
          <h1 className="mt-3 max-w-3xl text-[32px] font-bold leading-[1.2] tracking-[-0.04em] text-white md:text-[52px]">금융이 궁금할 때,<br className="hidden sm:block" /> 계산하고 확인하세요.</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-500 md:text-lg">복잡한 메뉴보다 필요한 행동부터 시작합니다. 내 숫자를 계산하거나, 금융 질문의 답을 찾거나, 투자 정보를 확인하세요.</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link href="/cal" className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-cyan-400/40 hover:shadow-sm">
              <Calculator className="h-5 w-5 text-cyan-300" /><div className="mt-4 font-bold text-white">계산하기</div><p className="mt-1 text-sm leading-6 text-slate-400">할부·이자·배당·대출을 내 숫자로 확인</p>
            </Link>
            <Link href="/finance" className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-cyan-400/40 hover:shadow-sm">
              <Landmark className="h-5 w-5 text-cyan-300" /><div className="mt-4 font-bold text-white">금융 질문 찾기</div><p className="mt-1 text-sm leading-6 text-slate-400">ISA·IRP·CMA·대출 궁금증 해결</p>
            </Link>
            <Link href="/info" className="group rounded-2xl border border-slate-800 bg-slate-950/40 p-5 transition hover:border-cyan-400/40 hover:shadow-sm">
              <TrendingUp className="h-5 w-5 text-cyan-300" /><div className="mt-4 font-bold text-white">투자정보 보기</div><p className="mt-1 text-sm leading-6 text-slate-400">기업·산업·ETF·투자기초 확인</p>
            </Link>
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4"><div><h2 className="bd-title-md">많이 찾는 계산기</h2><p className="bd-text-sub mt-2">네이버 검색 유입이 확인된 계산기를 먼저 배치했습니다.</p></div><Link href="/cal" className="hidden text-sm font-semibold text-cyan-300 hover:text-cyan-200 sm:inline-flex">전체보기 →</Link></div>
          <div className="mt-5 divide-y divide-slate-800 border-y border-slate-800 bg-slate-950/40">
            {popular.map(([title, href, desc]) => <Link key={href} href={href} className="group flex items-center justify-between gap-4 px-1 py-4 transition hover:bg-slate-900/70 md:px-2"><div><div className="font-semibold text-white group-hover:text-cyan-200">{title}</div><div className="mt-1 text-sm text-slate-400">{desc}</div></div><ArrowRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-cyan-300" /></Link>)}
          </div>
          <Link href="/cal" className="mt-4 inline-flex text-sm font-semibold text-cyan-300 sm:hidden">계산기 전체보기 →</Link>
        </section>

        <section>
          <h2 className="bd-title-md">궁금한 금융 질문이 있나요?</h2>
          <p className="bd-text-sub mt-2">계좌와 대출처럼 조건이 중요한 주제는 질문별로 바로 찾아보세요.</p>
          <div className="mt-5 flex flex-wrap gap-2">{financeLinks.map(([label, href]) => <Link key={href} href={href} className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">{label}</Link>)}</div>
          <Link href="/finance" className="mt-5 inline-flex text-sm font-semibold text-cyan-300">금융가이드 전체보기 →</Link>
        </section>

        <section className="border-t border-slate-800 pt-8">
          <h2 className="bd-title-md">투자 정보를 찾고 있나요?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Link href="/company-analysis" className="rounded-xl bg-slate-950/40 p-4 font-semibold text-slate-100 ring-1 ring-slate-800 hover:text-cyan-200">기업분석 <span className="float-right text-slate-500">→</span></Link>
            <Link href="/industry" className="rounded-xl bg-slate-950/40 p-4 font-semibold text-slate-100 ring-1 ring-slate-800 hover:text-cyan-200">산업·관련주 <span className="float-right text-slate-500">→</span></Link>
            <Link href="/etf/ranking" className="rounded-xl bg-slate-950/40 p-4 font-semibold text-slate-100 ring-1 ring-slate-800 hover:text-cyan-200">ETF <span className="float-right text-slate-500">→</span></Link>
          </div>
          <Link href="/info" className="mt-5 inline-flex text-sm font-semibold text-cyan-300">투자정보 전체보기 →</Link>
        </section>
      </div>
    </main>
  );
}
