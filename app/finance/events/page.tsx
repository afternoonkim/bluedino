import type { Metadata } from "next";
import ReferralCodeList from "@/components/finance/ReferralCodeList";

export const metadata: Metadata = {
  title: "앱테크 추천인 코드 모음 | 코드 복사·가입 방법 | BlueDino",
  description: "빗썸, 케이뱅크 알파카드, 카카오페이증권 친구 초대 코드와 입력 방법, 바로가기 링크를 한 화면에서 확인하세요.",
  alternates: { canonical: "/finance/events" },
};

export default function BenefitsPage() {
  return (
    <main className="bd-page">
      <div className="bd-container mx-auto max-w-3xl space-y-4 pb-8">
        <header className="space-y-1 py-3 md:py-6">
          <h1 className="text-[22px] font-bold tracking-tight text-white md:text-3xl">앱테크 추천인 코드</h1>
          <p className="text-[13px] leading-6 text-slate-300">코드를 복사하고, 가입할 때 입력 방법을 확인하세요.</p>
        </header>
        <ReferralCodeList />
      </div>
    </main>
  );
}
