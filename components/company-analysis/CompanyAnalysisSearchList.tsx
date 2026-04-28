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

export default function CompanyAnalysisSearchList({
  articles,
  marketTitle,
  marketShortTitle,
}: CompanyAnalysisSearchListProps) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim().toLowerCase();

  const filteredArticles = useMemo<CompanyAnalysisCardItem[]>(() => {
    if (!trimmedQuery) return articles;

    return articles.filter((article) => {
      const haystack = [
        article.companyNameKo,
        article.companyNameEn,
        article.ticker,
        article.exchange,
        article.sector,
        article.badge,
        ...article.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmedQuery);
    });
  }, [articles, trimmedQuery]);

  return (
    <section className="space-y-6">
      <div className="bd-card-soft bd-card-padding">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="bd-title-md">{marketTitle} 검색</h2>
            <p className="bd-text-sub mt-2">
              기업명, 영문명, 티커, 업종 키워드로 원하는 {marketShortTitle} 분석글을 빠르게 찾아볼 수 있습니다.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <label htmlFor="company-analysis-search" className="mb-2 block text-sm font-semibold text-slate-300">
              기업분석 검색
            </label>
            <input
              id="company-analysis-search"
              className="bd-input"
              value={query}
              onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
              placeholder="예: 삼성전자, NVDA, 반도체, 금융"
              type="search"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
          <span className="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1">
            전체 {articles.length.toLocaleString("ko-KR")}개
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1">
            검색 결과 {filteredArticles.length.toLocaleString("ko-KR")}개
          </span>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="bd-grid-3">
          {filteredArticles.map((article: CompanyAnalysisCardItem) => (
            <Link key={article.slug} href={`/company-analysis/${article.market}/${article.slug}`}>
              <article className="h-full bd-card bd-card-padding transition hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bd-badge">{marketShortTitle}</span>
                  <span className="bd-badge">{article.badge}</span>
                </div>
                <h3 className="bd-title-md mt-4">
                  {article.companyNameKo}({article.ticker})
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {article.exchange} · {article.sector}
                </p>
                <p className="bd-text-main mt-4">{article.summary}</p>
                <div className="mt-5 text-sm font-semibold text-cyan-300">분석글 보기 →</div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bd-card bd-card-padding text-center">
          <h3 className="bd-title-md">검색 결과가 없습니다</h3>
          <p className="bd-text-main mt-4">
            기업명, 티커, 업종 키워드를 조금 더 짧게 입력해보세요. 예를 들어 “반도체”, “금융”, “AI”, “전기차”처럼 검색하면 관련 기업을 찾기 쉽습니다.
          </p>
          <button type="button" onClick={() => setQuery("")} className="bd-button-secondary mt-6">
            검색어 지우기
          </button>
        </div>
      )}
    </section>
  );
}
