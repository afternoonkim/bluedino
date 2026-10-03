"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/cal", label: "계산기" },
  { href: "/finance", label: "금융가이드" },
  { href: "/info", label: "투자정보" },
];

function active(pathname: string, href: string) {
  if (href === "/info") {
    return pathname.startsWith("/info") || pathname.startsWith("/topics") || pathname.startsWith("/company-analysis") || pathname.startsWith("/industry") || pathname.startsWith("/stocks") || pathname.startsWith("/etf");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Topbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="BlueDino 홈">
          <Image src="/favicon-32x32.png" alt="" width={28} height={28} />
          <span className="text-lg font-bold tracking-[-0.02em] text-white">BlueDino</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const isActive = active(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-[#1E3A5F] text-slate-100 ring-1 ring-blue-300/20" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/cal" className="hidden rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-400/40 hover:text-blue-200 sm:inline-flex md:hidden">
          계산기 찾기
        </Link>
      </div>
    </header>
  );
}
