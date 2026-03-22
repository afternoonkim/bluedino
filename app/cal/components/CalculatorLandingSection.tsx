import Link from "next/link";
import type { CalculatorLandingData } from "./calculatorLandingData";

type Props = {
  data: CalculatorLandingData;
};

export default function CalculatorLandingSection({ data }: Props) {
  return (
    <section className="bd-card bd-card-padding text-slate-100">
      <div className="max-w-4xl">
        <span className="bd-badge">검색 유입 가이드</span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
          {data.searchIntentTitle}
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
          {data.intro}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <h3 className="text-base font-semibold text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <h3 className="text-base font-semibold text-cyan-100">
          {data.title} 핵심 요약
        </h3>
        <p className="mt-3 text-sm leading-7 text-cyan-50/90">{data.description}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr,0.95fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
          <h3 className="text-lg font-semibold text-white">자주 묻는 질문</h3>
          <div className="mt-4 space-y-3">
            {data.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
              >
                <h4 className="text-sm font-semibold text-white md:text-base">
                  {faq.question}
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
          <h3 className="text-lg font-semibold text-white">함께 보면 좋은 페이지</h3>
          <div className="mt-4 space-y-3">
            {data.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-cyan-400/50 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{link.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {link.description}
                    </p>
                  </div>
                  {link.tag ? (
                    <span className="shrink-0 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200">
                      {link.tag}
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
