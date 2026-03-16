"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import AdBlock from "@/components/ad/AdBlock";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";
import { formatCurrency, formatPercent, parseMoney } from "../components/loanCalculators";

const COLORS = ["#22d3ee", "#0f172a", "#60a5fa"];

export default function LtvCalculatorClient() {
  const [housePrice, setHousePrice] = useState("850000000");
  const [existingMortgage, setExistingMortgage] = useState("0");
  const [cashReady, setCashReady] = useState("250000000");
  const [policyLtv, setPolicyLtv] = useState(70);

  const result = useMemo(() => {
    const price = parseMoney(housePrice);
    const existing = parseMoney(existingMortgage);
    const cash = parseMoney(cashReady);
    const maxLoan = Math.max(0, price * (policyLtv / 100) - existing);
    const actualLtv = price > 0 ? ((existing + maxLoan) / price) * 100 : 0;
    const ownCapitalNeed = Math.max(0, price - maxLoan);
    const cashGap = ownCapitalNeed - cash;
    const purchasePossible = cash >= ownCapitalNeed;
    const loanShare = maxLoan;
    const cashShare = Math.min(cash, price - loanShare);
    const remainder = Math.max(0, price - loanShare - cashShare);

    return {
      price,
      maxLoan,
      actualLtv,
      ownCapitalNeed,
      cashGap,
      purchasePossible,
      pie: [
        { name: "가능 대출", value: loanShare },
        { name: "보유 자금", value: cashShare },
        { name: "추가 필요 자금", value: remainder },
      ],
    };
  }, [housePrice, existingMortgage, cashReady, policyLtv]);

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="주담대 계산기"
          title="LTV 계산기로 담보대출 가능 범위를 빠르게 가늠하세요"
          description="주택 가격, 기존 담보대출, 보유 현금을 입력하면 담보인정비율 기준에서 추가 대출 가능 금액과 필요한 자기자본 규모를 빠르게 확인할 수 있습니다. 실제 LTV 규제는 지역, 주택 수, 정책, 금융사 기준에 따라 달라질 수 있습니다."
          tip="LTV는 집값 대비 대출 비중을 보여주는 지표입니다. 집을 살 수 있느냐보다 자기자본이 얼마나 필요한지 먼저 보게 해주는 계산기라고 생각하면 이해가 쉽습니다."
        />

        <div className="bd-grid-2">
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">입력 조건</h2>
            <div className="mt-6 grid gap-5">
              <Field label="주택 가격">
                <input className="bd-input" value={Number(housePrice || 0).toLocaleString("ko-KR")} onChange={(e) => setHousePrice(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="기존 담보대출">
                <input className="bd-input" value={Number(existingMortgage || 0).toLocaleString("ko-KR")} onChange={(e) => setExistingMortgage(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="현재 보유 자금">
                <input className="bd-input" value={Number(cashReady || 0).toLocaleString("ko-KR")} onChange={(e) => setCashReady(e.target.value.replace(/[^0-9]/g, ""))} />
              </Field>
              <Field label="적용 LTV 기준">
                <div>
                  <input type="range" min={20} max={80} step={5} value={policyLtv} onChange={(e) => setPolicyLtv(Number(e.target.value))} className="w-full accent-cyan-400" />
                  <div className="mt-2 text-sm text-slate-400">{policyLtv}%</div>
                </div>
              </Field>
            </div>
          </section>

          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">계산 결과</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard title="추가 가능 대출" value={formatCurrency(result.maxLoan)} sub="기존 담보대출 반영" />
              <ResultCard title="적용 LTV" value={formatPercent(result.actualLtv)} sub="추정 담보인정비율" />
              <ResultCard title="필요 자기자본" value={formatCurrency(result.ownCapitalNeed)} sub="주택 가격 - 가능 대출" />
              <ResultCard title="자금 부족분" value={formatCurrency(Math.max(0, result.cashGap))} sub={result.purchasePossible ? "현재 보유 자금으로 충당 가능" : "추가 자금 확인 필요"} />
            </div>
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm leading-7 text-slate-300">
              {result.purchasePossible
                ? "현재 입력 기준으로는 보유 자금과 대출 가능 금액을 합쳐 자금 구조를 맞출 가능성이 있습니다. 다만 취득세, 중개수수료, 이사비, 잔금 일정 같은 부대비용도 따로 확인하는 것이 안전합니다."
                : "현재 입력 기준으로는 자기자본이 부족할 수 있습니다. 대출 규제보다 실제 잔금과 부대비용이 더 큰 변수일 수 있으니 여유 자금까지 같이 계산해보세요."}
            </div>
          </section>
        </div>

        <AdBlock label="LTV 계산기 중단 광고 영역" slotKey="inline" format="horizontal" />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자금 구조 한눈에 보기</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={result.pie} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
                    {result.pie.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {result.pie.map((item, index) => (
                <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <div className="text-sm text-slate-400">{item.name}</div>
                  </div>
                  <div className="mt-2 text-xl font-bold text-white">{formatCurrency(item.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CalculatorSeoContent
          heading="LTV 계산기 해석할 때 같이 봐야 하는 요소"
          intro="네이버에서 LTV 계산기, 주담대 한도, 내 집 마련 자금 같은 키워드를 검색하는 분들은 대개 집값 대비 얼마까지 빌릴 수 있는지와 자기자본이 얼마나 필요한지 동시에 궁금해합니다."
          sections={[
            {
              title: "LTV는 한도, DSR은 상환능력",
              body: "LTV는 담보가치 기준의 한도이고, DSR은 소득 기준의 상환 가능성을 보는 지표입니다. 실제 대출 가능 금액은 둘 중 더 보수적인 기준에 맞춰지는 경우가 많습니다.",
            },
            {
              title: "부대비용은 별도로 계산해야 한다",
              body: "취득세, 법무비용, 중개보수, 이사비용은 LTV 계산에 바로 들어가지 않습니다. 실제 자금계획에서는 계약금과 잔금 외에 이런 비용까지 함께 반영해야 합니다.",
            },
            {
              title: "기존 담보대출이 있으면 여력이 줄어든다",
              body: "이미 담보대출이 있거나 선순위 채권이 있으면 같은 주택 가격이라도 추가 대출 가능 금액은 줄어듭니다. 갈아타기나 상환 시나리오를 같이 보는 것이 현실적입니다.",
            },
            {
              title: "이 계산기의 활용법",
              body: "집값 대비 대출 비중과 자기자본 수준을 빠르게 확인하는 용도로 활용하세요. 이후 DSR 계산기와 주담대 계산기를 함께 보면 더 구체적인 월 상환 전략까지 연결할 수 있습니다.",
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
