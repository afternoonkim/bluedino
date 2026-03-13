import type { Metadata } from "next";
import AdBlock from "@/components/ad/AdBlock";
import PageContextHero from "@/components/common/PageContextHero";

export const metadata: Metadata = {
  title: "계산기",
  description: "배당, 복리, FIRE, 양도세, 퇴직소득세, 연봉 실수령액 계산기",
};

export default function CalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <section className="bd-card-soft p-5">
        <div className="text-lg font-bold">계산기</div>
        <div className="mt-1 text-sm text-slate-400">
          단순화 모델입니다. 실제 세액·수익률·실수령액은 개인 조건과 제도 변경에 따라 달라질 수 있습니다.
        </div>
      </section>

      <PageContextHero />
      <AdBlock label="계산기 상단 광고 영역" format="horizontal" />

      {children}

      <AdBlock label="계산기 하단 광고 영역" format="rectangle" />
    </div>
  );
}
