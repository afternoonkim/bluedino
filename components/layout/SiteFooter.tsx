"use client";

import Link from "next/link";

const links = [
  ["소개", "/info/etc/about"], ["문의", "/info/etc/contact"], ["개인정보처리방침", "/info/etc/privacy"],
  ["이용약관", "/info/etc/terms"], ["콘텐츠 운영 원칙", "/info/etc/editorial-policy"], ["작성 기준", "/info/etc/methodology"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="font-bold text-white">BlueDino</div>
            <p className="mt-2 text-xs leading-6 text-slate-500">계산 결과와 금융 정보는 참고용입니다. 실제 세금·금리·대출·제도 적용 조건은 개인 상황과 금융회사, 정책 변경에 따라 달라질 수 있습니다.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map(([label, href]) => <Link key={href} href={href} className="text-xs font-medium text-slate-500 transition hover:text-slate-200">{label}</Link>)}
          </div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-5 text-xs text-slate-400">© {new Date().getFullYear()} BlueDino</div>
      </div>
    </footer>
  );
}
