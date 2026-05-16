"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function MonthlyBudgetClient() {
  const [income, setIncome] = useState<number>(3_500_000);
  const [needsPct, setNeedsPct] = useState<number>(50); // 필수 지출
  const [wantsPct, setWantsPct] = useState<number>(30); // 자유 지출
  const [savingsPct, setSavingsPct] = useState<number>(20); // 저축·투자

  const result = useMemo(() => {
    const needs = income * (needsPct / 100);
    const wants = income * (wantsPct / 100);
    const savings = income * (savingsPct / 100);
    const sum = needsPct + wantsPct + savingsPct;
    return { needs, wants, savings, sum };
  }, [income, needsPct, wantsPct, savingsPct]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">월 지출 예산 계산기 (50/30/20 룰)</h2>
      <p className="bd-text-sub mt-3">월 소득을 필수 지출 50%, 자유 지출 30%, 저축·투자 20% 비율로 자동 분배합니다. 본인 상황에 맞게 비율을 조정해 보세요.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-xs font-semibold text-slate-300">월 소득 (원, 세후)</span>
          <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">필수 지출 (%)</span>
          <input type="number" value={needsPct} onChange={(e) => setNeedsPct(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={5} min={0} max={100} />
          <span className="mt-2 block text-xs text-slate-400">월세·식비·교통·통신·보험 등</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">자유 지출 (%)</span>
          <input type="number" value={wantsPct} onChange={(e) => setWantsPct(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={5} min={0} max={100} />
          <span className="mt-2 block text-xs text-slate-400">외식·여행·취미·쇼핑</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">저축·투자 (%)</span>
          <input type="number" value={savingsPct} onChange={(e) => setSavingsPct(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={5} min={0} max={100} />
          <span className="mt-2 block text-xs text-slate-400">비상금·예적금·ETF·연금</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">필수 지출 ({needsPct}%)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.needs)} 원</div>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-200">자유 지출 ({wantsPct}%)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.wants)} 원</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">저축·투자 ({savingsPct}%)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.savings)} 원</div>
        </div>
      </div>

      {result.sum !== 100 && (
        <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          합계가 {result.sum}%입니다. 세 항목의 합이 100%가 되도록 조정해 주세요.
        </div>
      )}
    </section>
  );
}
