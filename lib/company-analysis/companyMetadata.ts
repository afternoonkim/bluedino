// 종목별 정적 메타데이터.
// - 지수 편입 정보 (KOSPI200, KOSDAQ150, S&P500, NASDAQ100, DJIA)
// - 종목 분류 태그 (성장주/가치주/배당주/사이클주 등 사용자 검색 키워드)
// - 종목별 unique 사실(상장일·본사) — 검색엔진이 페이지마다 다른 데이터를 인식하도록.

export type CompanyTagKey =
  | "growth"
  | "value"
  | "dividend"
  | "cyclical"
  | "defensive"
  | "ai-thematic"
  | "ev-thematic"
  | "biotech"
  | "fintech"
  | "consumer"
  | "energy"
  | "infra";

export type CompanyIndexKey =
  // KR
  | "KOSPI200"
  | "KOSPI50"
  | "KOSDAQ150"
  // US
  | "S&P500"
  | "NASDAQ100"
  | "DJIA"
  | "RUSSELL1000";

const TAG_LABEL: Record<CompanyTagKey, string> = {
  growth: "성장주",
  value: "가치주",
  dividend: "배당주",
  cyclical: "경기민감주",
  defensive: "경기방어주",
  "ai-thematic": "AI 테마",
  "ev-thematic": "전기차·2차전지 테마",
  biotech: "바이오·헬스케어",
  fintech: "핀테크·결제",
  consumer: "소비재",
  energy: "에너지",
  infra: "인프라·산업재",
};

export function getCompanyTagLabel(key: CompanyTagKey): string {
  return TAG_LABEL[key];
}

const INDEX_LABEL: Record<CompanyIndexKey, string> = {
  KOSPI200: "KOSPI 200",
  KOSPI50: "KOSPI 50",
  KOSDAQ150: "KOSDAQ 150",
  "S&P500": "S&P 500",
  NASDAQ100: "NASDAQ 100",
  DJIA: "다우존스산업평균",
  RUSSELL1000: "Russell 1000",
};

export function getIndexLabel(key: CompanyIndexKey): string {
  return INDEX_LABEL[key];
}

// =========================
// 1) 한국 KOSPI 200 편입 종목 (시가총액 상위, 2025년 정기변경 기준 근사치)
// =========================
const KOSPI200_TICKERS = new Set<string>([
  "005930","000660","005380","005490","051910","207940","006400","035420","012330","105560",
  "035720","055550","086790","000270","028260","096770","015760","068270","034730","017670",
  "066570","003550","033780","011200","009150","051900","024110","010130","030200","011170",
  "138930","006800","005380","000810","032830","003490","267260","004020","139480","105630",
  "010950","034220","271560","034020","028050","047810","000720","078930","021240","006260",
  "036570","002790","005940","004990","021240","051600","006360","267250","326030","000150",
  "086280","014820","002380","071050","035250","007070","078930","139480","033780","298050",
  "003670","006650","028260","055550","086790","028260","112610","004170","011070","185750",
  "271560","051900","011780","145990","001040","004800","002380","011200","010140","000240",
  "032640","039490","105630","010620","035250","024110","001230","000150","001120","007070",
  "005440","086790","096530","263750","068760","247540","112040","058470","067310","086520",
  "352820","377300","323410","112040","096530","079550","095700","357780","064350","294870",
  "018260","272210","001740","003410","005180","011170","010120","006120","005810","002270",
  "005720","000990","004710","007070","007310","003690","007570","009240","014830","023530",
  "024720","028670","033240","034230","035000","036420","044450","051370","052690","055490",
  "069960","078340","079430","081660","082640","086450","095610","097520","105840","112610",
  "120030","138040","145210","145720","148070","161000","161390","178320","185750","192080",
  "195870","204210","204320","210980","214320","214390","219750","229640","240810","241560",
  "248070","267250","272210","285130","294870","298050","298690","298770","302440","307950",
]);

// =========================
// 2) 한국 KOSPI 50 (KOSPI200 중 시가총액 상위 50개)
// =========================
const KOSPI50_TICKERS = new Set<string>([
  "005930","000660","207940","005380","373220","068270","005490","005935","105560","055550",
  "035420","035720","000270","006400","051910","028260","086790","096770","015760","034730",
  "017670","066570","003550","033780","011200","009150","051900","024110","010130","030200",
  "011170","138930","006800","000810","032830","003490","267260","139480","138040","011780",
  "010950","034220","271560","028050","047810","078930","021240","006260","036570","005940",
]);

// =========================
// 3) 한국 KOSDAQ 150 (시가총액 상위, 2025년 정기변경 근사)
// =========================
const KOSDAQ150_TICKERS = new Set<string>([
  "247540","086520","091990","263750","112040","067310","058470","028300","357780","064350",
  "035900","041510","122870","095700","079550","053800","064760","039030","240810","067160",
  "192080","065350","068760","086900","298380","145020","196170","099190","078340","033640",
  "095610","086450","045390","011040","019170","039200","078160","290510","005290","064290",
  "200130","036930","068290","217270","039020","178320","053610","033500","043150","084370",
  "035600","095340","189300","034950","039840","041830","053080","086980","195870","200470",
  "067990","073070","073490","038500","039200","039840","045510","049070","052260","053610",
  "058820","064510","064760","068270","078340","078350","078940","089030","089030","093190",
  "095340","100090","102710","115160","118990","119860","122310","125210","138360","140860",
  "151860","154030","160550","166090","166480","177350","182690","185490","190510","199550",
  "200130","204270","210540","216080","217270","220630","225330","228760","240810","241790",
  "243070","247540","263050","263720","265560","266390","270660","272210","281820","288980",
  "289010","293580","298540","299900","306200","307930","317330","318660","321820","323410",
  "330590","336370","348210","352910","355150","357250","357430","357780","361610","363280",
  "365340","372910","376300","376930","385720","389140","402030","405100","412350","417180",
]);

// =========================
// 4) 미국 S&P 500 + NASDAQ 100 + DJIA (대표 200여 종목)
// =========================
const SP500_TICKERS = new Set<string>([
  "AAPL","MSFT","NVDA","GOOGL","GOOG","AMZN","META","TSLA","BRK.B","JPM","JNJ","V","MA","WMT","XOM","CVX","PG","UNH","HD","BAC","ABBV","KO","PEP","COST","AVGO","LLY","MRK","ABT","ORCL","ADBE","CSCO","NFLX","CRM","TMO","ACN","MCD","NKE","DIS","DHR","INTC","INTU","TXN","QCOM","AMD","HON","UNP","NEE","PM","UPS","RTX","LIN","LOW","SPGI","GS","CAT","BLK","ELV","DE","ISRG","T","SBUX","MS","CB","TJX","BMY","MDT","C","AMGN","SCHW","BKNG","ADI","SYK","CI","GILD","CME","TMUS","AXP","ZTS","COP","SO","MO","PLD","DUK","CL","REGN","BA","MMM","FDX","ICE","FI","WM","NSC","BSX","HUM","ITW","APD","EOG","NOC","ETN","AON","SHW","TGT","ECL","SLB","KMB","FCX","COF","CSX","EMR","D","ROP","PSA","USB","PNC","MAR","GE","AEP","FIS","ATVI","ILMN","HCA","DG","ADP","KLAC","SNPS","CDNS","TRV","ALL","AIG","WBA","MET","TFC","KR","DOW","DLR","SPG","O","WELL","CMG","HLT","ROST","PAYX","WBD","EW","STZ","TSN","KHC","KMI","WMB","EXC","XEL","SRE","PEG","ED","ETR","ES","AWK","AVB","EQR","ESS","MAA","UDR","INVH","CPT","REG","BRX","FRT","WPC","SBAC","CCI","AMT","EQIX","DLR","CBRE","JLL","CSGP","WY","PLD","DRE","STAG","EXR","PSA","CUBE","NSA","LSI","REXR","BXP","HIW","SLG","VNO","VTR","WELL","DOC","HCP","HR","HTA","MPW","NHI","OHI","SBRA","SNH","UHT"
]);

const NASDAQ100_TICKERS = new Set<string>([
  "AAPL","MSFT","NVDA","GOOGL","GOOG","AMZN","META","TSLA","AVGO","COST","NFLX","ADBE","PEP","CSCO","TMUS","CMCSA","INTC","INTU","TXN","QCOM","AMD","AMGN","HON","BKNG","SBUX","ADI","ISRG","GILD","ADP","REGN","ATVI","MDLZ","VRTX","KLAC","SNPS","CDNS","PYPL","FISV","MAR","ORLY","CTAS","ROP","NXPI","CPRT","WDAY","ASML","KDP","PCAR","LRCX","FAST","ODFL","DXCM","MNST","CHTR","BIIB","KHC","EXC","XEL","WBA","CTSH","DLTR","PAYX","ROST","EBAY","CSGP","SIRI","AEP","VRSK","ALGN","MCHP","ANSS","FANG","LCID","MRNA","ABNB","ON","CRWD","TEAM","DDOG","ZS","WBD","ENPH","WBA","BKR","JD","TTD","MELI","DASH","ARM","GEHC","CDW","CSX","ZM","DOCU","ZS","PANW","SPLK","ROKU","DOCN"
]);

const DJIA_TICKERS = new Set<string>([
  "AAPL","AMGN","AXP","BA","CAT","CRM","CSCO","CVX","DIS","DOW","GS","HD","HON","IBM","INTC","JNJ","JPM","KO","MCD","MMM","MRK","MSFT","NKE","PG","TRV","UNH","V","VZ","WBA","WMT"
]);

// =========================
// Public API
// =========================

/**
 * 종목의 모든 지수 편입 정보를 반환.
 */
export function getCompanyIndices(ticker: string): CompanyIndexKey[] {
  const t = ticker.toUpperCase();
  const indices: CompanyIndexKey[] = [];

  // KR (6-digit)
  if (/^\d{6}$/.test(t)) {
    if (KOSPI50_TICKERS.has(t)) indices.push("KOSPI50");
    if (KOSPI200_TICKERS.has(t)) indices.push("KOSPI200");
    if (KOSDAQ150_TICKERS.has(t)) indices.push("KOSDAQ150");
    return indices;
  }

  // US
  if (DJIA_TICKERS.has(t)) indices.push("DJIA");
  if (NASDAQ100_TICKERS.has(t)) indices.push("NASDAQ100");
  if (SP500_TICKERS.has(t)) indices.push("S&P500");
  if (SP500_TICKERS.has(t) || NASDAQ100_TICKERS.has(t)) indices.push("RUSSELL1000");

  return indices;
}

/**
 * sector 텍스트로부터 종목 분류 태그를 자동 생성.
 * Naver 검색에서 사용되는 키워드(성장주, 배당주, AI 테마 등)와 매칭.
 */
export function getCompanyTags(sector: string, ticker: string): CompanyTagKey[] {
  const tags = new Set<CompanyTagKey>();
  const s = sector;

  // 성장주 vs 가치주
  if (
    /AI|반도체|2차전지|배터리|소프트웨어|인터넷|플랫폼|클라우드|바이오|신약|성장|모빌리티|전기차/i.test(
      s,
    )
  ) {
    tags.add("growth");
  }
  if (/은행|보험|증권|지주|유틸리티|통신|음식료|방산|전력|건자재/i.test(s)) {
    tags.add("value");
  }

  // 배당주 / 경기방어주
  if (/은행|보험|증권|지주|통신|유틸리티|전력|가스|리츠|배당/i.test(s)) {
    tags.add("dividend");
    tags.add("defensive");
  }

  // 경기민감주
  if (
    /반도체|2차전지|화학|정유|철강|조선|건설|자동차|항공|해운|건자재|디스플레이/i.test(
      s,
    )
  ) {
    tags.add("cyclical");
  }

  // 테마
  if (/AI|반도체|메모리|HBM|클라우드|데이터센터|소프트웨어|보안/i.test(s)) {
    tags.add("ai-thematic");
  }
  if (/2차전지|배터리|전기차|EV|양극재|음극재|동박|전해액/i.test(s)) {
    tags.add("ev-thematic");
  }
  if (/바이오|제약|신약|의료기기|진단|CDMO/i.test(s)) {
    tags.add("biotech");
  }
  if (/결제|핀테크|카드|간편결제/i.test(s)) {
    tags.add("fintech");
  }
  if (/소비재|유통|식음료|음식료|패션|화장품|외식|호텔|여행|엔터|콘텐츠|게임/i.test(s)) {
    tags.add("consumer");
  }
  if (/에너지|정유|석유|가스|전력|유틸리티|재생에너지|태양광|원전/i.test(s)) {
    tags.add("energy");
  }
  if (/조선|방산|항공|우주|전력기기|철도|산업재|플랜트|건설|건자재|인프라/i.test(s)) {
    tags.add("infra");
  }

  // 빈 결과 방지
  if (tags.size === 0) tags.add("growth");

  return Array.from(tags);
}

/**
 * sector 텍스트로부터 sub-sector 라벨을 더 정밀하게 추출.
 * 예: "반도체 · 메모리 · HBM" → "메모리·HBM 반도체"
 *     "2차전지 · 양극재" → "2차전지 양극재"
 *     "은행 · 금융지주" → "은행·금융지주"
 */
export function getSubSectorLabel(sector: string): string {
  const s = sector.toLowerCase();

  // 반도체 sub-sectors
  if (/hbm|메모리/.test(s)) return "메모리·HBM 반도체";
  if (/파운드리|비메모리|시스템 ?lsi/.test(s)) return "비메모리·파운드리 반도체";
  if (/장비|patternig/.test(s) && /반도체/.test(s)) return "반도체 장비";
  if (/pcb|기판/.test(s)) return "반도체 PCB·기판";
  if (/소재/.test(s) && /반도체/.test(s)) return "반도체 소재";
  if (/카메라|모듈/.test(s)) return "전자부품·카메라모듈";

  // 2차전지 sub-sectors
  if (/양극재/.test(s)) return "2차전지 양극재";
  if (/음극재/.test(s)) return "2차전지 음극재";
  if (/전해액/.test(s)) return "2차전지 전해액";
  if (/동박/.test(s)) return "2차전지 동박";
  if (/리튬/.test(s)) return "2차전지 리튬";
  if (/전고체/.test(s)) return "전고체 배터리";
  if (/2차전지|배터리/.test(s)) return "2차전지 셀·완제품";

  // 자동차 sub-sectors
  if (/완성차|전기차|모빌리티/.test(s) && !/부품/.test(s)) return "자동차 완성차";
  if (/타이어/.test(s)) return "자동차 타이어";
  if (/전장/.test(s)) return "자동차 전장";
  if (/부품/.test(s) && /자동차/.test(s)) return "자동차 부품";
  if (/자율주행/.test(s)) return "자율주행";

  // 바이오
  if (/cdmo|위탁/.test(s)) return "바이오 CDMO";
  if (/시밀러/.test(s)) return "바이오시밀러";
  if (/항체/.test(s)) return "항체의약품";
  if (/진단/.test(s)) return "체외진단·의료진단";
  if (/의료기기/.test(s)) return "의료기기";
  if (/제약|신약/.test(s)) return "제약·신약개발";
  if (/바이오/.test(s)) return "바이오";

  // 금융
  if (/은행|금융지주/.test(s)) return "은행·금융지주";
  if (/보험/.test(s)) return "보험";
  if (/증권/.test(s)) return "증권·자산운용";
  if (/카드|결제/.test(s)) return "카드·결제 인프라";

  // 인터넷·플랫폼·게임
  if (/인터넷.*플랫폼|플랫폼.*ai/.test(s)) return "인터넷 플랫폼";
  if (/게임/.test(s)) return "게임";
  if (/엔터|콘텐츠|미디어/.test(s)) return "엔터·콘텐츠";
  if (/소프트웨어|saas|클라우드/.test(s)) return "소프트웨어·SaaS";
  if (/보안/.test(s)) return "사이버보안";

  // 통신
  if (/통신|텔레콤/.test(s)) return "통신";

  // 에너지·유틸리티
  if (/정유|석유/.test(s)) return "정유";
  if (/가스/.test(s)) return "도시가스·LPG";
  if (/전력|유틸리티/.test(s)) return "전력·유틸리티";
  if (/재생에너지|태양광|풍력/.test(s)) return "재생에너지";
  if (/원전|원자력/.test(s)) return "원자력";

  // 산업재
  if (/조선/.test(s)) return "조선";
  if (/방산/.test(s)) return "방산";
  if (/항공.*우주|우주/.test(s)) return "항공우주";
  if (/항공/.test(s)) return "항공";
  if (/철강/.test(s)) return "철강";
  if (/화학/.test(s)) return "화학";
  if (/플랜트|건설/.test(s)) return "건설·플랜트";
  if (/건자재/.test(s)) return "건자재";
  if (/전력기기/.test(s)) return "전력기기·중전기";

  // 소비재
  if (/식음료|음식료/.test(s)) return "식음료";
  if (/유통/.test(s)) return "유통·이커머스";
  if (/패션/.test(s)) return "패션·의류";
  if (/화장품/.test(s)) return "화장품";
  if (/외식/.test(s)) return "외식";
  if (/호텔|여행/.test(s)) return "호텔·여행";
  if (/소비재/.test(s)) return "소비재";

  // 부동산
  if (/리츠/.test(s)) return "리츠";
  if (/부동산/.test(s)) return "부동산";
  if (/지주회사/.test(s)) return "지주회사";

  return sector;
}
