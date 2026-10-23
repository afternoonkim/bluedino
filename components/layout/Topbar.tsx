"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { href: "/cal", label: "계산기" },
  { href: "/finance", label: "금융가이드" },
  { href: "/info", label: "투자정보" },
  { href: "/finance/events", label: "금융 혜택" },
];
function active(pathname: string, href: string) {
  if (href === "/finance") return pathname === "/finance" || (pathname.startsWith("/finance/") && !pathname.startsWith("/finance/events"));
  if (href === "/info") return ["/info", "/topics", "/company-analysis", "/industry", "/stocks", "/etf"].some(p => pathname === p || pathname.startsWith(p + "/"));
  return pathname === href || pathname.startsWith(href + "/");
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
              <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-[#1E3A5F] text-white ring-1 ring-blue-300/20" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/finance/events" className="inline-flex rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:border-blue-400/40 sm:text-sm md:hidden">금융 혜택</Link>
      </div>
    </header>
  );
}
