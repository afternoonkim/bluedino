type CalculatorHeroProps = {
  badge: string;
  title: string;
  description: string;
  tip: string;
};

export default function CalculatorHero({ badge, title, description, tip }: CalculatorHeroProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-slate-100 shadow-xl md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="bd-badge">{badge}</span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            {description}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200 lg:max-w-md">
          {tip}
        </div>
      </div>
    </section>
  );
}
