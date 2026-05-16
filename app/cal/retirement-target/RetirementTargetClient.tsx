"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function RetirementTargetClient() {
  const [monthlyExpense, setMonthlyExpense] = useState<number>(3_000_000);
  const [years, setYears] = useState<number>(30);
  const [inflation, setInflation] = useState<number>(2.5);
  const [returnRate, setReturnRate] = useState<number>(5);
  const [currentAssets, setCurrentAssets] = useState<number>(50_000_000);
  const [yearsToRetire, setYearsToRetire] = useState<number>(25);

  const result = useMemo(() => {
    // 은퇴 시점 인플레이션 보정 월 생활비
    const inflatedMonthly = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    const inflatedYearly = inflatedMonthly * 12;
    const realReturn = (1 + returnRate / 100) / (1 + inflation / 100) - 1;
    // 필요 자산: PV of annuity formula
    let targetAssets = 0;
    if (realReturn === 0) {
      targetAssets = inflatedYearly * years;
    } else {
      targetAssets = inflatedYearly * ((1 - Math.pow(1 + realReturn, -years)) / realReturn);
    }
    // 매월 적립해야 할 금액 (FV 형성을 위해)
    const monthlyReturn = returnRate / 100 / 12;
    const totalMonths = yearsToRetire * 12;
    // 미래가치: 현재 자산이 복리 성장한 + 매월 적립의 미래가치
    const futureCurrent = currentAssets * Math.pow(1 + returnRate / 100, yearsToRetire);
    const remainingToFund = Math.max(0, targetAssets - futureCurrent);
    let monthlyContribution = 0;
    if (monthlyReturn === 0) {
      monthlyContribution = remainingToFund / totalMonths;
    } else {
      monthlyContribution = (remainingToFund * monthlyReturn) / (Math.pow(1 + monthlyReturn, totalMonths) - 1);
    }
    return { inflatedMonthly, targetAssets, monthlyContribution, futureCurrent, remainingToFund };
  }, [monthlyExpense, years, inflation, returnRate, currentAssets, yearsToRetire]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">은퇴 필요 자금 계산기</h2>
      <p className="bd-text-sub mt-3">월 노후 생활비·은퇴 기간·인플레이션·수익률을 입력하면 필요 자산과 매월 적립금을 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">현재 기준 월 노후 생활비 (원)</span>
          <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">은퇴 기간 (년)</span>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={5} min={1} />
          <span className="mt-2 block text-xs text-slate-400">평균 25~30년</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">은퇴까지 남은 기간 (년)</span>
          <input type="number" value={yearsToRetire} onChange={(e) => setYearsToRetire(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">현재 보유 자산 (원)</span>
          <input type="number" value={currentAssets} onChange={(e) => setCurrentAssets(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">연 수익률 (%)</span>
          <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.5} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">연 인플레이션 (%)</span>
          <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.5} min={0} />
          <span className="mt-2 block text-xs text-slate-400">평균 2~3%</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">은퇴 시점 월 생활비</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.inflatedMonthly)} 원</div>
          <div className="mt-1 text-xs text-slate-400">인플레이션 반영</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">필요 노후 자산</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.targetAssets)} 원</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">매월 적립 필요</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyContribution)} 원</div>
        </div>
      </div>
    </section>
  );
}
