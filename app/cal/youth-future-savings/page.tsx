import type { Metadata } from "next";
import Script from "next/script";
import YouthFutureSavingsClient from "./YouthFutureSavingsClient";
import PageTrustFooter from "@/components/trust/PageTrustFooter";

const canonicalPath = "/cal/youth-future-savings";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "청년미래적금 계산기 | 2차 신청 종료·11월 계좌개설·3년 예상액 | BlueDino";
const pageDescription = "청년미래적금 2차 신청은 2026년 10월 16일 종료됐습니다. 신청자는 11월 심사 결과와 계좌개설 기간을 확인하고, 일반형 6%·우대형 12% 기준 3년 만기 예상액을 계산하세요.";

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
            <p className="bd-text-main mt-4">2026년 2차 가입신청은 10월 16일 종료됐습니다. 이미 신청했다면 심사 결과와 11월 계좌개설 기간을 확인하세요. 신청하지 못했다면 다음 모집 공지를 기다리면서 월 납입액별 3년 만기 예상액을 계산해볼 수 있습니다.</p>
          </section>
          <YouthFutureSavingsClient />
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">청년미래적금 계산 기준</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <p>현재 확정된 일반형은 납입액의 6%, 우대형은 12% 정부기여금을 가정합니다. 기여금에 발생하는 이자는 기본금리로 단순 추정합니다. 2027년 기여금 상향안은 예산·제도 확정 전이므로 계산에 포함하지 않았습니다.</p>
              <p>고소득 구간은 정부기여금 없이 이자소득 비과세만 적용되는 구조로 계산합니다.</p>
              <p>금리는 기본금리와 우대금리를 나눠 입력할 수 있으며, 기본 예시는 5% + 3%p = 연 8%입니다. 실제 우대금리와 가입 조건은 취급 금융사 안내를 확인해야 합니다.</p>
            </div>
          </section>
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">2차 신청 종료 — 신청했다면 11월 일정을 확인하세요</h2>
            <p className="bd-text-main mt-3">2026년 2차 가입신청은 10월 16일 오후 6시 30분에 마감됐습니다. 이미 신청한 사람은 10월 19일~11월 13일 심사를 거쳐 11월 12~13일 최종 결과를 개별 안내받을 예정입니다. 사전심사 결과 안내는 10월 30일~11월 2일, 이의신청은 11월 2~5일로 잠정 안내됐으므로 금융기관 앱과 안내 메시지를 확인하세요. 가입 가능 안내를 받았다면 11월 16~27일(주말 제외) 안에 반드시 계좌를 개설해야 하며, 이 기간을 넘기면 이번 회차 계좌를 열 수 없습니다. 3차 모집은 2027년 예산·제도 정비 결과에 따라 진행될 예정으로, 확정된 신청일이 발표된 것은 아닙니다. 일정은 심사 진행 상황에 따라 변경될 수 있습니다.</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <p><strong className="text-slate-100">신청했다면 유형과 연락처를 확인하세요.</strong> 일반소득자·중소기업 재직자·소상공인 중 신청 당시 선택한 유형과 사전심사 결과가 다르면 안내된 이의신청 기간에 확인·소명하세요.</p>
              <p><strong className="text-slate-100">소상공인으로 신청했다면 보완 요청을 확인하세요.</strong> 소상공인확인서 등 자격 확인에 필요한 자료가 누락되거나 추가 제출 요청이 오면 안내된 기한에 맞춰 대응하세요.</p>
              <p><strong className="text-slate-100">청년도약계좌에서 갈아탄다면 순서가 중요합니다.</strong> 이번 회차에 신청·심사를 통과했다면 먼저 청년미래적금 계좌를 개설한 뒤 청년도약계좌 특별중도해지를 신청해야 합니다. 기존 계좌를 먼저 해지하지 마세요.</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm font-semibold text-slate-200">
              <a href="https://www.fsc.go.kr/no010101/87933" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:text-cyan-200">금융위원회 10월 15일 신청 마감·계좌개설 안내 ↗</a>
              <a href="https://fill4young.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-400/50 hover:text-cyan-200">청년미래적금 공식 안내 페이지 ↗</a>
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
      <div className="bd-container-narrow bd-section"><PageTrustFooter pageKind="청년미래적금 계산기" updatedAt="2026-10-18" /></div>
    </>
  );
}
