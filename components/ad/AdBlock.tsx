"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBlockProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
}

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const DEFAULT_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000";

export default function AdBlock({
  slot = DEFAULT_SLOT,
  format = "auto",
  className = "",
  label = "AdSense 광고 영역",
}: AdBlockProps) {
  const isDev = process.env.NODE_ENV === "development";
  const canRenderAd = !isDev && Boolean(AD_CLIENT) && Boolean(slot);

  useEffect(() => {
    if (!canRenderAd) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense render error:", error);
    }
  }, [canRenderAd, slot]);

  const formatClass =
    format === "horizontal"
      ? "min-h-[90px]"
      : format === "rectangle"
      ? "min-h-[250px]"
      : "min-h-[120px]";

  if (!canRenderAd) {
    return (
      <div className={`my-10 w-full ${className}`}>
        <div
          className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-4 text-center text-sm text-slate-500 ${formatClass}`}
        >
          <span>{label}</span>
          <span className="mt-1 text-xs text-slate-600">
            개발 환경 또는 애드센스 미설정 상태
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-10 w-full ${className}`}>
      <ins
        className={`adsbygoogle block ${formatClass}`}
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
