"use client";

import { usePathname } from "next/navigation";
import AdFitAd from "@/components/ad/AdFitAd";

function shouldShowTopAd(pathname: string) {
  return pathname !== "/" && !pathname.startsWith("/cal");
}

function shouldShowSidebarRail(pathname: string) {
  return pathname !== "/" && !pathname.startsWith("/cal");
}

export default function RouteAwareAdShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  return (
    <>
      {shouldShowTopAd(pathname) ? (
        <AdFitAd
          variant="top"
          label="페이지 상단 스폰서 배너"
          className="mb-5 mt-0 hidden rounded-2xl border border-white/5 bg-slate-950/20 px-2 py-3 md:flex"
        />
      ) : null}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">{children}</div>

        {shouldShowSidebarRail(pathname) ? (
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              <AdFitAd
                variant="middle"
                label="사이드 스폰서 배너"
                className="my-0 rounded-2xl border border-white/5 bg-slate-950/20 px-2 py-4"
              />
            </div>
          </aside>
        ) : null}
      </div>

      <AdFitAd
        variant="bottom"
        label="페이지 하단 스폰서 배너"
        className="mt-8 rounded-2xl border border-white/5 bg-slate-950/20 px-2 py-4"
      />
    </>
  );
}
