"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type TaggedListItem = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  badge?: string;
  meta?: string;
  cta?: string;
};

type TaggedListProps = {
  title: string;
  description?: string;
  items: TaggedListItem[];
  filterTags: string[];
  searchPlaceholder?: string;
  countLabel?: string;
  showSearch?: boolean;
  compactItems?: boolean;
};

const ALL_TAG = "전체";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function uniqueTextList(values: Array<string | undefined | null>) {
  const seen = new Set<string>();
  return values.flatMap((value) => {
    const text = value?.trim();
    if (!text) return [];

    const key = normalize(text);
    if (seen.has(key)) return [];

    seen.add(key);
    return [text];
  });
}

export default function TaggedList({
  title,
  description,
  items,
  filterTags,
  searchPlaceholder = "제목, 설명, 태그로 검색해보세요",
  countLabel = "콘텐츠",
  showSearch = true,
  compactItems = false,
}: TaggedListProps) {
  const tags = useMemo(() => [ALL_TAG, ...uniqueTextList(filterTags)], [filterTags]);
  const normalizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        tags: uniqueTextList(item.tags),
      })),
    [items],
  );
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [keyword, setKeyword] = useState("");

  const filteredItems = useMemo(() => {
    const query = normalize(keyword);
    return normalizedItems.filter((item) => {
      const matchedTag = activeTag === ALL_TAG || item.tags.includes(activeTag) || item.badge === activeTag;
      if (!matchedTag) return false;
      if (!query) return true;

      const haystack = [item.title, item.description, item.badge, item.meta, ...item.tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeTag, normalizedItems, keyword]);

  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="bd-title-md">{title}</h2>
          {description ? <p className="bd-text-sub mt-2 max-w-3xl">{description}</p> : null}
        </div>
        <div className="text-[12px] text-slate-400 md:text-sm">
          {countLabel} {filteredItems.length.toLocaleString("ko-KR")}개 / 전체 {normalizedItems.length.toLocaleString("ko-KR")}개
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition md:px-3.5 md:py-2 md:text-sm ${
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

      {showSearch ? (
        <div className="mt-4">
          <input
            type="search"
            className="bd-input"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={`${title} 검색`}
          />
        </div>
      ) : null}

      {filteredItems.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-sm leading-6 text-slate-400">
          조건에 맞는 항목이 없습니다. 태그를 전체로 바꾸거나 검색어를 짧게 입력해보세요.
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-slate-800/80 rounded-2xl border border-slate-800/80 bg-slate-950/35">
          {filteredItems.map((item, index) => (
            <li key={`${item.href}-${item.title}-${index}`}>
              <Link href={item.href} className={`group block px-3 transition hover:bg-slate-900/80 md:px-5 ${compactItems ? "py-3 md:py-3.5" : "py-3 md:py-4"}`}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.badge ? <span className="bd-badge">{item.badge}</span> : null}
                      {item.meta ? <span className="text-xs font-medium text-slate-500">{item.meta}</span> : null}
                    </div>
                    <h3 className="mt-2 text-[15px] font-bold leading-6 text-white group-hover:text-cyan-200 md:text-lg md:leading-7">
                      {item.title}
                    </h3>
                    {!compactItems ? (
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-slate-400 md:text-[15px] md:leading-6">
                        {item.description}
                      </p>
                    ) : null}
                    <div className={`${compactItems ? "mt-2" : "mt-3"} flex flex-wrap gap-1.5`}>
                      {item.tags.slice(0, compactItems ? 2 : 4).map((tag, tagIndex) => (
                        <span key={`${item.href}-${tag}-${tagIndex}`} className="rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 text-[13px] font-semibold text-cyan-300 md:pt-9 md:text-sm">
                    {item.cta ?? "자세히 보기"} →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
