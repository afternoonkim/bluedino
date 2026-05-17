import CalculatorReferenceBox, { RelatedCalculatorLinks, type OfficialSource } from "./CalculatorReferenceBox";

type RelatedCalculator = {
  label: string;
  href: string;
  description?: string;
};

type CalculatorMetaSectionsProps = {
  accuracyLevel: "공식 산식 기반" | "제도 기준 반영" | "참고 시뮬레이션";
  basisLabel: string;
  officialSources: OfficialSource[];
  relatedCalculators: RelatedCalculator[];
  caution: string;
};

export default function CalculatorMetaSections({
  accuracyLevel,
  basisLabel,
  officialSources,
  relatedCalculators,
  caution,
}: CalculatorMetaSectionsProps) {
  return (
    <div className="bd-container-narrow bd-section space-y-6">
      <section className="bd-card-soft bd-card-padding">
        <h2 className="bd-title-md">계산 결과를 읽는 기준</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">기준: {accuracyLevel}</span>
          <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">{basisLabel}</span>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-400">{caution}</p>
      </section>
      <CalculatorReferenceBox sources={officialSources} />
      <RelatedCalculatorLinks links={relatedCalculators} />
    </div>
  );
}
