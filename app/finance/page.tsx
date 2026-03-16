
import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import { financeCategories } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";

export const metadata: Metadata = {
  title: "금융 질문 가이드 | ISA·IRP·연금저축 | BlueDino",
  description:
    "ISA, IRP, 연금저축 같은 절세계좌를 질문형으로 정리한 BlueDino 금융 가이드. 실제 검색 패턴 중심으로 계좌 선택과 절세 전략을 이해할 수 있습니다.",
  alternates: { canonical: "/finance" },
};

function CategoryCard({ title, description, href, badge, count }: { title: string; description: string; href: string; badge: string; count: number }) {
  return (
    <article className="bd-card bd-card-padding">
      <div className="flex items-center justify-between gap-3">
        <span className="bd-badge">{badge}</span>
        <span className="text-sm text-slate-400">질문 {count}개</span>
      </div>
      <h2 className="bd-title-md mt-4">{title}</h2>
      <p className="bd-text-main mt-4">{description}</p>
      <div className="mt-6">
        <Link href={href} className="bd-button-primary">질문 보러가기</Link>
      </div>
    </article>
  );
}

export default function FinancePage() {
  const categories = financeCategories.map((category) => ({
    ...category,
    count: getQuestionsByCategory(category.key).length,
  }));

  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">금융 가이드</span>
          <h1 className="bd-title-xl mt-4">절세계좌 질문 가이드</h1>
          <p className="bd-text-main mt-4">
            ISA, IRP, 연금저축은 이름은 익숙하지만 실제로는 세금, 유지기간, 투자 가능 상품, 인출 제한, 연금 수령 방식까지 함께 봐야 제대로 활용할 수 있습니다. BlueDino는 사람들이 실제로 많이 검색하는 질문을 기준으로 계좌별 핵심 포인트를 한 페이지씩 정리합니다.
          </p>
          <p className="bd-text-sub mt-3">
            계좌별 질문 모음에서 궁금한 주제를 먼저 찾고, 상세페이지에서 체크포인트와 관련 계산기까지 이어서 확인해보세요.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이런 순서로 보면 이해가 빠릅니다</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">계좌 개념과 가입 가능 여부 이해하기</div>
            <div className="bd-list-item">세액공제·절세 구조와 중도 인출 규칙 확인하기</div>
            <div className="bd-list-item">ETF·배당·장기 운용 전략과 다른 계좌와의 역할 분담 정리하기</div>
          </div>
        </section>

        <section className="bd-section">
          <div>
            <span className="bd-badge">카테고리</span>
            <h2 className="bd-title-lg mt-4">계좌별 질문 모음</h2>
          </div>
          <div className="bd-grid-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.key}
                title={category.shortTitle}
                description={category.description}
                href={category.basePath}
                badge={category.badge}
                count={category.count}
              />
            ))}
          </div>
        </section>

        <AdBlock slotKey="inline" label="금융 가이드 중간 광고 영역" />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/guide/isa-benefits" className="bd-button-secondary">ISA 계좌 혜택 가이드</Link>
            <Link href="/info/guide/pension-vs-irp" className="bd-button-secondary">연금저축과 IRP 차이</Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">절세계좌 활용순서</Link>
            <Link href="/cal/compound" className="bd-button-primary">복리 계산기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
