import type { Metadata } from "next";
import Link from "next/link";
import { spotlightCompanies } from "@/lib/company-analysis/spotlightCompanies";

export const metadata: Metadata = {
  title: "요즘 관심기업 분석 | AI·전력·우주·SMR | BlueDino",
  description:
    "최근 시장에서 관심이 커진 AI 인프라, 우주, SMR, 전력기기 기업을 최신 이슈와 투자 체크포인트 중심으로 확인하세요.",
  alternates: { canonical: "/company-analysis/spotlight" },
};

export default function CompanySpotlightPage() {
  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">기업분석 · 요즘 관심기업</span>
          <h1 className="bd-title-xl mt-4">최근 산업 변화가 큰 기업부터 먼저 확인하세요</h1>
          <p className="bd-text-main mt-4 max-w-4xl">
            AI 컴퓨팅, 데이터센터 전력, 우주, SMR처럼 변화 속도가 빠른 분야는 기존 기업 소개만으로 부족합니다.
            최근 실적·수주·자금조달·규제 변화를 기준으로 핵심 체크포인트를 따로 정리했습니다.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {spotlightCompanies.map((company) => (
            <Link
              key={company.slug}
              href={`/company-analysis/spotlight/${company.slug}`}
              className="bd-card bd-card-padding transition hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="bd-badge">{company.market === "korea" ? "국내" : "해외"}</span>
                <span className="text-xs font-semibold text-slate-400">{company.exchange} · {company.ticker}</span>
              </div>
              <h2 className="bd-title-md mt-4">{company.companyNameKo}</h2>
              <p className="bd-text-sub mt-3">{company.summary}</p>
              <div className="mt-4 text-sm font-semibold text-cyan-200">최신 분석 보기 →</div>
            </Link>
          ))}
        </section>

        <section className="bd-card-soft bd-card-padding">
          <p className="bd-text-sub">
            이 목록은 특정 종목의 매수·매도 추천이 아니라 최근 변화가 커서 다시 확인할 가치가 높은 기업을 우선 정리한 것입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
