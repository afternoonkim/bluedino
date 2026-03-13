"use client";

import { usePathname } from "next/navigation";

const calculatorMap: Record<string, { title: string; description: string }> = {
  "/cal/calculator": {
    title: "배당 계산기",
    description:
      "보유 수량, 배당률, 추가 매수, 세금 조건을 반영해 예상 배당금과 장기 현금흐름을 확인할 수 있습니다.",
  },
  "/cal/compound": {
    title: "복리 계산기",
    description:
      "초기 자산과 월 투자금, 수익률, 기간을 기준으로 복리 성장과 목표 달성 시점을 간단히 살펴볼 수 있습니다.",
  },
  "/cal/fire": {
    title: "FIRE 계산기",
    description:
      "현재 자산과 저축액, 수익률, 은퇴 시점을 바탕으로 경제적 자유 목표까지의 경로를 추정합니다.",
  },
  "/cal/capital-gains": {
    title: "해외주식 양도세 계산기",
    description:
      "매수·매도 금액, 수수료, 환율, 기본공제를 반영해 해외주식 양도차익과 예상 세금을 계산합니다.",
  },
  "/cal/retirement-tax": {
    title: "퇴직소득세 계산기",
    description:
      "퇴직급여와 근속연수를 입력해 퇴직소득세와 지방세를 포함한 예상 세부담을 빠르게 확인할 수 있습니다.",
  },
  "/cal/salary-net": {
    title: "연봉 실수령액 계산기",
    description:
      "세전 연봉, 상여, 부양가족 수, 비과세 항목을 반영해 월·연 실수령액 추정치를 확인할 수 있습니다.",
  },
};

export default function PageContextHero() {
  const pathname = usePathname();
  const content = calculatorMap[pathname];

  if (!content) return null;

  return (
    <section className="bd-card bd-card-padding">
      <div className="space-y-3">
        <span className="bd-badge">계산기</span>
        <div>
          <h1 className="bd-title-lg">{content.title}</h1>
          <p className="mt-3 max-w-4xl bd-text-sub">{content.description}</p>
        </div>
      </div>
    </section>
  );
}
