"use client";

import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 px-4 py-3 text-white backdrop-blur lg:hidden">
      <Link href="/" className="mx-auto flex w-fit items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm font-bold tracking-wide">
        <Image src="/favicon-32x32.png" alt="BlueDino" width={22} height={22} />
        BlueDino
      </Link>
    </header>
  );
}
