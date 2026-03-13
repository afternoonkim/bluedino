import Link from "next/link";

export default function MarketDownturnStrategyPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            하락장 · 멘탈관리
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">하락장 대응 전략</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            하락장에서는 정보보다 감정이 더 빠르게 움직입니다. 그래서 시장이 흔들릴 때는
            새로운 전략을 만드는 것보다, 원래 정해둔 원칙을 지킬 수 있는지 점검하는 것이 더 중요합니다.
            하락장 대응 전략의 핵심은 예측이 아니라 준비입니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">비중 점검</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">하락장에서 견디지 못할 비중이라면 평소 배분이 과했던 것일 수 있습니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">현금 여력</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">추가 매수는 현금 여유가 있을 때 전략이 됩니다. 여유 없는 추가 매수는 부담이 될 수 있습니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">리밸런싱</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">급락장에서 오히려 원칙적 리밸런싱이 장기 성과에 도움이 되는 경우가 있습니다.</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">하락장에서 하지 말아야 할 것</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>공포에 눌려 원래 계획과 무관하게 전량 매도하는 것</li>
            <li>손실을 빨리 만회하려고 더 높은 변동성 자산으로 몰리는 것</li>
            <li>투자 목적과 기간을 다시 점검하지 않고 단기 뉴스만 따라가는 것</li>
          </ul>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/info/strategy/asset-allocation" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">연결 전략</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">자산배분 전략</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">하락장 대응은 결국 좋은 자산배분에서 시작됩니다.</p>
          </Link>
          <Link href="/info/guide/risk-management" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 가이드</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">리스크 관리 기초</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">손실을 줄이기 위한 기본 원칙을 먼저 정리해보세요.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
