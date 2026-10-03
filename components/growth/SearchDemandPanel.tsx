import Link from "next/link";
import { searchDemandClusters, type SearchDemandCluster } from "@/lib/growth/searchDemand";

type Props = {
  title?: string;
  description?: string;
  keys?: SearchDemandCluster["key"][];
  limit?: number;
  compact?: boolean;
};

function pickClusters(keys?: SearchDemandCluster["key"][], limit?: number) {
  const base = keys?.length
    ? keys.flatMap((key) => searchDemandClusters.filter((cluster) => cluster.key === key))
    : searchDemandClusters;
  return typeof limit === "number" ? base.slice(0, limit) : base;
}

export default function SearchDemandPanel({
  title = "함께 확인하면 좋은 주제",
  description = "궁금한 주제를 선택하면 관련 계산기와 가이드를 함께 확인할 수 있습니다.",
  keys,
  limit,
  compact = false,
}: Props) {
  const clusters = pickClusters(keys, limit);

  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="bd-title-md">{title}</h2>
          <p className="bd-text-sub mt-2 max-w-3xl">{description}</p>
        </div>
        <Link href="/topics" className="bd-button-secondary shrink-0">관련 주제 보기</Link>
      </div>

      <div className={`mt-5 grid gap-4 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
        {clusters.map((cluster) => (
          <article key={cluster.key} className="rounded-3xl border border-slate-800 bg-slate-950/55 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bd-badge">{cluster.badge}</span>
              {cluster.tags.slice(0, 3).map((tag) => (
                <span key={`${cluster.key}-${tag}`} className="rounded-full border border-slate-800 bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-base font-bold leading-6 text-white md:text-lg">{cluster.title}</h3>
            {!compact ? (
              <>
                <p className="bd-text-main mt-2">{cluster.description}</p>
                <p className="bd-text-sub mt-3">{cluster.userNeed}</p>
              </>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {cluster.keywords.slice(0, compact ? 3 : 5).map((keyword) => (
                <span key={`${cluster.key}-${keyword}`} className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-100/90">
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              {cluster.links.slice(0, compact ? 3 : 4).map((link) => (
                <Link key={`${cluster.key}-${link.href}`} href={link.href} className={`group rounded-2xl border border-slate-800 bg-slate-950/65 px-3 transition hover:border-cyan-400/35 hover:bg-slate-900/90 ${compact ? "py-2.5" : "py-3"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-200">{link.label}</span>
                    <span className="text-xs font-semibold text-cyan-300">보기 →</span>
                  </div>
                  {!compact ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{link.description}</p> : null}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
