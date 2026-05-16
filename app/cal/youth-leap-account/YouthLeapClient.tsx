"use client";

import { useMemo, useState } from "react";

const MONTHLY_LIMIT = 700_000;
const REGULAR_SAVINGS_RATE = 0.035;
const YEARS = 5;

type MatchRule = {
  maxSalary: number;
  baseLimit: number;
  baseRate: number;
  extraRate: number;
  label: string;
};

const MATCH_RULES: MatchRule[] = [
  { maxSalary: 2400, baseLimit: 400_000, baseRate: 0.06, extraRate: 0.03, label: "총급여 2,400만 원 이하" },
  { maxSalary: 3600, baseLimit: 500_000, baseRate: 0.046, extraRate: 0.03, label: "총급여 3,600만 원 이하" },
  { maxSalary: 4800, baseLimit: 600_000, baseRate: 0.037, extraRate: 0.03, label: "총급여 4,800만 원 이하" },
  { maxSalary: 6000, baseLimit: 700_000, baseRate: 0.03, extraRate: 0.03, label: "총급여 6,000만 원 이하" },
];

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

function getMatchRule(salaryMan: number): MatchRule | null {
  return MATCH_RULES.find((rule) => salaryMan <= rule.maxSalary) ?? null;
}

function calculateMonthlyMatch(monthly: number, salaryMan: number) {
  const rule = getMatchRule(salaryMan);
  if (!rule) return { monthlyMatch: 0, baseMatch: 0, extraMatch: 0, rule: null };
  const m = Math.min(monthly, MONTHLY_LIMIT);
  const baseAmount = Math.min(m, rule.baseLimit);
  const extraAmount = Math.max(0, Math.min(m, MONTHLY_LIMIT) - rule.baseLimit);
  const baseMatch = baseAmount * rule.baseRate;
  const extraMatch = extraAmount * rule.extraRate;
  return { monthlyMatch: baseMatch + extraMatch, baseMatch, extraMatch, rule };
}

export default function YouthLeapClient() {
  const [monthly, setMonthly] = useState<number>(700_000);
  const [salary, setSalary] = useState<number>(4000);
  const [bankRate, setBankRate] = useState<number>(5.5);
  const [includeGovtContributionInterest, setIncludeGovtContributionInterest] = useState<boolean>(false);

  const result = useMemo(() => {
    const m = Math.min(monthly, MONTHLY_LIMIT);
    const months = YEARS * 12;
    const totalContribution = m * months;
    const match = calculateMonthlyMatch(m, salary);
    const totalMatch = match.monthlyMatch * months;

    const avgMonths = months / 2;
    const interestBase = totalContribution + (includeGovtContributionInterest ? totalMatch : 0);
    const interest = interestBase * (bankRate / 100) * (avgMonths / 12);
    const finalAmount = totalContribution + totalMatch + interest;

    const regularInterestPre = totalContribution * REGULAR_SAVINGS_RATE * (avgMonths / 12);
    const regularInterest = regularInterestPre * (1 - 0.154);
    const regularFinal = totalContribution + regularInterest;

    return {
      totalContribution,
      totalMatch,
      interest,
      finalAmount,
      regularFinal,
      diff: finalAmount - regularFinal,
      monthlyMatch: match.monthlyMatch,
      baseMatch: match.baseMatch,
      extraMatch: match.extraMatch,
      rule: match.rule,
      interestBase,
    };
  }, [monthly, salary, bankRate, includeGovtContributionInterest]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">청년도약계좌 기존 가입자 만기 예상 계산기</h2>
      <p className="bd-text-sub mt-3">
        신규 가입이 종료된 청년도약계좌의 기존 가입자가 월 납입액, 가입 당시 소득 구간, 약정 금리를 기준으로 만기 금액을 가늠해보는 참고용 계산기입니다.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">월 납입액 (원)</span>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={10_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">최대 70만 원</span>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">가입 당시 연 소득 (만 원)</span>
          <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={100} min={0} />
          <span className="mt-2 block text-xs text-slate-400">정부기여금은 가입 당시 개인소득·가구소득 기준 확인 필요</span>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">가입 약정 금리 (%)</span>
          <input type="number" value={bankRate} onChange={(e) => setBankRate(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.1} min={0} />
          <span className="mt-2 block text-xs text-slate-400">가입 은행·시점별 적용 금리 입력</span>
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">
        <input
          type="checkbox"
          checked={includeGovtContributionInterest}
          onChange={(e) => setIncludeGovtContributionInterest(e.target.checked)}
          className="mt-1 h-4 w-4 accent-cyan-400"
        />
        <span>
          <strong className="text-white">정부기여금에도 은행 금리 이자를 반영</strong>
          <span className="mt-1 block text-slate-400">기본값은 보수적으로 본인 납입원금에만 이자를 적용합니다. 정부기여금의 적립 시점과 이자 처리 방식은 은행별로 달라질 수 있습니다.</span>
        </span>
      </label>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 납입원금</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.totalContribution)} 원</div></div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">정부기여금</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.totalMatch)} 원</div><div className="mt-1 text-xs text-emerald-200">월 {fmt(result.monthlyMatch)} 원</div></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">비과세 이자</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.interest)} 원</div><div className="mt-1 text-xs text-slate-400">이자 적용 원금 {fmt(result.interestBase)}원</div></div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">5년 만기 예상액</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.finalAmount)} 원</div></div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
        <div className="text-sm font-semibold text-white">정부기여금 계산 방식</div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {result.rule ? `${result.rule.label} 기준으로 기존 매칭 한도까지는 해당 구간 매칭률을 적용하고, 확대 구간은 3.0%를 적용합니다. 현재 입력값의 월 기여금은 기본 구간 ${fmt(result.baseMatch)}원 + 확대 구간 ${fmt(result.extraMatch)}원 = ${fmt(result.monthlyMatch)}원입니다.` : "총급여 6,000만 원 초과 7,500만 원 이하 구간은 비과세 중심 지원으로 정부기여금이 없을 수 있습니다. 가입 당시 조건을 확인해 주세요."}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          같은 월 납입액의 일반 적금(연 {(REGULAR_SAVINGS_RATE * 100).toFixed(1)}%, 이자 15.4% 과세) 5년 만기 예상액은 약 <span className="font-bold text-white">{fmt(result.regularFinal)} 원</span>입니다.
        </p>
      </div>
    </section>
  );
}
