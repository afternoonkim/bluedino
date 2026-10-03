import type { Metadata } from "next";
import TaggedList, { type TaggedListItem } from "@/components/explore/TaggedList";
import { financeCategories } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";

export const metadata: Metadata = {
  title: "금융 질문 가이드 | ISA·IRP·연금저축·CMA·대출 | BlueDino",
  description: "ISA, IRP, 연금저축, CMA, 파킹통장, 신용대출, 주담대에서 자주 묻는 질문을 빠르게 찾아보세요.",
  alternates: { canonical: "/finance" },
};

function groupFor(key: string) { if (["isa", "irp", "pension"].includes(key)) return "절세계좌"; if (["cma", "parking"].includes(key)) return "현금관리"; if (["loan-basics", "credit-loan", "mortgage-loan"].includes(key)) return "대출"; return "금융"; }

export default function FinancePage() {
  const items: TaggedListItem[] = financeCategories.map((category) => ({
    title: `${category.shortTitle} 질문 가이드`, href: category.basePath, description: category.description,
    badge: groupFor(category.key), meta: `질문 ${getQuestionsByCategory(category.key).length}개`, tags: [groupFor(category.key), category.shortTitle, category.badge], cta: "질문 보기",
  }));
  return (
    <main className="bd-page">
      <div className="bd-container space-y-10 md:space-y-14">
        <header className="max-w-3xl py-4 md:py-8"><span className="bd-badge">금융가이드</span><h1 className="bd-title-xl mt-4">궁금한 금융 질문부터 찾으세요</h1><p className="bd-text-main mt-4">ISA·IRP·CMA·파킹통장·대출처럼 조건이 복잡한 주제를 질문별로 확인할 수 있습니다. 내 상황과 가까운 항목부터 골라보세요.</p></header>
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"><div className="text-sm font-bold text-white">절세계좌</div><p className="mt-1 text-sm text-slate-400">ISA · IRP · 연금저축</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"><div className="text-sm font-bold text-white">현금관리</div><p className="mt-1 text-sm text-slate-400">CMA · 파킹통장</p></div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4"><div className="text-sm font-bold text-white">대출</div><p className="mt-1 text-sm text-slate-400">대출기초 · 신용 · 주담대</p></div>
        </section>
        <TaggedList title="금융 질문 찾기" description="분류를 선택하거나 검색어를 입력해 궁금한 내용을 찾아보세요." items={items} filterTags={["절세계좌", "현금관리", "대출"]} searchPlaceholder="예: ISA, IRP, CMA, 파킹통장, 신용대출, 주담대" countLabel="카테고리" />
      </div>
    </main>
  );
}
