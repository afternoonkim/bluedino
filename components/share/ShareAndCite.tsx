"use client";

import { useEffect, useMemo, useState } from "react";

const SITE_BASE = "https://bluedino.kr";

type ShareAndCiteProps = {
  /** Canonical 경로. 예: "/info/guide/etf-basics" 또는 절대 URL. */
  url: string;
  /** 페이지 제목 (한글 그대로) */
  title: string;
  /** 공유 안내에 표시할 페이지 종류 (예: "투자 기초 가이드", "기업분석") */
  category?: string;
};

function buildAbsoluteUrl(input: string) {
  if (!input) return SITE_BASE;
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/")) return `${SITE_BASE}${input}`;
  return `${SITE_BASE}/${input}`;
}

function copy(text: string, onDone: () => void) {
  if (typeof navigator === "undefined") return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(() => {
      legacyCopy(text);
      onDone();
    });
  } else {
    legacyCopy(text);
    onDone();
  }
}

function legacyCopy(text: string) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  } catch {
    // ignore
  }
}

export default function ShareAndCite({ url, title, category }: ShareAndCiteProps) {
  const absoluteUrl = useMemo(() => buildAbsoluteUrl(url), [url]);
  const encodedUrl = useMemo(() => encodeURIComponent(absoluteUrl), [absoluteUrl]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const threadsShare = `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`;
  const kakaoStoryShare = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedTitle}`;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedKey) return;
    const t = setTimeout(() => setCopiedKey(null), 1400);
    return () => clearTimeout(t);
  }, [copiedKey]);

  const handleCopy = (key: string, text: string) => {
    copy(text, () => setCopiedKey(key));
  };

  return (
    <section
      className="bd-card-soft bd-card-padding"
      aria-label="이 페이지 공유하기"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="bd-badge">공유</span>
          <h2 className="bd-title-md mt-3">
            이 페이지를 저장하거나 공유하세요
          </h2>
        </div>
        <button
          type="button"
          onClick={() => handleCopy("url", absoluteUrl)}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/60 hover:bg-cyan-400/20"
        >
          {copiedKey === "url" ? "✓ 링크 복사됨" : "🔗 링크 복사"}
        </button>
      </div>

      <p className="bd-text-sub mt-4">
        {category
          ? `${category}를 나중에 다시 보거나 다른 사람과 공유할 수 있습니다.`
          : "이 페이지를 나중에 다시 보거나 다른 사람과 공유할 수 있습니다."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={xShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
        >
          X(트위터)
        </a>
        <a
          href={facebookShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-400/60 hover:bg-blue-400/20"
        >
          페이스북
        </a>
        <a
          href={threadsShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
        >
          스레드
        </a>
        <a
          href={kakaoStoryShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:border-yellow-400/60 hover:bg-yellow-400/20"
        >
          카카오스토리
        </a>
      </div>
    </section>
  );
}
