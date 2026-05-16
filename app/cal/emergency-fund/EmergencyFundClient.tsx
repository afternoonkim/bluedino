"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

type Job = "stable" | "average" | "unstable";

export default function EmergencyFundClient() {
  const [monthlyExpense, setMonthlyExpense] = useState<number>(2_500_000);
  const [job, setJob] = useState<Job>("average");
  const [hasFamily, setHasFamily] = useState<boolean>(true);

  const result = useMemo(() => {
    let months = 3;
    if (job === "stable") months = 3;
    if (job === "average") months = 6;
    if (job === "unstable") months = 9;
    if (hasFamily) months += 2;
    if (job === "unstable" && hasFamily) months = 12;
    const fund = monthlyExpense * months;
    return { months, fund };
  }, [monthlyExpense, job, hasFamily]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">비상금 필요 금액 계산기</h2>
      <p className="bd-text-sub mt-3">월 생활비·직장 안정성·가족 구성을 입력하면 본인 상황에 맞는 적정 비상금을 추천합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">월 평균 생활비 (원)</span>
          <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">월세·관리비·식비·교통·통신 합계</span>
        </label>
        <div className="block">
          <span className="text-xs font-semibold text-slate-300">직장 안정성</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["stable", "average", "unstable"] as Job[]).map((j) => (
              <button key={j} type="button" onClick={() => setJob(j)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  job === j ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-200" : "border-slate-700 bg-slate-900/70 text-slate-300"
                }`}>
                {j === "stable" ? "안정 (공무원·정규직 10년+)" : j === "average" ? "보통 (일반 직장인)" : "불안정 (프리·계약직·자영업)"}
              </button>
            ))}
          </div>
        </div>
        <label className="block md:col-span-2">
          <input type="checkbox" checked={hasFamily} onChange={(e) => setHasFamily(e.target.checked)} className="mr-2" />
          <span className="text-sm text-slate-200">부양가족 있음 (자녀·배우자)</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">권장 비상금</div>
          <div className="mt-2 text-2xl font-bold text-white">{fmt(result.fund)} 원</div>
          <div className="mt-1 text-xs text-cyan-200">{result.months}개월치 생활비 기준</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">활용 추천</div>
          <p className="mt-2 text-sm leading-6 text-slate-300">파킹통장 또는 CMA에 보관해 즉시 인출 가능 + 약 3% 이자를 함께 받는 구조를 추천드립니다.</p>
        </div>
      </div>
    </section>
  );
}
