"use client";

import { useEffect, useMemo, useState } from "react";

const SITE_BASE = "https://bluedino.kr";

type ShareAndCiteProps = {
  /** Canonical 경로. 예: "/info/guide/etf-basics" 또는 절대 URL. */
  url: string;
  /** 페이지 제목 (한글 그대로) */
  title: string;
  /** 인용 안내에 표시할 페이지 종류 (예: "투자 기초 가이드", "기업분석") */
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

  const naverShare = `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const threadsShare = `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`;
  const kakaoStoryShare = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedTitle}`;

  const htmlSnippet = `<a href="${absoluteUrl}" target="_blank" rel="noopener noreferrer">${title} | BlueDino</a>`;
  const markdownSnippet = `[${title} | BlueDino](${absoluteUrl})`;
  const plainSnippet = `${title} | BlueDino — ${absoluteUrl}`;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1.4초 후 "복사됨" 표시 자동 해제
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
      aria-label="이 페이지 공유하기 및 인용하기"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="bd-badge">공유 · 인용</span>
          <h2 className="bd-title-md mt-3">
            이 페이지를 블로그·SNS에서 공유하거나 인용해보세요
          </h2>
        </div>
        <button
          type="button"
          onClick={() => handleCopy("url", absoluteUrl)}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/60 hover:bg-cyan-400/20"
        >
          {copiedKey === "url" ? "✓ 링크 복사됨" : "🔗 페이지 링크 복사"}
        </button>
      </div>

      <p className="bd-text-sub mt-4">
        {category
          ? `${category} 콘텐츠를 본인 블로그·SNS에 인용하거나 공유해주시면, 같은 주제를 찾는 다른 분들에게 도움이 됩니다.`
          : "이 페이지를 본인 블로그·SNS에 인용하거나 공유해주시면 같은 주제를 찾는 다른 분들에게 도움이 됩니다."}
        {" "}네이버 블로그·X(트위터)·페이스북·스레드·카카오스토리 모두 한 번 클릭으로 공유할 수 있습니다.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={naverShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400/60 hover:bg-emerald-400/20"
        >
          네이버 블로그 공유
        </a>
        <a
          href={xShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
        >
          X(트위터) 공유
        </a>
        <a
          href={facebookShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-400/60 hover:bg-blue-400/20"
        >
          페이스북 공유
        </a>
        <a
          href={threadsShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
        >
          스레드 공유
        </a>
        <a
          href={kakaoStoryShare}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:border-yellow-400/60 hover:bg-yellow-400/20"
        >
          카카오스토리 공유
        </a>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-white">이 페이지를 글에 인용할 때</h3>
        <p className="bd-text-sub mt-2">
          블로그나 보고서, 글에 본 페이지를 인용하실 때 아래 코드를 그대로 붙여 넣으시면 자동으로 링크가 들어갑니다.
        </p>

        <div className="mt-4 space-y-3">
          <CitationRow
            label="네이버 블로그·티스토리(HTML)"
            value={htmlSnippet}
            copied={copiedKey === "html"}
            onCopy={() => handleCopy("html", htmlSnippet)}
          />
          <CitationRow
            label="마크다운(GitHub·노션)"
            value={markdownSnippet}
            copied={copiedKey === "md"}
            onCopy={() => handleCopy("md", markdownSnippet)}
          />
          <CitationRow
            label="일반 텍스트(메신저·메일)"
            value={plainSnippet}
            copied={copiedKey === "plain"}
            onCopy={() => handleCopy("plain", plainSnippet)}
          />
        </div>
      </div>

      <p className="bd-text-sub mt-6">
        BlueDino의 모든 콘텐츠는 출처(BlueDino, https://bluedino.kr)를 표기하시면 자유롭게 인용·요약·재가공해 사용하실 수 있습니다. 다만 본문을 그대로 통째로 복사해 게시하시는 것은 SEO 중복 콘텐츠 패널티 측면에서 본인 사이트에도 좋지 않으니, 핵심만 짧게 요약하고 출처 링크를 다는 형태로 사용해주세요.
      </p>
    </section>
  );
}

function CitationRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-100"
        >
          {copied ? "✓ 복사됨" : "복사"}
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-slate-300">
        <code>{value}</code>
      </pre>
    </div>
  );
}
