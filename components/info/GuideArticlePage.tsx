import Link from "next/link";
import Script from "next/script";
import AdBlock from "@/components/ad/AdBlock";
import EditorialTrustPanel from "@/components/trust/EditorialTrustPanel";

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

const DEFAULT_AUTHOR = "afternoonkim (BlueDino 운영자)";
const DEFAULT_PUBLISHED_AT = "2025-01-01";

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

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">읽기 전에 알아두면 좋은 점</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">이 글은 특정 상품 가입이나 종목 추천을 위한 문서가 아닙니다.</div>
            <div className="bd-list-item">제도와 세금은 바뀔 수 있으므로, 실제 실행 전에는 공식 안내를 다시 확인해야 합니다.</div>
            <div className="bd-list-item">BlueDino는 개념 설명과 숫자 해석을 돕기 위한 참고 자료를 제공하는 것을 목적으로 합니다.</div>
          </div>
        </section>

        <EditorialTrustPanel compact />


        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이 글을 활용하는 방법</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">먼저 개념을 읽고, 내 상황과 비슷한 예시가 있는지 확인해보세요.</div>
            <div className="bd-list-item">바로 아래 계산기에서 금액과 기간을 넣어보면 이해가 더 쉬워집니다.</div>
            <div className="bd-list-item">실제 실행 전에는 금융회사나 공공기관의 최신 기준을 한 번 더 확인하는 것이 안전합니다.</div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">작성자 및 운영 안내</h2>
          <p className="bd-text-main mt-4">이 글은 BlueDino 운영자가 개인 투자자 입장에서 자주 헷갈리는 금융 개념을 쉽게 정리하기 위해 작성한 참고 콘텐츠입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/about" className="bd-button-secondary">BlueDino 소개</Link>
            <Link href="/info/etc/contact" className="bd-button-secondary">문의하기</Link>
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
