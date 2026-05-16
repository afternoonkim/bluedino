"use client";

import { useMemo, useState } from "react";

type AccountType = "general" | "preferred" | "taxOnly";

const MONTHLY_LIMIT = 500_000;
const YEARS = 3;
const TAX_RATE = 0.154;

function fmt(value: number) {
  return Math.round(value).toLocaleString("ko-KR");
}

function contributionRate(type: AccountType) {
  if (type === "preferred") return 0.12;
  if (type === "general") return 0.06;
  return 0;
}

export default function YouthFutureSavingsClient() {
  const [monthly, setMonthly] = useState<number>(500_000);
  const [baseRate, setBaseRate] = useState<number>(5);
  const [bonusRate, setBonusRate] = useState<number>(3);
  const [accountType, setAccountType] = useState<AccountType>("general");

  const result = useMemo(() => {
    const m = Math.min(Math.max(0, monthly), MONTHLY_LIMIT);
    const months = YEARS * 12;
    const principal = m * months;
    const avgMonths = (months + 1) / 2;
    const finalRate = baseRate + bonusRate;
    const interest = principal * (finalRate / 100) * (avgMonths / 12);
    const govtContribution = m * contributionRate(accountType) * months;
    const taxSaved = interest * TAX_RATE;
    const finalAmount = principal + interest + govtContribution;
    const taxableFinalAmount = principal + interest * (1 - TAX_RATE);
    return { principal, interest, govtContribution, taxSaved, finalAmount, taxableFinalAmount, diff: finalAmount - taxableFinalAmount, finalRate };
  }, [monthly, baseRate, bonusRate, accountType]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">청년미래적금 예상 수령액 계산기</h2>
      <p className="bd-text-sub mt-3">2026년 6월 출시 예정인 청년미래적금의 기본금리 5%, 기관별 우대금리 2~3%p, 일반형 6%·우대형 12% 정부기여금 구조를 가정해 3년 만기 예상액을 계산합니다.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 참고 시뮬레이션</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 5월 현재 공개 자료 기준</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-4">
        <label className="block"><span className="text-xs font-semibold text-slate-300">월 납입액 (원)</span><input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={10_000} min={0} /><span className="mt-2 block text-xs text-slate-400">월 납입 한도는 실제 출시 조건을 확인해 주세요. 기본값은 50만 원입니다.</span></label>
        <label className="block"><span className="text-xs font-semibold text-slate-300">기본금리 (%)</span><input type="number" value={baseRate} onChange={(e) => setBaseRate(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} /><span className="mt-2 block text-xs text-slate-400">공개 예시는 연 5% 기준</span></label>
        <label className="block"><span className="text-xs font-semibold text-slate-300">우대금리 (%p)</span><input type="number" value={bonusRate} onChange={(e) => setBonusRate(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} /><span className="mt-2 block text-xs text-slate-400">기관별 2~3%p 수준 가정</span></label>
        <label className="block"><span className="text-xs font-semibold text-slate-300">가입 유형</span><select value={accountType} onChange={(e) => setAccountType(e.target.value as AccountType)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"><option value="general">일반형 — 정부기여금 6%</option><option value="preferred">우대형 — 정부기여금 12%</option><option value="taxOnly">고소득 구간 — 비과세만 적용</option></select></label>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm leading-7 text-cyan-50">
        <p className="font-semibold text-white">기본 예시: 기본금리 5% + 우대금리 3%p = 최종 적용금리 {result.finalRate.toFixed(1)}%</p>
        <p className="mt-2 font-semibold text-cyan-100">출시 전 공개된 구조를 기준으로 한 예상 시뮬레이션입니다.</p>
        <p className="mt-2">월 50만 원, 3년 납입, 금리 8% 기준으로 일반형은 약 2,138만 원, 우대형은 약 2,255만 원 수준을 기대 시나리오로 참고할 수 있습니다. 실제 만기액은 우대금리 충족 여부와 정부기여금 지급 방식에 따라 달라질 수 있습니다.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 납입원금</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.principal)} 원</div></div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">정부기여금</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.govtContribution)} 원</div></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">비과세 이자</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.interest)} 원</div><div className="mt-1 text-xs text-slate-400">세금 절감 약 {fmt(result.taxSaved)} 원</div></div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">3년 만기 예상액</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.finalAmount)} 원</div></div>
      </div>

      <p className="mt-6 text-sm leading-7 text-slate-400">청년미래적금은 출시 전후 세부 조건, 취급 금융사, 월 납입 한도, 우대금리, 비과세 요건이 달라질 수 있습니다. 실제 적용 조건은 금융사, 세법, 정부 정책 변경에 따라 달라질 수 있습니다.</p>
    </section>
  );
}
