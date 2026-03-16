// components/layout/ClientLayout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import SiteFooter from "@/components/layout/SiteFooter";
import RouteAwareAdShell from "@/components/ad/RouteAwareAdShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#020b1d] text-slate-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Topbar />

        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <RouteAwareAdShell>{children}</RouteAwareAdShell>
          </div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}