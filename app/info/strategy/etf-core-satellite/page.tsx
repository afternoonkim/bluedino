import Link from "next/link";

export default function EtfCoreSatellitePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            ETF · 코어-새틀라이트
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">ETF 코어-새틀라이트 전략</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            코어-새틀라이트 전략은 전체 자산의 중심이 되는 안정적인 ETF를 코어로 두고,
            일부 비중만 테마나 고성장 자산에 배분하는 방식입니다. 이렇게 하면 방향성은
            유지하면서도 포트폴리오 전체의 흔들림을 줄일 수 있습니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">코어 자산의 역할</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              코어는 장기적으로 꾸준히 들고 갈 중심 자산입니다. 보통 지수 ETF나 광범위한 시장 ETF가 적합합니다.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">새틀라이트 자산의 역할</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              새틀라이트는 성장 테마, 특정 산업, 개별 종목처럼 변동성이 높은 자산입니다. 비중을 제한하는 것이 핵심입니다.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">운용 원칙</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>코어 비중을 먼저 정하고 남는 비중에서 새틀라이트를 운용합니다.</li>
            <li>새틀라이트가 커지면 이익 실현이나 리밸런싱으로 원래 비중으로 되돌립니다.</li>
            <li>핵심 ETF는 자주 갈아타지 않고, 새틀라이트만 유연하게 조정합니다.</li>
          </ul>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/info/guide/etf-basics" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 가이드</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">ETF 투자 기초</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">ETF의 기본 구조를 먼저 이해하면 코어 자산 선정이 쉬워집니다.</p>
          </Link>
          <Link href="/info/guide/etf-vs-stocks" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 비교</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">ETF와 개별주식 차이</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">코어와 새틀라이트를 구분할 때 도움이 되는 비교 주제입니다.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
