"use client";

import { useMemo, useState } from "react";

function formatKRW(value: number) {
  return value.toLocaleString("ko-KR");
}

export default function JeonseLoanInterestClient() {
  const [deposit, setDeposit] = useState<number>(300_000_000);
  const [loanAmount, setLoanAmount] = useState<number>(240_000_000);
  const [rate, setRate] = useState<number>(3.5);
  const [months, setMonths] = useState<number>(24);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const monthlyInterest = Math.floor(loanAmount * monthlyRate);
    const totalInterest = monthlyInterest * months;
    const ratio = deposit > 0 ? (loanAmount / deposit) * 100 : 0;
    return { monthlyInterest, totalInterest, ratio };
  }, [deposit, loanAmount, rate, months]);

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">전세대출 이자 계산기</span>
          <h1 className="bd-title-lg mt-4">전세자금대출 월 이자 계산기</h1>
          <p className="bd-text-main mt-4">
            전세 보증금과 대출 한도, 금리, 계약 기간을 입력하면 매월 부담하는 이자와 총 이자 부담을 확인할 수 있습니다. 전세대출은 보통 만기 일시상환 구조라 매월 이자만 갚는 형태입니다.
          </p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">입력</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-white">전세 보증금 (원)</span>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={1_000_000}
                min={0}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">대출 한도 (원)</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={1_000_000}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">보통 보증금의 80% 이내</span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">연 금리 (%)</span>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={0.1}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">청년 버팀목 약 2%대 / 시중은행 4~5%대</span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">계약 기간 (개월)</span>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white"
                step={6}
                min={0}
              />
              <span className="mt-2 block text-xs text-slate-400">전세 일반 24개월 / 갱신 시 + 24개월</span>
            </label>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">월 이자</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.monthlyInterest)} 원</div>
              <div className="mt-1 text-xs text-cyan-200">매월 자동이체 부담</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">총 이자 부담</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatKRW(result.totalInterest)} 원</div>
              <div className="mt-1 text-xs text-slate-400">{months}개월 누적</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">대출 비율 (LTV)</div>
              <div className="mt-2 text-2xl font-bold text-white">{result.ratio.toFixed(1)}%</div>
              <div className="mt-1 text-xs text-slate-400">보증금 대비 대출 비율</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
