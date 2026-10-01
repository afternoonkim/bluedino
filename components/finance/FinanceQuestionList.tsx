"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FinanceQuestionItem } from "@/lib/finance/types";

const FILTER_TAGS = ["전체", "세금", "ETF", "만기", "해지", "한도", "대출", "비교"];

function uniqueTextList(values: string[]) {
  const seen = new Set<string>();
  return values.flatMap((value) => {
    const text = value.trim();
    if (!text) return [];

    const key = text.toLowerCase();
    if (seen.has(key)) return [];

    seen.add(key);
    return [text];
  });
}

function questionTags(question: FinanceQuestionItem) {
  const text = `${question.question} ${question.summary ?? ""}`;
  const tags = new Set<string>();
  if (/세금|과세|비과세|분리과세|세액공제|소득공제|절세/.test(text)) tags.add("세금");
  if (/ETF|펀드|주식|배당|투자/.test(text)) tags.add("ETF");
  if (/만기|연장|이체|전환/.test(text)) tags.add("만기");
  if (/해지|중도|인출/.test(text)) tags.add("해지");
  if (/한도|납입|금액|소득/.test(text)) tags.add("한도");
  if (/대출|금리|상환|DSR|LTV|주담대|신용/.test(text)) tags.add("대출");
  if (/비교|차이|유리|CMA|파킹/.test(text)) tags.add("비교");
  return uniqueTextList(Array.from(tags));
}

export default function FinanceQuestionList({
  questions,
  basePath,
}: {
  questions: FinanceQuestionItem[];
  basePath: string;
}) {
  const [keyword, setKeyword] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  const questionsWithTags = useMemo(
    () => questions.map((question) => ({ ...question, tags: questionTags(question) })),
    [questions],
  );

  const availableTags = useMemo(
    () => FILTER_TAGS.filter((tag) => tag === "전체" || questionsWithTags.some((q) => q.tags.includes(tag))),
    [questionsWithTags],
  );

  const filtered = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    return questionsWithTags.filter((q) => {
      const matchedTag = activeTag === "전체" || q.tags.includes(activeTag);
      if (!matchedTag) return false;
      if (!normalized) return true;
      return [q.question, q.summary, ...q.tags].filter(Boolean).join(" ").toLowerCase().includes(normalized);
    });
  }, [activeTag, keyword, questionsWithTags]);

  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="bd-title-md">질문 목록</h2>
          <p className="bd-text-sub mt-2">
            질문이 많아도 태그와 검색으로 필요한 내용만 좁혀볼 수 있습니다.
          </p>
        </div>
        <div className="text-sm text-slate-400">검색 결과 {filtered.length}개 / 전체 {questions.length}개</div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {availableTags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                active
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-600 hover:text-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <input
          placeholder="예: 세금, ETF, 만기, 해지, 증권사"
          className="bd-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="search"
          aria-label="금융 질문 검색"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-sm text-slate-400">
          검색 결과가 없습니다. 태그를 전체로 바꾸거나 다른 키워드로 다시 찾아보세요.
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-slate-800/80 rounded-2xl border border-slate-800/80 bg-slate-950/35">
          {filtered.map((q, index) => (
            <li key={`${q.slug}-${index}`}>
              <Link
                href={`${basePath}/${encodeURIComponent(q.slug)}`}
                className="group block px-4 py-3 transition hover:bg-slate-900/80 md:px-5 md:py-3.5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 min-w-7 text-sm font-bold text-cyan-300">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-semibold leading-7 text-slate-100 transition group-hover:text-cyan-200 md:text-base">
                      {q.question}
                    </div>
                    {q.tags.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {q.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={`${q.slug}-${tag}-${tagIndex}`} className="rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <span className="hidden text-sm font-semibold text-cyan-300 md:block">읽기 →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
