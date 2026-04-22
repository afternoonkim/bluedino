import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import EditorialTrustPanel from "@/components/trust/EditorialTrustPanel";

export type StrategyLinkItem = { label: string; href: string };
export type StrategyFaqItem = { question: string; answer: string };

export type StrategyArticle = {
  slug: string;
  badge: string;
  title: string;
  description: string;
  hero: string;
  introQuestion: string;
  introAnswer: string;
  principlesTitle: string;
  principles: string[];
  mistakesTitle: string;
  mistakes: string[];
  exampleTitle: string;
  exampleBody: string;
  suitableFor: string[];
  caution: string;
  faqs: StrategyFaqItem[];
  relatedGuides: StrategyLinkItem[];
  relatedStrategies: StrategyLinkItem[];
  calculators: StrategyLinkItem[];
};

export default function StrategyArticlePage({ article }: { article: StrategyArticle }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
  };

  return (
    <div className="bd-page">
      <Script
        id={`strategy-article-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`strategy-faq-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="bd-container-narrow bd-section space-y-8">
        <Link href="/info/strategy" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          ← 투자 전략으로 돌아가기
        </Link>

        <section className="bd-card bd-card-padding">
          <span className="bd-badge">{article.badge}</span>
          <h1 className="bd-title-lg mt-4">{article.title}</h1>
          <p className="bd-text-main mt-4">{article.hero}</p>
          <div
            role="note"
            aria-label="투자 정보 면책 안내"
            className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4"
          >
            <p className="text-xs leading-6 text-amber-100/90">
              <span className="mr-2 inline-block rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                투자 정보 안내
              </span>
              본 글은 특정 상품 가입이나 종목 매수를 권유하지 않는 교육·정보 목적의 참고 자료입니다.
              세금·제도·수익률은 개인 상황과 시점에 따라 달라질 수 있으니, 실제 실행 전에 금융회사·세무 전문가·공공기관의 공식 자료를 반드시 함께 확인하세요.
            </p>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">처음 볼 때 많이 헷갈리는 부분</h2>
          <h3 className="mt-4 text-lg font-semibold text-white">{article.introQuestion}</h3>
          <p className="bd-text-main mt-4">{article.introAnswer}</p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">{article.principlesTitle}</h2>
          <div className="bd-list mt-5">
            {article.principles.map((item) => (
              <div key={item} className="bd-list-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">실수하기 쉬운 부분</h2>
          <div className="bd-list mt-5">
            {article.mistakes.map((item) => (
              <div key={item} className="bd-list-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">{article.exampleTitle}</h2>
          <p className="bd-text-main mt-4">{article.exampleBody}</p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">이런 분들에게 잘 맞습니다</h2>
          <div className="bd-list mt-5">
            {article.suitableFor.map((item) => (
              <div key={item} className="bd-list-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">알아두면 좋은 점</h2>
          <p className="bd-text-main mt-4">{article.caution}</p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">숫자로 직접 확인해보기</h2>
          <p className="bd-text-main mt-4">
            전략은 머리로 이해하는 것보다 내 금액과 기간을 넣어보는 것이 훨씬 빠릅니다. 아래 도구를 함께 보면 판단이 더 쉬워집니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {article.calculators.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">먼저 보면 이해가 쉬운 기초 가이드</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {article.relatedGuides.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
            <Link href="/info/guide" className="bd-button-primary">
              투자 기초 가이드 전체 보기
            </Link>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이 전략과 함께 보면 좋은 글</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {article.relatedStrategies.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 보기
            </Link>
          </div>
        </section>


        <EditorialTrustPanel compact />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이 전략을 볼 때 같이 생각하면 좋은 점</h2>
          <div className="bd-list mt-5">
            <div className="bd-list-item">전략 자체보다 내 투자 기간, 현금흐름, 감당 가능한 변동성을 함께 보는 것이 중요합니다.</div>
            <div className="bd-list-item">같은 전략도 계좌 선택과 세후 기준에 따라 체감 결과가 달라질 수 있습니다.</div>
            <div className="bd-list-item">실행 전에는 내 금액을 직접 넣어 계산기로 확인해보는 편이 훨씬 현실적입니다.</div>
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자주 묻는 질문</h2>
          <div className="mt-6 space-y-4">
            {article.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                <p className="bd-text-main mt-3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
