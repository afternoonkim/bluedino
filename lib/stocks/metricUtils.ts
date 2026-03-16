export function normalizePercentRatio(value?: number | null) {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;
  if (Math.abs(value) > 1) return value / 100;
  return value;
}

export function ratioFractionToPercent(value?: number | null) {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;
  return value * 100;
}

export function formatRatioPercent(value?: number | null, digits = 1) {
  const percent = ratioFractionToPercent(value);
  if (percent === undefined) return "-";
  return `${percent.toFixed(digits)}%`;
}
