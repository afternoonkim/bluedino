"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdBlock from "@/components/ad/AdBlock";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";
import { LoanRepaymentType, buildAmortization, formatCurrency, formatPercent, parseMoney } from "../components/loanCalculators";

export default function LoanInterestCalculatorClient() {
  const [loanAmount, setLoanAmount] = useState("300000000");
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanYears, setLoanYears] = useState(20);
  const [repaymentType, setRepaymentType] = useState<LoanRepaymentType>("equal-payment");
  const [extraPayment, setExtraPayment] = useState("0");

  const result = useMemo(() => {
    const principal = parseMoney(loanAmount);
    const months = loanYears * 12;
    const extra = parseMoney(extraPayment);
    const rows = buildAmortization({
      principal,
      annualRate: interestRate,
      months,
      repaymentType,
      extraPayment: extra,
    });

    const first = rows[0];
    const totalInterest = rows.reduce((sum, row) => sum + row.interestPaid, 0);
    const totalPayment = rows.reduce((sum, row) => sum + row.payment, 0);
    const finalMonth = rows[rows.length - 1]?.month ?? 0;
    const chartData = rows.filter((row) => row.month % 12 === 0 || row.month === 1).map((row) => ({
      month: `${row.month}개월`,
      잔액: Math.round(row.balance),
      누적이자: Math.round(row.cumulativeInterest),
    }));

    return { principal, rows, first, totalInterest, totalPayment, finalMonth, chartData };
  }, [loanAmount, interestRate, loanYears, repaymentType, extraPayment]);

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="대출 계산기"
          title="대출이자 계산기로 월 상환액과 총이자를 함께 비교하세요"
          description="대출금액, 금리, 기간, 상환방식을 입력하면 월 상환액, 총이자, 예상 상환기간을 한 번에 확인할 수 있습니다. 원리금균등과 원금균등의 차이를 비교하고 중도 추가상환이 실제로 얼마나 효과가 있는지 가늠하기 좋습니다."
          tip="대출은 금리보다 총이자와 현금흐름을 같이 봐야 체감 부담을 제대로 읽을 수 있습니다. 월 상환액이 감당 가능한지부터 확인해보세요."
        />

        <div className="bd-grid-2">
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">입력 조건</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="대출금액">
                <input className="bd-input" value={Number(loanAmount || 0).toLocaleString("ko-KR")} onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="추가 상환액 (매월)">
                <input className="bd-input" value={Number(extraPayment || 0).toLocaleString("ko-KR")} onChange={(e) => setExtraPayment(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="금리">
                <div>
                  <input type="range" min={1} max={15} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">연 {interestRate.toFixed(1)}%</div>
                </div>
              </Field>
              <Field label="대출 기간">
                <div>
                  <input type="range" min={1} max={35} step={1} value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">{loanYears}년</div>
                </div>
              </Field>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => setRepaymentType("equal-payment")} className={repaymentType === "equal-payment" ? "bd-button-primary text-sm" : "bd-button-secondary text-sm"}>원리금균등</button>
              <button type="button" onClick={() => setRepaymentType("equal-principal")} className={repaymentType === "equal-principal" ? "bd-button-primary text-sm" : "bd-button-secondary text-sm"}>원금균등</button>
            </div>
          </section>

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">계산 결과</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard title="첫 달 상환액" value={formatCurrency(result.first?.payment ?? 0)} sub={repaymentType === "equal-payment" ? "원리금균등 기준" : "원금균등 첫 회차"} />
              <ResultCard title="총이자" value={formatCurrency(result.totalInterest)} sub="대출기간 전체 기준" />
              <ResultCard title="총상환액" value={formatCurrency(result.totalPayment)} sub="원금 + 이자" />
              <ResultCard title="예상 상환 개월 수" value={`${result.finalMonth}개월`} sub="추가상환 반영" />
            </div>
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm leading-7 text-slate-300">
              {repaymentType === "equal-payment"
                ? `원리금균등은 월 상환액이 비교적 일정해서 현금흐름 관리가 쉽지만 초기 이자 비중이 높습니다. 추가상환을 넣으면 총이자를 줄이는 효과를 체감하기 좋습니다.`
                : `원금균등은 초반 상환액 부담이 크지만 시간이 갈수록 월 상환액이 줄어들고 총이자가 낮아지는 경향이 있습니다. 소득이 안정적이라면 장기적으로 유리할 수 있습니다.`}
            </div>
          </section>
        </div>

        <AdBlock label="대출이자 계산기 중단 광고 영역" slotKey="inline" format="horizontal" />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">잔액과 누적이자 흐름</h2>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.chartData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 10000)}만`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="잔액" stackId="1" stroke="#22d3ee" fill="#0891b2" fillOpacity={0.35} />
                <Area type="monotone" dataKey="누적이자" stackId="2" stroke="#60a5fa" fill="#2563eb" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">초기 상환 스케줄</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-4 py-3">회차</th>
                  <th className="px-4 py-3">상환액</th>
                  <th className="px-4 py-3">원금</th>
                  <th className="px-4 py-3">이자</th>
                  <th className="px-4 py-3">잔액</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.slice(0, 12).map((row) => (
                  <tr key={row.month} className="border-b border-slate-900/80">
                    <td className="px-4 py-3">{row.month}회차</td>
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
          heading="대출이자 계산기 제대로 쓰는 법"
          intro="이 계산기는 대출을 받기 전에 월 상환액과 총이자를 먼저 확인하고, 지금 내 상황에서 부담 가능한 수준인지 판단할 때 유용합니다. 아래 기준을 같이 보면 숫자를 더 현실적으로 해석할 수 있습니다."
          sections={[
            {
              title: "월 상환액보다 총이자도 같이 봐야 한다",
              body: "월 상환액만 맞추려고 기간을 길게 잡으면 당장은 편할 수 있지만 총이자는 크게 늘 수 있습니다. 특히 장기 대출일수록 금리와 기간이 총이자에 미치는 영향이 큽니다.",
            },
            {
              title: "원리금균등과 원금균등의 차이",
              body: "원리금균등은 월 상환액이 일정해 관리가 쉽고, 원금균등은 초반 부담이 크지만 총이자가 낮아지는 편입니다. 소득 흐름에 따라 적합한 방식이 달라집니다.",
            },
            {
              title: "추가상환은 생각보다 효과가 크다",
              body: "여유자금이 생길 때마다 일정 금액을 추가상환하면 남은 원금이 빨리 줄어 총이자 절감 효과를 체감하기 쉽습니다. 특히 초기 몇 년의 추가상환 효율이 높은 편입니다.",
            },
            {
              title: "이 계산기의 활용법",
              body: "원리금균등, 원금균등, 추가상환 시나리오를 비교해보고 DSR 계산기와 함께 보면 내가 감당 가능한 대출 범위를 더 구체적으로 판단할 수 있습니다.",
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
