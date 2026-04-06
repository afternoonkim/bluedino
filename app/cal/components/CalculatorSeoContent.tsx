type SeoSection = {
  title: string;
  body: string;
};

type CalculatorSeoContentProps = {
  heading?: string;
  intro?: string;
  sections: SeoSection[];
};

export default function CalculatorSeoContent({
  heading,
  intro,
  sections,
}: CalculatorSeoContentProps) {
  return (
    <section className="bd-card bd-card-padding text-slate-100">
      {(heading || intro) && (
        <div className="max-w-4xl">
          {heading ? (
            <h2 className="text-xl font-bold text-white md:text-2xl">
              {heading}
            </h2>
          ) : null}

          {intro ? (
            <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
              {intro}
            </p>
          ) : null}
        </div>
      )}

      <div className={`${heading || intro ? "mt-8" : ""} grid gap-4 md:grid-cols-2`}>
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <h3 className="text-base font-semibold text-white">
              {section.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
        입력한 조건에 따라 결과가 달라지는 참고 계산이므로, 실제 적용 전에는 금융회사·증권사·공공기관의 최신 기준과 개인 조건을 함께 확인해보세요.
      </div>
    </section>
  );
}