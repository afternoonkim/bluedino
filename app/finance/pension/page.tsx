
import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import FinanceQuestionList from "@/components/finance/FinanceQuestionList";
import { pensionQuestions } from "@/data/finance/pension";

export const metadata: Metadata = {
  title: "연금저축 질문 가이드 | BlueDino",
  description: "연금저축계좌 세액공제, ETF 투자, 수령 전략과 중도해지 기준을 이해하기 쉽게 정리한 BlueDino 금융 가이드",
  alternates: { canonical: "/finance/pension" },
};

export default function PensionPage() {
  const featured = pensionQuestions.slice(0, 6);
  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">연금계좌</span>
          <h1 className="bd-title-xl mt-4">연금저축 질문 가이드</h1>
          <p className="bd-text-main mt-4">
            연금저축은 세액공제만 보고 시작하면 오래 유지하기 어렵고, 반대로 장기 복리와 연금 수령까지 함께 보면 활용 가치가 커집니다. BlueDino는 연금저축계좌의 가입, 납입, 투자, 인출, 수령 전략을 이해하기 쉽게 정리합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">질문 {pensionQuestions.length}개</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">핵심 질문 정리</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">계산기 연계</span>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">먼저 많이 보는 질문</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {featured.map((item) => (
              <Link key={item.slug} href={`/finance/pension/${encodeURIComponent(item.slug)}`} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900">
                {item.question}
              </Link>
            ))}
          </div>
        </section>

        <AdBlock slotKey="inline" label="연금저축 질문 목록 중간 광고 영역" />

        <FinanceQuestionList questions={pensionQuestions} basePath="/finance/pension" />
      </div>
    </div>
  );
}
