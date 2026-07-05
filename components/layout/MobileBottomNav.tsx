"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Home, Landmark, TrendingUp } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/cal", label: "계산", icon: Calculator },
  { href: "/finance", label: "금융", icon: Landmark },
  { href: "/info", label: "투자", icon: TrendingUp },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/info") {
    return pathname.startsWith("/info") || pathname.startsWith("/topics") || pathname.startsWith("/company-analysis") || pathname.startsWith("/industry") || pathname.startsWith("/stocks") || pathname.startsWith("/etf");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800/80 bg-slate-950/95 px-3 pb-[max(env(safe-area-inset-bottom),0.45rem)] pt-1.5 shadow-[0_-12px_30px_rgba(2,11,29,0.35)] backdrop-blur lg:hidden" aria-label="모바일 주요 메뉴">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-3xl border border-slate-800 bg-slate-950/80 p-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-10 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[10px] font-semibold transition ${
                active ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
