"use client";

import { useMemo, useState } from "react";

const ISA_GENERAL_EXEMPT = 2_000_000;   // 일반형 비과세 한도
const ISA_LIGHT_EXEMPT = 4_000_000;     // 서민형 비과세 한도
const ISA_SEPARATED_RATE = 0.099;       // 초과분 분리과세율
const GENERAL_TAX_RATE = 0.154;         // 일반 계좌 배당소득세

type IsaType = "general" | "light";

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function IsaTaxSavingsClient() {
  const [profit, setProfit] = useState<number>(5_000_000);
  const [isaType, setIsaType] = useState<IsaType>("general");

  const result = useMemo(() => {
    const exemptLimit = isaType === "light" ? ISA_LIGHT_EXEMPT : ISA_GENERAL_EXEMPT;
    const exempt = Math.min(profit, exemptLimit);
    const overflow = Math.max(0, profit - exemptLimit);
    const isaTax = Math.floor(overflow * ISA_SEPARATED_RATE);
    const generalTax = Math.floor(profit * GENERAL_TAX_RATE);
    const savings = generalTax - isaTax;
    return { exempt, overflow, isaTax, generalTax, savings };
  }, [profit, isaType]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">ISA 절세 효과 계산기</span>
          <h1 className="bd-title-lg mt-4">ISA 절세 효과 — 일반 계좌 vs ISA 비교</h1>
          <p className="bd-text-main mt-4">
            ISA 운용 수익에 대한 비과세 한도와 분리과세 9.9%를 적용해, 일반 계좌(15.4%) 대비 얼마나 세금이 줄어드는지 계산합니다.
          </p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">입력</h2>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-white">ISA 유형</span>
              <div className="mt-2 flex gap-3">
                {(["general", "light"] as IsaType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setIsaType(t)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isaType === t
                        ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-200"
                        : "border-slate-700 bg-slate-900/70 text-slate-300"
                    }`}
                  >
                    {t === "general" ? "일반형 (비과세 200만 원)" : "서민형 (비과세 400만 원)"}
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">예상 운용 수익 (원)</span>
              <input
                type="number"
                value={profit}
                onChange={(e) => setProfit(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">
                ISA 가입 기간 동안 발생할 배당·이자·자본차익의 합계 (세전)
              </span>
            </label>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과 비교</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">일반 계좌 세금 (15.4%)</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.generalTax)} 원</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">ISA 세금</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.isaTax)} 원</div>
              <div className="mt-1 text-xs text-emerald-200">
                비과세 {formatKRW(result.exempt)} 원 + 초과분 9.9%
              </div>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">절세 효과</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.savings)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">일반 계좌 대비 절약</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
