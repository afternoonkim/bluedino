"use client";

import { useMemo, useState } from "react";

const TAX_RATE_LOW = 0.165;  // 연봉 5,500만 원 이하: 16.5%
const TAX_RATE_HIGH = 0.132; // 연봉 5,500만 원 초과: 13.2%
const ANNUAL_LIMIT = 6_000_000;

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function PensionTaxCreditClient() {
  const [salary, setSalary] = useState<number>(5500);
  const [contribution, setContribution] = useState<number>(6_000_000);

  const result = useMemo(() => {
    const cappedContribution = Math.min(contribution, ANNUAL_LIMIT);
    const overflow = Math.max(0, contribution - ANNUAL_LIMIT);
    const rate = salary <= 5500 ? TAX_RATE_LOW : TAX_RATE_HIGH;
    const refund = Math.floor(cappedContribution * rate);
    return { cappedContribution, overflow, rate, refund };
  }, [salary, contribution]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">연금저축 세액공제 계산기</span>
          <h1 className="bd-title-lg mt-4">연금저축 세액공제 환급액 계산기</h1>
          <p className="bd-text-main mt-4">
            연금저축계좌에 납입한 금액에 대해 받을 수 있는 세액공제 환급액을 미리 계산해보세요. 연봉 5,500만 원 분기점 기준으로 세액공제율이 16.5% / 13.2%로 달라집니다.
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
              <span className="mt-2 block text-xs text-slate-400">
                근로소득 + 사업소득 등 종합소득 기준. 5,500만 원 이하는 16.5%, 초과는 13.2%가 적용됩니다.
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">연금저축 연 납입액 (원)</span>
              <input
                type="number"
                value={contribution}
                onChange={(e) => setContribution(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">
                연금저축계좌의 연간 세액공제 한도는 600만 원입니다. 초과분은 다음 해로 이월되지 않습니다.
              </span>
            </label>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">세액공제 적용 한도</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.cappedContribution)} 원</div>
              <div className="mt-1 text-xs text-slate-400">연 600만 원까지 적용</div>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">예상 환급액</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.refund)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">세액공제율 {(result.rate * 100).toFixed(1)}% 적용</div>
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
