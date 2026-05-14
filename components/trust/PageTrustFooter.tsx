"use client";

import Link from "next/link";

export type TrustReference = {
  label: string;
  url?: string;
};

type PageTrustFooterProps = {
  /** 마지막 업데이트일 (ISO 또는 사람이 읽는 형태) */
  updatedAt?: string;
  /** 콘텐츠 기준 시점 — 예: "2026년 1월 기준". 미지정 시 updatedAt에서 자동 생성 */
  asOf?: string;
  /** 참고 자료 출처 목록 */
  references?: TrustReference[];
  /** 페이지 종류에 따른 짧은 카테고리 라벨 — 예: "ISA 가이드", "주담대 계산기" */
  pageKind?: string;
  /** 추가 안내 (선택) — 페이지별 특수 안내가 필요할 때 */
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

/**
 * 모든 핵심 페이지(가이드·전략·금융 질문·계산기·산업 허브) 하단에 동일하게 들어가는
 * 신뢰 푸터. 마지막 업데이트일·콘텐츠 기준 시점·참고 자료 출처·계산 기준·공식 확인 안내·
 * 투자 권유 아님 문구·작성자/검토 기준을 한 카드 안에 묶어 페이지마다 반복되는 메시지를
 * 일관되게 한 번만 노출한다.
 */
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
  const kind = pageKind ?? "BlueDino 콘텐츠";

  return (
    <section
      className="bd-card-soft bd-card-padding"
      aria-label="콘텐츠 신뢰 정보"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="bd-badge">신뢰 정보</span>
        <span className="text-xs text-slate-400">
          이 {kind}는 BlueDino 기준에 따라 작성·검토했습니다.
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            업데이트
          </div>
          <div className="mt-2 text-sm leading-7 text-slate-200">
            {updatedLabel ? (
              <>
                마지막 업데이트:{" "}
                <time dateTime={updatedAt} className="font-semibold text-white">
                  {updatedLabel}
                </time>
              </>
            ) : (
              <span className="text-slate-300">최근 정기 검수 완료.</span>
            )}
          </div>
          {asOfLabel ? (
            <div className="mt-2 text-xs leading-6 text-slate-400">
              본문은 {asOfLabel}으로 작성되었습니다. 세율·한도·금리 같은 제도성 수치는 공식 안내를 함께 확인해 주세요.
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            참고 출처
          </div>
          <ul className="mt-2 space-y-1 text-sm leading-7 text-slate-200">
            {refs.map((r) => (
              <li key={r.label} className="truncate">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-cyan-300 underline-offset-4 hover:underline"
                  >
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

      <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-amber-200">
          확인하고 활용해 주세요
        </div>
        <ul className="mt-2 space-y-1 text-sm leading-7 text-amber-50/90">
          <li>이 글은 특정 금융상품 가입이나 종목 매수·매도를 권유하지 않습니다.</li>
          <li>세율·한도·금리·정책 조건은 시점·개인 상황에 따라 달라질 수 있습니다.</li>
          <li>실제 실행 전에는 금융회사·세무 전문가·공공기관 자료로 한 번 더 확인해 주세요.</li>
          {extraNote ? <li>{extraNote}</li> : null}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span>작성·검토 기준:</span>
        <Link href="/info/etc/about" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">
          BlueDino 편집팀
        </Link>
        <span>·</span>
        <Link href="/info/etc/methodology" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">
          작성 기준
        </Link>
        <span>·</span>
        <Link href="/info/etc/editorial-policy" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">
          편집 원칙
        </Link>
        <span>·</span>
        <Link href="/info/etc/contact" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">
          오류 제보
        </Link>
      </div>
    </section>
  );
}
