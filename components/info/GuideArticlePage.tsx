import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";

type LinkItem = { label: string; href: string };
type FaqItem = { question: string; answer: string };

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  badge: string;
  hero: string;
  questionTitle: string;
  questionBody: string;
  conceptTitle: string;
  conceptBody: string[];
  mistakes: string[];
  exampleTitle: string;
  exampleBody: string;
  who: string[];
  caution: string;
  faqs: FaqItem[];
  related: LinkItem[];
  calculators: LinkItem[];
};

export default function GuideArticlePage({ article }: { article: GuideArticle }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
  };

  return (
    <div className="bd-page">
      <Script
        id={`guide-article-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`guide-faq-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">{article.badge}</span>
          <h1 className="bd-title-lg mt-4">{article.title}</h1>
          <p className="bd-text-main mt-4">{article.hero}</p>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">{article.questionTitle}</h2>
          <p className="bd-text-main mt-4">{article.questionBody}</p>
        </section>

        <AdBlock />

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">{article.conceptTitle}</h2>
          <div className="mt-4 space-y-4">
            {article.conceptBody.map((paragraph) => (
              <p key={paragraph} className="bd-text-main">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="bd-card bd-card-padding">
          <h2 className="bd-title-md">자주 놓치는 부분</h2>
          <div className="bd-list mt-4">
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
          <h2 className="bd-title-md">이런 분들에게 특히 도움이 됩니다</h2>
          <div className="bd-list mt-4">
            {article.who.map((item) => (
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
          <h2 className="bd-title-md">직접 확인해보기</h2>
          <p className="bd-text-main mt-4">
            개념을 이해했다면 숫자로 직접 확인해보는 것이 가장 빠릅니다. 아래 계산기에서 내 투자 기간과 금액을 넣어보면 체감이 훨씬 쉬워집니다.
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
          <h2 className="bd-title-md">같이 보면 이해가 더 쉬운 글</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {article.related.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 메인
            </Link>
            <Link href="/info/guide" className="bd-button-primary">
              투자 기초 가이드 전체 보기
            </Link>
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
