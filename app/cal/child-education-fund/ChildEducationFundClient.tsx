"use client";

import { useMemo, useState } from "react";
import CalculatorReferenceBox, { RelatedCalculatorLinks } from "../components/CalculatorReferenceBox";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function ChildEducationFundClient() {
  const [childAge, setChildAge] = useState<number>(5);
  const [universityAge, setUniversityAge] = useState<number>(19);
  const [yearlyCost, setYearlyCost] = useState<number>(15_000_000);
  const [universityYears, setUniversityYears] = useState<number>(4);
  const [inflation, setInflation] = useState<number>(3);
  const [returnRate, setReturnRate] = useState<number>(5);
  const [currentAssets, setCurrentAssets] = useState<number>(0);

  const result = useMemo(() => {
    const yearsToUniv = Math.max(0, universityAge - childAge);
    // 인플레이션 보정 첫 학년 등록금
    const firstYearCost = yearlyCost * Math.pow(1 + inflation / 100, yearsToUniv);
    // 총 등록금: 4년치 인플레이션 누적
    let totalCost = 0;
    for (let i = 0; i < universityYears; i++) {
      totalCost += yearlyCost * Math.pow(1 + inflation / 100, yearsToUniv + i);
    }
    // 현재 자산의 미래 가치
    const futureCurrent = currentAssets * Math.pow(1 + returnRate / 100, yearsToUniv);
    const remaining = Math.max(0, totalCost - futureCurrent);
    // 매월 적립 필요
    const monthlyReturn = returnRate / 100 / 12;
    const totalMonths = yearsToUniv * 12;
    let monthly = 0;
    if (monthlyReturn === 0) {
      monthly = totalMonths > 0 ? remaining / totalMonths : 0;
    } else {
      monthly = totalMonths > 0
        ? (remaining * monthlyReturn) / (Math.pow(1 + monthlyReturn, totalMonths) - 1)
        : 0;
    }
    return { yearsToUniv, firstYearCost, totalCost, futureCurrent, remaining, monthly };
  }, [childAge, universityAge, yearlyCost, universityYears, inflation, returnRate, currentAssets]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">자녀 교육비 준비 계산기</h2>
      <p className="bd-text-sub mt-3">자녀 현재 나이·진학 시기·연 등록금을 입력하면 인플레이션 반영 후 필요 자금과 매월 적립금을 계산합니다.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">자녀 현재 나이 (만)</span>
          <input type="number" value={childAge} onChange={(e) => setChildAge(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={0} max={25} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">대학 진학 나이 (만)</span>
          <input type="number" value={universityAge} onChange={(e) => setUniversityAge(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={15} max={30} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">현재 기준 연 등록금 (원)</span>
          <input type="number" value={yearlyCost} onChange={(e) => setYearlyCost(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
          <span className="mt-2 block text-xs text-slate-400">사립 평균 약 800만~1500만 / 의·약대 추가</span>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">진학 기간 (년)</span>
          <input type="number" value={universityYears} onChange={(e) => setUniversityYears(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1} min={1} max={10} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">현재 모아둔 자금 (원)</span>
          <input type="number" value={currentAssets} onChange={(e) => setCurrentAssets(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={1_000_000} min={0} />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">연 수익률 (%)</span>
          <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.5} min={0} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-xs font-semibold text-slate-300">연 교육비 상승률 (%)</span>
          <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={0.5} min={0} />
          <span className="mt-2 block text-xs text-slate-400">대학 등록금 평균 3~5%/년 상승</span>
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{universityYears}년 총 등록금</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalCost)} 원</div>
          <div className="mt-1 text-xs text-slate-400">진학 시점 인플레이션 반영</div>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">매월 적립 필요</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthly)} 원</div>
          <div className="mt-1 text-xs text-cyan-200">{result.yearsToUniv}년 동안</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">진학 시점 첫 학년</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.firstYearCost)} 원</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm leading-7 text-amber-50/90">
        <p>ISA는 가입 연령과 소득 요건을 충족해야 활용할 수 있으므로 미성년 자녀 명의로 바로 활용하기는 어려울 수 있습니다. 자녀가 요건을 충족하는 시점에 절세계좌 전략으로 검토해 주세요.</p>
        <p className="mt-2">미성년 자녀 증여는 10년 단위 증여재산공제 한도를 기준으로 관리해야 합니다. 교육비 목적 자금이라도 증여 시점과 금액 기록을 남겨두는 것이 좋습니다.</p>
      </div>

      <div className="mt-6 space-y-6">
        <RelatedCalculatorLinks links={[
          { label: "복리 계산기", href: "/cal/compound", description: "교육비 적립금을 장기 투자했을 때의 누적 효과를 확인할 수 있습니다." },
          { label: "예금 이자 계산기", href: "/cal/deposit-interest", description: "안정적으로 보관할 자금의 세후 이자를 계산할 수 있습니다." },
          { label: "적금 이자 계산기", href: "/cal/installment-savings", description: "매월 적립 방식으로 교육비를 모을 때 활용할 수 있습니다." },
          { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings", description: "자녀가 가입 요건을 충족한 이후 절세계좌 전략을 검토할 수 있습니다." },
        ]} />
        <CalculatorReferenceBox sources={["국세청 증여세 안내", "금융투자협회 ISA 제도 안내", "교육부·대학알리미 등록금 공개 자료"]} />
      </div>
    </section>
  );
}
