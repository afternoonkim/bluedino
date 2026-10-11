import Link from "next/link";
import type { SpotlightCompany } from "@/lib/company-analysis/spotlightCompanies";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import ShareAndCite from "@/components/share/ShareAndCite";

type Props = {
  company: SpotlightCompany;
};

export default function SpotlightCompanyPage({ company }: Props) {
  const marketLabel = company.market === "korea" ? "국내기업" : "해외기업";

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/company-analysis" className="bd-badge">기업분석</Link>
            <Link href="/company-analysis/spotlight" className="bd-badge">요즘 관심기업</Link>
            <span className="bd-badge">{marketLabel}</span>
          </div>
          <h1 className="bd-title-xl mt-4">
            {company.companyNameKo}({company.ticker}) 주가 전망과 기업분석
          </h1>
          <p className="bd-text-main mt-4 max-w-4xl">{company.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">{company.exchange}</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">{company.sector}</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">최종 점검 {company.updatedAt}</span>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding border-amber-400/20 bg-amber-400/5">
          <span className="bd-badge">2026년 10월 최신 점검</span>
          <h2 className="bd-title-md mt-4">{company.headline}</h2>
          <p className="bd-text-sub mt-3">
            아래 내용은 단기 목표주가가 아니라 최근 실적·공시·산업 변화에서 달라진 부분을 확인하기 위한 요약입니다.
          </p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">사업 구조와 최근 변화</h2>
          <div className="bd-list mt-4">
            {company.business.map((item) => (
              <div key={item} className="bd-list-item">{item}</div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="bd-card bd-card-padding">
            <h2 className="bd-title-md">지금 확인할 체크포인트</h2>
            <div className="bd-list mt-4">
              {company.checkpoints.map((item) => (
                <div key={item} className="bd-list-item">{item}</div>
              ))}
            </div>
          </div>

          <div className="bd-card bd-card-padding">
            <h2 className="bd-title-md">주의해서 볼 리스크</h2>
            <div className="bd-list mt-4">
              {company.risks.map((item) => (
                <div key={item} className="bd-list-item">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-sm">참고한 최신 자료</h2>
          <div className="mt-4 flex flex-col gap-2">
            {company.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-cyan-200 hover:text-cyan-100"
              >
                {source.label} ↗
              </a>
            ))}
          </div>
        </section>

        <ShareAndCite
          title={`${company.companyNameKo}(${company.ticker}) 주가 전망과 기업분석`}
          url={`/company-analysis/spotlight/${company.slug}`}
        />
        <PageTrustFooter pageKind="기업분석" updatedAt={company.updatedAt} />
      </div>
    </div>
  );
}
