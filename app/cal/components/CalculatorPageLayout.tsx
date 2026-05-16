import Link from "next/link";
import type { ReactNode } from "react";
import CalculatorReferenceBox, { type OfficialSource } from "./CalculatorReferenceBox";


function buildDefaultInterpretation(title: string) {
  if (title.includes("청년도약계좌")) {
    return ["정부기여금은 소득 구간과 납입액에 따라 달라지므로 월 납입액을 40만 원, 50만 원, 70만 원으로 나눠 비교해 보세요.", "은행 금리와 정부기여금 이자 반영 여부에 따라 만기 금액이 달라질 수 있습니다.", "신규 가입용 판단이 아니라 기존 가입자의 만기 예상액을 확인하는 용도로 활용하세요."];
  }
  if (title.includes("연봉 실수령")) {
    return ["월 실수령액은 4대보험과 근로소득세를 뺀 예상 금액입니다.", "비과세 식대, 부양가족, 자녀 수, 회사 급여 규정에 따라 실제 급여명세서와 차이가 날 수 있습니다.", "연봉 협상이나 이직 비교에서는 월 실수령액과 연간 저축 가능액을 함께 확인하세요."];
  }
  if (title.includes("주택") || title.includes("DSR") || title.includes("LTV") || title.includes("주담대")) {
    return ["대출 가능 금액만 보지 말고 취득세, 중개보수, 이사비, 비상금까지 함께 남는지 확인하세요.", "DSR·LTV 규제와 금융회사 심사 기준은 실제 한도에 큰 영향을 줍니다.", "금리가 0.5~1%p 오를 때 월 상환액이 감당 가능한지도 함께 비교하세요."];
  }
  if (title.includes("예금") || title.includes("적금") || title.includes("파킹")) {
    return ["세전 이자와 세후 이자를 구분해서 확인하세요.", "우대금리 조건을 실제로 충족할 수 있는지 확인해야 최종 수령액이 비슷해집니다.", "예금자보호 한도와 중도해지 이율도 함께 확인하는 것이 좋습니다."];
  }
  if (title.includes("배당")) {
    return ["배당금은 배당수익률, 주가, 환율, 세금이 함께 움직이므로 세후 현금흐름 기준으로 보세요.", "배당 재투자 결과는 장기 가정이므로 실제 배당 삭감이나 주가 변동 가능성을 함께 고려해야 합니다.", "월 현금흐름 목표가 있다면 필요한 투자 원금도 함께 비교해 보세요."];
  }
  if (title.includes("FIRE") || title.includes("은퇴")) {
    return ["은퇴 가능 시점은 수익률보다 저축률과 생활비 가정에 더 민감하게 달라질 수 있습니다.", "물가상승률을 반영하면 필요한 목표 자산이 커질 수 있습니다.", "비상금, 건강보험료, 주거비처럼 은퇴 후에도 남는 고정비를 따로 점검하세요."];
  }
  return ["입력값을 바꾸면 결과가 얼마나 달라지는지 비교해 보세요.", "계산 결과는 실제 적용 전 확인해야 할 대략적인 기준점으로 활용하는 것이 좋습니다.", "세금, 금리, 금융회사 조건이 달라지면 최종 금액도 달라질 수 있습니다."];
}

function buildDefaultMistakes(title: string) {
  if (title.includes("청년도약계좌")) {
    return ["월 납입액 전체에 같은 정부기여금 매칭률을 곱하면 과대 계산될 수 있습니다.", "가입 당시 소득 기준과 현재 소득 기준을 혼동하면 실제 기여금과 차이가 날 수 있습니다.", "은행 우대금리 조건을 모두 충족한다고 가정하면 만기액이 높게 보일 수 있습니다."];
  }
  if (title.includes("연봉 실수령")) {
    return ["연봉을 12개월로 단순 나눈 금액을 실수령액으로 생각하면 차이가 큽니다.", "비과세 항목과 부양가족 수를 반영하지 않으면 급여명세서와 달라질 수 있습니다.", "성과급, 상여금, 회사별 공제 항목은 별도로 확인해야 합니다."];
  }
  if (title.includes("주택") || title.includes("DSR") || title.includes("LTV") || title.includes("주담대")) {
    return ["대출 한도만 보고 계약금을 결정하면 부대비용과 비상금이 부족할 수 있습니다.", "기존 대출 원리금을 빼지 않으면 DSR 부담을 낮게 볼 수 있습니다.", "중도상환수수료와 금리 변동 가능성을 빼고 갈아타기 손익을 판단하면 오차가 커집니다."];
  }
  if (title.includes("예금") || title.includes("적금") || title.includes("파킹")) {
    return ["연 금리를 월 금리처럼 적용하면 이자가 과대 계산됩니다.", "세전 이자만 보고 상품을 비교하면 실제 수령액이 달라질 수 있습니다.", "우대금리 한도와 한도 초과 금리를 구분하지 않으면 파킹통장 수익이 다르게 보입니다."];
  }
  if (title.includes("배당")) {
    return ["배당수익률이 높다고 배당금이 안정적이라고 단정하면 안 됩니다.", "세금과 환율을 빼지 않으면 실제 현금흐름이 과대 계산됩니다.", "과거 배당 성장률을 그대로 미래에 적용하면 결과가 지나치게 낙관적일 수 있습니다."];
  }
  return ["세전 금액과 세후 금액을 같은 기준으로 비교하지 않는 경우가 많습니다.", "제도성 계산기는 가입 시점, 소득 구간, 상품 약관에 따라 결과가 달라질 수 있습니다.", "월 납입액만 보고 기간, 세금, 수수료, 비상금 조건을 함께 보지 않으면 실제 계획과 차이가 생길 수 있습니다."];
}

export type CalcLayoutProps = {
  /** SEO H1 + 페이지 제목 */
  title: string;
  /** 페이지 hero 도입 문장 (1~2 문장) */
  hero: string;
  /** 계산기 본체(입력 + 결과 UI) — Client Component를 그대로 전달 */
  calcChildren: ReactNode;
  /** 이 계산기를 써야 하는 상황 (3~4개 bullet) */
  whenToUse: string[];
  /** 계산 공식 또는 계산 기준 */
  formula: {
    title: string;
    body: string[];
  };
  /** 실전 예시 2개 */
  examples: { title: string; body: string }[];
  /** 자주 묻는 질문 4개 */
  faqs: { question: string; answer: string }[];
  /** 함께 보면 좋은 계산기 3개 */
  relatedCalculators: { label: string; href: string }[];
  /** 주의사항 — 1회만 표시 */
  caution: string;
  accuracyLevel?: "공식 산식 기반" | "제도 기준 반영" | "참고 시뮬레이션";
  officialSources?: OfficialSource[];
  resultInterpretation?: string[];
  commonMistakes?: string[];
  basisLabel?: string;
};

/**
 * 모든 신규 계산기 페이지에 동일하게 적용되는 사용자 친화형 금융 계산기 레이아웃.
 * 입력 → 결과 → 사용 상황 → 계산 공식 → 실전 예시 → FAQ → 관련 계산기 → 주의사항(1회) 순서.
 * 반복 문구를 1회만 노출해 가독성과 신뢰도를 함께 챙긴다.
 */
export default function CalculatorPageLayout({
  title,
  hero,
  calcChildren,
  whenToUse,
  formula,
  examples,
  faqs,
  relatedCalculators,
  caution,
  accuracyLevel,
  officialSources,
  basisLabel,
  resultInterpretation,
  commonMistakes,
}: CalcLayoutProps) {
  const resolvedAccuracy = accuracyLevel ?? (title.includes("예금 이자") || title.includes("복리") ? "공식 산식 기반" : title.includes("청년도약계좌") || title.includes("연봉 실수령") || title.includes("주택 구매") ? "제도 기준 반영" : "참고 시뮬레이션");
  const resolvedOfficialSources = officialSources ?? ["계산기별 입력값과 공개 안내 기준", "금융회사별 상품 설명서 또는 약관"];
  const resolvedBasisLabel = basisLabel ?? (title.includes("예금 이자") || title.includes("적금 이자") || title.includes("복리") ? "기준: 단순 수식과 입력값 기준" : "기준: 2026년 5월 현재 공개 자료 기준");

  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">금융 계산기</span>
          <h1 className="bd-title-lg mt-4">{title}</h1>
          <p className="bd-text-main mt-4">{hero}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">정확도: {resolvedAccuracy}</span>
            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">{resolvedBasisLabel}</span>
          </div>
        </section>

        {/* 1. 계산기 입력 + 결과 (클라이언트 컴포넌트) */}
        {calcChildren}

        {/* 2. 사용 상황 */}
        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이 계산기를 써야 하는 상황</h2>
          <div className="bd-list mt-5">
            {whenToUse.map((item) => (
              <div key={item} className="bd-list-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 3. 계산 공식 */}
        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">{formula.title}</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {formula.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 3-1. 결과 해석법 */}
        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">결과 해석법</h2>
          <div className="bd-list mt-5">
            {(resultInterpretation ?? buildDefaultInterpretation(title)).map((item) => (
              <div key={item} className="bd-list-item">{item}</div>
            ))}
          </div>
        </section>

        {/* 3-2. 자주 틀리는 부분 */}
        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자주 틀리는 부분</h2>
          <div className="bd-list mt-5">
            {(commonMistakes ?? buildDefaultMistakes(title)).map((item) => (
              <div key={item} className="bd-list-item">{item}</div>
            ))}
          </div>
        </section>

        {/* 4. 실전 예시 */}
        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">실전 예시</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {examples.map((ex) => (
              <article
                key={ex.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <h3 className="text-base font-semibold text-white">{ex.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{ex.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 5. 자주 묻는 질문 */}
        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자주 묻는 질문</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5"
              >
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="bd-text-main mt-3">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 6. 함께 보면 좋은 계산기 */}
        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 계산기</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedCalculators.map((r) => (
              <Link key={r.href} href={r.href} className="bd-button-secondary">
                {r.label}
              </Link>
            ))}
          </div>
        </section>

        {/* 7. 공식 참고 기준 */}
        <CalculatorReferenceBox sources={resolvedOfficialSources} />

        {/* 8. 주의사항 (1회만) */}
        <section className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-200">
            주의사항
          </div>
          <p className="mt-2 text-sm leading-7 text-amber-50/90">{caution}</p>
          <p className="mt-2 text-sm leading-7 text-amber-50/90">실제 적용 조건은 금융사, 세법, 정부 정책 변경에 따라 달라질 수 있습니다.</p>
        </section>
      </div>
    </div>
  );
}
