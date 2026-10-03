import Link from "next/link";
import { searchDemandClusters, type SearchDemandCluster } from "@/lib/growth/searchDemand";

type Props = {
  title?: string;
  description?: string;
  keys?: SearchDemandCluster["key"][];
  limit?: number;
  compact?: boolean;
};

const userFacingClusterCopy: Record<
  SearchDemandCluster["key"],
  { description: string; userNeed: string }
> = {
  "cash-calculators": {
    description:
      "CMA·파킹통장·배당처럼 금액을 넣어 바로 결과를 확인할 수 있는 계산기를 모았습니다.",
    userNeed:
      "먼저 숫자를 확인하고, 필요한 세금·한도·주의사항만 이어서 살펴보세요.",
  },
  "theme-stocks": {
    description:
      "관련 기업을 산업 단계와 실적 변수 기준으로 나눠 비교해보세요.",
    userNeed:
      "기업이 왜 같은 테마로 묶이는지와 실적에서 무엇을 확인할지 함께 살펴볼 수 있습니다.",
  },
  "company-check": {
    description:
      "기업의 사업 구조, 실적 변수와 관련 산업을 함께 보면 단기 주가 움직임보다 판단 기준을 세우기 쉽습니다.",
    userNeed:
      "회사가 무엇으로 돈을 벌고 다음 실적에서 무엇을 확인해야 하는지부터 살펴보세요.",
  },
  "account-guides": {
    description:
      "ISA·IRP처럼 조건이 복잡한 계좌는 핵심 답부터 확인하고 필요한 세부 내용만 이어서 보세요.",
    userNeed:
      "내 상황에서 가능한지와 가입 전에 확인할 조건을 짧은 질문으로 찾아볼 수 있습니다.",
  },
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
        {clusters.map((cluster) => {
          const copy = userFacingClusterCopy[cluster.key];

          return (
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
                  <p className="bd-text-main mt-2">{copy.description}</p>
                  <p className="bd-text-sub mt-3">{copy.userNeed}</p>
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
          );
        })}
      </div>
    </section>
  );
}
