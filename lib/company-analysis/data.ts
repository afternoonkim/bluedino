import { additionalGlobalCompanySeeds } from "./additionalGlobalSeeds";
import { additionalKoreaCompanySeeds } from "./additionalKoreaSeeds";
import type {
  CompanyAnalysisArticle,
  CompanyAnalysisMarket,
  CompanyAnalysisMarketConfig,
} from "./types";

type CompanySeed = {
  ticker: string;
  companyNameKo: string;
  companyNameEn: string;
  exchange: string;
  sector: string;
};

const PUBLISHED_AT = "2026-04-27";
const UPDATED_AT = "2026-04-27";

export const companyAnalysisMarkets: CompanyAnalysisMarketConfig[] = [
  {
    key: "korea",
    title: "국내기업 분석",
    shortTitle: "국내기업",
    description:
      "국내 주요 상장기업 500개의 사업 구조, 실적 흐름, 성장 포인트와 리스크를 사용자 관점에서 정리한 기업분석 모음입니다.",
    intro:
      "국내기업 분석은 단순히 오늘 주가가 올랐는지보다 매출이 어디서 나오고, 어떤 산업 변화가 기업 가치에 영향을 주는지 먼저 확인해야 합니다. BlueDino는 국내 주요 기업 500개를 사업 구조, 실적 변수, 리스크, 투자 체크포인트 중심으로 정리합니다.",
    badge: "국내 주요 500개",
    basePath: "/company-analysis/korea",
  },
  {
    key: "global",
    title: "해외기업 분석",
    shortTitle: "해외기업",
    description:
      "미국주식 주요 기업 1,000개의 사업 모델, 성장성, 경쟁 구도, 밸류에이션 부담과 장기 투자 체크포인트를 사용자 관점에서 정리한 기업분석 모음입니다.",
    intro:
      "해외기업 분석은 기업의 성장성뿐 아니라 환율, 글로벌 경쟁 구도, 금리, 규제, 산업 사이클까지 함께 봐야 합니다. BlueDino는 미국주식 주요 1,000개 기업을 처음 보는 사용자도 핵심 사업과 투자 전 확인할 부분을 빠르게 이해할 수 있도록 정리합니다.",
    badge: "미국주식 주요 1,000개",
    basePath: "/company-analysis/global",
  },
];

const koreaCompanySeeds: CompanySeed[] = [
  {
    "ticker": "005930",
    "companyNameKo": "삼성전자",
    "companyNameEn": "Samsung Electronics",
    "exchange": "KOSPI",
    "sector": "반도체 · 스마트폰 · 가전"
  },
  {
    "ticker": "000660",
    "companyNameKo": "SK하이닉스",
    "companyNameEn": "SK hynix",
    "exchange": "KOSPI",
    "sector": "반도체 · AI 메모리"
  },
  {
    "ticker": "373220",
    "companyNameKo": "LG에너지솔루션",
    "companyNameEn": "LG Energy Solution",
    "exchange": "KOSPI",
    "sector": "2차전지 · 배터리"
  },
  {
    "ticker": "207940",
    "companyNameKo": "삼성바이오로직스",
    "companyNameEn": "Samsung Biologics",
    "exchange": "KOSPI",
    "sector": "바이오 · 위탁생산"
  },
  {
    "ticker": "005380",
    "companyNameKo": "현대차",
    "companyNameEn": "Hyundai Motor",
    "exchange": "KOSPI",
    "sector": "자동차 · 전기차 · 모빌리티"
  },
  {
    "ticker": "000270",
    "companyNameKo": "기아",
    "companyNameEn": "Kia",
    "exchange": "KOSPI",
    "sector": "자동차 · 전기차"
  },
  {
    "ticker": "068270",
    "companyNameKo": "셀트리온",
    "companyNameEn": "Celltrion",
    "exchange": "KOSPI",
    "sector": "바이오 · 항체의약품"
  },
  {
    "ticker": "035420",
    "companyNameKo": "NAVER",
    "companyNameEn": "NAVER",
    "exchange": "KOSPI",
    "sector": "인터넷 · AI · 플랫폼"
  },
  {
    "ticker": "005935",
    "companyNameKo": "삼성전자우",
    "companyNameEn": "Samsung Electronics Preferred",
    "exchange": "KOSPI",
    "sector": "반도체 · 우선주"
  },
  {
    "ticker": "105560",
    "companyNameKo": "KB금융",
    "companyNameEn": "KB Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "055550",
    "companyNameKo": "신한지주",
    "companyNameEn": "Shinhan Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "005490",
    "companyNameKo": "POSCO홀딩스",
    "companyNameEn": "POSCO Holdings",
    "exchange": "KOSPI",
    "sector": "철강 · 2차전지 소재"
  },
  {
    "ticker": "012330",
    "companyNameKo": "현대모비스",
    "companyNameEn": "Hyundai Mobis",
    "exchange": "KOSPI",
    "sector": "자동차 부품 · 전장"
  },
  {
    "ticker": "051910",
    "companyNameKo": "LG화학",
    "companyNameEn": "LG Chem",
    "exchange": "KOSPI",
    "sector": "화학 · 배터리 소재"
  },
  {
    "ticker": "028260",
    "companyNameKo": "삼성물산",
    "companyNameEn": "Samsung C&T",
    "exchange": "KOSPI",
    "sector": "건설 · 상사 · 지주"
  },
  {
    "ticker": "035720",
    "companyNameKo": "카카오",
    "companyNameEn": "Kakao",
    "exchange": "KOSPI",
    "sector": "플랫폼 · 콘텐츠"
  },
  {
    "ticker": "006400",
    "companyNameKo": "삼성SDI",
    "companyNameEn": "Samsung SDI",
    "exchange": "KOSPI",
    "sector": "2차전지 · 전자재료"
  },
  {
    "ticker": "032830",
    "companyNameKo": "삼성생명",
    "companyNameEn": "Samsung Life Insurance",
    "exchange": "KOSPI",
    "sector": "보험 · 금융"
  },
  {
    "ticker": "086790",
    "companyNameKo": "하나금융지주",
    "companyNameEn": "Hana Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "000810",
    "companyNameKo": "삼성화재",
    "companyNameEn": "Samsung Fire & Marine Insurance",
    "exchange": "KOSPI",
    "sector": "손해보험"
  },
  {
    "ticker": "003670",
    "companyNameKo": "포스코퓨처엠",
    "companyNameEn": "POSCO Future M",
    "exchange": "KOSPI",
    "sector": "2차전지 소재 · 양극재"
  },
  {
    "ticker": "033780",
    "companyNameKo": "KT&G",
    "companyNameEn": "KT&G",
    "exchange": "KOSPI",
    "sector": "소비재 · 담배 · 건강기능식품"
  },
  {
    "ticker": "066570",
    "companyNameKo": "LG전자",
    "companyNameEn": "LG Electronics",
    "exchange": "KOSPI",
    "sector": "가전 · 전장 · TV"
  },
  {
    "ticker": "096770",
    "companyNameKo": "SK이노베이션",
    "companyNameEn": "SK Innovation",
    "exchange": "KOSPI",
    "sector": "정유 · 배터리"
  },
  {
    "ticker": "003550",
    "companyNameKo": "LG",
    "companyNameEn": "LG Corp",
    "exchange": "KOSPI",
    "sector": "지주회사 · 전자 · 화학"
  },
  {
    "ticker": "015760",
    "companyNameKo": "한국전력",
    "companyNameEn": "Korea Electric Power",
    "exchange": "KOSPI",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "034730",
    "companyNameKo": "SK",
    "companyNameEn": "SK Inc.",
    "exchange": "KOSPI",
    "sector": "지주회사 · 에너지 · ICT"
  },
  {
    "ticker": "011200",
    "companyNameKo": "HMM",
    "companyNameEn": "HMM",
    "exchange": "KOSPI",
    "sector": "해운 · 물류"
  },
  {
    "ticker": "017670",
    "companyNameKo": "SK텔레콤",
    "companyNameEn": "SK Telecom",
    "exchange": "KOSPI",
    "sector": "통신 · AI · 데이터센터"
  },
  {
    "ticker": "009150",
    "companyNameKo": "삼성전기",
    "companyNameEn": "Samsung Electro-Mechanics",
    "exchange": "KOSPI",
    "sector": "전자부품 · MLCC"
  },
  {
    "ticker": "018260",
    "companyNameKo": "삼성에스디에스",
    "companyNameEn": "Samsung SDS",
    "exchange": "KOSPI",
    "sector": "IT서비스 · 클라우드"
  },
  {
    "ticker": "316140",
    "companyNameKo": "우리금융지주",
    "companyNameEn": "Woori Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "010130",
    "companyNameKo": "고려아연",
    "companyNameEn": "Korea Zinc",
    "exchange": "KOSPI",
    "sector": "비철금속 · 소재"
  },
  {
    "ticker": "034020",
    "companyNameKo": "두산에너빌리티",
    "companyNameEn": "Doosan Enerbility",
    "exchange": "KOSPI",
    "sector": "원전 · 발전설비"
  },
  {
    "ticker": "030200",
    "companyNameKo": "KT",
    "companyNameEn": "KT Corp",
    "exchange": "KOSPI",
    "sector": "통신 · 미디어 · 클라우드"
  },
  {
    "ticker": "086280",
    "companyNameKo": "현대글로비스",
    "companyNameEn": "Hyundai Glovis",
    "exchange": "KOSPI",
    "sector": "물류 · 자동차 운송"
  },
  {
    "ticker": "024110",
    "companyNameKo": "기업은행",
    "companyNameEn": "Industrial Bank of Korea",
    "exchange": "KOSPI",
    "sector": "은행 · 중소기업 금융"
  },
  {
    "ticker": "011170",
    "companyNameKo": "롯데케미칼",
    "companyNameEn": "Lotte Chemical",
    "exchange": "KOSPI",
    "sector": "화학 · 소재"
  },
  {
    "ticker": "009540",
    "companyNameKo": "HD한국조선해양",
    "companyNameEn": "HD Korea Shipbuilding & Offshore Engineering",
    "exchange": "KOSPI",
    "sector": "조선 · 해양플랜트"
  },
  {
    "ticker": "010950",
    "companyNameKo": "S-Oil",
    "companyNameEn": "S-Oil",
    "exchange": "KOSPI",
    "sector": "정유 · 석유화학"
  },
  {
    "ticker": "000720",
    "companyNameKo": "현대건설",
    "companyNameEn": "Hyundai Engineering & Construction",
    "exchange": "KOSPI",
    "sector": "건설 · 인프라"
  },
  {
    "ticker": "138040",
    "companyNameKo": "메리츠금융지주",
    "companyNameEn": "Meritz Financial Group",
    "exchange": "KOSPI",
    "sector": "금융지주 · 보험"
  },
  {
    "ticker": "047050",
    "companyNameKo": "포스코인터내셔널",
    "companyNameEn": "POSCO International",
    "exchange": "KOSPI",
    "sector": "상사 · 에너지"
  },
  {
    "ticker": "402340",
    "companyNameKo": "SK스퀘어",
    "companyNameEn": "SK Square",
    "exchange": "KOSPI",
    "sector": "투자회사 · 반도체"
  },
  {
    "ticker": "042660",
    "companyNameKo": "한화오션",
    "companyNameEn": "Hanwha Ocean",
    "exchange": "KOSPI",
    "sector": "조선 · 방산"
  },
  {
    "ticker": "251270",
    "companyNameKo": "넷마블",
    "companyNameEn": "Netmarble",
    "exchange": "KOSPI",
    "sector": "게임 · 콘텐츠"
  },
  {
    "ticker": "352820",
    "companyNameKo": "하이브",
    "companyNameEn": "HYBE",
    "exchange": "KOSPI",
    "sector": "엔터테인먼트 · 팬덤 플랫폼"
  },
  {
    "ticker": "018880",
    "companyNameKo": "한온시스템",
    "companyNameEn": "Hanon Systems",
    "exchange": "KOSPI",
    "sector": "자동차 부품 · 열관리"
  },
  {
    "ticker": "011780",
    "companyNameKo": "금호석유",
    "companyNameEn": "Kumho Petrochemical",
    "exchange": "KOSPI",
    "sector": "화학 · 합성고무"
  },
  {
    "ticker": "271560",
    "companyNameKo": "오리온",
    "companyNameEn": "Orion",
    "exchange": "KOSPI",
    "sector": "음식료 · 제과"
  },
  {
    "ticker": "036570",
    "companyNameKo": "엔씨소프트",
    "companyNameEn": "NCSoft",
    "exchange": "KOSPI",
    "sector": "게임 · 온라인 콘텐츠"
  },
  {
    "ticker": "090430",
    "companyNameKo": "아모레퍼시픽",
    "companyNameEn": "Amorepacific",
    "exchange": "KOSPI",
    "sector": "화장품 · 소비재"
  },
  {
    "ticker": "267260",
    "companyNameKo": "HD현대일렉트릭",
    "companyNameEn": "HD Hyundai Electric",
    "exchange": "KOSPI",
    "sector": "전력기기 · 변압기"
  },
  {
    "ticker": "003490",
    "companyNameKo": "대한항공",
    "companyNameEn": "Korean Air",
    "exchange": "KOSPI",
    "sector": "항공 · 물류"
  },
  {
    "ticker": "006800",
    "companyNameKo": "미래에셋증권",
    "companyNameEn": "Mirae Asset Securities",
    "exchange": "KOSPI",
    "sector": "증권 · 자산관리"
  },
  {
    "ticker": "028050",
    "companyNameKo": "삼성E&A",
    "companyNameEn": "Samsung E&A",
    "exchange": "KOSPI",
    "sector": "플랜트 · 엔지니어링"
  },
  {
    "ticker": "010140",
    "companyNameKo": "삼성중공업",
    "companyNameEn": "Samsung Heavy Industries",
    "exchange": "KOSPI",
    "sector": "조선 · 해양플랜트"
  },
  {
    "ticker": "021240",
    "companyNameKo": "코웨이",
    "companyNameEn": "Coway",
    "exchange": "KOSPI",
    "sector": "렌탈 · 생활가전"
  },
  {
    "ticker": "016360",
    "companyNameKo": "삼성증권",
    "companyNameEn": "Samsung Securities",
    "exchange": "KOSPI",
    "sector": "증권 · 자산관리"
  },
  {
    "ticker": "004020",
    "companyNameKo": "현대제철",
    "companyNameEn": "Hyundai Steel",
    "exchange": "KOSPI",
    "sector": "철강 · 자동차강판"
  },
  {
    "ticker": "029780",
    "companyNameKo": "삼성카드",
    "companyNameEn": "Samsung Card",
    "exchange": "KOSPI",
    "sector": "카드 · 소비금융"
  },
  {
    "ticker": "010620",
    "companyNameKo": "HD현대미포",
    "companyNameEn": "HD Hyundai Mipo",
    "exchange": "KOSPI",
    "sector": "조선 · 선박"
  },
  {
    "ticker": "010120",
    "companyNameKo": "LS ELECTRIC",
    "companyNameEn": "LS ELECTRIC",
    "exchange": "KOSPI",
    "sector": "전력기기 · 자동화"
  },
  {
    "ticker": "047810",
    "companyNameKo": "한국항공우주",
    "companyNameEn": "Korea Aerospace Industries",
    "exchange": "KOSPI",
    "sector": "항공우주 · 방산"
  },
  {
    "ticker": "097950",
    "companyNameKo": "CJ제일제당",
    "companyNameEn": "CJ CheilJedang",
    "exchange": "KOSPI",
    "sector": "음식료 · 바이오"
  },
  {
    "ticker": "241560",
    "companyNameKo": "두산밥캣",
    "companyNameEn": "Doosan Bobcat",
    "exchange": "KOSPI",
    "sector": "건설기계 · 산업장비"
  },
  {
    "ticker": "000100",
    "companyNameKo": "유한양행",
    "companyNameEn": "Yuhan Corporation",
    "exchange": "KOSPI",
    "sector": "제약 · 바이오"
  },
  {
    "ticker": "006260",
    "companyNameKo": "LS",
    "companyNameEn": "LS Corp",
    "exchange": "KOSPI",
    "sector": "전선 · 전력 인프라"
  },
  {
    "ticker": "000150",
    "companyNameKo": "두산",
    "companyNameEn": "Doosan Corp",
    "exchange": "KOSPI",
    "sector": "지주회사 · 산업재"
  },
  {
    "ticker": "161390",
    "companyNameKo": "한국타이어앤테크놀로지",
    "companyNameEn": "Hankook Tire & Technology",
    "exchange": "KOSPI",
    "sector": "타이어 · 자동차부품"
  },
  {
    "ticker": "079550",
    "companyNameKo": "LIG넥스원",
    "companyNameEn": "LIG Nex1",
    "exchange": "KOSPI",
    "sector": "방산 · 미사일"
  },
  {
    "ticker": "078930",
    "companyNameKo": "GS",
    "companyNameEn": "GS Holdings",
    "exchange": "KOSPI",
    "sector": "에너지 · 지주회사"
  },
  {
    "ticker": "005830",
    "companyNameKo": "DB손해보험",
    "companyNameEn": "DB Insurance",
    "exchange": "KOSPI",
    "sector": "손해보험"
  },
  {
    "ticker": "030000",
    "companyNameKo": "제일기획",
    "companyNameEn": "Cheil Worldwide",
    "exchange": "KOSPI",
    "sector": "광고 · 마케팅"
  },
  {
    "ticker": "012450",
    "companyNameKo": "한화에어로스페이스",
    "companyNameEn": "Hanwha Aerospace",
    "exchange": "KOSPI",
    "sector": "방산 · 항공엔진"
  },
  {
    "ticker": "180640",
    "companyNameKo": "한진칼",
    "companyNameEn": "Hanjin KAL",
    "exchange": "KOSPI",
    "sector": "지주회사 · 항공"
  },
  {
    "ticker": "005940",
    "companyNameKo": "NH투자증권",
    "companyNameEn": "NH Investment & Securities",
    "exchange": "KOSPI",
    "sector": "증권 · IB"
  },
  {
    "ticker": "004990",
    "companyNameKo": "롯데지주",
    "companyNameEn": "Lotte Corp",
    "exchange": "KOSPI",
    "sector": "지주회사 · 유통"
  },
  {
    "ticker": "008770",
    "companyNameKo": "호텔신라",
    "companyNameEn": "Hotel Shilla",
    "exchange": "KOSPI",
    "sector": "면세점 · 호텔"
  },
  {
    "ticker": "000880",
    "companyNameKo": "한화",
    "companyNameEn": "Hanwha Corp",
    "exchange": "KOSPI",
    "sector": "화학 · 방산 · 지주"
  },
  {
    "ticker": "004170",
    "companyNameKo": "신세계",
    "companyNameEn": "Shinsegae",
    "exchange": "KOSPI",
    "sector": "백화점 · 유통"
  },
  {
    "ticker": "128940",
    "companyNameKo": "한미약품",
    "companyNameEn": "Hanmi Pharm",
    "exchange": "KOSPI",
    "sector": "제약 · 신약개발"
  },
  {
    "ticker": "001040",
    "companyNameKo": "CJ",
    "companyNameEn": "CJ Corp",
    "exchange": "KOSPI",
    "sector": "지주회사 · 식품 · 미디어"
  },
  {
    "ticker": "020150",
    "companyNameKo": "롯데에너지머티리얼즈",
    "companyNameEn": "Lotte Energy Materials",
    "exchange": "KOSPI",
    "sector": "2차전지 소재 · 동박"
  },
  {
    "ticker": "036460",
    "companyNameKo": "한국가스공사",
    "companyNameEn": "Korea Gas Corporation",
    "exchange": "KOSPI",
    "sector": "가스 · 에너지"
  },
  {
    "ticker": "071050",
    "companyNameKo": "한국금융지주",
    "companyNameEn": "Korea Investment Holdings",
    "exchange": "KOSPI",
    "sector": "증권 · 금융지주"
  },
  {
    "ticker": "006280",
    "companyNameKo": "녹십자",
    "companyNameEn": "GC Biopharma",
    "exchange": "KOSPI",
    "sector": "제약 · 혈액제제"
  },
  {
    "ticker": "047040",
    "companyNameKo": "대우건설",
    "companyNameEn": "Daewoo E&C",
    "exchange": "KOSPI",
    "sector": "건설 · 주택"
  },
  {
    "ticker": "081660",
    "companyNameKo": "휠라홀딩스",
    "companyNameEn": "Fila Holdings",
    "exchange": "KOSPI",
    "sector": "패션 · 브랜드"
  },
  {
    "ticker": "285130",
    "companyNameKo": "SK케미칼",
    "companyNameEn": "SK Chemicals",
    "exchange": "KOSPI",
    "sector": "화학 · 바이오 소재"
  },
  {
    "ticker": "271940",
    "companyNameKo": "일진하이솔루스",
    "companyNameEn": "Iljin Hysolus",
    "exchange": "KOSPI",
    "sector": "수소 · 저장용기"
  },
  {
    "ticker": "139480",
    "companyNameKo": "이마트",
    "companyNameEn": "E-Mart",
    "exchange": "KOSPI",
    "sector": "대형마트 · 유통"
  },
  {
    "ticker": "112610",
    "companyNameKo": "씨에스윈드",
    "companyNameEn": "CS Wind",
    "exchange": "KOSPI",
    "sector": "풍력 · 재생에너지"
  },
  {
    "ticker": "088350",
    "companyNameKo": "한화생명",
    "companyNameEn": "Hanwha Life Insurance",
    "exchange": "KOSPI",
    "sector": "생명보험"
  },
  {
    "ticker": "175330",
    "companyNameKo": "JB금융지주",
    "companyNameEn": "JB Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "001450",
    "companyNameKo": "현대해상",
    "companyNameEn": "Hyundai Marine & Fire Insurance",
    "exchange": "KOSPI",
    "sector": "손해보험"
  },
  {
    "ticker": "012750",
    "companyNameKo": "에스원",
    "companyNameEn": "S-1 Corporation",
    "exchange": "KOSPI",
    "sector": "보안 · 건물관리"
  },
  {
    "ticker": "000120",
    "companyNameKo": "CJ대한통운",
    "companyNameEn": "CJ Logistics",
    "exchange": "KOSPI",
    "sector": "물류 · 택배"
  },
  {
    "ticker": "003230",
    "companyNameKo": "삼양식품",
    "companyNameEn": "Samyang Foods",
    "exchange": "KOSPI",
    "sector": "음식료 · 라면"
  },
  {
    "ticker": "064350",
    "companyNameKo": "현대로템",
    "companyNameEn": "Hyundai Rotem",
    "exchange": "KOSPI",
    "sector": "방산 · 철도"
  },
  {
    "ticker": "192820",
    "companyNameKo": "코스맥스",
    "companyNameEn": "Cosmax",
    "exchange": "KOSPI",
    "sector": "화장품 ODM"
  },
  {
    "ticker": "014680",
    "companyNameKo": "한솔케미칼",
    "companyNameEn": "Hansol Chemical",
    "exchange": "KOSPI",
    "sector": "전자소재 · 화학"
  },
  {
    "ticker": "007070",
    "companyNameKo": "GS리테일",
    "companyNameEn": "GS Retail",
    "exchange": "KOSPI",
    "sector": "편의점 · 유통"
  },
  {
    "ticker": "069960",
    "companyNameKo": "현대백화점",
    "companyNameEn": "Hyundai Department Store",
    "exchange": "KOSPI",
    "sector": "백화점 · 유통"
  },
  {
    "ticker": "051900",
    "companyNameKo": "LG생활건강",
    "companyNameEn": "LG H&H",
    "exchange": "KOSPI",
    "sector": "화장품 · 생활용품"
  },
  {
    "ticker": "000240",
    "companyNameKo": "한국앤컴퍼니",
    "companyNameEn": "Hankook & Company",
    "exchange": "KOSPI",
    "sector": "지주회사 · 타이어"
  },
  {
    "ticker": "161890",
    "companyNameKo": "한국콜마",
    "companyNameEn": "Kolmar Korea",
    "exchange": "KOSPI",
    "sector": "화장품 ODM · 제약"
  },
  {
    "ticker": "138930",
    "companyNameKo": "BNK금융지주",
    "companyNameEn": "BNK Financial Group",
    "exchange": "KOSPI",
    "sector": "은행 · 금융지주"
  },
  {
    "ticker": "039490",
    "companyNameKo": "키움증권",
    "companyNameEn": "Kiwoom Securities",
    "exchange": "KOSPI",
    "sector": "증권 · 리테일 브로커리지"
  },
  {
    "ticker": "005387",
    "companyNameKo": "현대차2우B",
    "companyNameEn": "Hyundai Motor 2nd Preferred",
    "exchange": "KOSPI",
    "sector": "자동차 · 우선주"
  },
  {
    "ticker": "002790",
    "companyNameKo": "아모레G",
    "companyNameEn": "Amorepacific Group",
    "exchange": "KOSPI",
    "sector": "화장품 · 지주회사"
  },
  {
    "ticker": "001740",
    "companyNameKo": "SK네트웍스",
    "companyNameEn": "SK Networks",
    "exchange": "KOSPI",
    "sector": "렌탈 · 상사"
  },
  {
    "ticker": "007310",
    "companyNameKo": "오뚜기",
    "companyNameEn": "Ottogi",
    "exchange": "KOSPI",
    "sector": "음식료 · 가공식품"
  },
  {
    "ticker": "003410",
    "companyNameKo": "쌍용C&E",
    "companyNameEn": "Ssangyong C&E",
    "exchange": "KOSPI",
    "sector": "시멘트 · 건자재"
  },
  {
    "ticker": "000080",
    "companyNameKo": "하이트진로",
    "companyNameEn": "HiteJinro",
    "exchange": "KOSPI",
    "sector": "주류 · 음식료"
  },
  {
    "ticker": "004370",
    "companyNameKo": "농심",
    "companyNameEn": "Nongshim",
    "exchange": "KOSPI",
    "sector": "음식료 · 라면"
  },
  {
    "ticker": "008930",
    "companyNameKo": "한미사이언스",
    "companyNameEn": "Hanmi Science",
    "exchange": "KOSPI",
    "sector": "제약 지주회사"
  },
  {
    "ticker": "005850",
    "companyNameKo": "에스엘",
    "companyNameEn": "SL Corporation",
    "exchange": "KOSPI",
    "sector": "자동차 부품 · 램프"
  },
  {
    "ticker": "375500",
    "companyNameKo": "DL이앤씨",
    "companyNameEn": "DL E&C",
    "exchange": "KOSPI",
    "sector": "건설 · 플랜트"
  },
  {
    "ticker": "086520",
    "companyNameKo": "에코프로",
    "companyNameEn": "EcoPro",
    "exchange": "KOSDAQ",
    "sector": "2차전지 소재 · 지주"
  },
  {
    "ticker": "247540",
    "companyNameKo": "에코프로비엠",
    "companyNameEn": "EcoPro BM",
    "exchange": "KOSDAQ",
    "sector": "2차전지 소재 · 양극재"
  },
  {
    "ticker": "196170",
    "companyNameKo": "알테오젠",
    "companyNameEn": "Alteogen",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 플랫폼 기술"
  },
  {
    "ticker": "277810",
    "companyNameKo": "레인보우로보틱스",
    "companyNameEn": "Rainbow Robotics",
    "exchange": "KOSDAQ",
    "sector": "로봇 · 자동화"
  },
  {
    "ticker": "028300",
    "companyNameKo": "HLB",
    "companyNameEn": "HLB",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 항암제"
  },
  {
    "ticker": "000250",
    "companyNameKo": "삼천당제약",
    "companyNameEn": "SCD Pharm",
    "exchange": "KOSDAQ",
    "sector": "제약 · 바이오"
  },
  {
    "ticker": "214150",
    "companyNameKo": "클래시스",
    "companyNameEn": "Classys",
    "exchange": "KOSDAQ",
    "sector": "미용의료기기"
  },
  {
    "ticker": "039030",
    "companyNameKo": "이오테크닉스",
    "companyNameEn": "EO Technics",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "058470",
    "companyNameKo": "리노공업",
    "companyNameEn": "Leeno Industrial",
    "exchange": "KOSDAQ",
    "sector": "반도체 테스트 소켓"
  },
  {
    "ticker": "141080",
    "companyNameKo": "리가켐바이오",
    "companyNameEn": "LigaChem Biosciences",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 신약개발"
  },
  {
    "ticker": "214450",
    "companyNameKo": "파마리서치",
    "companyNameEn": "PharmaResearch",
    "exchange": "KOSDAQ",
    "sector": "의료미용 · 바이오"
  },
  {
    "ticker": "041510",
    "companyNameKo": "에스엠",
    "companyNameEn": "SM Entertainment",
    "exchange": "KOSDAQ",
    "sector": "엔터테인먼트"
  },
  {
    "ticker": "035760",
    "companyNameKo": "CJ ENM",
    "companyNameEn": "CJ ENM",
    "exchange": "KOSDAQ",
    "sector": "미디어 · 콘텐츠"
  },
  {
    "ticker": "145020",
    "companyNameKo": "휴젤",
    "companyNameEn": "Hugel",
    "exchange": "KOSDAQ",
    "sector": "미용의료 · 보툴리눔톡신"
  },
  {
    "ticker": "068760",
    "companyNameKo": "셀트리온제약",
    "companyNameEn": "Celltrion Pharm",
    "exchange": "KOSDAQ",
    "sector": "제약 · 바이오"
  },
  {
    "ticker": "112040",
    "companyNameKo": "위메이드",
    "companyNameEn": "Wemade",
    "exchange": "KOSDAQ",
    "sector": "게임 · 블록체인"
  },
  {
    "ticker": "293490",
    "companyNameKo": "카카오게임즈",
    "companyNameEn": "Kakao Games",
    "exchange": "KOSDAQ",
    "sector": "게임 · 콘텐츠"
  },
  {
    "ticker": "078600",
    "companyNameKo": "대주전자재료",
    "companyNameEn": "Daejoo Electronic Materials",
    "exchange": "KOSDAQ",
    "sector": "2차전지 소재"
  },
  {
    "ticker": "403870",
    "companyNameKo": "HPSP",
    "companyNameEn": "HPSP",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "357780",
    "companyNameKo": "솔브레인",
    "companyNameEn": "Soulbrain",
    "exchange": "KOSDAQ",
    "sector": "반도체 소재"
  },
  {
    "ticker": "240810",
    "companyNameKo": "원익IPS",
    "companyNameEn": "Wonik IPS",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "095340",
    "companyNameKo": "ISC",
    "companyNameEn": "ISC",
    "exchange": "KOSDAQ",
    "sector": "반도체 테스트 소켓"
  },
  {
    "ticker": "222800",
    "companyNameKo": "심텍",
    "companyNameEn": "Simmtech",
    "exchange": "KOSDAQ",
    "sector": "반도체 PCB"
  },
  {
    "ticker": "067310",
    "companyNameKo": "하나마이크론",
    "companyNameEn": "Hana Micron",
    "exchange": "KOSDAQ",
    "sector": "반도체 후공정"
  },
  {
    "ticker": "348370",
    "companyNameKo": "엔켐",
    "companyNameEn": "Enchem",
    "exchange": "KOSDAQ",
    "sector": "2차전지 전해액"
  },
  {
    "ticker": "263750",
    "companyNameKo": "펄어비스",
    "companyNameEn": "Pearl Abyss",
    "exchange": "KOSDAQ",
    "sector": "게임 · 콘텐츠"
  },
  {
    "ticker": "036930",
    "companyNameKo": "주성엔지니어링",
    "companyNameEn": "Jusung Engineering",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "074600",
    "companyNameKo": "원익QnC",
    "companyNameEn": "Wonik QnC",
    "exchange": "KOSDAQ",
    "sector": "반도체 소재 · 쿼츠"
  },
  {
    "ticker": "033640",
    "companyNameKo": "네패스",
    "companyNameEn": "Nepes",
    "exchange": "KOSDAQ",
    "sector": "반도체 패키징"
  },
  {
    "ticker": "101490",
    "companyNameKo": "에스앤에스텍",
    "companyNameEn": "S&S Tech",
    "exchange": "KOSDAQ",
    "sector": "반도체 소재 · 블랭크마스크"
  },
  {
    "ticker": "319660",
    "companyNameKo": "피에스케이",
    "companyNameEn": "PSK",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "322310",
    "companyNameKo": "오로스테크놀로지",
    "companyNameEn": "AUROS Technology",
    "exchange": "KOSDAQ",
    "sector": "반도체 계측장비"
  },
  {
    "ticker": "084370",
    "companyNameKo": "유진테크",
    "companyNameEn": "Eugene Technology",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "122870",
    "companyNameKo": "와이지엔터테인먼트",
    "companyNameEn": "YG Entertainment",
    "exchange": "KOSDAQ",
    "sector": "엔터테인먼트"
  },
  {
    "ticker": "035900",
    "companyNameKo": "JYP Ent.",
    "companyNameEn": "JYP Entertainment",
    "exchange": "KOSDAQ",
    "sector": "엔터테인먼트"
  },
  {
    "ticker": "067160",
    "companyNameKo": "SOOP",
    "companyNameEn": "SOOP",
    "exchange": "KOSDAQ",
    "sector": "인터넷 방송 · 플랫폼"
  },
  {
    "ticker": "376300",
    "companyNameKo": "디어유",
    "companyNameEn": "Dear U",
    "exchange": "KOSDAQ",
    "sector": "팬덤 플랫폼"
  },
  {
    "ticker": "215200",
    "companyNameKo": "메가스터디교육",
    "companyNameEn": "MegaStudyEdu",
    "exchange": "KOSDAQ",
    "sector": "교육 · 온라인 강의"
  },
  {
    "ticker": "096530",
    "companyNameKo": "씨젠",
    "companyNameEn": "Seegene",
    "exchange": "KOSDAQ",
    "sector": "진단키트 · 바이오"
  },
  {
    "ticker": "206650",
    "companyNameKo": "유바이오로직스",
    "companyNameEn": "EuBiologics",
    "exchange": "KOSDAQ",
    "sector": "백신 · 바이오"
  },
  {
    "ticker": "214370",
    "companyNameKo": "케어젠",
    "companyNameEn": "Caregen",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 펩타이드"
  },
  {
    "ticker": "237690",
    "companyNameKo": "에스티팜",
    "companyNameEn": "ST Pharm",
    "exchange": "KOSDAQ",
    "sector": "제약 CDMO"
  },
  {
    "ticker": "095700",
    "companyNameKo": "제넥신",
    "companyNameEn": "Genexine",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 신약개발"
  },
  {
    "ticker": "200130",
    "companyNameKo": "콜마비앤에이치",
    "companyNameEn": "Kolmar BNH",
    "exchange": "KOSDAQ",
    "sector": "건강기능식품"
  },
  {
    "ticker": "365340",
    "companyNameKo": "성일하이텍",
    "companyNameEn": "SungEel HiTech",
    "exchange": "KOSDAQ",
    "sector": "2차전지 재활용"
  },
  {
    "ticker": "121600",
    "companyNameKo": "나노신소재",
    "companyNameEn": "Advanced Nano Products",
    "exchange": "KOSDAQ",
    "sector": "2차전지 소재"
  },
  {
    "ticker": "095610",
    "companyNameKo": "테스",
    "companyNameEn": "TES",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "064760",
    "companyNameKo": "티씨케이",
    "companyNameEn": "TCK",
    "exchange": "KOSDAQ",
    "sector": "반도체 소재"
  },
  {
    "ticker": "278280",
    "companyNameKo": "천보",
    "companyNameEn": "Chunbo",
    "exchange": "KOSDAQ",
    "sector": "2차전지 소재"
  },
  {
    "ticker": "091700",
    "companyNameKo": "파트론",
    "companyNameEn": "Partron",
    "exchange": "KOSDAQ",
    "sector": "전자부품 · 카메라모듈"
  },
  {
    "ticker": "033500",
    "companyNameKo": "동성화인텍",
    "companyNameEn": "Dongsung Finetec",
    "exchange": "KOSDAQ",
    "sector": "LNG 보냉재"
  },
  {
    "ticker": "064550",
    "companyNameKo": "바이오니아",
    "companyNameEn": "Bioneer",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 분자진단"
  },
  {
    "ticker": "039200",
    "companyNameKo": "오스코텍",
    "companyNameEn": "Oscotec",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 신약개발"
  },
  {
    "ticker": "086900",
    "companyNameKo": "메디톡스",
    "companyNameEn": "Medytox",
    "exchange": "KOSDAQ",
    "sector": "미용의료 · 보툴리눔톡신"
  },
  {
    "ticker": "206640",
    "companyNameKo": "바디텍메드",
    "companyNameEn": "Boditech Med",
    "exchange": "KOSDAQ",
    "sector": "진단기기"
  },
  {
    "ticker": "290650",
    "companyNameKo": "엘앤씨바이오",
    "companyNameEn": "L&C Bio",
    "exchange": "KOSDAQ",
    "sector": "의료기기 · 재생의료"
  },
  {
    "ticker": "140860",
    "companyNameKo": "파크시스템스",
    "companyNameEn": "Park Systems",
    "exchange": "KOSDAQ",
    "sector": "원자현미경 · 장비"
  },
  {
    "ticker": "089030",
    "companyNameKo": "테크윙",
    "companyNameEn": "Techwing",
    "exchange": "KOSDAQ",
    "sector": "반도체 검사장비"
  },
  {
    "ticker": "183300",
    "companyNameKo": "코미코",
    "companyNameEn": "KoMiCo",
    "exchange": "KOSDAQ",
    "sector": "반도체 세정 · 코팅"
  },
  {
    "ticker": "039440",
    "companyNameKo": "에스티아이",
    "companyNameEn": "STI",
    "exchange": "KOSDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "095500",
    "companyNameKo": "미래나노텍",
    "companyNameEn": "Mirae Nanotech",
    "exchange": "KOSDAQ",
    "sector": "디스플레이 · 2차전지 소재"
  },
  {
    "ticker": "036830",
    "companyNameKo": "솔브레인홀딩스",
    "companyNameEn": "Soulbrain Holdings",
    "exchange": "KOSDAQ",
    "sector": "지주회사 · 소재"
  },
  {
    "ticker": "215000",
    "companyNameKo": "골프존",
    "companyNameEn": "Golfzon",
    "exchange": "KOSDAQ",
    "sector": "골프 플랫폼"
  },
  {
    "ticker": "091120",
    "companyNameKo": "이녹스첨단소재",
    "companyNameEn": "INNOX Advanced Materials",
    "exchange": "KOSDAQ",
    "sector": "디스플레이 소재"
  },
  {
    "ticker": "025900",
    "companyNameKo": "동화기업",
    "companyNameEn": "Dongwha Enterprise",
    "exchange": "KOSDAQ",
    "sector": "목재 · 2차전지 소재"
  },
  {
    "ticker": "060250",
    "companyNameKo": "NHN KCP",
    "companyNameEn": "NHN KCP",
    "exchange": "KOSDAQ",
    "sector": "결제 · 핀테크"
  },
  {
    "ticker": "122990",
    "companyNameKo": "와이솔",
    "companyNameEn": "Wisol",
    "exchange": "KOSDAQ",
    "sector": "통신부품"
  },
  {
    "ticker": "041190",
    "companyNameKo": "우리기술투자",
    "companyNameEn": "Woori Technology Investment",
    "exchange": "KOSDAQ",
    "sector": "벤처투자 · 핀테크"
  },
  {
    "ticker": "048410",
    "companyNameKo": "현대바이오",
    "companyNameEn": "Hyundai Bioscience",
    "exchange": "KOSDAQ",
    "sector": "바이오 · 신약개발"
  },
  {
    "ticker": "005420",
    "companyNameKo": "코스모화학",
    "companyNameEn": "Cosmo Chemical",
    "exchange": "KOSPI",
    "sector": "화학 · 2차전지 소재"
  },
  {
    "ticker": "005070",
    "companyNameKo": "코스모신소재",
    "companyNameEn": "Cosmo AM&T",
    "exchange": "KOSPI",
    "sector": "2차전지 소재 · 양극재"
  },
  {
    "ticker": "298050",
    "companyNameKo": "효성첨단소재",
    "companyNameEn": "Hyosung Advanced Materials",
    "exchange": "KOSPI",
    "sector": "첨단소재 · 탄소섬유"
  },
  {
    "ticker": "298020",
    "companyNameKo": "효성티앤씨",
    "companyNameEn": "Hyosung TNC",
    "exchange": "KOSPI",
    "sector": "섬유 · 스판덱스"
  },
  {
    "ticker": "298040",
    "companyNameKo": "효성중공업",
    "companyNameEn": "Hyosung Heavy Industries",
    "exchange": "KOSPI",
    "sector": "전력기기 · 건설"
  },
  {
    "ticker": "004000",
    "companyNameKo": "롯데정밀화학",
    "companyNameEn": "Lotte Fine Chemical",
    "exchange": "KOSPI",
    "sector": "정밀화학 · 소재"
  },
  {
    "ticker": "014820",
    "companyNameKo": "동원시스템즈",
    "companyNameEn": "Dongwon Systems",
    "exchange": "KOSPI",
    "sector": "포장재 · 2차전지 소재"
  },
  {
    "ticker": "009830",
    "companyNameKo": "한화솔루션",
    "companyNameEn": "Hanwha Solutions",
    "exchange": "KOSPI",
    "sector": "태양광 · 화학"
  },
  {
    "ticker": "272210",
    "companyNameKo": "한화시스템",
    "companyNameEn": "Hanwha Systems",
    "exchange": "KOSPI",
    "sector": "방산 · ICT"
  },
  {
    "ticker": "006360",
    "companyNameKo": "GS건설",
    "companyNameEn": "GS Engineering & Construction",
    "exchange": "KOSPI",
    "sector": "건설 · 주택"
  },
  {
    "ticker": "051600",
    "companyNameKo": "한전KPS",
    "companyNameEn": "KEPCO Plant Service",
    "exchange": "KOSPI",
    "sector": "발전정비 · 원전"
  },
  {
    "ticker": "052690",
    "companyNameKo": "한전기술",
    "companyNameEn": "KEPCO Engineering & Construction",
    "exchange": "KOSPI",
    "sector": "원전 · 발전설계"
  }
];

const globalCompanySeeds: CompanySeed[] = [
  {
    "ticker": "NVDA",
    "companyNameKo": "엔비디아",
    "companyNameEn": "NVIDIA",
    "exchange": "NASDAQ",
    "sector": "AI 반도체 · 데이터센터"
  },
  {
    "ticker": "AAPL",
    "companyNameKo": "애플",
    "companyNameEn": "Apple",
    "exchange": "NASDAQ",
    "sector": "스마트폰 · 서비스 · 플랫폼"
  },
  {
    "ticker": "MSFT",
    "companyNameKo": "마이크로소프트",
    "companyNameEn": "Microsoft",
    "exchange": "NASDAQ",
    "sector": "클라우드 · 소프트웨어 · AI"
  },
  {
    "ticker": "GOOGL",
    "companyNameKo": "알파벳 A",
    "companyNameEn": "Alphabet Class A",
    "exchange": "NASDAQ",
    "sector": "검색 · 광고 · 클라우드"
  },
  {
    "ticker": "GOOG",
    "companyNameKo": "알파벳 C",
    "companyNameEn": "Alphabet Class C",
    "exchange": "NASDAQ",
    "sector": "검색 · 광고 · 클라우드"
  },
  {
    "ticker": "AMZN",
    "companyNameKo": "아마존",
    "companyNameEn": "Amazon",
    "exchange": "NASDAQ",
    "sector": "이커머스 · 클라우드"
  },
  {
    "ticker": "META",
    "companyNameKo": "메타 플랫폼스",
    "companyNameEn": "Meta Platforms",
    "exchange": "NASDAQ",
    "sector": "SNS · 광고 · AI"
  },
  {
    "ticker": "AVGO",
    "companyNameKo": "브로드컴",
    "companyNameEn": "Broadcom",
    "exchange": "NASDAQ",
    "sector": "반도체 · 인프라 소프트웨어"
  },
  {
    "ticker": "TSLA",
    "companyNameKo": "테슬라",
    "companyNameEn": "Tesla",
    "exchange": "NASDAQ",
    "sector": "전기차 · 에너지"
  },
  {
    "ticker": "WMT",
    "companyNameKo": "월마트",
    "companyNameEn": "Walmart",
    "exchange": "NYSE",
    "sector": "유통 · 소비재"
  },
  {
    "ticker": "BRK.B",
    "companyNameKo": "버크셔 해서웨이 B",
    "companyNameEn": "Berkshire Hathaway Class B",
    "exchange": "NYSE",
    "sector": "보험 · 투자지주"
  },
  {
    "ticker": "LLY",
    "companyNameKo": "일라이 릴리",
    "companyNameEn": "Eli Lilly",
    "exchange": "NYSE",
    "sector": "제약 · 비만치료제"
  },
  {
    "ticker": "JPM",
    "companyNameKo": "제이피모간체이스",
    "companyNameEn": "JPMorgan Chase",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "V",
    "companyNameKo": "비자",
    "companyNameEn": "Visa",
    "exchange": "NYSE",
    "sector": "결제 네트워크"
  },
  {
    "ticker": "MA",
    "companyNameKo": "마스터카드",
    "companyNameEn": "Mastercard",
    "exchange": "NYSE",
    "sector": "결제 네트워크"
  },
  {
    "ticker": "XOM",
    "companyNameKo": "엑슨모빌",
    "companyNameEn": "Exxon Mobil",
    "exchange": "NYSE",
    "sector": "에너지 · 석유"
  },
  {
    "ticker": "UNH",
    "companyNameKo": "유나이티드헬스",
    "companyNameEn": "UnitedHealth Group",
    "exchange": "NYSE",
    "sector": "헬스케어 · 보험"
  },
  {
    "ticker": "COST",
    "companyNameKo": "코스트코",
    "companyNameEn": "Costco Wholesale",
    "exchange": "NASDAQ",
    "sector": "창고형 유통"
  },
  {
    "ticker": "HD",
    "companyNameKo": "홈디포",
    "companyNameEn": "Home Depot",
    "exchange": "NYSE",
    "sector": "주택개선 · 유통"
  },
  {
    "ticker": "PG",
    "companyNameKo": "프록터앤드갬블",
    "companyNameEn": "Procter & Gamble",
    "exchange": "NYSE",
    "sector": "필수소비재"
  },
  {
    "ticker": "ORCL",
    "companyNameKo": "오라클",
    "companyNameEn": "Oracle",
    "exchange": "NYSE",
    "sector": "데이터베이스 · 클라우드"
  },
  {
    "ticker": "JNJ",
    "companyNameKo": "존슨앤드존슨",
    "companyNameEn": "Johnson & Johnson",
    "exchange": "NYSE",
    "sector": "헬스케어 · 제약"
  },
  {
    "ticker": "ABBV",
    "companyNameKo": "애브비",
    "companyNameEn": "AbbVie",
    "exchange": "NYSE",
    "sector": "제약 · 면역질환"
  },
  {
    "ticker": "BAC",
    "companyNameKo": "뱅크오브아메리카",
    "companyNameEn": "Bank of America",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "KO",
    "companyNameKo": "코카콜라",
    "companyNameEn": "Coca-Cola",
    "exchange": "NYSE",
    "sector": "음료 · 필수소비재"
  },
  {
    "ticker": "NFLX",
    "companyNameKo": "넷플릭스",
    "companyNameEn": "Netflix",
    "exchange": "NASDAQ",
    "sector": "스트리밍 · 콘텐츠"
  },
  {
    "ticker": "CRM",
    "companyNameKo": "세일즈포스",
    "companyNameEn": "Salesforce",
    "exchange": "NYSE",
    "sector": "기업용 소프트웨어"
  },
  {
    "ticker": "AMD",
    "companyNameKo": "AMD",
    "companyNameEn": "Advanced Micro Devices",
    "exchange": "NASDAQ",
    "sector": "반도체 · AI 가속기"
  },
  {
    "ticker": "PEP",
    "companyNameKo": "펩시코",
    "companyNameEn": "PepsiCo",
    "exchange": "NASDAQ",
    "sector": "음료 · 스낵"
  },
  {
    "ticker": "TMO",
    "companyNameKo": "써모 피셔 사이언티픽",
    "companyNameEn": "Thermo Fisher Scientific",
    "exchange": "NYSE",
    "sector": "생명과학 장비"
  },
  {
    "ticker": "ADBE",
    "companyNameKo": "어도비",
    "companyNameEn": "Adobe",
    "exchange": "NASDAQ",
    "sector": "소프트웨어 · 크리에이티브"
  },
  {
    "ticker": "CSCO",
    "companyNameKo": "시스코",
    "companyNameEn": "Cisco Systems",
    "exchange": "NASDAQ",
    "sector": "네트워크 장비"
  },
  {
    "ticker": "LIN",
    "companyNameKo": "린데",
    "companyNameEn": "Linde",
    "exchange": "NASDAQ",
    "sector": "산업가스"
  },
  {
    "ticker": "WFC",
    "companyNameKo": "웰스파고",
    "companyNameEn": "Wells Fargo",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "MCD",
    "companyNameKo": "맥도날드",
    "companyNameEn": "McDonald's",
    "exchange": "NYSE",
    "sector": "외식 · 프랜차이즈"
  },
  {
    "ticker": "ABT",
    "companyNameKo": "애보트 래버러토리스",
    "companyNameEn": "Abbott Laboratories",
    "exchange": "NYSE",
    "sector": "의료기기 · 헬스케어"
  },
  {
    "ticker": "GE",
    "companyNameKo": "GE 에어로스페이스",
    "companyNameEn": "GE Aerospace",
    "exchange": "NYSE",
    "sector": "항공엔진 · 산업재"
  },
  {
    "ticker": "ACN",
    "companyNameKo": "액센츄어",
    "companyNameEn": "Accenture",
    "exchange": "NYSE",
    "sector": "IT컨설팅 · 디지털전환"
  },
  {
    "ticker": "QCOM",
    "companyNameKo": "퀄컴",
    "companyNameEn": "Qualcomm",
    "exchange": "NASDAQ",
    "sector": "모바일 반도체"
  },
  {
    "ticker": "INTU",
    "companyNameKo": "인튜이트",
    "companyNameEn": "Intuit",
    "exchange": "NASDAQ",
    "sector": "세무 · 회계 소프트웨어"
  },
  {
    "ticker": "TXN",
    "companyNameKo": "텍사스 인스트루먼트",
    "companyNameEn": "Texas Instruments",
    "exchange": "NASDAQ",
    "sector": "아날로그 반도체"
  },
  {
    "ticker": "IBM",
    "companyNameKo": "IBM",
    "companyNameEn": "International Business Machines",
    "exchange": "NYSE",
    "sector": "IT서비스 · 하이브리드 클라우드"
  },
  {
    "ticker": "DIS",
    "companyNameKo": "월트디즈니",
    "companyNameEn": "Walt Disney",
    "exchange": "NYSE",
    "sector": "미디어 · 테마파크"
  },
  {
    "ticker": "AMAT",
    "companyNameKo": "어플라이드 머티리얼즈",
    "companyNameEn": "Applied Materials",
    "exchange": "NASDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "VZ",
    "companyNameKo": "버라이즌",
    "companyNameEn": "Verizon Communications",
    "exchange": "NYSE",
    "sector": "통신 · 5G"
  },
  {
    "ticker": "DHR",
    "companyNameKo": "다나허",
    "companyNameEn": "Danaher",
    "exchange": "NYSE",
    "sector": "생명과학 · 진단"
  },
  {
    "ticker": "PM",
    "companyNameKo": "필립모리스",
    "companyNameEn": "Philip Morris International",
    "exchange": "NYSE",
    "sector": "담배 · 니코틴"
  },
  {
    "ticker": "NOW",
    "companyNameKo": "서비스나우",
    "companyNameEn": "ServiceNow",
    "exchange": "NYSE",
    "sector": "기업용 소프트웨어"
  },
  {
    "ticker": "CAT",
    "companyNameKo": "캐터필러",
    "companyNameEn": "Caterpillar",
    "exchange": "NYSE",
    "sector": "건설기계 · 산업재"
  },
  {
    "ticker": "NEE",
    "companyNameKo": "넥스트에라 에너지",
    "companyNameEn": "NextEra Energy",
    "exchange": "NYSE",
    "sector": "전력 · 재생에너지"
  },
  {
    "ticker": "UBER",
    "companyNameKo": "우버",
    "companyNameEn": "Uber Technologies",
    "exchange": "NYSE",
    "sector": "모빌리티 · 플랫폼"
  },
  {
    "ticker": "INTC",
    "companyNameKo": "인텔",
    "companyNameEn": "Intel",
    "exchange": "NASDAQ",
    "sector": "반도체 · CPU"
  },
  {
    "ticker": "RTX",
    "companyNameKo": "RTX",
    "companyNameEn": "RTX Corporation",
    "exchange": "NYSE",
    "sector": "방산 · 항공"
  },
  {
    "ticker": "ISRG",
    "companyNameKo": "인튜이티브 서지컬",
    "companyNameEn": "Intuitive Surgical",
    "exchange": "NASDAQ",
    "sector": "수술로봇 · 의료기기"
  },
  {
    "ticker": "AMGN",
    "companyNameKo": "암젠",
    "companyNameEn": "Amgen",
    "exchange": "NASDAQ",
    "sector": "바이오 · 의약품"
  },
  {
    "ticker": "PFE",
    "companyNameKo": "화이자",
    "companyNameEn": "Pfizer",
    "exchange": "NYSE",
    "sector": "제약 · 백신"
  },
  {
    "ticker": "SPGI",
    "companyNameKo": "S&P 글로벌",
    "companyNameEn": "S&P Global",
    "exchange": "NYSE",
    "sector": "금융데이터 · 지수"
  },
  {
    "ticker": "HON",
    "companyNameKo": "허니웰",
    "companyNameEn": "Honeywell",
    "exchange": "NASDAQ",
    "sector": "산업자동화 · 항공"
  },
  {
    "ticker": "GS",
    "companyNameKo": "골드만삭스",
    "companyNameEn": "Goldman Sachs",
    "exchange": "NYSE",
    "sector": "투자은행 · 금융"
  },
  {
    "ticker": "CMCSA",
    "companyNameKo": "컴캐스트",
    "companyNameEn": "Comcast",
    "exchange": "NASDAQ",
    "sector": "미디어 · 통신"
  },
  {
    "ticker": "UNP",
    "companyNameKo": "유니온 퍼시픽",
    "companyNameEn": "Union Pacific",
    "exchange": "NYSE",
    "sector": "철도 · 물류"
  },
  {
    "ticker": "PGR",
    "companyNameKo": "프로그레시브",
    "companyNameEn": "Progressive",
    "exchange": "NYSE",
    "sector": "손해보험"
  },
  {
    "ticker": "LOW",
    "companyNameKo": "로우스",
    "companyNameEn": "Lowe's",
    "exchange": "NYSE",
    "sector": "주택개선 · 유통"
  },
  {
    "ticker": "T",
    "companyNameKo": "AT&T",
    "companyNameEn": "AT&T",
    "exchange": "NYSE",
    "sector": "통신 · 미디어"
  },
  {
    "ticker": "BLK",
    "companyNameKo": "블랙록",
    "companyNameEn": "BlackRock",
    "exchange": "NYSE",
    "sector": "자산운용"
  },
  {
    "ticker": "SYK",
    "companyNameKo": "스트라이커",
    "companyNameEn": "Stryker",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "LMT",
    "companyNameKo": "록히드마틴",
    "companyNameEn": "Lockheed Martin",
    "exchange": "NYSE",
    "sector": "방산 · 항공우주"
  },
  {
    "ticker": "BKNG",
    "companyNameKo": "부킹홀딩스",
    "companyNameEn": "Booking Holdings",
    "exchange": "NASDAQ",
    "sector": "온라인 여행"
  },
  {
    "ticker": "PLD",
    "companyNameKo": "프로로지스",
    "companyNameEn": "Prologis",
    "exchange": "NYSE",
    "sector": "물류 리츠"
  },
  {
    "ticker": "VRTX",
    "companyNameKo": "버텍스 파마슈티컬스",
    "companyNameEn": "Vertex Pharmaceuticals",
    "exchange": "NASDAQ",
    "sector": "바이오 · 희귀질환"
  },
  {
    "ticker": "TJX",
    "companyNameKo": "TJX 컴퍼니스",
    "companyNameEn": "TJX Companies",
    "exchange": "NYSE",
    "sector": "할인 유통"
  },
  {
    "ticker": "ADP",
    "companyNameKo": "오토매틱 데이터 프로세싱",
    "companyNameEn": "Automatic Data Processing",
    "exchange": "NASDAQ",
    "sector": "급여관리 · B2B 서비스"
  },
  {
    "ticker": "ETN",
    "companyNameKo": "이튼",
    "companyNameEn": "Eaton",
    "exchange": "NYSE",
    "sector": "전력관리 · 산업재"
  },
  {
    "ticker": "ANET",
    "companyNameKo": "아리스타 네트웍스",
    "companyNameEn": "Arista Networks",
    "exchange": "NYSE",
    "sector": "클라우드 네트워킹"
  },
  {
    "ticker": "COP",
    "companyNameKo": "코노코필립스",
    "companyNameEn": "ConocoPhillips",
    "exchange": "NYSE",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "BSX",
    "companyNameKo": "보스턴 사이언티픽",
    "companyNameEn": "Boston Scientific",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "DE",
    "companyNameKo": "디어",
    "companyNameEn": "Deere & Company",
    "exchange": "NYSE",
    "sector": "농기계 · 산업재"
  },
  {
    "ticker": "SCHW",
    "companyNameKo": "찰스 슈왑",
    "companyNameEn": "Charles Schwab",
    "exchange": "NYSE",
    "sector": "증권 · 자산관리"
  },
  {
    "ticker": "MDT",
    "companyNameKo": "메드트로닉",
    "companyNameEn": "Medtronic",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "MU",
    "companyNameKo": "마이크론 테크놀로지",
    "companyNameEn": "Micron Technology",
    "exchange": "NASDAQ",
    "sector": "메모리 반도체"
  },
  {
    "ticker": "PANW",
    "companyNameKo": "팔로알토 네트웍스",
    "companyNameEn": "Palo Alto Networks",
    "exchange": "NASDAQ",
    "sector": "사이버보안"
  },
  {
    "ticker": "C",
    "companyNameKo": "씨티그룹",
    "companyNameEn": "Citigroup",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "GILD",
    "companyNameKo": "길리어드 사이언스",
    "companyNameEn": "Gilead Sciences",
    "exchange": "NASDAQ",
    "sector": "바이오 · 제약"
  },
  {
    "ticker": "ADI",
    "companyNameKo": "아날로그 디바이시스",
    "companyNameEn": "Analog Devices",
    "exchange": "NASDAQ",
    "sector": "아날로그 반도체"
  },
  {
    "ticker": "MDLZ",
    "companyNameKo": "몬델리즈",
    "companyNameEn": "Mondelez International",
    "exchange": "NASDAQ",
    "sector": "스낵 · 필수소비재"
  },
  {
    "ticker": "MMC",
    "companyNameKo": "마시앤맥레넌",
    "companyNameEn": "Marsh & McLennan",
    "exchange": "NYSE",
    "sector": "보험중개 · 컨설팅"
  },
  {
    "ticker": "LRCX",
    "companyNameKo": "램리서치",
    "companyNameEn": "Lam Research",
    "exchange": "NASDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "CB",
    "companyNameKo": "처브",
    "companyNameEn": "Chubb",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "KLAC",
    "companyNameKo": "KLA",
    "companyNameEn": "KLA Corporation",
    "exchange": "NASDAQ",
    "sector": "반도체 장비"
  },
  {
    "ticker": "UPS",
    "companyNameKo": "UPS",
    "companyNameEn": "United Parcel Service",
    "exchange": "NYSE",
    "sector": "물류 · 배송"
  },
  {
    "ticker": "SBUX",
    "companyNameKo": "스타벅스",
    "companyNameEn": "Starbucks",
    "exchange": "NASDAQ",
    "sector": "커피 · 외식"
  },
  {
    "ticker": "BX",
    "companyNameKo": "블랙스톤",
    "companyNameEn": "Blackstone",
    "exchange": "NYSE",
    "sector": "대체투자 · 자산운용"
  },
  {
    "ticker": "ELV",
    "companyNameKo": "엘리번스 헬스",
    "companyNameEn": "Elevance Health",
    "exchange": "NYSE",
    "sector": "헬스케어 보험"
  },
  {
    "ticker": "BMY",
    "companyNameKo": "브리스톨 마이어스 스큅",
    "companyNameEn": "Bristol Myers Squibb",
    "exchange": "NYSE",
    "sector": "제약 · 항암제"
  },
  {
    "ticker": "REGN",
    "companyNameKo": "리제네론",
    "companyNameEn": "Regeneron Pharmaceuticals",
    "exchange": "NASDAQ",
    "sector": "바이오 · 항체의약품"
  },
  {
    "ticker": "CI",
    "companyNameKo": "시그나",
    "companyNameEn": "Cigna Group",
    "exchange": "NYSE",
    "sector": "헬스케어 서비스"
  },
  {
    "ticker": "SO",
    "companyNameKo": "서던 컴퍼니",
    "companyNameEn": "Southern Company",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "DUK",
    "companyNameKo": "듀크 에너지",
    "companyNameEn": "Duke Energy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "ZTS",
    "companyNameKo": "조에티스",
    "companyNameEn": "Zoetis",
    "exchange": "NYSE",
    "sector": "동물의약품"
  },
  {
    "ticker": "ICE",
    "companyNameKo": "인터컨티넨털 익스체인지",
    "companyNameEn": "Intercontinental Exchange",
    "exchange": "NYSE",
    "sector": "거래소 · 금융데이터"
  },
  {
    "ticker": "SHW",
    "companyNameKo": "셔윈윌리엄스",
    "companyNameEn": "Sherwin-Williams",
    "exchange": "NYSE",
    "sector": "페인트 · 건자재"
  },
  {
    "ticker": "MO",
    "companyNameKo": "알트리아",
    "companyNameEn": "Altria Group",
    "exchange": "NYSE",
    "sector": "담배 · 필수소비재"
  },
  {
    "ticker": "WM",
    "companyNameKo": "웨이스트 매니지먼트",
    "companyNameEn": "Waste Management",
    "exchange": "NYSE",
    "sector": "폐기물 처리"
  },
  {
    "ticker": "EQIX",
    "companyNameKo": "이퀴닉스",
    "companyNameEn": "Equinix",
    "exchange": "NASDAQ",
    "sector": "데이터센터 리츠"
  },
  {
    "ticker": "TT",
    "companyNameKo": "트레인 테크놀로지스",
    "companyNameEn": "Trane Technologies",
    "exchange": "NYSE",
    "sector": "공조 · 에너지효율"
  },
  {
    "ticker": "FI",
    "companyNameKo": "파이서브",
    "companyNameEn": "Fiserv",
    "exchange": "NYSE",
    "sector": "결제 · 핀테크"
  },
  {
    "ticker": "APH",
    "companyNameKo": "암페놀",
    "companyNameEn": "Amphenol",
    "exchange": "NYSE",
    "sector": "전자부품 · 커넥터"
  },
  {
    "ticker": "CDNS",
    "companyNameKo": "케이던스 디자인 시스템즈",
    "companyNameEn": "Cadence Design Systems",
    "exchange": "NASDAQ",
    "sector": "EDA 소프트웨어"
  },
  {
    "ticker": "NKE",
    "companyNameKo": "나이키",
    "companyNameEn": "Nike",
    "exchange": "NYSE",
    "sector": "스포츠웨어"
  },
  {
    "ticker": "MCO",
    "companyNameKo": "무디스",
    "companyNameEn": "Moody's",
    "exchange": "NYSE",
    "sector": "신용평가 · 금융데이터"
  },
  {
    "ticker": "PH",
    "companyNameKo": "파커 하니핀",
    "companyNameEn": "Parker-Hannifin",
    "exchange": "NYSE",
    "sector": "산업부품"
  },
  {
    "ticker": "MS",
    "companyNameKo": "모건스탠리",
    "companyNameEn": "Morgan Stanley",
    "exchange": "NYSE",
    "sector": "투자은행 · 자산관리"
  },
  {
    "ticker": "CME",
    "companyNameKo": "CME 그룹",
    "companyNameEn": "CME Group",
    "exchange": "NASDAQ",
    "sector": "파생상품 거래소"
  },
  {
    "ticker": "GD",
    "companyNameKo": "제너럴 다이내믹스",
    "companyNameEn": "General Dynamics",
    "exchange": "NYSE",
    "sector": "방산 · 조선"
  },
  {
    "ticker": "PYPL",
    "companyNameKo": "페이팔",
    "companyNameEn": "PayPal",
    "exchange": "NASDAQ",
    "sector": "결제 · 핀테크"
  },
  {
    "ticker": "HCA",
    "companyNameKo": "HCA 헬스케어",
    "companyNameEn": "HCA Healthcare",
    "exchange": "NYSE",
    "sector": "병원 · 헬스케어 서비스"
  },
  {
    "ticker": "SNPS",
    "companyNameKo": "시놉시스",
    "companyNameEn": "Synopsys",
    "exchange": "NASDAQ",
    "sector": "EDA 소프트웨어"
  },
  {
    "ticker": "AON",
    "companyNameKo": "에이온",
    "companyNameEn": "Aon",
    "exchange": "NYSE",
    "sector": "보험중개 · 리스크관리"
  },
  {
    "ticker": "CMG",
    "companyNameKo": "치폴레",
    "companyNameEn": "Chipotle Mexican Grill",
    "exchange": "NYSE",
    "sector": "외식 · 레스토랑"
  },
  {
    "ticker": "MAR",
    "companyNameKo": "메리어트 인터내셔널",
    "companyNameEn": "Marriott International",
    "exchange": "NASDAQ",
    "sector": "호텔 · 여행"
  },
  {
    "ticker": "MSI",
    "companyNameKo": "모토로라 솔루션즈",
    "companyNameEn": "Motorola Solutions",
    "exchange": "NYSE",
    "sector": "공공안전 통신"
  },
  {
    "ticker": "USB",
    "companyNameKo": "US 뱅코프",
    "companyNameEn": "U.S. Bancorp",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "MCK",
    "companyNameKo": "맥케슨",
    "companyNameEn": "McKesson",
    "exchange": "NYSE",
    "sector": "의약품 유통"
  },
  {
    "ticker": "PNC",
    "companyNameKo": "PNC 파이낸셜",
    "companyNameEn": "PNC Financial Services",
    "exchange": "NYSE",
    "sector": "은행 · 금융"
  },
  {
    "ticker": "EOG",
    "companyNameKo": "EOG 리소시스",
    "companyNameEn": "EOG Resources",
    "exchange": "NYSE",
    "sector": "에너지 · 셰일"
  },
  {
    "ticker": "TDG",
    "companyNameKo": "트랜스다임",
    "companyNameEn": "TransDigm Group",
    "exchange": "NYSE",
    "sector": "항공부품"
  },
  {
    "ticker": "APD",
    "companyNameKo": "에어 프로덕츠",
    "companyNameEn": "Air Products and Chemicals",
    "exchange": "NYSE",
    "sector": "산업가스"
  },
  {
    "ticker": "ORLY",
    "companyNameKo": "오라일리 오토모티브",
    "companyNameEn": "O'Reilly Automotive",
    "exchange": "NASDAQ",
    "sector": "자동차 부품 유통"
  },
  {
    "ticker": "CL",
    "companyNameKo": "콜게이트팜올리브",
    "companyNameEn": "Colgate-Palmolive",
    "exchange": "NYSE",
    "sector": "필수소비재"
  },
  {
    "ticker": "NOC",
    "companyNameKo": "노스롭그루먼",
    "companyNameEn": "Northrop Grumman",
    "exchange": "NYSE",
    "sector": "방산 · 항공우주"
  },
  {
    "ticker": "CSX",
    "companyNameKo": "CSX",
    "companyNameEn": "CSX Corporation",
    "exchange": "NASDAQ",
    "sector": "철도 · 물류"
  },
  {
    "ticker": "ITW",
    "companyNameKo": "일리노이 툴 웍스",
    "companyNameEn": "Illinois Tool Works",
    "exchange": "NYSE",
    "sector": "산업재 · 부품"
  },
  {
    "ticker": "ECL",
    "companyNameKo": "에코랩",
    "companyNameEn": "Ecolab",
    "exchange": "NYSE",
    "sector": "수처리 · 위생 솔루션"
  },
  {
    "ticker": "FCX",
    "companyNameKo": "프리포트맥모란",
    "companyNameEn": "Freeport-McMoRan",
    "exchange": "NYSE",
    "sector": "구리 · 광산"
  },
  {
    "ticker": "MPC",
    "companyNameKo": "마라톤 페트롤리엄",
    "companyNameEn": "Marathon Petroleum",
    "exchange": "NYSE",
    "sector": "정유 · 에너지"
  },
  {
    "ticker": "EMR",
    "companyNameKo": "에머슨 일렉트릭",
    "companyNameEn": "Emerson Electric",
    "exchange": "NYSE",
    "sector": "산업자동화"
  },
  {
    "ticker": "SLB",
    "companyNameKo": "슐럼버거",
    "companyNameEn": "SLB",
    "exchange": "NYSE",
    "sector": "유전서비스"
  },
  {
    "ticker": "CEG",
    "companyNameKo": "콘스텔레이션 에너지",
    "companyNameEn": "Constellation Energy",
    "exchange": "NASDAQ",
    "sector": "원전 · 전력"
  },
  {
    "ticker": "CRWD",
    "companyNameKo": "크라우드스트라이크",
    "companyNameEn": "CrowdStrike",
    "exchange": "NASDAQ",
    "sector": "사이버보안"
  },
  {
    "ticker": "PLTR",
    "companyNameKo": "팔란티어",
    "companyNameEn": "Palantir Technologies",
    "exchange": "NYSE",
    "sector": "데이터 분석 · AI"
  },
  {
    "ticker": "MSTR",
    "companyNameKo": "마이크로스트래티지",
    "companyNameEn": "MicroStrategy",
    "exchange": "NASDAQ",
    "sector": "비트코인 · 엔터프라이즈 소프트웨어"
  },
  {
    "ticker": "COIN",
    "companyNameKo": "코인베이스",
    "companyNameEn": "Coinbase Global",
    "exchange": "NASDAQ",
    "sector": "가상자산 거래소"
  },
  {
    "ticker": "SHOP",
    "companyNameKo": "쇼피파이",
    "companyNameEn": "Shopify",
    "exchange": "NYSE",
    "sector": "이커머스 플랫폼"
  },
  {
    "ticker": "SPOT",
    "companyNameKo": "스포티파이",
    "companyNameEn": "Spotify Technology",
    "exchange": "NYSE",
    "sector": "음악 스트리밍"
  },
  {
    "ticker": "SMCI",
    "companyNameKo": "슈퍼마이크로컴퓨터",
    "companyNameEn": "Super Micro Computer",
    "exchange": "NASDAQ",
    "sector": "AI 서버 · 하드웨어"
  },
  {
    "ticker": "SNOW",
    "companyNameKo": "스노우플레이크",
    "companyNameEn": "Snowflake",
    "exchange": "NYSE",
    "sector": "클라우드 데이터 플랫폼"
  },
  {
    "ticker": "DDOG",
    "companyNameKo": "데이터독",
    "companyNameEn": "Datadog",
    "exchange": "NASDAQ",
    "sector": "클라우드 모니터링"
  },
  {
    "ticker": "NET",
    "companyNameKo": "클라우드플레어",
    "companyNameEn": "Cloudflare",
    "exchange": "NYSE",
    "sector": "네트워크 · 사이버보안"
  },
  {
    "ticker": "MDB",
    "companyNameKo": "몽고DB",
    "companyNameEn": "MongoDB",
    "exchange": "NASDAQ",
    "sector": "데이터베이스 소프트웨어"
  },
  {
    "ticker": "HUBS",
    "companyNameKo": "허브스팟",
    "companyNameEn": "HubSpot",
    "exchange": "NYSE",
    "sector": "마케팅 소프트웨어"
  },
  {
    "ticker": "WDAY",
    "companyNameKo": "워크데이",
    "companyNameEn": "Workday",
    "exchange": "NASDAQ",
    "sector": "인사 · 재무 소프트웨어"
  },
  {
    "ticker": "OKTA",
    "companyNameKo": "옥타",
    "companyNameEn": "Okta",
    "exchange": "NASDAQ",
    "sector": "ID 보안 · 클라우드"
  },
  {
    "ticker": "ZS",
    "companyNameKo": "지스케일러",
    "companyNameEn": "Zscaler",
    "exchange": "NASDAQ",
    "sector": "제로트러스트 보안"
  },
  {
    "ticker": "TEAM",
    "companyNameKo": "아틀라시안",
    "companyNameEn": "Atlassian",
    "exchange": "NASDAQ",
    "sector": "협업 소프트웨어"
  },
  {
    "ticker": "RBLX",
    "companyNameKo": "로블록스",
    "companyNameEn": "Roblox",
    "exchange": "NYSE",
    "sector": "게임 · 메타버스"
  },
  {
    "ticker": "HOOD",
    "companyNameKo": "로빈후드",
    "companyNameEn": "Robinhood Markets",
    "exchange": "NASDAQ",
    "sector": "증권 플랫폼 · 핀테크"
  },
  {
    "ticker": "DASH",
    "companyNameKo": "도어대시",
    "companyNameEn": "DoorDash",
    "exchange": "NASDAQ",
    "sector": "배달 플랫폼"
  },
  {
    "ticker": "CAVA",
    "companyNameKo": "카바 그룹",
    "companyNameEn": "Cava Group",
    "exchange": "NYSE",
    "sector": "외식 · 지중해식 패스트캐주얼"
  },
  {
    "ticker": "DUOL",
    "companyNameKo": "듀오링고",
    "companyNameEn": "Duolingo",
    "exchange": "NASDAQ",
    "sector": "에듀테크"
  },
  {
    "ticker": "DOCU",
    "companyNameKo": "도큐사인",
    "companyNameEn": "DocuSign",
    "exchange": "NASDAQ",
    "sector": "전자서명 · 소프트웨어"
  },
  {
    "ticker": "CELH",
    "companyNameKo": "셀시어스 홀딩스",
    "companyNameEn": "Celsius Holdings",
    "exchange": "NASDAQ",
    "sector": "에너지드링크"
  },
  {
    "ticker": "ELF",
    "companyNameKo": "e.l.f. 뷰티",
    "companyNameEn": "e.l.f. Beauty",
    "exchange": "NYSE",
    "sector": "화장품 · 소비재"
  },
  {
    "ticker": "RDDT",
    "companyNameKo": "레딧",
    "companyNameEn": "Reddit",
    "exchange": "NYSE",
    "sector": "커뮤니티 · 광고 플랫폼"
  },
  {
    "ticker": "VRT",
    "companyNameKo": "버티브",
    "companyNameEn": "Vertiv",
    "exchange": "NYSE",
    "sector": "데이터센터 인프라"
  },
  {
    "ticker": "GEV",
    "companyNameKo": "GE 버노바",
    "companyNameEn": "GE Vernova",
    "exchange": "NYSE",
    "sector": "전력 · 에너지 장비"
  },
  {
    "ticker": "FICO",
    "companyNameKo": "페어아이작",
    "companyNameEn": "Fair Isaac",
    "exchange": "NYSE",
    "sector": "신용평가 · 데이터 분석"
  },
  {
    "ticker": "AXON",
    "companyNameKo": "액손 엔터프라이즈",
    "companyNameEn": "Axon Enterprise",
    "exchange": "NASDAQ",
    "sector": "공공안전 · 장비"
  },
  {
    "ticker": "APP",
    "companyNameKo": "앱러빈",
    "companyNameEn": "AppLovin",
    "exchange": "NASDAQ",
    "sector": "모바일 광고 · 소프트웨어"
  },
  {
    "ticker": "ALAB",
    "companyNameKo": "아스테라 랩스",
    "companyNameEn": "Astera Labs",
    "exchange": "NASDAQ",
    "sector": "AI 데이터센터 반도체"
  },
  {
    "ticker": "ARM",
    "companyNameKo": "암 홀딩스",
    "companyNameEn": "Arm Holdings",
    "exchange": "NASDAQ",
    "sector": "반도체 설계 IP"
  },
  {
    "ticker": "FSLR",
    "companyNameKo": "퍼스트솔라",
    "companyNameEn": "First Solar",
    "exchange": "NASDAQ",
    "sector": "태양광"
  },
  {
    "ticker": "ENPH",
    "companyNameKo": "엔페이즈 에너지",
    "companyNameEn": "Enphase Energy",
    "exchange": "NASDAQ",
    "sector": "태양광 인버터"
  },
  {
    "ticker": "ON",
    "companyNameKo": "온 세미컨덕터",
    "companyNameEn": "ON Semiconductor",
    "exchange": "NASDAQ",
    "sector": "전력반도체 · 차량용 반도체"
  },
  {
    "ticker": "NXPI",
    "companyNameKo": "NXP 세미컨덕터",
    "companyNameEn": "NXP Semiconductors",
    "exchange": "NASDAQ",
    "sector": "차량용 반도체"
  },
  {
    "ticker": "MRVL",
    "companyNameKo": "마벨 테크놀로지",
    "companyNameEn": "Marvell Technology",
    "exchange": "NASDAQ",
    "sector": "데이터센터 반도체"
  },
  {
    "ticker": "WELL",
    "companyNameKo": "웰타워",
    "companyNameEn": "Welltower",
    "exchange": "NYSE",
    "sector": "헬스케어 리츠"
  },
  {
    "ticker": "O",
    "companyNameKo": "리얼티인컴",
    "companyNameEn": "Realty Income",
    "exchange": "NYSE",
    "sector": "리츠 · 상업용 부동산"
  },
  {
    "ticker": "VICI",
    "companyNameKo": "비치 프로퍼티스",
    "companyNameEn": "VICI Properties",
    "exchange": "NYSE",
    "sector": "카지노 리츠"
  },
  {
    "ticker": "CCI",
    "companyNameKo": "크라운캐슬",
    "companyNameEn": "Crown Castle",
    "exchange": "NYSE",
    "sector": "통신타워 리츠"
  },
  {
    "ticker": "AMT",
    "companyNameKo": "아메리칸 타워",
    "companyNameEn": "American Tower",
    "exchange": "NYSE",
    "sector": "통신타워 리츠"
  },
  {
    "ticker": "PSA",
    "companyNameKo": "퍼블릭 스토리지",
    "companyNameEn": "Public Storage",
    "exchange": "NYSE",
    "sector": "셀프스토리지 리츠"
  },
  {
    "ticker": "DLR",
    "companyNameKo": "디지털 리얼티",
    "companyNameEn": "Digital Realty",
    "exchange": "NYSE",
    "sector": "데이터센터 리츠"
  },
  {
    "ticker": "A",
    "companyNameKo": "애질런트 테크놀로지스",
    "companyNameEn": "Agilent Technologies",
    "exchange": "NYSE",
    "sector": "생명과학 장비"
  },
  {
    "ticker": "ABNB",
    "companyNameKo": "에어비앤비",
    "companyNameEn": "Airbnb",
    "exchange": "NASDAQ",
    "sector": "여행 플랫폼"
  },
  {
    "ticker": "ACGL",
    "companyNameKo": "아치 캐피탈",
    "companyNameEn": "Arch Capital Group",
    "exchange": "NASDAQ",
    "sector": "보험"
  },
  {
    "ticker": "ADSK",
    "companyNameKo": "오토데스크",
    "companyNameEn": "Autodesk",
    "exchange": "NASDAQ",
    "sector": "설계 소프트웨어"
  },
  {
    "ticker": "AEE",
    "companyNameKo": "아메렌",
    "companyNameEn": "Ameren",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "AEP",
    "companyNameKo": "아메리칸 일렉트릭 파워",
    "companyNameEn": "American Electric Power",
    "exchange": "NASDAQ",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "AES",
    "companyNameKo": "AES",
    "companyNameEn": "AES Corporation",
    "exchange": "NYSE",
    "sector": "전력 · 재생에너지"
  },
  {
    "ticker": "AFL",
    "companyNameKo": "애플랙",
    "companyNameEn": "Aflac",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "AIG",
    "companyNameKo": "AIG",
    "companyNameEn": "American International Group",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "AIZ",
    "companyNameKo": "어슈어런트",
    "companyNameEn": "Assurant",
    "exchange": "NYSE",
    "sector": "보험 서비스"
  },
  {
    "ticker": "AJG",
    "companyNameKo": "아서 J. 갤러거",
    "companyNameEn": "Arthur J. Gallagher",
    "exchange": "NYSE",
    "sector": "보험중개"
  },
  {
    "ticker": "AKAM",
    "companyNameKo": "아카마이",
    "companyNameEn": "Akamai Technologies",
    "exchange": "NASDAQ",
    "sector": "CDN · 보안"
  },
  {
    "ticker": "ALB",
    "companyNameKo": "앨버말",
    "companyNameEn": "Albemarle",
    "exchange": "NYSE",
    "sector": "리튬 · 특수화학"
  },
  {
    "ticker": "ALGN",
    "companyNameKo": "얼라인 테크놀로지",
    "companyNameEn": "Align Technology",
    "exchange": "NASDAQ",
    "sector": "치과 의료기기"
  },
  {
    "ticker": "ALL",
    "companyNameKo": "올스테이트",
    "companyNameEn": "Allstate",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "ALLE",
    "companyNameKo": "알레지온",
    "companyNameEn": "Allegion",
    "exchange": "NYSE",
    "sector": "보안장비"
  },
  {
    "ticker": "AMCR",
    "companyNameKo": "암코어",
    "companyNameEn": "Amcor",
    "exchange": "NYSE",
    "sector": "포장재"
  },
  {
    "ticker": "AME",
    "companyNameKo": "아메텍",
    "companyNameEn": "AMETEK",
    "exchange": "NYSE",
    "sector": "전자계측 · 산업재"
  },
  {
    "ticker": "AMP",
    "companyNameKo": "아메리프라이즈 파이낸셜",
    "companyNameEn": "Ameriprise Financial",
    "exchange": "NYSE",
    "sector": "자산관리"
  },
  {
    "ticker": "ANSS",
    "companyNameKo": "앤시스",
    "companyNameEn": "ANSYS",
    "exchange": "NASDAQ",
    "sector": "엔지니어링 소프트웨어"
  },
  {
    "ticker": "AOS",
    "companyNameKo": "A. O. 스미스",
    "companyNameEn": "A. O. Smith",
    "exchange": "NYSE",
    "sector": "온수기 · 산업재"
  },
  {
    "ticker": "APA",
    "companyNameKo": "APA",
    "companyNameEn": "APA Corporation",
    "exchange": "NASDAQ",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "APTV",
    "companyNameKo": "앱티브",
    "companyNameEn": "Aptiv",
    "exchange": "NYSE",
    "sector": "자동차 전장"
  },
  {
    "ticker": "ARE",
    "companyNameKo": "알렉산드리아 리얼에스테이트",
    "companyNameEn": "Alexandria Real Estate Equities",
    "exchange": "NYSE",
    "sector": "바이오 오피스 리츠"
  },
  {
    "ticker": "ATO",
    "companyNameKo": "애트모스 에너지",
    "companyNameEn": "Atmos Energy",
    "exchange": "NYSE",
    "sector": "가스 유틸리티"
  },
  {
    "ticker": "AVB",
    "companyNameKo": "아발론베이 커뮤니티스",
    "companyNameEn": "AvalonBay Communities",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "AVY",
    "companyNameKo": "에이버리 데니슨",
    "companyNameEn": "Avery Dennison",
    "exchange": "NYSE",
    "sector": "라벨 · 포장재"
  },
  {
    "ticker": "AWK",
    "companyNameKo": "아메리칸 워터웍스",
    "companyNameEn": "American Water Works",
    "exchange": "NYSE",
    "sector": "수도 유틸리티"
  },
  {
    "ticker": "AXP",
    "companyNameKo": "아메리칸 익스프레스",
    "companyNameEn": "American Express",
    "exchange": "NYSE",
    "sector": "카드 · 결제"
  },
  {
    "ticker": "AZO",
    "companyNameKo": "오토존",
    "companyNameEn": "AutoZone",
    "exchange": "NYSE",
    "sector": "자동차 부품 유통"
  },
  {
    "ticker": "BA",
    "companyNameKo": "보잉",
    "companyNameEn": "Boeing",
    "exchange": "NYSE",
    "sector": "항공기 · 방산"
  },
  {
    "ticker": "BALL",
    "companyNameKo": "볼 코퍼레이션",
    "companyNameEn": "Ball Corporation",
    "exchange": "NYSE",
    "sector": "금속 포장재"
  },
  {
    "ticker": "BAX",
    "companyNameKo": "박스터",
    "companyNameEn": "Baxter International",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "BBY",
    "companyNameKo": "베스트바이",
    "companyNameEn": "Best Buy",
    "exchange": "NYSE",
    "sector": "전자제품 유통"
  },
  {
    "ticker": "BDX",
    "companyNameKo": "벡톤디킨슨",
    "companyNameEn": "Becton Dickinson",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "BEN",
    "companyNameKo": "프랭클린 리소시스",
    "companyNameEn": "Franklin Resources",
    "exchange": "NYSE",
    "sector": "자산운용"
  },
  {
    "ticker": "BG",
    "companyNameKo": "번지 글로벌",
    "companyNameEn": "Bunge Global",
    "exchange": "NYSE",
    "sector": "농산물 · 식품원료"
  },
  {
    "ticker": "BIIB",
    "companyNameKo": "바이오젠",
    "companyNameEn": "Biogen",
    "exchange": "NASDAQ",
    "sector": "바이오 · 신경질환"
  },
  {
    "ticker": "BK",
    "companyNameKo": "뱅크오브뉴욕멜론",
    "companyNameEn": "Bank of New York Mellon",
    "exchange": "NYSE",
    "sector": "수탁은행"
  },
  {
    "ticker": "BKR",
    "companyNameKo": "베이커휴즈",
    "companyNameEn": "Baker Hughes",
    "exchange": "NASDAQ",
    "sector": "에너지 장비"
  },
  {
    "ticker": "BR",
    "companyNameKo": "브로드리지 파이낸셜",
    "companyNameEn": "Broadridge Financial Solutions",
    "exchange": "NYSE",
    "sector": "금융 IT 서비스"
  },
  {
    "ticker": "BRO",
    "companyNameKo": "브라운앤브라운",
    "companyNameEn": "Brown & Brown",
    "exchange": "NYSE",
    "sector": "보험중개"
  },
  {
    "ticker": "BWA",
    "companyNameKo": "보그워너",
    "companyNameEn": "BorgWarner",
    "exchange": "NYSE",
    "sector": "자동차 부품"
  },
  {
    "ticker": "BXP",
    "companyNameKo": "보스턴 프로퍼티스",
    "companyNameEn": "BXP",
    "exchange": "NYSE",
    "sector": "오피스 리츠"
  },
  {
    "ticker": "CAG",
    "companyNameKo": "코나그라 브랜드",
    "companyNameEn": "Conagra Brands",
    "exchange": "NYSE",
    "sector": "가공식품"
  },
  {
    "ticker": "CAH",
    "companyNameKo": "카디널헬스",
    "companyNameEn": "Cardinal Health",
    "exchange": "NYSE",
    "sector": "의약품 유통"
  },
  {
    "ticker": "CARR",
    "companyNameKo": "캐리어 글로벌",
    "companyNameEn": "Carrier Global",
    "exchange": "NYSE",
    "sector": "공조 · 냉난방"
  },
  {
    "ticker": "CBRE",
    "companyNameKo": "CBRE 그룹",
    "companyNameEn": "CBRE Group",
    "exchange": "NYSE",
    "sector": "상업용 부동산 서비스"
  },
  {
    "ticker": "CBOE",
    "companyNameKo": "Cboe 글로벌 마켓츠",
    "companyNameEn": "Cboe Global Markets",
    "exchange": "BATS",
    "sector": "거래소 · 금융데이터"
  },
  {
    "ticker": "CCL",
    "companyNameKo": "카니발",
    "companyNameEn": "Carnival",
    "exchange": "NYSE",
    "sector": "크루즈 · 여행"
  },
  {
    "ticker": "CDW",
    "companyNameKo": "CDW",
    "companyNameEn": "CDW Corporation",
    "exchange": "NASDAQ",
    "sector": "IT 유통 · 솔루션"
  },
  {
    "ticker": "CE",
    "companyNameKo": "셀라니즈",
    "companyNameEn": "Celanese",
    "exchange": "NYSE",
    "sector": "화학 · 소재"
  },
  {
    "ticker": "CF",
    "companyNameKo": "CF 인더스트리스",
    "companyNameEn": "CF Industries",
    "exchange": "NYSE",
    "sector": "비료 · 농업소재"
  },
  {
    "ticker": "CFG",
    "companyNameKo": "시티즌스 파이낸셜",
    "companyNameEn": "Citizens Financial Group",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "CHD",
    "companyNameKo": "처치앤드와이트",
    "companyNameEn": "Church & Dwight",
    "exchange": "NYSE",
    "sector": "생활용품"
  },
  {
    "ticker": "CHRW",
    "companyNameKo": "C.H. 로빈슨",
    "companyNameEn": "C.H. Robinson",
    "exchange": "NASDAQ",
    "sector": "물류 중개"
  },
  {
    "ticker": "CHTR",
    "companyNameKo": "차터 커뮤니케이션스",
    "companyNameEn": "Charter Communications",
    "exchange": "NASDAQ",
    "sector": "케이블 · 통신"
  },
  {
    "ticker": "CINF",
    "companyNameKo": "신시내티 파이낸셜",
    "companyNameEn": "Cincinnati Financial",
    "exchange": "NASDAQ",
    "sector": "보험"
  },
  {
    "ticker": "CLX",
    "companyNameKo": "클로락스",
    "companyNameEn": "Clorox",
    "exchange": "NYSE",
    "sector": "생활용품"
  },
  {
    "ticker": "CMA",
    "companyNameKo": "코메리카",
    "companyNameEn": "Comerica",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "CMI",
    "companyNameKo": "커민스",
    "companyNameEn": "Cummins",
    "exchange": "NYSE",
    "sector": "엔진 · 산업재"
  },
  {
    "ticker": "CMS",
    "companyNameKo": "CMS 에너지",
    "companyNameEn": "CMS Energy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "CNC",
    "companyNameKo": "센틴",
    "companyNameEn": "Centene",
    "exchange": "NYSE",
    "sector": "헬스케어 보험"
  },
  {
    "ticker": "CNP",
    "companyNameKo": "센터포인트 에너지",
    "companyNameEn": "CenterPoint Energy",
    "exchange": "NYSE",
    "sector": "전력 · 가스"
  },
  {
    "ticker": "COF",
    "companyNameKo": "캐피털원",
    "companyNameEn": "Capital One Financial",
    "exchange": "NYSE",
    "sector": "카드 · 소비금융"
  },
  {
    "ticker": "COO",
    "companyNameKo": "쿠퍼 컴퍼니스",
    "companyNameEn": "CooperCompanies",
    "exchange": "NASDAQ",
    "sector": "의료기기"
  },
  {
    "ticker": "COR",
    "companyNameKo": "센코라",
    "companyNameEn": "Cencora",
    "exchange": "NYSE",
    "sector": "의약품 유통"
  },
  {
    "ticker": "CPAY",
    "companyNameKo": "코어페이",
    "companyNameEn": "Corpay",
    "exchange": "NYSE",
    "sector": "기업 결제"
  },
  {
    "ticker": "CPRT",
    "companyNameKo": "코파트",
    "companyNameEn": "Copart",
    "exchange": "NASDAQ",
    "sector": "온라인 자동차 경매"
  },
  {
    "ticker": "CPT",
    "companyNameKo": "캠든 프로퍼티 트러스트",
    "companyNameEn": "Camden Property Trust",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "CRL",
    "companyNameKo": "찰스리버 래버러토리스",
    "companyNameEn": "Charles River Laboratories",
    "exchange": "NYSE",
    "sector": "임상시험 · 연구서비스"
  },
  {
    "ticker": "CSGP",
    "companyNameKo": "코스타 그룹",
    "companyNameEn": "CoStar Group",
    "exchange": "NASDAQ",
    "sector": "부동산 데이터"
  },
  {
    "ticker": "CTAS",
    "companyNameKo": "신타스",
    "companyNameEn": "Cintas",
    "exchange": "NASDAQ",
    "sector": "유니폼 · 기업서비스"
  },
  {
    "ticker": "CTRA",
    "companyNameKo": "코테라 에너지",
    "companyNameEn": "Coterra Energy",
    "exchange": "NYSE",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "CTSH",
    "companyNameKo": "코그니전트",
    "companyNameEn": "Cognizant Technology Solutions",
    "exchange": "NASDAQ",
    "sector": "IT서비스"
  },
  {
    "ticker": "CTVA",
    "companyNameKo": "코르테바",
    "companyNameEn": "Corteva",
    "exchange": "NYSE",
    "sector": "농업과학"
  },
  {
    "ticker": "CVS",
    "companyNameKo": "CVS 헬스",
    "companyNameEn": "CVS Health",
    "exchange": "NYSE",
    "sector": "약국 · 헬스케어"
  },
  {
    "ticker": "CVX",
    "companyNameKo": "셰브론",
    "companyNameEn": "Chevron",
    "exchange": "NYSE",
    "sector": "에너지 · 석유"
  },
  {
    "ticker": "CZR",
    "companyNameKo": "시저스 엔터테인먼트",
    "companyNameEn": "Caesars Entertainment",
    "exchange": "NASDAQ",
    "sector": "카지노 · 리조트"
  },
  {
    "ticker": "D",
    "companyNameKo": "도미니언 에너지",
    "companyNameEn": "Dominion Energy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "DAL",
    "companyNameKo": "델타항공",
    "companyNameEn": "Delta Air Lines",
    "exchange": "NYSE",
    "sector": "항공"
  },
  {
    "ticker": "DAY",
    "companyNameKo": "데이포스",
    "companyNameEn": "Dayforce",
    "exchange": "NYSE",
    "sector": "인사관리 소프트웨어"
  },
  {
    "ticker": "DD",
    "companyNameKo": "듀폰",
    "companyNameEn": "DuPont",
    "exchange": "NYSE",
    "sector": "특수화학"
  },
  {
    "ticker": "DECK",
    "companyNameKo": "데커스 아웃도어",
    "companyNameEn": "Deckers Outdoor",
    "exchange": "NYSE",
    "sector": "신발 · 의류"
  },
  {
    "ticker": "DFS",
    "companyNameKo": "디스커버 파이낸셜",
    "companyNameEn": "Discover Financial Services",
    "exchange": "NYSE",
    "sector": "카드 · 소비금융"
  },
  {
    "ticker": "DG",
    "companyNameKo": "달러 제너럴",
    "companyNameEn": "Dollar General",
    "exchange": "NYSE",
    "sector": "할인 유통"
  },
  {
    "ticker": "DGX",
    "companyNameKo": "퀘스트 다이아그노스틱스",
    "companyNameEn": "Quest Diagnostics",
    "exchange": "NYSE",
    "sector": "진단검사"
  },
  {
    "ticker": "DHI",
    "companyNameKo": "D.R. 호튼",
    "companyNameEn": "D.R. Horton",
    "exchange": "NYSE",
    "sector": "주택건설"
  },
  {
    "ticker": "DLTR",
    "companyNameKo": "달러 트리",
    "companyNameEn": "Dollar Tree",
    "exchange": "NASDAQ",
    "sector": "할인 유통"
  },
  {
    "ticker": "DOV",
    "companyNameKo": "도버",
    "companyNameEn": "Dover",
    "exchange": "NYSE",
    "sector": "산업재"
  },
  {
    "ticker": "DOW",
    "companyNameKo": "다우",
    "companyNameEn": "Dow",
    "exchange": "NYSE",
    "sector": "화학 · 소재"
  },
  {
    "ticker": "DPZ",
    "companyNameKo": "도미노피자",
    "companyNameEn": "Domino's Pizza",
    "exchange": "NYSE",
    "sector": "외식 · 프랜차이즈"
  },
  {
    "ticker": "DRI",
    "companyNameKo": "다든 레스토랑",
    "companyNameEn": "Darden Restaurants",
    "exchange": "NYSE",
    "sector": "외식 · 레스토랑"
  },
  {
    "ticker": "DTE",
    "companyNameKo": "DTE 에너지",
    "companyNameEn": "DTE Energy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "DVA",
    "companyNameKo": "다비타",
    "companyNameEn": "DaVita",
    "exchange": "NYSE",
    "sector": "투석 · 헬스케어"
  },
  {
    "ticker": "DVN",
    "companyNameKo": "데본에너지",
    "companyNameEn": "Devon Energy",
    "exchange": "NYSE",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "DXCM",
    "companyNameKo": "덱스컴",
    "companyNameEn": "DexCom",
    "exchange": "NASDAQ",
    "sector": "의료기기 · 당뇨관리"
  },
  {
    "ticker": "EA",
    "companyNameKo": "일렉트로닉 아츠",
    "companyNameEn": "Electronic Arts",
    "exchange": "NASDAQ",
    "sector": "게임"
  },
  {
    "ticker": "EBAY",
    "companyNameKo": "이베이",
    "companyNameEn": "eBay",
    "exchange": "NASDAQ",
    "sector": "이커머스 플랫폼"
  },
  {
    "ticker": "ED",
    "companyNameKo": "콘에디슨",
    "companyNameEn": "Consolidated Edison",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "EFX",
    "companyNameKo": "에퀴팩스",
    "companyNameEn": "Equifax",
    "exchange": "NYSE",
    "sector": "신용정보"
  },
  {
    "ticker": "EG",
    "companyNameKo": "에베레스트 그룹",
    "companyNameEn": "Everest Group",
    "exchange": "NYSE",
    "sector": "보험 · 재보험"
  },
  {
    "ticker": "EIX",
    "companyNameKo": "에디슨 인터내셔널",
    "companyNameEn": "Edison International",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "EL",
    "companyNameKo": "에스티로더",
    "companyNameEn": "Estée Lauder",
    "exchange": "NYSE",
    "sector": "화장품"
  },
  {
    "ticker": "EMN",
    "companyNameKo": "이스트만 케미컬",
    "companyNameEn": "Eastman Chemical",
    "exchange": "NYSE",
    "sector": "화학 · 소재"
  },
  {
    "ticker": "EPAM",
    "companyNameKo": "EPAM 시스템즈",
    "companyNameEn": "EPAM Systems",
    "exchange": "NYSE",
    "sector": "IT서비스"
  },
  {
    "ticker": "EQR",
    "companyNameKo": "에쿼티 레지덴셜",
    "companyNameEn": "Equity Residential",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "EQT",
    "companyNameKo": "EQT",
    "companyNameEn": "EQT Corporation",
    "exchange": "NYSE",
    "sector": "천연가스"
  },
  {
    "ticker": "ES",
    "companyNameKo": "에버소스 에너지",
    "companyNameEn": "Eversource Energy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "ESS",
    "companyNameKo": "에섹스 프로퍼티",
    "companyNameEn": "Essex Property Trust",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "ETR",
    "companyNameKo": "엔터지",
    "companyNameEn": "Entergy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "EVRG",
    "companyNameKo": "에버지",
    "companyNameEn": "Evergy",
    "exchange": "NASDAQ",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "EW",
    "companyNameKo": "에드워즈 라이프사이언시스",
    "companyNameEn": "Edwards Lifesciences",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "EXC",
    "companyNameKo": "엑셀론",
    "companyNameEn": "Exelon",
    "exchange": "NASDAQ",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "EXPD",
    "companyNameKo": "익스페디터스",
    "companyNameEn": "Expeditors International",
    "exchange": "NASDAQ",
    "sector": "물류"
  },
  {
    "ticker": "EXPE",
    "companyNameKo": "익스피디아 그룹",
    "companyNameEn": "Expedia Group",
    "exchange": "NASDAQ",
    "sector": "온라인 여행"
  },
  {
    "ticker": "EXR",
    "companyNameKo": "엑스트라 스페이스 스토리지",
    "companyNameEn": "Extra Space Storage",
    "exchange": "NYSE",
    "sector": "셀프스토리지 리츠"
  },
  {
    "ticker": "F",
    "companyNameKo": "포드",
    "companyNameEn": "Ford Motor",
    "exchange": "NYSE",
    "sector": "자동차"
  },
  {
    "ticker": "FANG",
    "companyNameKo": "다이아몬드백 에너지",
    "companyNameEn": "Diamondback Energy",
    "exchange": "NASDAQ",
    "sector": "에너지 · 셰일"
  },
  {
    "ticker": "FAST",
    "companyNameKo": "패스널",
    "companyNameEn": "Fastenal",
    "exchange": "NASDAQ",
    "sector": "산업용 유통"
  },
  {
    "ticker": "FDS",
    "companyNameKo": "팩트셋",
    "companyNameEn": "FactSet Research Systems",
    "exchange": "NYSE",
    "sector": "금융데이터"
  },
  {
    "ticker": "FDX",
    "companyNameKo": "페덱스",
    "companyNameEn": "FedEx",
    "exchange": "NYSE",
    "sector": "물류 · 배송"
  },
  {
    "ticker": "FE",
    "companyNameKo": "퍼스트에너지",
    "companyNameEn": "FirstEnergy",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "FFIV",
    "companyNameKo": "F5",
    "companyNameEn": "F5",
    "exchange": "NASDAQ",
    "sector": "네트워크 · 보안"
  },
  {
    "ticker": "FIS",
    "companyNameKo": "피델리티 내셔널 인포메이션",
    "companyNameEn": "Fidelity National Information Services",
    "exchange": "NYSE",
    "sector": "금융 IT"
  },
  {
    "ticker": "FITB",
    "companyNameKo": "피프스서드 뱅코프",
    "companyNameEn": "Fifth Third Bancorp",
    "exchange": "NASDAQ",
    "sector": "은행"
  },
  {
    "ticker": "FMC",
    "companyNameKo": "FMC",
    "companyNameEn": "FMC Corporation",
    "exchange": "NYSE",
    "sector": "농업화학"
  },
  {
    "ticker": "FOX",
    "companyNameKo": "폭스 B",
    "companyNameEn": "Fox Class B",
    "exchange": "NASDAQ",
    "sector": "미디어"
  },
  {
    "ticker": "FOXA",
    "companyNameKo": "폭스 A",
    "companyNameEn": "Fox Class A",
    "exchange": "NASDAQ",
    "sector": "미디어"
  },
  {
    "ticker": "FRT",
    "companyNameKo": "페더럴 리얼티",
    "companyNameEn": "Federal Realty Investment Trust",
    "exchange": "NYSE",
    "sector": "상업용 리츠"
  },
  {
    "ticker": "FTNT",
    "companyNameKo": "포티넷",
    "companyNameEn": "Fortinet",
    "exchange": "NASDAQ",
    "sector": "사이버보안"
  },
  {
    "ticker": "FTV",
    "companyNameKo": "포티브",
    "companyNameEn": "Fortive",
    "exchange": "NYSE",
    "sector": "산업기술"
  },
  {
    "ticker": "GEHC",
    "companyNameKo": "GE 헬스케어",
    "companyNameEn": "GE HealthCare Technologies",
    "exchange": "NASDAQ",
    "sector": "의료기기 · 진단"
  },
  {
    "ticker": "GEN",
    "companyNameKo": "젠 디지털",
    "companyNameEn": "Gen Digital",
    "exchange": "NASDAQ",
    "sector": "소비자 보안 소프트웨어"
  },
  {
    "ticker": "GIS",
    "companyNameKo": "제너럴 밀스",
    "companyNameEn": "General Mills",
    "exchange": "NYSE",
    "sector": "가공식품"
  },
  {
    "ticker": "GL",
    "companyNameKo": "글로브 라이프",
    "companyNameEn": "Globe Life",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "GLW",
    "companyNameKo": "코닝",
    "companyNameEn": "Corning",
    "exchange": "NYSE",
    "sector": "유리 · 디스플레이 소재"
  },
  {
    "ticker": "GM",
    "companyNameKo": "제너럴 모터스",
    "companyNameEn": "General Motors",
    "exchange": "NYSE",
    "sector": "자동차"
  },
  {
    "ticker": "GNRC",
    "companyNameKo": "제너랙",
    "companyNameEn": "Generac Holdings",
    "exchange": "NYSE",
    "sector": "발전기 · 에너지 장비"
  },
  {
    "ticker": "GPC",
    "companyNameKo": "제뉴인 파츠",
    "companyNameEn": "Genuine Parts",
    "exchange": "NYSE",
    "sector": "자동차 부품 유통"
  },
  {
    "ticker": "GPN",
    "companyNameKo": "글로벌 페이먼츠",
    "companyNameEn": "Global Payments",
    "exchange": "NYSE",
    "sector": "결제 · 핀테크"
  },
  {
    "ticker": "GRMN",
    "companyNameKo": "가민",
    "companyNameEn": "Garmin",
    "exchange": "NYSE",
    "sector": "웨어러블 · 내비게이션"
  },
  {
    "ticker": "GWW",
    "companyNameKo": "WW 그레인저",
    "companyNameEn": "W.W. Grainger",
    "exchange": "NYSE",
    "sector": "산업용 유통"
  },
  {
    "ticker": "HAL",
    "companyNameKo": "할리버튼",
    "companyNameEn": "Halliburton",
    "exchange": "NYSE",
    "sector": "유전서비스"
  },
  {
    "ticker": "HAS",
    "companyNameKo": "해즈브로",
    "companyNameEn": "Hasbro",
    "exchange": "NASDAQ",
    "sector": "완구 · 콘텐츠"
  },
  {
    "ticker": "HBAN",
    "companyNameKo": "헌팅턴 뱅크셰어스",
    "companyNameEn": "Huntington Bancshares",
    "exchange": "NASDAQ",
    "sector": "은행"
  },
  {
    "ticker": "HES",
    "companyNameKo": "헤스",
    "companyNameEn": "Hess",
    "exchange": "NYSE",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "HIG",
    "companyNameKo": "하트포드 파이낸셜",
    "companyNameEn": "Hartford Financial Services",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "HII",
    "companyNameKo": "헌팅턴 잉걸스",
    "companyNameEn": "Huntington Ingalls Industries",
    "exchange": "NYSE",
    "sector": "조선 · 방산"
  },
  {
    "ticker": "HLT",
    "companyNameKo": "힐튼",
    "companyNameEn": "Hilton Worldwide",
    "exchange": "NYSE",
    "sector": "호텔 · 여행"
  },
  {
    "ticker": "HOLX",
    "companyNameKo": "홀로직",
    "companyNameEn": "Hologic",
    "exchange": "NASDAQ",
    "sector": "의료기기 · 진단"
  },
  {
    "ticker": "HPE",
    "companyNameKo": "휴렛팩커드 엔터프라이즈",
    "companyNameEn": "Hewlett Packard Enterprise",
    "exchange": "NYSE",
    "sector": "서버 · IT 인프라"
  },
  {
    "ticker": "HPQ",
    "companyNameKo": "HP",
    "companyNameEn": "HP Inc.",
    "exchange": "NYSE",
    "sector": "PC · 프린터"
  },
  {
    "ticker": "HRL",
    "companyNameKo": "호멜 푸즈",
    "companyNameEn": "Hormel Foods",
    "exchange": "NYSE",
    "sector": "가공식품"
  },
  {
    "ticker": "HSIC",
    "companyNameKo": "헨리 샤인",
    "companyNameEn": "Henry Schein",
    "exchange": "NASDAQ",
    "sector": "의료용품 유통"
  },
  {
    "ticker": "HST",
    "companyNameKo": "호스트 호텔스&리조트",
    "companyNameEn": "Host Hotels & Resorts",
    "exchange": "NASDAQ",
    "sector": "호텔 리츠"
  },
  {
    "ticker": "HSY",
    "companyNameKo": "허쉬",
    "companyNameEn": "Hershey",
    "exchange": "NYSE",
    "sector": "초콜릿 · 스낵"
  },
  {
    "ticker": "HUM",
    "companyNameKo": "휴매나",
    "companyNameEn": "Humana",
    "exchange": "NYSE",
    "sector": "헬스케어 보험"
  },
  {
    "ticker": "HWM",
    "companyNameKo": "하우멧 에어로스페이스",
    "companyNameEn": "Howmet Aerospace",
    "exchange": "NYSE",
    "sector": "항공부품"
  },
  {
    "ticker": "IDXX",
    "companyNameKo": "아이덱스 래버러토리스",
    "companyNameEn": "IDEXX Laboratories",
    "exchange": "NASDAQ",
    "sector": "동물진단 · 의료"
  },
  {
    "ticker": "IEX",
    "companyNameKo": "아이덱스",
    "companyNameEn": "IDEX Corporation",
    "exchange": "NYSE",
    "sector": "산업기기"
  },
  {
    "ticker": "IFF",
    "companyNameKo": "인터내셔널 플레이버스&프래그런스",
    "companyNameEn": "International Flavors & Fragrances",
    "exchange": "NYSE",
    "sector": "향료 · 식품소재"
  },
  {
    "ticker": "ILMN",
    "companyNameKo": "일루미나",
    "companyNameEn": "Illumina",
    "exchange": "NASDAQ",
    "sector": "유전체 분석"
  },
  {
    "ticker": "INCY",
    "companyNameKo": "인사이트",
    "companyNameEn": "Incyte",
    "exchange": "NASDAQ",
    "sector": "바이오 · 신약개발"
  },
  {
    "ticker": "INVH",
    "companyNameKo": "인비테이션 홈즈",
    "companyNameEn": "Invitation Homes",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "IP",
    "companyNameKo": "인터내셔널 페이퍼",
    "companyNameEn": "International Paper",
    "exchange": "NYSE",
    "sector": "포장재 · 종이"
  },
  {
    "ticker": "IPG",
    "companyNameKo": "인터퍼블릭 그룹",
    "companyNameEn": "Interpublic Group",
    "exchange": "NYSE",
    "sector": "광고 · 마케팅"
  },
  {
    "ticker": "IQV",
    "companyNameKo": "아이큐비아",
    "companyNameEn": "IQVIA Holdings",
    "exchange": "NYSE",
    "sector": "임상시험 · 헬스케어 데이터"
  },
  {
    "ticker": "IR",
    "companyNameKo": "잉가솔랜드",
    "companyNameEn": "Ingersoll Rand",
    "exchange": "NYSE",
    "sector": "산업기기"
  },
  {
    "ticker": "IRM",
    "companyNameKo": "아이언마운틴",
    "companyNameEn": "Iron Mountain",
    "exchange": "NYSE",
    "sector": "문서보관 · 데이터센터"
  },
  {
    "ticker": "IT",
    "companyNameKo": "가트너",
    "companyNameEn": "Gartner",
    "exchange": "NYSE",
    "sector": "IT 리서치 · 컨설팅"
  },
  {
    "ticker": "IVZ",
    "companyNameKo": "인베스코",
    "companyNameEn": "Invesco",
    "exchange": "NYSE",
    "sector": "자산운용"
  },
  {
    "ticker": "J",
    "companyNameKo": "제이콥스 솔루션즈",
    "companyNameEn": "Jacobs Solutions",
    "exchange": "NYSE",
    "sector": "엔지니어링 · 인프라"
  },
  {
    "ticker": "JBHT",
    "companyNameKo": "JB 헌트",
    "companyNameEn": "J.B. Hunt Transport Services",
    "exchange": "NASDAQ",
    "sector": "운송 · 물류"
  },
  {
    "ticker": "JCI",
    "companyNameKo": "존슨컨트롤즈",
    "companyNameEn": "Johnson Controls",
    "exchange": "NYSE",
    "sector": "빌딩자동화 · 공조"
  },
  {
    "ticker": "JKHY",
    "companyNameKo": "잭헨리&어소시에이츠",
    "companyNameEn": "Jack Henry & Associates",
    "exchange": "NASDAQ",
    "sector": "금융 IT"
  },
  {
    "ticker": "JNPR",
    "companyNameKo": "주니퍼 네트웍스",
    "companyNameEn": "Juniper Networks",
    "exchange": "NYSE",
    "sector": "네트워크 장비"
  },
  {
    "ticker": "K",
    "companyNameKo": "켈라노바",
    "companyNameEn": "Kellanova",
    "exchange": "NYSE",
    "sector": "스낵 · 식품"
  },
  {
    "ticker": "KDP",
    "companyNameKo": "큐리그 닥터페퍼",
    "companyNameEn": "Keurig Dr Pepper",
    "exchange": "NASDAQ",
    "sector": "음료"
  },
  {
    "ticker": "KEY",
    "companyNameKo": "키코프",
    "companyNameEn": "KeyCorp",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "KEYS",
    "companyNameKo": "키사이트 테크놀로지스",
    "companyNameEn": "Keysight Technologies",
    "exchange": "NYSE",
    "sector": "전자계측 장비"
  },
  {
    "ticker": "KHC",
    "companyNameKo": "크래프트하인즈",
    "companyNameEn": "Kraft Heinz",
    "exchange": "NASDAQ",
    "sector": "가공식품"
  },
  {
    "ticker": "KIM",
    "companyNameKo": "킴코 리얼티",
    "companyNameEn": "Kimco Realty",
    "exchange": "NYSE",
    "sector": "상업용 리츠"
  },
  {
    "ticker": "KMB",
    "companyNameKo": "킴벌리클라크",
    "companyNameEn": "Kimberly-Clark",
    "exchange": "NYSE",
    "sector": "생활용품"
  },
  {
    "ticker": "KMI",
    "companyNameKo": "킨더모건",
    "companyNameEn": "Kinder Morgan",
    "exchange": "NYSE",
    "sector": "에너지 인프라"
  },
  {
    "ticker": "KMX",
    "companyNameKo": "카맥스",
    "companyNameEn": "CarMax",
    "exchange": "NYSE",
    "sector": "중고차 유통"
  },
  {
    "ticker": "KR",
    "companyNameKo": "크로거",
    "companyNameEn": "Kroger",
    "exchange": "NYSE",
    "sector": "식료품 유통"
  },
  {
    "ticker": "KVUE",
    "companyNameKo": "켄뷰",
    "companyNameEn": "Kenvue",
    "exchange": "NYSE",
    "sector": "소비자 헬스케어"
  },
  {
    "ticker": "L",
    "companyNameKo": "로우스",
    "companyNameEn": "Loews",
    "exchange": "NYSE",
    "sector": "보험 · 지주회사"
  },
  {
    "ticker": "LDOS",
    "companyNameKo": "리이도스",
    "companyNameEn": "Leidos Holdings",
    "exchange": "NYSE",
    "sector": "국방 IT · 서비스"
  },
  {
    "ticker": "LEN",
    "companyNameKo": "레나",
    "companyNameEn": "Lennar",
    "exchange": "NYSE",
    "sector": "주택건설"
  },
  {
    "ticker": "LH",
    "companyNameKo": "랩코프",
    "companyNameEn": "Labcorp",
    "exchange": "NYSE",
    "sector": "진단검사"
  },
  {
    "ticker": "LHX",
    "companyNameKo": "L3해리스",
    "companyNameEn": "L3Harris Technologies",
    "exchange": "NYSE",
    "sector": "방산 · 통신장비"
  },
  {
    "ticker": "LKQ",
    "companyNameKo": "LKQ",
    "companyNameEn": "LKQ Corporation",
    "exchange": "NASDAQ",
    "sector": "자동차 부품 유통"
  },
  {
    "ticker": "LNT",
    "companyNameKo": "얼라이언트 에너지",
    "companyNameEn": "Alliant Energy",
    "exchange": "NASDAQ",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "LULU",
    "companyNameKo": "룰루레몬",
    "companyNameEn": "Lululemon Athletica",
    "exchange": "NASDAQ",
    "sector": "스포츠웨어"
  },
  {
    "ticker": "LUV",
    "companyNameKo": "사우스웨스트항공",
    "companyNameEn": "Southwest Airlines",
    "exchange": "NYSE",
    "sector": "항공"
  },
  {
    "ticker": "LVS",
    "companyNameKo": "라스베이거스 샌즈",
    "companyNameEn": "Las Vegas Sands",
    "exchange": "NYSE",
    "sector": "카지노 · 리조트"
  },
  {
    "ticker": "LW",
    "companyNameKo": "램웨스턴",
    "companyNameEn": "Lamb Weston",
    "exchange": "NYSE",
    "sector": "식품 · 감자제품"
  },
  {
    "ticker": "LYB",
    "companyNameKo": "라이온델바젤",
    "companyNameEn": "LyondellBasell",
    "exchange": "NYSE",
    "sector": "화학 · 소재"
  },
  {
    "ticker": "LYV",
    "companyNameKo": "라이브네이션",
    "companyNameEn": "Live Nation Entertainment",
    "exchange": "NYSE",
    "sector": "공연 · 티켓팅"
  },
  {
    "ticker": "MAA",
    "companyNameKo": "미드아메리카 아파트먼트",
    "companyNameEn": "Mid-America Apartment Communities",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "MAS",
    "companyNameKo": "마스코",
    "companyNameEn": "Masco",
    "exchange": "NYSE",
    "sector": "건자재 · 주택개선"
  },
  {
    "ticker": "MCHP",
    "companyNameKo": "마이크로칩 테크놀로지",
    "companyNameEn": "Microchip Technology",
    "exchange": "NASDAQ",
    "sector": "반도체 · MCU"
  },
  {
    "ticker": "MET",
    "companyNameKo": "메트라이프",
    "companyNameEn": "MetLife",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "MGM",
    "companyNameKo": "MGM 리조트",
    "companyNameEn": "MGM Resorts International",
    "exchange": "NYSE",
    "sector": "카지노 · 리조트"
  },
  {
    "ticker": "MHK",
    "companyNameKo": "모호크 인더스트리스",
    "companyNameEn": "Mohawk Industries",
    "exchange": "NYSE",
    "sector": "바닥재 · 건자재"
  },
  {
    "ticker": "MKC",
    "companyNameKo": "맥코믹",
    "companyNameEn": "McCormick",
    "exchange": "NYSE",
    "sector": "향신료 · 식품"
  },
  {
    "ticker": "MKTX",
    "companyNameKo": "마켓액세스",
    "companyNameEn": "MarketAxess Holdings",
    "exchange": "NASDAQ",
    "sector": "전자채권거래"
  },
  {
    "ticker": "MLM",
    "companyNameKo": "마틴 마리에타",
    "companyNameEn": "Martin Marietta Materials",
    "exchange": "NYSE",
    "sector": "건자재 · 골재"
  },
  {
    "ticker": "MMM",
    "companyNameKo": "3M",
    "companyNameEn": "3M",
    "exchange": "NYSE",
    "sector": "산업재 · 소재"
  },
  {
    "ticker": "MNST",
    "companyNameKo": "몬스터 베버리지",
    "companyNameEn": "Monster Beverage",
    "exchange": "NASDAQ",
    "sector": "에너지드링크"
  },
  {
    "ticker": "MOH",
    "companyNameKo": "몰리나 헬스케어",
    "companyNameEn": "Molina Healthcare",
    "exchange": "NYSE",
    "sector": "헬스케어 보험"
  },
  {
    "ticker": "MOS",
    "companyNameKo": "모자이크",
    "companyNameEn": "Mosaic",
    "exchange": "NYSE",
    "sector": "비료 · 농업소재"
  },
  {
    "ticker": "MPWR",
    "companyNameKo": "모놀리식 파워 시스템즈",
    "companyNameEn": "Monolithic Power Systems",
    "exchange": "NASDAQ",
    "sector": "전력반도체"
  },
  {
    "ticker": "MRK",
    "companyNameKo": "머크",
    "companyNameEn": "Merck & Co.",
    "exchange": "NYSE",
    "sector": "제약 · 백신"
  },
  {
    "ticker": "MRNA",
    "companyNameKo": "모더나",
    "companyNameEn": "Moderna",
    "exchange": "NASDAQ",
    "sector": "바이오 · mRNA"
  },
  {
    "ticker": "MSCI",
    "companyNameKo": "MSCI",
    "companyNameEn": "MSCI Inc.",
    "exchange": "NYSE",
    "sector": "금융지수 · 데이터"
  },
  {
    "ticker": "MTB",
    "companyNameKo": "M&T 뱅크",
    "companyNameEn": "M&T Bank",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "MTCH",
    "companyNameKo": "매치그룹",
    "companyNameEn": "Match Group",
    "exchange": "NASDAQ",
    "sector": "온라인 데이팅"
  },
  {
    "ticker": "MTD",
    "companyNameKo": "메틀러톨레도",
    "companyNameEn": "Mettler-Toledo",
    "exchange": "NYSE",
    "sector": "정밀계측 장비"
  },
  {
    "ticker": "NCLH",
    "companyNameKo": "노르웨이지안 크루즈라인",
    "companyNameEn": "Norwegian Cruise Line",
    "exchange": "NYSE",
    "sector": "크루즈 · 여행"
  },
  {
    "ticker": "NDAQ",
    "companyNameKo": "나스닥",
    "companyNameEn": "Nasdaq",
    "exchange": "NASDAQ",
    "sector": "거래소 · 금융데이터"
  },
  {
    "ticker": "NDSN",
    "companyNameKo": "노드슨",
    "companyNameEn": "Nordson",
    "exchange": "NASDAQ",
    "sector": "정밀장비"
  },
  {
    "ticker": "NEM",
    "companyNameKo": "뉴몬트",
    "companyNameEn": "Newmont",
    "exchange": "NYSE",
    "sector": "금광 · 원자재"
  },
  {
    "ticker": "NI",
    "companyNameKo": "니소스",
    "companyNameEn": "NiSource",
    "exchange": "NYSE",
    "sector": "가스 · 전력 유틸리티"
  },
  {
    "ticker": "NRG",
    "companyNameKo": "NRG 에너지",
    "companyNameEn": "NRG Energy",
    "exchange": "NYSE",
    "sector": "전력 · 에너지"
  },
  {
    "ticker": "NSC",
    "companyNameKo": "노퍽서던",
    "companyNameEn": "Norfolk Southern",
    "exchange": "NYSE",
    "sector": "철도 · 물류"
  },
  {
    "ticker": "NTAP",
    "companyNameKo": "넷앱",
    "companyNameEn": "NetApp",
    "exchange": "NASDAQ",
    "sector": "스토리지 · 클라우드 인프라"
  },
  {
    "ticker": "NTRS",
    "companyNameKo": "노던트러스트",
    "companyNameEn": "Northern Trust",
    "exchange": "NASDAQ",
    "sector": "수탁은행 · 자산관리"
  },
  {
    "ticker": "NUE",
    "companyNameKo": "뉴코어",
    "companyNameEn": "Nucor",
    "exchange": "NYSE",
    "sector": "철강"
  },
  {
    "ticker": "NVR",
    "companyNameKo": "NVR",
    "companyNameEn": "NVR",
    "exchange": "NYSE",
    "sector": "주택건설"
  },
  {
    "ticker": "NWS",
    "companyNameKo": "뉴스코퍼레이션 B",
    "companyNameEn": "News Corp Class B",
    "exchange": "NASDAQ",
    "sector": "미디어 · 출판"
  },
  {
    "ticker": "NWSA",
    "companyNameKo": "뉴스코퍼레이션 A",
    "companyNameEn": "News Corp Class A",
    "exchange": "NASDAQ",
    "sector": "미디어 · 출판"
  },
  {
    "ticker": "ODFL",
    "companyNameKo": "올드도미니언",
    "companyNameEn": "Old Dominion Freight Line",
    "exchange": "NASDAQ",
    "sector": "트럭운송"
  },
  {
    "ticker": "OKE",
    "companyNameKo": "원오크",
    "companyNameEn": "ONEOK",
    "exchange": "NYSE",
    "sector": "에너지 인프라"
  },
  {
    "ticker": "OMC",
    "companyNameKo": "옴니콤",
    "companyNameEn": "Omnicom Group",
    "exchange": "NYSE",
    "sector": "광고 · 마케팅"
  },
  {
    "ticker": "OTIS",
    "companyNameKo": "오티스",
    "companyNameEn": "Otis Worldwide",
    "exchange": "NYSE",
    "sector": "엘리베이터 · 산업재"
  },
  {
    "ticker": "OXY",
    "companyNameKo": "옥시덴털 페트롤리엄",
    "companyNameEn": "Occidental Petroleum",
    "exchange": "NYSE",
    "sector": "에너지 · 석유가스"
  },
  {
    "ticker": "PARA",
    "companyNameKo": "파라마운트 글로벌",
    "companyNameEn": "Paramount Global",
    "exchange": "NASDAQ",
    "sector": "미디어 · 콘텐츠"
  },
  {
    "ticker": "PAYC",
    "companyNameKo": "페이컴",
    "companyNameEn": "Paycom Software",
    "exchange": "NYSE",
    "sector": "인사관리 소프트웨어"
  },
  {
    "ticker": "PAYX",
    "companyNameKo": "페이첵스",
    "companyNameEn": "Paychex",
    "exchange": "NASDAQ",
    "sector": "급여관리 서비스"
  },
  {
    "ticker": "PCAR",
    "companyNameKo": "파카",
    "companyNameEn": "PACCAR",
    "exchange": "NASDAQ",
    "sector": "트럭 · 산업재"
  },
  {
    "ticker": "PCG",
    "companyNameKo": "PG&E",
    "companyNameEn": "PG&E Corporation",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "PEG",
    "companyNameKo": "퍼블릭서비스 엔터프라이즈",
    "companyNameEn": "Public Service Enterprise Group",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "PFG",
    "companyNameKo": "프린시펄 파이낸셜",
    "companyNameEn": "Principal Financial Group",
    "exchange": "NASDAQ",
    "sector": "보험 · 자산관리"
  },
  {
    "ticker": "PHM",
    "companyNameKo": "풀테그룹",
    "companyNameEn": "PulteGroup",
    "exchange": "NYSE",
    "sector": "주택건설"
  },
  {
    "ticker": "PKG",
    "companyNameKo": "패키징 코퍼레이션",
    "companyNameEn": "Packaging Corporation of America",
    "exchange": "NYSE",
    "sector": "포장재"
  },
  {
    "ticker": "PNR",
    "companyNameKo": "펜테어",
    "companyNameEn": "Pentair",
    "exchange": "NYSE",
    "sector": "수처리 · 산업재"
  },
  {
    "ticker": "PNW",
    "companyNameKo": "피나클 웨스트",
    "companyNameEn": "Pinnacle West Capital",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "PODD",
    "companyNameKo": "인슐렛",
    "companyNameEn": "Insulet",
    "exchange": "NASDAQ",
    "sector": "당뇨 의료기기"
  },
  {
    "ticker": "POOL",
    "companyNameKo": "풀 코퍼레이션",
    "companyNameEn": "Pool Corporation",
    "exchange": "NASDAQ",
    "sector": "수영장 용품 유통"
  },
  {
    "ticker": "PPG",
    "companyNameKo": "PPG 인더스트리스",
    "companyNameEn": "PPG Industries",
    "exchange": "NYSE",
    "sector": "페인트 · 코팅"
  },
  {
    "ticker": "PPL",
    "companyNameKo": "PPL",
    "companyNameEn": "PPL Corporation",
    "exchange": "NYSE",
    "sector": "전력 · 유틸리티"
  },
  {
    "ticker": "PRU",
    "companyNameKo": "프루덴셜 파이낸셜",
    "companyNameEn": "Prudential Financial",
    "exchange": "NYSE",
    "sector": "보험 · 금융"
  },
  {
    "ticker": "PSX",
    "companyNameKo": "필립스66",
    "companyNameEn": "Phillips 66",
    "exchange": "NYSE",
    "sector": "정유 · 에너지"
  },
  {
    "ticker": "PTC",
    "companyNameKo": "PTC",
    "companyNameEn": "PTC Inc.",
    "exchange": "NASDAQ",
    "sector": "산업 소프트웨어"
  },
  {
    "ticker": "PWR",
    "companyNameKo": "콴타 서비스",
    "companyNameEn": "Quanta Services",
    "exchange": "NYSE",
    "sector": "전력 인프라"
  },
  {
    "ticker": "QRVO",
    "companyNameKo": "코보",
    "companyNameEn": "Qorvo",
    "exchange": "NASDAQ",
    "sector": "RF 반도체"
  },
  {
    "ticker": "RCL",
    "companyNameKo": "로얄캐리비안",
    "companyNameEn": "Royal Caribbean Cruises",
    "exchange": "NYSE",
    "sector": "크루즈 · 여행"
  },
  {
    "ticker": "REG",
    "companyNameKo": "리젠시 센터스",
    "companyNameEn": "Regency Centers",
    "exchange": "NASDAQ",
    "sector": "상업용 리츠"
  },
  {
    "ticker": "RF",
    "companyNameKo": "리전스 파이낸셜",
    "companyNameEn": "Regions Financial",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "RHI",
    "companyNameKo": "로버트 하프",
    "companyNameEn": "Robert Half",
    "exchange": "NYSE",
    "sector": "인력 · 채용 서비스"
  },
  {
    "ticker": "RJF",
    "companyNameKo": "레이먼드 제임스",
    "companyNameEn": "Raymond James Financial",
    "exchange": "NYSE",
    "sector": "증권 · 자산관리"
  },
  {
    "ticker": "RL",
    "companyNameKo": "랄프 로렌",
    "companyNameEn": "Ralph Lauren",
    "exchange": "NYSE",
    "sector": "패션 · 브랜드"
  },
  {
    "ticker": "RMD",
    "companyNameKo": "레즈메드",
    "companyNameEn": "ResMed",
    "exchange": "NYSE",
    "sector": "의료기기 · 수면치료"
  },
  {
    "ticker": "ROK",
    "companyNameKo": "록웰 오토메이션",
    "companyNameEn": "Rockwell Automation",
    "exchange": "NYSE",
    "sector": "산업자동화"
  },
  {
    "ticker": "ROL",
    "companyNameKo": "롤린스",
    "companyNameEn": "Rollins",
    "exchange": "NYSE",
    "sector": "해충방제 서비스"
  },
  {
    "ticker": "ROP",
    "companyNameKo": "로퍼 테크놀로지스",
    "companyNameEn": "Roper Technologies",
    "exchange": "NASDAQ",
    "sector": "소프트웨어 · 산업기술"
  },
  {
    "ticker": "ROST",
    "companyNameKo": "로스 스토어스",
    "companyNameEn": "Ross Stores",
    "exchange": "NASDAQ",
    "sector": "할인 유통"
  },
  {
    "ticker": "RSG",
    "companyNameKo": "리퍼블릭 서비스",
    "companyNameEn": "Republic Services",
    "exchange": "NYSE",
    "sector": "폐기물 처리"
  },
  {
    "ticker": "RVTY",
    "companyNameKo": "레비티",
    "companyNameEn": "Revvity",
    "exchange": "NYSE",
    "sector": "생명과학 장비"
  },
  {
    "ticker": "SBAC",
    "companyNameKo": "SBA 커뮤니케이션스",
    "companyNameEn": "SBA Communications",
    "exchange": "NASDAQ",
    "sector": "통신타워 리츠"
  },
  {
    "ticker": "SJM",
    "companyNameKo": "JM 스머커",
    "companyNameEn": "J.M. Smucker",
    "exchange": "NYSE",
    "sector": "식품 · 커피"
  },
  {
    "ticker": "SNA",
    "companyNameKo": "스냅온",
    "companyNameEn": "Snap-on",
    "exchange": "NYSE",
    "sector": "공구 · 산업재"
  },
  {
    "ticker": "SRE",
    "companyNameKo": "셈프라",
    "companyNameEn": "Sempra",
    "exchange": "NYSE",
    "sector": "에너지 인프라 · 유틸리티"
  },
  {
    "ticker": "STE",
    "companyNameKo": "스테리스",
    "companyNameEn": "STERIS",
    "exchange": "NYSE",
    "sector": "멸균 · 의료장비"
  },
  {
    "ticker": "STLD",
    "companyNameKo": "스틸 다이내믹스",
    "companyNameEn": "Steel Dynamics",
    "exchange": "NASDAQ",
    "sector": "철강"
  },
  {
    "ticker": "STT",
    "companyNameKo": "스테이트스트리트",
    "companyNameEn": "State Street",
    "exchange": "NYSE",
    "sector": "수탁은행 · 자산운용"
  },
  {
    "ticker": "STX",
    "companyNameKo": "씨게이트",
    "companyNameEn": "Seagate Technology",
    "exchange": "NASDAQ",
    "sector": "데이터 저장장치"
  },
  {
    "ticker": "STZ",
    "companyNameKo": "컨스텔레이션 브랜즈",
    "companyNameEn": "Constellation Brands",
    "exchange": "NYSE",
    "sector": "주류 · 소비재"
  },
  {
    "ticker": "SWK",
    "companyNameKo": "스탠리블랙앤데커",
    "companyNameEn": "Stanley Black & Decker",
    "exchange": "NYSE",
    "sector": "공구 · 산업재"
  },
  {
    "ticker": "SWKS",
    "companyNameKo": "스카이웍스 솔루션즈",
    "companyNameEn": "Skyworks Solutions",
    "exchange": "NASDAQ",
    "sector": "RF 반도체"
  },
  {
    "ticker": "SYF",
    "companyNameKo": "싱크로니 파이낸셜",
    "companyNameEn": "Synchrony Financial",
    "exchange": "NYSE",
    "sector": "소비자 금융"
  },
  {
    "ticker": "SYY",
    "companyNameKo": "시스코 푸즈",
    "companyNameEn": "Sysco",
    "exchange": "NYSE",
    "sector": "식자재 유통"
  },
  {
    "ticker": "TAP",
    "companyNameKo": "몰슨 쿠어스",
    "companyNameEn": "Molson Coors Beverage",
    "exchange": "NYSE",
    "sector": "주류"
  },
  {
    "ticker": "TDY",
    "companyNameKo": "텔레다인 테크놀로지스",
    "companyNameEn": "Teledyne Technologies",
    "exchange": "NYSE",
    "sector": "계측 · 방산기술"
  },
  {
    "ticker": "TECH",
    "companyNameKo": "바이오테크네",
    "companyNameEn": "Bio-Techne",
    "exchange": "NASDAQ",
    "sector": "생명과학 시약"
  },
  {
    "ticker": "TEL",
    "companyNameKo": "TE 커넥티비티",
    "companyNameEn": "TE Connectivity",
    "exchange": "NYSE",
    "sector": "전자부품 · 커넥터"
  },
  {
    "ticker": "TER",
    "companyNameKo": "테라다인",
    "companyNameEn": "Teradyne",
    "exchange": "NASDAQ",
    "sector": "반도체 테스트 장비"
  },
  {
    "ticker": "TFC",
    "companyNameKo": "트루이스트 파이낸셜",
    "companyNameEn": "Truist Financial",
    "exchange": "NYSE",
    "sector": "은행"
  },
  {
    "ticker": "TFX",
    "companyNameKo": "텔레플렉스",
    "companyNameEn": "Teleflex",
    "exchange": "NYSE",
    "sector": "의료기기"
  },
  {
    "ticker": "TGT",
    "companyNameKo": "타깃",
    "companyNameEn": "Target",
    "exchange": "NYSE",
    "sector": "유통 · 할인점"
  },
  {
    "ticker": "TMUS",
    "companyNameKo": "T-모바일 US",
    "companyNameEn": "T-Mobile US",
    "exchange": "NASDAQ",
    "sector": "통신 · 5G"
  },
  {
    "ticker": "TPR",
    "companyNameKo": "태피스트리",
    "companyNameEn": "Tapestry",
    "exchange": "NYSE",
    "sector": "패션 · 명품"
  },
  {
    "ticker": "TRGP",
    "companyNameKo": "타르가 리소스",
    "companyNameEn": "Targa Resources",
    "exchange": "NYSE",
    "sector": "에너지 인프라"
  },
  {
    "ticker": "TRMB",
    "companyNameKo": "트림블",
    "companyNameEn": "Trimble",
    "exchange": "NASDAQ",
    "sector": "산업 소프트웨어 · 위치정보"
  },
  {
    "ticker": "TROW",
    "companyNameKo": "T. 로우 프라이스",
    "companyNameEn": "T. Rowe Price",
    "exchange": "NASDAQ",
    "sector": "자산운용"
  },
  {
    "ticker": "TRV",
    "companyNameKo": "트래블러스",
    "companyNameEn": "Travelers",
    "exchange": "NYSE",
    "sector": "보험"
  },
  {
    "ticker": "TSCO",
    "companyNameKo": "트랙터 서플라이",
    "companyNameEn": "Tractor Supply",
    "exchange": "NASDAQ",
    "sector": "농촌 라이프스타일 유통"
  },
  {
    "ticker": "TSN",
    "companyNameKo": "타이슨푸드",
    "companyNameEn": "Tyson Foods",
    "exchange": "NYSE",
    "sector": "육가공 · 식품"
  },
  {
    "ticker": "TTWO",
    "companyNameKo": "테이크투 인터랙티브",
    "companyNameEn": "Take-Two Interactive",
    "exchange": "NASDAQ",
    "sector": "게임"
  },
  {
    "ticker": "TXT",
    "companyNameKo": "텍스트론",
    "companyNameEn": "Textron",
    "exchange": "NYSE",
    "sector": "항공 · 산업재"
  },
  {
    "ticker": "TYL",
    "companyNameKo": "타일러 테크놀로지스",
    "companyNameEn": "Tyler Technologies",
    "exchange": "NYSE",
    "sector": "공공 소프트웨어"
  },
  {
    "ticker": "UAL",
    "companyNameKo": "유나이티드항공",
    "companyNameEn": "United Airlines",
    "exchange": "NASDAQ",
    "sector": "항공"
  },
  {
    "ticker": "UDR",
    "companyNameKo": "UDR",
    "companyNameEn": "UDR Inc.",
    "exchange": "NYSE",
    "sector": "주거 리츠"
  },
  {
    "ticker": "UHS",
    "companyNameKo": "유니버설 헬스 서비스",
    "companyNameEn": "Universal Health Services",
    "exchange": "NYSE",
    "sector": "병원 · 헬스케어"
  },
  {
    "ticker": "ULTA",
    "companyNameKo": "울타뷰티",
    "companyNameEn": "Ulta Beauty",
    "exchange": "NASDAQ",
    "sector": "화장품 유통"
  },
  {
    "ticker": "URI",
    "companyNameKo": "유나이티드 렌털스",
    "companyNameEn": "United Rentals",
    "exchange": "NYSE",
    "sector": "장비 렌털"
  },
  {
    "ticker": "VLO",
    "companyNameKo": "발레로 에너지",
    "companyNameEn": "Valero Energy",
    "exchange": "NYSE",
    "sector": "정유 · 에너지"
  },
  {
    "ticker": "VLTO",
    "companyNameKo": "베랄토",
    "companyNameEn": "Veralto",
    "exchange": "NYSE",
    "sector": "수처리 · 계측"
  },
  {
    "ticker": "VMC",
    "companyNameKo": "벌컨 머티리얼스",
    "companyNameEn": "Vulcan Materials",
    "exchange": "NYSE",
    "sector": "건자재 · 골재"
  },
  {
    "ticker": "VRSK",
    "companyNameKo": "베리스크 애널리틱스",
    "companyNameEn": "Verisk Analytics",
    "exchange": "NASDAQ",
    "sector": "보험 데이터 · 분석"
  },
  {
    "ticker": "VRSN",
    "companyNameKo": "베리사인",
    "companyNameEn": "VeriSign",
    "exchange": "NASDAQ",
    "sector": "도메인 인프라"
  },
  {
    "ticker": "VTR",
    "companyNameKo": "벤타스",
    "companyNameEn": "Ventas",
    "exchange": "NYSE",
    "sector": "헬스케어 리츠"
  },
  {
    "ticker": "VTRS",
    "companyNameKo": "비아트리스",
    "companyNameEn": "Viatris",
    "exchange": "NASDAQ",
    "sector": "제네릭 의약품"
  },
  {
    "ticker": "WAB",
    "companyNameKo": "웨스팅하우스 에어브레이크",
    "companyNameEn": "Wabtec",
    "exchange": "NYSE",
    "sector": "철도 장비"
  },
  {
    "ticker": "WAT",
    "companyNameKo": "워터스",
    "companyNameEn": "Waters Corporation",
    "exchange": "NYSE",
    "sector": "분석장비"
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPrimaryTheme(sector: string) {
  if (/반도체|메모리|AI 반도체|데이터센터|전자부품|장비|소켓|칩|Semiconductor/i.test(sector)) return "반도체와 AI 인프라";
  if (/2차전지|배터리|리튬|전해액|양극재|동박/i.test(sector)) return "2차전지 밸류체인";
  if (/바이오|제약|헬스케어|의료|진단|생명과학|비만|mRNA/i.test(sector)) return "헬스케어와 바이오 성장성";
  if (/은행|금융|보험|증권|자산운용|결제|핀테크|카드/i.test(sector)) return "금리와 금융 사이클";
  if (/자동차|전기차|모빌리티|부품|타이어|자율주행/i.test(sector)) return "전기차와 모빌리티 전환";
  if (/클라우드|소프트웨어|인터넷|플랫폼|AI|데이터|사이버보안|보안|IT/i.test(sector)) return "소프트웨어와 플랫폼 확장성";
  if (/조선|방산|항공|우주|원전|전력기기|철도|산업재/i.test(sector)) return "수주 산업과 인프라 투자";
  if (/에너지|정유|석유|전력|가스|유틸리티|재생에너지|태양광|원전/i.test(sector)) return "에너지 가격과 인프라 전환";
  if (/유통|음식료|소비재|패션|화장품|외식|호텔|여행|엔터|게임|미디어|콘텐츠/i.test(sector)) return "소비 트렌드와 브랜드 경쟁력";
  if (/건설|리츠|부동산|주택|건자재/i.test(sector)) return "금리와 부동산 사이클";
  return "산업 대표 기업의 경쟁력";
}

function getRiskTheme(sector: string) {
  if (/반도체|2차전지|배터리|전기차|소재|화학/i.test(sector)) return "업황 사이클, 재고 부담, 가격 하락, 설비투자 속도";
  if (/바이오|제약|의료/i.test(sector)) return "임상 결과, 규제 승인, 약가 압박, 연구개발비 부담";
  if (/은행|금융|보험|증권|결제/i.test(sector)) return "금리 방향, 대손비용, 자본규제, 경기 둔화";
  if (/소프트웨어|클라우드|플랫폼|인터넷|AI|보안/i.test(sector)) return "높은 밸류에이션, 고객사의 IT 지출 둔화, 경쟁 심화";
  if (/에너지|정유|석유|전력|가스/i.test(sector)) return "원자재 가격 변동, 규제, 설비투자 부담";
  if (/소비재|유통|외식|여행|콘텐츠|게임|엔터/i.test(sector)) return "소비심리 둔화, 브랜드 선호 변화, 마케팅 비용 증가";
  return "경기 둔화, 경쟁 심화, 원가 상승, 기대치 부담";
}

function getFinancialLens(sector: string) {
  if (/반도체|장비|전자부품|PCB|소켓|디스플레이/i.test(sector)) return "수주잔고, 가동률, 고객사 투자 일정, 재고 조정 속도";
  if (/2차전지|배터리|양극재|동박|전해액|리튬|전고체/i.test(sector)) return "판매단가, 원재료 가격, 고객사 출하량, 증설 물량의 수익성";
  if (/바이오|제약|의료|진단|의료기기/i.test(sector)) return "파이프라인 진행률, 승인 일정, 매출 제품의 반복성, 연구개발비 부담";
  if (/은행|금융|보험|증권|카드|결제/i.test(sector)) return "순이자마진, 대손비용, 자본비율, 배당 여력";
  if (/자동차|부품|모빌리티|타이어|전장/i.test(sector)) return "판매 믹스, 원가율, 재고일수, 전동화 부품 비중";
  if (/클라우드|소프트웨어|인터넷|플랫폼|AI|보안|데이터/i.test(sector)) return "매출 유지율, 고객 확장률, 구독 매출 비중, 영업 레버리지";
  if (/조선|방산|항공|우주|전력기기|인프라|건설|플랜트/i.test(sector)) return "수주잔고, 프로젝트 마진, 납기 리스크, 원가 전가력";
  if (/에너지|정유|석유|가스|유틸리티|재생에너지|태양광/i.test(sector)) return "원자재 가격, 정제마진, 전력 수요, 규제 비용";
  if (/소비재|유통|음식료|패션|화장품|외식|여행|콘텐츠|게임|엔터/i.test(sector)) return "객단가, 재구매율, 브랜드 선호, 마케팅 비용 효율";
  return "매출 성장률, 영업이익률, 현금흐름, 부채 부담";
}

function getValuationLens(sector: string) {
  if (/바이오|제약|신약|임상/i.test(sector)) return "단순 PER보다 현금 보유액, 파이프라인 가치, 기술이전 가능성, 승인 확률을 함께 봐야 합니다";
  if (/리츠|부동산/i.test(sector)) return "주가순자산비율, 배당수익률, 임대율, 차입금 만기 구조가 중요합니다";
  if (/은행|보험|금융|증권/i.test(sector)) return "PBR, ROE, 배당성향, 충당금 부담을 함께 비교하는 방식이 현실적입니다";
  if (/소프트웨어|AI|클라우드|플랫폼/i.test(sector)) return "매출배수, 영업이익 전환 속도, 잉여현금흐름 개선률을 같이 봐야 합니다";
  if (/반도체|2차전지|조선|화학|정유|철강/i.test(sector)) return "업황 저점과 고점이 반복되므로 평균 이익 기준의 밸류에이션과 사이클 위치를 함께 봐야 합니다";
  return "PER, PBR, EV/EBITDA, 배당수익률을 동종 기업과 비교하면서 현재 기대치가 과한지 확인해야 합니다";
}

function getIndustryDriver(sector: string) {
  if (/반도체|AI|데이터센터/i.test(sector)) return "AI 서버 투자, 데이터센터 증설, 고성능 반도체 수요";
  if (/2차전지|배터리|전기차/i.test(sector)) return "전기차 침투율, 에너지저장장치 수요, 소재 가격 안정화";
  if (/바이오|제약|의료/i.test(sector)) return "신약 승인, 고령화, 치료 옵션 확대";
  if (/은행|금융|보험|증권/i.test(sector)) return "금리 방향, 경기 사이클, 주주환원 정책";
  if (/자동차|모빌리티|부품/i.test(sector)) return "전동화 전환, 글로벌 판매량, 부품 고도화";
  if (/소프트웨어|클라우드|플랫폼|보안/i.test(sector)) return "기업의 디지털 전환, 보안 지출 확대, 구독형 매출 증가";
  if (/조선|방산|항공|우주|전력기기|인프라/i.test(sector)) return "글로벌 인프라 투자, 방산 수요, 장기 수주잔고";
  if (/에너지|정유|가스|유틸리티|태양광/i.test(sector)) return "에너지 가격, 전력 수요, 정책 변화";
  if (/소비재|유통|외식|패션|화장품|게임|콘텐츠|엔터/i.test(sector)) return "소비심리, 브랜드 충성도, 해외 확장";
  return "산업 수요, 경쟁 구도, 비용 구조 변화";
}


const globalCompanyNameKoOverrides: Record<string, string> = {
  AA: "알코아",
  AAL: "아메리칸항공그룹",
  AAOI: "어플라이드 옵토일렉트로닉스",
  AAON: "에이에이온",
  ABCL: "앱셀레라 바이오로직스",
  ABOS: "아큐멘 파마슈티컬스",
  ABSI: "앱사이",
  ABTC: "아메리칸 비트코인",
  ABUS: "아뷰터스 바이오파마",
  ABVX: "아비백스",
  ACAD: "아카디아 파마슈티컬스",
  ACDC: "프로프랙 홀딩",
  ACEL: "액셀 엔터테인먼트",
  ACHC: "아카디아 헬스케어",
  ACIW: "에이씨아이 월드와이드",
  ACLS: "액셀리스 테크놀로지스",
  ACMR: "에이씨엠 리서치",
  ACVA: "ACV 옥션스",
  ADMA: "ADMA 바이오로직스",
  ADNT: "애디언트",
  에이디티: "에이디티",
  ADUS: "애더스 홈케어",
  AEHR: "에어 테스트 시스템즈",
  AEIS: "어드밴스드 에너지 인더스트리스",
  AER: "에어캡 홀딩스",
  AFRM: "어펌 홀딩스",
  AGCO: "애그코",
  AGIO: "아지오스 파마슈티컬스",
  AGNC: "에이지엔씨 인베스트먼트",
  AGYS: "애질리시스",
  AI: "씨쓰리닷에이아이",
  AIT: "어플라이드 인더스트리얼 테크놀로지스",
  AKRO: "아케로 테라퓨틱스",
  ALGM: "알레그로 마이크로시스템즈",
  ALGT: "얼리전트 트래블",
  ALHC: "얼라인먼트 헬스케어",
  ALK: "알래스카 에어 그룹",
  ALKS: "앨커미스",
  ALKT: "앨카미 테크놀로지",
  ALLO: "알로진 테라퓨틱스",
  ALSN: "앨리슨 트랜스미션",
  ALT: "알티뮨",
  ALTR: "알테어 엔지니어링",
  ALV: "오토리브",
  AMBA: "앰바렐라",
  AMED: "아메디시스",
  AN: "오토네이션",
  ANF: "아베크롬비 앤 피치",
  APPF: "앱폴리오",
  AR: "안테로 리소시스",
  ARCB: "아크베스트",
  ARMK: "아라마크",
  ARRY: "어레이 테크놀로지스",
  ASAN: "아사나",
  ASTS: "에이에스티 스페이스모바일",
  AUR: "오로라 이노베이션",
  AVAV: "에어로바이런먼트",
  AX: "액소스 파이낸셜",
  AXSM: "액섬 테라퓨틱스",
  BANC: "뱅크 오브 캘리포니아",
  BC: "브런즈윅",
  BCO: "브링크스",
  BHF: "브라이트하우스 파이낸셜",
  BHVN: "바이오헤이븐",
  BILI: "빌리빌리",
  BILL: "빌 홀딩스",
  BIO: "바이오래드 래버러토리스",
  BJ: "비제이스 홀세일 클럽",
  BKD: "브룩데일 시니어 리빙",
  BL: "블랙라인",
  BLD: "탑빌드",
  BMBL: "범블",
  BOX: "박스",
  BRKR: "브루커",
  BRZE: "브레이즈",
  BTDR: "비트디어 테크놀로지스",
  BTU: "피바디 에너지",
};

const englishCompanyWordKoMap: Record<string, string> = {
  advanced: "어드밴스드",
  american: "아메리칸",
  america: "아메리카",
  applied: "어플라이드",
  capital: "캐피탈",
  corporation: "코퍼레이션",
  corp: "코프",
  company: "컴퍼니",
  companies: "컴퍼니즈",
  group: "그룹",
  holdings: "홀딩스",
  holding: "홀딩",
  international: "인터내셔널",
  global: "글로벌",
  worldwide: "월드와이드",
  technology: "테크놀로지",
  technologies: "테크놀로지스",
  systems: "시스템즈",
  system: "시스템",
  software: "소프트웨어",
  semiconductor: "세미컨덕터",
  semiconductors: "세미컨덕터스",
  micro: "마이크로",
  microsystems: "마이크로시스템즈",
  industries: "인더스트리스",
  industrial: "인더스트리얼",
  energy: "에너지",
  resources: "리소시스",
  materials: "머티리얼즈",
  financial: "파이낸셜",
  finance: "파이낸스",
  bancorp: "뱅코프",
  bank: "뱅크",
  healthcare: "헬스케어",
  health: "헬스",
  medical: "메디컬",
  therapeutics: "테라퓨틱스",
  pharma: "파마",
  pharmaceuticals: "파마슈티컬스",
  biopharma: "바이오파마",
  biologics: "바이오로직스",
  biosciences: "바이오사이언시스",
  bio: "바이오",
  labs: "랩스",
  laboratories: "래버러토리스",
  research: "리서치",
  entertainment: "엔터테인먼트",
  media: "미디어",
  networks: "네트웍스",
  network: "네트워크",
  communications: "커뮤니케이션스",
  communication: "커뮤니케이션",
  services: "서비스스",
  service: "서비스",
  solutions: "솔루션스",
  solution: "솔루션",
  products: "프로덕츠",
  product: "프로덕트",
  brands: "브랜즈",
  brand: "브랜드",
  partners: "파트너스",
  partner: "파트너",
  properties: "프로퍼티스",
  property: "프로퍼티",
  realty: "리얼티",
  investment: "인베스트먼트",
  investments: "인베스트먼츠",
  insurance: "인슈어런스",
  air: "에어",
  airlines: "항공",
  airline: "항공",
  travel: "트래블",
  automotive: "오토모티브",
  auto: "오토",
  electric: "일렉트릭",
  electronics: "일렉트로닉스",
  optical: "옵티컬",
  digital: "디지털",
  data: "데이터",
  cloud: "클라우드",
  security: "시큐리티",
  foods: "푸즈",
  food: "푸드",
};

const letterNameKoMap: Record<string, string> = {
  a: "에이",
  b: "비",
  c: "씨",
  d: "디",
  e: "이",
  f: "에프",
  g: "지",
  h: "에이치",
  i: "아이",
  j: "제이",
  k: "케이",
  l: "엘",
  m: "엠",
  n: "엔",
  o: "오",
  p: "피",
  q: "큐",
  r: "알",
  s: "에스",
  t: "티",
  u: "유",
  v: "브이",
  w: "더블유",
  x: "엑스",
  y: "와이",
  z: "지",
};

function hasHangul(value: string) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value);
}

function romanLettersToKo(value: string) {
  return value
    .toLowerCase()
    .split("")
    .map((letter) => letterNameKoMap[letter] || "")
    .join("");
}

function transliterateEnglishWordToKo(word: string) {
  const cleaned = word.replace(/[^a-zA-Z0-9]/g, "");
  const lower = cleaned.toLowerCase();

  if (!cleaned) return "";
  if (/^[0-9]+$/.test(cleaned)) return cleaned;
  if (englishCompanyWordKoMap[lower]) return englishCompanyWordKoMap[lower];
  if (/^[A-Z0-9]{1,5}$/.test(cleaned)) return romanLettersToKo(cleaned);

  const syllableReplacements: [RegExp, string][] = [
    [/tion/g, "션"],
    [/sion/g, "전"],
    [/ph/g, "프"],
    [/ch/g, "치"],
    [/sh/g, "시"],
    [/th/g, "스"],
    [/ck/g, "크"],
    [/qu/g, "쿼"],
    [/x/g, "엑스"],
    [/ai/g, "에이"],
    [/au/g, "오"],
    [/ea/g, "이"],
    [/ee/g, "이"],
    [/oo/g, "우"],
    [/ou/g, "아우"],
    [/oa/g, "오"],
    [/ar/g, "아르"],
    [/er/g, "어"],
    [/or/g, "오르"],
    [/al/g, "얼"],
    [/el/g, "엘"],
    [/an/g, "앤"],
    [/en/g, "엔"],
    [/in/g, "인"],
    [/on/g, "온"],
    [/ac/g, "액"],
    [/ap/g, "앱"],
    [/co/g, "코"],
    [/com/g, "컴"],
    [/con/g, "콘"],
    [/gen/g, "젠"],
    [/net/g, "넷"],
    [/tek/g, "텍"],
    [/tech/g, "테크"],
  ];

  let value = lower;
  syllableReplacements.forEach(([pattern, replacement]) => {
    value = value.replace(pattern, replacement);
  });

  const charMap: Record<string, string> = {
    a: "아",
    b: "브",
    c: "크",
    d: "드",
    e: "이",
    f: "프",
    g: "그",
    h: "흐",
    i: "이",
    j: "지",
    k: "크",
    l: "르",
    m: "므",
    n: "느",
    o: "오",
    p: "프",
    q: "큐",
    r: "르",
    s: "스",
    t: "트",
    u: "유",
    v: "브",
    w: "우",
    y: "이",
    z: "즈",
  };

  return value
    .split("")
    .map((char) => (/[가-힣]/.test(char) ? char : charMap[char] || char))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function toKoreanGlobalCompanyName(seed: CompanySeed) {
  const tickerKey = seed.ticker.toUpperCase();
  const override = globalCompanyNameKoOverrides[tickerKey];
  if (override) return override;
  if (hasHangul(seed.companyNameKo)) return seed.companyNameKo;

  const baseName = seed.companyNameEn || seed.companyNameKo;
  const normalized = baseName
    .replace(/&/g, " 앤 ")
    .replace(/\bClass\s+[A-Z]\b/gi, "")
    .replace(/\bInc\.?\b/gi, "")
    .replace(/\bLtd\.?\b/gi, "")
    .replace(/\bPLC\b/gi, "")
    .replace(/\bN\.V\.\b/gi, "")
    .replace(/\bS\.A\.\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const translated = normalized
    .split(" ")
    .map((word) => transliterateEnglishWordToKo(word))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return translated || seed.companyNameKo || seed.companyNameEn;
}

function normalizeCompanySeedForArticle(seed: CompanySeed, market: CompanyAnalysisMarket): CompanySeed {
  if (market !== "global") return seed;

  return {
    ...seed,
    companyNameKo: toKoreanGlobalCompanyName(seed),
  };
}

function buildArticle(seed: CompanySeed, market: CompanyAnalysisMarket): CompanyAnalysisArticle {
  seed = normalizeCompanySeedForArticle(seed, market);

  const isKorea = market === "korea";
  const marketLabel = isKorea ? "국내기업" : "해외기업";
  const theme = getPrimaryTheme(seed.sector);
  const riskTheme = getRiskTheme(seed.sector);
  const basePath = `/company-analysis/${market}`;
  const tickerText = seed.ticker.replace(/\./g, "-").toLowerCase();
  const slugBase = slugify(seed.companyNameEn) || slugify(seed.companyNameKo) || `company-${tickerText}`;
  const slug = `${slugBase}-${tickerText}-stock-analysis`;
  const badge = isKorea ? `${seed.exchange} 주요 기업` : `${seed.exchange} 미국주식`;
  const seoTitle = isKorea
    ? `${seed.companyNameKo}(${seed.ticker}) 주가 전망 | ${seed.sector} 기업분석과 투자 체크포인트`
    : `${seed.companyNameKo}(${seed.ticker}) 주가 전망 | 미국주식 ${seed.sector} 기업분석`;
  const metaDescription = `${seed.companyNameKo}(${seed.ticker}) 기업분석입니다. ${seed.sector} 사업 구조, 성장 포인트, 실적 확인 지표, 주가 리스크와 투자 전 체크포인트를 사용자 관점에서 정리했습니다.`;
  const summary = `${seed.companyNameKo}(${seed.ticker})는 ${seed.sector} 분야에서 투자자가 자주 확인하는 ${marketLabel}입니다. 이 글에서는 단순한 주가 흐름보다 사업 구조, 실적을 움직이는 변수, 밸류에이션 부담, 리스크 요인을 함께 정리합니다.`;
  const quickConclusion = `${seed.companyNameKo}는 ${theme} 흐름을 볼 때 함께 확인할 만한 기업입니다. 다만 좋은 기업인지와 좋은 가격인지는 다르기 때문에 실적 성장률, 이익률, 주가에 반영된 기대치를 나눠서 보는 접근이 필요합니다.`;

  return {
    status: "published",
    market,
    slug,
    ticker: seed.ticker,
    exchange: seed.exchange,
    companyNameKo: seed.companyNameKo,
    companyNameEn: seed.companyNameEn,
    sector: seed.sector,
    badge,
    seoTitle,
    metaDescription,
    keywords: [
      `${seed.companyNameKo} 주가 전망`,
      `${seed.companyNameKo} 기업분석`,
      `${seed.ticker} 주식`,
      `${seed.sector} 관련주`,
      isKorea ? "국내기업 분석" : "미국주식 기업분석",
    ],
    summary,
    quickConclusion,
    investorNote:
      "투자 판단은 본인 몫입니다. 이 글은 특정 종목의 매수·매도 추천이 아니라 기업의 사업 구조와 투자 체크포인트를 이해하기 위한 정보성 콘텐츠입니다.",
    publishedAt: PUBLISHED_AT,
    updatedAt: UPDATED_AT,
    sections: [
      {
        title: `${seed.companyNameKo} 사업 구조 핵심 정리`,
        body: [
          `${seed.companyNameKo}(${seed.ticker}) 분석에서 가장 먼저 볼 부분은 주가 차트가 아니라 매출이 만들어지는 구조입니다. ${seed.companyNameKo}는 ${seed.sector} 영역에서 사업을 전개하는 ${marketLabel}으로, 투자자는 이 기업이 어떤 고객에게 어떤 제품과 서비스를 팔고 있는지부터 확인해야 합니다.`,
          `특히 ${theme} 흐름 안에서 ${seed.companyNameKo}가 단순 테마에 묶여 움직이는 기업인지, 실제 매출과 이익을 만드는 기업인지 구분하는 것이 중요합니다. 같은 업종이라도 고객사 구성, 가격 결정력, 기술 장벽, 원가 구조에 따라 실적 민감도는 크게 달라질 수 있습니다.`,
          `사용자 관점에서는 "유명한 기업인가"보다 "실적이 반복적으로 쌓일 수 있는 구조인가"가 더 중요합니다. 매출원이 특정 고객이나 특정 제품에 과도하게 집중되어 있다면 성장성이 커 보여도 변동성이 커질 수 있습니다.`,
        ],
      },
      {
        title: `${seed.companyNameKo}가 속한 산업의 핵심 변수`,
        body: [
          `${seed.sector} 산업에서 주가를 움직이는 핵심 변수는 ${getIndustryDriver(seed.sector)}입니다. 산업의 방향이 좋아도 모든 기업이 같은 속도로 성장하는 것은 아니기 때문에, ${seed.companyNameKo}가 산업 변화의 어느 위치에서 수혜를 받는지 확인해야 합니다.`,
          `산업 분석에서 중요한 것은 뉴스의 크기가 아니라 실적 연결 가능성입니다. 투자자는 해당 산업의 수요 증가가 실제 주문, 가격, 마진, 현금흐름으로 이어지고 있는지 단계별로 확인하는 것이 좋습니다.`,
          `${isKorea ? "국내기업" : "해외기업"}은 거시 환경에도 영향을 받습니다. 금리, 환율, 원자재 가격, 규제, 고객사의 투자 계획이 달라지면 같은 기업이라도 시장에서 평가받는 방식이 달라질 수 있습니다.`,
        ],
      },
      {
        title: `실적을 볼 때 확인해야 할 숫자`,
        body: [
          `${seed.companyNameKo}의 실적을 볼 때는 단순 매출 증가율만 보면 부족합니다. 이 기업은 ${getFinancialLens(seed.sector)}를 함께 확인해야 실적의 질을 더 정확하게 판단할 수 있습니다.`,
          `매출이 늘어도 비용이 더 빠르게 늘면 영업이익률은 낮아질 수 있습니다. 반대로 매출 성장률이 크지 않아도 원가율이 안정되고 고부가 제품 비중이 늘면 이익 체력은 개선될 수 있습니다.`,
          `분기 실적은 일시적인 변수에 흔들릴 수 있으므로 최소 3~4개 분기의 흐름을 함께 보는 것이 좋습니다. 실적 발표 후에는 회사의 가이던스와 시장 기대치가 얼마나 차이 나는지도 확인해야 합니다.`,
        ],
      },
      {
        title: `밸류에이션과 주가 기대치 해석`,
        body: [
          `${seed.companyNameKo} 주가 전망에서 가장 중요한 부분은 좋은 기업인지와 좋은 가격인지를 분리해서 보는 것입니다. ${getValuationLens(seed.sector)}.`,
          `주가는 현재 실적보다 미래 기대를 먼저 반영하는 경우가 많습니다. 이미 높은 성장 기대가 반영된 상태라면 좋은 실적이 나와도 주가 반응이 약할 수 있고, 반대로 기대가 낮아진 상태에서는 작은 개선에도 주가가 민감하게 움직일 수 있습니다.`,
          `따라서 투자자는 목표주가나 단기 전망만 보기보다 동종 기업 대비 이익률, 성장률, 부채 부담, 현금흐름을 비교해야 합니다. 이 과정이 있어야 단순히 "싸 보인다" 또는 "비싸 보인다"는 판단에서 벗어날 수 있습니다.`,
        ],
      },
      {
        title: `경쟁력과 해자 체크`,
        body: [
          `${seed.companyNameKo}의 중장기 가치는 경쟁사가 쉽게 따라오기 어려운 장점이 있는지에 따라 달라집니다. 기술력, 브랜드, 원가 경쟁력, 유통망, 고객 락인, 규제 진입장벽 중 어떤 요소가 실제 강점인지 확인해야 합니다.`,
          `투자자가 자주 놓치는 부분은 매출 규모보다 경쟁력의 지속성입니다. 단기 실적이 좋아도 경쟁사가 가격을 낮추거나 고객사가 발주를 줄이면 이익률은 빠르게 변할 수 있습니다.`,
          `특히 ${seed.sector} 기업은 산업 변화가 빠르게 나타날 수 있으므로 경쟁사의 신규 투자, 대체 기술 등장, 고객사의 내재화 가능성까지 함께 봐야 합니다.`,
        ],
      },
      {
        title: `동종 기업과 비교할 때 봐야 할 차이`,
        body: [
          `${seed.companyNameKo}를 제대로 이해하려면 같은 ${seed.sector} 기업과 나란히 비교해야 합니다. 같은 산업에 있어도 매출 구조, 고객군, 원가 부담, 연구개발 투자, 부채 비율이 다르면 주가가 받는 평가도 달라집니다.`,
          `비교할 때는 단순히 시가총액 순위만 보지 말고 매출 성장률, 영업이익률, 순이익률, 잉여현금흐름, 부채 부담을 같은 기준으로 정리하는 것이 좋습니다. 이 과정에서 ${seed.companyNameKo}가 성장주로 평가받는지, 가치주로 평가받는지, 경기민감주로 움직이는지 더 선명하게 볼 수 있습니다.`,
          `특히 ${isKorea ? "국내기업" : "미국주식"}은 같은 업종 안에서도 수급과 밸류에이션 차이가 크게 벌어질 수 있습니다. 사용자는 동종 기업 대비 프리미엄을 받을 이유가 있는지, 아니면 단순 기대감으로 오른 구간인지 구분해야 합니다.`,
        ],
      },
      {
        title: `상승 시나리오와 하락 시나리오`,
        body: [
          `${seed.companyNameKo}의 상승 시나리오는 ${theme} 흐름이 실제 실적 개선으로 확인되고, 시장이 이익 성장의 지속성을 다시 평가할 때 만들어질 수 있습니다. 단기 뉴스보다 수주, 판매량, 가격, 마진, 현금흐름이 동시에 개선되는지가 중요합니다.`,
          `반대로 하락 시나리오는 ${riskTheme}이 커지거나, 시장 기대보다 실적 개선 속도가 느려질 때 발생할 수 있습니다. 특히 이미 주가에 성장 기대가 많이 반영된 구간에서는 작은 실망도 큰 변동성으로 이어질 수 있습니다.`,
          `따라서 투자자는 좋은 뉴스와 나쁜 뉴스를 각각 따로 보는 것보다 "실적 추정치가 올라가는지", "밸류에이션 부담이 낮아지는지", "현금흐름이 개선되는지"를 함께 확인하는 방식이 더 현실적입니다.`,
        ],
      },
      {
        title: `리스크 요인과 대응 관점`,
        body: [
          `${seed.companyNameKo}의 주요 리스크는 ${riskTheme}입니다. 리스크를 단순히 부정적인 요소로만 볼 것이 아니라, 이미 주가에 반영된 리스크인지 아직 반영되지 않은 리스크인지 나눠서 보는 것이 중요합니다.`,
          `시장 기대가 높은 기업은 작은 실망에도 주가 변동성이 커질 수 있습니다. 실적 발표, 규제 뉴스, 경쟁사의 가격 정책, 원자재 가격 변화는 단기적으로 주가를 크게 흔들 수 있습니다.`,
          `초보 투자자라면 리스크를 모두 예측하려 하기보다 "어떤 상황이 오면 투자 판단을 다시 해야 하는가"를 미리 정해두는 편이 현실적입니다. 기준이 없으면 뉴스에 따라 매수와 매도를 반복하기 쉽습니다.`,
        ],
      },
      {
        title: `투자자가 실제로 활용하는 방법`,
        body: [
          `${seed.companyNameKo}를 처음 보는 투자자라면 바로 매수 여부를 결정하기보다 관심 기업 목록에 넣고 실적 발표, 산업 뉴스, 동종 기업 흐름을 함께 추적하는 방식이 좋습니다.`,
          `관심 기업으로 관리할 때는 매출 성장률, 영업이익률, 밸류에이션, 주주환원, 부채 부담을 같은 기준으로 반복 확인해야 합니다. 같은 기준으로 봐야 시간이 지나도 판단이 흔들리지 않습니다.`,
          `이 글은 ${seed.companyNameKo}의 사업 구조와 투자 체크포인트를 이해하기 위한 정보성 정리입니다. 최종 투자 판단은 본인의 투자 기간, 위험 감수 성향, 포트폴리오 비중을 함께 고려해 결정해야 합니다.`,
        ],
      },
    ],
    checkpoints: [
      `${seed.companyNameKo}의 매출 성장률과 영업이익률이 같은 방향으로 개선되는지 확인하기`,
      `${seed.sector} 업황이 단기 테마인지 장기 수요인지 구분하기`,
      `${getFinancialLens(seed.sector)}가 최근 분기에서 개선되는지 점검하기`,
      `경쟁사 대비 기술력, 브랜드, 비용 구조, 고객 기반이 유지되는지 확인하기`,
      `현재 주가가 실적 개선 기대를 얼마나 먼저 반영하고 있는지 비교하기`,
      `실적 발표 후 회사의 가이던스와 시장 기대치의 차이를 확인하기`,
      `배당, 자사주, 부채 축소 등 주주환원과 재무 안정성 변화를 함께 보기`,
    ],
    risks: [
      `${riskTheme}이 예상보다 커지면 실적과 주가에 부담이 될 수 있습니다.`,
      `업종 내 경쟁 심화로 가격 결정력이 약해질 경우 이익률이 낮아질 수 있습니다.`,
      `시장 기대가 이미 높게 반영된 경우 좋은 실적에도 주가 변동성이 커질 수 있습니다.`,
      `${isKorea ? "국내 증시 수급과 환율 변화" : "미국 금리와 달러 흐름"}도 투자 심리에 영향을 줄 수 있습니다.`,
      `실적 개선 속도보다 주가 상승 속도가 빠를 경우 밸류에이션 부담이 커질 수 있습니다.`,
    ],
    relatedLinks: [
      { label: "복리 계산기", href: "/cal/compound" },
      { label: isKorea ? "국내기업 분석 목록" : "해외기업 분석 목록", href: basePath },
      { label: "투자 전략 가이드", href: "/info/strategy" },
    ],
    faq: [
      {
        question: `${seed.companyNameKo} 주가 전망을 볼 때 가장 중요한 기준은 무엇인가요?`,
        answer:
          `${seed.companyNameKo} 주가 전망은 단기 뉴스보다 매출 성장률, 영업이익률, 산업 수요, 경쟁 구도, 밸류에이션 부담을 함께 봐야 합니다. 특히 기대치가 높은 종목은 실적이 좋아도 시장 예상보다 낮으면 주가가 흔들릴 수 있습니다.`,
      },
      {
        question: `${seed.companyNameKo}는 장기투자 관점에서 어떻게 봐야 하나요?`,
        answer:
          `장기투자 관점에서는 ${seed.companyNameKo}가 속한 ${seed.sector} 산업의 성장성이 실제 실적으로 이어지는지 확인해야 합니다. 단순히 유명한 기업이라는 이유보다 현금흐름, 이익률, 경쟁 우위가 유지되는지가 더 중요합니다.`,
      },
      {
        question: `${seed.companyNameKo} 투자 전 어떤 리스크를 확인해야 하나요?`,
        answer:
          `${seed.companyNameKo} 투자 전에는 ${riskTheme}을 먼저 확인하는 것이 좋습니다. 여기에 금리, 환율, 규제, 경쟁사의 전략 변화까지 함께 보면 주가 변동의 이유를 더 잘 이해할 수 있습니다.`,
      },
    ],
    tags: [
      `#${seed.companyNameKo.replace(/\s+/g, "")}`,
      `#${seed.companyNameKo.replace(/\s+/g, "")}주가전망`,
      `#${seed.ticker.replace(/\./g, "")}`,
      isKorea ? "#국내기업분석" : "#미국주식분석",
      "#BlueDino",
    ],
  };
}

function getUniqueCompanySeeds(seeds: CompanySeed[]): CompanySeed[] {
  const seen = new Set<string>();

  return seeds.filter((seed) => {
    const key = `${seed.exchange}:${seed.ticker}:${seed.companyNameKo}`.toLowerCase();

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const koreaCompanyAnalysisSeeds = getUniqueCompanySeeds([
  ...koreaCompanySeeds,
  ...additionalKoreaCompanySeeds,
]);

const globalCompanyAnalysisSeeds = getUniqueCompanySeeds([
  ...globalCompanySeeds,
  ...additionalGlobalCompanySeeds,
]);

export const companyAnalysisArticles: CompanyAnalysisArticle[] = [
  ...koreaCompanyAnalysisSeeds.map((seed) => buildArticle(seed, "korea")),
  ...globalCompanyAnalysisSeeds.map((seed) => buildArticle(seed, "global")),
];

export function getCompanyMarketConfig(market: string): CompanyAnalysisMarketConfig | undefined {
  return companyAnalysisMarkets.find((item) => item.key === market);
}

export function getPublishedCompanyArticles(): CompanyAnalysisArticle[] {
  return companyAnalysisArticles.filter((article) => article.status === "published");
}

export function getCompanyArticlesByMarket(market: CompanyAnalysisMarket): CompanyAnalysisArticle[] {
  return getPublishedCompanyArticles().filter((article) => article.market === market);
}

export function getCompanyArticle(
  market: CompanyAnalysisMarket,
  slug: string,
): CompanyAnalysisArticle | undefined {
  return getCompanyArticlesByMarket(market).find((article) => article.slug === slug);
}

export function getCompanyAnalysisRoutes() {
  return getPublishedCompanyArticles().map((article) => ({
    market: article.market,
    slug: article.slug,
  }));
}

function getSectorTokens(sector: string) {
  const normalized = sector
    .replace(/[·/,&()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function getRelatedIndustryScore(
  currentArticle: CompanyAnalysisArticle,
  candidate: CompanyAnalysisArticle,
) {
  const currentTokens = getSectorTokens(currentArticle.sector);
  const candidateTokens = new Set(getSectorTokens(candidate.sector));
  const overlapCount = currentTokens.filter((token) => candidateTokens.has(token)).length;

  let score = 0;
  // 1. 같은 sector 문자열은 압도적 가중치
  if (candidate.sector === currentArticle.sector) score += 200;

  // 2. sector 토큰 단위 겹침 (예: "반도체 · 장비" vs "반도체 PCB" → "반도체" 1개 겹침)
  score += overlapCount * 40;

  // 3. 부분 문자열 매칭 (예: "반도체" 가 "반도체 메모리" 에 포함)
  if (candidate.sector !== currentArticle.sector) {
    const cur = currentArticle.sector;
    const cand = candidate.sector;
    if (cand.includes(cur) || cur.includes(cand)) score += 30;
  }

  // 4. 1차 테마 일치 (예: 반도체 vs 반도체 장비 → 둘 다 "반도체와 AI 인프라")
  const currentTheme = getPrimaryTheme(currentArticle.sector);
  const candidateTheme = getPrimaryTheme(candidate.sector);
  if (currentTheme === candidateTheme) score += 60;

  // 5. 같은 거래소(KOSPI/KOSDAQ 또는 NASDAQ/NYSE)는 약한 가중치 - 산업 매칭이 우선
  if (candidate.exchange === currentArticle.exchange) score += 5;

  return score;
}

export function getRelatedCompanyArticles(
  currentArticle: CompanyAnalysisArticle,
  limit = 4,
): CompanyAnalysisArticle[] {
  const scoredArticles = getPublishedCompanyArticles()
    .filter((article) => article.slug !== currentArticle.slug && article.market === currentArticle.market)
    .map((article) => ({
      article,
      score: getRelatedIndustryScore(currentArticle, article),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.article.exchange !== b.article.exchange) {
        return a.article.exchange.localeCompare(b.article.exchange, "ko");
      }
      return a.article.companyNameKo.localeCompare(b.article.companyNameKo, "ko");
    });

  // 같은 산업/테마 매칭이 있는 후보만 우선 사용한다.
  // score 기준:
  //   200+ : 동일 sector 텍스트 일치
  //    60+ : 동일 1차 테마(getPrimaryTheme)
  //    40+ : sector 토큰 1개 이상 겹침
  //    30+ : 부분 문자열 매칭
  // 따라서 산업 연관도가 명확히 있는 항목만 골라내려면 임계치를 30 이상으로 둔다.
  const RELATED_SCORE_THRESHOLD = 30;
  const stronglyRelated = scoredArticles.filter((item) => item.score >= RELATED_SCORE_THRESHOLD);

  // 강한 연관이 limit보다 적게 나오는 경우 임계치 미만이라도 0보다 큰 점수만 추가 후보로 사용.
  const fallback = scoredArticles.filter((item) => item.score > 0 && item.score < RELATED_SCORE_THRESHOLD);

  const candidates = stronglyRelated.length >= limit
    ? stronglyRelated
    : [...stronglyRelated, ...fallback];

  return candidates.slice(0, limit).map(({ article }) => article);
}
