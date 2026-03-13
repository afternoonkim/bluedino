import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "연금 절세 전략",
  description:
    "연금저축, IRP, ISA를 어떤 순서로 활용하면 좋은지 절세 중심으로 정리한 BlueDino 가이드",
};

export default function PensionGuidePage() {
  return (
    <div className="bd-page">
      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">연금 절세 전략</span>

          <h1 className="bd-title-lg mt-4">
            연금저축과 IRP, ISA는 어떻게 활용하면 좋을까
          </h1>

          <p className="bd-text-main mt-4">
            절세 계좌는 단순히 가입만 해두는 것으로 끝나지 않습니다. 어떤 계좌를
            먼저 채우고, 어떤 목적에 맞게 쓰는지에 따라 실제 체감 혜택이
            달라집니다. 연금저축, IRP, ISA는 역할이 다르기 때문에 순서와 목적을
            같이 보는 것이 중요합니다.
          </p>
        </section>

        <AdBlock />

        <section className="bd-grid-3">
          <div className="bd-card bd-card-padding">
            <h2 className="text-xl font-bold text-white">연금저축</h2>
            <p className="bd-text-main mt-3">
              세액공제와 장기 투자라는 점에서 핵심 역할을 하는 계좌입니다.
              장기적인 노후 준비와 절세를 동시에 노릴 수 있습니다.
            </p>
          </div>

          <div className="bd-card bd-card-padding">
            <h2 className="text-xl font-bold text-white">IRP</h2>
            <p className="bd-text-main mt-3">
              연금저축과 함께 세액공제 한도를 넓히는 데 유용합니다. 다만 일부
              운용 제약과 중도 인출 제한 등도 함께 이해해야 합니다.
            </p>
          </div>

          <div className="bd-card bd-card-padding">
            <h2 className="text-xl font-bold text-white">ISA</h2>
            <p className="bd-text-main mt-3">
              비과세 또는 분리과세 혜택을 활용할 수 있는 계좌입니다. 연금계좌와는
              성격이 다르지만 장기 투자에서 매우 중요한 절세 도구가 될 수
              있습니다.
            </p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">일반적으로 많이 쓰는 절세 우선순위</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <div className="text-sm font-semibold text-cyan-200">1단계</div>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                연금저축과 IRP를 먼저 활용해 세액공제 혜택을 최대한 확보합니다.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
              <div className="text-sm font-semibold text-violet-200">2단계</div>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                ISA를 활용해 비과세 또는 낮은 세율 혜택을 챙기며 중장기 투자를
                이어갑니다.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <div className="text-sm font-semibold text-slate-300">3단계</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                이후 남는 자금은 일반계좌에서 유동성과 투자 목적에 맞게 운영합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">절세 계좌를 볼 때 주의할 점</h2>

          <div className="bd-list mt-4">
            <div className="bd-list-item">
              세액공제 혜택만 보고 무리하게 납입하지 않는지
            </div>
            <div className="bd-list-item">
              중도 인출 제한이나 수령 시 세금 구조를 이해하고 있는지
            </div>
            <div className="bd-list-item">
              계좌별 투자 가능 상품과 제약을 알고 있는지
            </div>
            <div className="bd-list-item">
              노후 자금인지, 중기 자금인지 목적이 분리되어 있는지
            </div>
            <div className="bd-list-item">
              단기 수익보다 장기 복리와 절세 효과를 중심으로 보는지
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
            <p className="text-sm leading-7 text-amber-100">
              절세 계좌는 수익률을 갑자기 높여주는 마법 도구가 아니라,
              <span className="font-semibold">
                {" "}
                같은 수익률에서도 더 많이 남게 만드는 구조
              </span>
              라고 보는 것이 맞습니다.
            </p>
          </div>
        </section>

        <AdBlock />

        <section className="flex flex-wrap gap-3">
          <Link href="/info/investment/account-tax" className="bd-button-primary">
            계좌별 세금정보 보기
          </Link>
          <Link
            href="/info/investment/account-tax-step"
            className="bd-button-secondary"
          >
            절세계좌 활용순서 보기
          </Link>
          <Link href="/info/guide" className="bd-button-secondary">
            투자 가이드 목록
          </Link>
        </section>
      </article>
    </div>
  );
}