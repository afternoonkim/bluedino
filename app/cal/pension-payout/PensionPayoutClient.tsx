"use client";

import { useMemo, useState } from "react";
import CalculatorReferenceBox, { RelatedCalculatorLinks } from "../components/CalculatorReferenceBox";

const PENSION_TAX_55 = 0.055; // 만 55세 이상 70세 미만
const PENSION_TAX_70 = 0.044; // 70세 이상 80세 미만
const PENSION_TAX_80 = 0.033; // 80세 이상

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

function pensionTax(age: number): number {
  if (age >= 80) return PENSION_TAX_80;
  if (age >= 70) return PENSION_TAX_70;
  return PENSION_TAX_55;
}

export default function PensionPayoutClient() {
  const [assets, setAssets] = useState<number>(500_000_000);
  const [startAge, setStartAge] = useState<number>(60);
  const [years, setYears] = useState<number>(25);
  const [returnRate, setReturnRate] = useState<number>(4);

  const result = useMemo(() => {
    // 연금 인출 시뮬레이션: 매년 동일 금액 인출하며 잔여 자산은 수익률만큼 증가
    const r = returnRate / 100;
    // PMT 공식 (연 기준): A = P * r / (1 - (1+r)^(-n))
    let yearly = 0;
    if (r === 0) {
      yearly = assets / years;
    } else {
      yearly = (assets * r) / (1 - Math.pow(1 + r, -years));
    }
    const monthly = yearly / 12;
    const totalGross = yearly * years;
    const yearlyRows = Array.from({ length: Math.max(0, years) }, (_, index) => {
      const age = startAge + index;
      const taxRate = pensionTax(age);
      const tax = yearly * taxRate;
      return { year: index + 1, age, taxRate, gross: yearly, tax, net: yearly - tax };
    });
    const totalTax = yearlyRows.reduce((sum, row) => sum + row.tax, 0);
    const totalNet = totalGross - totalTax;
    const monthlyNet = years > 0 ? totalNet / years / 12 : 0;
    const averageTaxRate = totalGross > 0 ? totalTax / totalGross : 0;

    return { yearly, monthly, monthlyNet, totalGross, totalTax, totalNet, taxRate: averageTaxRate, yearlyRows };
  }, [assets, startAge, years, returnRate]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">연금 수령액 시뮬레이션</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-slate-300">은퇴 시점 누적 자산 (원)</span>
          <input
            type="number"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
            step={1_000_000}
            min={0}
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">수령 시작 나이</span>
          <input
            type="number"
            value={startAge}
            onChange={(e) => setStartAge(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
            step={1}
            min={55}
            max={100}
          />
          <span className="mt-2 block text-xs text-slate-400">만 55세부터 가능. 늦게 받을수록 세율 낮음</span>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">수령 기간 (년)</span>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
            step={1}
            min={5}
          />
          <span className="mt-2 block text-xs text-slate-400">10년 이상 권장(연금소득세 적용)</span>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-300">잔여 자산 운용 수익률 (연 %)</span>
          <input
            type="number"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
            step={0.5}
            min={0}
          />
        </label>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월 수령액 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyNet)} 원</div>
          <div className="mt-1 text-xs text-cyan-200">평균 연금소득세 {(result.taxRate * 100).toFixed(1)}% 차감</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">월 수령액 (세전)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.monthly)} 원</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 누적 수령 (세후)</div>
          <div className="mt-2 text-xl font-bold text-white">{fmt(result.totalNet)} 원</div>
          <div className="mt-1 text-xs text-slate-400">{years}년 누적</div>
        </div>
      </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wide text-slate-400">
            <tr><th className="px-4 py-2">수령 연차</th><th className="px-4 py-2">나이</th><th className="px-4 py-2">적용 세율</th><th className="px-4 py-2">연 세후 수령액</th></tr>
          </thead>
          <tbody>
            {result.yearlyRows.slice(0, 10).map((row) => (
              <tr key={row.year} className="border-t border-slate-800"><td className="px-4 py-2">{row.year}년차</td><td className="px-4 py-2">만 {row.age}세</td><td className="px-4 py-2">{(row.taxRate * 100).toFixed(1)}%</td><td className="px-4 py-2 font-semibold text-white">{fmt(row.net)} 원</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm leading-7 text-amber-50/90">
        <p>연금소득세율은 수령 시작 나이가 아니라 매년 실제 수령 나이 기준으로 70세 미만, 70세 이상 80세 미만, 80세 이상 구간을 나눠 적용했습니다.</p>
        <p className="mt-2">사적연금 수령액이 연간 일정 기준을 초과하면 분리과세와 종합과세 선택 또는 과세 방식이 달라질 수 있습니다. 실제 인출 전에는 개인의 다른 소득과 세무 상황을 함께 확인해 주세요.</p>
      </div>
      <div className="mt-6 space-y-6">
        <RelatedCalculatorLinks links={[
          { label: "연금저축 세액공제 계산기", href: "/cal/pension-tax-credit", description: "납입 단계의 세액공제 효과를 먼저 확인할 수 있습니다." },
          { label: "IRP 세액공제 계산기", href: "/cal/irp-tax-credit", description: "IRP 납입액과 절세 효과를 함께 계산할 수 있습니다." },
          { label: "퇴직소득세 계산기", href: "/cal/retirement-tax", description: "퇴직금 수령 방식과 세금 부담을 비교할 수 있습니다." },
          { label: "FIRE 계산기", href: "/cal/fire", description: "연금 수령액이 은퇴 생활비를 충당할 수 있는지 이어서 볼 수 있습니다." },
        ]} />
        <CalculatorReferenceBox sources={["국세청 연금소득 과세 안내", "금융감독원 연금저축·IRP 안내", "연금계좌 취급 금융회사 상품 설명서"]} />
      </div>
    </section>
  );
}
