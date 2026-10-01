"use client";

import { useEffect, useId, useMemo, useRef } from "react";

type AdFitVariant = "top" | "bottom" | "middle";

type AdFitAdProps = {
  unit?: string;
  width?: number;
  height?: number;
  variant?: AdFitVariant;
  className?: string;
  label?: string;
  refreshKey?: string;
};

const ADFIT_FLAG = process.env.NEXT_PUBLIC_ADFIT_ENABLED;
const ADFIT_ENABLED = ADFIT_FLAG !== "false";

const ADFIT_TOP_UNIT = process.env.NEXT_PUBLIC_ADFIT_TOP_UNIT ?? "DAN-ObwSZ2YTVLvw1q2f";
const ADFIT_BOTTOM_UNIT = process.env.NEXT_PUBLIC_ADFIT_BOTTOM_UNIT;
const ADFIT_MIDDLE_UNIT = process.env.NEXT_PUBLIC_ADFIT_MID_UNIT ?? "DAN-awF7TIdYGHrRVXTe";

const adFitSizeMap: Record<AdFitVariant, { width: number; height: number; unit?: string }> = {
  top: {
    width: 320,
    height: 100,
    unit: ADFIT_TOP_UNIT,
  },
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

function hasSameAdUnitOutsideCurrent(adUnit: string, currentContainer: HTMLDivElement) {
  if (typeof document === "undefined") return false;

  return Array.from(document.querySelectorAll(".kakao_ad_area")).some((node) => {
    if (currentContainer.contains(node)) return false;
    return node.getAttribute("data-ad-unit") === adUnit;
  });
}

function appendAdFitScript(target: HTMLElement) {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://t1.kakaocdn.net/kas/static/ba.min.js";
  script.dataset.adfitLoader = "true";
  target.appendChild(script);
}

export default function AdFitAd({
  unit,
  width,
  height,
  variant = "middle",
  className = "",
  label = "광고",
  refreshKey,
}: AdFitAdProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const { resolvedUnit, resolvedWidth, resolvedHeight } = useMemo(() => {
    const fallback = adFitSizeMap[variant];
    return {
      resolvedUnit: unit ?? fallback.unit,
      resolvedWidth: width ?? fallback.width,
      resolvedHeight: height ?? fallback.height,
    };
  }, [height, unit, variant, width]);

  const adSlotKey = `${variant}-${resolvedUnit ?? "none"}-${refreshKey ?? reactId}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const section = container.closest("section");
    section?.removeAttribute("hidden");
    container.innerHTML = "";

    if (!ADFIT_ENABLED || !resolvedUnit) {
      section?.setAttribute("hidden", "true");
      return;
    }

    if (hasSameAdUnitOutsideCurrent(resolvedUnit, container)) {
      section?.setAttribute("hidden", "true");
      return;
    }

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", resolvedUnit);
    ins.setAttribute("data-ad-width", String(resolvedWidth));
    ins.setAttribute("data-ad-height", String(resolvedHeight));
    ins.setAttribute("data-adfit-slot", adSlotKey);

    container.appendChild(ins);
    appendAdFitScript(container);

    return () => {
      container.innerHTML = "";
      section?.removeAttribute("hidden");
    };
  }, [adSlotKey, refreshKey, resolvedHeight, resolvedUnit, resolvedWidth]);

  if (!ADFIT_ENABLED || !resolvedUnit) return null;

  return (
    <section
      className={`my-6 flex w-full justify-center ${className}`}
      aria-label={label}
    >
      <div
        ref={containerRef}
        className="flex min-h-[100px] w-full items-center justify-center"
        data-adfit-variant={variant}
        data-adfit-unit={resolvedUnit}
      />
    </section>
  );
}
