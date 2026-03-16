"use client";

import { useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as htmlToImage from "html-to-image";
import CalculatorSeoContent from "../components/CalculatorSeoContent";


type ContributionTiming = "end" | "begin";

type YearRow = {
  yearLabel: string;
  yearIndex: number;
  age: number;
  invested: number;
  profit: number;
  total: number;
  realTotal: number;
};

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("ko-KR");
}

function formatCurrency(value: number) {
  return `${formatNumber(value)}원`;
}

function formatShortKrw(value: number) {
  const abs = Math.abs(value);
  if (abs >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
  if (abs >= 10000) return `${(value / 10000).toFixed(0)}만`;
  return `${formatNumber(value)}`;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function sanitizeNumericString(input: string) {
  return input.replace(/[^0-9]/g, "");
}

function parseMoney(input: string) {
  const cleaned = sanitizeNumericString(input);
  return cleaned ? Number(cleaned) : 0;
}

function yearsToGoal(params: {
  initialAmount: number;
  annualReturnRate: number;
  annualIncreaseRate: number;
  monthlyContribution: number;
  targetAmount: number;
  inflationRate: number;
  contributionTiming: ContributionTiming;
}) {
  const {
    initialAmount,
    annualReturnRate,
    annualIncreaseRate,
    monthlyContribution,
    targetAmount,
    inflationRate,
    contributionTiming,
  } = params;

  if (targetAmount <= 0) return 0;
  if (initialAmount >= targetAmount) return 0;

  let balance = initialAmount;
  let monthlyBase = monthlyContribution;
  const monthlyRate = annualReturnRate / 100 / 12;
  let monthCount = 0;
  const maxMonths = 1200;

  while (monthCount < maxMonths) {
    const currentYearIndex = Math.floor(monthCount / 12);
    const adjustedMonthly =
      monthlyBase * Math.pow(1 + annualIncreaseRate / 100, currentYearIndex);

    if (contributionTiming === "begin") {
      balance += adjustedMonthly;
      balance *= 1 + monthlyRate;
    } else {
      balance *= 1 + monthlyRate;
      balance += adjustedMonthly;
    }

    monthCount += 1;

    const realBalance = balance / Math.pow(1 + inflationRate / 100, monthCount / 12);
    if (realBalance >= targetAmount) {
      return Number((monthCount / 12).toFixed(1));
    }
  }

  return null;
}

export default function CompoundCalculatorPage() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [initialAsset, setInitialAsset] = useState("10000000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000000");
  const [annualReturnRate, setAnnualReturnRate] = useState(8);
  const [annualIncreaseRate, setAnnualIncreaseRate] = useState(2.5);
  const [investmentYears, setInvestmentYears] = useState(30);
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAsset, setTargetAsset] = useState("1000000000");
  const [inflationRate, setInflationRate] = useState(2.5);
  const [contributionTiming, setContributionTiming] =
    useState<ContributionTiming>("end");
  const [selectedMonthlyPreset, setSelectedMonthlyPreset] = useState(100);

  const simulation = useMemo(() => {
    const principal = parseMoney(initialAsset);
    const monthly = parseMoney(monthlyContribution);
    const target = parseMoney(targetAsset);
    const safeYears = clampNumber(investmentYears, 1, 60);
    const safeCurrentAge = clampNumber(currentAge, 0, 120);
    const monthlyRate = annualReturnRate / 100 / 12;

    let balance = principal;
    let totalInvested = principal;
    const rows: YearRow[] = [];

    for (let year = 1; year <= safeYears; year += 1) {
      const adjustedMonthly =
        monthly * Math.pow(1 + annualIncreaseRate / 100, year - 1);

      for (let month = 0; month < 12; month += 1) {
        if (contributionTiming === "begin") {
          balance += adjustedMonthly;
          totalInvested += adjustedMonthly;
          balance *= 1 + monthlyRate;
        } else {
          balance *= 1 + monthlyRate;
          balance += adjustedMonthly;
          totalInvested += adjustedMonthly;
        }
      }

      const realTotal = balance / Math.pow(1 + inflationRate / 100, year);

      rows.push({
        yearLabel: `${year}년`,
        yearIndex: year,
        age: safeCurrentAge + year,
        invested: Math.round(totalInvested),
        profit: Math.round(balance - totalInvested),
        total: Math.round(balance),
        realTotal: Math.round(realTotal),
      });
    }

    const final = rows[rows.length - 1];
    const totalAsset = final?.total ?? principal;
    const realAsset = final?.realTotal ?? principal;
    const totalProfit = Math.max(0, totalAsset - (final?.invested ?? principal));
    const multiple = totalInvested > 0 ? totalAsset / totalInvested : 0;
    const targetYear = yearsToGoal({
      initialAmount: principal,
      annualReturnRate,
      annualIncreaseRate,
      monthlyContribution: monthly,
      targetAmount: target,
      inflationRate,
      contributionTiming,
    });

    return {
      rows,
      principal,
      monthly,
      target,
      totalAsset,
      realAsset,
      totalInvested: final?.invested ?? principal,
      totalProfit,
      multiple,
      targetYear,
    };
  }, [
    initialAsset,
    monthlyContribution,
    annualReturnRate,
    annualIncreaseRate,
    investmentYears,
    currentAge,
    targetAsset,
    inflationRate,
    contributionTiming,
  ]);

  const referenceTable = useMemo(() => {
    const monthlyPresets = [30, 50, 100, 200, 300, 500, 700, 1000, 1500, 2500];
    const ratePresets = [4, 6, 8, 10, 12, 15];
    const yearPresets = [5, 10, 15, 20, 25, 30, 40, 50];

    return yearPresets.map((years) => {
      const row: Record<string, string | number> = { years };

      ratePresets.forEach((rate) => {
        const monthlyValue = selectedMonthlyPreset * 10000;
        const monthlyRate = rate / 100 / 12;
        let balance = 0;

        for (let y = 0; y < years; y += 1) {
          for (let m = 0; m < 12; m += 1) {
            balance *= 1 + monthlyRate;
            balance += monthlyValue;
          }
        }

        row[`rate-${rate}`] = formatShortKrw(balance);
      });

      return row;
    });
  }, [selectedMonthlyPreset]);

  const downloadResultImage = async () => {
    if (!resultRef.current) return;

    const dataUrl = await htmlToImage.toPng(resultRef.current, {
      pixelRatio: 2,
      backgroundColor: "#020817",
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = "bluedino-compound-result.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-slate-100 shadow-xl md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="bd-badge">복리 계산기</span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                장기 투자에서 자산이 어떻게 커지는지 한눈에 확인하세요
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                BlueDino 복리 계산기는 초기 자산, 월 투자금, 수익률, 투자 기간,
                물가상승률을 반영해 장기 자산 성장 흐름을 보여줍니다. 왼쪽에서
                입력값을 바꾸면 오른쪽 결과 카드와 그래프가 즉시 갱신됩니다.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
              월말 납입 기준이 기본이며, 월초 납입으로도 비교할 수 있습니다.
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)]">
          <section className="bd-card bd-card-padding h-fit text-slate-100 lg:sticky lg:top-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">입력 설정</h2>
              <span className="text-xs text-slate-400">복리 시뮬레이션</span>
            </div>

            <div className="mt-6 space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <MoneyInput
                label="현재 자산"
                value={initialAsset}
                setValue={setInitialAsset}
                unit="원"
              />
              <MoneyInput
                label="월 투자금"
                value={monthlyContribution}
                setValue={setMonthlyContribution}
                unit="원"
              />
              <RateInput
                label="연간 목표 수익률"
                value={annualReturnRate}
                setValue={setAnnualReturnRate}
                suffix="%"
                min={0}
                max={30}
                step={0.1}
              />
              <RateInput
                label="연 투자금 증가율"
                value={annualIncreaseRate}
                setValue={setAnnualIncreaseRate}
                suffix="%"
                min={0}
                max={20}
                step={0.1}
              />
              <NumberInput
                label="투자 기간"
                value={investmentYears}
                setValue={setInvestmentYears}
                suffix="년"
                min={1}
                max={60}
              />
              <NumberInput
                label="현재 나이"
                value={currentAge}
                setValue={setCurrentAge}
                suffix="세"
                min={0}
                max={100}
              />
              <MoneyInput
                label="목표 자산 (선택)"
                value={targetAsset}
                setValue={setTargetAsset}
                unit="원"
              />
              <RateInput
                label="물가상승률"
                value={inflationRate}
                setValue={setInflationRate}
                suffix="%"
                min={0}
                max={10}
                step={0.1}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">납입 시점</div>
                  <div className="mt-1 text-xs text-slate-400">
                    월초 납입은 투자 기간이 조금 더 길어져 결과가 더 높게 나올 수
                    있습니다.
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <ToggleButton
                  active={contributionTiming === "end"}
                  onClick={() => setContributionTiming("end")}
                  label="월말 납입"
                />
                <ToggleButton
                  active={contributionTiming === "begin"}
                  onClick={() => setContributionTiming("begin")}
                  label="월초 납입"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setInitialAsset("10000000");
                  setMonthlyContribution("1000000");
                  setAnnualReturnRate(8);
                  setAnnualIncreaseRate(2.5);
                  setInvestmentYears(30);
                  setCurrentAge(30);
                  setTargetAsset("1000000000");
                  setInflationRate(2.5);
                  setContributionTiming("end");
                }}
                className="bd-button-primary w-full"
              >
                기본값으로 보기
              </button>
              <button onClick={downloadResultImage} className="bd-button-secondary w-full">
                결과 이미지 저장
              </button>
            </div>
          </section>

          <div className="space-y-6" ref={resultRef}>
            <section className="bd-card bd-card-padding text-slate-100">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">분석 결과</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {investmentYears}년 동안 투자했을 때의 예상 자산 성장 결과입니다.
                    물가상승률을 함께 반영한 실질 가치도 확인할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                  종료 예상 나이 <span className="font-semibold text-white">{currentAge + investmentYears}세</span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SummaryCard label="예상 최종 자산" value={formatShortKrw(simulation.totalAsset)} tone="blue" />
                <SummaryCard label="총 납입 원금" value={formatShortKrw(simulation.totalInvested)} tone="slate" />
                <SummaryCard label="총 수익금" value={formatShortKrw(simulation.totalProfit)} tone="green" />
                <SummaryCard label="수익 배수" value={`${simulation.multiple.toFixed(2)}배`} tone="violet" />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SummaryCard
                  label="물가 반영 실질 자산"
                  value={formatShortKrw(simulation.realAsset)}
                  tone="amber"
                />
                <SummaryCard
                  label="목표 자산 도달 시점"
                  value={simulation.targetYear === null ? "미도달" : `${simulation.targetYear}년`}
                  tone={simulation.targetYear === null ? "red" : "green"}
                />
                <SummaryCard
                  label="납입 시점"
                  value={contributionTiming === "begin" ? "월초 납입" : "월말 납입"}
                  tone="slate"
                />
              </div>
            </section>

            <section className="bd-card bd-card-padding text-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">자산 성장 그래프</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    회색 막대는 누적 원금, 파란 막대는 수익입니다. 두 막대를 합친
                    값이 해당 시점의 총 자산입니다.
                  </p>
                </div>
                <div className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-300">
                  {simulation.rows.length}개 연도
                </div>
              </div>

              <div className="mt-6 min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="h-[360px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={simulation.rows}
                      margin={{ top: 10, right: 20, left: 12, bottom: 8 }}
                      barCategoryGap={4}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#273449" />
                      <XAxis
                        dataKey="yearLabel"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "#334155" }}
                        tickLine={{ stroke: "#334155" }}
                        minTickGap={14}
                      />
                      <YAxis
                        tickFormatter={(value) => formatShortKrw(Number(value))}
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "#334155" }}
                        tickLine={{ stroke: "#334155" }}
                        width={64}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          border: "1px solid #334155",
                          borderRadius: 16,
                          color: "#e2e8f0",
                        }}
                        formatter={(value, name) => {
                          const map: Record<string, string> = {
                            invested: "누적 원금",
                            profit: "누적 수익",
                            total: "총 자산",
                            realTotal: "실질 자산",
                          };

                          return [formatCurrency(Number(value)), map[String(name)] || String(name)];
                        }}
                        labelFormatter={(label, payload) => {
                          const row = payload?.[0]?.payload as YearRow | undefined;
                          if (!row) return String(label);
                          return `${row.yearLabel} · ${row.age}세`;
                        }}
                      />
                      <Bar dataKey="invested" stackId="asset" fill="#64748b" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="profit" stackId="asset" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

          </div>
        </div>
        <section className="bd-card bd-card-padding text-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">복리 투자 참고표</h3>
              <p className="mt-2 text-sm text-slate-400">
                월 투자금을 고정했을 때 기간과 수익률에 따라 자산이 어떻게
                달라지는지 빠르게 비교할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="text-xs text-slate-400">월 투자금 선택</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[30, 50, 100, 200, 300, 500, 700, 1000, 1500, 2500].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSelectedMonthlyPreset(preset)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                      selectedMonthlyPreset === preset
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                    }`}
                  >
                    {preset >= 10000 ? `${preset / 10000}억` : `${preset}만`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-800/90">
                <tr>
                  <th className="border-b border-slate-700 px-4 py-3 text-left text-slate-200">
                    투자 기간 \ 수익률
                  </th>
                  {[4, 6, 8, 10, 12, 15].map((rate) => (
                    <th
                      key={rate}
                      className="border-b border-slate-700 px-4 py-3 text-center text-cyan-300"
                    >
                      연 {rate}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referenceTable.map((row) => (
                  <tr key={String(row.years)} className="bg-slate-950/40">
                    <td className="border-t border-slate-800 px-4 py-3 font-semibold text-slate-200">
                      {row.years}년 투자
                    </td>
                    {[4, 6, 8, 10, 12, 15].map((rate) => (
                      <td
                        key={`${row.years}-${rate}`}
                        className="border-t border-slate-800 px-4 py-3 text-center text-slate-300"
                      >
                        {String(row[`rate-${rate}`])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bd-card bd-card-padding text-slate-100">
          <h3 className="text-lg font-bold text-white">계산 안내</h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              연 수익률은 월 복리로 단순 환산해 계산합니다. 실제 투자 결과는
              시장 변동성, 수수료, 세금, 환율, 투자 시점에 따라 달라질 수
              있습니다.
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              물가상승률을 입력하면 실질 자산을 함께 보여주므로, 단순 숫자가
              아니라 체감 구매력 기준으로 결과를 해석할 수 있습니다.
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200">
              이 계산기는 참고용 도구입니다. 실제 투자 판단 전에는 본인의 자산
              배분, 세금 구조, 리스크 허용 범위를 함께 검토하는 것이 좋습니다.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
  unit,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  unit: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value ? Number(value).toLocaleString("ko-KR") : ""}
          onChange={(e) => setValue(sanitizeNumericString(e.target.value))}
          className="bd-input pr-12"
          inputMode="numeric"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          {unit}
        </span>
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  setValue,
  suffix,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  suffix: string;
  min: number;
  max: number;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(clampNumber(Number(e.target.value || 0), min, max))}
          className="bd-input pr-12"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function RateInput({
  label,
  value,
  setValue,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  suffix: string;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <div className="relative w-28 shrink-0">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(clampNumber(Number(e.target.value || 0), min, max))}
            className="bd-input pr-9"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-blue-600 text-white"
          : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "green" | "amber" | "violet" | "slate" | "red";
}) {
  const toneMap: Record<string, string> = {
    blue: "text-blue-300",
    green: "text-emerald-300",
    amber: "text-amber-300",
    violet: "text-violet-300",
    slate: "text-slate-200",
    red: "text-rose-300",
  };

  return (
    <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`mt-2 min-w-0 break-all text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-tight ${toneMap[tone]}`}>{value}</div>
    </div>
  );
}
