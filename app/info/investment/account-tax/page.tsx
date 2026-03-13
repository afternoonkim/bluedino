"use client";

export default function AccountTaxPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-6">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">투자정보</span>
          <h1 className="mt-4 bd-title-lg">계좌별 세금정보</h1>
          <p className="mt-3 bd-text-sub">일반계좌, ISA, 연금저축·IRP 등 계좌 유형에 따라 원금 인출, 매매차익, 배당·분배금의 과세 방식이 어떻게 달라지는지 한눈에 비교할 수 있도록 정리했습니다.</p>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
            세후 수익률을 비교할 때 먼저 확인해두면 좋은 기준표입니다.
          </div>
        </section>

        <TaxCard
          title="📈 국내주식 ETF"
          borderColor="border-emerald-500/30"
          titleColor="text-emerald-300"
          noteClassName="border border-amber-500/20 bg-amber-500/10 text-amber-100"
          note={
            <>
              💥 연금 형태 외 수령 시 16.5% 기타소득세가 부과될 수 있습니다.
              <br />
              💥 연금저축/IRP는 1,500만원 초과 수령 시 16.5% 기타소득세 분리과세
              또는 종합소득세 신고 중 선택해야 합니다.
            </>
          }
          rows={[
            ["일반계좌", "비과세", "비과세", "15.4%\n(배당소득세)"],
            [
              "연금저축 / IRP",
              "연금수령\n세액공제 O : 연금소득세(3.3~5.5%)\n세액공제 X : 비과세",
              "연금수령\n세액공제 O : 연금소득세(3.3~5.5%)",
              "연금수령\n세액공제 O : 연금소득세(3.3~5.5%)",
            ],
            [
              "ISA",
              "비과세\n(만기 시 연금전환)",
              "비과세",
              "비과세 / 9.9%\n(200~400만원 비과세 한도)",
            ],
          ]}
        />

        <TaxCard
          title="🏛 국내상장 해외 ETF"
          borderColor="border-cyan-500/30"
          titleColor="text-cyan-300"
          noteClassName="border border-cyan-500/20 bg-cyan-500/10 text-cyan-100"
          note={
            <>
              📌 국내상장 해외 ETF는 계좌 유형에 따라 과세 방식이 달라집니다.
              ISA, 연금계좌 활용 시 절세 효과가 있습니다.
              <br />
              <br />* 외국납부세액 크레딧 공제 제도 : 국내상장 해외 ETF의
              배당/분배금은 원천징수국에 이미 약 15% 세금을 납부하므로, 국내
              절세계좌 내에서도 해당 비율만큼 차감 후 입금됩니다.
            </>
          }
          rows={[
            [
              "일반계좌",
              "비과세",
              "15.4%\n(배당소득세)",
              "15.4%\n(배당소득세)",
            ],
            [
              "연금저축 / IRP",
              "연금수령\n세액공제 O : 연금소득세(3.3~5.5%)\n세액공제 X : 비과세",
              "연금수령\n세액공제 O : 연금소득세(3.3~5.5%)",
              "15%\n(외국납부세액 크레딧 공제 적용)",
            ],
            [
              "ISA (중개형)",
              "비과세\n(만기 시 연금 전환)",
              "비과세 / 9.9%\n(200~400만원 비과세 한도)",
              "15%\n(외국납부세액 크레딧 공제 적용)",
            ],
          ]}
        />

        <TaxCard
          title="🌎 해외주식 직투"
          borderColor="border-violet-500/30"
          titleColor="text-violet-300"
          noteClassName="border border-violet-500/20 bg-violet-500/10 text-violet-100"
          note={
            <>
              💡 해외주식 직접 투자는 일반계좌에서만 가능합니다. 연 250만원
              공제를 활용하여 세금을 관리할 수 있습니다.
            </>
          }
          rows={[
            [
              "일반계좌",
              "비과세",
              "22%\n(양도소득세 250만원 공제 후)",
              "15%\n(현지 원천징수)",
            ],
          ]}
        />
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
  note: React.ReactNode;
  noteClassName: string;
}) {
  return (
    <section
      className={`rounded-3xl border bg-slate-900/95 p-6 shadow-xl ${borderColor} text-slate-100`}
    >
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
              <tr
                key={rowIndex}
                className="border-t border-slate-800 align-top odd:bg-slate-900 even:bg-slate-950/40"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="whitespace-pre-line p-3 leading-6 text-slate-200"
                  >
                    {cell.startsWith("연금수령") ? (
                      <>
                        <strong className="font-semibold text-white">
                          연금수령
                        </strong>
                        {"\n"}
                        {cell.replace("연금수령\n", "")}
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

      <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${noteClassName}`}>
        {note}
      </div>
    </section>
  );
}