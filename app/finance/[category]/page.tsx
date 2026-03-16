import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import FinanceQuestionList from "@/components/finance/FinanceQuestionList";
import { financeCategories, getFinanceCategory } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";
import type { FinanceCategoryKey } from "@/lib/finance/types";

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return financeCategories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = getFinanceCategory(decodeURIComponent(rawCategory));
  if (!category) {
    return { title: "금융 가이드 | BlueDino" };
  }
  return {
    title: `${category.shortTitle} 질문 가이드 | BlueDino`,
    description: category.description,
    alternates: { canonical: category.basePath },
  };
}

export default async function FinanceCategoryPage({ params }: PageProps) {
  const { category: rawCategory } = await params;
  const categoryKey = decodeURIComponent(rawCategory);
  const category = getFinanceCategory(categoryKey);

  if (!category) notFound();

  if (category.status !== "live") {
    return (
      <div className="bd-page">
        <div className="bd-container-narrow bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">준비 중</span>
            <h1 className="bd-title-lg mt-4">{category.title}</h1>
            <p className="bd-text-main mt-4">{category.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/finance" className="bd-button-primary">금융 가이드 메인으로</Link>
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드 보기</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const questions = getQuestionsByCategory(category.key as FinanceCategoryKey);
  const featured = questions.slice(0, 6);

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">{category.badge}</span>
          <h1 className="bd-title-xl mt-4">{category.title}</h1>
          <p className="bd-text-main mt-4">{category.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">질문 {questions.length}개</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">실제 검색 질문 중심</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">계산기 연계</span>
          </div>
        </section>

        {featured.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">먼저 많이 보는 질문</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {featured.map((item) => (
                <Link
                  key={item.slug}
                  href={`${category.basePath}/${encodeURIComponent(item.slug)}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900"
                >
                  {item.question}
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdBlock slotKey="inline" label={`${category.shortTitle} 질문 목록 중간 광고 영역`} />

        <FinanceQuestionList questions={questions} basePath={category.basePath} />
      </div>
    </div>
  );
}
