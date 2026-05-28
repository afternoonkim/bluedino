"use client";

import Script from "next/script";

type AdFitVariant = "bottom" | "middle";

type AdFitAdProps = {
  unit?: string;
  width?: number;
  height?: number;
  variant?: AdFitVariant;
  className?: string;
  label?: string;
};

const ADFIT_ENABLED = process.env.NEXT_PUBLIC_ADFIT_ENABLED === "true";

const ADFIT_BOTTOM_UNIT =
  process.env.NEXT_PUBLIC_ADFIT_BOTTOM_UNIT ?? "DAN-ObwSZ2YTVLvw1q2f";

const ADFIT_MIDDLE_UNIT =
  process.env.NEXT_PUBLIC_ADFIT_MID_UNIT ?? "DAN-awF7TIdYGHrRVXTe";

const adFitSizeMap: Record<AdFitVariant, { width: number; height: number; unit: string }> = {
  bottom: {
    width: 320,
    height: 100,
    unit: ADFIT_BOTTOM_UNIT,
  },
  middle: {
    width: 300,
    height: 250,
    unit: ADFIT_MIDDLE_UNIT,
  },
};

export default function AdFitAd({
  unit,
  width,
  height,
  variant = "middle",
  className = "",
  label = "광고",
}: AdFitAdProps) {
  const fallback = adFitSizeMap[variant];
  const resolvedUnit = unit ?? fallback.unit;
  const resolvedWidth = width ?? fallback.width;
  const resolvedHeight = height ?? fallback.height;

  if (!ADFIT_ENABLED || !resolvedUnit) {
    return null;
  }

  return (
    <section
      className={`my-8 flex w-full justify-center ${className}`}
      aria-label={label}
    >
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={resolvedUnit}
        data-ad-width={String(resolvedWidth)}
        data-ad-height={String(resolvedHeight)}
      />
      <Script
        id="adfit-script"
        src="https://t1.daumcdn.net/kas/static/ba.min.js"
        strategy="afterInteractive"
        async
      />
    </section>
  );
}
