import Link from "next/link";

export default function TaxEfficientInvestingPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            절세 · 세후 수익률
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">절세계좌 활용 투자전략</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            투자전략은 세전 수익률만으로 끝나지 않습니다. 같은 상품이라도 어떤 계좌에 담느냐에 따라
            실제 체감수익은 달라질 수 있습니다. 그래서 절세계좌 전략은 종목 선택과 별개가 아니라,
            전체 투자 시스템을 설계하는 핵심 축에 가깝습니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">ISA</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">중장기 절세 운용 관점에서 활용도가 높고, 세후 수익률 개선에 유리합니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">연금저축</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">노후 준비와 세액공제를 동시에 생각할 때 중요한 축입니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">IRP</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">퇴직금 운용, 추가 세액공제, 은퇴 자금 관리 흐름과 연결됩니다.</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">전략 포인트</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>고배당, 분배금 중심 자산은 세후 기준으로 다시 판단합니다.</li>
            <li>장기 보유 자산은 계좌 특성에 따라 우선순위를 정합니다.</li>
            <li>세제혜택 계좌와 일반계좌의 역할을 혼동하지 않는 것이 중요합니다.</li>
            <li>전략은 수익률이 아니라 세후 실질 수익 기준으로 비교합니다.</li>
          </ul>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/info/investment/account-tax-step" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 정보</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">절세계좌 활용순서</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">절세계좌를 어떤 순서로 채울지 기준을 함께 보세요.</p>
          </Link>
          <Link href="/info/investment/account-tax" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 정보</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">계좌별 세금정보</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">전략 실행 전 계좌별 과세 구조를 먼저 확인하는 것이 좋습니다.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
