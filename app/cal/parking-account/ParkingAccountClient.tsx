"use client";

import { useMemo, useState } from "react";

const TAX_RATE = 0.154;

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function ParkingAccountClient() {
  const [principal, setPrincipal] = useState<number>(20_000_000);
  const [limit, setLimit] = useState<number>(100_000_000);
  const [rate, setRate] = useState<number>(3.5);
  const [overflowRate, setOverflowRate] = useState<number>(0.1);
  const [months, setMonths] = useState<number>(12);

  const result = useMemo(() => {
    const effectivePrincipal = Math.min(principal, limit);
    const overflow = Math.max(0, principal - limit);
    const interestPre = (effectivePrincipal * (rate / 100) + overflow * (overflowRate / 100)) * (months / 12);
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const monthlyNet = interestNet / months;
    return { effectivePrincipal, overflow, interestPre, tax, interestNet, monthlyNet };
  }, [principal, limit, rate, overflowRate, months]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">파킹통장 이자 계산기</h2>
      <p className="bd-text-sub mt-3">파킹통장의 우대 금리·한도·세금을 반영한 매월 이자와 누적 수령액을 계산합니다.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 공식 산식 기반</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 5월 현재 공개 자료 기준</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">예치 금액 (원)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">우대 금리 적용 한도 (원)</span>
          <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">초과분은 일반 입출금 금리 적용</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">한도 내 연 금리 (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">한도 초과분 적용 금리 (%)</span>
          <input type="number" value={overflowRate} onChange={(e) => setOverflowRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
          <span className="mt-2 block text-xs text-slate-400">은행별 일반 입출금 금리 또는 별도 고시 금리를 입력해 주세요.</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">보유 기간 (개월)</span>
          <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월 평균 이자 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">누적 세후 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">한도 초과분</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.overflow)} 원</div>
          <div className="mt-1 text-xs text-slate-400">{result.overflow > 0 ? "초과분 별도 금리 적용" : "한도 내"}</div>
        </div>
      </div>
    </section>
  );
}
