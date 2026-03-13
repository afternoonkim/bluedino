import Link from "next/link";

export default function AssetAllocationStrategyPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            분산투자 · 비중관리
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">자산배분 전략</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            자산배분은 어떤 종목을 살지보다 먼저, 어떤 자산군에 얼마를 넣을지 결정하는
            전략입니다. 같은 수익률이라도 변동성이 낮으면 장기 보유가 쉬워지고, 하락장에서도
            원칙을 지키기 쉬워집니다. 그래서 자산배분은 수익률보다 지속 가능성을 높이는 전략으로
            이해하는 것이 좋습니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">주식</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">성장성과 자본차익을 담당하는 자산입니다. 변동성은 크지만 장기 기대수익의 핵심입니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">현금 · 단기자산</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">생활비와 비상금, 추가 매수 여력을 위한 버퍼 역할을 합니다.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">방어자산</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">채권, 배당 중심 자산, 일부 대체자산이 변동성 완화 역할을 할 수 있습니다.</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">자산배분을 정할 때 보는 질문</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>지금 투자 목적이 자산 성장인지 현금흐름 확보인지</li>
            <li>하락장에서 어느 정도 손실까지 견딜 수 있는지</li>
            <li>정기적으로 리밸런싱할 수 있는지</li>
            <li>생활비와 비상금을 따로 확보했는지</li>
          </ul>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/info/guide/portfolio-basics" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 가이드</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">포트폴리오 기초</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">자산배분과 포트폴리오의 기본 개념을 먼저 정리해보세요.</p>
          </Link>
          <Link href="/info/strategy/market-downturn" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">연결 전략</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">하락장 대응 전략</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">좋은 자산배분은 하락장에서 더 큰 차이를 만듭니다.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
