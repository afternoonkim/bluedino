export function toDisplayPercent(value?: number | null, mode: "default" | "roe" = "default") {
  if (value === undefined || value === null || Number.isNaN(value)) return undefined;
  const abs = Math.abs(value);

  if (mode === "roe") {
    if (abs <= 5) return value * 100;
    return value;
  }

  if (abs <= 1) return value * 100;
  return value;
}
