"use client";

import { useMemo, useState } from "react";

const TAX_RATE_LOW = 0.165;
const TAX_RATE_HIGH = 0.132;
const IRP_LIMIT = 9_000_000;
const PENSION_LIMIT = 6_000_000;
const COMBINED_LIMIT = 9_000_000; // IRP + 연금저축 합산 한도 900만 원 (실제: IRP 단독 900만 원·연금저축 600만 원·합산 시 IRP 한도 적용)

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function IrpTaxCreditClient() {
  const [salary, setSalary] = useState<number>(5500);
  const [irpContribution, setIrpContribution] = useState<number>(9_000_000);
  const [pensionContribution, setPensionContribution] = useState<number>(0);

  const result = useMemo(() => {
    const rate = salary <= 5500 ? TAX_RATE_LOW : TAX_RATE_HIGH;
    // 연금저축 한도(600만 원) + IRP 한도(900만 원) 중 IRP 한도 안에서 두 계좌 합산 적용
    const cappedPension = Math.min(pensionContribution, PENSION_LIMIT);
    const remaining = COMBINED_LIMIT - cappedPension;
    const cappedIrp = Math.max(0, Math.min(irpContribution, remaining));
    const totalCapped = cappedPension + cappedIrp;
    const refund = Math.floor(totalCapped * rate);
    const overflow = (irpContribution + pensionContribution) - totalCapped;
    return { cappedPension, cappedIrp, totalCapped, rate, refund, overflow };
  }, [salary, irpContribution, pensionContribution]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">IRP 세액공제 계산기</span>
          <h1 className="bd-title-lg mt-4">IRP 세액공제 환급액 계산기</h1>
          <p className="bd-text-main mt-4">
            IRP(개인형퇴직연금)와 연금저축계좌 납입액에 대한 세액공제 환급액을 함께 계산합니다. 두 계좌 합산 한도 900만 원 안에서 연봉별 세액공제율(16.5% / 13.2%)이 적용됩니다.
          </p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">입력</h2>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-white">연 소득 (만 원)</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">5,500만 원 이하 16.5% / 초과 13.2% 적용</span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">IRP 연 납입액 (원)</span>
              <input
                type="number"
                value={irpContribution}
                onChange={(e) => setIrpContribution(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">IRP 단독 한도 900만 원</span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">연금저축 연 납입액 (원, 선택)</span>
              <input
                type="number"
                value={pensionContribution}
                onChange={(e) => setPensionContribution(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">연금저축 단독 한도 600만 원. IRP와 합산해 900만 원까지 세액공제</span>
            </label>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세액공제 적용 합계</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.totalCapped)} 원</div>
              <div className="mt-1 text-xs text-slate-400">최대 900만 원까지</div>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">예상 환급액</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.refund)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">세액공제율 {(result.rate * 100).toFixed(1)}%</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">한도 초과분</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.overflow)} 원</div>
              <div className="mt-1 text-xs text-slate-400">올해 환급 대상 아님</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
