"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallbackHref: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  fallbackHref,
  label = "이전 화면으로",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-900"
        aria-label={label}
      >
        ← {label}
      </button>
      <Link
        href={fallbackHref}
        className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-slate-600 hover:text-slate-100"
      >
        목록으로 이동
      </Link>
    </div>
  );
}
