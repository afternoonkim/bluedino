"use client";

import { useMemo, useState } from "react";

const TAX_RATE = 0.154;

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

// 빈 입력, 음수, 무한대 및 비정상적으로 큰 값이 결과를 깨뜨리지 않도록 제한합니다.
function safeInput(value: string, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(0, parsed)) : 0;
}

export default function CmaInterestClient() {
  const [principal, setPrincipal] = useState<number>(20_000_000);
  const [rate, setRate] = useState<number>(3.0);
  const [days, setDays] = useState<number>(365);

  const result = useMemo(() => {
    const safeDays = Math.max(1, Math.round(days));
    const interestPre = principal * (rate / 100) * (safeDays / 365);
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const dailyNet = interestNet / safeDays;
    return { interestPre, tax, interestNet, dailyNet };
  }, [principal, rate, days]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">CMA 이자 계산기</h2>
      <p className="bd-text-sub mt-3">입력한 연 수익률이 유지된다고 가정해 보유기간의 세전·세후 예상 수익을 계산합니다. CMA 유형에 따라 실제 정산과 원금손실 위험이 다릅니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">예치 금액 (원)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(safeInput(e.target.value, 1_000_000_000_000))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">가정한 연 수익률 (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(safeInput(e.target.value, 100))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">보유 기간 (일)</span>
          <input type="number" value={days} onChange={(e) => setDays(Math.max(1, Math.round(safeInput(e.target.value, 36_500))))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={30} min={1} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">일평균 예상 수익 (세후)</div>
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
      <p className="mt-5 text-xs leading-6 text-slate-400">잔액과 수익률이 일정하고 수익을 재투자하지 않는 단순 계산입니다. 일반적인 15.4% 원천징수를 가정하며, 일평균 금액은 실제 매일 지급액이 아닙니다. MMF·MMW형은 운용 실적에 따라 달라지고, RP·발행어음형도 약정·재투자 조건에 따라 결과가 달라질 수 있습니다.</p>
    </section>
  );
}
