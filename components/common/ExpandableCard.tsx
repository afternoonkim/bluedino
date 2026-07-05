import type { ReactNode } from "react";

type ExpandableCardProps = {
  title: string;
  eyebrow?: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "solid" | "soft";
  className?: string;
};

export default function ExpandableCard({
  title,
  eyebrow,
  summary,
  children,
  defaultOpen = false,
  variant = "solid",
  className = "",
}: ExpandableCardProps) {
  const cardClass = variant === "soft" ? "bd-card-soft" : "bd-card";

  return (
    <details
      open={defaultOpen}
      className={`${cardClass} bd-card-padding group ${className}`.trim()}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-300/70 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          {eyebrow ? (
            <span className="mb-2 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="bd-title-md">{title}</h2>
          {summary ? <p className="bd-text-sub mt-2">{summary}</p> : null}
        </div>
        <span className="mt-1 shrink-0 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-300 transition group-open:border-cyan-400/40 group-open:text-cyan-200">
          <span className="group-open:hidden">펼쳐보기</span>
          <span className="hidden group-open:inline">접기</span>
        </span>
      </summary>
      <div className="mt-5 border-t border-white/10 pt-5">{children}</div>
    </details>
  );
}
