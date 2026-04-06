"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  collapsed,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      aria-label={label}
      className={`group flex transition-all duration-200 ${
        collapsed
          ? `mx-auto h-11 w-11 items-center justify-center rounded-2xl border ${
              active
                ? "border-blue-400/30 bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] ring-1 ring-blue-300/30"
                : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/90 hover:text-white"
            }`
          : `${
              active
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-slate-800 hover:text-white"
            } items-center gap-3 rounded-xl px-3 py-2`
      }`}
    >
      <Icon
        className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          collapsed ? "h-[22px] w-[22px]" : "h-[19px] w-[19px]"
        }`}
      />
      {!collapsed && (
        <span className="text-sm font-medium transition-opacity duration-200">
          {label}
        </span>
      )}
    </Link>
  );
}
