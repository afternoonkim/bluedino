"use client";

import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="lg:hidden sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 px-4 py-4 text-white backdrop-blur">
      <Link href="/" className="pl-12 flex items-center gap-2 font-bold tracking-wide">
      <Image
        src="/favicon-32x32.png"
        alt="BlueDino"
        width={24}
        height={24}
      />
      BlueDino
    </Link>
    </div>
  );
}
