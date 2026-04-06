"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdBlock from "@/components/ad/AdBlock";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";
import { buildAmortization, formatCurrency, formatNumber, formatPercent, monthlyPayment, parseMoney } from "../components/loanCalculators";

const policyPresets = [35, 40, 50, 60];

export default function DsrCalculatorClient() {
  const [annualIncome, setAnnualIncome] = useState("70000000");
  const [existingAnnualRepayment, setExistingAnnualRepayment] = useState("12000000");
  const [newLoanAmount, setNewLoanAmount] = useState("250000000");
  const [interestRate, setInterestRate] = useState(4.2);
  const [loanYears, setLoanYears] = useState(30);
  const [targetDsr, setTargetDsr] = useState(40);

  const result = useMemo(() => {
    const income = parseMoney(annualIncome);
    const existing = parseMoney(existingAnnualRepayment);
    const principal = parseMoney(newLoanAmount);
    const months = loanYears * 12;
    const monthly = monthlyPayment(principal, interestRate, months);
    const newAnnualRepayment = monthly * 12;
    const totalAnnualRepayment = existing + newAnnualRepayment;
    const dsr = income > 0 ? (totalAnnualRepayment / income) * 100 : 0;
    const availableAnnualRepayment = Math.max(0, income * (targetDsr / 100) - existing);
    const availableMonthlyRepayment = availableAnnualRepayment / 12;
    const maxPrincipalByTarget = availableMonthlyRepayment <= 0
      ? 0
      : principal * (availableMonthlyRepayment / monthly || 0);

    const scenarioRates = [interestRate - 1, interestRate, interestRate + 1].map((rate) => Math.max(rate, 0.1));
    const chartData = scenarioRates.map((rate) => {
      const scenarioMonthly = monthlyPayment(principal, rate, months);
      return {
        name: `${rate.toFixed(1)}%`,
        월상환액: Math.round(scenarioMonthly),
        연간상환액: Math.round(scenarioMonthly * 12),
      };
    });

    const amortization = buildAmortization({
      principal,
      annualRate: interestRate,
      months,
      repaymentType: "equal-payment",
    });

    return {
      income,
      existing,
      principal,
      monthly,
      newAnnualRepayment,
      totalAnnualRepayment,
      dsr,
      availableAnnualRepayment,
      availableMonthlyRepayment,
      maxPrincipalByTarget,
      chartData,
      amortization: amortization.filter((row) => row.month % 12 === 0 || row.month === 1).slice(0, 10),
    };
  }, [annualIncome, existingAnnualRepayment, newLoanAmount, interestRate, loanYears, targetDsr]);

  const statusText = result.dsr <= targetDsr
    ? `현재 입력 기준 DSR은 ${formatPercent(result.dsr)}로 목표 기준 ${targetDsr}% 이내입니다.`
    : `현재 입력 기준 DSR은 ${formatPercent(result.dsr)}로 목표 기준 ${targetDsr}%를 넘을 가능성이 있습니다.`;

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="대출 계산기"
          title="DSR 계산기로 내 소득 대비 대출 부담을 먼저 확인하세요"
          description="연 소득, 기존 대출 원리금, 신규 대출 조건을 입력하면 총부채원리금상환비율을 계산하고 추가 대출 여력을 추정합니다. 실제 심사 기준은 금융사와 정책, 신용도에 따라 다를 수 있지만 대출 전략을 세우기 전 기본 감을 잡는 데 유용합니다."
          tip="DSR은 단순 금리보다 연간 원리금 부담을 보는 지표라서 신용대출, 주담대, 자동차 할부가 함께 있을 때 특히 중요합니다."
        />

        <div className="bd-grid-2">
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">입력 조건</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="연 소득">
                <input className="bd-input" value={Number(annualIncome || 0).toLocaleString("ko-KR")} onChange={(e) => setAnnualIncome(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="기존 대출 연간 원리금">
                <input className="bd-input" value={Number(existingAnnualRepayment || 0).toLocaleString("ko-KR")} onChange={(e) => setExistingAnnualRepayment(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="신규 대출금액">
                <input className="bd-input" value={Number(newLoanAmount || 0).toLocaleString("ko-KR")} onChange={(e) => setNewLoanAmount(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="대출 기간">
                <div>
                  <input type="range" min={1} max={40} value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">{loanYears}년</div>
                </div>
              </Field>
              <Field label="금리">
                <div>
                  <input type="range" min={1} max={15} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">연 {interestRate.toFixed(1)}%</div>
                </div>
              </Field>
              <Field label="목표 DSR 기준">
                <div className="flex flex-wrap gap-2">
                  {policyPresets.map((preset) => (
                    <button key={preset} type="button" onClick={() => setTargetDsr(preset)} className={preset === targetDsr ? "bd-button-primary text-sm" : "bd-button-secondary text-sm"}>
                      {preset}%
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </section>

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">계산 결과</h2>
            <p className="mt-3 bd-text-sub">{statusText}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard title="예상 DSR" value={formatPercent(result.dsr)} sub="총부채원리금상환비율" />
              <ResultCard title="신규 월 상환액" value={formatCurrency(result.monthly)} sub="원리금균등 기준" />
              <ResultCard title="연간 총 상환액" value={formatCurrency(result.totalAnnualRepayment)} sub="기존+신규 합산" />
              <ResultCard title="목표 기준 최대 대출 추정" value={formatCurrency(result.maxPrincipalByTarget)} sub={`${targetDsr}% 기준 단순 추정`} />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-sm text-slate-400">남는 연간 상환 여력</div>
              <div className="mt-2 text-2xl font-bold text-white">{formatCurrency(result.availableAnnualRepayment)}</div>
              <div className="mt-2 text-sm text-slate-400">월 기준 약 {formatCurrency(result.availableMonthlyRepayment)}</div>
            </div>
          </section>
        </div>

        <AdBlock label="DSR 계산기 중단 광고 영역" slotKey="inline" format="horizontal" />

        <section className="bd-card bd-card-padding">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="bd-title-md">금리 변화에 따른 월 상환액 비교</h2>
              <p className="bd-text-sub">같은 대출금이어도 금리 1% 차이가 월 상환액에 미치는 영향을 미리 확인할 수 있습니다.</p>
            </div>
          </div>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 10000)}만`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="월상환액" stroke="#22d3ee" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="연간상환액" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">초기 10개 연도 상환 흐름</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-4 py-3">회차</th>
                  <th className="px-4 py-3">월 상환액</th>
                  <th className="px-4 py-3">원금</th>
                  <th className="px-4 py-3">이자</th>
                  <th className="px-4 py-3">잔액</th>
                </tr>
              </thead>
              <tbody>
                {result.amortization.map((row) => (
                  <tr key={row.month} className="border-b border-slate-900/80">
                    <td className="px-4 py-3">{row.month}개월차</td>
                    <td className="px-4 py-3">{formatCurrency(row.payment)}</td>
                    <td className="px-4 py-3">{formatCurrency(row.principalPaid)}</td>
                    <td className="px-4 py-3">{formatCurrency(row.interestPaid)}</td>
                    <td className="px-4 py-3">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <CalculatorSeoContent
          heading="DSR 계산기 보는 법과 실전 체크포인트"
          intro="이 계산기는 지금 내 소득 기준으로 대출 부담이 어느 정도인지 가늠해볼 때 유용합니다. 아래 항목을 함께 보면 계산 결과를 실제 상황에 더 가깝게 해석할 수 있습니다."
          sections={[
            {
              title: "DSR은 왜 중요한가",
              body: "DSR은 연 소득 대비 연간 원리금 상환 부담을 비율로 보여주는 지표입니다. 단순히 이자만 보는 것이 아니라 원금과 이자를 모두 반영하기 때문에 실제 상환 부담을 더 가깝게 보여줍니다.",
            },
            {
              title: "기존 대출을 먼저 넣어야 하는 이유",
              body: "카드론, 마이너스통장, 신용대출, 자동차 할부 같은 기존 대출이 있으면 신규 대출 여력은 줄어듭니다. 대출 갈아타기나 상환 계획을 같이 세워야 체감 한도가 달라질 수 있습니다.",
            },
            {
              title: "금리 1% 차이를 무시하면 안 되는 이유",
              body: "대출 기간이 길수록 금리 1%포인트 차이는 월 상환액과 총이자에서 큰 차이를 만듭니다. 특히 20년 이상 장기 대출에서는 금리보다 총 상환액을 같이 비교하는 것이 중요합니다.",
            },
            {
              title: "이 계산기의 활용법",
              body: "실제 심사 결과를 단정하기보다는 내 소득에서 안전한 월 상환액이 어느 정도인지 확인하는 용도로 활용하는 것이 좋습니다. 이후 주담대 계산기, 대출이자 계산기와 함께 보면 더 입체적으로 판단할 수 있습니다.",
            },
          ]}
        />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-300">{label}</div>
      {children}
    </label>
  );
}

function ResultCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
