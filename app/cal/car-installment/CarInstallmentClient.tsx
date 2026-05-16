"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function CarInstallmentClient() {
  const [price, setPrice] = useState<number>(40_000_000);
  const [downPayment, setDownPayment] = useState<number>(10_000_000);
  const [rate, setRate] = useState<number>(5.0);
  const [months, setMonths] = useState<number>(36);

  const result = useMemo(() => {
    const loan = Math.max(0, price - downPayment);
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = monthlyRate === 0
      ? loan / months
      : (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loan;
    return { loan, monthlyPayment, totalPayment, totalInterest };
  }, [price, downPayment, rate, months]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">자동차 할부 계산기</h2>
      <p className="bd-text-sub mt-3">차량 가격·선수금·할부 금리·기간을 입력하면 월 할부금과 총이자를 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">차량 가격 (원)</span>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">선수금 (원)</span>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">할부 금리 (연 %)</span>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">할부 기간 (개월)</span>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={12} min={1} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월 할부금</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyPayment)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">할부 원금</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.loan)} 원</div>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-rose-200">총 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalInterest)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 상환액</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalPayment)} 원</div>
        </div>
      </div>
    </section>
  );
}
