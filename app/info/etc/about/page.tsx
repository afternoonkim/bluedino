import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlueDino 소개 · 운영자",
  description:
    "두 아이를 키우며 5년간 직접 투자와 세금을 공부해 자가·ISA·해외주식을 운용 중인 개인 투자자 afternoonkim이 운영하는 금융 정보 사이트 BlueDino의 소개, 편집 원칙, 운영 방향 안내.",
  alternates: { canonical: "/info/etc/about" },
  openGraph: {
    title: "BlueDino 소개 · 운영자",
    description:
      "두 아이를 키우며 5년간 직접 투자와 세금을 공부해 자가·ISA·해외주식을 운용 중인 개인 투자자 afternoonkim이 운영하는 금융 정보 사이트 BlueDino의 소개, 편집 원칙, 운영 방향 안내.",
    url: "https://bluedino.kr/info/etc/about",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueDino 소개 · 운영자",
    description:
      "두 아이를 키우며 5년간 직접 투자와 세금을 공부해 자가·ISA·해외주식을 운용 중인 개인 투자자 afternoonkim이 운영하는 금융 정보 사이트 BlueDino의 소개.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "afternoonkim",
  alternateName: "BlueDino 운영자",
  url: "https://bluedino.kr/info/etc/about",
  email: "afternoonkim93@gmail.com",
  jobTitle: "금융 정보 사이트 운영자",
  description:
    "두 아이를 키우는 평범한 직장인이자 개인 투자자로, 결혼 이후 약 5년간 직접 가계부·절세계좌·ETF·배당 구조를 공부하며 자가 마련과 순자산 1억 원 이상을 달성한 뒤, 그 경험을 바탕으로 BlueDino의 투자 계산기와 금융 가이드를 운영하는 사람.",
  knowsAbout: [
    "복리 투자",
    "배당 투자",
    "ETF",
    "ISA 계좌",
    "연금저축",
    "IRP",
    "양도소득세",
    "퇴직소득세",
    "FIRE",
    "자산배분",
  ],
  worksFor: {
    "@type": "Organization",
    name: "BlueDino",
    url: "https://bluedino.kr",
  },
  sameAs: [
    "https://blog.naver.com/issue_item",
    "https://github.com/afternoonkim",
  ],
};

export default function AboutPage() {
  return (
    <div className="bd-page">
      <Script
        id="about-person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">About BlueDino</span>
          <h1 className="bd-title-lg mt-4">BlueDino 소개</h1>
          <p className="bd-text-main mt-4">
            BlueDino는 개인 투자자와 예비 투자자가 자주 마주치는 숫자와 개념을 한곳에서 이해할 수 있도록 만든 금융 정보 사이트입니다.
            단순 계산기 모음이 아니라, 계산 결과를 어떻게 해석해야 하는지까지 연결해 주는 구조를 핵심으로 운영하고 있습니다.
          </p>
          <p className="bd-text-sub mt-3">
            배당, 복리, FIRE, 양도세, 절세계좌, 대출 같은 주제는 용어가 어렵고 서로 연결되는 부분이 많아 처음 보면 헷갈리기 쉽습니다.
            BlueDino는 그 부담을 줄이기 위해 계산기, 질문형 금융 가이드, 설명형 투자 콘텐츠를 함께 제공합니다.
          </p>
        </section>

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">무엇을 제공하나요</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">배당, 복리, FIRE, 연봉 실수령액, 양도세, 퇴직소득세, DSR, LTV, 주담대 계산기</div>
              <div className="bd-list-item">ISA, IRP, 연금저축, CMA, 파킹통장, 대출기초 같은 질문형 금융 가이드</div>
              <div className="bd-list-item">주식·ETF·절세·현금흐름 전략을 이해하기 쉬운 설명형 투자 기초 콘텐츠</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">누구에게 도움이 되나요</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">투자를 시작했지만 세금과 계좌 구조가 헷갈리는 사람</div>
              <div className="bd-list-item">내 소득과 대출 부담을 숫자로 먼저 확인하고 싶은 사람</div>
              <div className="bd-list-item">배당과 복리, 연금과 절세를 하나의 흐름으로 이해하고 싶은 사람</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">누가 운영하나요</h2>
          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">운영자</div>
              <p className="bd-text-sub mt-3">
                BlueDino는 <span className="font-semibold text-white">afternoonkim</span>이 개인 자격으로
                운영하는 금융 정보 사이트입니다. 아래는 제가 이 사이트를 만들게 된 배경을 1인칭으로 정리한 소개입니다.
              </p>
              <p className="bd-text-sub mt-3">
                저는 두 아이를 키우고 있는 평범한 직장인이자 개인 투자자입니다. 결혼을 시작할 때 모아둔 자금이 거의 없어서,
                처음에는 월급으로 생활비를 쓰고 나면 저축이나 투자 여력이 빠듯한 상태였습니다. 그래서 결혼 이후 약 5년 동안은
                수익을 빠르게 내는 것보다 &ldquo;모르는 용어를 모르는 채로 넘기지 않는 것&rdquo;을 우선순위로 두고, 매일 조금씩
                가계부·세금·절세계좌·ETF·배당 구조를 하나씩 정리해 나갔습니다.
              </p>
              <p className="bd-text-sub mt-3">
                그 시간을 거치면서 지금은 가족이 함께 살 자가를 마련했고, 순자산도 1억 원 이상으로 늘어났습니다. 금액 자체가
                크다기보다, &ldquo;0에서 시작해도 개념을 제대로 이해하고 꾸준히 실행하면 현실적인 구간까지는 올 수 있다&rdquo;는 것을
                스스로의 경험으로 확인한 쪽에 가깝습니다. 현재는 ISA 계좌·해외주식·ETF를 중심으로 장기 배당과 절세, 현금흐름
                관점에서 포트폴리오를 유지하고 있고, 아이들이 커가는 시점에 맞춰 자금 계획과 절세계좌 구조를 조금씩 조정하고
                있습니다.
              </p>
              <p className="bd-text-sub mt-3">
                BlueDino를 만들게 된 이유는, 제가 5년 동안 공부하면서 가장 오래 헷갈렸던 부분을 다른 사람은 조금 더 짧게 넘어갈
                수 있도록 돕고 싶어서였습니다. 특히 아이를 키우면서 투자와 세금을 처음부터 공부해야 했던 입장에서는, 단편적인
                영상이나 짧은 요약만으로는 &ldquo;내 상황에 어떻게 적용해야 하는지&rdquo;까지 연결되지 않는 경우가 많았습니다.
                BlueDino의 가이드와 계산기는 그때의 저에게 필요했던 용어를 쉽게 풀고, 계산 결과를 어떻게 해석해야 하는지까지
                이어 주는 흐름을 기준으로 정리하고 있습니다. 그래서 이 사이트는 특정 종목이나 유행 상품을 추천하는 곳이 아니라,
                처음 투자를 시작한 분이 자신의 숫자로 스스로 판단할 수 있도록 돕는 것을 목표로 운영되고 있습니다.
              </p>
              <p className="bd-text-sub mt-3">
                문의: <span className="font-semibold text-cyan-300">afternoonkim93@gmail.com</span>
              </p>
              <p className="bd-text-sub mt-3">
                운영자 블로그:{" "}
                <a
                  href="https://blog.naver.com/issue_item"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="font-semibold text-cyan-300 hover:text-cyan-200 underline"
                >
                  blog.naver.com/issue_item
                </a>
              </p>
              <p className="bd-text-sub mt-3">
                GitHub:{" "}
                <a
                  href="https://github.com/afternoonkim"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="font-semibold text-cyan-300 hover:text-cyan-200 underline"
                >
                  github.com/afternoonkim
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">편집·운영 원칙</div>
              <p className="bd-text-sub mt-3">
                특정 상품 가입이나 종목 매수를 직접 권하지 않습니다. 대신 스스로 판단할 때 필요한 계산기·가이드·비교
                정보를 한 흐름으로 볼 수 있게 정리합니다. 세금·제도 관련 설명은 국세청, 금융감독원, 금융투자협회 등
                공식 기관의 공개 자료와 시행 규정을 기준으로 삼고, 변동 가능성이 있는 부분은 본문에 명시합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">콘텐츠 제작 과정</h2>
          <div className="mt-4 space-y-3">
            <p className="bd-text-sub">
              BlueDino의 모든 가이드는 다음 네 단계를 거쳐 작성됩니다.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 leading-7">
              <li>
                주제 선정: 운영자가 투자 커뮤니티와 실제 이용자 문의에서 자주 반복되는 질문을 수집해
                우선순위를 매깁니다.
              </li>
              <li>
                1차 초안: 국세청·금감원·금융투자협회·각 금융기관의 공식 자료와 법령을 확인해 개념과 숫자
                근거를 정리합니다.
              </li>
              <li>
                수치 검증: BlueDino의 계산기(복리·배당·양도세·FIRE 등)에 실제 값을 입력해 본문 예시가
                모순되지 않는지 대조합니다.
              </li>
              <li>
                발행·수정: 공개 후 제도·세율 변경이 있으면 해당 문서의 수정일(updatedAt)을 갱신하고, 변경
                내용을 본문 상단에 반영합니다.
              </li>
            </ol>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">BlueDino가 중요하게 보는 기준</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">계산 결과만 보여주지 않고 결과를 읽는 방법까지 함께 설명합니다.</div>
            <div className="bd-list-item">특정 금융상품 가입이나 특정 종목 매수를 직접 권유하지 않습니다.</div>
            <div className="bd-list-item">페이지마다 관련 계산기와 가이드를 연결해 필요한 정보를 순서대로 이어서 볼 수 있게 구성합니다.</div>
            <div className="bd-list-item">세금과 규제는 바뀔 수 있으므로 공식 자료 확인이 필요하다는 점을 명확히 안내합니다.</div>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">방문자가 확인할 수 있는 신뢰 정보</h2>
          <p className="bd-text-sub mt-4">
            사이트 이용 방법과 참고할 점을 쉽게 확인할 수 있도록 소개, 문의, 안내 페이지를 함께 운영하고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/etc/contact" className="bd-button-primary">
              문의 페이지 보기
            </Link>
            <Link href="/info/etc/editorial-policy" className="bd-button-secondary">
              사이트 이용 대상 보기
            </Link>
            <Link href="/info/etc/methodology" className="bd-button-secondary">
              이용 안내 보기
            </Link>
            <Link href="/info/etc/privacy" className="bd-button-secondary">
              개인정보처리방침
            </Link>
            <Link href="/info/etc/terms" className="bd-button-secondary">
              이용약관
            </Link>
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">참고 및 면책 안내</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">BlueDino의 계산 결과와 정보 콘텐츠는 이해를 돕기 위한 참고 자료입니다.</div>
            <div className="bd-list-item">세금, 제도, 계좌 혜택, 투자 수익률은 개인 상황과 정책 변경에 따라 실제와 차이가 발생할 수 있습니다.</div>
            <div className="bd-list-item">중요한 의사결정 전에는 금융회사, 세무 전문가, 공공기관의 최신 안내를 함께 확인하는 것을 권장합니다.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
