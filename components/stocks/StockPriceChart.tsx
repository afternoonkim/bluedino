"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HistoricalPoint } from "@/lib/stocks/types";

function formatDateLabel(value: string) {
  const date = new Date(value);
  return `${date.getFullYear().toString().slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

export default function StockPriceChart({ data }: { data: HistoricalPoint[] }) {
  if (!data.length) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 px-6 text-center text-sm leading-7 text-slate-400">
        가격 흐름 데이터를 아직 불러오지 못했습니다. 잠시 후 다시 시도하거나 다른 티커를 확인해주세요.
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 8 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            minTickGap={32}
          />
          <YAxis
            tickFormatter={(value: number) => `$${Math.round(value)}`}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={64}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#081225",
              border: "1px solid rgba(34, 211, 238, 0.18)",
              borderRadius: 12,
              color: "#e2e8f0",
            }}
            labelFormatter={(label) => {
              if (typeof label === "string" || typeof label === "number") {
                return new Date(label).toLocaleDateString("ko-KR");
              }
              return "";
            }}
            formatter={(value) => [formatPrice(Number(value)), "종가"]}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#22d3ee"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, stroke: "#22d3ee", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
