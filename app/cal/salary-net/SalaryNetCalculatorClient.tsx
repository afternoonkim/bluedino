"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Calculator,
  ChevronRight,
  CircleDollarSign,
  FileText,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import CalculatorSeoContent from "../components/CalculatorSeoContent";


type WithholdingRate = 80 | 100 | 120;

type DeductionBreakdown = {
  monthlyGross: number;
  monthlyTaxable: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalMonthlyDeduction: number;
  monthlyNet: number;
  annualGross: number;
  annualNet: number;
  annualDeduction: number;
  effectiveDeductionRate: number;
};

type ProjectionRow = {
  annualSalaryLabel: string;
  monthlyGross: number;
  monthlyNet: number;
  annualNet: number;
  annualDeduction: number;
  nationalPension: number;
  healthInsurance: number;
  employmentInsurance: number;
  incomeTax: number;
};

const numberFormatter = new Intl.NumberFormat("ko-KR");
const won = (value: number) => `${numberFormatter.format(Math.round(value))}원`;
const manwon = (value: number) => `${numberFormatter.format(Math.round(value))}만원`;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSalaryDeductionRate(totalSalary: number) {
  if (totalSalary <= 5_000_000) return 0.7;
  if (totalSalary <= 15_000_000) return 0.4 + (5_000_000 / totalSalary) * 0.3;
  if (totalSalary <= 45_000_000) return 0.15 + (7_500_000 / totalSalary) * 0.25;
  if (totalSalary <= 100_000_000) return 0.05 + (12_000_000 / totalSalary) * 0.1;
  return 0.02 + (20_000_000 / totalSalary) * 0.03;
}

function calcEarnedIncomeDeduction(totalSalary: number) {
  const rate = getSalaryDeductionRate(totalSalary);
  const rough = totalSalary * rate;
  return clamp(rough, 0, 20_000_000);
}

function calcBasicTax(taxBase: number) {
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return 840_000 + (taxBase - 14_000_000) * 0.15;
  if (taxBase <= 88_000_000) return 6_240_000 + (taxBase - 50_000_000) * 0.24;
  if (taxBase <= 150_000_000) return 15_360_000 + (taxBase - 88_000_000) * 0.35;
  if (taxBase <= 300_000_000) return 37_060_000 + (taxBase - 150_000_000) * 0.38;
  if (taxBase <= 500_000_000) return 94_060_000 + (taxBase - 300_000_000) * 0.4;
  if (taxBase <= 1_000_000_000) return 174_060_000 + (taxBase - 500_000_000) * 0.42;
  return 384_060_000 + (taxBase - 1_000_000_000) * 0.45;
}

function calcTaxCredit(calculatedTax: number, totalSalary: number) {
  let credit = Math.min(calculatedTax * 0.55, 740_000);

  if (totalSalary > 33_000_000 && totalSalary <= 70_000_000) {
    credit = Math.min(credit, 740_000 - (totalSalary - 33_000_000) * 0.008);
  } else if (totalSalary > 70_000_000 && totalSalary <= 120_000_000) {
    credit = Math.min(credit, 660_000 - (totalSalary - 70_000_000) * 0.0032);
  } else if (totalSalary > 120_000_000) {
    credit = Math.min(credit, 500_000 - (totalSalary - 120_000_000) * 0.0025);
  }

  return Math.max(0, credit);
}

function calcChildTaxCredit(childCount: number) {
  if (childCount <= 0) return 0;
  if (childCount === 1) return 150_000;
  if (childCount === 2) return 350_000;
  return 350_000 + (childCount - 2) * 300_000;
}

function calculateSalaryNet(params: {
  annualSalaryManwon: number;
  annualBonusManwon: number;
  monthlyNonTaxableWon: number;
  dependentCount: number;
  childCount: number;
  withholdingRate: WithholdingRate;
  excludeEmploymentInsurance: boolean;
}): DeductionBreakdown {
  const annualSalary = Math.max(0, params.annualSalaryManwon) * 10_000;
  const annualBonus = Math.max(0, params.annualBonusManwon) * 10_000;
  const annualGross = annualSalary + annualBonus;

  const monthlyGross = annualGross / 12;
  const annualNonTaxable = Math.max(0, params.monthlyNonTaxableWon) * 12;
  const monthlyTaxable = Math.max(0, monthlyGross - params.monthlyNonTaxableWon);

  // 참고용 단순 계산
  const nationalPension = monthlyTaxable * 0.0475;
  const healthInsurance = monthlyTaxable * 0.03545;
  const longTermCare = healthInsurance * 0.1295;
  const employmentInsurance = params.excludeEmploymentInsurance ? 0 : monthlyTaxable * 0.009;

  const annualEarnedIncomeDeduction = calcEarnedIncomeDeduction(annualGross);
  const humanDeduction = Math.max(1, params.dependentCount) * 1_500_000;
  const pensionInsuranceAnnual = nationalPension * 12;
  const specialDeduction = healthInsurance * 12 + longTermCare * 12 + employmentInsurance * 12 + pensionInsuranceAnnual;

  const taxBase = Math.max(
    0,
    annualGross - annualNonTaxable - annualEarnedIncomeDeduction - humanDeduction - specialDeduction,
  );

  const calculatedTax = calcBasicTax(taxBase);
  const taxCredit = calcTaxCredit(calculatedTax, annualGross);
  const childTaxCredit = calcChildTaxCredit(params.childCount);
  const annualIncomeTaxBeforeRate = Math.max(0, calculatedTax - taxCredit - childTaxCredit);
  const annualIncomeTax = annualIncomeTaxBeforeRate * (params.withholdingRate / 100);
  const annualLocalIncomeTax = annualIncomeTax * 0.1;

  const incomeTax = annualIncomeTax / 12;
  const localIncomeTax = annualLocalIncomeTax / 12;

  const totalMonthlyDeduction =
    nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;
  const monthlyNet = Math.max(0, monthlyGross - totalMonthlyDeduction);
  const annualNet = monthlyNet * 12;
  const annualDeduction = annualGross - annualNet;
  const effectiveDeductionRate = annualGross > 0 ? (annualDeduction / annualGross) * 100 : 0;

  return {
    monthlyGross,
    monthlyTaxable,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalMonthlyDeduction,
    monthlyNet,
    annualGross,
    annualNet,
    annualDeduction,
    effectiveDeductionRate,
  };
}

function buildProjectionRows(base: {
  annualBonusManwon: number;
  monthlyNonTaxableWon: number;
  dependentCount: number;
  childCount: number;
  withholdingRate: WithholdingRate;
  excludeEmploymentInsurance: boolean;
}): ProjectionRow[] {
  const salaryBands = [
    1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000,
    8000, 9000, 10000, 12000, 15000, 20000,
  ];

  return salaryBands.map((band) => {
    const result = calculateSalaryNet({
      annualSalaryManwon: band,
      annualBonusManwon: base.annualBonusManwon,
      monthlyNonTaxableWon: base.monthlyNonTaxableWon,
      dependentCount: base.dependentCount,
      childCount: base.childCount,
      withholdingRate: base.withholdingRate,
      excludeEmploymentInsurance: base.excludeEmploymentInsurance,
    });

    return {
      annualSalaryLabel: `${numberFormatter.format(band)}만원`,
      monthlyGross: result.monthlyGross,
      monthlyNet: result.monthlyNet,
      annualNet: result.annualNet,
      annualDeduction: result.annualDeduction,
      nationalPension: result.nationalPension * 12,
      healthInsurance: (result.healthInsurance + result.longTermCare) * 12,
      employmentInsurance: result.employmentInsurance * 12,
      incomeTax: (result.incomeTax + result.localIncomeTax) * 12,
    };
  });
}

function ResultCard({
  title,
  value,
  description,
  accent,
}: {
  title: string;
  value: string;
  description: string;
  accent: "blue" | "green" | "red" | "purple";
}) {
  const accentClasses = {
    blue: "from-blue-500/20 to-cyan-400/10 border-blue-400/25 text-cyan-300",
    green: "from-emerald-500/20 to-green-400/10 border-emerald-400/25 text-emerald-300",
    red: "from-rose-500/20 to-red-400/10 border-rose-400/25 text-rose-700",
    purple: "from-violet-500/20 to-fuchsia-400/10 border-violet-400/25 text-violet-300",
  };

  return (
    <div className={`rounded-3xl border bg-gradient-to-br p-5 shadow-sm ${accentClasses[accent]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export default function SalaryNetCalculatorPage() {
  const [annualSalaryManwon, setAnnualSalaryManwon] = useState(5000);
  const [annualBonusManwon, setAnnualBonusManwon] = useState(0);
  const [monthlyNonTaxableWon, setMonthlyNonTaxableWon] = useState(200_000);
  const [dependentCount, setDependentCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [withholdingRate, setWithholdingRate] = useState<WithholdingRate>(100);
  const [excludeEmploymentInsurance, setExcludeEmploymentInsurance] = useState(false);

  const result = useMemo(
    () =>
      calculateSalaryNet({
        annualSalaryManwon,
        annualBonusManwon,
        monthlyNonTaxableWon,
        dependentCount,
        childCount,
        withholdingRate,
        excludeEmploymentInsurance,
      }),
    [
      annualSalaryManwon,
      annualBonusManwon,
      monthlyNonTaxableWon,
      dependentCount,
      childCount,
      withholdingRate,
      excludeEmploymentInsurance,
    ],
  );

  const rows = useMemo(
    () =>
      buildProjectionRows({
        annualBonusManwon,
        monthlyNonTaxableWon,
        dependentCount,
        childCount,
        withholdingRate,
        excludeEmploymentInsurance,
      }),
    [
      annualBonusManwon,
      monthlyNonTaxableWon,
      dependentCount,
      childCount,
      withholdingRate,
      excludeEmploymentInsurance,
    ],
  );

  return (
    <main className="bd-page">
      <div className="bd-container max-w-[1400px]">
        <div className="mb-6 rounded-[28px] border border-slate-800 bg-slate-900/95 px-5 py-6 shadow-sm md:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                <Wallet className="h-4 w-4" />
                월급 실수령액 빠른 계산
              </div>
              <h1 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
                연봉 실수령액 계산기
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-[15px]">
                세전 연봉과 상여금, 부양가족 수, 비과세 금액 등을 넣으면 예상 월 실수령액과 연 실수령액을 빠르게 확인할 수 있습니다.
                실제 급여명세서와 차이가 있을 수 있으므로 참고용으로 활용해 주세요.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs font-semibold text-slate-400">현재 설정 기준</p>
                <p className="mt-2 text-lg font-bold text-white">{manwon(annualSalaryManwon)}</p>
                <p className="text-xs text-slate-400">세전 연봉</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs font-semibold text-slate-400">예상 월 실수령액</p>
                <p className="mt-2 text-lg font-bold text-cyan-300">{won(result.monthlyNet)}</p>
                <p className="text-xs text-slate-400">추정치</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs font-semibold text-slate-400">예상 연 실수령액</p>
                <p className="mt-2 text-lg font-bold text-emerald-300">{won(result.annualNet)}</p>
                <p className="text-xs text-slate-400">추정치</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-300">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">입력 정보</h2>
                  <p className="text-xs text-slate-400">급여 조건을 입력해 주세요.</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">세전 연봉</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={annualSalaryManwon}
                      onChange={(e) => setAnnualSalaryManwon(Number(e.target.value) || 0)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 pr-16 text-base font-semibold text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900/95"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      만원
                    </span>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">연간 상여금</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={annualBonusManwon}
                      onChange={(e) => setAnnualBonusManwon(Number(e.target.value) || 0)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 pr-16 text-base font-semibold text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900/95"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      만원
                    </span>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">월 비과세 금액</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={monthlyNonTaxableWon}
                      onChange={(e) => setMonthlyNonTaxableWon(Number(e.target.value) || 0)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 pr-14 text-base font-semibold text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900/95"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                      원
                    </span>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-300">기본공제 인원</span>
                    <select
                      value={dependentCount}
                      onChange={(e) => setDependentCount(Number(e.target.value))}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900/95"
                    >
                      {[1, 2, 3, 4, 5, 6].map((count) => (
                        <option key={count} value={count}>
                          {count}명
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-300">8~20세 자녀 수</span>
                    <select
                      value={childCount}
                      onChange={(e) => setChildCount(Number(e.target.value))}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900/95"
                    >
                      {[0, 1, 2, 3, 4].map((count) => (
                        <option key={count} value={count}>
                          {count}명
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-semibold text-slate-300">원천징수 비율</span>
                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-1">
                    {[80, 100, 120].map((rate) => {
                      const active = withholdingRate === rate;
                      return (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setWithholdingRate(rate as WithholdingRate)}
                          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                            active
                              ? "bg-cyan-500 text-white shadow-sm"
                              : "text-slate-400 hover:bg-slate-900/95"
                          }`}
                        >
                          {rate}%
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={excludeEmploymentInsurance}
                    onChange={(e) => setExcludeEmploymentInsurance(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-300 focus:ring-cyan-500"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-100">고용보험 제외</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      일부 근로 형태에서는 적용이 다를 수 있어 참고용으로 선택할 수 있습니다.
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <p className="text-sm font-semibold text-cyan-200">빠른 해석</p>
                <p className="mt-2 text-sm leading-6 text-cyan-100">
                  현재 설정 기준으로 월 실수령액은 <strong>{won(result.monthlyNet)}</strong>, 연 실수령액은 <strong>{won(result.annualNet)}</strong> 수준으로
                  추정됩니다.
                </p>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ResultCard
                title="월 예상 실수령액"
                value={won(result.monthlyNet)}
                description="월급 통장에 실제로 들어오는 금액의 추정치입니다."
                accent="blue"
              />
              <ResultCard
                title="연 예상 실수령액"
                value={won(result.annualNet)}
                description="월 기준 결과를 12개월로 환산한 예상치입니다."
                accent="green"
              />
              <ResultCard
                title="연간 총 공제액"
                value={won(result.annualDeduction)}
                description="4대 보험과 세금 공제를 합한 금액입니다."
                accent="red"
              />
              <ResultCard
                title="공제 비율"
                value={`${result.effectiveDeductionRate.toFixed(1)}%`}
                description="세전 총액 대비 전체 공제 비중입니다."
                accent="purple"
              />
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white">월 공제 상세</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    각 항목별로 얼마나 빠지는지 한눈에 볼 수 있게 정리했습니다.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  참고용 추정 계산
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs font-semibold text-slate-400">월 세전 급여</p>
                  <p className="mt-2 text-lg font-bold text-white">{won(result.monthlyGross)}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs font-semibold text-slate-400">월 과세 대상 급여</p>
                  <p className="mt-2 text-lg font-bold text-white">{won(result.monthlyTaxable)}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs font-semibold text-slate-400">월 총 공제액</p>
                  <p className="mt-2 text-lg font-bold text-rose-300">{won(result.totalMonthlyDeduction)}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-xs font-semibold text-slate-400">월 실수령액</p>
                  <p className="mt-2 text-lg font-bold text-cyan-300">{won(result.monthlyNet)}</p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800">
                <table className="min-w-full divide-y divide-slate-800 text-sm">
                  <thead className="bg-slate-950/70">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-400">항목</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">월 금액</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">연 환산</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">비중</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/95">
                    {[
                      { label: "국민연금", monthly: result.nationalPension },
                      { label: "건강보험", monthly: result.healthInsurance },
                      { label: "장기요양보험", monthly: result.longTermCare },
                      { label: "고용보험", monthly: result.employmentInsurance },
                      { label: "소득세", monthly: result.incomeTax },
                      { label: "지방소득세", monthly: result.localIncomeTax },
                    ].map((item) => {
                      const annual = item.monthly * 12;
                      const ratio = result.totalMonthlyDeduction > 0 ? (item.monthly / result.totalMonthlyDeduction) * 100 : 0;
                      return (
                        <tr key={item.label} className="hover:bg-slate-950/80">
                          <td className="px-4 py-3 font-medium text-slate-100">{item.label}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-100">{won(item.monthly)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{won(annual)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{ratio.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-950/70">
                      <td className="px-4 py-3 font-bold text-white">합계</td>
                      <td className="px-4 py-3 text-right font-black text-rose-300">{won(result.totalMonthlyDeduction)}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-300">{won(result.totalMonthlyDeduction * 12)}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-300">100.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-800 p-2 text-slate-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white">연봉 실수령액 예상표</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    현재 옵션을 유지한 상태에서 연봉 구간별 예상치를 비교할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="mt-5 overflow-auto rounded-3xl border border-slate-800">
                <table className="min-w-[1080px] divide-y divide-slate-800 text-sm">
                  <thead className="bg-slate-950/70">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-400">연봉</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">월 세전</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">월 실수령</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">연 실수령</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">연간 총 공제</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">국민연금</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">건보+장기요양</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">고용보험</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-400">세금</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/95">
                    {rows.map((row) => {
                      const isCurrent = row.annualSalaryLabel === `${numberFormatter.format(annualSalaryManwon)}만원`;
                      return (
                        <tr key={row.annualSalaryLabel} className={isCurrent ? "bg-cyan-500/10" : "hover:bg-slate-950/80"}>
                          <td className="px-4 py-3 font-semibold text-white">{row.annualSalaryLabel}</td>
                          <td className="px-4 py-3 text-right text-slate-300">{won(row.monthlyGross)}</td>
                          <td className="px-4 py-3 text-right font-bold text-cyan-300">{won(row.monthlyNet)}</td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-300">{won(row.annualNet)}</td>
                          <td className="px-4 py-3 text-right font-semibold text-rose-300">{won(row.annualDeduction)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{won(row.nationalPension)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{won(row.healthInsurance)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{won(row.employmentInsurance)}</td>
                          <td className="px-4 py-3 text-right text-slate-400">{won(row.incomeTax)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2 text-amber-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-white">계산 전 확인사항</h2>
                    <p className="mt-1 text-sm text-slate-400">실제 급여명세서와 차이가 나는 대표 이유입니다.</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    비과세 식대, 차량유지비, 연구수당 등 회사별 비과세 항목은 실제와 다를 수 있습니다.
                  </li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    원천징수 80%, 100%, 120% 선택에 따라 월 소득세가 달라질 수 있습니다.
                  </li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    연말정산 환급 또는 추가 납부는 이 화면에 반영되지 않으므로 최종 실수령액과 차이가 발생할 수 있습니다.
                  </li>
                  <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    본 계산기는 참고용 추정치이며, 급여팀의 실제 간이세액표 적용 결과가 우선입니다.
                  </li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                    <PiggyBank className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-white">같이 보면 좋은 계산기</h2>
                    <p className="mt-1 text-sm text-slate-400">소득과 투자 계획을 함께 보면 더 좋습니다.</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      href: "/cal/calculator",
                      title: "배당 계산기",
                      description: "실수령액 일부를 배당 투자에 넣었을 때의 현금흐름을 계산해 보세요.",
                    },
                    {
                      href: "/cal/fire",
                      title: "FIRE 계산기",
                      description: "현재 소득 기준으로 은퇴 목표를 얼마나 앞당길 수 있는지 확인할 수 있습니다.",
                    },
                    {
                      href: "/info/investment/account-tax",
                      title: "계좌별 세금정보",
                      description: "월급으로 모은 돈을 어디에 투자할지 세금 기준으로 비교해 보세요.",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4 transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-cyan-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-5 shadow-sm md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-2 text-violet-300">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white">한눈에 보는 현재 결과</h2>
                  <p className="mt-1 text-sm text-slate-400">현재 입력값으로 해석하면 이렇게 볼 수 있습니다.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-slate-400">월급 통장 기준</p>
                  <p className="mt-3 text-xl font-black text-white">{won(result.monthlyNet)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    세전 월급 {won(result.monthlyGross)}에서 공제 {won(result.totalMonthlyDeduction)}이 빠진 값입니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-slate-400">연봉 체감 기준</p>
                  <p className="mt-3 text-xl font-black text-white">{won(result.annualNet)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    연간 총액 {won(result.annualGross)} 중 체감 실수령 비중은 {(100 - result.effectiveDeductionRate).toFixed(1)}%입니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-slate-400">관리 포인트</p>
                  <p className="mt-3 text-xl font-black text-white">{won(result.totalMonthlyDeduction)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    공제 항목이 큰 편이라면 비과세 항목, 원천징수 비율, 절세계좌 활용 전략을 함께 점검하는 것이 좋습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <CalculatorSeoContent
            sections={[
              {
                title: "연봉 실수령액 계산기란?",
                body: "연봉 실수령액 계산기는 세전 연봉에서 4대 보험과 소득세, 지방소득세 등을 반영해 실제 통장에 들어오는 금액을 추정하는 도구입니다. 월 기준과 연 기준을 함께 확인할 수 있습니다.",
              },
              {
                title: "어떻게 계산하나요?",
                body: "세전 연봉과 상여금, 비과세 금액, 부양가족 수, 원천징수 비율 등을 입력하면 월 과세대상 급여를 계산하고 국민연금, 건강보험, 장기요양보험, 고용보험, 소득세를 순서대로 반영합니다.",
              },
              {
                title: "이런 경우에 활용하면 좋습니다",
                body: "이직 제안을 비교할 때, 연봉 협상 전에 실수령액을 가늠할 때, 상여금과 비과세 항목에 따라 체감 월급이 얼마나 달라지는지 보고 싶을 때 유용합니다.",
              },
              {
                title: "자주 헷갈리는 포인트",
                body: "같은 연봉이라도 부양가족 수, 비과세 항목, 원천징수 80·100·120% 설정에 따라 월 실수령액은 달라질 수 있습니다. 실제 급여명세서와 차이가 날 수 있다는 점도 함께 봐야 합니다.",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
