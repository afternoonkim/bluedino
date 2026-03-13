"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import { ExternalLink, FileText, RefreshCcw, Search, Sparkles } from "lucide-react";

type BlogItem = {
  title: string;
  link: string;
  description: string;
  thumbnail: string | null;
  parentCategory: string;
  childCategory: string;
  pubDate: string;
  isoDate: string;
};

type ApiResponse = {
  ok: boolean;
  items: BlogItem[];
  parentCategories?: string[];
  childCategoriesByParent?: Record<string, string[]>;
  message?: string;
  fetchedAt?: string;
  totalParsed?: number;
  returnedCount?: number;
};

const gradientByIndex = [
  "from-cyan-500/20 via-slate-900 to-slate-950",
  "from-blue-500/20 via-slate-900 to-slate-950",
  "from-emerald-500/20 via-slate-900 to-slate-950",
  "from-fuchsia-500/20 via-slate-900 to-slate-950",
  "from-amber-500/20 via-slate-900 to-slate-950",
  "from-violet-500/20 via-slate-900 to-slate-950",
];

function fallbackThumb(index: number) {
  return gradientByIndex[index % gradientByIndex.length];
}

function formatFetchedAt(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function BlogFeedClient() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [parentCategories, setParentCategories] = useState<string[]>(["전체"]);
  const [childCategoriesByParent, setChildCategoriesByParent] = useState<
    Record<string, string[]>
  >({});
  const [activeParentCategory, setActiveParentCategory] = useState("전체");
  const [activeChildCategory, setActiveChildCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchedAt, setFetchedAt] = useState("");
  const [brokenThumbs, setBrokenThumbs] = useState<Record<string, boolean>>({});
  const [totalParsed, setTotalParsed] = useState(0);
  const [returnedCount, setReturnedCount] = useState(0);

  async function loadFeed() {
    setLoading(true);
    setError("");
    setBrokenThumbs({});

    try {
      const response = await fetch("/api/naver-blog", { cache: "no-store" });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "피드를 불러오지 못했습니다.");
      }

      setItems(data.items ?? []);
      setParentCategories(data.parentCategories?.length ? data.parentCategories : ["전체"]);
      setChildCategoriesByParent(data.childCategoriesByParent ?? {});
      setFetchedAt(formatFetchedAt(data.fetchedAt));
      setTotalParsed(data.totalParsed ?? data.items?.length ?? 0);
      setReturnedCount(data.returnedCount ?? data.items?.length ?? 0);
      setActiveParentCategory("전체");
      setActiveChildCategory("전체");
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeed();
  }, []);

  const currentChildCategories = useMemo(() => {
    if (activeParentCategory === "전체") return ["전체"];
    return childCategoriesByParent[activeParentCategory] ?? ["전체"];
  }, [activeParentCategory, childCategoriesByParent]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchedParent =
        activeParentCategory === "전체"
          ? true
          : item.parentCategory === activeParentCategory;

      const matchedChild =
        activeChildCategory === "전체"
          ? true
          : item.childCategory === activeChildCategory;

      const source = `${item.title} ${item.description}`.toLowerCase();
      const matchedQuery = query.trim()
        ? source.includes(query.trim().toLowerCase())
        : true;

      return matchedParent && matchedChild && matchedQuery;
    });
  }, [items, activeParentCategory, activeChildCategory, query]);

  const summary = useMemo(() => {
    const latest = items[0]?.pubDate ?? "-";
    const withThumb = items.filter((item) => {
      if (!item.thumbnail) return false;
      return !brokenThumbs[item.link];
    }).length;

    return {
      total: items.length,
      latest,
      withThumb,
    };
  }, [items, brokenThumbs]);

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding overflow-hidden">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="bd-badge">투자정보</span>
              <h1 className="bd-title-xl mt-4">블로그 최신글</h1>
              <p className="bd-text-main mt-4 max-w-3xl">
                자기남블로그 최신 게시글을 블로그 카테고리 구조에 맞춰
                조회할 수 있도록 구성한 페이지입니다.
              </p>
              <p className="bd-text-sub mt-3">
                최신 수집 시각 {fetchedAt || "-"} · RSS 기반 업데이트
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">노출 게시글 수</div>
                <div className="mt-1 text-xl font-bold text-white">{summary.total}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">RSS 파싱 수</div>
                <div className="mt-1 text-xl font-bold text-white">{totalParsed}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">정상 썸네일 수</div>
                <div className="mt-1 text-xl font-bold text-white">{summary.withThumb}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">가장 최근 발행일</div>
                <div className="mt-1 text-xl font-bold text-white">{summary.latest}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="제목이나 내용으로 검색"
                className="bd-input pl-11"
              />
            </div>

            <button
              type="button"
              onClick={loadFeed}
              className="bd-button-secondary gap-2"
            >
              <RefreshCcw size={16} />
              새로고침
            </button>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-slate-300">상위 카테고리</div>
            <div className="flex flex-wrap gap-2">
              {parentCategories.map((category, index) => {
                const active = activeParentCategory === category;

                return (
                  <button
                    key={`${category}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveParentCategory(category);
                      setActiveChildCategory("전체");
                    }}
                    className={
                      active
                        ? "rounded-full border border-blue-400/40 bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                        : "rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-500/40 hover:text-white"
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {activeParentCategory !== "전체" ? (
            <div>
              <div className="mb-3 text-sm font-semibold text-slate-300">하위 카테고리</div>
              <div className="flex flex-wrap gap-2">
                {currentChildCategories.map((category, index) => {
                  const active = activeChildCategory === category;

                  return (
                    <button
                      key={`${activeParentCategory}-${category}-${index}`}
                      type="button"
                      onClick={() => setActiveChildCategory(category)}
                      className={
                        active
                          ? "rounded-full border border-cyan-400/40 bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
                          : "rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-500/40 hover:text-white"
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="text-xs text-slate-400">
            현재 반환된 글 {returnedCount}개
          </div>
        </section>

        <AdBlock />

        {loading ? (
          <section className="bd-grid-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bd-card overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-800" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 rounded bg-slate-800" />
                  <div className="h-6 w-4/5 rounded bg-slate-800" />
                  <div className="h-4 w-full rounded bg-slate-800" />
                  <div className="h-4 w-5/6 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </section>
        ) : error ? (
          <section className="bd-card bd-card-padding">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 text-cyan-300" size={18} />
              <div>
                <h2 className="bd-title-md">피드를 불러오지 못했습니다</h2>
                <p className="bd-text-main mt-3">{error}</p>
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
                  <div>확인할 항목</div>
                  <div className="mt-2">1. .env.local에 NAVER_BLOG_RSS_URL 설정</div>
                  <div>2. RSS 주소가 https://rss.blog.naver.com/블로그아이디.xml 형태인지 확인</div>
                  <div>3. 서버 재시작 후 다시 접속</div>
                </div>
              </div>
            </div>
          </section>
        ) : filteredItems.length === 0 ? (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">검색 결과가 없습니다</h2>
            <p className="bd-text-main mt-3">
              카테고리나 검색어를 다시 확인해보세요.
            </p>
          </section>
        ) : (
          <section className="bd-grid-3">
            {filteredItems.map((item, index) => {
              const showImage = Boolean(item.thumbnail) && !brokenThumbs[item.link];

              return (
                <article
                  key={`${item.link}-${index}`}
                  className="bd-card overflow-hidden border-slate-800/90 transition hover:-translate-y-1 hover:border-cyan-500/30"
                >
                  <div className="relative h-52 overflow-hidden border-b border-slate-800">
                    {showImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnail as string}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenThumbs((prev) => ({
                            ...prev,
                            [item.link]: true,
                          }))
                        }
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-end bg-gradient-to-br ${fallbackThumb(
                          index
                        )} p-6`}
                      >
                        <div>
                          <span className="bd-badge">{item.parentCategory}</span>
                          <div className="mt-4 text-2xl font-bold text-white">BlueDino</div>
                          <div className="mt-2 text-sm text-slate-300">{item.childCategory}</div>
                        </div>
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full border border-green-500/40 bg-green-500/85 px-3 py-1 text-xs font-bold text-white">
                      NAVER BLOG
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bd-badge">{item.parentCategory}</span>
                      <span className="rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-slate-300">
                        {item.childCategory}
                      </span>
                      <span className="ml-auto text-xs text-slate-500">{item.pubDate}</span>
                    </div>

                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 text-white">
                      {item.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">
                      {item.description || "요약 정보가 없는 게시글입니다."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <FileText size={16} />
                        원문 보기 가능
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                      >
                        원문 보기
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <section className="bd-grid-2">
          {/* <div className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">이 페이지 활용법</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">블로그에서 최근 어떤 카테고리 글을 많이 쓰는지 빠르게 확인</div>
              <div className="bd-list-item">상위 카테고리와 하위 카테고리 기준으로 실제 블로그 탐색 흐름 구현</div>
              <div className="bd-list-item">카드에서 원문으로 넘어가 네이버블로그 체류시간 유도</div>
            </div>
          </div> */}

          <div className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">함께 보면 좋은 페이지</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/info/guide" className="bd-button-secondary">
                투자 기초 가이드
              </Link>
              <Link href="/info/strategy" className="bd-button-secondary">
                투자전략
              </Link>
              <Link href="/info/investment/account-tax" className="bd-button-secondary">
                계좌별 세금정보
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}