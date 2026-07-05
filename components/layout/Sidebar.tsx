"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Calculator, ChevronLeft, Home, Landmark, Menu, TrendingUp } from "lucide-react";

const mainNav = [
  { href: "/", label: "홈", description: "오늘 볼 금융 흐름", icon: Home },
  { href: "/cal", label: "계산기", description: "숫자로 먼저 확인", icon: Calculator },
  { href: "/finance", label: "금융가이드", description: "계좌·대출 질문", icon: Landmark },
  { href: "/info", label: "투자정보", description: "가이드·전략·기업", icon: TrendingUp },
];

const quickLinks = [
  { href: "/topics", label: "많이 찾는 주제" },
  { href: "/company-analysis", label: "기업분석" },
  { href: "/industry", label: "산업·테마" },
  { href: "/info/guide", label: "투자 기초" },
  { href: "/info/strategy", label: "투자전략" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/info") {
    return pathname.startsWith("/info") || pathname.startsWith("/topics") || pathname.startsWith("/company-analysis") || pathname.startsWith("/industry") || pathname.startsWith("/stocks") || pathname.startsWith("/etf");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <>
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-3 top-3 z-[60] rounded-full border border-slate-800 bg-slate-950/90 p-3 text-white shadow-lg backdrop-blur lg:hidden"
          aria-label="메뉴 열기"
        >
          <Menu size={20} />
        </button>
      )}

      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
          aria-label="메뉴 닫기"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex flex-col border-r border-slate-800 bg-slate-950/98 text-white shadow-2xl transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <Link href="/" onClick={closeMobileSidebar} className={`${collapsed ? "mx-auto" : ""} flex items-center gap-2`}>
            <Image src="/favicon-32x32.png" alt="BlueDino" width={28} height={28} />
            {!collapsed ? <span className="text-xl font-bold tracking-wide">BlueDino</span> : null}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden text-slate-400 hover:text-white lg:block"
            aria-label="사이드바 접기"
          >
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>

          <button onClick={closeMobileSidebar} className="text-slate-400 hover:text-white lg:hidden" aria-label="모바일 메뉴 닫기">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {!collapsed ? (
            <p className="px-2 pb-3 text-xs font-semibold text-slate-500">필요한 목적만 고르고, 세부 분류는 각 페이지에서 찾으세요.</p>
          ) : null}

          <nav className="space-y-2" aria-label="주요 메뉴">
            {mainNav.map(({ href, label, description, icon: Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileSidebar}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2 transition ${
                    active ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed ? (
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">{label}</span>
                      <span className={`block text-xs ${active ? "text-slate-800" : "text-slate-500"}`}>{description}</span>
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {!collapsed ? (
            <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <BookOpen className="h-4 w-4 text-cyan-300" />
                투자정보 안의 세부 메뉴
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileSidebar}
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {!collapsed ? (
          <div className="shrink-0 border-t border-slate-800 p-4 text-xs leading-5 text-slate-500">
            메뉴를 줄이고, 목록 안에서 태그로 찾는 구조로 정리했습니다.
          </div>
        ) : null}
      </aside>
    </>
  );
}
