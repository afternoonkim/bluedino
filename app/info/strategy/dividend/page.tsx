import Link from "next/link";

export default function DividendStrategyPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            배당 · 현금흐름 전략
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            배당 투자 전략
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            배당 투자는 단순히 높은 배당률을 찾는 것이 아니라, 기업이 오랫동안 배당을
            유지하고 성장시킬 수 있는지까지 함께 보는 전략입니다. 눈앞의 배당 수익률만
            보면 매력적으로 보이지만, 실제로는 배당의 지속가능성, 재무 안정성, 업종 특성,
            배당 성장 여력을 함께 봐야 장기적으로 유리합니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">핵심 기준 4가지</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>배당률보다 먼저 배당성향과 이익 안정성을 확인합니다.</li>
              <li>배당을 꾸준히 늘려온 기업인지 배당 성장 이력을 봅니다.</li>
              <li>경기 민감 업종인지 방어적 업종인지 성격을 구분합니다.</li>
              <li>배당금 재투자를 할지 현금흐름으로 쓸지 목적을 먼저 정합니다.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">흔한 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>배당률이 높다는 이유만으로 기업의 질을 확인하지 않고 매수합니다.</li>
              <li>배당락 이후 가격 변동을 고려하지 않고 월 배당만 기대합니다.</li>
              <li>세후 배당 수익률을 계산하지 않아 실제 체감수익이 낮아집니다.</li>
              <li>배당과 성장의 균형 없이 특정 섹터에 과도하게 몰립니다.</li>
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">BlueDino식 배당 투자 접근</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-blue-700">1단계</p>
              <h3 className="mt-2 font-bold text-slate-900">목적 설정</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                현금흐름 확보인지, 장기 재투자인지 먼저 정해야 전략이 흔들리지 않습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-blue-700">2단계</p>
              <h3 className="mt-2 font-bold text-slate-900">기업 선별</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                배당 이력, 현금흐름, 부채 수준, 업종 특성을 함께 점검합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-blue-700">3단계</p>
              <h3 className="mt-2 font-bold text-slate-900">세후 기준 점검</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                계좌 선택과 세금 구조를 반영해 실질 수익률 기준으로 판단합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/cal/calculator" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 계산기</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">배당 계산기</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">배당금 재투자 효과와 장기 복리 흐름을 직접 확인해보세요.</p>
          </Link>
          <Link href="/info/investment/account-tax" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 정보</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">계좌별 세금정보</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">배당은 세금 구조에 따라 체감 수익률이 달라질 수 있습니다.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
