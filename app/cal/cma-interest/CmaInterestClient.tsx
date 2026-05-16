"use client";

import { useMemo, useState } from "react";

const TAX_RATE = 0.154;

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function CmaInterestClient() {
  const [principal, setPrincipal] = useState<number>(20_000_000);
  const [rate, setRate] = useState<number>(3.0);
  const [days, setDays] = useState<number>(365);

  const result = useMemo(() => {
    const interestPre = principal * (rate / 100) * (days / 365);
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const dailyNet = interestNet / days;
    return { interestPre, tax, interestNet, dailyNet };
  }, [principal, rate, days]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">CMA 이자 계산기</h2>
      <p className="bd-text-sub mt-3">매일 이자가 붙는 CMA(RP·MMF·발행어음) 계좌 기준 보유 기간별 이자를 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">예치 금액 (원)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">연 금리 (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">보유 기간 (일)</span>
          <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={30} min={1} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">일 평균 이자 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.dailyNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">세후 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세전 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestPre)} 원</div>
        </div>
      </div>
    </section>
  );
}
