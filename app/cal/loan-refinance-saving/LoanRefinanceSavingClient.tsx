"use client";

import { useMemo, useState } from "react";

function clampNumber(value: string, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min;
}

function amortize(principal: number, annualRate: number, months: number) {
  const monthlyRate = annualRate / 1200;
  const monthlyPayment = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  let outstanding = principal;
  let totalInterest = 0;
  let firstYearInterest = 0;
  const monthlyInterests: number[] = [];
  for (let month = 0; month < months; month++) {
    const interest = outstanding * monthlyRate;
    monthlyInterests.push(interest);
    totalInterest += interest;
    if (month < 12) firstYearInterest += interest;
    const principalPaid = Math.min(outstanding, Math.max(0, monthlyPayment - interest));
    outstanding = Math.max(0, outstanding - principalPaid);
  }
  return { monthlyPayment, totalInterest, firstYearInterest, monthlyInterests };
}

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
    const months = Math.max(1, Math.min(600, Math.round(remainingYears * 12)));
    const current = amortize(balance, oldRate, months);
    const next = amortize(balance, newRate, months);
    const totalCost = balance * (prepaymentFee / 100) + otherFees;
    const firstYearSaving = current.firstYearInterest - next.firstYearInterest;
    const totalSaving = current.totalInterest - next.totalInterest;
    const netGain = totalSaving - totalCost;
    let breakEvenMonths: number | null = null;
    if (totalSaving > 0) {
      let cumulativeInterestSaving = 0;
      for (let month = 0; month < months; month++) {
        cumulativeInterestSaving += current.monthlyInterests[month] - next.monthlyInterests[month];
        if (cumulativeInterestSaving >= totalCost) {
          breakEvenMonths = month + 1;
          break;
        }
      }
    }
    return {
      firstYearSaving, totalSaving, totalCost, netGain, breakEvenMonths,
      monthlyPaymentSaving: current.monthlyPayment - next.monthlyPayment,
    };
  }, [balance, oldRate, newRate, remainingYears, prepaymentFee, otherFees]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">대출 갈아타기 절감액 계산기</h2>
      <p className="bd-text-sub mt-3">원리금균등상환과 동일한 남은 만기를 가정해 기존·신규 대출의 이자 차이와 갈아타기 비용을 비교합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">대출 잔액 (원)</span>
          <input type="number" value={balance} onChange={(e) => setBalance(clampNumber(e.target.value, 0, 1_000_000_000_000))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">잔존 기간 (년)</span>
          <input type="number" value={remainingYears} onChange={(e) => setRemainingYears(clampNumber(e.target.value, 1, 50))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">기존 금리 (%)</span>
          <input type="number" value={oldRate} onChange={(e) => setOldRate(clampNumber(e.target.value, 0, 50))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">새 금리 (%)</span>
          <input type="number" value={newRate} onChange={(e) => setNewRate(clampNumber(e.target.value, 0, 50))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">중도상환수수료율 (%)</span>
          <input type="number" value={prepaymentFee} onChange={(e) => setPrepaymentFee(clampNumber(e.target.value, 0, 10))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">부대비용 (원, 설정비·인지세 등)</span>
          <input type="number" value={otherFees} onChange={(e) => setOtherFees(clampNumber(e.target.value, 0, 100_000_000_000))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">첫 12개월 이자 차이</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.firstYearSaving)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">월 상환액 차이</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyPaymentSaving)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">남은 기간 전체 이자 차이</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalSaving)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 비용 (수수료+부대)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalCost)} 원</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">이자 차이 기준 비용 회수</div>
          <div className="mt-2 text-xl font-bold text-white">
            {result.breakEvenMonths !== null ? `${result.breakEvenMonths}개월` : "기간 내 없음"}
          </div>
        </div>
        <div className={`rounded-2xl border p-5 ${result.netGain > 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10"}`}>
          <div className={`text-xs font-semibold uppercase tracking-wide ${result.netGain > 0 ? "text-emerald-200" : "text-rose-200"}`}>수수료 차감 후 이자 차이 ({remainingYears}년)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.netGain)} 원</div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-300">두 대출의 잔액·남은 만기·원리금균등상환 방식이 같고 금리가 변하지 않는다고 가정합니다. 비용 회수 시점은 월별 이자 차이의 누적액 기준이며, 그 시점의 남은 원금 차이까지 반영한 실제 갈아타기 손익은 아닙니다. 새 대출의 만기 변경·금리 변동·수수료 실제 견적에 따라 결과가 달라지므로 금융회사 상환예정표와 비교하세요.</p>
    </section>
  );
}
