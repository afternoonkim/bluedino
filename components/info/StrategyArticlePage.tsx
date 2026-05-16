import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import ShareAndCite from "@/components/share/ShareAndCite";

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


function uniqueStrategyLinks(links: StrategyLinkItem[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function getAutoStrategyLinks(article: StrategyArticle) {
  const text = `${article.slug} ${article.title} ${article.description} ${article.badge}`;
  const calculators: StrategyLinkItem[] = [
    { label: "복리 계산기", href: "/cal/compound" },
    { label: "FIRE 계산기", href: "/cal/fire" },
  ];
  const guides: StrategyLinkItem[] = [
    { label: "투자 기초 가이드", href: "/info/guide" },
    { label: "금융 가이드", href: "/finance" },
  ];

  if (/절세|세금|tax|isa|irp|연금/i.test(text)) {
    calculators.push(
      { label: "ISA 절세 계산기", href: "/cal/isa-tax-savings" },
      { label: "연금저축·IRP 절세 계산기", href: "/cal/pension-tax-credit" },
    );
    guides.push(
      { label: "ISA 계좌 기초", href: "/info/guide/isa-basics" },
      { label: "연금저축과 IRP 차이", href: "/info/guide/pension-vs-irp" },
    );
  }

  if (/자산배분|포트폴리오|etf|배당/i.test(text)) {
    calculators.push(
      { label: "배당 계산기", href: "/cal/calculator" },
      { label: "ETF 비교 도구", href: "/etf/compare" },
    );
    guides.push(
      { label: "ETF 기초 가이드", href: "/info/guide/etf-basics" },
      { label: "ETF 순위 비교", href: "/etf/ranking" },
    );
  }

  if (/대출|주담대|신혼|가구|dsr|ltv/i.test(text)) {
    calculators.push(
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "LTV 계산기", href: "/cal/ltv" },
      { label: "주담대 계산기", href: "/cal/mortgage" },
    );
    guides.push({ label: "주담대 갈아타기 기준", href: "/info/guide/mortgage-refinancing-when" });
  }

  return {
    calculators: uniqueStrategyLinks([...article.calculators, ...calculators]).slice(0, 8),
    guides: uniqueStrategyLinks([...article.relatedGuides, ...guides]).slice(0, 8),
    strategies: uniqueStrategyLinks(article.relatedStrategies).slice(0, 8),
  };
}

export default function StrategyArticlePage({ article }: { article: StrategyArticle }) {
  const autoLinks = getAutoStrategyLinks(article);
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
        {/* <Link href="/info/strategy" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          ← 투자 전략으로 돌아가기
        </Link> */}

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

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 계산기</h2>
          <p className="bd-text-main mt-4">
            전략은 머리로 이해하는 것보다 내 금액과 기간을 넣어보는 것이 훨씬 빠릅니다. 아래 도구를 함께 보면 판단이 더 쉬워집니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {autoLinks.calculators.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">함께 보면 좋은 가이드</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {autoLinks.guides.map((item) => (
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
          <h2 className="bd-title-md">함께 보면 좋은 가이드</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {autoLinks.strategies.map((item) => (
              <Link key={item.href} href={item.href} className="bd-button-secondary">
                {item.label}
              </Link>
            ))}
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 보기
            </Link>
          </div>
        </section>


        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이 순서로 보세요</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Link href="/info/guide" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200 hover:border-cyan-400/50">1단계: 투자 기초 개념</Link>
            <Link href="/info/strategy" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200 hover:border-cyan-400/50">2단계: 투자전략 비교</Link>
            <Link href="/cal" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm font-semibold text-slate-200 hover:border-cyan-400/50">3단계: 계산기로 점검</Link>
          </div>
        </section>

        <ShareAndCite
          url={`/info/strategy/${article.slug}`}
          title={article.title}
          category="투자전략 가이드"
        />

        <PageTrustFooter pageKind="투자전략 가이드" updatedAt="2026-04-27" />

      </article>
    </div>
  );
}
