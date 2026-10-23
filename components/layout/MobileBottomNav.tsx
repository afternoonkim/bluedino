"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Gift, Home, Landmark, TrendingUp } from "lucide-react";
const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/cal", label: "계산기", icon: Calculator },
  { href: "/finance", label: "금융", icon: Landmark },
  { href: "/info", label: "투자", icon: TrendingUp },
  { href: "/finance/events", label: "혜택", icon: Gift },
];
function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/finance") return pathname === "/finance" || (pathname.startsWith("/finance/") && !pathname.startsWith("/finance/events"));
  if (href === "/info") return ["/info", "/topics", "/company-analysis", "/industry", "/stocks", "/etf"].some(p => pathname === p || pathname.startsWith(p + "/"));
  return pathname === href || pathname.startsWith(href + "/");
}
export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-800/80 bg-slate-950/95 px-2 pb-[max(env(safe-area-inset-bottom),0.45rem)] pt-1.5 shadow-[0_-12px_30px_rgba(2,11,29,0.35)] backdrop-blur md:hidden" aria-label="모바일 주요 메뉴">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = isActivePath(pathname, href);
          return (
            <Link key={href} href={href} aria-current={isActive ? "page" : undefined} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-0.5 text-[11px] font-semibold transition ${isActive ? "bg-[#1E3A5F] text-white ring-1 ring-blue-300/20" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
              <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
