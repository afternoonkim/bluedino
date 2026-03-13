"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as htmlToImage from "html-to-image";

export const metadata = {
  title: "배당 계산기 | 배당 수익 계산기",
  description:
    "주식 배당 수익을 계산할 수 있는 배당 계산기입니다. 투자 금액과 배당 수익률을 입력하면 예상 배당금을 확인할 수 있습니다.",
  keywords: [
    "배당 계산기",
    "배당 수익 계산",
    "dividend calculator",
    "배당 투자 계산",
  ],
};

type YearRow = {
  year: number;
  cashTotal: number;
  cashDividend: number;
  dripTotal: number;
  dripDividend: number;
};

export default function CalculatorPage() {
  const format = (n: number) => n.toLocaleString("ko-KR");
  const unformat = (s: string) => Number(String(s ?? "").replace(/,/g, "")) || 0;

  const [shares, setShares] = useState("100");
  const [price, setPrice] = useState("50000");

  const [yieldRate, setYieldRate] = useState(6);
  const [years, setYears] = useState(20);
  const [growthRate, setGrowthRate] = useState(0);
  const [priceGrowthRate, setPriceGrowthRate] = useState(0);

  const [accountType, setAccountType] = useState("general");
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [frequency, setFrequency] = useState(12);

  const [monthlyAdd, setMonthlyAdd] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState("1000000");
  const [wholeShareOnly, setWholeShareOnly] = useState(false);

  const [chartData, setChartData] = useState<any[]>([]);
  const [tableRows, setTableRows] = useState<YearRow[]>([]);

  const [targetDividend, setTargetDividend] = useState("10000000");

  const [targetEnabled, setTargetEnabled] = useState(false);
  const [targetMonthlyDividend, setTargetMonthlyDividend] = useState("1000000");

  const [roiData, setRoiData] = useState<any>(null);

  const [debouncedTrigger, setDebouncedTrigger] = useState(0);

  const [customTaxRate, setCustomTaxRate] = useState(0);

  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const formatYAxis = (value: number) => {
    if (value >= 100000000) return `${(value / 100000000).toFixed(1)}억`;
    if (value >= 10000) return `${(value / 10000).toFixed(0)}만`;
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

  const initialInvestment = useMemo(() => {
    return unformat(shares) * unformat(price);
  }, [shares, price]);

  const totalInvested = useMemo(() => {
    const monthly = monthlyAdd ? unformat(monthlyAmount) : 0;
    return initialInvestment + monthly * 12 * years;
  }, [initialInvestment, monthlyAdd, monthlyAmount, years]);

  const simulate = (useDrip: boolean) => {
    let currentShares = unformat(shares);
    let currentPrice = unformat(price);

    let currentYield = yieldRate / 100;
    const taxRate = getTaxRate() / 100;

    let cashBalance = 0;

    const data: { year: number; total: number; dividend: number }[] = [];

    for (let y = 1; y <= years; y++) {
      currentPrice *= 1 + priceGrowthRate / 100;
      currentYield *= 1 + growthRate / 100;

      let yearlyDividend = 0;

      for (let f = 0; f < frequency; f++) {
        let dividend = currentShares * currentPrice * (currentYield / frequency);
        dividend *= 1 - taxRate;

        yearlyDividend += dividend;

        if (useDrip) {
          const newShares = dividend / currentPrice;
          currentShares += wholeShareOnly ? Math.floor(newShares) : newShares;
        } else {
          cashBalance += dividend;
        }
      }

      if (monthlyAdd) {
        const yearlyAdd = unformat(monthlyAmount) * 12;
        const addedShares = yearlyAdd / currentPrice;

        currentShares += wholeShareOnly ? Math.floor(addedShares) : addedShares;
      }

      const total = Math.floor(
        currentShares * currentPrice + (useDrip ? 0 : cashBalance)
      );

      data.push({
        year: y,
        total,
        dividend: Math.floor(yearlyDividend),
      });
    }

    return data;
  };

  const calculate = () => {
    const drip = simulate(true);
    const cash = simulate(false);

    const lastDrip = drip[drip.length - 1]?.total ?? 0;
    const lastCash = cash[cash.length - 1]?.total ?? 0;

    const totalDripDividend = drip.reduce((sum, r) => sum + r.dividend, 0);
    const totalCashDividend = cash.reduce((sum, r) => sum + r.dividend, 0);

    const taxRate = getTaxRate() / 100;
    const totalBeforeTaxDividend =
      taxRate > 0 ? totalCashDividend / (1 - taxRate) : totalCashDividend;
    const totalTax = totalBeforeTaxDividend - totalCashDividend;

    const base = Math.max(1, totalInvested);

    const cagrDrip = Math.pow(lastDrip / base, 1 / years) - 1;
    const cagrCash = Math.pow(lastCash / base, 1 / years) - 1;

    const mergedChart = Array.from({ length: years }, (_, i) => ({
      year: cash[i].year,
      cash: cash[i].total,
      drip: drip[i].total,
    }));

    const mergedTable: YearRow[] = Array.from({ length: years }, (_, i) => ({
      year: cash[i].year,
      cashTotal: cash[i].total,
      cashDividend: cash[i].dividend,
      dripTotal: drip[i].total,
      dripDividend: drip[i].dividend,
    }));

    setChartData(mergedChart);
    setTableRows(mergedTable);

    setRoiData({
      initialInvestment,
      totalInvested,
      finalDrip: lastDrip,
      finalCash: lastCash,
      totalDripDividend,
      totalCashDividend,
      totalTax,
      cagrDrip,
      cagrCash,
      taxRatePct: getTaxRate(),
      priceGrowthRate,
      growthRate,
      yieldRate,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTrigger((prev) => prev + 1);
    }, 200);

    return () => clearTimeout(timer);
  }, [
    shares,
    price,
    yieldRate,
    years,
    growthRate,
    priceGrowthRate,
    accountType,
    taxEnabled,
    frequency,
    monthlyAdd,
    monthlyAmount,
    wholeShareOnly,
    customTaxRate,
  ]);

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTrigger]);

  const calculateTarget = () => {
    const priceValue = unformat(price);
    const yieldValue = yieldRate / 100;
    const taxRate = getTaxRate() / 100;

    if (yieldValue === 0) {
      return {
        requiredAsset: 0,
        requiredShares: 0,
        yearlyBeforeTax: 0,
        yearlyAfterTax: 0,
      };
    }

    const yearlyTarget = unformat(targetMonthlyDividend) * 12;

    const requiredAsset = yearlyTarget / yieldValue;
    const requiredShares = requiredAsset / priceValue;

    const yearlyBeforeTax = requiredAsset * yieldValue;
    const yearlyAfterTax = yearlyBeforeTax * (1 - taxRate);

    return {
      requiredAsset,
      requiredShares,
      yearlyBeforeTax,
      yearlyAfterTax,
    };
  };

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;

    const element = resultRef.current;

    const originalPosition = element.style.position;
    const originalTop = element.style.top;

    element.style.position = "static";
    element.style.top = "auto";

    const width = element.scrollWidth;
    const height = element.scrollHeight + 50;

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        cacheBust: true,
        backgroundColor: "#020617",
        pixelRatio: 2,
        width,
        height,
        style: { width: `${width}px`, height: `${height}px` },
      });

      const link = document.createElement("a");
      link.download = "dividend-result.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("이미지 생성 실패:", err);
    }

    element.style.position = originalPosition;
    element.style.top = originalTop;
  };

  return (
    <div className="bd-page">
      <div className="bd-container grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 좌측 입력 영역 */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
          {/* <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            📊 배당 투자 계산기
          </h2> */}

          <div className="mt-6 space-y-8 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 text-slate-100">
            <h3 className="text-base font-semibold text-white">초기 투자 설정</h3>

            <Input label="초기 보유 주식 수" value={shares} setValue={setShares} />
            <PriceInput
              label="주당 가격"
              value={price}
              setValue={setPrice}
              format={format}
              unformat={unformat}
            />

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 font-medium text-cyan-200">
              초기 투자금: {format(initialInvestment)}원
            </div>

            <Slider
              label="연 배당률 (%)"
              value={yieldRate}
              setValue={setYieldRate}
              min={0}
              max={15}
              step={0.1}
            />
            <Slider
              label="투자 기간 (년)"
              value={years}
              setValue={setYears}
              min={1}
              max={40}
              step={1}
            />
            <Slider
              label="배당 성장률 (%)"
              value={growthRate}
              setValue={setGrowthRate}
              min={-10}
              max={20}
              step={0.1}
            />
            <Slider
              label="주가 성장률 (%)"
              value={priceGrowthRate}
              setValue={setPriceGrowthRate}
              min={-20}
              max={30}
              step={0.1}
            />

            <ButtonGroup
              label="배당 지급 주기"
              options={[
                { value: 12, label: "월배당" },
                { value: 4, label: "분기배당" },
                { value: 2, label: "반기배당" },
                { value: 1, label: "연배당" },
              ]}
              selected={frequency}
              setSelected={setFrequency}
            />

            <ToggleButton
              label="월 적립 투자"
              value={monthlyAdd}
              setValue={setMonthlyAdd}
            />

            {monthlyAdd && (
              <div className="mt-3">
                <label className="mb-2 block font-medium text-slate-300">
                  월 적립 금액
                </label>
                <input
                  type="text"
                  value={unformat(monthlyAmount).toLocaleString()}
                  onChange={(e) =>
                    setMonthlyAmount(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="bd-input"
                />
                <div className="mt-1 text-right text-sm text-slate-400">
                  {unformat(monthlyAmount).toLocaleString()} 원
                </div>
              </div>
            )}

            <ToggleButton
              label="정수 주식만 매수"
              value={wholeShareOnly}
              setValue={setWholeShareOnly}
            />

            {/* 목표 배당 역산 */}
            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  목표 배당금 역산
                </h2>
                <button
                  onClick={() => setTargetEnabled(!targetEnabled)}
                  className={`rounded-full px-4 py-1 transition ${
                    targetEnabled
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {targetEnabled ? "ON" : "OFF"}
                </button>
              </div>

              {targetEnabled && (
                <div className="mt-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl">
                  <div className="mb-4 text-sm text-slate-400">
                    목표 월 배당금을 입력하면 필요한 투자 규모를 계산합니다
                  </div>

                  <div className="mb-6">
                    <label className="mb-2 block text-sm text-slate-400">
                      목표 월 배당금
                    </label>
                    <input
                      type="text"
                      value={unformat(targetMonthlyDividend).toLocaleString()}
                      onChange={(e) =>
                        setTargetMonthlyDividend(
                          e.target.value.replace(/[^0-9]/g, "")
                        )
                      }
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  {(() => {
                    const result = calculateTarget();
                    return (
                      <>
                        <div className="mb-6 grid grid-cols-2 gap-6">
                          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                            <div className="text-xs text-slate-400">필요 투자금</div>
                            <div className="mt-1 text-2xl font-bold text-cyan-300">
                              {Math.floor(result.requiredAsset).toLocaleString()}원
                            </div>
                          </div>

                          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                            <div className="text-xs text-slate-400">필요 주식 수</div>
                            <div className="mt-1 text-2xl font-bold text-white">
                              {Math.ceil(result.requiredShares).toLocaleString()}주
                            </div>
                          </div>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-xs text-slate-400">세전 연배당</div>
                            <div className="text-base font-semibold text-white">
                              {Math.floor(result.yearlyBeforeTax).toLocaleString()}원
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-slate-400">세후 연배당</div>
                            <div className="text-base font-semibold text-emerald-300">
                              {Math.floor(result.yearlyAfterTax).toLocaleString()}원
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-700 pt-4 text-xs text-slate-400">
                          현재 배당률 {yieldRate}% · 세율 {getTaxRate()}% 기준
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* 세금 영역 */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-white">
                  세금 반영
                </span>
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

              <div className="mt-2 text-sm text-slate-400">
                현재 적용 세율: {taxEnabled ? `${getTaxRate()}%` : "0%"}
              </div>

              {taxEnabled && (
                <div className="mt-6 space-y-4">
                  <label className="text-base font-semibold text-white">
                    계좌 유형
                  </label>

                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {[
                      { key: "general", label: "일반계좌", sub: "15.4%" },
                      { key: "isa", label: "ISA", sub: "9.9%" },
                      { key: "pension", label: "연금계좌", sub: "0%" },
                      { key: "custom", label: "직접입력", sub: "" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setAccountType(item.key)}
                        className={`rounded-2xl p-3 transition ${
                          accountType === item.key
                            ? "bg-cyan-500 text-slate-950"
                            : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                        }`}
                      >
                        <div className="font-semibold">{item.label}</div>
                        {item.sub && <div className="text-sm opacity-80">{item.sub}</div>}
                      </button>
                    ))}
                  </div>

                  {accountType === "custom" && (
                    <div className="mt-3">
                      <label className="mb-1 block text-sm text-slate-300">
                        세율 직접 입력 (%)
                      </label>
                      <input
                        type="number"
                        value={customTaxRate}
                        onChange={(e) => setCustomTaxRate(Number(e.target.value))}
                        className="bd-input"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 우측 Sticky 결과 카드 */}
        <div className="sticky h-fit space-y-6">
          <button
            onClick={handleDownloadImage}
            className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            📸 결과 PNG 저장
          </button>

          {roiData && (
            <div ref={resultRef} id="capture-root" className="space-y-6">
              {/* ROI 카드 */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  📊 투자 수익률 (ROI)
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
                    <div className="text-sm text-slate-400">초기 투자금</div>
                    <div className="text-lg font-bold text-orange-300">
                      {roiData.initialInvestment.toLocaleString()}원
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
                    <div className="text-sm text-slate-400">총 투입 원금</div>
                    <div className="text-lg font-bold text-white">
                      {roiData.totalInvested.toLocaleString()}원
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
                    <div className="text-sm text-slate-400">최종 가치 (재투자)</div>
                    <div className="text-lg font-bold text-emerald-300">
                      {roiData.finalDrip.toLocaleString()}원
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm">
                    <div className="text-sm text-slate-400">최종 가치 (현금수령)</div>
                    <div className="text-lg font-bold text-cyan-300">
                      {roiData.finalCash.toLocaleString()}원
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-base text-slate-200">
                  <div>
                    총 수익 (재투자) :
                    <span className="ml-2 font-bold text-emerald-300">
                      {(roiData.finalDrip - roiData.totalInvested).toLocaleString()}원
                    </span>
                  </div>

                  <div>
                    총 수익 (현금수령) :
                    <span className="ml-2 font-bold text-cyan-300">
                      {(roiData.finalCash - roiData.totalInvested).toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="text-sm text-slate-300">연평균 수익률 (재투자)</div>
                    <div className="text-2xl font-bold text-emerald-300">
                      {(roiData.cagrDrip * 100).toFixed(2)}%
                    </div>
                    <div className="text-xs text-slate-400">
                      CAGR (총투입원금 기준)
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="text-sm text-slate-300">연평균 수익률 (현금수령)</div>
                    <div className="text-2xl font-bold text-white">
                      {(roiData.cagrCash * 100).toFixed(2)}%
                    </div>
                    <div className="text-xs text-slate-400">
                      CAGR (총투입원금 기준)
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-base font-semibold text-emerald-200">
                  DRIP 효과 : {(roiData.finalDrip - roiData.finalCash).toLocaleString()}원
                  차이
                </div>

                <div className="mt-4 text-xs text-slate-400">
                  * 모델: 배당률 {roiData.yieldRate}% / 배당성장{" "}
                  {roiData.growthRate}% / 주가성장 {roiData.priceGrowthRate}% /
                  세율 {roiData.taxRatePct}%
                </div>
              </div>

              {/* 세금 정보 카드 */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
                <h2 className="mb-4 text-base font-bold text-white">💰 세금 정보</h2>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-slate-400">누적 세전 배당금</div>
                    <div className="text-base font-bold text-white">
                      {Math.floor(
                        roiData.totalCashDividend / (1 - roiData.taxRatePct / 100)
                      ).toLocaleString()}
                      원
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-400">누적 납부 세금</div>
                    <div className="text-base font-bold text-rose-300">
                      {Math.floor(roiData.totalTax).toLocaleString()}원
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-400">세후 실수령 배당</div>
                    <div className="text-base font-bold text-emerald-300">
                      {roiData.totalCashDividend.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>

              {/* 차트 */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
                {chartData.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowChart(!showChart)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
                    >
                      {showChart ? "차트 닫기 ▲" : "차트 보기 ▼"}
                    </button>

                    {showChart && (
                      <div className="mt-4">
                        <ResponsiveContainer width="100%" height={420}>
                          <LineChart data={chartData} margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="year" stroke="#94a3b8" />
                            <YAxis
                              tickFormatter={formatYAxis}
                              width={20}
                              stroke="#94a3b8"
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "16px",
                                color: "#e2e8f0",
                              }}
                              formatter={(v: any) => v.toLocaleString() + "원"}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="cash"
                              stroke="#38bdf8"
                              strokeWidth={2}
                              name="현금 수령(배당 누적)"
                            />
                            <Line
                              type="monotone"
                              dataKey="drip"
                              stroke="#34d399"
                              strokeWidth={3}
                              name="DRIP 재투자"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 결과 표 */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
                {tableRows.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowTable(!showTable)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
                    >
                      {showTable ? "연도별 표 닫기 ▲" : "연도별 표 보기 ▼"}
                    </button>

                    {showTable && (
                      <div className="mt-4 overflow-auto">
                        <table className="w-full overflow-hidden rounded-2xl border border-slate-800 text-sm">
                          <thead className="bg-slate-800">
                            <tr>
                              <th className="border border-slate-700 p-2 text-slate-200">
                                연도
                              </th>
                              <th className="border border-slate-700 p-2 text-slate-200">
                                현금 총자산
                              </th>
                              <th className="border border-slate-700 p-2 text-slate-200">
                                현금 연배당
                              </th>
                              <th className="border border-slate-700 p-2 text-slate-200">
                                DRIP 총자산
                              </th>
                              <th className="border border-slate-700 p-2 text-slate-200">
                                DRIP 연배당
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableRows.map((row) => (
                              <tr
                                key={row.year}
                                className="border-t border-slate-700 text-center text-slate-300"
                              >
                                <td className="border border-slate-700 p-2">
                                  {row.year}년
                                </td>
                                <td className="border border-slate-700 p-2">
                                  {row.cashTotal.toLocaleString()}원
                                </td>
                                <td className="border border-slate-700 p-2">
                                  {row.cashDividend.toLocaleString()}원
                                </td>
                                <td className="border border-slate-700 p-2 font-semibold text-emerald-300">
                                  {row.dripTotal.toLocaleString()}원
                                </td>
                                <td className="border border-slate-700 p-2 text-emerald-300">
                                  {row.dripDividend.toLocaleString()}원
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-2 text-xs text-slate-400">
                          * “현금 총자산”은 주식가치 + 누적 배당현금(세후)을 포함합니다.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <CalculatorInfoSection
                title="계산기 안내"
                bullets={[
                  "배당금은 지급 주기 기준으로 세후 금액으로 계산됩니다.",
                  "주가 성장률과 배당 성장률은 매년 동일하게 적용되는 단순 모델입니다.",
                  "월 적립 투자는 연간 누적 매수 방식으로 반영됩니다.",
                  "재투자는 배당금을 동일 자산에 다시 투입하는 방식입니다.",
                ]}
                examples={[
                  {
                    q: "월배당 ETF를 장기 보유하면 DRIP 차이가 얼마나 날까?",
                    a: "초기 주식 수, 주당 가격, 배당률, 투자 기간을 입력하면 현금수령과 재투자 차이를 함께 볼 수 있습니다.",
                  },
                  {
                    q: "목표 월 배당 100만원을 만들려면?",
                    a: "목표 배당금 역산 기능을 켜고 목표 월 배당금을 입력하면 필요한 투자금과 주식 수를 확인할 수 있습니다.",
                  },
                ]}
                faqs={[
                  {
                    q: "세금은 어떤 방식으로 반영되나요?",
                    a: "일반계좌, ISA, 연금계좌 또는 직접 입력 세율을 선택해 세후 배당 기준으로 계산합니다.",
                  },
                  {
                    q: "재투자 수익률이 왜 더 높게 나오나요?",
                    a: "배당금을 다시 주식 매수에 사용하면 보유 주식 수가 늘어나고, 이후 배당도 더 커지는 복리 효과가 반영되기 때문입니다.",
                  },
                  {
                    q: "실제 투자 결과와 완전히 같나요?",
                    a: "아니요. 실제 세금, 배당 정책 변경, 주가 변동, 환율, 수수료 등은 달라질 수 있어 참고용으로 보는 것이 좋습니다.",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== UI 컴포넌트 ===== */

function Input({ label, value, setValue }: any) {
  return (
    <div className="space-y-2">
      <label className="text-base font-semibold text-white">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
      />
    </div>
  );
}

function PriceInput({ label, value, setValue, format, unformat }: any) {
  return (
    <div className="space-y-2">
      <label className="text-base font-semibold text-white">{label}</label>
      <input
        type="text"
        value={format(unformat(value))}
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

function ToggleButton({ label, value, setValue }: any) {
  return (
    <div className="flex items-center justify-between py-2 text-slate-200">
      <span className="text-base font-semibold text-white">{label}</span>
      <button
        onClick={() => setValue(!value)}
        className={`rounded-full px-4 py-1 transition ${
          value
            ? "bg-cyan-500 text-slate-950"
            : "bg-slate-700 text-slate-200"
        }`}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

function ButtonGroup({ label, options, selected, setSelected }: any) {
  return (
    <div>
      <label className="mb-3 block text-base font-semibold text-white">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {options.map((opt: any) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`rounded-2xl p-3 text-sm transition ${
              selected === opt.value
                ? "bg-cyan-500 text-slate-950"
                : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
            }`}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs opacity-80">연 {opt.value}회 지급</div>
          </button>
        ))}
      </div>
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
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl text-slate-100">
      <h3 className="text-lg font-bold text-white">{title}</h3>

      <div className="mt-4 space-y-6">
        <div>
          <div className="font-semibold text-white">계산 가정/기준</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
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