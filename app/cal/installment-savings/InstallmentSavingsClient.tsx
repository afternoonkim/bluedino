"use client";

import { useMemo, useState } from "react";

const TAX_RATE = 0.154;

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function InstallmentSavingsClient() {
  const [monthly, setMonthly] = useState<number>(500_000);
  const [months, setMonths] = useState<number>(24);
  const [rate, setRate] = useState<number>(3.5);

  const result = useMemo(() => {
    const principal = monthly * months;
    // 적금 이자 공식: P × r × (n × (n+1) / 2) / 12 (월별 평균 적립 기간 반영)
    const interestPre = (monthly * (rate / 100) * (months * (months + 1) / 2)) / 12;
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const total = principal + interestNet;
    return { principal, interestPre, tax, interestNet, total };
  }, [monthly, months, rate]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">적금 이자 계산기</h2>
      <p className="bd-text-sub mt-3">매월 정해진 금액을 납입하는 정기적금 기준 세전·세후 이자를 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">월 납입액 (원)</span>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={10_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">만기 (개월)</span>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">연 금리 (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">원금 합계</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.principal)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세전 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestPre)} 원</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">세후 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">만기 수령액</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.total)} 원</div>
        </div>
      </div>
    </section>
  );
}
