import ExpandableCard from "@/components/common/ExpandableCard";

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

      <div className={`${heading || intro ? "mt-8" : ""} space-y-4`}>
        {sections.map((section, index) => (
          <ExpandableCard
            key={section.title}
            title={section.title}
            summary={index === 0 ? undefined : "보강 설명은 필요한 경우에만 펼쳐서 확인하세요."}
            defaultOpen={index === 0}
            variant={index % 2 === 0 ? "solid" : "soft"}
          >
            <p className="text-sm leading-7 text-slate-300">
              {section.body}
            </p>
          </ExpandableCard>
        ))}
      </div>

      <ExpandableCard
        title="계산 전 마지막 확인"
        summary="실제 적용 조건이 달라질 수 있는 부분을 접어두었습니다."
        className="mt-8"
        variant="soft"
      >
        <p className="text-sm leading-7 text-slate-300">
          계산 결과는 입력값을 바탕으로 한 참고값입니다. 금리, 세율, 상품 조건, 개인의 소득·대출 상태에 따라 실제 결과가 달라질 수 있으니 실행 전에는 금융회사 안내와 공공기관의 최신 기준을 확인하세요.
        </p>
      </ExpandableCard>
    </section>
  );
}