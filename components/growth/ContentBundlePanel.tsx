import Link from "next/link";
import { contentBundles, type ContentBundle } from "@/lib/growth/contentBundles";

type Props = {
  title?: string;
  description?: string;
  slugs?: string[];
  limit?: number;
  compact?: boolean;
};

function pickBundles(slugs?: string[], limit?: number): ContentBundle[] {
  const base = slugs?.length
    ? slugs.flatMap((slug) => contentBundles.filter((bundle) => bundle.slug === slug))
    : contentBundles;
  return typeof limit === "number" ? base.slice(0, limit) : base;
}

export default function ContentBundlePanel({
  title = "분야별로 이어서 보는 콘텐츠 묶음",
  description = "계산기 하나, 관련주 하나에서 끝나지 않도록 사용자가 다음으로 궁금해할 계산기·가이드·산업 페이지를 같은 흐름으로 묶었습니다.",
  slugs,
  limit,
  compact = false,
}: Props) {
  const bundles = pickBundles(slugs, limit);

  if (!bundles.length) return null;

  return (
    <section className="bd-card bd-card-padding">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="bd-title-md">{title}</h2>
          <p className="bd-text-sub mt-2 max-w-3xl">{description}</p>
        </div>
        <Link href="/topics" className="bd-button-secondary shrink-0">묶음 전체보기</Link>
      </div>

      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
        {bundles.map((bundle) => (
          <article key={bundle.slug} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bd-badge">{bundle.badge}</span>
              {bundle.keywords.slice(0, compact ? 2 : 3).map((keyword) => (
                <span key={`${bundle.slug}-${keyword}`} className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-100/90">
                  {keyword}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-base font-bold leading-6 text-white md:text-lg">{bundle.title}</h3>
            <p className="bd-text-main mt-2">{compact ? bundle.userNeed : bundle.summary}</p>
            <div className="mt-4 grid gap-2">
              {bundle.sections.flatMap((section) => section.links).slice(0, compact ? 3 : 4).map((link) => (
                <Link key={`${bundle.slug}-${link.href}`} href={link.href} className="group rounded-2xl border border-slate-800 bg-slate-950/65 px-3 py-3 transition hover:border-cyan-400/35 hover:bg-slate-900/90">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-200">{link.label}</span>
                    <span className="text-xs font-semibold text-cyan-300">보기 →</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{link.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href={`/topics/${bundle.slug}`} className="bd-button-primary w-full justify-center text-center">
                이 흐름으로 보기
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
