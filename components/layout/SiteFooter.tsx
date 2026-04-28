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
                초보 투자자도 이해하기 쉬운 금융 계산기 · 가이드
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400">
              본 사이트의 계산 결과와 정보는 참고용입니다. BlueDino는 계산기와 가이드를 통해 판단에 필요한 정보를 쉽게 정리해 제공하며, 실제 세금·수익률·제도 적용 여부는 개인 상황과 정책 변경에 따라 달라질 수 있습니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterLink href="/company-analysis">기업분석</FooterLink>
            <FooterLink href="/info/etc/about">소개</FooterLink>
            <FooterLink href="/info/etc/contact">문의</FooterLink>
            <FooterLink href="/info/etc/privacy">개인정보처리방침</FooterLink>
            <FooterLink href="/info/etc/terms">이용약관</FooterLink>
            <FooterLink href="/info/etc/editorial-policy">콘텐츠 운영 원칙</FooterLink>
            <FooterLink href="/info/etc/methodology">작성 기준</FooterLink>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} BlueDino Platform. All rights reserved.
          </div>
          <div className="text-xs text-slate-500">
            운영 문의: <span className="text-slate-300">afternoonkim93@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}