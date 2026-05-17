"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";

function shouldUseLocalTopBottomAds(pathname: string) {
  return pathname === "/" || pathname.startsWith("/cal") || pathname.startsWith("/info");
}

function shouldShowSidebarRail(pathname: string) {
  return pathname !== "/" && !pathname.startsWith("/cal");
}

export default function RouteAwareAdShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  const { useLocalTopBottomAds, showSidebarRail } = useMemo(
    () => ({
      useLocalTopBottomAds: shouldUseLocalTopBottomAds(pathname),
      showSidebarRail: shouldShowSidebarRail(pathname),
    }),
    [pathname],
  );

  return (
    <>
      {!useLocalTopBottomAds ? (
        <AdBlock
          slotKey="top"
          label="전역 상단 보조 콘텐츠 영역"
          format="horizontal"
          className="mb-6"
        />
      ) : null}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">{children}</div>

        {showSidebarRail ? (
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-4">
              {/* 보조 콘텐츠 블록은 환경변수와 슬롯 값이 설정된 경우에만 표시됩니다. */}
              <AdBlock
                slotKey="sidebar"
                label="사이드 보조 콘텐츠 영역"
                format="rectangle"
                className="my-0"
              />
            </div>
          </aside>
        ) : null}
      </div>

      {!useLocalTopBottomAds ? (
        <AdBlock
          slotKey="bottom"
          label="전역 하단 보조 콘텐츠 영역"
          format="rectangle"
          className="mt-8"
        />
      ) : null}
    </>
  );
}
