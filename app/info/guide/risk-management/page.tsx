import type { Metadata } from "next";
import Link from "next/link";
import AdBlock from "@/components/ad/AdBlock";

export const metadata: Metadata = {
  title: "리스크 관리 기초",
  description: "손실 관리와 투자 지속 가능성을 위한 기본 원칙을 정리한 BlueDino 가이드",
};

export default function RiskManagementPage() {
  return (
    <div className="bd-page">
      <div className="bd-container-narrow bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">Risk Management</span>
          <h1 className="bd-title-lg mt-4">리스크 관리 기초</h1>
          <p className="bd-text-main mt-4">
            좋은 투자 전략은 높은 수익률만 보여주는 전략이 아니라, 손실 구간에서도 버틸 수 있는 전략입니다.
            리스크 관리는 수익률을 깎는 것이 아니라 투자 지속 가능성을 높이는 핵심입니다.
          </p>
        </section>

        <AdBlock label="리스크 관리 가이드 광고 영역" />

        <section className="bd-grid-2">
          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">왜 필요한가</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">손실이 커질수록 원금 회복에 더 오랜 시간이 걸립니다.</div>
              <div className="bd-list-item">심리적으로 흔들리면 좋은 전략도 끝까지 유지하기 어렵습니다.</div>
              <div className="bd-list-item">리스크를 관리해야 장기 복리 구조를 지킬 수 있습니다.</div>
            </div>
          </article>

          <article className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">기본 원칙</h2>
            <div className="bd-list mt-4">
              <div className="bd-list-item">한 종목 집중 비중이 지나치게 커지지 않도록 관리합니다.</div>
              <div className="bd-list-item">내가 감당 가능한 손실 범위를 먼저 정합니다.</div>
              <div className="bd-list-item">수익률만이 아니라 변동성과 현금 비중도 함께 관리합니다.</div>
            </div>
          </article>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <div className="mt-0 flex flex-wrap gap-3">
            <Link href="/info/guide/portfolio-basics" className="bd-button-primary">포트폴리오 기초</Link>
            <Link href="/info/etc/about" className="bd-button-secondary">사이트 소개 보기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
