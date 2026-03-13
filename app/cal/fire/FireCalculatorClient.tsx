"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as htmlToImage from "html-to-image";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";

type ChartRow = {
  age: number;
  year: number;
  asset: number;
  target: number; // 해당 나이에서의 FIRE 목표자산(인플레 반영)
  phase: "accum" | "retire";
};

export default function FireCalculatorPage() {
  const format = (n: number) => Math.floor(n).toLocaleString("ko-KR");
  const unformat = (s: string) => Number(String(s).replace(/,/g, ""));

  // ===== 입력값 =====
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(50);
  const [endAge, setEndAge] = useState(90);

  const [currentAsset, setCurrentAsset] = useState("100000000"); // 현재 자산
  const [monthlySave, setMonthlySave] = useState("2000000"); // 월 저축
  const [monthlyExpense, setMonthlyExpense] = useState("3000000"); // 은퇴 후 월 생활비(현재가 기준)

  const [returnRate, setReturnRate] = useState(7); // 연 수익률
  const [withdrawRate, setWithdrawRate] = useState(4); // 인출률(SWR)
  const [inflationRate, setInflationRate] = useState(2.5); // 연 인플레

  const [showTable, setShowTable] = useState(false);
  const [captureMode, setCaptureMode] = useState(false);

  // Lean/Fat FIRE (생활비 배수)
  const [fireMode, setFireMode] = useState<"lean" | "base" | "fat">("base");
  const lifestyleMultiplier = useMemo(() => {
    if (fireMode === "lean") return 0.8;
    if (fireMode === "fat") return 1.3;
    return 1.0;
  }, [fireMode]);

  // ===== 세금 반영(배당 계산기 스타일과 동일) =====
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [accountType, setAccountType] = useState<
    "general" | "isa" | "pension" | "custom"
  >("general");
  const [customTaxRate, setCustomTaxRate] = useState(0);

  const formatYAxis = (value: number) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(1)}억`;
    }
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}만`;
    }
    return value.toString();
  };

  const getTaxRate = () => {
    if (!taxEnabled) return 0;
    if (accountType === "general") return 15.4;
    if (accountType === "isa") return 9.9;
    if (accountType === "pension") return 0;
    if (accountType === "custom") return customTaxRate;
    return 0;
  };

  // ===== 결과 =====
  const [chartData, setChartData] = useState<ChartRow[]>([]);
  const [showChart, setShowChart] = useState(false);

  const [summary, setSummary] = useState<{
    currentYear: number;
    fireAge: number | null; // 목표 달성 나이(옵션2)
    fireYear: number | null; // 목표 달성 연도(옵션2)
    targetAtRetire: number; // 은퇴시점 목표자산(옵션1)
    expenseAtRetireAnnual: number; // 은퇴시점 연 생활비(옵션1)
    finalAssetAtEnd: number; // endAge 시점 자산(옵션5)
    depletionAge: number | null; // 파산(자산 0 이하) 나이(옵션5)
    totalTaxPaid: number; // 누적 세금(옵션4)
    okAtEnd: boolean; // endAge까지 버팀?(옵션5)
  } | null>(null);

  // 이미지 저장 캡처 루트
  const summaryRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const calcInflated = (base: number, years: number) => {
    const inf = inflationRate / 100;
    return base * Math.pow(1 + inf, years);
  };

  // ===== 핵심 시뮬레이션(옵션 1~5 전부) =====
  const simulate = () => {
    const nowYear = new Date().getFullYear();

    const startAge = currentAge;
    const stopAge = Math.max(endAge, retireAge);

    const nominalReturn = returnRate / 100;
    const inflation = inflationRate / 100;
    const taxRate = getTaxRate() / 100;

    // ✅ 실질 수익률 계산
    const realReturn = (1 + nominalReturn) / (1 + inflation) - 1;

    const baseMonthlyExpense = unformat(monthlyExpense) * lifestyleMultiplier;

    const baseAnnualExpense = baseMonthlyExpense * 12;

    let assetNominal = unformat(currentAsset);
    let assetReal = assetNominal;

    let totalContribution = 0;
    let totalTaxPaid = 0;

    let fireAge: number | null = null;
    let fireYear: number | null = null;
    let depletionAge: number | null = null;

    const rows: ChartRow[] = [];

    for (let age = startAge; age <= stopAge; age++) {
      const t = age - startAge;
      const year = nowYear + t;

      const annualExpenseNominal =
        baseAnnualExpense * Math.pow(1 + inflation, t);

      const targetThisAge =
        withdrawRate === 0
          ? Number.POSITIVE_INFINITY
          : annualExpenseNominal / (withdrawRate / 100);

      // ===== 수익 발생 =====
      const grossGain = assetNominal * nominalReturn;

      // 현실적 단순화:
      // 자본차익은 과세하지 않고
      // 연 수익 중 "수익률 일부"에만 과세 (보수적 가정)
      const taxablePortion = grossGain * 0.5; // 50%만 과세 가정
      const taxOnGain = taxEnabled ? taxablePortion * taxRate : 0;

      totalTaxPaid += taxOnGain;

      assetNominal = assetNominal + grossGain - taxOnGain;

      // ===== 적립 or 인출 =====
      if (age < retireAge) {
        const annualSave =
          unformat(monthlySave) *
          12 *
          Math.pow(1 + inflation, t * 0.5); // 저축 일부 인플레 반영

        assetNominal += annualSave;
        totalContribution += annualSave;
      } else {
        assetNominal -= annualExpenseNominal;
      }

      // ===== 실질 자산 계산 =====
      assetReal = assetNominal / Math.pow(1 + inflation, t);

      // ===== FIRE 조기 달성 =====
      if (age <= retireAge && fireAge === null) {
        if (assetNominal >= targetThisAge) {
          fireAge = age;
          fireYear = year;
        }
      }

      // ===== 파산 탐지 =====
      if (assetNominal <= 0 && depletionAge === null) {
        depletionAge = age;
      }

      rows.push({
        age,
        year,
        asset: Math.max(0, Math.floor(assetNominal)),
        target: Math.floor(targetThisAge),
        phase: age < retireAge ? "accum" : "retire",
      });
    }

    const last = rows[rows.length - 1];

    setChartData(rows);

    setSummary({
      currentYear: nowYear,
      fireAge,
      fireYear,
      targetAtRetire: Math.floor(
        (baseAnnualExpense *
          Math.pow(1 + inflation, retireAge - currentAge)) /
          (withdrawRate / 100)
      ),
      expenseAtRetireAnnual: Math.floor(
        baseAnnualExpense * Math.pow(1 + inflation, retireAge - currentAge)
      ),
      finalAssetAtEnd: last?.asset ?? 0,
      depletionAge,
      totalTaxPaid: Math.floor(totalTaxPaid),
      okAtEnd: depletionAge === null && (last?.asset ?? 0) > 0,
    });
  };

  // 자동 계산 (배당 계산기처럼 입력/슬라이더 변경 시 자동 실행)
  useEffect(() => {
    simulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentAge,
    retireAge,
    endAge,
    currentAsset,
    monthlySave,
    monthlyExpense,
    returnRate,
    withdrawRate,
    inflationRate,
    fireMode,
    taxEnabled,
    accountType,
    customTaxRate,
  ]);

  // 이미지 저장
  // ✅ 결과 요약 저장 (차트는 강제 펼침, 표는 닫음)
  const handleDownloadSummary = async () => {
    if (!summaryRef.current) return;

    const prevChart = showChart;
    const prevTable = showTable;

    setShowChart(true);
    setShowTable(false);

    // 렌더 반영 대기
    await new Promise((r) => setTimeout(r, 400));

    const dataUrl = await htmlToImage.toPng(summaryRef.current, {
      pixelRatio: 2,
      backgroundColor: "#020617",
    });

    const link = document.createElement("a");
    link.download = "result-summary.png";
    link.href = dataUrl;
    link.click();

    setShowChart(prevChart);
    setShowTable(prevTable);
  };

  // ✅ 연도별 표 저장 (표 강제 펼침, 차트는 닫음)
  const handleDownloadTable = async () => {
    if (!tableRef.current) return;

    const prevChart = showChart;
    const prevTable = showTable;

    setShowChart(false);
    setShowTable(true);

    // 렌더 반영 대기
    await new Promise((r) => setTimeout(r, 400));

    // 표 영역이 캡처 대상이므로, overflow가 있으면 잘릴 수 있어 안전하게 제거
    const tableElement = tableRef.current;
    const prevOverflow = tableElement.style.overflow;
    tableElement.style.overflow = "visible";

    const dataUrl = await htmlToImage.toPng(tableElement, {
      pixelRatio: 2,
      backgroundColor: "#020617",
    });

    tableElement.style.overflow = prevOverflow;

    const link = document.createElement("a");
    link.download = "result-table.png";
    link.href = dataUrl;
    link.click();

    setShowChart(prevChart);
    setShowTable(prevTable);
  };

  const modeLabel = (m: typeof fireMode) => {
    if (m === "lean") return "Lean FIRE";
    if (m === "fat") return "Fat FIRE";
    return "Base FIRE";
  };

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="FIRE 계산기"
          title="경제적 자유 목표 시점을 미리 계산해보세요"
          description="현재 자산, 월 저축액, 기대 수익률, 목표 생활비를 기준으로 FIRE 달성 가능 시점을 가늠할 수 있습니다."
          tip="예상 수익률은 보수적으로 입력하고, 인플레이션도 함께 고려하는 것이 좋습니다."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 좌측 입력 카드 */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl text-slate-100">
          {/* <h2 className="text-lg font-bold text-white">
            🔥 FIRE(경제적 자유) 계산기
          </h2> */}

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-6">
            <h3 className="text-base font-semibold text-white">기본 설정</h3>

            <NumberInput
              label="현재 나이"
              value={currentAge}
              setValue={setCurrentAge}
            />
            <NumberInput
              label="은퇴 나이"
              value={retireAge}
              setValue={setRetireAge}
            />
            <NumberInput
              label="시뮬레이션 종료 나이"
              value={endAge}
              setValue={setEndAge}
            />

            <MoneyInput
              label="현재 자산"
              value={currentAsset}
              setValue={setCurrentAsset}
            />
            <MoneyInput
              label="월 저축 금액"
              value={monthlySave}
              setValue={setMonthlySave}
            />
            <MoneyInput
              label="은퇴 후 월 생활비 (현재가 기준)"
              value={monthlyExpense}
              setValue={setMonthlyExpense}
            />

            <Slider
              label="연 수익률 (%)"
              value={returnRate}
              setValue={setReturnRate}
              min={-10}
              max={20}
              step={0.1}
            />
            <Slider
              label="인출률 (%)"
              value={withdrawRate}
              setValue={setWithdrawRate}
              min={1}
              max={7}
              step={0.1}
            />
            <Slider
              label="연 인플레이션 (%)"
              value={inflationRate}
              setValue={setInflationRate}
              min={0}
              max={10}
              step={0.1}
            />
          </div>

          {/* Lean/Fat FIRE */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-white">FIRE 모드</span>
              <span className="text-xs text-slate-400">
                현재: {modeLabel(fireMode)} (생활비 × {lifestyleMultiplier})
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "lean", label: "Lean" },
                { key: "base", label: "Base" },
                { key: "fat", label: "Fat" },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setFireMode(m.key as any)}
                  className={`rounded-2xl p-3 text-sm font-semibold transition ${
                    fireMode === m.key
                      ? "bg-cyan-500 text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400">
              Lean/Fat 모드는 “생활비”에 배수를 적용합니다. (Lean: 0.8 / Base:
              1.0 / Fat: 1.3)
            </div>
          </div>

          {/* 세금 영역 (토글 ON일 때만 계좌유형 노출) */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-white">세금 반영</span>
              <button
                onClick={() => setTaxEnabled(!taxEnabled)}
                className={`rounded-full px-4 py-1 transition ${
                  taxEnabled
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                {taxEnabled ? "ON" : "OFF"}
              </button>
            </div>

            <div className="text-sm text-slate-400">
              현재 적용 세율: {taxEnabled ? `${getTaxRate()}%` : "0%"}
            </div>

            {taxEnabled && (
              <>
                <label className="text-base font-semibold text-white">
                  계좌 유형
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { key: "general", label: "일반계좌", sub: "15.4%" },
                    { key: "isa", label: "ISA", sub: "9.9%" },
                    { key: "pension", label: "연금계좌", sub: "0%" },
                    { key: "custom", label: "직접입력", sub: "" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setAccountType(item.key as any)}
                      className={`rounded-2xl p-3 transition ${
                        accountType === item.key
                          ? "bg-cyan-500 text-slate-950"
                          : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                      }`}
                    >
                      <div className="font-semibold">{item.label}</div>
                      {item.sub && (
                        <div className="text-sm opacity-80">{item.sub}</div>
                      )}
                    </button>
                  ))}
                </div>

                {accountType === "custom" && (
                  <div className="mt-2">
                    <label className="block text-sm mb-2 text-slate-300">
                      세율 직접 입력 (%)
                    </label>
                    <input
                      type="number"
                      value={customTaxRate}
                      onChange={(e) => setCustomTaxRate(Number(e.target.value))}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                )}
              </>
            )}

            <div className="text-xs text-slate-400">
              * 단순화 모델: “연 수익”에 대해 세율을 적용한 뒤(세후 수익률),
              적립/인출을 반영합니다.
            </div>
          </div>
        </div>

        {/* 우측 sticky 결과 카드 */}
        <div className="space-y-6 sticky top-10 h-fit">
          <button
            onClick={handleDownloadSummary}
            className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            📊 결과 요약 PNG 저장
          </button>

          <button
            onClick={handleDownloadTable}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
          >
            📋 연도별 표 PNG 저장
          </button>

          <div className="space-y-6">
            <div ref={summaryRef}>
              {/* 요약 카드 */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white">📌 결과 요약</h2>

                {summary && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <MiniCard
                        title="은퇴시점 연 생활비(인플레 반영)"
                        value={`${format(summary.expenseAtRetireAnnual)}원`}
                        tone="blue"
                      />
                      <MiniCard
                        title="은퇴시점 FIRE 목표자산"
                        value={`${format(summary.targetAtRetire)}원`}
                        tone="green"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <MiniCard
                        title="FIRE 목표 달성 시점"
                        value={
                          summary.fireAge
                            ? `${summary.fireAge}세 (${summary.fireYear}년)`
                            : "미달성"
                        }
                        tone={summary.fireAge ? "green" : "red"}
                      />
                      <MiniCard
                        title={`${endAge}세 자산`}
                        value={`${format(summary.finalAssetAtEnd)}원`}
                        tone={summary.okAtEnd ? "green" : "red"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <MiniCard
                        title="누적 납부 세금(추정)"
                        value={`${format(summary.totalTaxPaid)}원`}
                        tone="red"
                      />
                      <MiniCard
                        title="파산(자산 0) 시점"
                        value={
                          summary.depletionAge
                            ? `${summary.depletionAge}세`
                            : "없음"
                        }
                        tone={summary.depletionAge ? "red" : "green"}
                      />
                    </div>

                    <div
                      className={`rounded-2xl border p-4 font-semibold ${
                        summary.okAtEnd
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                          : "border-rose-500/20 bg-rose-500/10 text-rose-200"
                      }`}
                    >
                      {summary.okAtEnd
                        ? `✅ ${endAge}세까지 자산이 유지됩니다 (옵션5 반영)`
                        : `⚠️ ${
                            summary.depletionAge
                              ? `${summary.depletionAge}세에 자산이 소진됩니다`
                              : "목표가 빡빡합니다"
                          } `}
                    </div>
                  </>
                )}
              </div>

              {/* 차트 보기 토글 (우측 카드 하단) */}
              <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/95 p-5 shadow-xl space-y-4">
                <button
                  onClick={() => setShowChart(!showChart)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  {showChart ? "차트 닫기 ▲" : "자산 흐름 차트 보기 ▼"}
                </button>

                {showChart && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <ResponsiveContainer width="100%" height={380}>
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 20, left: 70, bottom: 10 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#334155"
                        />
                        <XAxis dataKey="age" stroke="#94a3b8" />
                        <YAxis
                          tickFormatter={formatYAxis}
                          width={5}
                          stroke="#94a3b8"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "16px",
                            color: "#e2e8f0",
                          }}
                          formatter={(v: any, name: any) => {
                            if (name === "asset")
                              return [`${format(v)}원`, "자산"];
                            if (name === "target")
                              return [`${format(v)}원`, "목표자산"];
                            return [v, name];
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="asset"
                          stroke="#38bdf8"
                          strokeWidth={3}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#34d399"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    <div className="mt-2 text-xs text-slate-400">
                      파란색: 자산 / 초록색: 해당 나이 기준 목표자산(인플레+인출률
                      반영)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===== 연도별 표 ===== */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-5 shadow-xl space-y-4">
              <button
                onClick={() => setShowTable(!showTable)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
              >
                {showTable ? "연도별 표 닫기 ▲" : "연도별 표 보기 ▼"}
              </button>
              <div ref={tableRef}>
                {showTable && (
                  <div className="mt-4 overflow-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800 sticky top-0">
                        <tr>
                          <th className="border border-slate-700 p-2 text-slate-200">
                            나이
                          </th>
                          <th className="border border-slate-700 p-2 text-slate-200">
                            연도
                          </th>
                          <th className="border border-slate-700 p-2 text-slate-200">
                            자산
                          </th>
                          <th className="border border-slate-700 p-2 text-slate-200">
                            목표자산
                          </th>
                          <th className="border border-slate-700 p-2 text-slate-200">
                            구간
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.map((row, i) => (
                          <tr
                            key={i}
                            className={
                              row.phase === "retire"
                                ? "bg-amber-500/10"
                                : "bg-slate-950/40"
                            }
                          >
                            <td className="border border-slate-700 p-2 text-slate-300">
                              {row.age}세
                            </td>
                            <td className="border border-slate-700 p-2 text-slate-300">
                              {row.year}
                            </td>
                            <td className="border border-slate-700 p-2 font-semibold text-cyan-300">
                              {format(row.asset)}원
                            </td>
                            <td className="border border-slate-700 p-2 text-emerald-300">
                              {format(row.target)}원
                            </td>
                            <td className="border border-slate-700 p-2 text-slate-300">
                              {row.phase === "accum" ? "적립기" : "은퇴기"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>

        <CalculatorSeoContent
          sections={[
            {
              title: "FIRE 계산기란?",
              body: "FIRE 계산기는 조기 은퇴 또는 경제적 자유 달성 시점을 가늠하기 위한 도구입니다. 현재 자산과 저축 속도, 투자 수익률, 목표 생활비를 바탕으로 필요한 자산 규모를 추정합니다.",
            },
            {
              title: "어떻게 계산하나요?",
              body: "현재 자산과 월 저축액을 누적하고, 기대 수익률과 물가상승률을 반영해 자산이 증가하는 흐름을 계산합니다. 동시에 목표 생활비 기준의 필요 자산도 함께 비교합니다.",
            },
            {
              title: "이런 경우에 활용하면 좋습니다",
              body: "은퇴 목표 연령을 앞당기고 싶은 직장인, 절약률을 높였을 때 얼마나 차이가 나는지 보고 싶은 사용자, 월 생활비 기준으로 FIRE 가능성을 점검하고 싶은 경우에 유용합니다.",
            },
            {
              title: "자주 헷갈리는 포인트",
              body: "기대 수익률이 높다고 해서 실제 은퇴 시점이 그대로 보장되는 것은 아닙니다. 인플레이션, 세금, 예상보다 큰 지출, 은퇴 후 소비 패턴 변화도 함께 고려해야 합니다.",
            },
          ]}
        />
      </div>
    </div>
  );
}

/* ===== UI 컴포넌트 ===== */

function NumberInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-base font-semibold text-white">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
      />
    </div>
  );
}

function MoneyInput({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-base font-semibold text-white">{label}</label>
      <input
        type="text"
        value={Number(value || "0").toLocaleString()}
        onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
      />
    </div>
  );
}

function Slider({ label, value, setValue, min, max, step }: any) {
  return (
    <div className="space-y-2">
      <label className="text-base font-semibold text-white">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-24 rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>
    </div>
  );
}

function MiniCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: "blue" | "green" | "red";
}) {
  const toneClass =
    tone === "blue"
      ? "text-cyan-300"
      : tone === "green"
      ? "text-emerald-300"
      : "text-rose-300";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
      <div className="text-xs text-slate-400">{title}</div>
      <div className={`mt-1 text-base font-bold ${toneClass}`}>{value}</div>
    </div>
  );
}

function CalculatorInfoSection({
  title,
  bullets,
  examples,
  faqs,
}: {
  title: string;
  bullets: string[];
  examples: { q: string; a: string }[];
  faqs: { q: string; a: string }[];
}) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl text-slate-100">
      <h3 className="text-lg font-bold text-white">{title}</h3>

      <div className="mt-4 space-y-6">
        <div>
          <div className="font-semibold text-white">계산 가정/기준</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white">입력 예시</div>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="text-xs text-slate-400">예시 {i + 1}</div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {ex.q}
                </div>
                <div className="mt-2 text-sm text-slate-300">{ex.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-semibold text-white">FAQ</div>
          <div className="mt-2 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="text-sm font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm text-slate-300">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
          <b>면책</b> : 본 계산 결과는 참고용이며, 실제 세금/투자 결과는 개인
          상황 및 제도 변경에 따라 달라질 수 있습니다.
        </div>
      </div>
    </section>
  );
}