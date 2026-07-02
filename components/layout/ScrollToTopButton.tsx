"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 640;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[5.75rem] right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-950/95 text-cyan-200 shadow-[0_12px_30px_rgba(2,11,29,0.45)] backdrop-blur transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 lg:hidden"
      aria-label="상단으로 이동"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
