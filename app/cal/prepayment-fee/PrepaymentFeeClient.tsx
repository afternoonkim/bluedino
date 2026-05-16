"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function PrepaymentFeeClient() {
  const [balance, setBalance] = useState<number>(300_000_000);
  const [prepayAmount, setPrepayAmount] = useState<number>(50_000_000);
  const [feeRate, setFeeRate] = useState<number>(1.2);
  const [yearsElapsed, setYearsElapsed] = useState<number>(2);
  const [feeFreeYear, setFeeFreeYear] = useState<number>(3);

  const result = useMemo(() => {
    // 일반적으로 중도상환수수료는 잔존 기간에 비례해 차감되는 슬라이딩 방식
    // 예: 3년차에 면제되는 상품 → 1년차 1.2%·2년차 0.8%·3년차 0%
    const yearsToFree = Math.max(0, feeFreeYear - yearsElapsed);
    const effectiveFeeRate = yearsToFree > 0 ? (feeRate * yearsToFree) / feeFreeYear : 0;
    const actualPrepayAmount = Math.min(balance, Math.max(0, prepayAmount));
    const fee = actualPrepayAmount * (effectiveFeeRate / 100);
    return { fee, effectiveFeeRate, yearsToFree, feeFree: yearsToFree === 0, actualPrepayAmount };
  }, [balance, prepayAmount, feeRate, yearsElapsed, feeFreeYear]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">중도상환수수료 계산기</h2>
      <p className="bd-text-sub mt-3">대출 잔액과 실제 중도상환금액을 나눠 입력해 일부 상환 시 예상 수수료를 추정합니다.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 제도 기준 반영</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 5월 현재 공개 자료 기준</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">대출 잔액 (원)</span>
          <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">중도상환금액 (원)</span>
          <input type="number" value={prepayAmount} onChange={(e) => setPrepayAmount(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">일부 상환이면 실제 갚을 금액만 입력</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">최초 수수료율 (%)</span>
          <input type="number" value={feeRate} onChange={(e) => setFeeRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
          <span className="mt-2 block text-xs text-slate-400">보통 0.8~1.5%</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">대출 경과 기간 (년)</span>
          <input type="number" value={yearsElapsed} onChange={(e) => setYearsElapsed(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">수수료 면제 시점 (년차)</span>
          <input type="number" value={feeFreeYear} onChange={(e) => setFeeFreeYear(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
          <span className="mt-2 block text-xs text-slate-400">보통 3~5년차에 면제</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">현재 적용 수수료율</div>
          <div className="mt-2 text-xl font-bold text-white">{result.effectiveFeeRate.toFixed(2)}%</div>
        </div>
        <div className={`rounded-2xl border p-5 ${result.feeFree ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10"}`}>
          <div className={`text-xs font-semibold uppercase tracking-wide ${result.feeFree ? "text-emerald-200" : "text-rose-200"}`}>예상 수수료</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.fee)} 원</div>
          {result.feeFree && <div className="mt-1 text-xs text-emerald-200">면제 시점 도달</div>}
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">면제까지 남은 기간</div>
          <div className="mt-2 text-xl font-bold text-white">{result.yearsToFree.toFixed(1)}년</div>
        </div>
      </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">계산식은 중도상환금액 × 수수료율 × 남은 부과기간 / 전체 부과기간 구조를 기준으로 단순화했습니다. 실제 적용 조건은 금융사, 대출 상품, 정부 정책 변경에 따라 달라질 수 있습니다.</p>
    </section>
  );
}
