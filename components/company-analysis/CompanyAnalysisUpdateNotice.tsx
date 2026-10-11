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
const SECOND_REFRESHED_AT = "2026-10-11";

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
      "미국 상업 매출과 정부 매출이 모두 큰 폭으로 증가하며 AI 플랫폼 수요가 실적으로 연결되고 있습니다.",
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
      "Power·Electrification 사업의 주문과 수주잔고가 빠르게 확대되고 있습니다.",
      "데이터센터 관련 전력망 투자가 늘면서 발전설비부터 송배전까지 통합 수혜 구조가 강화되고 있습니다.",
      "Wind 사업의 수익성과 프로젝트 비용 부담은 강한 전력 사업과 분리해서 확인해야 합니다.",
    ],
  },
  ceg: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "빅테크와 장기 전력계약이 확대되면서 원전 운영사의 가치가 AI 데이터센터 전력 공급자로 재평가되고 있습니다.",
    points: [
      "Google과 대규모 장기 전력계약을 체결하며 데이터센터 전력 수요가 장기 매출 가시성으로 연결되고 있습니다.",
      "기존 원전의 출력 증대와 신규 투자로 발전량을 늘리는 전략이 핵심 성장축입니다.",
      "원전 규제·정비 일정과 대규모 투자 집행, 전력가격 변화는 장기 수익성에 영향을 줄 수 있습니다.",
    ],
  },
  rklb: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "Electron의 실행력과 달리 Neutron 일정은 다시 늦어질 가능성이 있어 두 사업을 분리해서 봐야 합니다.",
    points: [
      "소형발사체 Electron과 위성 시스템 사업은 현재 매출 기반을 만들고 있습니다.",
      "중형 재사용 로켓 Neutron은 회사의 장기 성장에서 가장 중요한 프로젝트지만 첫 비행 일정의 지연 가능성이 핵심 변수입니다.",
      "Neutron 개발비와 일정 리스크가 향후 현금소진과 기업가치에 미치는 영향을 함께 확인해야 합니다.",
    ],
  },
  ionq: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "양자컴퓨팅 기술 기대에 더해 제조 역량 확대가 진행되고 있지만 상용화 속도가 핵심입니다.",
    points: [
      "양자 하드웨어와 네트워크 사업을 함께 확장하면서 매출 기반을 넓히고 있습니다.",
      "하드웨어·네트워크·제조 역량을 묶는 수직 통합 전략이 차별점입니다.",
      "현재 기업가치는 장기 상용화 기대를 크게 반영하므로 실제 고객 매출과 손실 축소 속도를 같이 봐야 합니다.",
    ],
  },
  lly: {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "비만치료제 시장 선두를 유지하는 가운데 차세대 후보물질까지 성과를 내며 파이프라인 가치가 커졌습니다.",
    points: [
      "Zepbound·Mounjaro 성장에 더해 차세대 비만치료제 후보의 후기 임상 결과가 파이프라인 기대를 높이고 있습니다.",
      "공급능력 증설과 글로벌 보험·급여 적용 범위가 실제 매출 성장 지속성을 좌우합니다.",
      "Novo Nordisk 등 경쟁사의 신약 출시와 가격 경쟁, 생산시설 투자비 증가를 함께 확인해야 합니다.",
    ],
  },
  "267260": {
    updatedAt: FIRST_REFRESHED_AT,
    headline: "AI 데이터센터와 북미 전력망 투자로 변압기 수요가 구조적으로 늘면서 수주잔고와 증설이 핵심입니다.",
    points: [
      "북미 AI 데이터센터와 노후 전력망 교체 수요가 겹치며 초고압 변압기와 배전기기 주문이 강하게 이어지고 있습니다.",
      "생산능력 확대가 진행되는 만큼 수주잔고가 실제 매출과 이익으로 전환되는 속도가 중요합니다.",
      "높아진 밸류에이션과 납기 장기화, 신규 증설의 수익성도 함께 봐야 합니다.",
    ],
  },
  "010120": {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "북미 AI 데이터센터용 초고압 변압기 수주가 이어지며 배전 중심 기업에서 송·배전 통합 공급자로 확장하고 있습니다.",
    points: [
      "최근 북미 하이퍼스케일 AI 데이터센터에 345kV 초고압 변압기를 공급하는 대형 계약을 확보해 장기 수주 가시성이 높아졌습니다.",
      "초고압 변압기뿐 아니라 배전반·차단기까지 데이터센터 전력설비 전 영역을 공급할 수 있다는 점이 핵심 경쟁력입니다.",
      "장기 납기와 공격적인 증설이 실제 매출·마진 개선으로 이어지는지 확인해야 합니다.",
    ],
  },
  "298040": {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "미국 빅테크 AI 데이터센터용 초고압 변압기 수주가 확대되며 북미 전력 인프라가 핵심 성장축이 됐습니다.",
    points: [
      "최근 미국 빅테크 고객을 대상으로 765kV·345kV 초고압 변압기 대규모 공급계약을 확보했습니다.",
      "AI 데이터센터와 노후 전력망 교체가 동시에 진행되면서 북미 수주잔고와 생산능력의 가치가 커지고 있습니다.",
      "높은 수주 성장 이후에는 원자재·인건비와 증설비용, 납기 관리가 마진을 좌우하는 핵심 변수입니다.",
    ],
  },
  "034020": {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "대형 원전·SMR·가스터빈이 동시에 성장축으로 부상하면서 AI 시대 전력 공급망의 핵심 장비업체로 재평가되고 있습니다.",
    points: [
      "TerraPower의 Natrium SMR을 포함한 해외 원전 프로젝트에서 핵심 기자재 공급 기회가 확대되고 있습니다.",
      "AI 데이터센터 전력 수요 증가가 원전뿐 아니라 가스터빈과 발전 서비스 수요에도 긍정적으로 작용할 수 있습니다.",
      "원전 프로젝트는 계약 규모가 크지만 인허가와 착공·납품 일정이 길기 때문에 수주와 실제 이익 인식 시점을 구분해서 봐야 합니다.",
    ],
  },
  "042700": {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "HBM용 장비 성장에 더해 삼성그룹과의 대규모 장비 거래가 재개되며 고객 다변화 가능성이 커졌습니다.",
    points: [
      "삼성전기로부터 반도체 후공정용 MSVP 장비 대규모 수주를 확보하며 오랜 기간 제한적이던 삼성그룹 거래가 다시 부각됐습니다.",
      "HBM용 TC 본더와 후공정 장비 수요는 AI 메모리 CAPEX 사이클의 직접적인 영향을 받습니다.",
      "특정 메모리 고객 의존도와 경쟁 장비업체의 점유율 확대 여부는 함께 확인해야 합니다.",
    ],
  },
  "007660": {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "AI 가속기와 서버용 고다층 PCB 공급 부족이 이어지며 증설 효과와 고부가 제품 믹스가 실적의 핵심이 됐습니다.",
    points: [
      "AI 서버·네트워크 장비용 고다층 PCB 수요가 빠르게 늘며 공급 부족과 판가 개선 환경이 이어지고 있습니다.",
      "대규모 증설 이후 생산능력 확대가 고부가 AI 제품 매출 증가로 연결되는지가 가장 중요한 실적 변수입니다.",
      "대형 고객 의존도와 AI 설비투자 사이클 둔화 가능성은 높은 성장 기대와 함께 점검해야 합니다.",
    ],
  },
  tsm: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "AI 수요가 첨단공정과 패키징 가동률을 끌어올리며 3분기 매출이 사상 최고치를 기록했습니다.",
    points: [
      "2026년 3분기 매출은 AI 관련 수요에 힘입어 전년 동기 대비 크게 증가하며 시장 전망을 웃돌았습니다.",
      "NVIDIA·AMD·Apple 등 주요 고객의 첨단공정 수요와 CoWoS 같은 첨단 패키징 공급능력이 성장 속도를 좌우합니다.",
      "미국 등 해외 팹 투자에 따른 비용 증가와 지정학적 리스크는 높은 가동률과 별도로 확인해야 합니다.",
    ],
  },
  asml: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "AI용 첨단 반도체 투자가 EUV 수요를 지지하는 가운데 High-NA에서 차세대 Hyper-NA까지 기술 로드맵이 이어지고 있습니다.",
    points: [
      "첨단 AI 칩 생산을 위한 EUV 노광장비 독점적 지위가 장기 경쟁력의 핵심입니다.",
      "High-NA EUV 도입이 진행되는 동시에 더 미세한 공정을 위한 Hyper-NA 기술 개발도 시작됐습니다.",
      "중국 수출규제와 고객사의 팹 투자 시점 변화는 수주와 매출 인식의 변동성을 키울 수 있습니다.",
    ],
  },
  mrvl: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "커스텀 AI 실리콘과 데이터센터 연결칩 수요가 급증하며 장기 매출 전망이 크게 상향됐습니다.",
    points: [
      "회사는 강한 AI 데이터센터 수요를 반영해 2028회계연도 매출 전망을 약 200억달러로 높였습니다.",
      "빅테크가 자체 AI 칩을 확대하면서 커스텀 실리콘과 고속 네트워킹이 핵심 성장동력이 되고 있습니다.",
      "Broadcom과의 경쟁, 대형 고객 집중도와 공격적인 장기 성장목표가 실제 수주로 전환되는 속도를 확인해야 합니다.",
    ],
  },
  alab: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "AI 랙 내부 연결 병목이 커지면서 PCIe·CXL·패브릭 스위치가 빠르게 성장하고 있습니다.",
    points: [
      "2026년 2분기 매출이 전년 동기 대비 두 배 이상 증가하며 AI 패브릭과 신호처리 제품 수요가 실적으로 확인됐습니다.",
      "Scorpio 패브릭 스위치가 예상보다 빠르게 핵심 제품군으로 성장하면서 단순 리타이머 업체에서 AI 연결 인프라 업체로 확장하고 있습니다.",
      "소수 하이퍼스케일 고객의 설계 채택 시점과 경쟁사의 유사 제품 출시가 높은 성장률 지속 여부를 좌우합니다.",
    ],
  },
  smci: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "AI 서버 수요는 강하지만 수출통제 관련 법적·거버넌스 리스크가 다시 중요한 할인 요인이 됐습니다.",
    points: [
      "NVIDIA 최신 GPU를 탑재한 서버 수요와 랙 단위 솔루션 확대는 여전히 핵심 성장동력입니다.",
      "회사와 연관된 인사들이 AI 서버의 대중국 불법 수출 사건에 연루되며 수출통제와 내부통제 리스크가 부각됐습니다.",
      "빠른 매출 성장뿐 아니라 마진, 재고, 회계·거버넌스 신뢰 회복을 함께 확인해야 합니다.",
    ],
  },
  nee: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "재생에너지 중심 유틸리티에서 대규모 AI 데이터센터용 전력 개발 사업자로 역할이 확대되고 있습니다.",
    points: [
      "Brookfield와 켄터키에서 최대 1.2GW급 데이터센터와 발전·저장설비를 함께 개발하는 대형 프로젝트를 추진하고 있습니다.",
      "가스발전과 배터리 저장장치를 데이터센터 부하와 결합하는 구조는 기존 재생에너지 중심 성장축을 넓혀줍니다.",
      "대규모 프로젝트의 자본조달 비용, 인허가와 실제 가동 시점은 장기 수익성에 중요한 변수입니다.",
    ],
  },
  etn: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "데이터센터 전력관리 수요와 전기화가 기록적인 매출 성장을 만들며 사업 포트폴리오가 전기 인프라 중심으로 더 선명해지고 있습니다.",
    points: [
      "2026년 2분기 매출이 사상 최고치를 기록했고 데이터센터가 주요 성장동력으로 언급됐습니다.",
      "Electrical Americas 중심의 유기적 성장과 전력관리 수요가 AI 데이터센터 증설의 직접 수혜로 이어지고 있습니다.",
      "강한 수요가 이미 밸류에이션에 반영된 만큼 수주잔고와 마진 확장이 지속되는지 확인해야 합니다.",
    ],
  },
  hims: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "비만치료제 접근성을 키우는 전략은 성장 기회지만 규제·법적 리스크와 수익성 변동이 커졌습니다.",
    points: [
      "GLP-1 체중감량 치료를 핵심 성장영역으로 확대하면서 브랜드 의약품과 자체 조제 옵션을 함께 다루고 있습니다.",
      "저가 조제형 비만치료제 전략은 고객 확대에 유리하지만 FDA 규제와 제약사와의 법적 갈등 위험을 동반합니다.",
      "최근 비용 증가와 사업 전환으로 수익성이 흔들린 만큼 회원 성장보다 마진과 현금흐름 회복을 같이 봐야 합니다.",
    ],
  },
  vktx: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "VK2735가 체중감량뿐 아니라 유지요법에서도 긍정적 데이터를 내며 비만치료제 경쟁력이 구체화되고 있습니다.",
    points: [
      "VK2735 유지요법 연구에서 격주·월 1회 투여로도 높은 체중감량 유지율을 보여 투약 편의성 가능성이 부각됐습니다.",
      "대형 제약사 제품과 달리 아직 임상단계 기업이므로 후기 임상 성공과 허가까지의 시간·자금이 핵심 변수입니다.",
      "비만치료제 시장의 가격 경쟁과 Lilly·Novo·Amgen 등 대형 경쟁사의 차세대 약물 성과를 함께 봐야 합니다.",
    ],
  },
  asts: {
    updatedAt: SECOND_REFRESHED_AT,
    headline: "일반 스마트폰을 위성과 직접 연결하는 D2D 시장이 커지는 가운데 상용 서비스 확대 속도와 경쟁이 핵심입니다.",
    points: [
      "Orange·Vodafone 계열 등 글로벌 통신사와의 협력을 통해 유럽을 포함한 direct-to-device 상용화 기반을 넓히고 있습니다.",
      "위성 발사와 지상망 구축이 계획대로 진행돼야 계약과 서비스 기대가 실제 매출로 전환될 수 있습니다.",
      "SpaceX Starlink Mobile이 주파수 확보와 규제 승인을 빠르게 확대하고 있어 경쟁 강도가 이전보다 크게 높아졌습니다.",
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
