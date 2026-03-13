"use client";

import { ReactNode } from "react";

export default function SidebarGroup({
  title,
  children,
  collapsed,
}: {
  title: string;
  children: ReactNode;
  collapsed: boolean;
}) {
  return (
    <div>
      {!collapsed && (
        <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
          {title}
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
