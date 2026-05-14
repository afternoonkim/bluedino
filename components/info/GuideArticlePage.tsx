import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import PageTrustFooter from "@/components/trust/PageTrustFooter";
import ShareAndCite from "@/components/share/ShareAndCite";

type LinkItem = { label: string; href: string };
type FaqItem = { question: string; answer: string };

export type LongContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: "chart";
      kind: "bar";
      caption?: string;
      unit?: string;
      series: { label: string; value: number; display?: string }[];
      note?: string;
    };

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
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  longContent?: LongContentBlock[];
  sources?: LinkItem[];
};

const DEFAULT_AUTHOR = "BlueDino 편집팀";
const DEFAULT_PUBLISHED_AT = "2025-01-01";


const COMMON_CALCULATOR_LINKS: LinkItem[] = [
  { label: "복리 계산기", href: "/cal/compound" },
  { label: "배당 계산기", href: "/cal/calculator" },
  { label: "FIRE 계산기", href: "/cal/fire" },
];

function uniqueLinks(links: LinkItem[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function getAutoGuideLinks(article: GuideArticle) {
  const text = `${article.slug} ${article.title} ${article.description} ${article.badge}`;
  const calculators: LinkItem[] = [];
  const guides: LinkItem[] = [];

  if (/isa/i.test(text)) {
    calculators.push({ label: "ISA 절세 계산기", href: "/cal/isa-tax-savings" });
    guides.push(
      { label: "IRP 세액공제 기초", href: "/info/guide/irp-tax-deduction-by-salary" },
      { label: "연금저축과 IRP 차이", href: "/info/guide/pension-vs-irp" },
    );
  }

  if (/irp|연금저축|pension/i.test(text)) {
    calculators.push({ label: "연금저축·IRP 절세 계산기", href: "/cal/pension-tax-credit" });
    guides.push(
      { label: "ISA 계좌 기초", href: "/info/guide/isa-basics" },
      { label: "연봉별 IRP 세액공제 환급액", href: "/info/guide/irp-tax-deduction-by-salary" },
    );
  }

  if (/주담대|담보대출|mortgage|dsr|ltv|대출/i.test(text)) {
    calculators.push(
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "LTV 계산기", href: "/cal/ltv" },
      { label: "주담대 계산기", href: "/cal/mortgage" },
    );
    guides.push(
      { label: "주담대 갈아타기 기준", href: "/info/guide/mortgage-refinancing-when" },
      { label: "대출 상환 방식 비교", href: "/finance/loan-basics" },
    );
  }

  if (/해외주식|양도세|세금|tax|capital/i.test(text)) {
    calculators.push({ label: "해외주식 양도세 계산기", href: "/cal/capital-gains" });
    guides.push(
      { label: "해외주식 세금 기초", href: "/info/guide/us-stock-tax-basics" },
      { label: "해외주식 양도세 절세 팁", href: "/info/guide/us-stock-tax-saving" },
    );
  }

  if (/etf|배당|dividend/i.test(text)) {
    calculators.push(
      { label: "배당 계산기", href: "/cal/calculator" },
      { label: "ETF 비교 도구", href: "/etf/compare" },
    );
    guides.push(
      { label: "ETF 기초 가이드", href: "/info/guide/etf-basics" },
      { label: "ETF 배당 캘린더", href: "/etf/dividend-calendar" },
    );
  }

  if (/fire|은퇴|노후|retire/i.test(text)) {
    calculators.push({ label: "FIRE 계산기", href: "/cal/fire" });
    guides.push(
      { label: "은퇴 후 자산 운용 전략", href: "/info/strategy/post-retirement-investor" },
      { label: "자산배분 전략", href: "/info/strategy/asset-allocation" },
    );
  }

  return {
    calculators: uniqueLinks([...article.calculators, ...calculators, ...COMMON_CALCULATOR_LINKS]).slice(0, 8),
    guides: uniqueLinks([...article.related, ...guides]).slice(0, 8),
  };
}

function formatDateLabel(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function GuideArticlePage({ article }: { article: GuideArticle }) {
  const author = article.author ?? DEFAULT_AUTHOR;
  const publishedAt = article.publishedAt ?? DEFAULT_PUBLISHED_AT;
  const updatedAt = article.updatedAt ?? publishedAt;
  const publishedLabel = formatDateLabel(publishedAt);
  const updatedLabel = formatDateLabel(updatedAt);
  const autoLinks = getAutoGuideLinks(article);

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
      { "@type": "ListItem", position: 2, name: "투자 기초 가이드", item: "https://bluedino.kr/info/guide" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://bluedino.kr/info/guide/${article.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ko-KR",
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: author,
      url: "https://bluedino.kr/info/etc/about",
    },
    publisher: {
      "@type": "Organization",
      name: "BlueDino",
      url: "https://bluedino.kr",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bluedino.kr/info/guide/${article.slug}`,
    },
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
      <Script
        id={`guide-breadcrumb-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">{article.badge}</span>
          <h1 className="bd-title-lg mt-4">{article.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">{author}</span>
            {publishedLabel && (
              <span>
                발행 <time dateTime={publishedAt}>{publishedLabel}</time>
              </span>
            )}
            {updatedLabel && updatedAt !== publishedAt && (
              <span>
                수정 <time dateTime={updatedAt}>{updatedLabel}</time>
              </span>
            )}
          </div>
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

        {article.longContent && article.longContent.length > 0 && (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">자세히 살펴보기</h2>
            <div className="mt-4 space-y-4">
              {article.longContent.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h3
                      key={`heading-${index}-${block.text}`}
                      className="mt-6 text-lg font-semibold text-white"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul
                      key={`list-${index}`}
                      className="list-disc space-y-2 pl-6 text-slate-300 leading-7"
                    >
                      {block.items.map((item, itemIndex) => (
                        <li key={`list-${index}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "table") {
                  return (
                    <figure
                      key={`table-${index}`}
                      className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      {block.caption && (
                        <figcaption className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-slate-200">
                          {block.caption}
                        </figcaption>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-300">
                          <thead>
                            <tr className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
                              {block.headers.map((h, hi) => (
                                <th
                                  key={`th-${index}-${hi}`}
                                  className="px-4 py-3 font-semibold"
                                  scope="col"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row, ri) => (
                              <tr
                                key={`tr-${index}-${ri}`}
                                className="border-t border-white/5"
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={`td-${index}-${ri}-${ci}`}
                                    className={
                                      ci === 0
                                        ? "px-4 py-3 font-semibold text-slate-100"
                                        : "px-4 py-3 tabular-nums"
                                    }
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {block.note && (
                        <div className="border-t border-white/10 bg-white/5 px-5 py-3 text-xs text-slate-400">
                          {block.note}
                        </div>
                      )}
                    </figure>
                  );
                }
                if (block.type === "chart") {
                  const maxValue = Math.max(
                    ...block.series.map((s) => s.value),
                    1,
                  );
                  return (
                    <figure
                      key={`chart-${index}`}
                      className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-5"
                    >
                      {block.caption && (
                        <figcaption className="mb-4 text-sm font-semibold text-slate-200">
                          {block.caption}
                          {block.unit && (
                            <span className="ml-2 text-xs font-normal text-slate-400">
                              (단위: {block.unit})
                            </span>
                          )}
                        </figcaption>
                      )}
                      <div className="space-y-3">
                        {block.series.map((point, pi) => {
                          const widthPct = Math.max(
                            4,
                            (point.value / maxValue) * 100,
                          );
                          const display =
                            point.display ??
                            point.value.toLocaleString("ko-KR");
                          return (
                            <div
                              key={`bar-${index}-${pi}`}
                              className="grid grid-cols-[6rem_1fr_5rem] items-center gap-3 text-sm"
                            >
                              <span className="truncate font-medium text-slate-300">
                                {point.label}
                              </span>
                              <div
                                className="h-3 rounded-full bg-white/5"
                                role="presentation"
                              >
                                <div
                                  className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500"
                                  style={{ width: `${widthPct}%` }}
                                  aria-label={`${point.label}: ${display}`}
                                />
                              </div>
                              <span className="text-right tabular-nums text-slate-200">
                                {display}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      {block.note && (
                        <div className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">
                          {block.note}
                        </div>
                      )}
                    </figure>
                  );
                }
                return (
                  <p
                    key={`paragraph-${index}`}
                    className="bd-text-main leading-8"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </section>
        )}

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
          <h2 className="bd-title-md">직접 확인해보기</h2>
          <p className="bd-text-main mt-4">
            개념을 이해했다면 숫자로 직접 확인해보는 것이 가장 빠릅니다. 아래 계산기에서 내 투자 기간과 금액을 넣어보면 체감이 훨씬 쉬워집니다.
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
          <h2 className="bd-title-md">같이 보면 이해가 더 쉬운 글</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {autoLinks.guides.map((item) => (
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

        {article.sources && article.sources.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">참고 자료</h2>
            <p className="bd-text-sub mt-3">
              본문 근거로 참고한 공식 자료·공개 보고서 목록입니다. 제도와 세율은 변경될 수 있으므로, 실제 실행 전에 원문을 다시 확인하는 것을 권장합니다.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ShareAndCite
          url={`/info/guide/${article.slug}`}
          title={article.title}
          category="투자 기초 가이드"
        />

        <PageTrustFooter
          updatedAt={updatedAt}
          pageKind="투자 기초 가이드"
        />

      </article>
    </div>
  );
}
