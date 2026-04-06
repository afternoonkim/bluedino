import Link from "next/link";

type EditorialTrustPanelProps = {
  title?: string;
  description?: string;
  compact?: boolean;
};

const principles = [
  {
    title: "숫자보다 해석을 먼저 제공합니다",
    body: "계산 결과 자체보다 그 숫자가 실제 의사결정에서 어떤 의미인지 이해할 수 있도록 설명형 문단과 연결 가이드를 함께 제공합니다.",
  },
  {
    title: "광고보다 사용성을 우선합니다",
    body: "필요한 계산과 정보 확인이 먼저 끝나도록, 읽기 흐름을 해치지 않는 선에서 안내와 광고 배치를 조정합니다.",
  },
  {
    title: "특정 상품 가입을 직접 유도하지 않습니다",
    body: "BlueDino는 특정 종목, 계좌, 대출 상품의 가입·매수·매도를 직접 권유하지 않고, 비교와 이해를 돕는 참고 도구에 집중합니다.",
  },
  {
    title: "정책 변경 가능성을 함께 안내합니다",
    body: "세금과 제도는 바뀔 수 있으므로, 공식 기관과 금융회사의 최신 안내를 최종 확인 대상으로 명시하고 있습니다.",
  },
];

export default function EditorialTrustPanel({
  title = "BlueDino를 이용할 때 알아두면 좋은 점",
  description = "이 사이트가 어떤 방식으로 정보를 보여주고, 사용자가 어떤 점을 함께 확인하면 좋은지 한눈에 볼 수 있도록 정리했습니다.",
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
          소개 보기
        </Link>
        <Link href="/info/etc/editorial-policy" className="bd-button-secondary">
          이 사이트는 누구에게 도움이 될까
        </Link>
        <Link href="/info/etc/methodology" className="bd-button-secondary">
          정보 활용 안내
        </Link>
      </div>
    </section>
  );
}
