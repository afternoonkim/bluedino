type SeoSection = {
  title: string;
  body: string;
};

type CalculatorSeoContentProps = {
  heading: string;
  intro: string;
  sections: SeoSection[];
};

export default function CalculatorSeoContent({ heading, intro, sections }: CalculatorSeoContentProps) {
  return (
    <section className="bd-card bd-card-padding text-slate-100">
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-white md:text-2xl">{heading}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">{intro}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <h3 className="text-base font-semibold text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
