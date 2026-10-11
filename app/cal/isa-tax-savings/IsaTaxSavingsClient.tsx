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
    const taxableProfit = Math.max(0, Number.isFinite(profit) ? profit : 0);
    const exempt = Math.min(taxableProfit, exemptLimit);
    const overflow = Math.max(0, taxableProfit - exemptLimit);
    const isaTax = Math.floor(overflow * ISA_SEPARATED_RATE);
    const generalTax = Math.floor(taxableProfit * GENERAL_TAX_RATE);
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
            이자·배당 등 과세 대상 순이익을 기준으로 일반 계좌(15.4%)와 ISA(비과세 한도 초과분 9.9%)의 예상 세금을 비교합니다. 국내 상장주식 매매차익은 일반 계좌에서도 원칙적으로 비과세이므로 입력에서 제외하세요.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: 제도 기준 반영</span>
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">기준: 2026년 10월 ISA 과세 안내</span>
          </div>
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
              <span className="text-sm font-semibold text-white">과세 대상 순이익 (원)</span>
              <input
                type="number"
                value={profit}
                onChange={(e) => setProfit(Math.max(0, Number(e.target.value) || 0))}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={100_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">
                이자·배당, 과세 대상 ETF·펀드 소득 등에서 ISA 손익통산이 허용되는 손실만 차감한 금액을 입력하세요. 국내 상장주식 매매차익은 제외합니다. 상품별 통산 범위는 금융회사에서 확인하세요.
              </span>
            </label>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과 비교</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">일반 계좌 예상 세금 (15.4%)</div>
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
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">단순 비교 절세액</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.savings)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">같은 과세 대상 순이익을 가정한 차이</div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-sm leading-7 text-amber-50/90">
          ISA를 3년 이상 유지하고 정상 정산하는 경우를 가정합니다. 일반 계좌도 동일한 과세 대상 순이익에 15.4%가 적용된다고 단순 비교한 결과로, 계좌별 손익통산 차이·금융소득 종합과세·상품별 과세 방식·해외 원천징수·수수료는 반영하지 않았습니다. 실제 세금은 보유 상품과 가입·해지 조건을 확인하세요.
        </section>
      </div>
    </div>
  );
}
