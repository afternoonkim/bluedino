"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdBlock from "@/components/ad/AdBlock";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";
import { buildAmortization, formatCurrency, monthlyPayment, parseMoney } from "../components/loanCalculators";

export default function MortgageCalculatorClient() {
  const [housePrice, setHousePrice] = useState("900000000");
  const [downPayment, setDownPayment] = useState("300000000");
  const [interestRate, setInterestRate] = useState(4.1);
  const [loanYears, setLoanYears] = useState(30);
  const [acquisitionCostRate, setAcquisitionCostRate] = useState(4.6);

  const result = useMemo(() => {
    const price = parseMoney(housePrice);
    const down = parseMoney(downPayment);
    const principal = Math.max(0, price - down);
    const months = loanYears * 12;
    const monthly = monthlyPayment(principal, interestRate, months);
    const schedule = buildAmortization({ principal, annualRate: interestRate, months, repaymentType: "equal-payment" });
    const totalInterest = schedule.reduce((sum, row) => sum + row.interestPaid, 0);
    const acquisitionCost = price * (acquisitionCostRate / 100);
    const totalCashNeed = down + acquisitionCost;
    const yearlyData = schedule.filter((row) => row.month % 12 === 0 || row.month === 1).slice(0, 10).map((row) => ({
      year: `${Math.ceil(row.month / 12)}년`,
      잔액: Math.round(row.balance),
      누적이자: Math.round(row.cumulativeInterest),
    }));

    return {
      price,
      down,
      principal,
      monthly,
      totalInterest,
      acquisitionCost,
      totalCashNeed,
      yearlyData,
    };
  }, [housePrice, downPayment, interestRate, loanYears, acquisitionCostRate]);

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="주담대 계산기"
          title="주택 가격과 자기자본을 넣고 주담대 부담을 미리 시뮬레이션하세요"
          description="주택 가격, 계약금·잔금으로 넣을 자기자본, 금리, 대출 기간을 입력하면 주택담보대출 원금과 월 상환액, 총이자, 취득 부대비용까지 한 번에 볼 수 있습니다. 내 집 마련 자금계획의 첫 초안을 잡는 데 유용합니다."
          tip="주담대는 대출 원금만 보는 것보다 취득세와 부대비용까지 포함한 총 현금 필요액을 같이 봐야 실제 자금계획이 흔들리지 않습니다."
        />

        <div className="bd-grid-2">
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">입력 조건</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="주택 가격">
                <input className="bd-input" value={Number(housePrice || 0).toLocaleString("ko-KR")} onChange={(e) => setHousePrice(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="자기자본(계약금+잔금)">
                <input className="bd-input" value={Number(downPayment || 0).toLocaleString("ko-KR")} onChange={(e) => setDownPayment(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="금리">
                <div>
                  <input type="range" min={1} max={10} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">연 {interestRate.toFixed(1)}%</div>
                </div>
              </Field>
              <Field label="대출 기간">
                <div>
                  <input type="range" min={5} max={40} step={1} value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">{loanYears}년</div>
                </div>
              </Field>
              <Field label="취득 관련 비용률">
                <div>
                  <input type="range" min={1} max={8} step={0.1} value={acquisitionCostRate} onChange={(e) => setAcquisitionCostRate(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">약 {acquisitionCostRate.toFixed(1)}%</div>
                </div>
              </Field>
            </div>
          </section>

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">계산 결과</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard title="예상 대출 원금" value={formatCurrency(result.principal)} sub="주택 가격 - 자기자본" />
              <ResultCard title="예상 월 상환액" value={formatCurrency(result.monthly)} sub="원리금균등 기준" />
              <ResultCard title="총이자" value={formatCurrency(result.totalInterest)} sub="전체 대출기간 합계" />
              <ResultCard title="필요 초기 현금" value={formatCurrency(result.totalCashNeed)} sub="자기자본 + 취득비용" />
            </div>
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm leading-7 text-slate-300">
              주택 구매에서는 대출 가능 여부만큼이나 초기 현금이 얼마나 필요한지가 중요합니다. 취득세, 중개보수, 법무비용 등은 금융사 대출금으로 바로 충당되지 않는 경우가 많아 실제 자금계획에서 따로 준비해야 합니다.
            </div>
          </section>
        </div>

        <AdBlock label="주담대 계산기 중단 광고 영역" slotKey="inline" format="horizontal" />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">연도별 잔액과 누적이자 흐름</h2>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.yearlyData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 10000)}만`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="잔액" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                <Bar dataKey="누적이자" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <CalculatorSeoContent
          heading="주담대 계산기와 함께 봐야 하는 핵심 포인트"
          intro="이 계산기는 주택담보대출을 받을 때 월 상환액과 총이자를 미리 확인하고, 내 현금흐름으로 감당 가능한 수준인지 판단할 때 유용합니다."
          sections={[
            {
              title: "월 상환액이 생활비를 잠식하지 않는지",
              body: "주담대는 대출금이 크기 때문에 같은 금리라도 기간과 원금 규모에 따라 월 상환액 차이가 크게 벌어집니다. 무리한 월 상환 구조는 장기적으로 자산계획을 흔들 수 있습니다.",
            },
            {
              title: "취득 비용을 빼놓지 말아야 한다",
              body: "자기자본만 준비했다고 끝이 아닙니다. 취득세, 중개수수료, 법무비, 이사비용까지 합치면 실제 현금 필요액은 생각보다 커질 수 있습니다.",
            },
            {
              title: "LTV와 DSR을 같이 봐야 한다",
              body: "주담대는 담보가치 기준의 LTV와 소득 기준의 DSR이 함께 영향을 줍니다. 집값 기준으로는 가능해 보여도 소득 기준에서 상환 여력이 부족하면 실제 실행 가능 금액은 줄어들 수 있습니다.",
            },
            {
              title: "이 계산기의 활용법",
              body: "주담대 원금과 월 상환액, 총이자를 먼저 보고 이후 LTV 계산기와 DSR 계산기를 함께 사용하면 자금구조와 상환능력을 한 세트로 볼 수 있습니다.",
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
