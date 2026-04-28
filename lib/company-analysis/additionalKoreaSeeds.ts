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
007700|F&F홀딩스|F&F Holdings|KOSPI|패션 · 지주회사
383220|F&F|F&F|KOSPI|패션 · 브랜드
011070|LG이노텍|LG Innotek|KOSPI|전자부품 · 카메라모듈
032640|LG유플러스|LG Uplus|KOSPI|통신 · 플랫폼
108320|LX세미콘|LX Semicon|KOSPI|반도체 · 디스플레이 IC
001120|LX인터내셔널|LX International|KOSPI|상사 · 자원개발
383800|LX홀딩스|LX Holdings|KOSPI|지주회사
108670|LX하우시스|LX Hausys|KOSPI|건자재 · 인테리어
008060|대덕|Daeduck|KOSPI|지주회사 · 전자부품
353200|대덕전자|Daeduck Electronics|KOSPI|반도체 PCB
000990|DB하이텍|DB HiTek|KOSPI|파운드리 · 반도체
016610|DB금융투자|DB Financial Investment|KOSPI|증권 · 금융투자
192080|더블유게임즈|DoubleU Games|KOSPI|게임 · 소셜카지노
018670|SK가스|SK Gas|KOSPI|LPG · 에너지
011790|SKC|SKC|KOSPI|화학 · 2차전지 소재
006120|SK디스커버리|SK Discovery|KOSPI|지주회사 · 바이오 · 에너지
001510|SK증권|SK Securities|KOSPI|증권 · 금융투자
336260|두산퓨얼셀|Doosan Fuel Cell|KOSPI|수소연료전지
259960|크래프톤|Krafton|KOSPI|게임 · 콘텐츠
042700|한미반도체|Hanmi Semiconductor|KOSPI|반도체 장비
011210|현대위아|Hyundai Wia|KOSPI|자동차 부품 · 방산
204320|HL만도|HL Mando|KOSPI|자동차 부품 · 자율주행
294870|HDC현대산업개발|HDC Hyundai Development|KOSPI|건설 · 부동산 개발
214320|이노션|Innocean|KOSPI|광고 · 마케팅
272450|진에어|Jin Air|KOSPI|항공 · 여객
089590|제주항공|Jeju Air|KOSPI|항공 · 저비용항공
091810|티웨이항공|Tway Air|KOSPI|항공 · 저비용항공
298690|에어부산|Air Busan|KOSPI|항공 · 저비용항공
088980|맥쿼리인프라|Macquarie Korea Infrastructure Fund|KOSPI|인프라펀드 · 배당
137310|에스디바이오센서|SD Biosensor|KOSPI|진단기기 · 바이오
145720|덴티움|Dentium|KOSPI|치과 의료기기
336370|솔루스첨단소재|Solus Advanced Materials|KOSPI|동박 · 전자소재
006650|대한유화|Korea Petrochemical|KOSPI|석유화학 · 소재
002380|KCC|KCC|KOSPI|건자재 · 실리콘
002350|넥센타이어|Nexen Tire|KOSPI|타이어 · 자동차부품
004800|효성|Hyosung|KOSPI|지주회사 · 소재
298000|효성화학|Hyosung Chemical|KOSPI|화학 · 폴리프로필렌
005250|녹십자홀딩스|GC Holdings|KOSPI|제약 지주회사
001680|대상|Daesang|KOSPI|음식료 · 바이오소재
001800|오리온홀딩스|Orion Holdings|KOSPI|지주회사 · 음식료
003000|부광약품|Bukwang Pharmaceutical|KOSPI|제약 · 의약품
001230|동국홀딩스|Dongkuk Holdings|KOSPI|지주회사 · 철강
003520|영진약품|Yungjin Pharmaceutical|KOSPI|제약 · 의약품
003850|보령|Boryung|KOSPI|제약 · 전문의약품
006390|한일현대시멘트|Hanil Hyundai Cement|KOSPI|시멘트 · 건자재
004690|삼천리|Samchully|KOSPI|도시가스 · 에너지
017800|현대엘리베이터|Hyundai Elevator|KOSPI|승강기 · 물류자동화
005300|롯데칠성|Lotte Chilsung Beverage|KOSPI|음료 · 주류
280360|롯데웰푸드|Lotte Wellfood|KOSPI|제과 · 음식료
006840|AK홀딩스|AK Holdings|KOSPI|지주회사 · 유통
009970|영원무역홀딩스|Youngone Holdings|KOSPI|패션 · 지주회사
111770|영원무역|Youngone|KOSPI|의류 OEM · 아웃도어
093050|LF|LF Corp|KOSPI|패션 · 유통
008350|남선알미늄|Namsun Aluminum|KOSPI|알루미늄 · 자동차부품
033240|자화전자|Jahwa Electronics|KOSPI|전자부품 · 카메라부품
025540|한국단자|Korea Electric Terminal|KOSPI|자동차 전장부품
005610|SPC삼립|SPC Samlip|KOSPI|음식료 · 베이커리
003220|대원제약|Daewon Pharmaceutical|KOSPI|제약 · 의약품
000670|영풍|Young Poong|KOSPI|비철금속 · 지주회사
001390|KG케미칼|KG Chemical|KOSPI|화학 · 비료
003240|태광산업|Taekwang Industrial|KOSPI|석유화학 · 섬유
002960|한국쉘석유|Hankook Shell Oil|KOSPI|윤활유 · 에너지
000070|삼양홀딩스|Samyang Holdings|KOSPI|지주회사 · 화학 · 식품
145990|삼양사|Samyang Corporation|KOSPI|식품 · 화학
001520|동양|Tongyang|KOSPI|건자재 · 레미콘
005950|이수화학|ISU Chemical|KOSPI|화학 · 정밀화학
457190|이수스페셜티케미컬|ISU Specialty Chemical|KOSPI|특수화학 · 전고체 소재
003030|세아제강지주|SeAH Steel Holdings|KOSPI|철강 · 지주회사
306200|세아제강|SeAH Steel|KOSPI|강관 · 철강
001430|세아베스틸지주|SeAH Besteel Holdings|KOSPI|특수강 · 철강
058650|세아홀딩스|SeAH Holdings|KOSPI|지주회사 · 철강
071840|롯데하이마트|Lotte Himart|KOSPI|가전 유통
025980|아난티|Ananti|KOSDAQ|리조트 · 레저
079430|현대리바트|Hyundai Livart|KOSPI|가구 · 인테리어
003690|코리안리|Korean Re|KOSPI|재보험
002240|고려제강|Kiswire|KOSPI|철강선재 · 소재
001440|대한전선|Taihan Cable & Solution|KOSPI|전선 · 전력 인프라
103140|풍산|Poongsan|KOSPI|비철금속 · 방산
007340|DN오토모티브|DN Automotive|KOSPI|자동차 부품 · 방진제품
105630|한세실업|Hansae|KOSPI|의류 OEM
005180|빙그레|Binggrae|KOSPI|음식료 · 빙과
006040|동원산업|Dongwon Industries|KOSPI|수산 · 식품
049770|동원F&B|Dongwon F&B|KOSPI|음식료 · 가공식품
000850|화천기공|Hwacheon Machine Tool|KOSPI|공작기계
000210|DL|DL Holdings|KOSPI|지주회사 · 화학 · 건설
002990|금호건설|Kumho Engineering & Construction|KOSPI|건설 · 토목
001060|JW중외제약|JW Pharmaceutical|KOSPI|제약 · 수액 · 의약품
096760|JW홀딩스|JW Holdings|KOSPI|제약 지주회사
000640|동아쏘시오홀딩스|Dong-A Socio Holdings|KOSPI|제약 지주회사
170900|동아에스티|Dong-A ST|KOSPI|제약 · 전문의약품
001570|금양|Kumyang|KOSPI|화학 · 2차전지 소재
093370|후성|Foosung|KOSPI|불소화학 · 2차전지 소재
014830|유니드|Unid|KOSPI|화학 · 칼륨계 소재
453340|현대그린푸드|Hyundai Green Food|KOSPI|급식 · 식자재 유통
005440|현대지에프홀딩스|Hyundai G.F. Holdings|KOSPI|지주회사 · 식품유통
079160|CJ CGV|CJ CGV|KOSPI|영화관 · 콘텐츠
122900|아이마켓코리아|iMarketKorea|KOSPI|B2B 유통 · 구매대행
007660|이수페타시스|ISU Petasys|KOSPI|PCB · AI 서버 인프라
033920|무학|Muhak|KOSPI|주류 · 소주
021050|서원|Seowon|KOSPI|비철금속 · 동합금
002070|비비안|Vivien|KOSPI|의류 · 내의
007860|서연|Seoyon|KOSPI|자동차 부품 · 지주회사
001530|DI동일|DI Dongil|KOSPI|섬유 · 알루미늄 소재
003380|하림지주|Harim Holdings|KOSDAQ|지주회사 · 식품
136480|하림|Harim|KOSDAQ|육가공 · 식품
008040|사조동아원|Sajo DongA One|KOSPI|제분 · 사료
014160|대영포장|Daeyoung Packaging|KOSPI|골판지 · 포장재
005360|모나미|Monami|KOSPI|문구 · 소비재
023590|다우기술|Daou Technology|KOSPI|IT서비스 · 핀테크
032190|다우데이타|Daou Data|KOSDAQ|IT 유통 · 결제
002840|미원상사|Miwon Commercial|KOSPI|정밀화학
107590|미원홀딩스|Miwon Holdings|KOSPI|지주회사 · 정밀화학
268280|미원에스씨|Miwon Specialty Chemical|KOSPI|정밀화학 · 전자재료
001720|신영증권|Shinyoung Securities|KOSPI|증권 · 자산관리
016380|KG스틸|KG Steel|KOSPI|철강 · 강판
003470|유안타증권|Yuanta Securities Korea|KOSPI|증권 · 금융투자
001270|부국증권|Bookook Securities|KOSPI|증권 · 금융투자
006220|제주은행|Jeju Bank|KOSPI|은행 · 지역금융
053210|스카이라이프|KT Skylife|KOSPI|방송 · 미디어
058850|KTcs|KTcs|KOSPI|컨택센터 · 고객서비스
058860|KTis|KTis|KOSPI|컨택센터 · 고객서비스
002870|신풍|Shinpoong|KOSPI|제지 · 포장
011390|부산산업|Busan Industrial|KOSPI|레미콘 · 건자재
009450|경동나비엔|KyungDong Navien|KOSPI|보일러 · 친환경 난방
012690|모나리자|Monalisa|KOSPI|생활용품 · 제지
000050|경방|Kyungbang|KOSPI|섬유 · 부동산
006060|화승인더|Hwaseung Industries|KOSPI|신발소재 · 포장재
013890|지누스|Zinus|KOSPI|가구 · 매트리스
004430|송원산업|Songwon Industrial|KOSPI|화학 · 첨가제
011500|한농화성|Hannong Chemicals|KOSPI|정밀화학 · 전고체 소재
025530|SJM홀딩스|SJM Holdings|KOSPI|자동차 부품 · 지주회사
123700|SJM|SJM|KOSPI|자동차 부품
000020|동화약품|Dongwha Pharm|KOSPI|제약 · 일반의약품
002390|한독|Handok|KOSPI|제약 · 전문의약품
000230|일동홀딩스|Ildong Holdings|KOSPI|제약 지주회사
249420|일동제약|Ildong Pharmaceutical|KOSPI|제약 · 신약개발
033270|유나이티드제약|Korea United Pharm|KOSPI|제약 · 개량신약
003960|사조대림|Sajo Daerim|KOSPI|식품 · 수산가공
003300|한일홀딩스|Hanil Holdings|KOSPI|지주회사 · 시멘트
014580|태경비케이|Taekyung BK|KOSPI|석회 · 소재
004980|성신양회|Sungshin Cement|KOSPI|시멘트 · 건자재
300720|한일시멘트|Hanil Cement|KOSPI|시멘트 · 건자재
027410|BGF|BGF|KOSPI|지주회사 · 편의점
282330|BGF리테일|BGF Retail|KOSPI|편의점 · 유통
001780|알루코|Aluko|KOSPI|알루미늄 · 소재
001210|금호전기|Kumho Electric|KOSPI|조명 · 전자부품
003570|SNT다이내믹스|SNT Dynamics|KOSPI|방산 · 자동차부품
064960|SNT모티브|SNT Motiv|KOSPI|자동차부품 · 방산
100840|SNT에너지|SNT Energy|KOSPI|발전설비 · 열교환기
071970|HD현대마린엔진|HD Hyundai Marine Engine|KOSPI|선박엔진 · 조선기자재
036530|SNT홀딩스|SNT Holdings|KOSPI|지주회사 · 산업재
005500|삼진제약|Samjin Pharmaceutical|KOSPI|제약 · 의약품
058430|포스코스틸리온|POSCO Steeleon|KOSPI|철강 · 표면처리강판
001340|백광산업|Baekkwang Industrial|KOSPI|화학 · 소재
001470|삼부토건|Sambu Construction|KOSPI|건설 · 토목
007280|한국특강|Korea Steel Shapes|KOSPI|철강 · 특수강
004560|현대비앤지스틸|Hyundai BNG Steel|KOSPI|스테인리스강 · 철강
005010|휴스틸|Husteel|KOSPI|강관 · 철강
100250|진양홀딩스|Chinyang Holdings|KOSPI|지주회사 · 화학
009410|태영건설|Taeyoung Engineering & Construction|KOSPI|건설 · 환경
009440|KC그린홀딩스|KC Green Holdings|KOSPI|환경설비 · 지주회사
029460|케이씨|KC|KOSPI|반도체 장비 · 가스공급
281820|케이씨텍|KC Tech|KOSPI|반도체 장비 · 소재
282690|동아타이어|Dong Ah Tire|KOSPI|타이어 · 자동차부품
030610|교보증권|Kyobo Securities|KOSPI|증권 · 금융투자
001200|유진투자증권|Eugene Investment & Securities|KOSPI|증권 · 금융투자
003460|유화증권|Yuhwa Securities|KOSPI|증권 · 금융투자
001750|한양증권|Hanyang Securities|KOSPI|증권 · 금융투자
001500|현대차증권|Hyundai Motor Securities|KOSPI|증권 · 금융투자
001940|KISCO홀딩스|KISCO Holdings|KOSPI|지주회사 · 철강
104700|한국철강|KISCO Corp|KOSPI|철강 · 봉형강
002220|한일철강|Hanil Iron & Steel|KOSPI|철강 · 유통
004890|동일산업|Dongil Industries|KOSPI|철강 · 합금철
120110|코오롱인더|Kolon Industries|KOSPI|산업소재 · 화학
002020|코오롱|Kolon|KOSPI|지주회사 · 화학
003070|코오롱글로벌|Kolon Global|KOSPI|건설 · 상사
003620|KG모빌리티|KG Mobility|KOSPI|자동차 · SUV
010690|화신|Hwashin|KOSPI|자동차 부품
090080|평화산업|Pyung Hwa Industrial|KOSPI|자동차 부품
012280|영화금속|Yeonghwa Metal|KOSPI|자동차 부품 · 주물
023800|인지컨트롤스|Inzi Controls|KOSPI|자동차 부품 · 열관리
020000|한섬|Handsme|KOSPI|패션 · 의류
007980|태평양물산|Pan-Pacific|KOSPI|의류 OEM
103590|일진전기|Iljin Electric|KOSPI|전선 · 전력기기
003610|방림|Banglim|KOSPI|섬유 · 직물
002700|신일전자|Shinil Electronics|KOSPI|생활가전
011230|삼화전자|Samwha Electronics|KOSPI|전자부품 · 페라이트
001820|삼화콘덴서|Samwha Capacitor|KOSPI|전자부품 · 콘덴서
009470|삼화전기|Samwha Electric|KOSPI|전자부품 · 콘덴서
006110|삼아알미늄|Sama Aluminium|KOSPI|알루미늄박 · 포장재
002710|TCC스틸|TCC Steel|KOSPI|철강 · 표면처리강판
009190|대양금속|Dae Yang Metal|KOSPI|스테인리스 · 소재
023450|동남합성|Dongnam Chemical|KOSPI|계면활성제 · 화학
014910|성문전자|Sungmoon Electronics|KOSPI|전자부품 · 필름콘덴서
004410|서울식품|Seoul Food Industrial|KOSPI|식품 · 제빵
001420|태원물산|Taewon Mulsan|KOSPI|자동차 부품 · 석고
006340|대원전선|Daewon Cable|KOSPI|전선 · 전력 인프라
006740|영풍제지|Young Poong Paper|KOSPI|제지 · 골판지
003120|일성신약|Ilsung Pharmaceuticals|KOSPI|제약 · 의약품
009290|광동제약|Kwangdong Pharmaceutical|KOSPI|제약 · 음료
000220|유유제약|Yuyu Pharma|KOSPI|제약 · 의약품
002720|국제약품|Kukje Pharma|KOSPI|제약 · 의약품
008490|서흥|Suheung|KOSPI|캡슐 · 건강기능식품
002210|동성제약|Dongsung Pharmaceutical|KOSPI|제약 · 화장품
003280|흥아해운|Heung-A Shipping|KOSPI|해운 · 물류
005880|대한해운|Korea Line|KOSPI|해운 · 벌크선
047400|유니온머티리얼|Union Materials|KOSPI|세라믹 · 희토류 소재
120030|조선선재|Chosun Welding|KOSPI|용접재료 · 산업소재
001560|제일연마|Cheil Grinding Wheel|KOSPI|연마재 · 산업소재
006890|태경케미컬|Taekyung Chemical|KOSPI|탄산가스 · 화학
001070|대한방직|Taihan Textile|KOSPI|섬유 · 방직
014280|금강공업|Kumkang Kind|KOSPI|건설자재 · 폼워크
000970|한국주철관|Korea Cast Iron Pipe|KOSPI|상하수도관 · 건자재
002460|화성산업|Hwasung Industrial|KOSPI|건설 · 주택
002410|범양건영|Bumyang Construction|KOSPI|건설 · 토목
009160|SIMPAC|SIMPAC|KOSPI|프레스 · 산업기계
001260|남광토건|Namkwang Engineering|KOSPI|건설 · 토목
007570|일양약품|Ilyang Pharmaceutical|KOSPI|제약 · 의약품
008730|율촌화학|Yulchon Chemical|KOSPI|포장재 · 필름
008250|이건산업|Eagon Industrial|KOSPI|목재 · 건자재
014990|인디에프|In The F|KOSPI|패션 · 의류
003650|미창석유|Michang Oil|KOSPI|윤활유 · 화학
005720|넥센|Nexen|KOSPI|지주회사 · 타이어
017940|E1|E1|KOSPI|LPG · 에너지
093240|형지엘리트|Hyungji Elite|KOSPI|의류 · 학생복
004140|동방|Dongbang Transport Logistics|KOSPI|물류 · 항만하역
001790|대한제당|TS Corporation|KOSPI|식품 · 사료
011930|신성이엔지|Shinsung E&G|KOSPI|클린룸 · 태양광
034120|SBS|SBS|KOSPI|방송 · 미디어
084010|대한제강|Daehan Steel|KOSPI|철강 · 철근
035150|백산|Baiksan|KOSPI|합성피혁 · 소재
014130|한익스프레스|Han Express|KOSPI|물류 · 운송
011810|STX|STX|KOSPI|상사 · 물류
077970|STX엔진|STX Engine|KOSPI|선박엔진 · 방산
007460|에이프로젠|Aprogen|KOSPI|바이오 · 의약품
003160|디아이|DI Corporation|KOSPI|반도체 검사장비
007110|일신석재|Ilshin Stone|KOSPI|건자재 · 석재
003480|한진중공업홀딩스|HJ Shipbuilding Holdings|KOSPI|지주회사 · 에너지
000700|유수홀딩스|Eusu Holdings|KOSPI|물류 · 지주회사
005870|휴니드|Huneed Technologies|KOSPI|방산 · 통신장비
012170|아센디오|Ascendio|KOSPI|콘텐츠 · 엔터테인먼트
016090|대현|Daehyun|KOSPI|패션 · 의류
025860|남해화학|Namhae Chemical|KOSPI|비료 · 화학
004830|덕성|Duksung|KOSPI|합성피혁 · 소재
024070|WISCOM|WISCOM|KOSPI|플라스틱 · 소재
002170|삼양통상|Samyang Tongsang|KOSPI|피혁 · 소재
000760|이화산업|RIFA Industrial|KOSPI|염료 · 화학
001250|GS글로벌|GS Global|KOSPI|상사 · 에너지
009180|한솔로지스틱스|Hansol Logistics|KOSPI|물류 · 운송
004910|조광페인트|Chokwang Paint|KOSPI|페인트 · 화학
003200|일신방직|Ilshin Spinning|KOSPI|섬유 · 방직
003830|대한화섬|Daehan Synthetic Fiber|KOSPI|화학섬유 · 소재
014440|영보화학|Youngbo Chemical|KOSPI|화학 · 포장소재
009460|한창제지|Hanchang Paper|KOSPI|제지 · 포장재
004060|SG세계물산|SG Global|KOSPI|의류 · 패션
003060|에이프로젠바이오로직스|Aprogen Biologics|KOSPI|바이오 · 의약품
025560|미래산업|Mirae Corporation|KOSPI|반도체 장비
013000|세우글로벌|Sewoo Global|KOSPI|플라스틱 · 소재
011280|태림포장|Tailim Packaging|KOSPI|골판지 · 포장재
010420|한솔PNS|Hansol PNS|KOSPI|IT서비스 · 제지유통
025750|한솔홈데코|Hansol Home Deco|KOSPI|건자재 · 인테리어
008260|NI스틸|NI Steel|KOSPI|철강 · 건자재
001460|BYC|BYC|KOSPI|의류 · 내의
008110|대동전자|Daedong Electronics|KOSPI|전자부품
008870|금비|Kumbi|KOSPI|유리병 · 포장재
009070|KCTC|KCTC|KOSPI|물류 · 운송
007690|국도화학|Kukdo Chemical|KOSPI|에폭시 · 화학
002760|보락|Boram|KOSPI|식품첨가물 · 원료의약품
003920|남양유업|Namyang Dairy Products|KOSPI|유제품 · 음식료
002600|조흥|Choheung|KOSPI|식품 · 소재
009140|경인전자|Kyungin Electronics|KOSPI|전자부품 · 스위치
001630|종근당홀딩스|Chong Kun Dang Holdings|KOSPI|제약 지주회사
185750|종근당|Chong Kun Dang|KOSPI|제약 · 전문의약품
063160|종근당바이오|Chong Kun Dang Bio|KOSPI|바이오 · 원료의약품
004080|신흥|Shinhung|KOSPI|치과 의료기기
001620|케이비아이동국실업|KBI Dongkook Ind|KOSPI|자동차 부품
002310|아세아제지|Asia Paper|KOSPI|제지 · 골판지
008700|아남전자|Anam Electronics|KOSPI|전자제품 · 오디오
010580|에스엠벡셀|SM Bexel|KOSPI|자동차부품 · 배터리
005820|원림|Wonlim|KOSPI|포장재 · 산업재
016800|퍼시스|Fursys|KOSPI|사무가구
029530|신도리코|Sindoh|KOSPI|사무기기 · 프린터
023960|에쓰씨엔지니어링|SC Engineering|KOSPI|플랜트 · 엔지니어링
002100|경농|Kyung Nong|KOSPI|농약 · 농자재
004540|깨끗한나라|KleanNara|KOSPI|제지 · 생활용품
013520|화승코퍼레이션|Hwaseung Corporation|KOSPI|자동차 부품 · 고무
016580|환인제약|Whan In Pharm|KOSPI|제약 · 정신신경계
005690|파미셀|Pharmicell|KOSPI|바이오 · 줄기세포
002150|도화엔지니어링|Dohwa Engineering|KOSPI|엔지니어링 · 인프라
039130|하나투어|Hanatour Service|KOSPI|여행 · 레저
028100|동아지질|Dong-Ah Geological Engineering|KOSPI|건설 · 지반공사
002630|오리엔트바이오|Orient Bio|KOSPI|바이오 · 실험동물
084650|랩지노믹스|LabGenomics|KOSDAQ|진단기술 · 바이오
061250|화일약품|Hwail Pharmaceutical|KOSDAQ|원료의약품 · 제약
115450|HLB테라퓨틱스|HLB Therapeutics|KOSDAQ|바이오 · 신약개발
298380|에이비엘바이오|ABL Bio|KOSDAQ|바이오 · 항체치료제
067390|아스트|ASTK|KOSDAQ|항공부품 · 제조
036620|감성코퍼레이션|Gamsung Corporation|KOSDAQ|패션 · 라이프스타일
054950|제이브이엠|JVM|KOSDAQ|약국자동화 · 의료기기
`;

export const additionalKoreaCompanySeeds = parseCompanySeedRows(rawCompanySeedRows);
