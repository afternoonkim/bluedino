"use client";

import { useEffect, useMemo, useState } from "react";

const SITE_BASE = "https://bluedino.kr";

type ShareAndCiteProps = {
  url: string;
  title: string;
  category?: string;
};

function buildAbsoluteUrl(input: string) {
  if (!input) return SITE_BASE;
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/")) return `${SITE_BASE}${input}`;
  return `${SITE_BASE}/${input}`;
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

function copy(text: string, onDone: () => void) {
  if (typeof navigator === "undefined") return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(() => {
      legacyCopy(text);
      onDone();
    });
    return;
  }
  legacyCopy(text);
  onDone();
}

export default function ShareAndCite({ url, title, category }: ShareAndCiteProps) {
  const absoluteUrl = useMemo(() => buildAbsoluteUrl(url), [url]);
  const encodedUrl = useMemo(() => encodeURIComponent(absoluteUrl), [absoluteUrl]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const handleShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({ title, url: absoluteUrl });
        return;
      } catch {
        // 사용자가 공유 창을 닫은 경우에는 별도 동작을 하지 않습니다.
        return;
      }
    }
    copy(absoluteUrl, () => setCopied(true));
  };

  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const threadsShare = `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`;
  const kakaoStoryShare = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedTitle}`;

  return (
    <section className="bd-card-soft px-4 py-4 md:px-5" aria-label="이 페이지 공유하기">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-200">저장하거나 공유하기</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {category ? `${category}를 나중에 다시 볼 수 있습니다.` : "이 페이지를 나중에 다시 볼 수 있습니다."}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => copy(absoluteUrl, () => setCopied(true))} className="bd-button-secondary min-h-9 px-3 py-2 text-xs">
            {copied ? "복사됨" : "링크 복사"}
          </button>
          <button type="button" onClick={handleShare} className="bd-button-primary min-h-9 px-3 py-2 text-xs">
            {canNativeShare ? "공유" : "복사"}
          </button>
        </div>
      </div>

      <details className="group mt-3 border-t border-slate-800 pt-3">
        <summary className="cursor-pointer list-none text-xs font-medium text-slate-500 hover:text-slate-300 [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">다른 공유 방법 보기</span>
          <span className="hidden group-open:inline">다른 공유 방법 접기</span>
        </summary>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={xShare} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white">X</a>
          <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white">페이스북</a>
          <a href={threadsShare} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white">스레드</a>
          <a href={kakaoStoryShare} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white">카카오스토리</a>
        </div>
      </details>
    </section>
  );
}
