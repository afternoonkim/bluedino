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
      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
        ${
          active
            ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
            : "text-gray-300 hover:bg-slate-800"
        }`}
    >
      <Icon size={18} />
      {!collapsed && (
        <span className="text-sm font-medium transition-opacity duration-200">
          {label}
        </span>
      )}
    </Link>
  );
}
