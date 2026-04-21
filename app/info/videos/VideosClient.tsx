"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCcw, Search, Youtube } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedAtLabel: string;
  channelId: string;
  channelLabel: string;
  thumbnail: string | null;
  url: string;
  duration: string;
  viewCount: number;
  viewCountLabel: string;
  badgeClassName: string;
};

type ChannelItem = {
  id: string;
  label: string;
  badgeClassName: string;
};

type ApiResponse = {
  ok: boolean;
  items: VideoItem[];
  channels?: ChannelItem[];
  fetchedAt?: string;
  channelFetchCount?: number;
  totalItems?: number;
  message?: string;
};

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

const fallbackGradients = [
  "from-red-500/20 via-slate-900 to-slate-950",
  "from-cyan-500/20 via-slate-900 to-slate-950",
  "from-emerald-500/20 via-slate-900 to-slate-950",
  "from-violet-500/20 via-slate-900 to-slate-950",
  "from-amber-500/20 via-slate-900 to-slate-950",
];

export default function VideosClient() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [channels, setChannels] = useState<ChannelItem[]>([
    {
      id: "all",
      label: "전체",
      badgeClassName: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    },
  ]);
  const [activeChannel, setActiveChannel] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fetchedAt, setFetchedAt] = useState("");
  const [brokenThumbs, setBrokenThumbs] = useState<Record<string, boolean>>({});

  async function loadVideos() {
    setLoading(true);
    setError("");
    setBrokenThumbs({});

    try {
      const response = await fetch("/api/youtube-videos", { cache: "no-store" });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "영상을 불러오지 못했습니다.");
      }

      setItems(data.items ?? []);
      setChannels(
        data.channels?.length
          ? data.channels
          : [
              {
                id: "all",
                label: "전체",
                badgeClassName: "bg-blue-500/15 text-blue-300 border-blue-500/30",
              },
            ]
      );
      setFetchedAt(formatFetchedAt(data.fetchedAt));
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const channelMatched = activeChannel === "all" || item.channelId === activeChannel;
      const queryMatched =
        !normalizedQuery ||
        `${item.title} ${item.description} ${item.channelLabel}`.toLowerCase().includes(
          normalizedQuery
        );
      return channelMatched && queryMatched;
    });
  }, [items, activeChannel, query]);

  return (
    <div className="bd-page">
      <div className="bd-container bd-section space-y-8">
        <section className="bd-card bd-card-padding overflow-hidden">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="bd-badge">투자정보</span>
              <h1 className="bd-title-xl mt-4">경제 유튜브 영상 모아보기</h1>
              <p className="bd-text-main mt-4 max-w-3xl">
                주요 경제 채널의 최신 영상을 한곳에 모아 빠르게 살펴볼 수 있는
                페이지입니다. 채널별로 정리해 필요한 영상을 찾고, 관심 있는 원문 영상으로
                바로 이동할 수 있게 구성했습니다.
              </p>
              <p className="bd-text-sub mt-3">최신 수집 시각 {fetchedAt || "-"}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">총 영상 수</div>
                <div className="mt-1 text-xl font-bold text-white">{items.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <div className="text-xs text-slate-400">채널 수</div>
                <div className="mt-1 text-xl font-bold text-white">
                  {Math.max(channels.length - 1, 0)}
                </div>
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
                placeholder="제목이나 채널명으로 검색"
                className="bd-input pl-11"
              />
            </div>

            <button type="button" onClick={loadVideos} className="bd-button-secondary gap-2">
              <RefreshCcw size={16} />
              새로고침
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {channels.map((channel, index) => {
              const active = activeChannel === channel.id;
              return (
                <button
                  key={`${channel.id}-${index}`}
                  type="button"
                  onClick={() => setActiveChannel(channel.id)}
                  className={
                    active
                      ? "rounded-full border border-blue-400/40 bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                      : `rounded-full border px-4 py-2 text-sm font-semibold transition hover:text-white ${channel.badgeClassName}`
                  }
                >
                  {channel.label}
                </button>
              );
            })}
          </div>
        </section>

        {loading ? (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bd-card overflow-hidden animate-pulse">
                <div className="h-52 bg-slate-800" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-24 rounded bg-slate-800" />
                  <div className="h-6 w-4/5 rounded bg-slate-800" />
                  <div className="h-4 w-full rounded bg-slate-800" />
                  <div className="h-4 w-5/6 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </section>
        ) : error ? (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">영상을 불러오지 못했습니다</h2>
            <p className="bd-text-main mt-3">{error}</p>
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
              <div>확인할 항목</div>
              <div className="mt-2">1. .env.local 에 YOUTUBE_API_KEY 추가</div>
              <div>2. lib/youtube/channel-config.ts 의 채널 ID 수정</div>
              <div>3. 개발 서버 재시작</div>
            </div>
          </section>
        ) : filteredItems.length === 0 ? (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">표시할 영상이 없습니다</h2>
            <p className="bd-text-main mt-3">채널 필터나 검색어를 다시 확인해보세요.</p>
          </section>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item, index) => {
              const showThumb = Boolean(item.thumbnail) && !brokenThumbs[item.id];

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/70 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-cyan-500/30"
                >
                  <div className="relative h-56 overflow-hidden border-b border-slate-800 bg-slate-900">
                    {showThumb ? (
                      <img
                        src={item.thumbnail as string}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenThumbs((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-end bg-gradient-to-br ${
                          fallbackGradients[index % fallbackGradients.length]
                        } p-6`}
                      >
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                            <Youtube size={14} />
                            YOUTUBE
                          </div>
                          <div className="mt-4 text-2xl font-bold text-white">
                            {item.channelLabel}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                      {item.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${item.badgeClassName}`}
                      >
                        {item.channelLabel}
                      </span>
                      <span className="text-xs text-slate-500">{item.publishedAtLabel}</span>
                    </div>

                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 text-white">
                      {item.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">
                      {item.description || "영상 설명이 없습니다."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-800 pt-4 text-sm text-slate-400">
                      <div>{item.viewCountLabel}</div>
                      <div className="inline-flex items-center gap-2 font-semibold text-slate-100 transition group-hover:text-cyan-300">
                        유튜브로 이동
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}
