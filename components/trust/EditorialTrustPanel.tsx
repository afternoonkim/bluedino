import Link from "next/link";

type EditorialTrustPanelProps = {
  title?: string;
  description?: string;
  compact?: boolean;
};

const principles = [
  {
    title: "계산 결과는 판단의 출발점으로 활용하세요",
    body: "숫자만 보기보다 그 결과가 내 상황에서 어떤 의미인지 관련 설명과 함께 확인하는 것이 좋습니다.",
  },
  {
    title: "필요한 정보부터 먼저 확인할 수 있습니다",
    body: "계산기와 핵심 안내를 먼저 보고, 더 자세한 내용은 관련 가이드에서 이어서 확인할 수 있습니다.",
  },
  {
    title: "특정 상품을 정답처럼 제시하지 않습니다",
    body: "BlueDino는 특정 종목, 계좌, 대출 상품의 가입·매수·매도를 직접 권유하지 않고 비교와 이해를 돕는 참고 정보를 제공합니다.",
  },
  {
    title: "세금과 제도는 최신 내용을 다시 확인하세요",
    body: "세금, 금리, 지원제도는 바뀔 수 있으므로 실제 실행 전에는 공식 기관과 금융회사의 최신 안내를 함께 확인하세요.",
  },
];

export default function EditorialTrustPanel({
  title = "BlueDino를 이용할 때 알아두면 좋은 점",
  description = "계산 결과와 금융 정보를 활용할 때 함께 확인하면 좋은 기준을 정리했습니다.",
  compact = false,
}: EditorialTrustPanelProps) {
  return (
    <section className="bd-card-soft bd-card-padding">
      <div className="max-w-4xl">
        <span className="bd-badge">이용 참고</span>
        <h2 className="bd-title-md mt-4">{title}</h2>
        <p className="bd-text-sub mt-3">{description}</p>
      </div>

      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
        {principles.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/info/etc/about" className="bd-button-primary">
          BlueDino 소개
        </Link>
        <Link href="/info/etc/editorial-policy" className="bd-button-secondary">
          정보 제공 원칙
        </Link>
        <Link href="/info/etc/methodology" className="bd-button-secondary">
          정보 활용 안내
        </Link>
      </div>
    </section>
  );
}
