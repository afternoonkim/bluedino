"use client";

import { useMemo, useState } from "react";

const TAX_RATE_LOW = 0.165;
const TAX_RATE_HIGH = 0.132;
const PENSION_LIMIT = 6_000_000;
const COMBINED_LIMIT = 9_000_000; // 연금저축·IRP 합산 세액공제 한도
type IncomeType = "salary" | "business";

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function IrpTaxCreditClient() {
  const [incomeType, setIncomeType] = useState<IncomeType>("salary");
  const [incomeAmount, setIncomeAmount] = useState<number>(5500);
  const [irpContribution, setIrpContribution] = useState<number>(9_000_000);
  const [pensionContribution, setPensionContribution] = useState<number>(0);

  const result = useMemo(() => {
    const rate = incomeAmount <= (incomeType === "salary" ? 5500 : 4500) ? TAX_RATE_LOW : TAX_RATE_HIGH;
    // 연금저축 한도(600만 원) + IRP 한도(900만 원) 중 IRP 한도 안에서 두 계좌 합산 적용
    const safePension = Math.max(0, pensionContribution);
    const safeIrp = Math.max(0, irpContribution);
    const cappedPension = Math.min(safePension, PENSION_LIMIT);
    const remaining = COMBINED_LIMIT - cappedPension;
    const cappedIrp = Math.max(0, Math.min(safeIrp, remaining));
    const totalCapped = cappedPension + cappedIrp;
    const refund = Math.floor(totalCapped * rate);
    const overflow = (safeIrp + safePension) - totalCapped;
    return { cappedPension, cappedIrp, totalCapped, rate, refund, overflow };
  }, [incomeAmount, incomeType, irpContribution, pensionContribution]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">IRP 세액공제 계산기</span>
          <h1 className="bd-title-lg mt-4">IRP 세액공제 환급액 계산기</h1>
          <p className="bd-text-main mt-4">
            IRP와 연금저축에 납입한 금액을 합산해 예상 세액공제액을 계산해보세요. 소득 유형을 선택하면 총급여 5,500만 원 또는 종합소득금액 4,500만 원 기준으로 공제율이 적용됩니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">근로소득·종합소득 구분 계산</span>
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">확인 기준: 2026년 10월 9일</span>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">입력</h2>
          <div className="mt-6 space-y-5">
            <div>
              <span className="text-sm font-semibold text-white">소득 유형</span>
              <div className="mt-2 flex flex-wrap gap-3" role="group" aria-label="소득 유형">
                {(["salary", "business"] as IncomeType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={incomeType === type}
                    onClick={() => setIncomeType(type)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      incomeType === type
                        ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-200"
                        : "border-slate-700 bg-slate-900/70 text-slate-300"
                    }`}
                  >
                    {type === "salary" ? "근로소득자" : "사업자·프리랜서"}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="text-sm font-semibold text-white">{incomeType === "salary" ? "총급여 (만 원)" : "종합소득금액 (만 원)"}</span>
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(Math.max(0, Number(e.target.value) || 0))}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">{incomeType === "salary" ? "총급여 5,500만 원 이하 16.5%, 초과 13.2% (지방소득세 포함)" : "종합소득금액 4,500만 원 이하 16.5%, 초과 13.2% (지방소득세 포함)"}</span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">IRP 연 납입액 (원)</span>
              <input
                type="number"
                value={irpContribution}
                onChange={(e) => setIrpContribution(Math.max(0, Number(e.target.value) || 0))}
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
                onChange={(e) => setPensionContribution(Math.max(0, Number(e.target.value) || 0))}
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
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">예상 세액공제액</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.refund)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">세액공제율 {(result.rate * 100).toFixed(1)}%</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">한도 초과분</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.overflow)} 원</div>
              <div className="mt-1 text-xs text-slate-400">올해 환급 대상 아님</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">표시된 금액은 납입액과 공제율로 계산한 세액공제 예상치입니다. 실제 환급액은 이미 낸 세금, 결정세액, 다른 공제 항목에 따라 줄어들거나 없을 수 있습니다.</p>
        </section>

        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-cyan-50/90">
          <p className="font-semibold text-cyan-100">ISA 만기자금 연금계좌 전환도 함께 확인하세요</p>
          <p className="mt-1">ISA 만기자금을 연금저축 또는 IRP로 전환하면 일반 납입 한도와 별도로 추가 세액공제 가능 금액이 생길 수 있습니다. 실제 적용 조건은 금융사, 세법, 정부 정책 변경에 따라 달라질 수 있습니다.</p>
        </section>
      </div>
    </div>
  );
}
