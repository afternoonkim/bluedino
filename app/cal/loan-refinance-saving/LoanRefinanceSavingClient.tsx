"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function LoanRefinanceSavingClient() {
  const [balance, setBalance] = useState<number>(400_000_000);
  const [oldRate, setOldRate] = useState<number>(5.0);
  const [newRate, setNewRate] = useState<number>(4.0);
  const [remainingYears, setRemainingYears] = useState<number>(20);
  const [prepaymentFee, setPrepaymentFee] = useState<number>(1.2);
  const [otherFees, setOtherFees] = useState<number>(2_000_000);

  const result = useMemo(() => {
    const yearlySaving = balance * ((oldRate - newRate) / 100);
    const totalSaving = yearlySaving * remainingYears;
    const totalCost = balance * (prepaymentFee / 100) + otherFees;
    const netGain = totalSaving - totalCost;
    const breakEvenYears = yearlySaving > 0 ? totalCost / yearlySaving : Infinity;
    return { yearlySaving, totalSaving, totalCost, netGain, breakEvenYears };
  }, [balance, oldRate, newRate, remainingYears, prepaymentFee, otherFees]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">대출 갈아타기 절감액 계산기</h2>
      <p className="bd-text-sub mt-3">기존 금리와 새 금리·중도상환수수료·부대비용을 반영해 손익분기점과 순절감액을 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">대출 잔액 (원)</span>
          <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">잔존 기간 (년)</span>
          <input type="number" value={remainingYears} onChange={(e) => setRemainingYears(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">기존 금리 (%)</span>
          <input type="number" value={oldRate} onChange={(e) => setOldRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">새 금리 (%)</span>
          <input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">중도상환수수료율 (%)</span>
          <input type="number" value={prepaymentFee} onChange={(e) => setPrepaymentFee(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">부대비용 (원, 설정비·인지세 등)</span>
          <input type="number" value={otherFees} onChange={(e) => setOtherFees(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">연 이자 절감</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.yearlySaving)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 비용 (수수료+부대)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalCost)} 원</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">손익분기점</div>
          <div className="mt-2 text-xl font-bold text-white">
            {Number.isFinite(result.breakEvenYears) ? `${result.breakEvenYears.toFixed(1)}년` : "—"}
          </div>
        </div>
        <div className={`rounded-2xl border p-5 ${result.netGain > 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10"}`}>
          <div className={`text-xs font-semibold uppercase tracking-wide ${result.netGain > 0 ? "text-emerald-200" : "text-rose-200"}`}>순 절감액 ({remainingYears}년)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.netGain)} 원</div>
        </div>
      </div>
    </section>
  );
}
