"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBlockProps {
  slot?: string;
  slotKey?: "default" | "top" | "bottom" | "sidebar" | "inline";
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
}


// 광고 노출은 환경변수와 코드 레벨 스위치가 모두 허용될 때만 활성화됩니다.
// NEXT_PUBLIC_ADSENSE_ENABLED=true와 광고 클라이언트/슬롯 값이 설정된 경우에만 렌더링됩니다.
const FORCE_DISABLE_ADS = true;

const ADSENSE_ENABLED =
  !FORCE_DISABLE_ADS && process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const slotMap = {
  default: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000",
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000",
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000",
  inline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "0000000000",
} as const;

export default function AdBlock({
  slot,
  slotKey = "default",
  format = "auto",
  className = "",
  label = "광고 영역",
}: AdBlockProps) {
  const resolvedSlot = slot ?? slotMap[slotKey];
  const isDev = process.env.NODE_ENV === "development";
  const canRenderAd = ADSENSE_ENABLED && !isDev && Boolean(AD_CLIENT) && Boolean(resolvedSlot);

  useEffect(() => {
    if (!canRenderAd) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("[ad] render failed", error);
    }
  }, [canRenderAd, resolvedSlot]);

  const formatClass =
    format === "horizontal"
      ? "min-h-[90px]"
      : format === "rectangle"
      ? "min-h-[250px]"
      : "min-h-[120px]";

  if (!canRenderAd) {
    return null;
  }

  return (
    <div className={`my-10 w-full ${className}`} aria-label={label}>
      <ins
        className={`adsbygoogle block ${formatClass}`}
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={resolvedSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
