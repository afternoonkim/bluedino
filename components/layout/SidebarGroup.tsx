"use client";

import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
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
  // 서버 렌더링 결과와 클라이언트 첫 렌더링 결과가 같아야 hydration 오류가 나지 않습니다.
  // localStorage 값은 초기 렌더링에 직접 반영하지 않고, 사용자가 토글할 때부터 저장합니다.
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
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

  const isOpen = open;

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
