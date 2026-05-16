"use client";

import { useMemo, useRef, useState } from "react";
import CalculatorShareTools from "../components/CalculatorShareTools";

const TAX_RATE = 0.154;

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

function getInitialNumber(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const value = Number(new URLSearchParams(window.location.search).get(key));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export default function DepositInterestClient() {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [principal, setPrincipal] = useState<number>(() => getInitialNumber("principal", 10_000_000));
  const [months, setMonths] = useState<number>(() => getInitialNumber("months", 12));
  const [rate, setRate] = useState<number>(() => getInitialNumber("rate", 3.5));

  const result = useMemo(() => {
    const interestPre = principal * (rate / 100) * (months / 12);
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const total = principal + interestNet;
    return { interestPre, tax, interestNet, total };
  }, [principal, months, rate]);

  const updateShareUrl = () => {
    const params = new URLSearchParams({
      principal: String(principal),
      rate: String(rate),
      months: String(months),
    });
    window.history.replaceState(null, "", `/cal/deposit-interest?${params.toString()}`);
  };

  const resetInputs = () => {
    setPrincipal(10_000_000);
    setMonths(12);
    setRate(3.5);
    window.history.replaceState(null, "", "/cal/deposit-interest");
  };

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">예금 이자 계산기</h2>
      <p className="bd-text-sub mt-3">단리·만기 일시 지급식 정기예금 기준 세전·세후 이자를 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">예치 원금 (원)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
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

      <div ref={resultRef} className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세전 이자</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestPre)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세금 (15.4%)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.tax)} 원</div>
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
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="bd-button-secondary" onClick={updateShareUrl}>현재 입력값 URL에 저장</button>
      </div>
      <CalculatorShareTools
        title="예금 이자 계산기"
        summary={`예치 원금 ${fmt(principal)}원, 연 ${rate}%, ${months}개월 기준 세후 이자 ${fmt(result.interestNet)}원, 만기 수령액 ${fmt(result.total)}원`}
        resultRef={resultRef}
        onReset={resetInputs}
      />
    </section>
  );
}
