import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "투자 기초 가이드",
  description:
    "주식, ETF, ISA, 연금, 세금, 포트폴리오, 배당, FIRE까지 정리한 BlueDino 투자 기초 가이드 모음",
};

const starterGuides = [
  {
    title: "주식 투자 기초",
    description: "주식이 무엇인지, 수익이 어떻게 발생하는지부터 이해하는 입문 가이드",
    href: "/info/guide/stock-basics",
    badge: "입문",
  },
  {
    title: "배당 투자 기초",
    description: "배당률만 보는 실수를 줄이고, 배당 성장과 지속 가능성을 함께 보는 방법",
    href: "/info/guide/dividend-basics",
    badge: "배당",
  },
  {
    title: "복리의 힘과 재투자",
    description: "수익을 다시 투자할 때 시간이 어떤 차이를 만드는지 이해하는 핵심 개념",
    href: "/info/guide/compound-interest",
    badge: "복리",
  },
  {
    title: "분산투자가 왜 중요한가",
    description: "수익을 늘리기보다 손실을 줄이는 관점에서 분산투자를 이해하는 가이드",
    href: "/info/guide/diversification",
    badge: "리스크",
  },
  {
    title: "ETF와 개별주식 차이",
    description: "초보자가 ETF부터 시작하는 이유와 개별주식의 장단점을 비교",
    href: "/info/guide/etf-vs-stocks",
    badge: "비교",
  },
  {
    title: "ISA 계좌로 투자하면 뭐가 좋은가",
    description: "ISA의 핵심 혜택과 일반계좌 대비 어떤 차이가 있는지 쉽게 정리",
    href: "/info/guide/isa-benefits",
    badge: "절세",
  },
  {
    title: "연금저축과 IRP 차이",
    description: "비슷해 보이지만 실제 활용 흐름이 다른 두 계좌를 목적 중심으로 비교",
    href: "/info/guide/pension-vs-irp",
    badge: "연금",
  },
  {
    title: "손실이 났을 때 세금은 어떻게 되는가",
    description: "손실이라고 무조건 세금이 없는 것은 아니기 때문에 구조를 먼저 정리",
    href: "/info/guide/loss-tax",
    badge: "세금",
  },
];

const advancedGuides = [
  {
    title: "고배당주 투자 시 주의점",
    description: "배당률이 높아 보여도 실제로는 위험 신호일 수 있는 포인트 정리",
    href: "/info/guide/high-dividend-risks",
    badge: "주의",
  },
  {
    title: "월배당 ETF 투자 전 체크포인트",
    description: "현금흐름만 보고 접근하기 전에 총수익과 구조를 확인하는 가이드",
    href: "/info/guide/monthly-dividend-etf-checklist",
    badge: "ETF",
  },
  {
    title: "FIRE 계산기를 어떻게 활용할까",
    description: "숫자만 입력하는 것이 아니라 생활비와 목표 자산의 관계를 읽는 방법",
    href: "/info/guide/fire-calculator-guide",
    badge: "FIRE",
  },
  {
    title: "해외주식 투자 시 세금 기본 구조",
    description: "배당소득세와 양도소득세를 구분해 이해하는 해외주식 세금 입문",
    href: "/info/guide/us-stock-tax-basics",
    badge: "해외주식",
  },
  {
    title: "절세계좌를 먼저 써야 하는 이유",
    description: "같은 수익률이어도 세후 결과가 달라지는 핵심 이유를 설명",
    href: "/info/guide/why-tax-advantaged-accounts",
    badge: "절세전략",
  },
  {
    title: "장기투자와 단기투자의 차이",
    description: "투자 기간에 따라 필요한 태도와 리스크 관리 방식이 어떻게 달라지는지 정리",
    href: "/info/guide/long-vs-short-term",
    badge: "투자기간",
  },
  {
    title: "초보자가 포트폴리오를 만들 때 흔한 실수",
    description: "좋아 보이는 자산을 모으는 것과 전략적으로 구성하는 것은 다릅니다",
    href: "/info/guide/portfolio-mistakes",
    badge: "포트폴리오",
  },
  {
    title: "현금흐름 투자와 자본차익 투자의 차이",
    description: "배당과 월분배금을 중시하는 투자와 시세차익 중심 투자를 구분해서 이해",
    href: "/info/guide/cashflow-vs-capital-gains",
    badge: "전략비교",
  },
];

function GuideCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge: string;
}) {
  return (
    <article className="bd-card bd-card-padding">
      <span className="bd-badge">{badge}</span>
      <h2 className="bd-title-md mt-4">{title}</h2>
      <p className="bd-text-main mt-4">{description}</p>
      <div className="mt-6">
        <Link href={href} className="bd-button-secondary">
          가이드 보기
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
          <span className="bd-badge">투자정보</span>
          <h1 className="bd-title-xl mt-4">투자 기초 가이드</h1>
          <p className="bd-text-main mt-4">
            BlueDino의 투자 기초 가이드는 계산기를 사용하기 전에 꼭 알아두면
            좋은 핵심 개념을 정리한 공간입니다. 단순한 설명이 아니라 실제로
            계좌를 선택하고, 세금을 이해하고, 포트폴리오를 짜고, 배당과 FIRE를
            생각할 때 바로 연결되는 주제들로 구성했습니다.
          </p>
          <p className="bd-text-sub mt-3">
            입문자용 주제와 실전 체크용 주제를 함께 배치해, 처음 시작하는
            사용자부터 계산기 활용 전 개념을 정리하려는 사용자까지 자연스럽게
            이어질 수 있도록 만들었습니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이 순서로 보세요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">주식 투자 기초 → ETF와 개별주식 차이 → 분산투자 이해</div>
            <div className="bd-list-item">ISA 계좌 혜택 → 연금저축과 IRP 차이 → 절세계좌 활용순서 확인</div>
            <div className="bd-list-item">배당 투자 기초 → 복리와 재투자 → 배당 계산기로 직접 계산</div>
            <div className="bd-list-item">해외주식 세금 구조 → 손실과 세금 관계 → 양도세 계산기 활용</div>
          </div>
        </section>

        <section className="bd-section">
          <div>
            <span className="bd-badge">1차 추가 주제</span>
            <h2 className="bd-title-lg mt-4">투자 입문자가 먼저 읽기 좋은 콘텐츠</h2>
          </div>
          <div className="bd-grid-2">
            {starterGuides.map((guide) => (
              <GuideCard key={guide.href} {...guide} />
            ))}
          </div>
        </section>

        <AdBlock />

        <section className="bd-section">
          <div>
            <span className="bd-badge">2차 추가 주제</span>
            <h2 className="bd-title-lg mt-4">실전 투자 전에 체크하면 좋은 콘텐츠</h2>
          </div>
          <div className="bd-grid-2">
            {advancedGuides.map((guide) => (
              <GuideCard key={guide.href} {...guide} />
            ))}
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">관련 페이지 바로가기</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
            </Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">
              절세계좌 활용순서
            </Link>
            <Link href="/cal/calculator" className="bd-button-primary">
              배당 계산기
            </Link>
            <Link href="/cal/fire" className="bd-button-secondary">
              FIRE 계산기
            </Link>
            <Link href="/cal/capital-gains" className="bd-button-secondary">
              해외주식 양도세 계산기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
