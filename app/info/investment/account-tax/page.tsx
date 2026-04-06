"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export default function AccountTaxPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-6">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="mt-4 bd-title-lg">계좌별 세금정보</h1>
          <p className="mt-3 bd-text-sub">
            일반계좌, ISA, 연금저축·IRP 등 계좌 유형에 따라 원금 인출, 매매차익,
            배당·분배금의 과세 방식이 어떻게 달라지는지 한눈에 비교할 수 있도록 정리했습니다.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
            세후 수익률을 비교할 때 먼저 확인해두면 좋은 기준표입니다. 단, 실제 세율 적용과 인출 조건은
            개인 상황과 계좌 운용 방식에 따라 달라질 수 있습니다.
          </div>
        </section>

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">이 페이지를 어떻게 보면 좋을까요</h2>
          <div className="bd-list mt-4">
            <div className="bd-list-item">배당과 분배금을 많이 받는 투자자라면 먼저 일반계좌와 ISA의 차이를 확인합니다.</div>
            <div className="bd-list-item">연말정산과 세액공제가 중요하다면 연금저축과 IRP의 과세 구조를 따로 봅니다.</div>
            <div className="bd-list-item">해외주식 직접투자를 하고 있다면 양도소득세와 배당 원천징수 구조를 같이 확인해야 합니다.</div>
          </div>
        </section>

        <TaxCard
          title="국내주식 ETF"
          borderColor="border-emerald-500/30"
          titleColor="text-emerald-300"
          noteClassName="border border-amber-500/20 bg-amber-500/10 text-amber-100"
          note={
            <>
              연금 형태 외 수령 시 16.5% 기타소득세가 부과될 수 있습니다.
              <br />
              연금저축·IRP는 연금 수령 한도와 방식에 따라 실제 세금 체감이 달라질 수 있습니다.
            </>
          }
          rows={[
            ["일반계좌", "비과세", "비과세", "15.4%(배당소득세)"],
            [
              "연금저축 / IRP",
              "연금수령세액공제 O : 연금소득세(3.3~5.5%)세액공제 X : 비과세",
              "연금수령 세액공제 O : 연금소득세(3.3~5.5%)",
              "연금수령 세액공제 O : 연금소득세(3.3~5.5%)",
            ],
            [
              "ISA",
              "비과세 (만기 시 연금전환)",
              "비과세",
              "비과세 / 9.9% (200~400만원 비과세 한도)",
            ],
          ]}
        />

        <TaxCard
          title="국내상장 해외 ETF"
          borderColor="border-cyan-500/30"
          titleColor="text-cyan-300"
          noteClassName="border border-cyan-500/20 bg-cyan-500/10 text-cyan-100"
          note={
            <>
              ISA, 연금계좌 활용 시 절세 효과가 있을 수 있지만, 외국납부세액 크레딧 공제 같은 구조 때문에 실제 입금액이 생각과 다르게 느껴질 수 있습니다.
              <br />
              계좌별 세후 현금흐름을 비교할 때는 단순 세율만이 아니라 실제 수령 시점을 같이 보는 것이 좋습니다.
            </>
          }
          rows={[
            ["일반계좌", "비과세", 
              "15.4% (배당소득세)", 
              "15.4% (배당소득세)"],
            [
              "연금저축 / IRP",
              "연금수령 세액공제 O : 연금소득세(3.3~5.5%) 세액공제 X : 비과세",
              "연금수령 세액공제 O : 연금소득세(3.3~5.5%)",
              "15% (외국납부세액 크레딧 공제 적용)",
            ],
            [
              "ISA (중개형)",
              "비과세 (만기 시 연금 전환)",
              "비과세 / 9.9% (200~400만원 비과세 한도)",
              "15% (외국납부세액 크레딧 공제 적용)",
            ],
          ]}
        />

        <TaxCard
          title="해외주식 직투"
          borderColor="border-violet-500/30"
          titleColor="text-violet-300"
          noteClassName="border border-violet-500/20 bg-violet-500/10 text-violet-100"
          note={
            <>
              해외주식 직접투자는 일반계좌에서만 가능합니다.
              <br />
              매도 계획이 있다면 연간 손익 통산과 기본공제, 환율 반영 여부까지 함께 확인하는 것이 좋습니다.
            </>
          }
          rows={[["일반계좌", "비과세", 
            "22% (양도소득세 250만원 공제 후)", 
            "15% (현지 원천징수)"]]}
        />

        <section className="bd-card-soft bd-card-padding">
          <h2 className="bd-title-md">같이 보면 이해가 쉬운 페이지</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/info/investment/account-tax-step" className="bd-button-primary">절세계좌 활용순서</Link>
            <Link href="/finance/isa" className="bd-button-secondary">ISA 질문 가이드</Link>
            <Link href="/finance/irp" className="bd-button-secondary">IRP 질문 가이드</Link>
            <Link href="/finance/pension" className="bd-button-secondary">연금저축 질문 가이드</Link>
            <Link href="/cal/capital-gains" className="bd-button-secondary">양도세 계산기</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function TaxCard({
  title,
  borderColor,
  titleColor,
  rows,
  note,
  noteClassName,
}: {
  title: string;
  borderColor: string;
  titleColor: string;
  rows: string[][];
  note: ReactNode;
  noteClassName: string;
}) {
  return (
    <section className={`rounded-3xl border bg-slate-900/95 p-6 shadow-xl ${borderColor} text-slate-100`}>
      <h2 className={`mb-4 text-lg font-bold ${titleColor}`}>{title}</h2>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full min-w-[720px] text-sm text-slate-200">
          <thead className="bg-slate-950/80 text-slate-300">
            <tr>
              <th className="p-3 text-left font-semibold">계좌 구분</th>
              <th className="p-3 text-left font-semibold">원금 인출</th>
              <th className="p-3 text-left font-semibold">매매차익</th>
              <th className="p-3 text-left font-semibold">배당/분배금</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-800 align-top odd:bg-slate-900 even:bg-slate-950/40">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="whitespace-pre-line p-3 leading-6 text-slate-200">
                    {cell.startsWith("연금수령") ? (
                      <>
                        <strong className="font-semibold text-white">연금수령</strong>
                        {""}
                        {cell.replace("연금수령", "")}
                      </>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${noteClassName}`}>{note}</div>
    </section>
  );
}
