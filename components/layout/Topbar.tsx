"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <div className="lg:hidden sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 px-4 py-4 text-white backdrop-blur">
      <Link href="/" className="pl-12 font-bold tracking-wide">🦕 BlueDino</Link>
    </div>
  );
}
