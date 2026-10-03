"use client";

import { useEffect, useMemo, useRef } from "react";

type AdFitVariant = "top" | "bottom" | "middle";

type AdFitAdProps = {
  unit?: string;
  width?: number;
  height?: number;
  variant?: AdFitVariant;
  className?: string;
  label?: string;
};

type AdFitWindow = Window & {
  adfit?: {
    destroy?: (unit: string) => void;
  };
};

const ADFIT_FLAG = process.env.NEXT_PUBLIC_ADFIT_ENABLED;
const ADFIT_ENABLED = ADFIT_FLAG !== "false";
const ADFIT_SCRIPT_SRC = "https://t1.kakaocdn.net/kas/static/ba.min.js";
const ADFIT_BATCH_DELAY_MS = 150;
const ADFIT_RELOAD_COOLDOWN_MS = 1500;

let adFitLoadTimer: ReturnType<typeof setTimeout> | null = null;
let adFitScriptLoading = false;
let lastAdFitLoadAt = 0;

const adFitSizeMap: Record<AdFitVariant, { width: number; height: number; unit?: string }> = {
  top: {
    width: 320,
    height: 100,
    unit: process.env.NEXT_PUBLIC_ADFIT_TOP_UNIT ?? "DAN-ObwSZ2YTVLvw1q2f",
  },
  bottom: {
    width: 320,
    height: 100,
    unit: process.env.NEXT_PUBLIC_ADFIT_BOTTOM_UNIT,
  },
  middle: {
    width: 300,
    height: 250,
    unit: process.env.NEXT_PUBLIC_ADFIT_MID_UNIT ?? "DAN-awF7TIdYGHrRVXTe",
  },
};

function hasSameAdUnitOutsideCurrent(adUnit: string, currentContainer: HTMLDivElement) {
  if (typeof document === "undefined") return false;

  return Array.from(document.querySelectorAll(".kakao_ad_area")).some((node) => {
    if (currentContainer.contains(node)) return false;
    return node.getAttribute("data-ad-unit") === adUnit;
  });
}

function hasAnotherAdUnit(adUnit: string, currentContainer: HTMLDivElement) {
  if (typeof document === "undefined") return false;

  return Array.from(document.querySelectorAll(".kakao_ad_area")).some((node) => {
    if (currentContainer.contains(node)) return false;
    return node.getAttribute("data-ad-unit") === adUnit;
  });
}

function scheduleAdFitLoad() {
  if (typeof document === "undefined") return;

  if (adFitLoadTimer) clearTimeout(adFitLoadTimer);

  const elapsed = Date.now() - lastAdFitLoadAt;
  const cooldownDelay = Math.max(0, ADFIT_RELOAD_COOLDOWN_MS - elapsed);
  const delay = Math.max(ADFIT_BATCH_DELAY_MS, cooldownDelay);

  adFitLoadTimer = setTimeout(() => {
    adFitLoadTimer = null;

    if (adFitScriptLoading || !document.querySelector(".kakao_ad_area")) return;

    adFitScriptLoading = true;
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = ADFIT_SCRIPT_SRC;
    script.dataset.bluedinoAdfitLoader = "true";

    const finish = () => {
      lastAdFitLoadAt = Date.now();
      adFitScriptLoading = false;
      script.remove();
    };

    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", finish, { once: true });
    document.body.appendChild(script);
  }, delay);
}

export default function AdFitAd({
  unit,
  width,
  height,
  variant = "middle",
  className = "",
  label = "광고",
}: AdFitAdProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedUnit, resolvedWidth, resolvedHeight } = useMemo(() => {
    const fallback = adFitSizeMap[variant];
    return {
      resolvedUnit: unit ?? fallback.unit,
      resolvedWidth: width ?? fallback.width,
      resolvedHeight: height ?? fallback.height,
    };
  }, [height, unit, variant, width]);

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

    let inserted = false;
    let frameId = 0;

    frameId = window.requestAnimationFrame(() => {
      const host = section ?? container;

      // CSS로 숨겨진 반응형 광고 영역은 AdFit 요청 자체를 만들지 않습니다.
      if (host.getClientRects().length === 0) return;

      if (hasSameAdUnitOutsideCurrent(resolvedUnit, container)) {
        section?.setAttribute("hidden", "true");
        return;
      }

      const ins = document.createElement("ins");
      ins.className = "kakao_ad_area";
      ins.style.display = "none";
      ins.style.width = "100%";
      ins.setAttribute("data-ad-unit", resolvedUnit);
      ins.setAttribute("data-ad-width", String(resolvedWidth));
      ins.setAttribute("data-ad-height", String(resolvedHeight));

      container.appendChild(ins);
      inserted = true;

      // 같은 렌더 사이클에 생성된 여러 슬롯을 모아 SDK를 한 번만 실행합니다.
      scheduleAdFitLoad();
    });

    return () => {
      window.cancelAnimationFrame(frameId);

      if (inserted && !hasAnotherAdUnit(resolvedUnit, container)) {
        const globalAdfit = (window as AdFitWindow).adfit;
        globalAdfit?.destroy?.(resolvedUnit);
      }

      container.innerHTML = "";
      section?.removeAttribute("hidden");
    };
  }, [resolvedHeight, resolvedUnit, resolvedWidth]);

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
