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
          투자 판단은 본인 책임이며, 본 페이지는 정보 제공 목적입니다.
        </div>
      </section>

      <AdBlock label="투자정보 상단 광고 영역" format="horizontal" />
      {children}
      <AdBlock label="투자정보 하단 광고 영역" format="rectangle" />
    </div>
  );
}
