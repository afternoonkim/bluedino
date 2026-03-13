import Link from "next/link";

export default function RetirementIncomeStrategyPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/info/strategy" className="text-sm font-semibold text-blue-600 hover:underline">
          ← 투자전략으로 돌아가기
        </Link>
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            은퇴 · 인출 전략
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">은퇴 현금흐름 전략</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            은퇴 전략은 자산 규모만 보는 것이 아니라, 그 자산이 실제로 얼마나 안정적인 생활비를
            만들어줄 수 있는지까지 생각해야 합니다. 그래서 은퇴 전에는 적립 전략이 중요하고,
            은퇴 후에는 인출 순서와 현금흐름 구조가 핵심이 됩니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">은퇴 전 전략</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>목표 생활비를 먼저 정하고 필요한 자산 규모를 역산합니다.</li>
              <li>절세계좌와 일반계좌의 역할을 구분해 적립합니다.</li>
              <li>성장 자산과 방어 자산의 비중을 나이와 상황에 따라 조정합니다.</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">은퇴 후 전략</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>한 번에 자산을 줄이기보다 인출 구조를 나누어 설계합니다.</li>
              <li>생활비, 예비비, 성장자산을 분리해 관리합니다.</li>
              <li>하락장에서도 무리한 매도를 피할 수 있도록 현금 여유를 둡니다.</li>
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">핵심 질문</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            은퇴 전략을 세울 때는 “몇 억이 필요하냐”보다 “매달 얼마가 필요한가”,
            “그 돈을 어디서 꺼낼 것인가”, “하락장에도 유지 가능한가”를 먼저 생각하는 것이 현실적입니다.
          </p>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/cal/fire" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">관련 계산기</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">FIRE 계산기</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">목표 자산과 은퇴 시점을 숫자로 가늠해볼 수 있습니다.</p>
          </Link>
          <Link href="/info/strategy/dividend" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200">
            <p className="text-sm font-semibold text-blue-700">연결 전략</p>
            <h3 className="mt-3 text-lg font-bold text-slate-900">배당 투자 전략</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">은퇴 현금흐름을 구성할 때 배당 전략과 연결되는 부분이 많습니다.</p>
          </Link>
        </section>
      </div>
    </main>
  );
}
