"use client";

import Link from "next/link";

export type TrustReference = {
  label: string;
  url?: string;
};

type PageTrustFooterProps = {
  updatedAt?: string;
  asOf?: string;
  references?: TrustReference[];
  pageKind?: string;
  extraNote?: string;
};

const DEFAULT_REFERENCES: TrustReference[] = [
  { label: "국세청 홈택스", url: "https://www.hometax.go.kr" },
  { label: "금융감독원 금융상품통합비교공시", url: "https://finlife.fss.or.kr" },
  { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
];

function formatKoreanDate(input?: string): string {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

function formatAsOfYear(input?: string): string {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}년 기준`;
}

export default function PageTrustFooter({
  updatedAt,
  asOf,
  references,
  pageKind,
  extraNote,
}: PageTrustFooterProps) {
  const updatedLabel = formatKoreanDate(updatedAt);
  const asOfLabel = asOf ?? formatAsOfYear(updatedAt);
  const refs = references && references.length > 0 ? references : DEFAULT_REFERENCES;
  const kind = pageKind ?? "정보";

  return (
    <details className="bd-card-soft group" aria-label="출처와 정보 이용 안내">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-blue-300/50 md:px-5 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-semibold text-slate-200">출처·업데이트·이용 안내</span>
            {updatedLabel ? (
              <time dateTime={updatedAt} className="text-xs text-slate-500">최근 업데이트 {updatedLabel}</time>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">{kind}의 기준과 참고 출처가 필요할 때 확인하세요.</p>
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400 group-open:text-slate-200">
          <span className="group-open:hidden">보기</span>
          <span className="hidden group-open:inline">접기</span>
        </span>
      </summary>

      <div className="border-t border-slate-800 px-4 pb-5 pt-4 md:px-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold text-slate-400">정보 기준</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {updatedLabel ? <>마지막 업데이트: <span className="font-semibold text-white">{updatedLabel}</span></> : "최근 정기 검수 완료"}
            </p>
            {asOfLabel ? (
              <p className="mt-1 text-xs leading-5 text-slate-500">본문은 {asOfLabel}입니다. 세율·한도·금리처럼 바뀔 수 있는 수치는 공식 안내를 함께 확인해 주세요.</p>
            ) : null}
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-400">참고 출처</h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-300">
              {refs.map((r) => (
                <li key={r.label}>
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer noopener" className="text-blue-200 underline-offset-4 hover:underline">
                      {r.label}
                    </a>
                  ) : (
                    <span>{r.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-400">
          <p>이 정보는 특정 금융상품 가입이나 종목 매수·매도를 권유하지 않습니다. 실제 적용 전에는 금융회사·공공기관 등 최신 자료를 다시 확인해 주세요.</p>
          {extraNote ? <p className="mt-1">{extraNote}</p> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          <Link href="/info/etc/about" className="hover:text-slate-200">BlueDino 편집팀</Link>
          <Link href="/info/etc/methodology" className="hover:text-slate-200">작성 기준</Link>
          <Link href="/info/etc/editorial-policy" className="hover:text-slate-200">편집 원칙</Link>
          <Link href="/info/etc/contact" className="hover:text-slate-200">오류 제보</Link>
        </div>
      </div>
    </details>
  );
}
