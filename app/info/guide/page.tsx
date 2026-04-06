import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";
import { guideArticles, guideCategories } from "@/lib/info/guideArticles";
import EditorialTrustPanel from "@/components/trust/EditorialTrustPanel";

export const metadata: Metadata = {
  title: "투자 기초 가이드 | BlueDino",
  description:
    "주식, ETF, ISA, 연금저축, 배당, 복리까지 투자 입문자가 먼저 이해하면 좋은 핵심 개념을 쉽게 정리한 BlueDino 가이드 모음",
};

type GuideCardProps = {
  slug: string;
};

function GuideCard({ slug }: GuideCardProps) {
  const article = guideArticles[slug];

  return (
    <article className="bd-card bd-card-padding">
      <span className="bd-badge">{article.badge}</span>
      <h3 className="bd-title-md mt-4">{article.title}</h3>
      <p className="bd-text-main mt-4">{article.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {article.calculators.slice(0, 1).map((item) => (
          <Link key={item.href} href={item.href} className="bd-button-secondary">
            {item.label}
          </Link>
        ))}
        <Link href={`/info/guide/${slug}`} className="bd-button-primary">
          가이드 읽기
        </Link>
      </div>
    </article>
  );
}

export default function GuidePage() {
  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자 기초 가이드</span>
          <h1 className="bd-title-xl mt-4">투자를 처음 시작할 때 가장 먼저 보면 좋은 개념 정리</h1>
          <p className="bd-text-main mt-4">
            주식, ETF, 절세계좌, 배당, 복리처럼 많이 듣지만 막상 한 번에 정리하기 어려운 주제를 모았습니다.
            BlueDino의 투자 기초 가이드는 어려운 용어를 늘어놓기보다, 실제로 투자 판단에 어떤 차이를 만드는지 중심으로 설명합니다.
          </p>
          <p className="bd-text-sub mt-3">
            짧은 요약만 보고 왔다면 아래에서 필요한 주제를 골라 읽고, 마지막에 연결된 계산기로 직접 숫자를 확인해보세요.
            개념과 숫자를 함께 보면 이해가 훨씬 빨라집니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이 순서로 보세요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">투자 기본부터: 주식 투자 기초 → ETF 투자 처음 시작하는 방법 → ETF와 개별주 무엇이 더 나을까</div>
            <div className="bd-list-item">세후 수익까지: ISA 계좌란 무엇인가 → 절세계좌를 먼저 써야 하는 이유 → 연금저축과 IRP 무엇이 다를까</div>
            <div className="bd-list-item">현금흐름까지: 배당 투자 어떻게 시작해야 할까 → 복리 투자 실제로 얼마나 차이 날까 → 월배당 ETF 투자 전에 무엇을 봐야 할까</div>
          </div>
        </section>

        {guideCategories.map((category, index) => (
          <section key={category.key} className="bd-section">
            <div>
              <span className="bd-badge">{category.badge}</span>
              <h2 className="bd-title-lg mt-4">{category.title}</h2>
              <p className="bd-text-sub mt-3">{category.description}</p>
            </div>
            <div className="bd-grid-2">
              {category.items.map((slug) => (
                <GuideCard key={slug} slug={slug} />
              ))}
            </div>
            {index === 0 || index === 1 ? <AdBlock /> : null}
          </section>
        ))}

        <section className="bd-card bd-card-padding">
          <span className="bd-badge">가이드 사용 안내</span>
          <h2 className="bd-title-lg mt-4">이 페이지를 먼저 보는 것이 좋은 사람</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">주식, ETF, 절세계좌, 배당 같은 단어는 익숙하지만 서로 어떻게 연결되는지 아직 감이 없는 사람</div>
            <div className="bd-list-item">짧은 영상이나 요약 글만 보고 개념이 섞여버린 상태에서 다시 기본부터 정리하고 싶은 사람</div>
            <div className="bd-list-item">가이드를 읽고 바로 계산기로 넘어가서 내 숫자에 맞춰 확인하고 싶은 사람</div>
          </div>
        </section>

        <EditorialTrustPanel compact />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">직접 계산해보면 더 쉬운 주제</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/cal/compound" className="bd-button-secondary">
              복리 계산기
            </Link>
            <Link href="/cal/calculator" className="bd-button-secondary">
              배당 계산기
            </Link>
            <Link href="/cal/fire" className="bd-button-secondary">
              FIRE 계산기
            </Link>
            <Link href="/cal/capital-gains" className="bd-button-secondary">
              양도소득세 계산기
            </Link>
            <Link href="/finance" className="bd-button-primary">
              금융 가이드 메인
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
