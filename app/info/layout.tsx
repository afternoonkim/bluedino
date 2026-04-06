import type { Metadata } from "next";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "투자정보",
  description: "계좌, 세금, 절세, 투자 기초 정보",
};

export default function InvestmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <section className="bd-card-soft p-5">
        <div className="text-lg font-bold">투자정보</div>
        <div className="mt-1 text-sm text-slate-400">
          투자와 절세, 계좌 활용을 이해하기 쉽게 정리한 안내 페이지입니다. 실제 적용 전에는 최신 제도와 개인 조건을 함께 확인해보세요.
        </div>
      </section>

      <AdBlock label="투자정보 상단 광고 영역" format="horizontal" />
      {children}
      <AdBlock label="투자정보 하단 광고 영역" format="rectangle" />
    </div>
  );
}
