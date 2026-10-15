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
    const safePrincipal = Math.max(0, principal);
    const safeLimit = Math.max(0, limit);
    const safeRate = Math.max(0, rate);
    const safeOverflowRate = Math.max(0, overflowRate);
    const safeMonths = Math.max(1, months);
    const effectivePrincipal = Math.min(safePrincipal, safeLimit);
    const overflow = Math.max(0, safePrincipal - safeLimit);
    const interestPre = (effectivePrincipal * (safeRate / 100) + overflow * (safeOverflowRate / 100)) * (safeMonths / 12);
    const tax = interestPre * TAX_RATE;
    const interestNet = interestPre - tax;
    const monthlyNet = interestNet / safeMonths;
    return { effectivePrincipal, overflow, interestPre, tax, interestNet, monthlyNet };
  }, [principal, limit, rate, overflowRate, months]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">파킹통장 이자 계산기</h2>
      <p className="bd-text-sub mt-3">한도 내·초과분 금리를 나누어 세후 예상 이자와 월평균 금액을 계산합니다. 실제 월별 지급액은 다를 수 있습니다.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">단순 예시: 일정 잔액·금리 가정</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">세금: 일반적인 15.4% 원천징수 가정</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">예치 금액 (원)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">우대 금리 적용 한도 (원)</span>
          <input type="number" value={limit} onChange={(e) => setLimit(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">초과분은 아래에 입력한 금리 적용</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">한도 내 연 금리 (%)</span>
          <input type="number" value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">한도 초과분 적용 금리 (%)</span>
          <input type="number" value={overflowRate} onChange={(e) => setOverflowRate(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
          <span className="mt-2 block text-xs text-slate-400">상품설명서에 표시된 한도 초과분 적용금리를 입력해 주세요.</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">보유 기간 (개월)</span>
          <input type="number" value={months} onChange={(e) => setMonths(Math.max(1, Number(e.target.value) || 1))}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월평균 예상 이자 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">보유기간 예상 이자 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.interestNet)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">한도 초과분</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.overflow)} 원</div>
          <div className="mt-1 text-xs text-slate-400">{result.overflow > 0 ? "초과분 별도 금리 적용" : "한도 내"}</div>
        </div>
      </div>
      <p className="mt-5 text-xs leading-6 text-slate-400">보유기간 동안 잔액과 금리가 일정하다는 가정의 단순 계산입니다. 실제 은행은 일별 잔액·금리·이자 지급일·원 단위 처리에 따라 정산하며, 월평균 금액은 실제 매월 입금액이 아닙니다.</p>
    </section>
  );
}
