import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "투자 기초 가이드 | 절세계좌·대출·배당 중심 | BlueDino",
  description:
    "절세계좌, 대출 판단, 배당 투자와 복리 전략 중심으로 재정렬한 BlueDino 투자 기초 가이드 모음",
};

const taxGuides = [
  {
    title: "ISA 계좌로 투자하면 뭐가 좋은가",
    description: "ISA의 핵심 혜택과 일반계좌 대비 어떤 차이가 있는지 쉽게 정리",
    href: "/info/guide/isa-benefits",
    badge: "ISA",
  },
  {
    title: "연금저축과 IRP 차이",
    description: "비슷해 보이지만 실제 활용 흐름이 다른 두 계좌를 목적 중심으로 비교",
    href: "/info/guide/pension-vs-irp",
    badge: "연금",
  },
  {
    title: "절세계좌를 먼저 써야 하는 이유",
    description: "같은 수익률이어도 세후 결과가 달라지는 핵심 이유를 설명",
    href: "/info/guide/why-tax-advantaged-accounts",
    badge: "절세전략",
  },
  {
    title: "손실이 났을 때 세금은 어떻게 되는가",
    description: "손실이라고 무조건 세금이 없는 것은 아니기 때문에 구조를 먼저 정리",
    href: "/info/guide/loss-tax",
    badge: "세금",
  },
];

const loanGuides = [
  {
    title: "장기투자와 단기투자의 차이",
    description: "투자 기간에 따라 필요한 태도와 리스크 관리 방식이 어떻게 달라지는지 정리",
    href: "/info/guide/long-vs-short-term",
    badge: "기간판단",
  },
  {
    title: "분산투자가 왜 중요한가",
    description: "수익을 늘리기보다 손실을 줄이는 관점에서 분산투자를 이해하는 가이드",
    href: "/info/guide/diversification",
    badge: "리스크",
  },
  {
    title: "초보자가 포트폴리오를 만들 때 흔한 실수",
    description: "좋아 보이는 자산을 모으는 것과 전략적으로 구성하는 것은 다릅니다",
    href: "/info/guide/portfolio-mistakes",
    badge: "포트폴리오",
  },
  {
    title: "FIRE 계산기를 어떻게 활용할까",
    description: "숫자만 입력하는 것이 아니라 생활비와 목표 자산의 관계를 읽는 방법",
    href: "/info/guide/fire-calculator-guide",
    badge: "현금흐름",
  },
];

const dividendGuides = [
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

function GuideSection({
  badge,
  title,
  description,
  items,
}: {
  badge: string;
  title: string;
  description: string;
  items: { title: string; description: string; href: string; badge: string }[];
}) {
  return (
    <section className="bd-section">
      <div>
        <span className="bd-badge">{badge}</span>
        <h2 className="bd-title-lg mt-4">{title}</h2>
        <p className="bd-text-sub mt-3">{description}</p>
      </div>
      <div className="bd-grid-2">
        {items.map((guide) => (
          <GuideCard key={guide.href} {...guide} />
        ))}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="bd-page">
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="bd-title-xl mt-4">절세계좌 · 대출 판단 · 배당 중심 투자 가이드</h1>
          <p className="bd-text-main mt-4">
            BlueDino의 투자 기초 가이드는 이제 절세계좌, 대출 판단, 배당이라는 실제 돈의 흐름에 가까운 세 축을 중심으로 다시 정리했습니다.
            계산기를 쓰기 전에 개념을 먼저 잡고 싶은 사람도, 이미 투자 중이지만 세후 수익률과 현금흐름 구조를 다시 정리하고 싶은 사람도 바로 필요한 주제로 이동할 수 있도록 구성했습니다.
          </p>
          <p className="bd-text-sub mt-3">
            세후 수익률을 결정하는 절세계좌, 고정비와 레버리지를 관리하는 대출 판단, 장기 현금흐름을 키우는 배당 전략 순으로 이어서 보면 사이트 전체 흐름이 더 자연스럽게 연결됩니다.
          </p>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">처음이라면 이 순서로 보세요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">절세계좌 먼저 보기: ISA 계좌 혜택 → 연금저축과 IRP 차이 → 절세계좌 활용순서</div>
            <div className="bd-list-item">대출 판단 연결하기: 분산과 리스크 관리 → 포트폴리오 실수 → FIRE 계산기 활용</div>
            <div className="bd-list-item">배당 흐름 확장하기: 배당 투자 기초 → 복리와 재투자 → 배당 계산기</div>
          </div>
        </section>

        <GuideSection
          badge="1순위"
          title="절세계좌 중심으로 먼저 보면 좋은 가이드"
          description="ISA, 연금저축, IRP처럼 세금 구조가 결과를 크게 바꾸는 주제를 먼저 배치했습니다."
          items={taxGuides}
        />

        <AdBlock />

        <GuideSection
          badge="2순위"
          title="대출 판단과 자산관리 감각을 잡는 가이드"
          description="대출 자체 설명만이 아니라 장기 판단, 리스크 관리, 현금흐름 관점에서 연결되는 콘텐츠를 묶었습니다."
          items={loanGuides}
        />

        <GuideSection
          badge="3순위"
          title="배당 · 복리 · 현금흐름 중심 가이드"
          description="배당 투자와 월분배, 복리 재투자를 실제 현금흐름 전략과 연결해 볼 수 있도록 재배치했습니다."
          items={dividendGuides}
        />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">관련 페이지 바로가기</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/finance" className="bd-button-secondary">
              금융 가이드 메인
            </Link>
            <Link href="/info/investment/account-tax" className="bd-button-secondary">
              계좌별 세금정보
            </Link>
            <Link href="/info/investment/account-tax-step" className="bd-button-secondary">
              절세계좌 활용순서
            </Link>
            <Link href="/cal/calculator" className="bd-button-primary">
              배당 계산기
            </Link>
            <Link href="/cal/loan-interest" className="bd-button-secondary">
              대출이자 계산기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
