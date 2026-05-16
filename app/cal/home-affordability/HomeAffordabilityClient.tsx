"use client";

import { useMemo, useState } from "react";

function fmt(v: number) {
  return Math.round(v).toLocaleString("ko-KR");
}

export default function HomeAffordabilityClient() {
  const [annualIncome, setAnnualIncome] = useState<number>(60_000_000);
  const [ownFunds, setOwnFunds] = useState<number>(150_000_000);
  const [dsrLimit, setDsrLimit] = useState<number>(40);
  const [ltvLimit, setLtvLimit] = useState<number>(70);
  const [rate, setRate] = useState<number>(4.0);
  const [years, setYears] = useState<number>(30);
  const [acquisitionTaxRate, setAcquisitionTaxRate] = useState<number>(1.1);
  const [brokerageFeeRate, setBrokerageFeeRate] = useState<number>(0.4);
  const [registrationCost, setRegistrationCost] = useState<number>(2_000_000);
  const [movingCost, setMovingCost] = useState<number>(3_000_000);
  const [interiorReserve, setInteriorReserve] = useState<number>(10_000_000);
  const [existingAnnualDebtPayment, setExistingAnnualDebtPayment] = useState<number>(0);
  const [emergencyCash, setEmergencyCash] = useState<number>(20_000_000);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    const annualDebtRoom = Math.max(0, annualIncome * (dsrLimit / 100) - existingAnnualDebtPayment);
    const monthlyMax = annualDebtRoom / 12;
    const dsrMaxLoan = monthlyRate === 0 ? monthlyMax * totalMonths : monthlyMax * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);

    const availableCashForPurchase = Math.max(0, ownFunds - registrationCost - movingCost - interiorReserve - emergencyCash);
    const variableCostRate = (acquisitionTaxRate + brokerageFeeRate) / 100;
    const ltv = ltvLimit / 100;
    const cashBasedHomePrice = availableCashForPurchase / Math.max(0.01, 1 - ltv + variableCostRate);
    const ltvMaxLoan = cashBasedHomePrice * ltv;

    const maxLoan = Math.min(dsrMaxLoan, ltvMaxLoan);
    const maxHomePriceByLoan = ltv > 0 ? maxLoan / ltv : 0;
    const maxHomePrice = Math.min(cashBasedHomePrice, maxHomePriceByLoan);
    const acquisitionTax = maxHomePrice * (acquisitionTaxRate / 100);
    const brokerageFee = maxHomePrice * (brokerageFeeRate / 100);
    const totalExtraCosts = acquisitionTax + brokerageFee + registrationCost + movingCost + interiorReserve;
    const requiredCash = Math.max(0, maxHomePrice - maxLoan + totalExtraCosts + emergencyCash);
    const limitedBy = dsrMaxLoan < ltvMaxLoan ? "DSR" : "현금·LTV";
    const monthlyPayment = monthlyRate === 0 ? maxLoan / totalMonths : (maxLoan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));

    return { maxLoan, maxHomePrice, limitedBy, monthlyPayment, dsrMaxLoan, ltvMaxLoan, acquisitionTax, brokerageFee, totalExtraCosts, requiredCash, availableCashForPurchase };
  }, [annualIncome, ownFunds, dsrLimit, ltvLimit, rate, years, acquisitionTaxRate, brokerageFeeRate, registrationCost, movingCost, interiorReserve, existingAnnualDebtPayment, emergencyCash]);

  return (
    <section className="bd-card bd-card-padding">
      <h2 className="bd-title-md">주택 구매 가능 금액 계산기</h2>
      <p className="bd-text-sub mt-3">DSR·LTV뿐 아니라 취득세, 중개보수, 등기비용, 이사비, 인테리어 예비비, 기존 대출 상환액, 비상금까지 함께 반영해 실제 매수 여력을 계산합니다.</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 제도 기준 반영</span>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 5월 현재 공개 자료 기준</span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {[
          ["연 소득 (원)", annualIncome, setAnnualIncome, 1_000_000],
          ["보유 자금 (원)", ownFunds, setOwnFunds, 1_000_000],
          ["DSR 한도 (%)", dsrLimit, setDsrLimit, 5],
          ["LTV 한도 (%)", ltvLimit, setLtvLimit, 5],
          ["대출 금리 (%)", rate, setRate, 0.1],
          ["대출 기간 (년)", years, setYears, 5],
          ["취득세율 (%)", acquisitionTaxRate, setAcquisitionTaxRate, 0.1],
          ["중개보수율 (%)", brokerageFeeRate, setBrokerageFeeRate, 0.1],
          ["등기비용 예산 (원)", registrationCost, setRegistrationCost, 100_000],
          ["이사비 예산 (원)", movingCost, setMovingCost, 100_000],
          ["인테리어 예비비 (원)", interiorReserve, setInteriorReserve, 1_000_000],
          ["기존 대출 연간 원리금 (원)", existingAnnualDebtPayment, setExistingAnnualDebtPayment, 1_000_000],
          ["비상금으로 남길 현금 (원)", emergencyCash, setEmergencyCash, 1_000_000],
        ].map(([label, value, setter, step]) => (
          <label className="block" key={String(label)}>
            <span className="text-xs font-semibold text-slate-300">{String(label)}</span>
            <input type="number" value={Number(value)} onChange={(e) => (setter as (value: number) => void)(Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white" step={Number(step)} min={0} />
          </label>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">매수 가능 주택가</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.maxHomePrice)} 원</div></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">최대 대출 가능액</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.maxLoan)} 원</div><div className="mt-1 text-xs text-slate-400">{result.limitedBy} 기준으로 제한</div></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">월 상환액</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.monthlyPayment)} 원</div></div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">부대비용 합계</div><div className="mt-2 text-xl font-bold text-white">{fmt(result.totalExtraCosts)} 원</div></div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-sm leading-7 text-slate-300">
        <p>예상 취득세 {fmt(result.acquisitionTax)}원, 중개보수 {fmt(result.brokerageFee)}원을 포함했습니다. 비상금을 제외하고도 필요한 현금은 약 {fmt(result.requiredCash)}원입니다.</p>
        <p className="mt-2 text-amber-100">실제 적용 조건은 금융사, 세법, 정부 정책 변경에 따라 달라질 수 있습니다.</p>
      </div>
    </section>
  );
}
