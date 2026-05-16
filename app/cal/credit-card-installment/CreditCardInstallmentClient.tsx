"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function CreditCardInstallmentClient() {
  const [amount, setAmount] = useState<number>(1_200_000);
  const [months, setMonths] = useState<number>(6);
  const [annualRate, setAnnualRate] = useState<number>(18.0);
  const [installmentType, setInstallmentType] = useState<"normal" | "free" | "partialFree">("normal");
  const [freeMonths, setFreeMonths] = useState<number>(3);

  const result = useMemo(() => {
    // 카드사 할부 수수료: 보통 분할원금 + 잔액 기준 수수료(연 환산)
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPrincipal = amount / months;
    let balance = amount;
    let totalFee = 0;
    const schedule: { month: number; principal: number; fee: number; total: number }[] = [];
    for (let i = 1; i <= months; i++) {
      const fee = installmentType === "free" || (installmentType === "partialFree" && i <= freeMonths) ? 0 : balance * monthlyRate;
      const totalThisMonth = monthlyPrincipal + fee;
      totalFee += fee;
      schedule.push({ month: i, principal: monthlyPrincipal, fee, total: totalThisMonth });
      balance -= monthlyPrincipal;
    }
    const monthlyAvg = (amount + totalFee) / months;
    return { totalFee, monthlyAvg, schedule };
  }, [amount, months, annualRate, installmentType, freeMonths]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">신용카드 할부 이자 계산기</h2>
      <p className="bd-text-sub mt-3">무이자 할부, 부분 무이자, 카드사 수수료율 직접 입력을 반영해 월별 청구액과 총 수수료를 계산합니다.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 참고 시뮬레이션</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 5월 현재 공개 자료 기준</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">결제 금액 (원)</span>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">할부 개월</span>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={2} max={36} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">할부 유형</span>
          <select value={installmentType} onChange={(e) => setInstallmentType(e.target.value as "normal" | "free" | "partialFree")} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white">
            <option value="normal">일반 할부</option>
            <option value="free">무이자 할부</option>
            <option value="partialFree">부분 무이자</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">부분 무이자 개월</span>
          <input type="number" value={freeMonths} onChange={(e) => setFreeMonths(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={0} max={36} />
          <span className="mt-2 block text-xs text-slate-400">부분 무이자 선택 시 초반 무이자 개월 입력</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">카드사 수수료율 직접 입력 (%)</span>
          <input type="number" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.5} min={0} />
          <span className="mt-2 block text-xs text-slate-400">신용카드 기준 보통 15~22%</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월 평균 부담</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyAvg)} 원</div>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-rose-200">총 수수료</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalFee)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 상환액</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(amount + result.totalFee)} 원</div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-2">회차</th>
              <th className="px-4 py-2">원금</th>
              <th className="px-4 py-2">수수료</th>
              <th className="px-4 py-2">월별 청구액</th>
            </tr>
          </thead>
          <tbody>
            {result.schedule.map((row) => (
              <tr key={row.month} className="border-t border-slate-800">
                <td className="px-4 py-2">{row.month}</td>
                <td className="px-4 py-2 tabular-nums">{fmt(row.principal)} 원</td>
                <td className="px-4 py-2 tabular-nums">{fmt(row.fee)} 원</td>
                <td className="px-4 py-2 tabular-nums font-semibold text-white">{fmt(row.total)} 원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">실제 할부 수수료는 카드사, 회원 등급, 행사 여부, 이용 개월 수에 따라 달라질 수 있습니다. 결제 전 카드사 앱의 최종 청구 예정 금액을 함께 확인해 주세요.</p>
    </section>
  );
}
