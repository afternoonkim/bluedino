"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getListHref(pathname: string) {
  const path = normalizePath(pathname);
  const segments = path.split("/").filter(Boolean);

  if (path === "/") return "/";

  if (path === "/company-analysis") return "/";
  if (path.startsWith("/company-analysis")) {
    if (segments.length >= 3) return `/company-analysis/${segments[1]}`;
    return "/company-analysis";
  }

  if (path.startsWith("/stocks")) return "/stocks";
  if (path.startsWith("/etf")) return "/etf/ranking";

  if (path.startsWith("/cal")) return "/cal/calculator";

  if (path.startsWith("/finance/pension")) {
    return segments.length >= 3 ? "/finance/pension" : "/finance";
  }

  if (path.startsWith("/finance")) {
    if (segments.length >= 3) return `/finance/${segments[1]}`;
    return "/finance";
  }

  if (path.startsWith("/info/guide")) return "/info/guide";
  if (path.startsWith("/info/strategy")) return "/info/strategy";
  if (path.startsWith("/info/blog")) return "/info/blog";
  if (path.startsWith("/info/videos")) return "/info/videos";
  if (path.startsWith("/info/investment")) return "/info/guide";
  if (path.startsWith("/info/etc")) return "/info/guide";
  if (path.startsWith("/info")) return "/info/guide";

  return "/";
}

function getListLabel(pathname: string) {
  const path = normalizePath(pathname);
  const segments = path.split("/").filter(Boolean);

  if (path === "/company-analysis") return "메인으로 이동";
  if (path.startsWith("/company-analysis")) {
    if (segments.length >= 3) {
      return segments[1] === "korea" ? "국내기업 분석 목록으로 이동" : "해외기업 분석 목록으로 이동";
    }
    return "기업분석 목록으로 이동";
  }

  if (path.startsWith("/stocks")) return "종목 검색으로 이동";
  if (path.startsWith("/etf")) return "ETF 목록으로 이동";
  if (path.startsWith("/cal")) return "계산기 목록으로 이동";
  if (path.startsWith("/finance")) return "금융 Q&A 목록으로 이동";
  if (path.startsWith("/info/guide")) return "투자 가이드 목록으로 이동";
  if (path.startsWith("/info/strategy")) return "투자 전략 목록으로 이동";
  if (path.startsWith("/info/blog")) return "블로그 목록으로 이동";
  if (path.startsWith("/info/videos")) return "영상 목록으로 이동";

  return "목록으로 이동";
}

type RouteNavigationButtonsProps = {
  position?: "top" | "bottom";
};

export default function RouteNavigationButtons({ position = "top" }: RouteNavigationButtonsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const path = normalizePath(pathname || "/");

  if (path === "/") return null;

  const listHref = getListHref(path);
  const listLabel = getListLabel(path);
  const spacingClass = position === "top" ? "mb-5" : "mt-8";

  return (
    <nav className={`${spacingClass} flex flex-wrap items-center gap-2`} aria-label="페이지 이동 버튼">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-900"
        aria-label="이전 화면으로"
      >
        ← 이전 화면으로
      </button>
      <Link
        href={listHref}
        className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-slate-600 hover:text-slate-100"
      >
        {listLabel}
      </Link>
    </nav>
  );
}
