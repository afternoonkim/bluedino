"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CompanyAnalysisMarket } from "@/lib/company-analysis/types";

type CompanyAnalysisCardItem = {
  market: CompanyAnalysisMarket;
  slug: string;
  ticker: string;
  exchange: string;
  companyNameKo: string;
  companyNameEn: string;
  sector: string;
  badge: string;
  summary: string;
  keywords: string[];
};

type CompanyAnalysisSearchListProps = {
  articles: CompanyAnalysisCardItem[];
  marketTitle: string;
  marketShortTitle: string;
};

const FILTER_TAGS = ["전체", "반도체", "AI", "2차전지", "금융", "자동차", "바이오", "배당", "소비재", "산업재"];

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

function getArticleTags(article: CompanyAnalysisCardItem) {
  const text = `${article.sector} ${article.badge} ${article.keywords.join(" ")}`;
  const tags = new Set<string>();
  if (/반도체|HBM|AI 메모리|파운드리|장비/.test(text)) tags.add("반도체");
  if (/AI|클라우드|데이터센터|소프트웨어|플랫폼/.test(text)) tags.add("AI");
  if (/2차전지|배터리|전기차|양극재|소재/.test(text)) tags.add("2차전지");
  if (/은행|금융|보험|증권|카드/.test(text)) tags.add("금융");
  if (/자동차|모빌리티|전장/.test(text)) tags.add("자동차");
  if (/바이오|헬스케어|제약|의약품/.test(text)) tags.add("바이오");
  if (/배당|통신|리츠|유틸리티|지주/.test(text)) tags.add("배당");
  if (/소비재|식음료|유통|화장품|게임|콘텐츠/.test(text)) tags.add("소비재");
  if (/산업재|건설|기계|항공|우주|철강|화학|방산/.test(text)) tags.add("산업재");
  if (tags.size === 0) tags.add(article.badge);
  return uniqueTextList(Array.from(tags));
}

export default function CompanyAnalysisSearchList({
  articles,
  marketTitle,
  marketShortTitle,
}: CompanyAnalysisSearchListProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("전체");
  const trimmedQuery = query.trim().toLowerCase();

  const articlesWithTags = useMemo(
    () => articles.map((article) => ({ ...article, tags: getArticleTags(article) })),
    [articles],
  );

  const availableTags = useMemo(
    () => FILTER_TAGS.filter((tag) => tag === "전체" || articlesWithTags.some((article) => article.tags.includes(tag))),
    [articlesWithTags],
  );

  const filteredArticles = useMemo(() => {
    return articlesWithTags.filter((article) => {
      const matchedTag = activeTag === "전체" || article.tags.includes(activeTag);
      if (!matchedTag) return false;
      if (!trimmedQuery) return true;

      const haystack = [
        article.companyNameKo,
        article.companyNameEn,
        article.ticker,
        article.exchange,
        article.sector,
        article.badge,
        ...article.keywords,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmedQuery);
    });
  }, [activeTag, articlesWithTags, trimmedQuery]);

  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="bd-title-md">{marketTitle} 목록</h2>
          <p className="bd-text-sub mt-2">
            기업명, 티커, 업종 키워드와 태그로 원하는 {marketShortTitle} 분석글을 빠르게 찾아볼 수 있습니다.
          </p>
        </div>
        <div className="text-sm text-slate-400">
          검색 결과 {filteredArticles.length.toLocaleString("ko-KR")}개 / 전체 {articles.length.toLocaleString("ko-KR")}개
        </div>
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
        <label htmlFor="company-analysis-search" className="sr-only">기업분석 검색</label>
        <input
          id="company-analysis-search"
          className="bd-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="예: 삼성전자, NVDA, 반도체, 금융"
          type="search"
        />
      </div>

      {filteredArticles.length > 0 ? (
        <ul className="mt-5 divide-y divide-slate-800/80 rounded-2xl border border-slate-800/80 bg-slate-950/35">
          {filteredArticles.map((article, index) => (
            <li key={`${article.market}-${article.slug}-${index}`}>
              <Link href={`/company-analysis/${article.market}/${article.slug}`} className="group block px-4 py-4 transition hover:bg-slate-900/80 md:px-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bd-badge">{marketShortTitle}</span>
                      <span className="text-xs font-medium text-slate-500">{article.exchange} · {article.sector}</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold leading-7 text-white group-hover:text-cyan-200 md:text-lg">
                      {article.companyNameKo}({article.ticker})
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400 md:text-[15px]">{article.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span key={`${article.slug}-${tag}-${tagIndex}`} className="rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-cyan-300 md:pt-9">분석글 보기 →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-center">
          <h3 className="bd-title-md">검색 결과가 없습니다</h3>
          <p className="bd-text-main mt-3">
            기업명, 티커, 업종 키워드를 조금 더 짧게 입력해보세요. 예를 들어 “반도체”, “금융”, “AI”, “전기차”처럼 검색하면 관련 기업을 찾기 쉽습니다.
          </p>
          <button type="button" onClick={() => setQuery("")} className="bd-button-secondary mt-5">
            검색어 지우기
          </button>
        </div>
      )}
    </section>
  );
}
