type AdditionalCompanySeed = {
  ticker: string;
  companyNameKo: string;
  companyNameEn: string;
  exchange: string;
  sector: string;
};

function parseCompanySeedRows(rows: string): AdditionalCompanySeed[] {
  return rows
    .trim()
    .split("\n")
    .map((row) => row.split("|").map((value) => value.trim()))
    .filter((columns) => columns.length === 5 && columns.every(Boolean))
    .map(([ticker, companyNameKo, companyNameEn, exchange, sector]) => ({
      ticker,
      companyNameKo,
      companyNameEn,
      exchange,
      sector,
    }));
}

const rawCompanySeedRows = `
AA|Alcoa|Alcoa|NYSE|알루미늄 · 소재
AAL|American Airlines Group|American Airlines Group|NASDAQ|항공 · 여객
AAOI|Applied Optoelectronics|Applied Optoelectronics|NASDAQ|광통신 · 네트워크 장비
AAON|AAON|AAON|NASDAQ|공조 · 산업장비
ABCL|AbCellera Biologics|AbCellera Biologics|NASDAQ|바이오 · 항체 플랫폼
ABOS|Acumen Pharmaceuticals|Acumen Pharmaceuticals|NASDAQ|바이오 · 신경질환
ABSI|Absci|Absci|NASDAQ|AI 신약개발 · 바이오
ABTC|American Bitcoin|American Bitcoin|NASDAQ|비트코인 · 디지털자산
ABUS|Arbutus Biopharma|Arbutus Biopharma|NASDAQ|바이오 · RNA 치료제
ABVX|Abivax|Abivax|NASDAQ|바이오 · 면역질환
ACAD|ACADIA Pharmaceuticals|ACADIA Pharmaceuticals|NASDAQ|제약 · 신경계 치료제
ACDC|ProFrac Holding|ProFrac Holding|NASDAQ|에너지 서비스
ACEL|Accel Entertainment|Accel Entertainment|NYSE|게임 · 엔터테인먼트
ACHC|Acadia Healthcare|Acadia Healthcare|NASDAQ|헬스케어 서비스
ACIW|ACI Worldwide|ACI Worldwide|NASDAQ|결제 소프트웨어
ACLS|Axcelis Technologies|Axcelis Technologies|NASDAQ|반도체 장비
ACMR|ACM Research|ACM Research|NASDAQ|반도체 장비
ACVA|ACV Auctions|ACV Auctions|NASDAQ|자동차 경매 플랫폼
ADMA|ADMA Biologics|ADMA Biologics|NASDAQ|바이오 · 혈장 의약품
ADNT|Adient|Adient|NYSE|자동차 시트 · 부품
ADT|ADT|ADT|NYSE|보안 서비스
ADUS|Addus HomeCare|Addus HomeCare|NASDAQ|홈헬스케어
AEHR|Aehr Test Systems|Aehr Test Systems|NASDAQ|반도체 검사장비
AEIS|Advanced Energy Industries|Advanced Energy Industries|NASDAQ|전력장비 · 반도체 장비
AER|AerCap Holdings|AerCap Holdings|NYSE|항공기 리스
AFRM|Affirm Holdings|Affirm Holdings|NASDAQ|핀테크 · BNPL
AGCO|AGCO|AGCO|NYSE|농기계 · 산업재
AGIO|Agios Pharmaceuticals|Agios Pharmaceuticals|NASDAQ|바이오 · 희귀질환
AGNC|AGNC Investment|AGNC Investment|NASDAQ|모기지 리츠
AGYS|Agilysys|Agilysys|NASDAQ|호텔 소프트웨어
AI|C3.ai|C3.ai|NYSE|AI 소프트웨어
AIRC|Apartment Income REIT|Apartment Income REIT|NYSE|주거 리츠
AIT|Applied Industrial Technologies|Applied Industrial Technologies|NYSE|산업재 유통
AKRO|Akero Therapeutics|Akero Therapeutics|NASDAQ|바이오 · 대사질환
ALGM|Allegro MicroSystems|Allegro MicroSystems|NASDAQ|자동차 반도체
ALGT|Allegiant Travel|Allegiant Travel|NASDAQ|항공 · 여행
ALHC|Alignment Healthcare|Alignment Healthcare|NASDAQ|헬스케어 보험
ALK|Alaska Air Group|Alaska Air Group|NYSE|항공 · 여객
ALKS|Alkermes|Alkermes|NASDAQ|제약 · 신경계 치료제
ALKT|Alkami Technology|Alkami Technology|NASDAQ|은행 소프트웨어
ALLO|Allogene Therapeutics|Allogene Therapeutics|NASDAQ|바이오 · 세포치료제
ALSN|Allison Transmission|Allison Transmission|NYSE|상용차 변속기
ALT|Altimmune|Altimmune|NASDAQ|바이오 · 비만치료제
ALTR|Altair Engineering|Altair Engineering|NASDAQ|엔지니어링 소프트웨어
ALV|Autoliv|Autoliv|NYSE|자동차 안전부품
AMBA|Ambarella|Ambarella|NASDAQ|AI 비전 반도체
AMBP|Ardagh Metal Packaging|Ardagh Metal Packaging|NYSE|금속 포장재
AMED|Amedisys|Amedisys|NASDAQ|홈헬스케어
AMG|Affiliated Managers Group|Affiliated Managers Group|NYSE|자산운용
AMPH|Amphastar Pharmaceuticals|Amphastar Pharmaceuticals|NASDAQ|제약 · 주사제
AMR|Alpha Metallurgical Resources|Alpha Metallurgical Resources|NYSE|석탄 · 원자재
AMRC|Ameresco|Ameresco|NYSE|에너지 효율 · 재생에너지
AMSC|American Superconductor|American Superconductor|NASDAQ|전력기기 · 초전도
AMWD|American Woodmark|American Woodmark|NASDAQ|주택자재 · 가구
AN|AutoNation|AutoNation|NYSE|자동차 유통
ANDE|The Andersons|The Andersons|NASDAQ|농업 · 곡물유통
ANF|Abercrombie & Fitch|Abercrombie & Fitch|NYSE|의류 · 소비재
ANGO|AngioDynamics|AngioDynamics|NASDAQ|의료기기
APPF|AppFolio|AppFolio|NASDAQ|부동산 소프트웨어
AR|Antero Resources|Antero Resources|NYSE|천연가스 · 에너지
ARCB|ArcBest|ArcBest|NASDAQ|물류 · 운송
ARCO|Arcos Dorados|Arcos Dorados|NYSE|외식 프랜차이즈
ARDT|Ardent Health Partners|Ardent Health Partners|NYSE|병원 · 헬스케어
ARMK|Aramark|Aramark|NYSE|푸드서비스 · 시설관리
ARRY|Array Technologies|Array Technologies|NASDAQ|태양광 추적장치
ARWR|Arrowhead Pharmaceuticals|Arrowhead Pharmaceuticals|NASDAQ|RNA 치료제 · 바이오
ASAN|Asana|Asana|NYSE|협업 소프트웨어
ASB|Associated Banc-Corp|Associated Banc-Corp|NYSE|지역은행
ASGN|ASGN|ASGN|NYSE|IT 인력 · 컨설팅
ASH|Ashland|Ashland|NYSE|화학 · 특수소재
ASO|Academy Sports and Outdoors|Academy Sports and Outdoors|NASDAQ|스포츠용품 유통
ASPN|Aspen Aerogels|Aspen Aerogels|NYSE|첨단소재 · 단열재
ASTE|Astec Industries|Astec Industries|NASDAQ|건설장비
ASTS|AST SpaceMobile|AST SpaceMobile|NASDAQ|위성통신
ATGE|Adtalem Global Education|Adtalem Global Education|NYSE|교육 서비스
ATKR|Atkore|Atkore|NYSE|전기 인프라 · 건자재
ATMU|Atmus Filtration Technologies|Atmus Filtration Technologies|NYSE|필터 · 산업재
AUR|Aurora Innovation|Aurora Innovation|NASDAQ|자율주행 기술
AVAV|AeroVironment|AeroVironment|NASDAQ|드론 · 방산
AVNT|Avient|Avient|NYSE|특수소재
AVT|Avnet|Avnet|NASDAQ|전자부품 유통
AX|Axos Financial|Axos Financial|NYSE|디지털 은행
AXSM|Axsome Therapeutics|Axsome Therapeutics|NASDAQ|바이오 · 신경계 치료제
AYI|Acuity Brands|Acuity Brands|NYSE|조명 · 건물관리
AZEK|The AZEK Company|The AZEK Company|NYSE|주택자재 · 합성목재
AZTA|Azenta|Azenta|NASDAQ|생명과학 장비
BANC|Banc of California|Banc of California|NYSE|지역은행
BC|Brunswick|Brunswick|NYSE|보트 · 레저
BCO|Brink's|Brink's|NYSE|보안 운송
BCPC|Balchem|Balchem|NASDAQ|특수화학 · 영양소재
BDC|Belden|Belden|NYSE|네트워크 케이블 · 산업재
BECN|Beacon Roofing Supply|Beacon Roofing Supply|NASDAQ|건축자재 유통
BGC|BGC Group|BGC Group|NASDAQ|금융중개 · 거래 플랫폼
BGS|B&G Foods|B&G Foods|NYSE|식품 · 소비재
BHF|Brighthouse Financial|Brighthouse Financial|NASDAQ|보험 · 연금
BHVN|Biohaven|Biohaven|NYSE|바이오 · 신경질환
BILI|Bilibili|Bilibili|NASDAQ|중국 인터넷 · 콘텐츠
BILL|BILL Holdings|BILL Holdings|NYSE|핀테크 · 회계 소프트웨어
BIO|Bio-Rad Laboratories|Bio-Rad Laboratories|NYSE|생명과학 장비
BJ|BJ's Wholesale Club|BJ's Wholesale Club|NYSE|창고형 유통
BKD|Brookdale Senior Living|Brookdale Senior Living|NYSE|시니어 주거
BKE|Buckle|Buckle|NYSE|의류 유통
BKH|Black Hills|Black Hills|NYSE|유틸리티 · 전력가스
BL|BlackLine|BlackLine|NASDAQ|회계 소프트웨어
BLD|TopBuild|TopBuild|NYSE|건설자재 · 단열시공
BLKB|Blackbaud|Blackbaud|NASDAQ|비영리 소프트웨어
BMBL|Bumble|Bumble|NASDAQ|소셜앱 · 데이팅
BMI|Badger Meter|Badger Meter|NYSE|수도계량 · 산업기기
BOOT|Boot Barn|Boot Barn|NYSE|의류 · 웨스턴 리테일
BOX|Box|Box|NYSE|클라우드 콘텐츠 관리
BRBR|BellRing Brands|BellRing Brands|NYSE|건강식품 · 단백질
BRKR|Bruker|Bruker|NASDAQ|분석장비 · 생명과학
BRZE|Braze|Braze|NASDAQ|마케팅 소프트웨어
BSM|Black Stone Minerals|Black Stone Minerals|NYSE|에너지 로열티
BTDR|Bitdeer Technologies|Bitdeer Technologies|NASDAQ|비트코인 채굴
BTU|Peabody Energy|Peabody Energy|NYSE|석탄 · 에너지
BV|BrightView Holdings|BrightView Holdings|NYSE|조경 서비스
BYD|Boyd Gaming|Boyd Gaming|NYSE|카지노 · 호텔
CABO|Cable One|Cable One|NYSE|케이블 · 통신
CACI|CACI International|CACI International|NYSE|방산 IT · 정부서비스
CADE|Cadence Bank|Cadence Bank|NYSE|지역은행
CAL|Caleres|Caleres|NYSE|신발 · 소비재
CALM|Cal-Maine Foods|Cal-Maine Foods|NASDAQ|계란 · 식품
CARG|CarGurus|CarGurus|NASDAQ|자동차 온라인 플랫폼
CARS|Cars.com|Cars.com|NYSE|자동차 온라인 플랫폼
CBT|Cabot|Cabot|NYSE|화학 · 카본블랙
CC|The Chemours Company|The Chemours Company|NYSE|화학 · 티타늄소재
CCK|Crown Holdings|Crown Holdings|NYSE|포장재 · 금속캔
CDNA|CareDx|CareDx|NASDAQ|진단 · 이식의학
CENT|Central Garden and Pet|Central Garden and Pet|NASDAQ|반려동물 · 정원용품
CERT|Certara|Certara|NASDAQ|바이오 시뮬레이션 소프트웨어
CFLT|Confluent|Confluent|NASDAQ|데이터 스트리밍 소프트웨어
CFR|Cullen Frost Bankers|Cullen Frost Bankers|NYSE|지역은행
CG|The Carlyle Group|The Carlyle Group|NASDAQ|사모펀드 · 자산운용
CHDN|Churchill Downs|Churchill Downs|NASDAQ|카지노 · 경마
CHEF|The Chefs' Warehouse|The Chefs' Warehouse|NASDAQ|식자재 유통
CHH|Choice Hotels|Choice Hotels|NYSE|호텔 프랜차이즈
CHRD|Chord Energy|Chord Energy|NASDAQ|석유가스 · 에너지
CIEN|Ciena|Ciena|NYSE|광통신 장비
CIVI|Civitas Resources|Civitas Resources|NYSE|석유가스 · 에너지
CLB|Core Laboratories|Core Laboratories|NYSE|에너지 서비스
CLF|Cleveland-Cliffs|Cleveland-Cliffs|NYSE|철강 · 자동차강판
CLH|Clean Harbors|Clean Harbors|NYSE|환경서비스 · 폐기물
CLOV|Clover Health|Clover Health|NASDAQ|헬스케어 보험
CLVT|Clarivate|Clarivate|NYSE|데이터 · 지식재산
CNK|Cinemark Holdings|Cinemark Holdings|NYSE|영화관 · 엔터테인먼트
CNM|Core & Main|Core & Main|NYSE|상하수도 인프라 유통
CNO|CNO Financial Group|CNO Financial Group|NYSE|보험 · 금융
CNX|CNX Resources|CNX Resources|NYSE|천연가스 · 에너지
COGT|Cogent Biosciences|Cogent Biosciences|NASDAQ|바이오 · 항암제
COHR|Coherent|Coherent|NYSE|광학소재 · 레이저
COLB|Columbia Banking System|Columbia Banking System|NASDAQ|지역은행
COLD|Americold Realty Trust|Americold Realty Trust|NYSE|냉장물류 리츠
COLM|Columbia Sportswear|Columbia Sportswear|NASDAQ|아웃도어 의류
COMM|CommScope|CommScope|NASDAQ|통신장비 · 네트워크
CORT|Corcept Therapeutics|Corcept Therapeutics|NASDAQ|바이오 · 내분비질환
COTY|Coty|Coty|NYSE|화장품 · 뷰티
COUR|Coursera|Coursera|NYSE|온라인 교육 플랫폼
CPRI|Capri Holdings|Capri Holdings|NYSE|명품 · 패션
CRDO|Credo Technology|Credo Technology|NASDAQ|데이터센터 반도체
CRGY|Crescent Energy|Crescent Energy|NYSE|석유가스 · 에너지
CRK|Comstock Resources|Comstock Resources|NYSE|천연가스 · 에너지
CRSP|CRISPR Therapeutics|CRISPR Therapeutics|NASDAQ|유전자편집 · 바이오
CRUS|Cirrus Logic|Cirrus Logic|NASDAQ|오디오 반도체
CSWI|CSW Industrials|CSW Industrials|NASDAQ|산업재 · 건자재
CUBI|Customers Bancorp|Customers Bancorp|NYSE|지역은행
CUZ|Cousins Properties|Cousins Properties|NYSE|오피스 리츠
CVLT|Commvault Systems|Commvault Systems|NASDAQ|데이터 백업 소프트웨어
CVNA|Carvana|Carvana|NYSE|중고차 온라인 플랫폼
CWAN|Clearwater Analytics|Clearwater Analytics|NYSE|투자회계 소프트웨어
CWST|Casella Waste Systems|Casella Waste Systems|NASDAQ|폐기물 처리 · 환경
CYTK|Cytokinetics|Cytokinetics|NASDAQ|바이오 · 심장질환
DAN|Dana|Dana|NYSE|자동차 부품
DAR|Darling Ingredients|Darling Ingredients|NYSE|식품 부산물 · 바이오연료
DBX|Dropbox|Dropbox|NASDAQ|클라우드 스토리지
DEI|Douglas Emmett|Douglas Emmett|NYSE|오피스 리츠
DNLI|Denali Therapeutics|Denali Therapeutics|NASDAQ|바이오 · 신경질환
DOCN|DigitalOcean|DigitalOcean|NYSE|클라우드 인프라
DOCS|Doximity|Doximity|NYSE|의료 네트워크 플랫폼
DOX|Amdocs|Amdocs|NASDAQ|통신 소프트웨어
DT|Dynatrace|Dynatrace|NYSE|소프트웨어 관측성
DV|DoubleVerify|DoubleVerify|NYSE|디지털 광고 검증
DXC|DXC Technology|DXC Technology|NYSE|IT서비스 · 컨설팅
EAF|GrafTech International|GrafTech International|NYSE|흑연전극 · 소재
EAT|Brinker International|Brinker International|NYSE|외식 · 레스토랑
EBC|Eastern Bankshares|Eastern Bankshares|NASDAQ|지역은행
ECPG|Encore Capital Group|Encore Capital Group|NASDAQ|채권회수 · 금융
EFC|Ellington Financial|Ellington Financial|NYSE|모기지 금융
EGP|EastGroup Properties|EastGroup Properties|NYSE|산업용 리츠
EHC|Encompass Health|Encompass Health|NYSE|재활병원 · 헬스케어
ENOV|Enovis|Enovis|NYSE|정형외과 의료기기
ENV|Envestnet|Envestnet|NYSE|자산관리 소프트웨어
EPR|EPR Properties|EPR Properties|NYSE|엔터테인먼트 리츠
EPRT|Essential Properties Realty Trust|Essential Properties Realty Trust|NYSE|순임대 리츠
EQH|Equitable Holdings|Equitable Holdings|NYSE|보험 · 자산관리
ESAB|ESAB|ESAB|NYSE|용접장비 · 산업재
ESNT|Essent Group|Essent Group|NYSE|모기지 보험
EVR|Evercore|Evercore|NYSE|투자은행 · 자문
EWBC|East West Bancorp|East West Bancorp|NASDAQ|지역은행
EXAS|Exact Sciences|Exact Sciences|NASDAQ|암 진단 · 바이오
EXEL|Exelixis|Exelixis|NASDAQ|항암제 · 바이오
EXP|Eagle Materials|Eagle Materials|NYSE|시멘트 · 건자재
EXPO|Exponent|Exponent|NASDAQ|엔지니어링 컨설팅
FATE|Fate Therapeutics|Fate Therapeutics|NASDAQ|바이오 · 세포치료제
FBIN|Fortune Brands Innovations|Fortune Brands Innovations|NYSE|주택자재 · 보안제품
FCFS|FirstCash Holdings|FirstCash Holdings|NASDAQ|전당포 · 소비금융
FCN|FTI Consulting|FTI Consulting|NYSE|컨설팅 · 자문
FELE|Franklin Electric|Franklin Electric|NASDAQ|펌프 · 수처리
FFIN|First Financial Bankshares|First Financial Bankshares|NASDAQ|지역은행
FHI|Federated Hermes|Federated Hermes|NYSE|자산운용
FIBK|First Interstate BancSystem|First Interstate BancSystem|NASDAQ|지역은행
FIVE|Five Below|Five Below|NASDAQ|할인 유통
FIVN|Five9|Five9|NASDAQ|클라우드 콜센터
FIZZ|National Beverage|National Beverage|NASDAQ|음료 · 소비재
FL|Foot Locker|Foot Locker|NYSE|스포츠용품 유통
FLO|Flowers Foods|Flowers Foods|NYSE|제빵 · 식품
FLR|Fluor|Fluor|NYSE|엔지니어링 · 건설
FLYW|Flywire|Flywire|NASDAQ|결제 · 핀테크
FOUR|Shift4 Payments|Shift4 Payments|NYSE|결제 · 핀테크
FR|First Industrial Realty Trust|First Industrial Realty Trust|NYSE|산업용 리츠
FRPT|Freshpet|Freshpet|NASDAQ|반려동물 식품
FRO|Frontline|Frontline|NYSE|해운 · 유조선
FSLY|Fastly|Fastly|NYSE|엣지 클라우드
FTAI|FTAI Aviation|FTAI Aviation|NASDAQ|항공기 엔진 리스
FULT|Fulton Financial|Fulton Financial|NASDAQ|지역은행
FWRD|Forward Air|Forward Air|NASDAQ|물류 · 운송
GATX|GATX|GATX|NYSE|철도차량 리스
GBCI|Glacier Bancorp|Glacier Bancorp|NYSE|지역은행
GDYN|Grid Dynamics|Grid Dynamics|NASDAQ|디지털 엔지니어링
GEF|Greif|Greif|NYSE|포장재 · 산업재
GEO|The GEO Group|The GEO Group|NYSE|민간 교정시설 · 부동산
GFF|Griffon|Griffon|NYSE|산업재 · 주택제품
GH|Guardant Health|Guardant Health|NASDAQ|암 진단 · 바이오
GIII|G-III Apparel|G-III Apparel|NASDAQ|의류 · 패션
GKOS|Glaukos|Glaukos|NYSE|안과 의료기기
GLBE|Global-e Online|Global-e Online|NASDAQ|전자상거래 소프트웨어
GLOB|Globant|Globant|NYSE|IT서비스 · 디지털전환
GME|GameStop|GameStop|NYSE|게임 유통 · 밈주식
GNTX|Gentex|Gentex|NASDAQ|자동차 전장부품
GOLF|Acushnet Holdings|Acushnet Holdings|NYSE|골프용품
GOOS|Canada Goose|Canada Goose|NYSE|의류 · 아웃도어
GPI|Group 1 Automotive|Group 1 Automotive|NYSE|자동차 딜러
GRBK|Green Brick Partners|Green Brick Partners|NYSE|주택건설
GT|Goodyear Tire & Rubber|Goodyear Tire & Rubber|NASDAQ|타이어 · 자동차부품
GTLB|GitLab|GitLab|NASDAQ|개발자 소프트웨어
GTLS|Chart Industries|Chart Industries|NYSE|가스 장비 · 에너지 인프라
GXO|GXO Logistics|GXO Logistics|NYSE|물류 · 계약물류
HAE|Haemonetics|Haemonetics|NYSE|혈액관리 의료기기
HALO|Halozyme Therapeutics|Halozyme Therapeutics|NASDAQ|바이오 · 약물전달
HASI|HA Sustainable Infrastructure|HA Sustainable Infrastructure|NYSE|재생에너지 금융
HCSG|Healthcare Services Group|Healthcare Services Group|NASDAQ|헬스케어 시설서비스
HELE|Helen of Troy|Helen of Troy|NASDAQ|생활용품 · 소비재
HGV|Hilton Grand Vacations|Hilton Grand Vacations|NYSE|타임셰어 · 여행
HIMS|Hims & Hers Health|Hims & Hers Health|NYSE|디지털 헬스케어
HIW|Highwoods Properties|Highwoods Properties|NYSE|오피스 리츠
HL|Hecla Mining|Hecla Mining|NYSE|은광산 · 원자재
HLNE|Hamilton Lane|Hamilton Lane|NASDAQ|대체투자 자산운용
HOMB|Home BancShares|Home BancShares|NYSE|지역은행
HQY|HealthEquity|HealthEquity|NASDAQ|헬스케어 계좌 플랫폼
HRB|H&R Block|H&R Block|NYSE|세무 서비스
HRI|Herc Holdings|Herc Holdings|NYSE|장비 렌탈
HUBG|Hub Group|Hub Group|NASDAQ|물류 · 복합운송
HURN|Huron Consulting|Huron Consulting|NASDAQ|컨설팅 · 헬스케어
IAC|IAC|IAC|NASDAQ|인터넷 지주회사
IBP|Installed Building Products|Installed Building Products|NYSE|건축자재 시공
IBRX|ImmunityBio|ImmunityBio|NASDAQ|바이오 · 면역항암
ICLR|ICON|ICON|NASDAQ|임상시험 CRO
IDA|IDACORP|IDACORP|NYSE|전력 유틸리티
IDCC|InterDigital|InterDigital|NASDAQ|무선통신 특허 · 기술
IDYA|IDEAYA Biosciences|IDEAYA Biosciences|NASDAQ|바이오 · 정밀항암
IGT|International Game Technology|International Game Technology|NYSE|게임 장비 · 복권
IMVT|Immunovant|Immunovant|NASDAQ|바이오 · 자가면역
INFA|Informatica|Informatica|NYSE|데이터 관리 소프트웨어
INGR|Ingredion|Ingredion|NYSE|식품소재 · 전분
INMD|InMode|InMode|NASDAQ|미용의료기기
INSP|Inspire Medical Systems|Inspire Medical Systems|NYSE|의료기기 · 수면무호흡
INST|Instructure Holdings|Instructure Holdings|NYSE|교육 소프트웨어
INTA|Intapp|Intapp|NASDAQ|전문서비스 소프트웨어
IONQ|IonQ|IonQ|NYSE|양자컴퓨팅
IOSP|Innospec|Innospec|NASDAQ|특수화학
IRDM|Iridium Communications|Iridium Communications|NASDAQ|위성통신
IRTC|iRhythm Technologies|iRhythm Technologies|NASDAQ|디지털 헬스케어 · 심전도
ITRI|Itron|Itron|NASDAQ|스마트미터 · 유틸리티 기술
JAZZ|Jazz Pharmaceuticals|Jazz Pharmaceuticals|NASDAQ|제약 · 희귀질환
JBLU|JetBlue Airways|JetBlue Airways|NASDAQ|항공 · 여객
JBTM|JBT Marel|JBT Marel|NYSE|식품가공 장비
JOBY|Joby Aviation|Joby Aviation|NYSE|전기항공기 · eVTOL
JWN|Nordstrom|Nordstrom|NYSE|백화점 · 유통
KAI|Kadant|Kadant|NYSE|산업장비 · 공정기술
KALU|Kaiser Aluminum|Kaiser Aluminum|NASDAQ|알루미늄 · 소재
KBH|KB Home|KB Home|NYSE|주택건설
KD|Kyndryl|Kyndryl|NYSE|IT 인프라 서비스
KEX|Kirby|Kirby|NYSE|해상운송 · 에너지물류
KFY|Korn Ferry|Korn Ferry|NYSE|인사 컨설팅
KLIC|Kulicke and Soffa|Kulicke and Soffa|NASDAQ|반도체 장비
KNF|Knife River|Knife River|NYSE|건자재 · 골재
KRYS|Krystal Biotech|Krystal Biotech|NASDAQ|바이오 · 유전자치료
KSS|Kohl's|Kohl's|NYSE|백화점 · 유통
KTOS|Kratos Defense & Security|Kratos Defense & Security|NASDAQ|방산 · 무인기
KWR|Quaker Houghton|Quaker Houghton|NYSE|산업용 화학
LAZ|Lazard|Lazard|NYSE|투자은행 · 자산운용
LAZR|Luminar Technologies|Luminar Technologies|NASDAQ|자율주행 라이다
LBRDA|Liberty Broadband|Liberty Broadband|NASDAQ|통신 지주회사
LEA|Lear|Lear|NYSE|자동차 시트 · 전장
LEG|Leggett & Platt|Leggett & Platt|NYSE|가구부품 · 산업재
LFST|LifeStance Health|LifeStance Health|NASDAQ|정신건강 플랫폼
LGIH|LGI Homes|LGI Homes|NASDAQ|주택건설
LII|Lennox International|Lennox International|NYSE|공조 · HVAC
LNTH|Lantheus Holdings|Lantheus Holdings|NASDAQ|진단영상 · 방사성의약품
LNW|Light & Wonder|Light & Wonder|NASDAQ|카지노 게임 기술
LPLA|LPL Financial|LPL Financial|NASDAQ|독립 금융자문 플랫폼
LPRO|Open Lending|Open Lending|NASDAQ|자동차 금융 플랫폼
LSPD|Lightspeed Commerce|Lightspeed Commerce|NYSE|결제 · POS 소프트웨어
LTH|Life Time Group|Life Time Group|NYSE|피트니스 · 헬스클럽
LUMN|Lumen Technologies|Lumen Technologies|NYSE|통신 · 광섬유
LUNR|Intuitive Machines|Intuitive Machines|NASDAQ|우주 · 달 탐사
LZ|LegalZoom|LegalZoom|NASDAQ|법률 플랫폼
M|Macy's|Macy's|NYSE|백화점 · 유통
MAN|ManpowerGroup|ManpowerGroup|NYSE|인력 서비스
MANH|Manhattan Associates|Manhattan Associates|NASDAQ|공급망 소프트웨어
MARA|MARA Holdings|MARA Holdings|NASDAQ|비트코인 채굴
MATX|Matson|Matson|NYSE|해운 · 물류
MC|Moelis & Company|Moelis & Company|NYSE|투자은행 · 자문
MCW|Mister Car Wash|Mister Car Wash|NYSE|세차 서비스
MD|Pediatrix Medical Group|Pediatrix Medical Group|NYSE|의료 서비스
MDRX|Veradigm|Veradigm|NASDAQ|의료 IT
MGEE|MGE Energy|MGE Energy|NASDAQ|전력 유틸리티
MGY|Magnolia Oil & Gas|Magnolia Oil & Gas|NYSE|석유가스 · 에너지
MIDD|The Middleby Corporation|The Middleby Corporation|NASDAQ|상업용 주방장비
MIR|Mirion Technologies|Mirion Technologies|NYSE|방사선 측정장비
MKSI|MKS Instruments|MKS Instruments|NASDAQ|반도체 장비 · 계측
MLI|Mueller Industries|Mueller Industries|NYSE|금속배관 · 산업재
MMS|Maximus|Maximus|NYSE|정부서비스 · 아웃소싱
MMSI|Merit Medical Systems|Merit Medical Systems|NASDAQ|의료기기
MNDY|Monday.com|Monday.com|NASDAQ|협업 소프트웨어
MOD|Modine Manufacturing|Modine Manufacturing|NYSE|열관리 · 산업재
MODG|Topgolf Callaway Brands|Topgolf Callaway Brands|NYSE|골프 · 레저
MORN|Morningstar|Morningstar|NASDAQ|투자정보 · 데이터
MP|MP Materials|MP Materials|NYSE|희토류 · 소재
MPW|Medical Properties Trust|Medical Properties Trust|NYSE|헬스케어 리츠
MRCY|Mercury Systems|Mercury Systems|NASDAQ|방산 전자장비
MRTN|Marten Transport|Marten Transport|NASDAQ|트럭 운송
MSA|MSA Safety|MSA Safety|NYSE|안전장비 · 산업재
MTDR|Matador Resources|Matador Resources|NYSE|석유가스 · 에너지
MTG|MGIC Investment|MGIC Investment|NYSE|모기지 보험
MTN|Vail Resorts|Vail Resorts|NYSE|스키 리조트 · 레저
MUR|Murphy Oil|Murphy Oil|NYSE|석유가스 · 에너지
MYGN|Myriad Genetics|Myriad Genetics|NASDAQ|유전자 진단 · 바이오
NARI|Inari Medical|Inari Medical|NASDAQ|의료기기 · 혈관치료
NATL|NCR Atleos|NCR Atleos|NYSE|ATM · 금융기기
NBIX|Neurocrine Biosciences|Neurocrine Biosciences|NASDAQ|바이오 · 신경계
NBTB|NBT Bancorp|NBT Bancorp|NASDAQ|지역은행
NCNO|nCino|nCino|NASDAQ|은행 소프트웨어
NFE|New Fortress Energy|New Fortress Energy|NASDAQ|LNG · 에너지
NFG|National Fuel Gas|National Fuel Gas|NYSE|가스 유틸리티
NJR|New Jersey Resources|New Jersey Resources|NYSE|가스 유틸리티
NMIH|NMI Holdings|NMI Holdings|NASDAQ|모기지 보험
NOVT|Novanta|Novanta|NASDAQ|정밀기술 · 의료산업 장비
NSA|National Storage Affiliates|National Storage Affiliates|NYSE|셀프스토리지 리츠
NTRA|Natera|Natera|NASDAQ|유전자 진단 · 바이오
NVST|Envista Holdings|Envista Holdings|NYSE|치과 의료기기
NXST|Nexstar Media Group|Nexstar Media Group|NASDAQ|방송 · 미디어
NXT|Nextracker|Nextracker|NASDAQ|태양광 추적장치
NYCB|New York Community Bancorp|New York Community Bancorp|NYSE|지역은행
OII|Oceaneering International|Oceaneering International|NYSE|해양 에너지 서비스
OLO|Olo|Olo|NYSE|레스토랑 소프트웨어
OLPX|Olaplex Holdings|Olaplex Holdings|NASDAQ|헤어케어 · 뷰티
OMCL|Omnicell|Omnicell|NASDAQ|약국 자동화 · 헬스케어
OMF|OneMain Holdings|OneMain Holdings|NYSE|소비자 금융
ONB|Old National Bancorp|Old National Bancorp|NASDAQ|지역은행
ONON|On Holding|On Holding|NYSE|스포츠웨어 · 신발
ONTO|Onto Innovation|Onto Innovation|NYSE|반도체 계측장비
OPCH|Option Care Health|Option Care Health|NASDAQ|홈 인퓨전 헬스케어
OSCR|Oscar Health|Oscar Health|NYSE|헬스케어 보험
OSIS|OSI Systems|OSI Systems|NASDAQ|보안검색 · 의료기기
OSK|Oshkosh|Oshkosh|NYSE|특장차 · 방산
PAG|Penske Automotive Group|Penske Automotive Group|NYSE|자동차 딜러
PAR|PAR Technology|PAR Technology|NYSE|레스토랑 POS 소프트웨어
PATH|UiPath|UiPath|NYSE|자동화 소프트웨어 · RPA
PAYO|Payoneer Global|Payoneer Global|NASDAQ|핀테크 · 글로벌 결제
PCOR|Procore Technologies|Procore Technologies|NYSE|건설 소프트웨어
PCTY|Paylocity|Paylocity|NASDAQ|HR 소프트웨어
PD|PagerDuty|PagerDuty|NYSE|IT 운영 소프트웨어
PENN|PENN Entertainment|PENN Entertainment|NASDAQ|카지노 · 스포츠베팅
PFGC|Performance Food Group|Performance Food Group|NYSE|식자재 유통
PFSI|PennyMac Financial Services|PennyMac Financial Services|NYSE|모기지 금융
PGNY|Progyny|Progyny|NASDAQ|헬스케어 · 난임복지
PI|Impinj|Impinj|NASDAQ|RFID 반도체
PLMR|Palomar Holdings|Palomar Holdings|NASDAQ|특수보험
PLNT|Planet Fitness|Planet Fitness|NYSE|피트니스 프랜차이즈
PLTK|Playtika|Playtika|NASDAQ|모바일 게임
PLUS|ePlus|ePlus|NASDAQ|IT 솔루션 · 리셀러
POWI|Power Integrations|Power Integrations|NASDAQ|전력반도체
PPC|Pilgrim's Pride|Pilgrim's Pride|NASDAQ|육가공 · 식품
PR|Permian Resources|Permian Resources|NYSE|석유가스 · 에너지
PRCT|PROCEPT BioRobotics|PROCEPT BioRobotics|NASDAQ|수술로봇 · 의료기기
PRGS|Progress Software|Progress Software|NASDAQ|기업용 소프트웨어
PRIM|Primoris Services|Primoris Services|NYSE|인프라 건설 · 유틸리티
PRLB|Proto Labs|Proto Labs|NYSE|디지털 제조 · 3D프린팅
PRMB|Primo Brands|Primo Brands|NYSE|생수 · 음료
PRTA|Prothena|Prothena|NASDAQ|바이오 · 신경질환
PRVA|Privia Health|Privia Health|NASDAQ|의료 플랫폼
PSN|Parsons|Parsons|NYSE|방산 · 인프라 기술
PSTG|Pure Storage|Pure Storage|NYSE|데이터 스토리지
PTEN|Patterson-UTI Energy|Patterson-UTI Energy|NASDAQ|에너지 서비스
PZZA|Papa John's|Papa John's|NASDAQ|외식 · 피자
QTWO|Q2 Holdings|Q2 Holdings|NYSE|은행 소프트웨어
RARE|Ultragenyx Pharmaceutical|Ultragenyx Pharmaceutical|NASDAQ|희귀질환 바이오
RBA|RB Global|RB Global|NYSE|경매 · 산업장비 유통
RDN|Radian Group|Radian Group|NYSE|모기지 보험
RELY|Remitly Global|Remitly Global|NASDAQ|핀테크 · 송금
RGEN|Repligen|Repligen|NASDAQ|바이오 공정장비
RGR|Sturm Ruger|Sturm Ruger|NYSE|소비재 · 아웃도어
RH|RH|RH|NYSE|고급 가구 · 리테일
RIVN|Rivian Automotive|Rivian Automotive|NASDAQ|전기차 · 모빌리티
RKLB|Rocket Lab|Rocket Lab|NASDAQ|우주발사체 · 위성
RLI|RLI|RLI|NYSE|특수보험
RMBS|Rambus|Rambus|NASDAQ|반도체 IP · 메모리 인터페이스
RNA|Avidity Biosciences|Avidity Biosciences|NASDAQ|RNA 치료제 · 바이오
ROIV|Roivant Sciences|Roivant Sciences|NASDAQ|바이오 · 신약개발
RPD|Rapid7|Rapid7|NASDAQ|사이버보안
RRC|Range Resources|Range Resources|NYSE|천연가스 · 에너지
RXRX|Recursion Pharmaceuticals|Recursion Pharmaceuticals|NASDAQ|AI 신약개발
RYAN|Ryan Specialty Holdings|Ryan Specialty Holdings|NYSE|보험중개 · 특수보험
SAIA|Saia|Saia|NASDAQ|트럭 운송
SAM|Boston Beer Company|Boston Beer Company|NYSE|주류 · 수제맥주
SANM|Sanmina|Sanmina|NASDAQ|전자제조 서비스
SATS|EchoStar|EchoStar|NASDAQ|위성통신 · 네트워크
SBRA|Sabra Health Care REIT|Sabra Health Care REIT|NASDAQ|헬스케어 리츠
SBSW|Sibanye Stillwater|Sibanye Stillwater|NYSE|귀금속 · 광산
SDGR|Schrodinger|Schrodinger|NASDAQ|바이오 소프트웨어 · AI
SEAT|Vivid Seats|Vivid Seats|NASDAQ|티켓 플랫폼
SEMR|SEMrush Holdings|SEMrush Holdings|NYSE|마케팅 소프트웨어
SF|Stifel Financial|Stifel Financial|NYSE|증권 · 자산관리
SFBS|ServisFirst Bancshares|ServisFirst Bancshares|NYSE|지역은행
SG|Sweetgreen|Sweetgreen|NYSE|외식 · 샐러드
SHAK|Shake Shack|Shake Shack|NYSE|외식 · 버거
SHC|Sotera Health|Sotera Health|NASDAQ|헬스케어 검사 · 멸균
SHOO|Steven Madden|Steven Madden|NASDAQ|신발 · 패션
SIG|Signet Jewelers|Signet Jewelers|NYSE|주얼리 · 리테일
SITE|SiteOne Landscape Supply|SiteOne Landscape Supply|NYSE|조경자재 유통
SKY|Skyline Champion|Skyline Champion|NYSE|주택건설 · 모듈러홈
SKYW|SkyWest|SkyWest|NASDAQ|지역항공
SLAB|Silicon Laboratories|Silicon Laboratories|NASDAQ|IoT 반도체
SLM|SLM Corporation|SLM Corporation|NASDAQ|학자금 금융
SMAR|Smartsheet|Smartsheet|NYSE|협업 소프트웨어
SMG|Scotts Miracle-Gro|Scotts Miracle-Gro|NYSE|정원용품 · 소비재
SNBR|Sleep Number|Sleep Number|NASDAQ|매트리스 · 소비재
SNEX|StoneX Group|StoneX Group|NASDAQ|금융중개 · 원자재거래
SPSC|SPS Commerce|SPS Commerce|NASDAQ|공급망 소프트웨어
SPT|Sprout Social|Sprout Social|NASDAQ|소셜미디어 소프트웨어
SRPT|Sarepta Therapeutics|Sarepta Therapeutics|NASDAQ|유전자치료 · 바이오
STAA|STAAR Surgical|STAAR Surgical|NASDAQ|안과 의료기기
STAG|STAG Industrial|STAG Industrial|NYSE|산업용 리츠
STNE|StoneCo|StoneCo|NASDAQ|핀테크 · 결제
SUM|Summit Materials|Summit Materials|NYSE|건자재 · 골재
SWTX|SpringWorks Therapeutics|SpringWorks Therapeutics|NASDAQ|바이오 · 희귀암
SYNA|Synaptics|Synaptics|NASDAQ|반도체 · 인터페이스
TALO|Talos Energy|Talos Energy|NYSE|석유가스 · 에너지
TDC|Teradata|Teradata|NYSE|데이터 분석 소프트웨어
TDOC|Teladoc Health|Teladoc Health|NYSE|원격진료 · 디지털헬스
TEX|Terex|Terex|NYSE|건설장비 · 산업재
TFSL|TFS Financial|TFS Financial|NASDAQ|지역은행
TGNA|TEGNA|TEGNA|NYSE|방송 · 미디어
TGTX|TG Therapeutics|TG Therapeutics|NASDAQ|바이오 · 면역질환
THC|Tenet Healthcare|Tenet Healthcare|NYSE|병원 · 헬스케어
THG|Hanover Insurance Group|Hanover Insurance Group|NYSE|손해보험
THO|Thor Industries|Thor Industries|NYSE|레저차량 · RV
TMDX|TransMedics Group|TransMedics Group|NASDAQ|장기이식 의료기기
TNDM|Tandem Diabetes Care|Tandem Diabetes Care|NASDAQ|당뇨 의료기기
TNET|TriNet Group|TriNet Group|NYSE|HR 아웃소싱
TREX|Trex Company|Trex Company|NYSE|합성목재 · 건자재
TRIP|Tripadvisor|Tripadvisor|NASDAQ|여행 플랫폼
TSEM|Tower Semiconductor|Tower Semiconductor|NASDAQ|파운드리 · 반도체
TWO|Two Harbors Investment|Two Harbors Investment|NYSE|모기지 리츠
TXG|10x Genomics|10x Genomics|NASDAQ|생명과학 장비
U|Unity Software|Unity Software|NYSE|게임엔진 · 3D 소프트웨어
UAA|Under Armour|Under Armour|NYSE|스포츠웨어
UBSI|United Bankshares|United Bankshares|NASDAQ|지역은행
UEC|Uranium Energy|Uranium Energy|NYSE American|우라늄 · 에너지
UFPI|UFP Industries|UFP Industries|NASDAQ|목재 · 건자재
UHAL|U-Haul Holding|U-Haul Holding|NYSE|이사 · 렌탈 서비스
UI|Ubiquiti|Ubiquiti|NYSE|네트워크 장비
UMBF|UMB Financial|UMB Financial|NASDAQ|지역은행
UNF|UniFirst|UniFirst|NYSE|유니폼 렌탈 · 서비스
UPST|Upstart Holdings|Upstart Holdings|NASDAQ|핀테크 · AI 대출
URBN|Urban Outfitters|Urban Outfitters|NASDAQ|의류 · 리테일
USFD|US Foods|US Foods|NYSE|식자재 유통
UUUU|Energy Fuels|Energy Fuels|NYSE American|우라늄 · 희토류
VAC|Marriott Vacations Worldwide|Marriott Vacations Worldwide|NYSE|타임셰어 · 여행
VAL|Valaris|Valaris|NYSE|해양 시추
VC|Visteon|Visteon|NASDAQ|자동차 전장
VCEL|Vericel|Vericel|NASDAQ|바이오 · 세포치료
VERX|Vertex|Vertex|NASDAQ|세금 소프트웨어
VIRT|Virtu Financial|Virtu Financial|NASDAQ|마켓메이킹 · 금융기술
VKTX|Viking Therapeutics|Viking Therapeutics|NASDAQ|바이오 · 비만치료제
VLY|Valley National Bancorp|Valley National Bancorp|NASDAQ|지역은행
VNOM|Viper Energy|Viper Energy|NASDAQ|에너지 로열티
VRDN|Viridian Therapeutics|Viridian Therapeutics|NASDAQ|바이오 · 안과질환
VRNS|Varonis Systems|Varonis Systems|NASDAQ|데이터 보안
`;

export const additionalGlobalCompanySeeds = parseCompanySeedRows(rawCompanySeedRows);
