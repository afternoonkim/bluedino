import { NextResponse } from "next/server";
import {
  YOUTUBE_CHANNELS,
  type YoutubeChannelConfig,
} from "@/lib/youtube/channel-config";

export const revalidate = 1800;

type YoutubeThumbnailSet = {
  maxres?: { url?: string };
  standard?: { url?: string };
  high?: { url?: string };
  medium?: { url?: string };
  default?: { url?: string };
};

type YoutubePlaylistItemResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: YoutubeThumbnailSet;
      resourceId?: {
        videoId?: string;
      };
    };
  }>;
};

type YoutubeVideosResponse = {
  items?: Array<{
    id?: string;
    contentDetails?: {
      duration?: string;
    };
    statistics?: {
      viewCount?: string;
    };
  }>;
};

type YoutubeChannelsResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type VideoCardItem = {
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

const API_BASE = "https://www.googleapis.com/youtube/v3";
const DEFAULT_CHANNEL_FETCH_COUNT = 8;

function getApiKey() {
  return process.env.YOUTUBE_API_KEY?.trim() || "";
}

function getChannelFetchCount() {
  const raw = Number(
    process.env.YOUTUBE_CHANNEL_FETCH_COUNT || DEFAULT_CHANNEL_FETCH_COUNT
  );

  if (Number.isNaN(raw)) return DEFAULT_CHANNEL_FETCH_COUNT;

  return Math.min(Math.max(raw, 1), 20);
}

async function fetchYoutubeJson<T>(
  path: string,
  params: Record<string, string | number | undefined>
): Promise<T> {
  const key = getApiKey();

  if (!key) {
    throw new Error("YOUTUBE_API_KEY 환경변수가 없습니다.");
  }

  const url = new URL(`${API_BASE}${path}`);

  Object.entries(params).forEach(([paramKey, value]) => {
    if (value === undefined || value === "") return;
    url.searchParams.set(paramKey, String(value));
  });

  url.searchParams.set("key", key);

  const response = await fetch(url.toString(), {
    next: { revalidate },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`YouTube API 요청 실패 (${response.status}) ${text}`);
  }

  return (await response.json()) as T;
}

function normalizeThumbnail(thumbnails?: YoutubeThumbnailSet) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    null
  );
}

function formatDateLabel(input: string) {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) return input;

  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatViewCount(value: number) {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}억회`;
  if (value >= 10000) return `${(value / 10000).toFixed(1)}만회`;
  return `${value.toLocaleString("ko-KR")}회`;
}

function formatIsoDuration(duration?: string) {
  if (!duration) return "-";

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return "-";

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  const hh = hours > 0 ? `${hours}:` : "";
  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const ss = String(seconds).padStart(2, "0");

  return `${hh}${mm}:${ss}`;
}

async function resolveUploadsPlaylistId(channel: YoutubeChannelConfig) {
  if (channel.uploadsPlaylistId) {
    return channel.uploadsPlaylistId;
  }

  const channelResponse = await fetchYoutubeJson<YoutubeChannelsResponse>(
    "/channels",
    {
      part: "contentDetails",
      id: channel.id,
    }
  );

  return (
    channelResponse.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || ""
  );
}

async function fetchChannelVideos(
  channel: YoutubeChannelConfig
): Promise<VideoCardItem[]> {
  const uploadsPlaylistId = await resolveUploadsPlaylistId(channel);

  if (!uploadsPlaylistId) {
    return [];
  }

  const playlistItemsResponse =
    await fetchYoutubeJson<YoutubePlaylistItemResponse>("/playlistItems", {
      part: "snippet",
      playlistId: uploadsPlaylistId,
      maxResults: getChannelFetchCount(),
    });

  const playlistItems = (playlistItemsResponse.items || []).filter(
    (item) => item.snippet?.resourceId?.videoId
  );

  const videoIds = playlistItems
    .map((item) => item.snippet?.resourceId?.videoId)
    .filter((value): value is string => Boolean(value))
    .join(",");

  if (!videoIds) {
    return [];
  }

  const videosResponse = await fetchYoutubeJson<YoutubeVideosResponse>(
    "/videos",
    {
      part: "contentDetails,statistics",
      id: videoIds,
    }
  );

  const videoDetailsMap = new Map(
    (videosResponse.items || []).map((video) => [video.id || "", video])
  );

  return playlistItems.map((item) => {
    const snippet = item.snippet;
    const videoId = snippet?.resourceId?.videoId || "";
    const details = videoDetailsMap.get(videoId);
    const viewCount = Number(details?.statistics?.viewCount || 0);

    return {
      id: videoId,
      title: snippet?.title || "제목 없음",
      description: (snippet?.description || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 180),
      publishedAt: snippet?.publishedAt || "",
      publishedAtLabel: formatDateLabel(snippet?.publishedAt || ""),
      channelId: channel.id,
      channelLabel: channel.label,
      thumbnail: normalizeThumbnail(snippet?.thumbnails),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      duration: formatIsoDuration(details?.contentDetails?.duration),
      viewCount,
      viewCountLabel: formatViewCount(viewCount),
      badgeClassName:
        channel.badgeClassName ||
        "bg-slate-500/15 text-slate-200 border-slate-400/30",
    };
  });
}

export async function GET() {
  try {
    if (!getApiKey()) {
      return NextResponse.json(
        {
          ok: false,
          message: "YOUTUBE_API_KEY 환경변수를 설정해주세요.",
          items: [],
        },
        { status: 500 }
      );
    }

    const channelResults = await Promise.all(
      YOUTUBE_CHANNELS.map(fetchChannelVideos)
    );

    const items = channelResults
      .flat()
      .filter((item) => item.id && item.url)
      .sort((a, b) => {
        if (!a.publishedAt || !b.publishedAt) return 0;
        return a.publishedAt < b.publishedAt ? 1 : -1;
      });

    const channels = [
      {
        id: "all",
        label: "전체",
        badgeClassName: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      },
      ...YOUTUBE_CHANNELS.map((channel) => ({
        id: channel.id,
        label: channel.label,
        badgeClassName:
          channel.badgeClassName ||
          "bg-slate-500/15 text-slate-200 border-slate-400/30",
      })),
    ];

    return NextResponse.json({
      ok: true,
      items,
      channels,
      fetchedAt: new Date().toISOString(),
      channelFetchCount: getChannelFetchCount(),
      totalItems: items.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      {
        ok: false,
        message,
        items: [],
      },
      { status: 500 }
    );
  }
}