import type { Metadata } from "next";
import Script from "next/script";
import YouthFutureSavingsClient from "./YouthFutureSavingsClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/youth-future-savings";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "청년미래적금 계산기 | 2026년 출시 예정 청년 적금 예상액 | BlueDino";
const pageDescription = "2026년 6월 출시 예정인 청년미래적금의 기본금리 5%, 기관별 우대금리 2~3%p, 일반형 6%·우대형 12% 정부기여금 구조를 반영해 3년 만기 예상액을 계산하는 참고용 계산기입니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["청년미래적금 계산기", "청년미래적금", "2026 청년 적금", "청년미래적금 일반형 우대형"],
  alternates: { canonical: canonicalPath },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, siteName: "BlueDino", locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "청년미래적금 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: pageDescription,
  url: pageUrl,
};

export default function Page() {
  return (
    <>
      <Script id="youth-future-savings-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="bd-page">
        <div className="bd-container-narrow bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">청년미래적금</span>
            <h1 className="bd-title-lg mt-4">청년미래적금 계산기</h1>
            <p className="bd-text-main mt-4">청년도약계좌 종료 이후 새롭게 관심을 받을 수 있는 청년미래적금의 만기 예상액을 미리 가늠해보는 페이지입니다. 기본금리 5%에 기관별 우대금리 2~3%p가 더해지는 구조와 일반형·우대형 정부기여금 차이를 함께 확인할 수 있습니다.</p>
          </section>
          <YouthFutureSavingsClient />
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">청년미래적금 계산 기준</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <p>일반형은 납입액의 6%, 우대형은 납입액의 12% 정부기여금을 가정합니다.</p>
              <p>고소득 구간은 정부기여금 없이 이자소득 비과세만 적용되는 구조로 계산합니다.</p>
              <p>금리는 기본금리와 우대금리를 나눠 입력할 수 있으며, 기본 예시는 5% + 3%p = 연 8%입니다. 실제 우대금리와 가입 조건은 취급 금융사 안내를 확인해야 합니다.</p>
            </div>
          </section>
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">공식 참고 기준</h2>
            <p className="bd-text-main mt-3">출시 전 공개된 구조를 기준으로 한 예상 시뮬레이션입니다. 실제 금리, 우대 조건, 정부기여금 지급 방식은 출시 시점의 공식 안내를 확인해 주세요.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm font-semibold text-slate-200">
              <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:text-cyan-200">금융위원회 청년 자산형성 지원 정책 안내 ↗</a>
              <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:text-cyan-200">서민금융진흥원 청년 금융지원 안내 ↗</a>
              <a href="https://portal.kfb.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:text-cyan-200">취급 금융회사 상품 설명서 ↗</a>
            </div>
          </section>
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">함께 보면 좋은 계산기</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="bd-button-secondary" href="/cal/youth-leap-account">청년도약계좌 계산기</a>
              <a className="bd-button-secondary" href="/cal/deposit-interest">예금 이자 계산기</a>
              <a className="bd-button-secondary" href="/cal/installment-savings">적금 이자 계산기</a>
              <a className="bd-button-secondary" href="/cal/isa-tax-savings">ISA 절세 계산기</a>
            </div>
          </section>
        </div>
      </main>
      <div className="bd-container-narrow bd-section"><PageTrustFooter pageKind="청년미래적금 계산기" updatedAt="2026-05-16" /></div>
    </>
  );
}
