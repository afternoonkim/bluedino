"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const quickExamples = ["AAPL", "MSFT", "NVDA", "AMZN"];

function normalizeTickerInput(value: string) {
  return value.toUpperCase().replace(/[^A-Z.\-]/g, "").slice(0, 12);
}

export default function StockSearchForm({
  initialTicker = "",
  compact = false,
}: {
  initialTicker?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [ticker, setTicker] = useState(initialTicker);
  const [error, setError] = useState("");

  const placeholder = useMemo(
    () => (compact ? "예: AAPL" : "예: AAPL, MSFT, NVDA"),
    [compact]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeTickerInput(ticker.trim());
    if (!normalized) {
      setError("미국 기업 티커를 입력해주세요.");
      return;
    }
    if (!/^[A-Z][A-Z.\-]{0,11}$/.test(normalized)) {
      setError("티커는 영문 대문자 기준으로 입력해주세요.");
      return;
    }
    setError("");
    router.push(`/stocks/${encodeURIComponent(normalized)}`);
  };

  const chooseTicker = (value: string) => {
    setTicker(value);
    setError("");
    router.push(`/stocks/${value}`);
  };

  return (
    <div className="space-y-2">
      <form onSubmit={onSubmit} className={`flex ${compact ? "flex-col gap-2 md:flex-row" : "flex-col gap-3 md:flex-row"}`}>
        <label className="sr-only" htmlFor="stock-ticker">미국 기업 티커</label>
        <input
          id="stock-ticker"
          value={ticker}
          onChange={(event) => {
            setTicker(normalizeTickerInput(event.target.value));
            if (error) setError("");
          }}
          placeholder={placeholder}
          className="bd-input flex-1"
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="characters"
          inputMode="text"
        />
        <button type="submit" className="bd-button-primary gap-2 whitespace-nowrap">
          <Search size={18} />
          기업 분석 보기
        </button>
      </form>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {!compact ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-slate-500">예시 티커</span>
          {quickExamples.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => chooseTicker(item)}
              className="rounded-lg border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
