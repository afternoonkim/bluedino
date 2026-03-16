import type { Metadata } from "next";
import { getEtfCompare, isFmpConfigured } from "@/lib/etf/fmp";
import { ETF_OPTIONS } from "@/lib/etf/universe";
import {
  EmptyState,
  formatCurrency,
  formatDate,
  formatPercent,
  InfoNotice,
  NavPills,
  PageHero,
} from "@/components/etf/EtfUi";

export const metadata: Metadata = {
  title: "ETF 비교",
  description:
    "SCHD, JEPI, VYM 같은 주요 ETF를 운용보수, AUM, 상위 보유종목, 배당 일정으로 비교하는 BlueDino ETF 비교 페이지입니다.",
};

export const dynamic = "force-dynamic";

export default async function EtfComparePage({
  searchParams,
}: {
  searchParams: Promise<{ left?: string; right?: string }>;
}) {
  const resolved = await searchParams;
  const left = (resolved.left || "SCHD").toUpperCase();
  const right = (resolved.right || "JEPI").toUpperCase();

  if (!isFmpConfigured()) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="BlueDino ETF Compare"
            title="ETF 비교"
            description="ETF 2개를 같은 화면에서 비교하는 메뉴입니다. 서버 캐시 후 재사용하도록 설계되어 API 호출량을 최소화합니다."
            actions={<NavPills />}
          />
          <InfoNotice>
            현재는 FMP_API_KEY가 설정되지 않아 비교 데이터를 불러오지 못하고 있습니다.
            환경변수를 추가한 뒤 배포하면 자동으로 동작합니다.
          </InfoNotice>
        </div>
      </div>
    );
  }

  let compareData: Awaited<ReturnType<typeof getEtfCompare>> | null = null;

  try {
    compareData = await getEtfCompare(left, right);
  } catch (error) {
    console.error("ETF compare load failed", error);
  }

  if (!compareData) {
    return (
      <div className="bd-page">
        <div className="bd-container space-y-8">
          <PageHero
            badge="BlueDino ETF Compare"
            title="ETF 비교"
            description="ETF 2개를 같은 화면에서 비교하는 메뉴입니다."
            actions={<NavPills />}
          />
          <InfoNotice>
            현재 FMP 호출 제한 또는 일시적 응답 문제로 비교 데이터를 불러오지 못했습니다.
            잠시 후 다시 시도해 주세요.
          </InfoNotice>
        </div>
      </div>
    );
  }

  const leftData = compareData.left;
  const rightData = compareData.right;

  const metrics = [
    {
      label: "현재 가격",
      left: formatCurrency(leftData.quote?.price),
      right: formatCurrency(rightData.quote?.price),
    },
    {
      label: "1일 등락",
      left: formatPercent(leftData.quote?.changesPercentage),
      right: formatPercent(rightData.quote?.changesPercentage),
    },
    {
      label: "운용보수",
      left: formatPercent(
        typeof leftData.info?.expenseRatio === "number"
          ? leftData.info.expenseRatio * (leftData.info.expenseRatio <= 1 ? 100 : 1)
          : null
      ),
      right: formatPercent(
        typeof rightData.info?.expenseRatio === "number"
          ? rightData.info.expenseRatio * (rightData.info.expenseRatio <= 1 ? 100 : 1)
          : null
      ),
    },
    {
      label: "AUM",
      left: formatCurrency(leftData.info?.assetsUnderManagement, true),
      right: formatCurrency(rightData.info?.assetsUnderManagement, true),
    },
    {
      label: "평균 거래량",
      left: leftData.info?.avgVolume?.toLocaleString("en-US") ?? "-",
      right: rightData.info?.avgVolume?.toLocaleString("en-US") ?? "-",
    },
    {
      label: "설정일",
      left: formatDate(leftData.info?.inceptionDate),
      right: formatDate(rightData.info?.inceptionDate),
    },
  ];

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <PageHero
          badge="BlueDino ETF Compare"
          title="ETF 비교"
          description="대표 ETF 2개를 선택하면 가격, 운용보수, AUM, 상위 보유종목, 최근 배당 일정을 한 화면에서 비교할 수 있습니다."
          actions={<NavPills />}
        />

        <section className="bd-card-soft bd-card-padding">
          <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">왼쪽 ETF</span>
              <select name="left" defaultValue={left} className="bd-select">
                {ETF_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">오른쪽 ETF</span>
              <select name="right" defaultValue={right} className="bd-select">
                {ETF_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <button type="submit" className="bd-button-primary w-full">
                비교하기
              </button>
            </div>
          </form>
        </section>

        {!leftData.quote && !rightData.quote ? (
          <EmptyState
            title="비교 데이터가 없습니다"
            description="선택한 ETF 데이터가 비어 있습니다. 다른 ETF를 선택하거나 잠시 후 다시 시도해 주세요."
          />
        ) : (
          <>
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="bd-card-soft bd-card-padding">
                <h2 className="bd-title-md">핵심 지표 비교</h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-sm text-slate-200">
                    <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="py-3">항목</th>
                        <th className="py-3 text-white">{leftData.symbol}</th>
                        <th className="py-3 text-white">{rightData.symbol}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.map((metric) => (
                        <tr key={metric.label} className="border-t border-slate-800">
                          <td className="py-3 text-slate-400">{metric.label}</td>
                          <td className="py-3 font-medium">{metric.left}</td>
                          <td className="py-3 font-medium">{metric.right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="bd-card-soft bd-card-padding">
                <h2 className="bd-title-md">비교 메모</h2>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <span className="font-semibold text-white">{leftData.symbol}</span>는{" "}
                    {leftData.info?.description || leftData.displayName} 중심의 ETF입니다.
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <span className="font-semibold text-white">{rightData.symbol}</span>는{" "}
                    {rightData.info?.description || rightData.displayName} 중심의 ETF입니다.
                  </div>
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-100">
                    이 비교 페이지는 선택한 ETF 2개에 대해서만 추가 데이터 호출이 발생하고,
                    응답 결과는 서버 캐시에 저장되어 이후 방문자는 저장된 데이터를 재사용합니다.
                  </div>
                </div>
              </article>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              {[leftData, rightData].map((etf) => (
                <article key={etf.symbol} className="bd-card-soft bd-card-padding">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="bd-badge">{etf.symbol}</span>
                      <h2 className="mt-3 text-2xl font-bold text-white">{etf.displayName}</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        상위 보유종목과 최근 배당 일정을 함께 보여주는 비교 카드입니다.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-right">
                      <div className="text-xs text-slate-400">현재 가격</div>
                      <div className="text-xl font-bold text-white">
                        {formatCurrency(etf.quote?.price)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">상위 보유종목</h3>
                      <div className="mt-3 space-y-2">
                        {etf.topHoldings.length === 0 ? (
                          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                            보유종목 데이터가 없습니다.
                          </div>
                        ) : (
                          etf.topHoldings.map((holding, index) => (
                            <div
                              key={`${etf.symbol}-${holding.asset}-${index}`}
                              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm"
                            >
                              <div>
                                <div className="font-semibold text-white">
                                  {holding.asset || holding.name || "-"}
                                </div>
                                <div className="text-xs text-slate-400">{holding.name || ""}</div>
                              </div>
                              <div className="font-medium text-cyan-300">
                                {formatPercent(holding.weightPercentage)}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white">최근 배당 일정</h3>
                      <div className="mt-3 space-y-2">
                        {etf.dividendEvents.length === 0 ? (
                          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                            최근 배당 일정이 없습니다.
                          </div>
                        ) : (
                          etf.dividendEvents.map((event, index) => (
                            <div
                              key={`${etf.symbol}-dividend-${index}`}
                              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold text-white">
                                  Ex-Date {formatDate(event.date)}
                                </span>
                                <span className="text-cyan-300">{event.frequency || "-"}</span>
                              </div>
                              <div className="mt-2 text-slate-400">
                                지급일 {formatDate(event.paymentDate)} · 배당금{" "}
                                {event.dividend ? `$${event.dividend.toFixed(3)}` : "-"}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}