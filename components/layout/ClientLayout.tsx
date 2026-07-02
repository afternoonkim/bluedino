// components/layout/ClientLayout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import SiteFooter from "@/components/layout/SiteFooter";
import RouteAwareAdShell from "@/components/ad/RouteAwareAdShell";
import RouteNavigationButtons from "@/components/common/RouteNavigationButtons";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#020b1d] text-slate-100"
      suppressHydrationWarning
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Topbar />

        <div className="flex-1 px-3 pb-24 pt-4 md:px-6 md:py-6 lg:px-8 lg:pb-6">
          <div className="mx-auto max-w-6xl">
            <RouteNavigationButtons position="top" />
            <RouteAwareAdShell>{children}</RouteAwareAdShell>
            <RouteNavigationButtons position="bottom" />
          </div>
        </div>

        <SiteFooter />
      </div>

      <ScrollToTopButton />
      <MobileBottomNav />
    </div>
  );
}
