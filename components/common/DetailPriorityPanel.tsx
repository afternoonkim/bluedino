import Link from "next/link";
import type { ReactNode } from "react";

type PriorityItem = {
  label: string;
  value: ReactNode;
};

type PriorityLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type DetailPriorityPanelProps = {
  eyebrow?: string;
  title: string;
  summary: ReactNode;
  items?: PriorityItem[];
  links?: PriorityLink[];
  note?: ReactNode;
  className?: string;
};

export default function DetailPriorityPanel({
  eyebrow = "먼저 볼 핵심",
  title,
  summary,
  items = [],
  links = [],
  note,
  className = "",
}: DetailPriorityPanelProps) {
  return (
    <section className={`bd-card-soft bd-card-padding ${className}`.trim()}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
          {eyebrow}
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-300">
          자세한 내용은 아래 접힌 카드에서 확인
        </span>
      </div>
      <h2 className="bd-title-md mt-4">{title}</h2>
      <div className="bd-text-main mt-4">{summary}</div>

      {items.length > 0 ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-4">
              <div className="text-xs font-semibold text-cyan-200">{item.label}</div>
              <div className="mt-2 text-sm leading-6 text-slate-300">{item.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.variant === "primary" ? "bd-button-primary" : "bd-button-secondary"}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}

      {note ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
          {note}
        </div>
      ) : null}
    </section>
  );
}
