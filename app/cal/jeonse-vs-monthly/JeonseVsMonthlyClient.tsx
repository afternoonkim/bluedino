"use client";

import { useMemo, useState } from "react";

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

/**
 * 월세 vs 전세 비교 계산기
 * - 전세: 보증금에 대한 대출 이자 + 보증금의 기회비용 = 월 부담
 * - 월세: 월세 + 보증금의 기회비용 = 월 부담
 */
export default function JeonseVsMonthlyClient() {
  const [jeonseDeposit, setJeonseDeposit] = useState<number>(300_000_000);
  const [jeonseLoanAmount, setJeonseLoanAmount] = useState<number>(240_000_000);
  const [jeonseLoanRate, setJeonseLoanRate] = useState<number>(3.5);

  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(20_000_000);
  const [monthlyRent, setMonthlyRent] = useState<number>(800_000);

  const [opportunityRate, setOpportunityRate] = useState<number>(3.0);

  const result = useMemo(() => {
    // 전세
    const jeonseOwnFunds = Math.max(0, jeonseDeposit - jeonseLoanAmount);
    const jeonseLoanInterestMonthly = (jeonseLoanAmount * (jeonseLoanRate / 100)) / 12;
    const jeonseOpportunityMonthly = (jeonseOwnFunds * (opportunityRate / 100)) / 12;
    const jeonseMonthlyCost = jeonseLoanInterestMonthly + jeonseOpportunityMonthly;

    // 월세
    const monthlyOpportunityMonthly = (monthlyDeposit * (opportunityRate / 100)) / 12;
    const monthlyTotalCost = monthlyRent + monthlyOpportunityMonthly;

    const diff = monthlyTotalCost - jeonseMonthlyCost;

    return {
      jeonseLoanInterestMonthly: Math.floor(jeonseLoanInterestMonthly),
      jeonseOpportunityMonthly: Math.floor(jeonseOpportunityMonthly),
      jeonseMonthlyCost: Math.floor(jeonseMonthlyCost),
      monthlyOpportunityMonthly: Math.floor(monthlyOpportunityMonthly),
      monthlyTotalCost: Math.floor(monthlyTotalCost),
      diff: Math.floor(diff),
    };
  }, [
    jeonseDeposit,
    jeonseLoanAmount,
    jeonseLoanRate,
    monthlyDeposit,
    monthlyRent,
    opportunityRate,
  ]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">월세 vs 전세 비교 계산기</span>
          <h1 className="bd-title-lg mt-4">월세 vs 전세 — 어느 쪽이 월 부담이 적을까</h1>
          <p className="bd-text-main mt-4">
            전세는 \"대출 이자 + 자기자본 기회비용\", 월세는 \"월세 + 보증금 기회비용\"으로 총 월 부담을 비교할 수 있습니다. 본인 자금 상황과 기회비용 가정을 입력해 비교해보세요.
          </p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">전세 조건</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-xs text-slate-300">전세 보증금 (원)</span>
              <input type="number" value={jeonseDeposit} onChange={(e) => setJeonseDeposit(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={1_000_000} />
            </label>
            <label className="block">
              <span className="text-xs text-slate-300">대출 금액 (원)</span>
              <input type="number" value={jeonseLoanAmount} onChange={(e) => setJeonseLoanAmount(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={1_000_000} />
            </label>
            <label className="block">
              <span className="text-xs text-slate-300">전세대출 금리 (%)</span>
              <input type="number" value={jeonseLoanRate} onChange={(e) => setJeonseLoanRate(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={0.1} />
            </label>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">월세 조건</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs text-slate-300">월세 보증금 (원)</span>
              <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={1_000_000} />
            </label>
            <label className="block">
              <span className="text-xs text-slate-300">월세 (원/월)</span>
              <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={50_000} />
            </label>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <label className="block">
            <span className="text-sm font-semibold text-white">자기자본 기회비용 (예: 예적금 금리, %)</span>
            <input type="number" value={opportunityRate} onChange={(e) => setOpportunityRate(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" step={0.1} />
            <span className="mt-2 block text-xs text-slate-400">전세 보증금 자기자본·월세 보증금이 다른 곳에 운용됐을 때 받을 수 있는 연 수익률 가정</span>
          </label>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">월 부담 비교</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">전세 월 부담</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.jeonseMonthlyCost)} 원</div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <div>· 대출 이자: {formatKRW(result.jeonseLoanInterestMonthly)} 원</div>
                <div>· 자기자본 기회비용: {formatKRW(result.jeonseOpportunityMonthly)} 원</div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">월세 월 부담</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.monthlyTotalCost)} 원</div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <div>· 월세: {formatKRW(monthlyRent)} 원</div>
                <div>· 보증금 기회비용: {formatKRW(result.monthlyOpportunityMonthly)} 원</div>
              </div>
            </div>
          </div>
          <div className={`mt-6 rounded-2xl border p-5 ${result.diff > 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10"}`}>
            <div className="text-sm font-semibold text-white">
              {result.diff > 0
                ? `전세가 월 ${formatKRW(Math.abs(result.diff))} 원 유리합니다.`
                : `월세가 월 ${formatKRW(Math.abs(result.diff))} 원 유리합니다.`}
            </div>
            <p className="mt-2 text-xs text-slate-300">
              ※ 보증금 보호·이사 비용·세제 혜택(월세 세액공제)·전세 사기 위험 등 비계량 요소는 별도 검토가 필요합니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
