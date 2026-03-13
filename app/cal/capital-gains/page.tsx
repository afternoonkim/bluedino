"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

type Currency = "KRW" | "USD";

type TradeRow = {
  id: string;
  name: string; // 종목명/메모
  currency: Currency;

  buy: string; // 총 매수금액 (통화 기준)
  sell: string; // 총 매도금액 (통화 기준)

  // 수수료 분리 (통화 기준)
  buyFee: string; // 매수 수수료/비용
  sellFee: string; // 매도 수수료/비용

  // USD일 때만 의미 있음 (KRW는 무시)
  fxMode: "auto" | "manual";
  buyFx: string; // 매수 환율(원/USD)
  sellFx: string; // 매도 환율(원/USD)
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function CapitalGainsTaxPage() {
  // ===== utils =====
  const format = (n: number) => Math.floor(n).toLocaleString("ko-KR");
  const unformat = (s: string) => Number(String(s ?? "").replace(/,/g, "")) || 0;

  const clampNumber = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));

  // ===== global inputs =====
  const [taxYear, setTaxYear] = useState<number>(new Date().getFullYear());
  const [useDeduction, setUseDeduction] = useState(true); // 기본공제 250만원
  const [deduction, setDeduction] = useState("2500000"); // 수정 가능
  const [taxRate, setTaxRate] = useState(22); // 기본 22% (지방세 포함)
  const [carryLoss, setCarryLoss] = useState("0"); // 이월결손금(사용자 입력)

  // ===== USD/KRW 환율(자동) =====
  const [usdKrw, setUsdKrw] = useState<number | null>(null);
  const [fxLoading, setFxLoading] = useState(false);
  const [fxError, setFxError] = useState<string | null>(null);
  const [fxUpdatedAt, setFxUpdatedAt] = useState<string>("");

  // ===== trades =====
  const [trades, setTrades] = useState<TradeRow[]>([
    {
      id: uid(),
      name: "예: AAPL",
      currency: "USD",
      buy: "10000",
      sell: "15000",
      buyFee: "0",
      sellFee: "0",
      fxMode: "auto",
      buyFx: "1350",
      sellFx: "1350",
    },
    {
      id: uid(),
      name: "예: (국내환산메모)",
      currency: "KRW",
      buy: "30000000",
      sell: "50000000",
      buyFee: "0",
      sellFee: "0",
      fxMode: "auto",
      buyFx: "1350",
      sellFx: "1350",
    },
  ]);

  // ===== UI toggles =====
  const [showHow, setShowHow] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);

  // ===== capture refs =====
  const summaryRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // ===== 환율 가져오기 =====
  const fetchExchangeRate = async () => {
    try {
      setFxLoading(true);
      setFxError(null);

      const res = await fetch("https://open.er-api.com/v6/latest/USD", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.result !== "success") throw new Error("fx api fail");

      const rate = Number(data?.rates?.KRW);
      if (!Number.isFinite(rate) || rate <= 0) throw new Error("bad fx");

      setUsdKrw(rate);
      setFxUpdatedAt(new Date().toLocaleString("ko-KR"));
    } catch {
      setFxError("환율 업데이트 실패 (수동 환율 사용)");
    } finally {
      setFxLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  // ===== row 계산 (KRW 환산) =====
  const rowToKrw = (row: TradeRow) => {
    const buy = unformat(row.buy);
    const sell = unformat(row.sell);
    const buyFee = unformat(row.buyFee);
    const sellFee = unformat(row.sellFee);

    // 기본 안전장치
    const safeBuy = Math.max(0, buy);
    const safeSell = Math.max(0, sell);
    const safeBuyFee = Math.max(0, buyFee);
    const safeSellFee = Math.max(0, sellFee);

    if (row.currency === "KRW") {
      // 취득가액 = 매수 + 매수수수료
      // 양도가액 = 매도 - 매도수수료
      const buyKrw = safeBuy + safeBuyFee;
      const sellKrw = Math.max(0, safeSell - safeSellFee);

      return {
        buyKrw,
        sellKrw,
        gainKrw: sellKrw - buyKrw,
        fxUsedBuy: 1,
        fxUsedSell: 1,
        fxSource: "KRW",
        fxNote: "KRW 거래(환율 미적용)",
      };
    }

    // USD인 경우: 매수/매도 환율 분리
    // auto 모드면 현재 환율(usdKrw)을 기본값으로, 비었거나 실패 시 수동 입력값 fallback
    const manualBuyFx = unformat(row.buyFx);
    const manualSellFx = unformat(row.sellFx);

    const fxFallback = usdKrw ?? 1350; // 최후의 fallback

    const fxBuy =
      row.fxMode === "manual"
        ? manualBuyFx || fxFallback
        : (usdKrw ?? manualBuyFx) || fxFallback;

    const fxSell =
      row.fxMode === "manual"
        ? manualSellFx || fxFallback
        : (usdKrw ?? manualSellFx) || fxFallback;

    const safeFxBuy = fxBuy > 0 ? fxBuy : fxFallback;
    const safeFxSell = fxSell > 0 ? fxSell : fxFallback;

    // 취득가액(원) = (매수USD + 매수수수료USD) × 매수환율
    const buyKrw = (safeBuy + safeBuyFee) * safeFxBuy;

    // 양도가액(원) = (매도USD - 매도수수료USD) × 매도환율
    const sellKrw = Math.max(0, (safeSell - safeSellFee) * safeFxSell);

    return {
      buyKrw,
      sellKrw,
      gainKrw: sellKrw - buyKrw,
      fxUsedBuy: safeFxBuy,
      fxUsedSell: safeFxSell,
      fxSource:
        row.fxMode === "auto"
          ? usdKrw
            ? "AUTO"
            : "AUTO(FALLBACK)"
          : "MANUAL",
      fxNote:
        row.fxMode === "auto"
          ? usdKrw
            ? "자동 환율 사용"
            : "자동 실패 → 수동/기본값 fallback"
          : "수동 환율 사용",
    };
  };

  // ===== 전체 결과 =====
  const result = useMemo(() => {
    const rows = trades.map((t) => {
      const k = rowToKrw(t);
      return {
        ...t,
        ...k,
      };
    });

    const totalGain = rows.reduce((sum, r) => sum + (r.gainKrw ?? 0), 0);

    const carry = Math.max(0, unformat(carryLoss));
    const baseDeduction = useDeduction ? Math.max(0, unformat(deduction)) : 0;

    // 과세표준 = max(0, (연간순이익 - 이월결손금 - 기본공제))
    const taxableBase = Math.max(0, totalGain - carry - baseDeduction);

    const safeTaxRate = clampNumber(Number(taxRate) || 0, 0, 100);
    const tax = taxableBase * (safeTaxRate / 100);

    // UI용 “실현손익(추정)” = 연간순손익 - 산출세액
    // (공제/이월결손금은 “세금”만 줄이는 요소라서, 실현손익 자체에는 영향이 없다는 점을 계산방식에서 명확히 안내)
    const netAfterTax = totalGain - tax;

    // 로그(설명용)
    const log = [
      {
        label: "연간 순손익(손익통산)",
        value: totalGain,
        hint: "모든 거래의 원화 손익 합계",
      },
      {
        label: "이월결손금 차감",
        value: -carry,
        hint: "이전 연도 손실금(사용자 입력)",
      },
      {
        label: "기본공제",
        value: -baseDeduction,
        hint: "기본공제 적용 시 차감",
      },
      {
        label: "과세표준",
        value: taxableBase,
        hint: "0원 미만이면 0으로 처리",
        strong: true,
      },
      {
        label: `세율(${safeTaxRate}%) 적용`,
        value: tax,
        hint: "산출세액(추정)",
        strong: true,
      },
    ];

    return {
      rows,
      totalGain,
      carry,
      baseDeduction,
      taxableBase,
      tax,
      netAfterTax,
      safeTaxRate,
      log,
    };
  }, [trades, usdKrw, carryLoss, useDeduction, deduction, taxRate]);

  // ===== handlers =====
  const updateTrade = (id: string, patch: Partial<TradeRow>) => {
    setTrades((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = { ...t, ...patch };

        // 통화를 KRW로 바꾸면 환율 입력은 UI에서 숨기지만 값은 유지해도 OK
        // 다만 USD인 경우 buyFx/sellFx가 비면 기본값 채우기
        if (next.currency === "USD") {
          const fallback = String(usdKrw ? Math.floor(usdKrw) : 1350);
          if (!next.buyFx) next.buyFx = fallback;
          if (!next.sellFx) next.sellFx = fallback;
        }
        return next;
      })
    );
  };

  const addTrade = () => {
    const fallback = String(usdKrw ? Math.floor(usdKrw) : 1350);
    setTrades((prev) => [
      ...prev,
      {
        id: uid(),
        name: "",
        currency: "USD",
        buy: "0",
        sell: "0",
        buyFee: "0",
        sellFee: "0",
        fxMode: "auto",
        buyFx: fallback,
        sellFx: fallback,
      },
    ]);
  };

  const removeTrade = (id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  };

  // ===== 이미지/PDF 저장 =====
  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleSaveSummaryPng = async () => {
    if (!summaryRef.current) return;
    const node = summaryRef.current;

    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 2,
      backgroundColor: "#020617",
      cacheBust: true,
    });

    downloadDataUrl(dataUrl, `capital-gains-summary-${taxYear}.png`);
  };

  const handleSaveTablePng = async () => {
    if (!tableRef.current) return;
    const node = tableRef.current;

    const prevOverflow = node.style.overflow;
    node.style.overflow = "visible";

    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 2,
      backgroundColor: "#020617",
      cacheBust: true,
    });

    node.style.overflow = prevOverflow;

    downloadDataUrl(dataUrl, `capital-gains-table-${taxYear}.png`);
  };

  const handleSaveSummaryPdf = async () => {
    if (!summaryRef.current) return;

    const { jsPDF } = await import("jspdf");

    const dataUrl = await htmlToImage.toPng(summaryRef.current, {
      pixelRatio: 2,
      backgroundColor: "#020617",
      cacheBust: true,
    });

    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("이미지 로드 실패"));
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const ratio = pageW / img.width;
    const imgW = pageW;
    const imgH = img.height * ratio;

    let y = 0;
    let remaining = imgH;

    while (remaining > 0) {
      pdf.addImage(dataUrl, "PNG", 0, y, imgW, imgH);
      remaining -= pageH;
      if (remaining > 0) {
        pdf.addPage();
        y -= pageH;
      }
    }

    pdf.save(`capital-gains-summary-${taxYear}.pdf`);
  };

  const handleSaveTablePdf = async () => {
    if (!tableRef.current) return;

    const node = tableRef.current;
    const prevOverflow = node.style.overflow;
    node.style.overflow = "visible";

    const { jsPDF } = await import("jspdf");

    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 2,
      backgroundColor: "#020617",
      cacheBust: true,
    });

    node.style.overflow = prevOverflow;

    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("이미지 로드 실패"));
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const ratio = pageW / img.width;
    const imgW = pageW;
    const imgH = img.height * ratio;

    let y = 0;
    let remaining = imgH;

    while (remaining > 0) {
      pdf.addImage(dataUrl, "PNG", 0, y, imgW, imgH);
      remaining -= pageH;
      if (remaining > 0) {
        pdf.addPage();
        y -= pageH;
      }
    }

    pdf.save(`capital-gains-table-${taxYear}.pdf`);
  };

  // ===== derived =====
  const deductionLabel = useDeduction ? `${format(unformat(deduction))}원` : "0원";

  return (
    <div className="bd-page">
      <div className="bd-container grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 좌측 입력 카드 */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl space-y-8 text-slate-100">
          {/* <h2 className="text-lg font-bold text-white">🌎 해외주식 양도세 계산기</h2> */}

          {/* 환율 */}
          <div className="space-y-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-sm text-slate-400">
                  USD/KRW 기준 환율(자동/기본값)
                </label>
                <input
                  type="text"
                  value={usdKrw ? Math.floor(usdKrw).toLocaleString() : ""}
                  onChange={(e) =>
                    setUsdKrw(Number(e.target.value.replace(/[^0-9]/g, "")) || null)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-lg font-semibold text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="예: 1350"
                />
              </div>

              <button
                onClick={fetchExchangeRate}
                disabled={fxLoading}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  fxLoading
                    ? "bg-slate-700 text-slate-300"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                }`}
              >
                {fxLoading ? "불러오는 중..." : "🔄 환율 자동 업데이트"}
              </button>
            </div>

            {fxUpdatedAt && (
              <div className="text-xs text-slate-400">마지막 업데이트: {fxUpdatedAt}</div>
            )}

            {fxError && <div className="text-xs text-rose-300">{fxError}</div>}

            <div className="text-xs text-slate-400">
              * “자동” 환율은 현재 시점 환율입니다. 실제 신고는 “매수/매도 결제일 환율”이
              필요할 수 있어요. 아래 거래별 환율 입력을 활용하세요.
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowAdvanced((v) => !v)}
                className="text-sm font-semibold text-cyan-300 hover:underline"
              >
                {showAdvanced ? "고급 옵션 숨기기" : "고급 옵션 보기"} (거래별 매수/매도 환율·수수료)
              </button>
            </div>
          </div>

          {/* 세팅 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-6">
            <h3 className="font-semibold text-base text-white">세금 설정</h3>

            <NumberInput label="세금 연도(귀속)" value={taxYear} setValue={setTaxYear} />

            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-white">기본공제 적용</span>
              <button
                onClick={() => setUseDeduction(!useDeduction)}
                className={`px-4 py-1 rounded-full transition ${
                  useDeduction
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                {useDeduction ? "ON" : "OFF"}
              </button>
            </div>

            {useDeduction && (
              <MoneyInput label="기본공제 금액(원)" value={deduction} setValue={setDeduction} />
            )}

            <NumberInput label="세율(지방세 포함, %)" value={taxRate} setValue={setTaxRate} />

            <MoneyInput
              label="이월결손금(원) (선택)"
              value={carryLoss}
              setValue={setCarryLoss}
              helper="이전 과세연도에서 넘어온 손실금액이 있다면 입력하세요. (없으면 0)"
            />
          </div>

          {/* 거래 입력 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base text-white">거래 입력(여러 종목 합산)</h3>
              <button
                onClick={addTrade}
                className="px-4 py-2 rounded-2xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
              >
                + 거래 추가
              </button>
            </div>

            <div className="space-y-4">
              {trades.map((t, idx) => {
                const row = result.rows.find((r) => r.id === t.id);
                return (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-semibold">#{idx + 1}</span>
                        <input
                          value={t.name}
                          onChange={(e) => updateTrade(t.id, { name: e.target.value })}
                          placeholder="종목명/메모 (예: AAPL)"
                          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 w-60"
                        />
                      </div>

                      <button
                        onClick={() => removeTrade(t.id)}
                        className="text-sm font-semibold text-rose-300 hover:underline disabled:text-slate-500"
                        disabled={trades.length <= 1}
                        title={trades.length <= 1 ? "최소 1개는 남겨야 합니다" : "삭제"}
                      >
                        삭제
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 통화 */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-white">통화</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => updateTrade(t.id, { currency: "KRW" })}
                            className={`p-3 rounded-2xl text-sm font-semibold transition ${
                              t.currency === "KRW"
                                ? "bg-cyan-500 text-slate-950"
                                : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                            }`}
                          >
                            KRW
                          </button>
                          <button
                            onClick={() => updateTrade(t.id, { currency: "USD" })}
                            className={`p-3 rounded-2xl text-sm font-semibold transition ${
                              t.currency === "USD"
                                ? "bg-cyan-500 text-slate-950"
                                : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                            }`}
                          >
                            USD
                          </button>
                        </div>
                      </div>

                      {/* USD 옵션 */}
                      {t.currency === "USD" ? (
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-white">
                            환율 적용
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => updateTrade(t.id, { fxMode: "auto" })}
                              className={`p-3 rounded-2xl text-sm font-semibold transition ${
                                t.fxMode === "auto"
                                  ? "bg-cyan-500 text-slate-950"
                                  : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                              }`}
                            >
                              자동
                            </button>
                            <button
                              onClick={() => updateTrade(t.id, { fxMode: "manual" })}
                              className={`p-3 rounded-2xl text-sm font-semibold transition ${
                                t.fxMode === "manual"
                                  ? "bg-cyan-500 text-slate-950"
                                  : "border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800"
                              }`}
                            >
                              수동
                            </button>
                          </div>

                          {showAdvanced && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <MoneyInput
                                label="매수 환율(원/USD)"
                                value={t.buyFx}
                                setValue={(v) => updateTrade(t.id, { buyFx: v })}
                                compact
                              />
                              <MoneyInput
                                label="매도 환율(원/USD)"
                                value={t.sellFx}
                                setValue={(v) => updateTrade(t.id, { sellFx: v })}
                                compact
                              />
                            </div>
                          )}

                          <div className="text-xs text-slate-400 mt-2">
                            현재 적용: {row?.fxSource} · 매수환율 {format(row?.fxUsedBuy ?? 0)}원 ·
                            매도환율 {format(row?.fxUsedSell ?? 0)}원
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-slate-400 flex items-center">
                          KRW 거래는 환율이 필요 없습니다.
                        </div>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MoneyInput
                        label="총 매수금액"
                        value={t.buy}
                        setValue={(v) => updateTrade(t.id, { buy: v })}
                      />
                      <MoneyInput
                        label="총 매도금액"
                        value={t.sell}
                        setValue={(v) => updateTrade(t.id, { sell: v })}
                      />
                    </div>

                    {showAdvanced ? (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MoneyInput
                          label="매수 수수료/비용"
                          value={t.buyFee}
                          setValue={(v) => updateTrade(t.id, { buyFee: v })}
                          helper={
                            t.currency === "USD"
                              ? "USD 기준(매수금액에 더해져 취득가액에 포함)"
                              : "KRW 기준(매수금액에 더해져 취득가액에 포함)"
                          }
                        />
                        <MoneyInput
                          label="매도 수수료/비용"
                          value={t.sellFee}
                          setValue={(v) => updateTrade(t.id, { sellFee: v })}
                          helper={
                            t.currency === "USD"
                              ? "USD 기준(매도금액에서 차감되어 양도가액 감소)"
                              : "KRW 기준(매도금액에서 차감되어 양도가액 감소)"
                          }
                        />
                      </div>
                    ) : (
                      <div className="mt-4 text-xs text-slate-400">
                        고급 옵션을 켜면 매수/매도 수수료를 분리 입력할 수 있습니다.
                      </div>
                    )}

                    {/* row preview */}
                    <div className="mt-4 text-sm text-slate-300">
                      <span className="font-semibold">행 손익(원화 환산): </span>
                      <span
                        className={`${
                          (row?.gainKrw ?? 0) >= 0 ? "text-emerald-300" : "text-rose-300"
                        } font-bold`}
                      >
                        {format(row?.gainKrw ?? 0)}원
                      </span>
                      {t.currency === "USD" ? (
                        <span className="text-xs text-slate-400 ml-2">
                          ({row?.fxNote})
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 계산 방식 보기 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
            <button
              onClick={() => setShowHow((v) => !v)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
            >
              {showHow ? "계산 방식 닫기 ▲" : "계산 방식 보기 ▼"}
            </button>

            {showHow && (
              <div className="text-sm text-slate-300 space-y-2">
                <div>
                  1) 거래별 손익(원화) = <b>양도가액(원) - 취득가액(원)</b>
                </div>
                <div className="pl-3 text-xs text-slate-400 space-y-1">
                  <div>
                    - 취득가액(원) = (매수금액 + 매수수수료) × <b>매수환율</b>(USD일 때)
                  </div>
                  <div>
                    - 양도가액(원) = (매도금액 - 매도수수료) × <b>매도환율</b>(USD일 때)
                  </div>
                </div>
                <div>2) 연간 순손익 = 모든 거래 손익 합산(손익통산)</div>
                <div>
                  3) 과세표준 = max(0, <b>연간 순손익 - 이월결손금 - 기본공제</b>)
                </div>
                <div>4) 세금(추정) = 과세표준 × 세율</div>
                <div className="text-xs text-slate-400">
                  * 실제 신고는 개인 상황/세법 적용/결제일 환율 등에 따라 달라질 수 있어요.
                  (이 페이지는 계산 편의를 위한 단순화 모델)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 우측 결과(Sticky) */}
        <div className="space-y-6 sticky top-10 h-fit">
          {/* 저장 버튼 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSaveSummaryPng}
              className="w-full rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 font-semibold transition"
            >
              📸 요약 PNG 저장
            </button>
            <button
              onClick={handleSaveSummaryPdf}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800 text-slate-100 py-3 font-semibold transition"
            >
              📄 요약 PDF 저장
            </button>
            <button
              onClick={handleSaveTablePng}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800 text-slate-100 py-3 font-semibold transition"
            >
              📸 표 PNG 저장
            </button>
            <button
              onClick={handleSaveTablePdf}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 hover:border-slate-600 hover:bg-black text-slate-100 py-3 font-semibold transition"
            >
              📄 표 PDF 저장
            </button>
          </div>

          {/* 결과 요약 캡처 영역 */}
          <div ref={summaryRef} className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl p-6 space-y-5 text-slate-100">
              <h2 className="text-lg font-bold text-white">📌 결과 요약</h2>

              <div className="grid grid-cols-2 gap-4">
                <MiniCard
                  title="연간 순손익(손익통산)"
                  value={`${format(result.totalGain)}원`}
                  tone={result.totalGain >= 0 ? "green" : "red"}
                />
                <MiniCard title="이월결손금 차감" value={`${format(result.carry)}원`} tone="blue" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MiniCard title="기본공제" value={deductionLabel} tone="blue" />
                <MiniCard
                  title="과세표준"
                  value={`${format(result.taxableBase)}원`}
                  tone="blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MiniCard title="예상 세금(추정)" value={`${format(result.tax)}원`} tone="red" />
                <MiniCard
                  title="세후 실현손익(추정)"
                  value={`${format(result.netAfterTax)}원`}
                  tone={result.netAfterTax >= 0 ? "green" : "red"}
                />
              </div>

              <div
                className={`p-4 rounded-2xl font-semibold border ${
                  result.taxableBase > 0
                    ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                    : "bg-slate-950/60 text-slate-300 border-slate-800"
                }`}
              >
                {result.taxableBase > 0
                  ? `✅ 과세 대상입니다. (세율 ${result.safeTaxRate}% 적용)`
                  : "ℹ️ 과세표준이 0원입니다. (공제/손실로 과세 없음)"}
              </div>
            </div>

            {/* 계산 로그(참고표) */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl p-6 space-y-3 text-slate-100">
              <h3 className="text-base font-bold text-white">📎 계산 로그(참고표)</h3>
              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="p-3 border-b border-slate-700 text-left text-slate-200">항목</th>
                      <th className="p-3 border-b border-slate-700 text-right text-slate-200">금액(원)</th>
                      <th className="p-3 border-b border-slate-700 text-left text-slate-200">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.log.map((r, i) => (
                      <tr key={i} className={r.strong ? "bg-cyan-500/10" : "bg-slate-950/30"}>
                        <td className="p-3 border-b border-slate-700 font-semibold text-slate-100">
                          {r.label}
                        </td>
                        <td className="p-3 border-b border-slate-700 text-right">
                          <span className={r.value < 0 ? "text-rose-300" : "text-slate-100"}>
                            {format(r.value)}
                          </span>
                        </td>
                        <td className="p-3 border-b border-slate-700 text-xs text-slate-400">
                          {r.hint}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-400">
                * “세후 실현손익(추정)”은 <b>연간 순손익 - 산출세액</b>입니다. (공제/이월결손금은
                세금만 줄이는 요소)
              </div>
            </div>

            {/* 신고 스케줄 안내 */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl p-6 space-y-2 text-slate-100">
              <h3 className="text-base font-bold text-white">🗓️ 신고 스케줄 안내</h3>
              <div className="text-sm text-slate-300">
                - 귀속연도: <b>{taxYear}년</b> 거래 손익 기준
              </div>
              <div className="text-sm text-slate-300">
                - 통상 신고/납부: <b>{taxYear + 1}년 5월</b> 종합소득세 신고기간(양도소득 포함)
                기준으로 처리
              </div>
              <div className="text-xs text-slate-400">
                * 정확한 일정/요건은 개인 상황 및 공지에 따라 달라질 수 있어요.
              </div>
            </div>
          </div>

          {/* 표 캡처 영역 */}
          <div
            ref={tableRef}
            className="rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl p-6 space-y-4 text-slate-100"
          >
            <h3 className="text-base font-bold text-white">📋 거래 합산 표</h3>

            <div className="overflow-visible">
              <table className="w-full text-sm border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-2 border border-slate-700 text-slate-200">#</th>
                    <th className="p-2 border border-slate-700 text-left text-slate-200">종목/메모</th>
                    <th className="p-2 border border-slate-700 text-slate-200">통화</th>
                    <th className="p-2 border border-slate-700 text-slate-200">취득가액(원)</th>
                    <th className="p-2 border border-slate-700 text-slate-200">양도가액(원)</th>
                    <th className="p-2 border border-slate-700 text-slate-200">손익(원)</th>
                    <th className="p-2 border border-slate-700 text-slate-200">환율(매수/매도)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, i) => (
                    <tr key={r.id} className="text-center border-t border-slate-700 bg-slate-950/30">
                      <td className="p-2 border border-slate-700 text-slate-300">{i + 1}</td>
                      <td className="p-2 border border-slate-700 text-left text-slate-300">{r.name || "-"}</td>
                      <td className="p-2 border border-slate-700 text-slate-300">{r.currency}</td>
                      <td className="p-2 border border-slate-700 text-slate-300">{format(r.buyKrw)}원</td>
                      <td className="p-2 border border-slate-700 text-slate-300">{format(r.sellKrw)}원</td>
                      <td
                        className={`p-2 border border-slate-700 font-semibold ${
                          r.gainKrw >= 0 ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {format(r.gainKrw)}원
                      </td>
                      <td className="p-2 border border-slate-700 text-xs text-slate-400">
                        {r.currency === "USD"
                          ? `${format(r.fxUsedBuy)} / ${format(r.fxUsedSell)}`
                          : "-"}
                      </td>
                    </tr>
                  ))}

                  <tr className="bg-slate-800 font-bold">
                    <td className="p-2 border border-slate-700 text-slate-200" colSpan={5}>
                      합계(연간 순손익)
                    </td>
                    <td
                      className={`p-2 border border-slate-700 ${
                        result.totalGain >= 0 ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {format(result.totalGain)}원
                    </td>
                    <td className="p-2 border border-slate-700 text-xs text-slate-400">손익통산</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>
                * USD 거래는 <b>매수환율/매도환율을 분리 적용</b>해 원화로 환산합니다.
              </div>
              <div>* 취득가액 = 매수금액 + 매수수수료 / 양도가액 = 매도금액 - 매도수수료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== UI components ===== */

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
  helper,
  compact,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  helper?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <label className={`${compact ? "text-sm" : "text-base"} font-semibold text-white`}>
        {label}
      </label>
      <input
        type="text"
        value={Number(value || "0").toLocaleString("ko-KR")}
        onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
        className={
          compact
            ? "w-full rounded-xl border border-slate-700 bg-slate-950 p-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            : "w-full rounded-2xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
        }
      />
      {helper ? <div className="text-xs text-slate-400">{helper}</div> : null}
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
      <div className={`text-base font-bold mt-1 ${toneClass}`}>{value}</div>
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
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="text-xs text-slate-400">예시 {i + 1}</div>
                <div className="mt-1 text-sm font-semibold text-white">{ex.q}</div>
                <div className="mt-2 text-sm text-slate-300">{ex.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="font-semibold text-white">FAQ</div>
          <div className="mt-2 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <div className="text-sm font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm text-slate-300">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
          <b>면책</b> : 본 계산 결과는 참고용이며, 실제 세금/투자 결과는 개인 상황 및 제도 변경에 따라 달라질 수 있습니다.
        </div>
      </div>
    </section>
  );
}