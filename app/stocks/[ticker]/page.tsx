import type { Metadata } from "next";
import { notFound } from "next/navigation";

import StockHero from "@/components/stocks/StockHero";
import StockPriceChart from "@/components/stocks/StockPriceChart";
import StockMetricCards from "@/components/stocks/StockMetricCards";
import StockFinancialTable from "@/components/stocks/StockFinancialTable";
import StockScoreCard from "@/components/stocks/StockScoreCard";
import StockCheckpoints from "@/components/stocks/StockCheckpoints";
import StockStatusMessage from "@/components/stocks/StockStatusMessage";
import StockSearchForm from "@/components/stocks/StockSearchForm";
import StockCompanySummary from "@/components/stocks/StockCompanySummary";

import { buildStockAnalysis } from "@/lib/stocks/buildStockAnalysis";
import { buildCompanySummary } from "@/lib/stocks/buildCompanySummary";

type PageProps = {
  params: Promise<{
    ticker: string;
  }>;
};

function normalizeTicker(rawTicker: string) {
  return rawTicker.trim().toUpperCase();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticker } = await params;
  const normalizedTicker = normalizeTicker(ticker);

  try {
    const analysis = await buildStockAnalysis(normalizedTicker);

    const companyName =
      analysis?.profile?.companyName ||
      normalizedTicker;

    return {
      title: `${normalizedTicker} 기업분석 | ${companyName} 주가·재무지표`,
      description: `${companyName}의 현재 주가, 핵심 재무지표, 재무 추이, BlueDino 점수를 한 페이지에서 확인할 수 있습니다.`,
    };
  } catch {
    return {
      title: `${normalizedTicker} 기업분석 | BlueDino`,
      description: `${normalizedTicker} 미국 기업의 주가와 재무지표를 확인할 수 있습니다.`,
    };
  }
}

function hasMeaningfulMetrics(
  metrics?: Array<{ value?: string | null }>
) {
  if (!metrics || metrics.length === 0) return false;
  return metrics.some((item) => {
    const value = item?.value?.trim();
    return value && value !== "-" && value !== "-%";
  });
}

export default async function StockDetailPage({ params }: PageProps) {
  const { ticker } = await params;
  const normalizedTicker = normalizeTicker(ticker);

  const analysis = await buildStockAnalysis(normalizedTicker);

  if (!analysis) {
    notFound();
  }

  const status = analysis.status;

  if (status === "not_found") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-white md:text-2xl">미국 기업분석</h1>
            <p className="mt-2 text-sm text-slate-400">
              미국 일반 기업 티커를 입력해 현재 주가, 재무지표, 점수 정보를 확인해보세요.
            </p>
          </div>
          <StockSearchForm />
        </div>

        <StockStatusMessage
          title="입력한 티커를 찾을 수 없습니다"
          description="티커를 다시 확인해보세요. 현재는 미국 일반 기업만 분석을 지원합니다."
          ticker={normalizedTicker}
          severity="error"
        />
      </div>
    );
  }

  if (status === "unsupported") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <StockSearchForm />
        </div>

        <StockStatusMessage
          title="현재 BlueDino 기업분석 대상이 아닌 종목입니다"
          description="현재는 미국 일반 기업 중심으로 분석을 지원하며, ETF·리츠·펀드 등은 제외됩니다."
          ticker={normalizedTicker}
          severity="warning"
        />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <StockSearchForm />
        </div>

        <StockStatusMessage
          title="기업 데이터를 불러오는 중 문제가 발생했습니다"
          description="일시적인 데이터 공급 오류일 수 있습니다. 잠시 후 다시 시도해보세요."
          ticker={normalizedTicker}
          severity="error"
        />
      </div>
    );
  }

  const companySummaryLines = buildCompanySummary({
    companyName: analysis.profile?.companyName,
    exchange: analysis.profile?.exchange,
    exchangeShortName: analysis.profile?.exchangeShortName,
    sector: analysis.profile?.sector,
    industry: analysis.profile?.industry,
    marketCap: analysis.quote?.marketCap ?? analysis.profile?.marketCap,
    currentPrice: analysis.quote?.price,
  });

  const isFinancialSector =
    (analysis.profile?.sector || "").toLowerCase().includes("financial");

  const hasHero = Boolean(analysis.profile && analysis.quote);
  const hasChart = Boolean(analysis.chart && analysis.chart.length > 0);
  const hasMetrics = hasMeaningfulMetrics(analysis.metrics);
  const hasFinancials = Boolean(analysis.financials && analysis.financials.length > 0);
  const hasScore = Boolean(analysis.score);
  const hasCheckpoints = Boolean(
    analysis.checkpoints &&
      ((analysis.checkpoints.positives?.length ?? 0) > 0 ||
        (analysis.checkpoints.cautions?.length ?? 0) > 0)
  );

  return (
    <div className="space-y-6">
      {status !== "partial" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-white md:text-2xl">
              {normalizedTicker} 기업분석
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              현재 주가, 핵심 재무지표, 재무 추이와 BlueDino 점수를 함께 확인할 수 있습니다.
            </p>
          </div>
          <StockSearchForm />
        </div>
      )}

      {status === "partial" && (
        <StockStatusMessage
          title="일부 데이터만 제공됩니다"
          description="현재 이 종목은 일부 재무 데이터가 부족해 제한된 분석만 제공합니다."
          ticker={normalizedTicker}
          severity="warning"
        />
      )}

      {hasHero ? (
        <StockHero
          profile={analysis.profile!}
          quote={analysis.quote!}
        />
      ) : (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bd-badge">미국 기업 분석</span>
            {analysis.profile?.exchangeShortName ? (
              <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                {analysis.profile.exchangeShortName}
              </span>
            ) : null}
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              {analysis.profile?.companyName || normalizedTicker}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-1 font-semibold text-white">
                {analysis.profile?.symbol || normalizedTicker}
              </span>
              {analysis.profile?.sector ? <span>{analysis.profile.sector}</span> : null}
              {analysis.profile?.industry ? <span>· {analysis.profile.industry}</span> : null}
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            현재 이 종목은 시세 또는 일부 핵심 데이터가 제한되어 상단 요약 카드를 모두 표시하지 못했습니다.
            가능한 범위의 기업 정보와 설명만 우선 제공합니다.
          </p>
        </section>
      )}

      {isFinancialSector && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
          금융 업종은 일반 기업과 재무 해석 기준이 다를 수 있습니다. 부채 관련 지표와 밸류에이션은
          업종 특성을 함께 고려해서 보는 것이 좋습니다.
        </div>
      )}

      {hasScore ? (
        <StockScoreCard score={analysis.score!} />
      ) : null}

      {hasCheckpoints ? (
        <StockCheckpoints checkpoints={analysis.checkpoints!} />
      ) : null}

      <StockCompanySummary lines={companySummaryLines} />

      {hasChart ? (
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-white md:text-xl">주가 흐름</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              최근 1년 가격 흐름을 통해 현재 주가가 어떤 구간에 위치해 있는지 빠르게 확인할 수 있습니다.
            </p>
          </div>
          <StockPriceChart data={analysis.chart || []} />
        </section>
      ) : null}

      {hasMetrics ? (
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-white md:text-xl">현재 주가와 재무지표 비교</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              주가만 보지 않고 밸류에이션과 수익성 지표를 함께 보면서 현재 시장 평가 수준을 점검합니다.
            </p>
          </div>
          <StockMetricCards metrics={analysis.metrics || []} />
        </section>
      ) : null}

      {hasFinancials ? (
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-white md:text-xl">재무 추이</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              최근 연도별 매출, 영업이익, 순이익, EPS 흐름을 통해 기업 체력이 어떻게 변해왔는지 확인할 수 있습니다.
            </p>
          </div>
          <StockFinancialTable financials={analysis.financials || []} />
        </section>
      ) : null}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm leading-6 text-slate-400">
        본 페이지는 투자 참고용 정보입니다. 실제 투자 판단과 책임은 이용자 본인에게 있습니다.
      </div>
    </div>
  );
}