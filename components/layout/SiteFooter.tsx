"use client";

import Link from "next/link";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} className="text-sm text-slate-300 hover:text-white transition">
    {children}
  </Link>
);

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">BlueDino</span>
              <span className="text-xs text-slate-400">
                계산기 · 데이터 기반 투자 도구
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400">
              본 사이트의 계산 결과와 정보는 참고용입니다. 실제 세금, 수익률,
              제도 적용 여부는 개인 상황과 정책 변경에 따라 달라질 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterLink href="/info/etc/about">소개</FooterLink>
            <FooterLink href="/info/etc/contact">문의</FooterLink>
            <FooterLink href="/info/etc/privacy">개인정보처리방침</FooterLink>
            <FooterLink href="/info/etc/terms">이용약관</FooterLink>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} BlueDino Platform. All rights reserved.
          </div>
          <div className="text-xs text-slate-500">
            {/* Contact: <span className="text-slate-300">support@bluedino.site</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}