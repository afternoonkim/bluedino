"use client";

import { usePathname } from "next/navigation";

type CompanyAnalysisUpdateNoticeProps = {
  updatedAt: string;
};

type CompanySnapshot = {
  updatedAt: string;
  headline: string;
  points: string[];
};

const FIRST_REFRESHED_AT = "2026-10-11";

const CURRENT_SNAPSHOTS: Record<string, CompanySnapshot> = {
  "005930": {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "HBM4 회복과 메모리 호황은 강하지만, 파운드리·모바일 수익성은 따로 봐야 합니다.",
    points: [
      "AI 메모리 수요와 메모리 공급 부족이 실적을 크게 끌어올리고 있으며 HBM4 출하 확대가 점유율 회복의 핵심 변수입니다.",
      "메모리 가격 상승 속도는 둔화될 수 있어 현재의 높은 이익률이 얼마나 오래 유지되는지 확인해야 합니다.",
      "파운드리 적자와 스마트폰·가전의 원가 부담은 메모리 호황과 분리해서 점검하는 편이 좋습니다.",
    ],
  },
  "000660": {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "HBM 선두 경쟁력에 더해 Solidigm의 기업용 SSD 가치가 새로운 평가 변수로 커졌습니다.",
    points: [
      "AI 서버용 HBM 수요가 여전히 핵심 성장축이며 삼성전자의 추격 속도와 HBM 점유율 변화가 가장 중요한 경쟁 변수입니다.",
      "Solidigm은 AI 데이터센터용 고용량 기업용 SSD 사업의 가치가 커지면서 별도 IPO 가능성까지 검토되고 있습니다.",
      "메모리 산업 특유의 공급 확대와 가격 사이클이 장기적으로는 가장 큰 변동 요인입니다.",
    ],
  },
  nvda: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI 가속기 선두 지위는 유지되고 있지만 이제는 GPU 수요뿐 아니라 전력·자금조달 병목도 같이 봐야 합니다.",
    points: [
      "빅테크의 AI 인프라 투자가 계속되는 동안 GPU와 네트워킹 수요가 실적의 핵심 동력입니다.",
      "데이터센터 전력 확보와 고객사의 대규모 자본조달이 AI 설비 증설 속도를 제한할 수 있는 새로운 병목으로 부상했습니다.",
      "압도적인 성장률만큼 높은 시장 기대가 반영돼 있어 실적 성장과 밸류에이션을 분리해서 확인해야 합니다.",
    ],
  },
  avgo: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "커스텀 AI 칩과 네트워킹이 GPU 중심의 AI 투자에서 두 번째 핵심 축으로 자리 잡고 있습니다.",
    points: [
      "Broadcom은 대형 클라우드 고객용 커스텀 AI 칩과 네트워킹 매출이 빠르게 확대되고 있습니다.",
      "회사는 2027~2028년 AI 칩 매출 전망을 크게 높였고 여러 대형 고객의 장기 AI 인프라 구축 계획을 확보했다고 밝혔습니다.",
      "Marvell 등 경쟁사의 커스텀 실리콘 확대와 고객별 투자 집행 속도는 함께 추적해야 합니다.",
    ],
  },
  amd: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI GPU 공급 확대가 본격화되면서 NVIDIA를 추격하는 속도와 공급망 확보가 핵심입니다.",
    points: [
      "AMD는 AI 수요에 대응하기 위해 2027년 칩 공급을 크게 늘릴 계획을 밝히며 CPU·GPU 생산능력 확보에 집중하고 있습니다.",
      "TSMC의 첨단 공정과 삼성전자·SK하이닉스 등 메모리 업체의 공급 확보가 성장 속도를 좌우합니다.",
      "시장 점유율 확대가 실제 마진과 현금흐름 개선으로 이어지는지 확인해야 합니다.",
    ],
  },
  mu: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "HBM과 DRAM 호황의 수혜가 크지만 공급 확대와 대만 생산 차질 가능성을 같이 볼 시점입니다.",
    points: [
      "AI 서버용 HBM과 메모리 공급 부족이 실적을 지지하고 있어 메모리 가격과 장기 공급계약이 핵심 지표입니다.",
      "대만 생산거점은 HBM·DRAM 공급망에서 중요하며 최근 노사 이슈가 잠재적 생산 차질 변수로 떠올랐습니다.",
      "메모리 호황이 장기화되더라도 신규 CAPEX가 늘면 이후 공급과잉 가능성이 다시 커질 수 있습니다.",
    ],
  },
  orcl: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI 클라우드 백로그는 빠르게 늘지만 성장의 대가로 늘어나는 부채와 현금소진을 함께 봐야 합니다.",
    points: [
      "OpenAI 등 대형 AI 고객의 컴퓨팅 수요가 Oracle Cloud의 수주잔고와 데이터센터 투자를 크게 끌어올리고 있습니다.",
      "대규모 설비투자와 함께 부채·증자 조달이 늘고 있어 매출 성장보다 현금흐름 회복 시점이 중요해졌습니다.",
      "데이터센터 프로젝트의 전력·부지 지연 가능성은 백로그가 실제 매출로 전환되는 속도에 영향을 줄 수 있습니다.",
    ],
  },
  pltr: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "미국 상업·정부 AI 매출이 동시에 고성장하는 가운데 높은 밸류에이션이 가장 큰 체크포인트입니다.",
    points: [
      "2026년 2분기 미국 상업 매출과 정부 매출이 모두 큰 폭으로 증가하며 AI 플랫폼 수요가 실적으로 연결되고 있습니다.",
      "대형 계약 증가와 높은 영업이익률은 강점이지만 현재 성장 기대가 주가에 얼마나 선반영됐는지 따로 판단해야 합니다.",
      "정부 계약 비중과 상업 부문의 장기 반복매출 전환 속도를 함께 추적하는 편이 좋습니다.",
    ],
  },
  vrt: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI 데이터센터의 전력·냉각 병목이 커지면서 단순 장비업체에서 전력 인프라 통합업체로 확장 중입니다.",
    points: [
      "AI 데이터센터의 고밀도 전력과 냉각 수요가 핵심 성장동력이며 회사는 2026년 이익 전망을 상향했습니다.",
      "마이크로그리드·전력제어 업체 인수를 통해 전력망 연결뿐 아니라 현장 전력공급까지 사업 범위를 넓히고 있습니다.",
      "데이터센터 건설 지연과 AI 인프라 투자 둔화가 수주 성장률에 미칠 영향은 계속 확인해야 합니다.",
    ],
  },
  gev: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "가스터빈과 전력망 장비 수요가 급증하며 AI 데이터센터 전력 수요의 직접 수혜가 실적으로 나타나고 있습니다.",
    points: [
      "2026년 2분기 주문은 전년 대비 크게 증가했고 Power·Electrification 사업의 수주잔고가 빠르게 확대됐습니다.",
      "데이터센터 관련 Electrification 주문이 늘면서 발전설비부터 송배전까지 통합 수혜 구조가 강화되고 있습니다.",
      "Wind 사업의 적자와 프로젝트 비용 부담은 강한 전력 사업과 분리해서 확인해야 합니다.",
    ],
  },
  ceg: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "빅테크와 장기 전력계약이 확대되면서 원전 운영사의 가치가 AI 데이터센터 전력 공급자로 재평가되고 있습니다.",
    points: [
      "Google과 약 3.59GW 규모의 장기 전력계약을 체결하며 데이터센터 전력 수요가 장기 매출 가시성으로 연결되고 있습니다.",
      "기존 원전의 출력 증대와 신규 투자로 발전량을 늘리는 전략이 핵심 성장축입니다.",
      "원전 규제·정비 일정과 대규모 투자 집행, 전력가격 변화는 장기 수익성에 영향을 줄 수 있습니다.",
    ],
  },
  rklb: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "Electron의 실행력과 달리 Neutron 일정은 다시 늦어질 가능성이 있어 두 사업을 분리해서 봐야 합니다.",
    points: [
      "소형발사체 Electron과 위성 시스템 사업은 현재 매출 기반을 만들고 있습니다.",
      "중형 재사용 로켓 Neutron은 회사의 장기 성장에서 가장 중요한 프로젝트지만 2026년 첫 비행 일정은 지연 가능성이 커졌습니다.",
      "Neutron 개발비와 일정 리스크가 향후 현금소진과 기업가치에 미치는 영향을 함께 확인해야 합니다.",
    ],
  },
  ionq: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "양자컴퓨팅 기술 기대에 더해 SkyWater 인수로 제조 역량까지 확보했지만 상용화 속도가 핵심입니다.",
    points: [
      "IonQ는 SkyWater 인수를 반영해 2026년 연간 매출 전망을 상향하며 하드웨어 제조 기반을 강화했습니다.",
      "양자 하드웨어·네트워크·파운드리를 묶은 수직 통합 전략이 기존 순수 소프트웨어형 양자기업과의 차별점입니다.",
      "현재 기업가치는 장기 상용화 기대를 크게 반영하므로 실제 고객 매출과 손실 축소 속도를 같이 봐야 합니다.",
    ],
  },
  lly: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "비만치료제 시장 선두를 유지하는 가운데 차세대 후보물질까지 성과를 내며 파이프라인 가치가 커졌습니다.",
    points: [
      "Zepbound·Mounjaro 성장에 더해 차세대 비만치료제 후보가 후기 임상에서 높은 체중감량 효과를 보였습니다.",
      "공급능력 증설과 글로벌 보험·급여 적용 범위가 실제 매출 성장 지속성을 좌우합니다.",
      "Novo Nordisk 등 경쟁사의 신약 출시와 가격 경쟁, 생산시설 투자비 증가를 함께 확인해야 합니다.",
    ],
  },
  "267260": {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI 데이터센터와 북미 전력망 투자로 변압기 수요가 구조적으로 늘면서 수주잔고와 증설이 핵심입니다.",
    points: [
      "북미 AI 데이터센터와 노후 전력망 교체 수요가 겹치며 초고압 변압기와 배전기기 주문이 강하게 이어지고 있습니다.",
      "회사는 2026년 수주 목표를 상향했고 울산과 미국 앨라배마 생산능력 확대를 진행하고 있습니다.",
      "높아진 밸류에이션과 납기 장기화, 신규 증설이 실제 매출로 전환되는 시점을 함께 봐야 합니다.",
    ],
  },
};

function formatUpdatedMonth(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getSnapshot(pathname: string | null) {
  if (!pathname) return null;

  return Object.entries(CURRENT_SNAPSHOTS).find(([ticker]) =>
    pathname.toLowerCase().includes(`-${ticker.toLowerCase().replace(/\./g, "-")}-stock-analysis`),
  )?.[1] ?? null;
}

export default function CompanyAnalysisUpdateNotice({ updatedAt }: CompanyAnalysisUpdateNoticeProps) {
  const pathname = usePathname();
  const snapshot = getSnapshot(pathname);
  const effectiveUpdatedAt = snapshot?.updatedAt ?? updatedAt;

  return (
    <section className="bd-card-soft bd-card-padding border-amber-400/20 bg-amber-400/5">
      <h2 className="bd-title-sm text-base font-semibold text-white">
        {snapshot ? "기업분석 최신 점검" : "기업분석 확인 안내"}
      </h2>
      <p className="bd-text-main mt-3">
        최종 점검: {formatUpdatedMonth(effectiveUpdatedAt)}
      </p>

      {snapshot ? (
        <>
          <p className="mt-3 text-sm font-semibold leading-6 text-amber-100">
            {snapshot.headline}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            {snapshot.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="bd-text-sub mt-4">
            이 영역은 최근 실적·공시·산업 변화에서 달라진 부분을 먼저 보여줍니다. 아래의 사업 구조와 장기 체크포인트도 함께 확인해 주세요.
          </p>
        </>
      ) : (
        <p className="bd-text-sub mt-3">
          기업 실적, 주가, 밸류에이션은 수시로 변동될 수 있으므로 투자 판단 전 최신 공시와 실적 자료를 함께 확인해 주세요.
        </p>
      )}
    </section>
  );
}
