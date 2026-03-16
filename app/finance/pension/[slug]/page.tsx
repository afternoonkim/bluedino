
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBlock from "@/components/ad/AdBlock";
import { pensionQuestions } from "@/data/finance/pension";
import { getFinanceEntry, getRelatedEntries } from "@/lib/finance/content";

export async function generateStaticParams() {
  return pensionQuestions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const entry = getFinanceEntry("pension", decodeURIComponent(rawSlug));
  if (!entry) return { title: "연금저축 질문 가이드 | BlueDino" };
  return {
    title: `${entry.title} | 연금저축 질문 가이드 | BlueDino`,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: `/finance/pension/${encodeURIComponent(entry.slug)}` },
  };
}

export default async function PensionQuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const entry = getFinanceEntry("pension", decodeURIComponent(rawSlug));
  if (!entry) notFound();
  const relatedEntries = getRelatedEntries("pension", entry.slug, 6);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Script id={`finance-faq-${entry.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bd-page">
        <div className="bd-container bd-section">
          <section className="bd-card bd-card-padding">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/finance" className="bd-badge">금융 가이드</Link>
              <Link href="/finance/pension" className="bd-badge">연금저축</Link>
            </div>
            <h1 className="bd-title-xl mt-4">{entry.title}</h1>
            <p className="bd-text-main mt-4">{entry.summary}</p>
          </section>

          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">결론 먼저</h2>
            <p className="bd-text-main mt-4">{entry.quickAnswer}</p>
            {entry.caution ? <p className="bd-text-sub mt-4">{entry.caution}</p> : null}
          </section>

          <AdBlock slotKey="inline" label={`${entry.title} 본문 중간 광고 영역`} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              {entry.sections.map((section) => (
                <section key={section.title} className="bd-card bd-card-padding">
                  <h2 className="bd-title-md">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph, index) => (
                      <p key={`${section.title}-${index}`} className="bd-text-main">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              <section className="bd-card bd-card-padding">
                <h2 className="bd-title-sm">함께 보면 좋은 계산기</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {entry.relatedCalculatorLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="bd-button-secondary text-center">{link.label}</Link>
                  ))}
                </div>
              </section>

              {relatedEntries.length > 0 && (
                <section className="bd-card bd-card-padding">
                  <h2 className="bd-title-sm">관련 질문</h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {relatedEntries.map((related) => (
                      <Link key={related.slug} href={`/finance/pension/${encodeURIComponent(related.slug)}`} className="rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900">
                        {related.title}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
