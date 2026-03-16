"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FinanceQuestionItem } from "@/lib/finance/types";

export default function FinanceQuestionList({
  questions,
  basePath,
}: {
  questions: FinanceQuestionItem[];
  basePath: string;
}) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return questions;
    return questions.filter((q) => q.question.toLowerCase().includes(normalized));
  }, [keyword, questions]);

  return (
    <section className="bd-section">
      <div className="bd-card bd-card-padding">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="bd-badge">질문 검색</span>
            <h2 className="bd-title-md mt-4">궁금한 질문을 바로 찾아보세요</h2>
            <p className="bd-text-sub mt-3">
              질문이 많아질수록 검색으로 빠르게 찾는 편이 편합니다. 키워드를 입력하면 제목에 포함된 질문만 남겨서 볼 수 있습니다.
            </p>
          </div>
          <div className="text-sm text-slate-400">총 {questions.length}개 질문</div>
        </div>

        <div className="mt-6">
          <input
            placeholder="예: 세금, ETF, 만기, 해지, 증권사"
            className="bd-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="bd-card bd-card-padding">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <h3 className="bd-title-md">질문 목록</h3>
          <span className="text-sm text-slate-400">검색 결과 {filtered.length}개</span>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-sm text-slate-400">
            검색 결과가 없습니다. 다른 키워드로 다시 찾아보세요.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {filtered.map((q, index) => (
              <li key={`${q.slug}-${index}`}>
                <Link
                  href={`${basePath}/${encodeURIComponent(q.slug)}`}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 transition hover:border-cyan-500/30 hover:bg-slate-900"
                >
                  <span className="mt-0.5 text-sm font-semibold text-cyan-300">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="text-base font-semibold leading-7 text-slate-100 transition group-hover:text-cyan-200">
                      {q.question}
                    </div>
                    {q.summary ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{q.summary}</p> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
