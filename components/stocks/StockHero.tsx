import type { StockProfile, StockQuote } from "@/lib/stocks/types";

function formatMoney(value?: number, currency = "USD") {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);
}

function formatCompactMoney(value?: number, currency = "USD") {
  if (value === undefined || value === null || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function buildKoreanSummary(profile: StockProfile, quote: StockQuote) {
  const company = profile.companyName || profile.symbol || "이 기업";
  const market = profile.exchangeShortName || profile.exchange || "미국 시장";
  const sector = profile.sector || "주요 업종 정보";
  const industry = profile.industry || "세부 산업 정보";
  const marketCap = formatCompactMoney(
    quote?.marketCap ?? profile.marketCap,
    profile.currency ?? "USD"
  );
  const price = formatMoney(quote?.price, profile.currency ?? "USD");

  return `${company}은(는) ${market}에 상장된 미국 기업으로, ${sector} 섹터와 ${industry} 산업에 속해 있습니다. 현재 주가는 ${price}, 시가총액은 ${marketCap} 수준이며 BlueDino 기준으로 현재 주가와 핵심 재무지표를 함께 점검할 수 있습니다.`;
}

export default function StockHero({
  profile,
  quote,
}: {
  profile: StockProfile;
  quote: StockQuote;
}) {
  const change = quote?.change ?? 0;
  const changePct = quote?.changesPercentage ?? 0;
  const isUp = change >= 0;

  return (
    <section className="bd-card bd-card-padding overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bd-badge">미국 기업 분석</span>
            <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
              {profile.exchangeShortName ?? profile.exchange ?? "US Market"}
            </span>
          </div>

          <div>
            <h1 className="bd-title-xl">{profile.companyName}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-1 font-semibold text-white">
                {profile.symbol}
              </span>
              {profile.sector ? <span>{profile.sector}</span> : null}
              {profile.industry ? <span>· {profile.industry}</span> : null}
            </div>
          </div>

          <p className="max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
            {buildKoreanSummary(profile, quote)}
          </p>
        </div>

        <div className="min-w-[280px] rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <div className="text-sm text-slate-400">현재 주가</div>
          <div className="mt-2 text-4xl font-bold text-white">
            {formatMoney(quote?.price, profile.currency ?? "USD")}
          </div>
          <div className={`mt-2 text-sm font-semibold ${isUp ? "text-emerald-300" : "text-rose-300"}`}>
            {isUp ? "+" : ""}
            {formatMoney(change, profile.currency ?? "USD")} ({isUp ? "+" : ""}
            {changePct.toFixed(2)}%)
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-xs text-slate-500">시가총액</div>
              <div className="mt-1 font-semibold text-white">
                {formatCompactMoney(
                  quote?.marketCap ?? profile.marketCap,
                  profile.currency ?? "USD"
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-xs text-slate-500">52주 범위</div>
              <div className="mt-1 font-semibold text-white">
                {formatMoney(quote?.yearLow, profile.currency ?? "USD")} ~{" "}
                {formatMoney(quote?.yearHigh, profile.currency ?? "USD")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}