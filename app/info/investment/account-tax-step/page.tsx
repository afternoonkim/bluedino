"use client";

export default function AccountTaxStepPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-6">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="mt-4 bd-title-lg">절세계좌 활용순서</h1>
          <p className="mt-3 bd-text-sub">연금저축, IRP, ISA를 어떤 순서로 활용하면 절세 효과를 더 체계적으로 챙길 수 있는지 일반적인 우선순위 기준으로 정리했습니다.</p>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
            소득 수준, 나이, 자금 계획에 따라 실제 우선순위는 달라질 수 있으므로 참고용 가이드로 활용해 주세요.
          </div>
        </section>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm leading-6 text-cyan-100">
          📌 본 전략은 일반적인 절세 우선순위 예시이며, 개인의 소득·나이·자산
          상황에 따라 달라질 수 있습니다.
        </div>

        <StepCard
          step={1}
          title="연금저축펀드 (600만원)"
          description="연간 600만원까지 세액공제 적용. 가장 먼저 채우는 절세 핵심 구간."
          benefit="13.2% 또는 16.5% 세액공제 (최대 99만원)"
          sub="연봉 5,500만원 이하 16.5%"
          color="blue"
        />

        <StepCard
          step={2}
          title="IRP (300만원)"
          description="연금저축과 합산하여 900만원 세액공제 한도 완성."
          benefit="13.2% 또는 16.5% (최대 148.5만원)"
          sub="안전자산 30% 의무 비중"
          color="blue"
        />

        <StepCard
          step={3}
          title="ISA 계좌 (1,000만원)"
          description="연 2,000만원 납입, 200~400만원 비과세 혜택."
          benefit="200~400만원 비과세 + 9.9%"
          sub="3년 이상 유지 시 절세"
          color="purple"
        />

        <StepCard
          step={4}
          title="연금계좌 추가 납입"
          description="세액공제 한도 초과 금액은 과세이연 목적."
          benefit="운용 수익에 대한 과세 이연"
          sub="추가 납입은 공제 없음"
          color="green"
        />

        <StepCard
          step={5}
          title="ISA 남은 한도 채우기"
          description="ISA 연 한도 모두 채워 장기 투자 활용."
          benefit="비과세 한도 최대 활용"
          sub="초과 수익 9.9% 분리과세"
          color="green"
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 text-white shadow-xl">
          <h3 className="mb-2 font-bold text-white">⚡ 납입 전략 포인트</h3>
          <p className="text-sm leading-6 text-slate-300">
            연금저축 + IRP로 900만원 세액공제 먼저 확보 → ISA 1,000만원 채우기
            → 이후 여유 자금은 일반계좌 해외주식으로 분산
          </p>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
  benefit,
  sub,
  color,
}: {
  step: number;
  title: string;
  description: string;
  benefit: string;
  sub: string;
  color: "blue" | "purple" | "green";
}) {
  const colorMap = {
    blue: {
      border: "border-cyan-500/30",
      badge: "bg-cyan-500 text-slate-950",
      box: "border-cyan-500/20 bg-cyan-500/10 text-cyan-100",
    },
    purple: {
      border: "border-violet-500/30",
      badge: "bg-violet-500 text-white",
      box: "border-violet-500/20 bg-violet-500/10 text-violet-100",
    },
    green: {
      border: "border-emerald-500/30",
      badge: "bg-emerald-500 text-slate-950",
      box: "border-emerald-500/20 bg-emerald-500/10 text-emerald-100",
    },
  };

  const current = colorMap[color];

  return (
    <div
      className={`rounded-3xl border bg-slate-900/95 p-6 shadow-xl text-slate-100 ${current.border}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${current.badge}`}
          >
            {step}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {step}단계: {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
          </div>
        </div>

        <div className={`min-w-[240px] rounded-2xl border p-4 ${current.box}`}>
          <p className="font-semibold">{benefit}</p>
          <p className="mt-1 text-xs opacity-80">{sub}</p>
        </div>
      </div>
    </div>
  );
}