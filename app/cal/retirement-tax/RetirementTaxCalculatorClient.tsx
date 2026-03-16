"use client";

import { useMemo, useState } from "react";
import { Briefcase, Calculator, Info, Table2 } from "lucide-react";
import CalculatorHero from "../components/CalculatorHero";
import CalculatorSeoContent from "../components/CalculatorSeoContent";

function formatWon(n: number) {
  return Math.round(n).toLocaleString("ko-KR");
}
function formatPct(n: number, digits = 2) {
  return `${n.toFixed(digits)}%`;
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * === 국세청(2016년 이후 퇴직, 개정 규정 방식) 흐름 ===
 * ① 퇴직급여액(=퇴직소득금액: 비과세 제외는 여기선 미반영)
 * ③ 근속연수공제(’23.1.1 개정 후)
 * ④ 환산급여 = (퇴직소득금액 - 근속연수공제) / 근속연수 × 12
 * ⑤ 환산급여공제
 * ⑥ 과세표준 = 환산급여 - 환산급여공제
 * ⑦ 환산산출세액 = (과세표준×세율) - 누진공제
 * ⑧ 산출세액 = 환산산출세액 ÷ 12 × 근속연수
 * + 지방소득세(소득세의 10%) 더해 “지방세 포함”으로 표시
 *
 * (출처: 국세청 퇴직소득 안내)
 */

function tenureDeduction(years: number) {
  const y = Math.floor(Math.max(0, years));
  if (y <= 5) return y * 1_000_000;
  if (y <= 10) return 5_000_000 + (y - 5) * 2_000_000;
  if (y <= 20) return 15_000_000 + (y - 10) * 2_500_000;
  return 40_000_000 + (y - 20) * 3_000_000;
}

function convertedSalary(retirementIncome: number, years: number) {
  const y = Math.max(1, years);
  const base = retirementIncome - tenureDeduction(y);
  return (Math.max(0, base) / y) * 12;
}

function convertedSalaryDeduction(cs: number) {
  if (cs <= 8_000_000) return cs;
  if (cs <= 70_000_000) return 8_000_000 + (cs - 8_000_000) * 0.6;
  if (cs <= 100_000_000) return 45_200_000 + (cs - 70_000_000) * 0.55;
  if (cs <= 300_000_000) return 61_700_000 + (cs - 100_000_000) * 0.45;
  return 151_700_000 + (cs - 300_000_000) * 0.35;
}

function incomeTaxByProgressiveBase(taxBase: number) {
  const b = Math.max(0, taxBase);

  const brackets = [
    { upTo: 14_000_000, rate: 0.06, quick: 0 },
    { upTo: 50_000_000, rate: 0.15, quick: 1_260_000 },
    { upTo: 88_000_000, rate: 0.24, quick: 5_760_000 },
    { upTo: 150_000_000, rate: 0.35, quick: 15_440_000 },
    { upTo: 300_000_000, rate: 0.38, quick: 19_940_000 },
    { upTo: 500_000_000, rate: 0.40, quick: 25_940_000 },
    { upTo: 1_000_000_000, rate: 0.42, quick: 35_940_000 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.45, quick: 65_940_000 },
  ];

  const row = brackets.find((x) => b <= x.upTo)!;
  return b * row.rate - row.quick;
}

function calcRetirementTax(retirementPayWon: number, years: number) {
  const y = clamp(Math.floor(years), 1, 60);
  const retirementIncome = Math.max(0, retirementPayWon);
  const tenDed = tenureDeduction(y);
  const cs = convertedSalary(retirementIncome, y);
  const csDed = convertedSalaryDeduction(cs);
  const taxBase = Math.max(0, cs - csDed);

  const annualizedTax = incomeTaxByProgressiveBase(taxBase);
  const incomeTax = (annualizedTax / 12) * y;
  const localTax = incomeTax * 0.1;
  const totalTax = incomeTax + localTax;

  const effectiveRate =
    retirementIncome > 0 ? (totalTax / retirementIncome) * 100 : 0;

  return {
    y,
    retirementIncome,
    tenDed,
    cs,
    csDed,
    taxBase,
    annualizedTax,
    incomeTax,
    localTax,
    totalTax,
    effectiveRate,
  };
}

function rateColorClass(pct: number) {
  if (pct < 5) return "text-emerald-300";
  if (pct < 10) return "text-green-300";
  if (pct < 15) return "text-amber-300";
  if (pct < 20) return "text-orange-300";
  return "text-rose-300";
}

export default function RetirementTaxCalculatorPage() {
  const [payManwon, setPayManwon] = useState<number>(100000);
  const [years, setYears] = useState<number>(30);

  const payWon = useMemo(() => Math.max(0, payManwon) * 10_000, [payManwon]);

  const result = useMemo(() => calcRetirementTax(payWon, years), [payWon, years]);

  const rowPays = useMemo(
    () => Array.from({ length: 15 }, (_, i) => (i + 1) * 100_000_000),
    []
  );
  const colYears = useMemo(() => [5, 10, 15, 20, 25, 30, 35, 40], []);

  const table = useMemo(() => {
    return rowPays.map((p) => {
      const cells = colYears.map((y) => {
        const r = calcRetirementTax(p, y);
        return { y, pct: r.effectiveRate };
      });
      return { pay: p, cells };
    });
  }, [rowPays, colYears]);

  return (
    <div className="bd-page">
      <div className="bd-container space-y-8">
        <CalculatorHero
          badge="퇴직소득세 계산기"
          title="퇴직금에서 실제 세금이 얼마나 빠지는지 확인하세요"
          description="근속기간과 퇴직급여를 기준으로 퇴직소득세 구조를 이해하고 예상 실수령액을 확인할 수 있습니다."
          tip="정확한 금액은 실제 지급 방식과 세법 적용 기준에 따라 달라질 수 있습니다."
        />
        {/* 헤더 카드 */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-300">
                  <Briefcase size={18} />
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                  {/* 퇴직소득세 간편 계산기{" "} */}
                  <span className="text-slate-400">2025년 기준 퇴직소득세 간편 계산기</span>
                </h1>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                퇴직금(만원)과 근속연수를 입력하면{" "}
                <b>퇴직소득세(지방소득세 포함)</b>을 추정합니다.
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                <Info size={14} />
                단순 모델: 비과세(장해보상금 등), 2012년 이전분 안분/경과규정,
                개인별 특례는 미반영
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <Calculator size={16} className="text-slate-300" />
              <div className="text-sm">
                <div className="font-semibold text-slate-200">입력 단위</div>
                <div className="text-xs text-slate-400">
                  퇴직금: 만원 / 결과: 원
                </div>
              </div>
            </div>
          </div>

          {/* 입력 */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-300">
                퇴직금액 (만원)
              </label>
              <input
                type="number"
                value={payManwon}
                onChange={(e) => setPayManwon(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-lg font-semibold text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="예: 100000 (만원) = 10억 원"
              />
              <div className="mt-2 text-xs text-slate-400">
                입력한 퇴직금: <b>{formatWon(payWon)}원</b>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300">
                근속연수 (년)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-lg font-semibold text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                placeholder="예: 30"
              />
              <div className="mt-2 text-xs text-slate-400">
                * 근속연수는 정수 기준으로 계산합니다.
              </div>
            </div>
          </div>

          {/* 결과 요약 */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="min-w-0 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <div className="text-sm font-semibold text-cyan-200">
                예상 퇴직소득세 (지방세 포함)
              </div>
              <div className="mt-2 min-w-0 break-all text-[clamp(1.25rem,2vw,2rem)] font-extrabold leading-tight text-cyan-300">
                {formatWon(result.totalTax)}원
              </div>
              <div
                className={`mt-1 text-sm font-semibold ${rateColorClass(
                  result.effectiveRate
                )}`}
              >
                실효세율 {formatPct(result.effectiveRate)}
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-sm font-semibold text-slate-300">
                소득세(국세)
              </div>
              <div className="mt-2 min-w-0 break-all text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-tight text-white">
                {formatWon(result.incomeTax)}원
              </div>
              <div className="mt-1 text-xs text-slate-400">
                지방소득세는 보통 소득세의 10%
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="text-sm font-semibold text-slate-300">
                지방소득세
              </div>
              <div className="mt-2 min-w-0 break-all text-[clamp(1rem,1.8vw,1.25rem)] font-bold leading-tight text-white">
                {formatWon(result.localTax)}원
              </div>
              <div className="mt-1 text-xs text-slate-400">(국세 × 10%)</div>
            </div>
          </div>

          {/* 디테일 */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-400">근속연수공제</div>
              <div className="mt-1 min-w-0 break-all text-[clamp(0.95rem,1.4vw,1rem)] font-bold leading-tight text-white">
                {formatWon(result.tenDed)}원
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-400">환산급여</div>
              <div className="mt-1 min-w-0 break-all text-[clamp(0.95rem,1.4vw,1rem)] font-bold leading-tight text-white">
                {formatWon(result.cs)}원
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-400">환산급여공제</div>
              <div className="mt-1 min-w-0 break-all text-[clamp(0.95rem,1.4vw,1rem)] font-bold leading-tight text-white">
                {formatWon(result.csDed)}원
              </div>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs text-slate-400">과세표준(환산)</div>
              <div className="mt-1 min-w-0 break-all text-[clamp(0.95rem,1.4vw,1rem)] font-bold leading-tight text-white">
                {formatWon(result.taxBase)}원
              </div>
            </div>
          </div>
        </div>

        {/* 참고표 */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl text-slate-100">
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
              <Table2 size={18} />
            </div>
            <h2 className="text-lg font-extrabold text-white">
              퇴직소득세율 참고표 (2025년 기준)
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            퇴직금(1억~15억) × 근속연수(5~40년)별{" "}
            <b>실효세율(지방세 포함)</b>을 보여줍니다.
          </p>

          <div className="mt-4 overflow-auto rounded-2xl border border-slate-800">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-slate-950/80">
                <tr>
                  <th className="sticky left-0 z-10 border-b border-slate-800 bg-slate-950/80 px-4 py-3 text-left font-bold text-white">
                    급여 \ 근속
                  </th>
                  {colYears.map((y) => (
                    <th
                      key={y}
                      className="border-b border-slate-800 px-4 py-3 text-center font-bold text-slate-300"
                    >
                      {y}년
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {table.map((row) => (
                  <tr
                    key={row.pay}
                    className="odd:bg-slate-900 even:bg-slate-950/50"
                  >
                    <td className="sticky left-0 z-10 border-b border-slate-800 bg-inherit px-4 py-3 font-bold text-white">
                      {Math.round(row.pay / 100_000_000)}억
                    </td>

                    {row.cells.map((c) => (
                      <td
                        key={`${row.pay}-${c.y}`}
                        className={`border-b border-slate-800 px-4 py-3 text-center font-semibold ${rateColorClass(
                          c.pct
                        )}`}
                      >
                        {formatPct(c.pct)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-xs text-slate-400">
            * 계산 흐름/공제/세율표는 국세청 퇴직소득 안내(2016년 이후 퇴직
            기준) 구조를 따릅니다.{" "}
            <a
              href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7880&mi=6600"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:underline"
            >
              (국세청 안내 보기)
            </a>
          </div>
        </div>

        <CalculatorSeoContent
          sections={[
            {
              title: "퇴직소득세 계산기란?",
              body: "퇴직소득세 계산기는 퇴직급여와 근속연수를 기준으로 예상 세금을 추정하는 도구입니다. 퇴직금에서 실제로 얼마가 세금으로 빠지는지 미리 가늠하는 데 도움이 됩니다.",
            },
            {
              title: "어떻게 계산하나요?",
              body: "퇴직소득금액에서 근속연수공제와 환산급여공제를 반영하고, 환산 과세표준에 누진세율을 적용한 뒤 다시 근속연수 기준으로 환산해 세액을 계산합니다. 지방소득세도 함께 고려합니다.",
            },
            {
              title: "이런 경우에 활용하면 좋습니다",
              body: "퇴직 예정자, 희망퇴직 조건을 비교하는 경우, 퇴직금 수령 방식에 따라 체감 차이를 보고 싶은 경우에 유용합니다.",
            },
            {
              title: "자주 헷갈리는 포인트",
              body: "퇴직소득세는 일반 근로소득세와 계산 방식이 다릅니다. 근속연수에 따른 공제가 크기 때문에 단순 비율로 예상하면 실제와 차이가 날 수 있습니다.",
            },
          ]}
        />
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