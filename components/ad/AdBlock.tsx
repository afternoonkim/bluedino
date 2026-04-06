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


const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
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
  label = "AdSense 광고 영역",
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
      console.error("AdSense render error:", error);
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
    <div className={`my-10 w-full ${className}`}>
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
