"use client";

import Link from "next/link";

export type OfficialSource = string | { label: string; href: string };

type CalculatorReferenceBoxProps = {
  sources: OfficialSource[];
  note?: string;
};

export default function CalculatorReferenceBox({ sources, note }: CalculatorReferenceBoxProps) {
  return (
    <section className="bd-card-soft bd-card-padding">
      <h2 className="bd-title-md">공식 참고 기준</h2>
      <p className="bd-text-main mt-3">
        계산 결과를 실제 의사결정에 활용하기 전에는 아래 기관의 최신 안내와 금융회사별 약관을 함께 확인해 주세요.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {sources.map((source) => {
          const label = typeof source === "string" ? source : source.label;
          const href = typeof source === "string" ? undefined : source.href;

          return href ? (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-200"
            >
              {label} <span className="text-xs text-cyan-300">↗</span>
            </a>
          ) : (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200">
              {label}
            </div>
          );
        })}
      </div>
      {note ? <p className="mt-4 text-sm leading-7 text-slate-400">{note}</p> : null}
    </section>
  );
}

type RelatedCalculatorLink = {
  label: string;
  href: string;
  description?: string;
};

type RelatedCalculatorLinksProps = {
  links: RelatedCalculatorLink[];
  title?: string;
};

export function RelatedCalculatorLinks({ links, title = "함께 보면 좋은 계산기" }: RelatedCalculatorLinksProps) {
  return (
    <section className="bd-card-soft bd-card-padding">
      <h2 className="bd-title-md">{title}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:bg-cyan-400/10">
            <span className="block text-sm font-bold text-white">{link.label}</span>
            {link.description ? <span className="mt-2 block text-xs leading-6 text-slate-400">{link.description}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
