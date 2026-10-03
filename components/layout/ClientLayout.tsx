"use client";

import Topbar from "@/components/layout/Topbar";
import SiteFooter from "@/components/layout/SiteFooter";
import RouteAwareAdShell from "@/components/ad/RouteAwareAdShell";
import RouteNavigationButtons from "@/components/common/RouteNavigationButtons";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020b1d] text-slate-100" suppressHydrationWarning>
      <Topbar />
      <div className="flex min-h-[calc(100vh-64px)] flex-col">
        <div className="flex-1 px-4 pb-24 pt-4 md:px-6 md:pb-8 md:pt-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
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
