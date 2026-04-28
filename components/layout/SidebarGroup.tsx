"use client";

import { ReactNode, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type SidebarGroupProps = {
  title: string;
  children: ReactNode;
  collapsed: boolean;
  storageKey?: string;
  defaultOpen?: boolean;
};

export default function SidebarGroup({
  title,
  children,
  collapsed,
  storageKey,
  defaultOpen = true,
}: SidebarGroupProps) {
  const persistKey = `bd:sidebar-group:${storageKey ?? title}`;
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(persistKey);
      if (saved === "1") setOpen(true);
      else if (saved === "0") setOpen(false);
    } catch {
      // ignore (private mode)
    }
    setHydrated(true);
  }, [persistKey]);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const next = !open;
    setOpen(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(persistKey, next ? "1" : "0");
      } catch {
        // ignore
      }
    }
  };

  if (collapsed) {
    return (
      <div>
        <div className="space-y-2">{children}</div>
      </div>
    );
  }

  const isOpen = hydrated ? open : defaultOpen;

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="mb-2 flex w-full items-center justify-between rounded-md px-1 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400 transition hover:text-white"
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
        />
      </button>

      {isOpen ? <div className="space-y-2">{children}</div> : null}
    </div>
  );
}
