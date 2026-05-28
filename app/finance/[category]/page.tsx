import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import AdFitAd from "@/components/ad/AdFitAd";
import FinanceQuestionList from "@/components/finance/FinanceQuestionList";
import { financeCategories, getFinanceCategory } from "@/lib/finance/config";
import { getQuestionsByCategory } from "@/lib/finance/data";
import { getFinanceEntry } from "@/lib/finance/content";
import { isIndexableFinanceEntry } from "@/lib/finance/indexing";
import type { FinanceCategoryKey } from "@/lib/finance/types";

type PageProps = { params: Promise<{ category: string }> };

type CategorySeo = {
  whyMatters: string;
  searchIntents: string[];
  whoNeedsThis: string[];
  helpers: { label: string; href: string }[];
  related: FinanceCategoryKey[];
  outboundReference: string;
};

const CATEGORY_SEO: Record<FinanceCategoryKey, CategorySeo> = {
  isa: {
    whyMatters:
      "ISA 계좌(개인종합자산관리계좌)는 한 계좌 안에서 예금·펀드·국내 ETF·국내 상장 해외 ETF를 함께 운용하면서 비과세·분리과세 혜택을 받을 수 있는 절세계좌입니다. 다만 가입 유형, 납입 한도, 만기, 손익통산, 인출 규칙이 일반 증권 계좌와 다르기 때문에 처음 ISA를 알아볼 때는 \"가입할까\"보다 \"어떤 자금을 어떤 유형으로 굴릴까\"가 더 중요한 질문이 됩니다.",
    searchIntents: [
      "ISA 가입 조건과 일반형·서민형 차이가 헷갈릴 때",
      "ISA 비과세 한도와 초과분 9.9% 분리과세가 정확히 어떻게 적용되는지 확인하고 싶을 때",
      "ISA 만기 후 연금계좌 이체 전환 한도 3,000만 원이 어떻게 작동하는지 알아보고 싶을 때",
      "ISA로 ETF·국내 상장 해외 ETF 투자할 때 세금 차이를 비교하고 싶을 때",
    ],
    whoNeedsThis: [
      "예적금만 쓰다가 처음 절세계좌를 만들어보려는 직장인",
      "ETF 투자를 시작했는데 일반 계좌와 ISA 중 어디에 담을지 고민 중인 사람",
      "ISA 만기를 앞두고 연금계좌로 옮길지, 그대로 운용할지 결정해야 하는 사람",
    ],
    helpers: [
      { label: "복리 계산기", href: "/cal/compound" },
      { label: "배당 계산기", href: "/cal/calculator" },
      { label: "ISA 기초 가이드", href: "/info/guide/isa-basics" },
      { label: "ISA 절세 효과 가이드", href: "/info/guide/isa-benefits" },
    ],
    related: ["irp", "pension"],
    outboundReference:
      "공식 자료는 금융투자협회와 각 증권사 ISA 페이지, 국세청 홈택스의 절세계좌 안내에서 최신 한도와 세율을 확인하실 수 있습니다.",
  },
  irp: {
    whyMatters:
      "IRP(개인형 퇴직연금)는 연말정산 세액공제와 노후 인출까지 같이 보고 운용해야 하는 장기 절세계좌입니다. 같은 1,000만 원을 IRP에 넣었느냐, 일반 계좌에 넣었느냐만으로도 5~15년 뒤 세후 자산이 크게 달라지기 때문에, 연봉별 세액공제 한도와 인출 시 연금소득세·기타소득세 차이를 함께 이해하는 것이 먼저 볼 지점입니다.",
    searchIntents: [
      "IRP 세액공제 한도 900만 원과 연봉별 환급액이 정확히 얼마인지 확인하고 싶을 때",
      "IRP에 어떤 ETF를 담을 수 있는지, 위험자산 70% 한도가 어떻게 적용되는지 알아볼 때",
      "퇴직금을 IRP로 받을 때와 일시 수령할 때 세금 차이가 궁금할 때",
      "IRP 중도해지 시 기타소득세 16.5%가 어떻게 부과되는지 확인이 필요할 때",
    ],
    whoNeedsThis: [
      "연말정산 환급을 늘리면서 동시에 장기 자산을 키우고 싶은 직장인",
      "퇴직금이 발생했거나 곧 발생할 예정이라 IRP 활용을 고민하는 사람",
      "연금저축 + IRP 둘 다 들어야 하는지, 한쪽만 채워도 되는지 헷갈리는 사람",
    ],
    helpers: [
      { label: "퇴직소득세 계산기", href: "/cal/retirement-tax" },
      { label: "FIRE 계산기", href: "/cal/fire" },
      { label: "연금저축 vs IRP 가이드", href: "/info/guide/pension-vs-irp" },
      { label: "절세계좌 활용순서", href: "/info/investment/account-tax-step" },
    ],
    related: ["pension", "isa"],
    outboundReference:
      "공식 자료는 고용노동부 퇴직연금 사이트와 금융감독원 통합연금포털, 국세청 홈택스 연금계좌 안내에서 최신 세제와 운용 규정을 확인하실 수 있습니다.",
  },
  pension: {
    whyMatters:
      "연금저축계좌는 세액공제 한도와 인출 시점, 운용 방식에 따라 실제 세후 수익률이 크게 달라지는 장기 절세계좌입니다. 처음 가입할 때는 단순히 \"세액공제 받으려고\" 시작하지만, 5년·10년이 지나면 어떤 ETF로 굴렸는지, 만 55세 이후 연금 수령 vs 일시 수령을 어떻게 선택했는지에 따라 손에 들어오는 돈이 달라집니다.",
    searchIntents: [
      "연금저축 세액공제 한도 600만 원과 연봉 5,500만 원 기준 환급액이 궁금할 때",
      "연금저축펀드와 연금저축보험 중 어떤 게 장기적으로 유리한지 비교하고 싶을 때",
      "연금저축으로 ETF·해외 ETF에 투자할 때의 차이가 헷갈릴 때",
      "연금저축 중도해지 vs 만 55세 이후 수령 시 세금 차이를 확인하고 싶을 때",
    ],
    whoNeedsThis: [
      "이제 막 연금저축을 시작하면서 세액공제와 장기 운용을 함께 보고 싶은 사람",
      "기존 연금저축보험에서 연금저축펀드로 갈아타려는 사람",
      "10년 이상 운용한 연금저축의 인출 전략을 미리 설계하고 싶은 사람",
    ],
    helpers: [
      { label: "복리 계산기", href: "/cal/compound" },
      { label: "퇴직소득세 계산기", href: "/cal/retirement-tax" },
      { label: "연금저축과 IRP 차이 가이드", href: "/info/guide/pension-vs-irp" },
      { label: "연금저축 활용 가이드", href: "/info/guide/pension" },
    ],
    related: ["irp", "isa"],
    outboundReference:
      "공식 자료는 금융감독원 통합연금포털과 국세청 홈택스 연금계좌 안내에서 최신 세액공제 한도와 인출 시 세율을 확인하실 수 있습니다.",
  },
  cma: {
    whyMatters:
      "CMA(종합자산관리계좌)는 일반 입출금 통장보다 높은 이자(보통 RP형 기준 연 3% 안팎)를 주는 증권사 현금성 계좌입니다. 비상금·생활비·투자 대기자금처럼 짧게 굴리는 돈을 묶어두기 좋은데, RP형·MMF형·발행어음형의 차이와 예금자보호 적용 여부, 영업일 기준 이자 지급 방식을 모르고 시작하면 기대만큼 이자가 안 들어왔다고 느끼기 쉽습니다.",
    searchIntents: [
      "CMA 금리가 실제로 얼마인지, 세후 이자는 얼마나 되는지 확인하고 싶을 때",
      "CMA RP형·MMF형·발행어음형 차이가 헷갈릴 때",
      "CMA 예금자보호 적용 여부와 안전성을 확인하고 싶을 때",
      "CMA와 파킹통장 중 어느 쪽이 내 자금에 더 잘 맞는지 비교하고 싶을 때",
    ],
    whoNeedsThis: [
      "월급통장 외에 비상금·여유자금을 굴릴 곳을 찾는 사람",
      "주식·ETF 매수 대기 자금을 잠깐 묶어두고 싶은 투자자",
      "예적금 만기 후 다음 상품 결정 전까지 단기로 자금을 보관하려는 사람",
    ],
    helpers: [
      { label: "복리 계산기", href: "/cal/compound" },
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
      { label: "파킹통장 질문 가이드", href: "/finance/parking" },
    ],
    related: ["parking", "isa"],
    outboundReference:
      "공식 자료는 예금보험공사와 금융감독원 금융상품통합비교공시(금융정보원), 각 증권사 CMA 페이지의 최신 금리 공시를 함께 확인해주세요.",
  },
  parking: {
    whyMatters:
      "파킹통장은 단기 보관 자금에 매일 이자를 붙여주는 입출금 자유 통장입니다. 한도, 우대조건, 이자 지급 주기가 은행별로 크게 다르기 때문에 \"금리가 4%다\"는 광고만 보고 결정하면 실제 받는 이자가 기대보다 적게 느껴질 수 있습니다. 파킹통장은 비상금과 생활비, 투자 대기자금을 어디까지 담을지 정한 다음 한도와 우대조건을 같이 보는 것이 현실적입니다.",
    searchIntents: [
      "파킹통장 금리 비교, 한도별 우대 금리가 어떻게 다른지 확인하고 싶을 때",
      "파킹통장 이자가 매일 붙는지, 월별로 정산되는지 차이가 궁금할 때",
      "파킹통장과 CMA 중 어느 쪽이 내 비상금에 더 잘 맞는지 비교하고 싶을 때",
      "파킹통장 예금자보호 5,000만 원 한도가 어떻게 적용되는지 확인할 때",
    ],
    whoNeedsThis: [
      "월급 외 자금을 한 곳에 모아 비상금처럼 관리하려는 사람",
      "투자 대기자금이나 단기 목적 자금을 안전하게 굴리고 싶은 사람",
      "예적금 가입을 미루고 있는 동안 자금을 잠깐 보관하려는 사람",
    ],
    helpers: [
      { label: "복리 계산기", href: "/cal/compound" },
      { label: "CMA 질문 가이드", href: "/finance/cma" },
    ],
    related: ["cma", "isa"],
    outboundReference:
      "공식 자료는 예금보험공사 예금자보호 안내와 각 은행의 파킹통장 상품 설명서, 금융감독원 금융상품통합비교공시에서 최신 금리와 우대조건을 확인하실 수 있습니다.",
  },
  "loan-basics": {
    whyMatters:
      "대출은 금리만 비교해서 결정하면 실제 총비용이 기대와 달라지는 경우가 많습니다. 같은 1억 원을 빌려도 금리·기간·상환 방식·중도상환수수료·신용 영향까지 함께 보면 5년 후 남는 돈이 수백만 원 단위로 차이가 납니다. 대출기초 가이드는 처음 대출을 알아보거나 갈아타기를 고민하는 분이 \"무엇을 보고 결정해야 하는지\" 흐름부터 잡을 수 있도록 비교할 수 있게 구성했습니다.",
    searchIntents: [
      "대출 한도가 어떻게 정해지는지, DSR·LTV가 뭔지 처음 알아볼 때",
      "원리금균등·원금균등·만기일시 상환 방식 차이가 헷갈릴 때",
      "중도상환수수료가 어떻게 부과되고 언제 면제되는지 확인하고 싶을 때",
      "대출이 신용점수에 어떤 영향을 주는지 궁금할 때",
    ],
    whoNeedsThis: [
      "처음으로 신용대출이나 주담대를 알아보는 사회 초년생·신혼부부",
      "기존 대출을 갈아타거나 통합하려는 직장인",
      "대출 한도와 월 상환액을 미리 점검해 자금 계획을 세우려는 사람",
    ],
    helpers: [
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "LTV 계산기", href: "/cal/ltv" },
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
      { label: "주담대 계산기", href: "/cal/mortgage" },
    ],
    related: ["credit-loan", "mortgage-loan"],
    outboundReference:
      "공식 자료는 금융감독원 금융상품통합비교공시와 각 은행의 대출상품 설명서, 한국주택금융공사·KB국민은행 등의 LTV·DSR 안내에서 최신 한도와 규제를 확인하실 수 있습니다.",
  },
  "credit-loan": {
    whyMatters:
      "신용대출은 한도와 금리가 신용점수·연소득·기존 부채에 따라 크게 달라지고, 마이너스통장과 거치형 신용대출은 이자 부과 방식이 달라 \"같은 한도\"라도 실제 부담이 다릅니다. 또 1금융권·2금융권 사이에 1회 이용해도 신용점수에 영향이 가기 때문에, 처음 받기 전·갈아타기 전에 비교 흐름을 한 번 정리해두면 실수 확률이 줄어듭니다.",
    searchIntents: [
      "신용대출 한도와 금리가 어떻게 정해지는지 처음 알아볼 때",
      "마이너스통장과 일반 신용대출 중 어떤 게 더 유리한지 비교할 때",
      "DSR 규제로 신용대출 한도가 어떻게 묶이는지 확인하고 싶을 때",
      "기존 신용대출을 더 낮은 금리로 갈아타는 절차가 궁금할 때",
    ],
    whoNeedsThis: [
      "처음 신용대출을 알아보는 사회 초년생·이직 준비자",
      "기존 신용대출 금리가 부담스러워 갈아타기를 고민하는 사람",
      "전세자금·생활자금 등 단기 자금이 필요한 직장인",
    ],
    helpers: [
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "연봉 실수령액 계산기", href: "/cal/salary-net" },
    ],
    related: ["loan-basics", "mortgage-loan"],
    outboundReference:
      "공식 자료는 금융감독원 금융상품통합비교공시(신용대출 항목)와 각 은행의 신용대출 상품 설명서, 한국신용정보원 신용점수 안내에서 최신 금리와 심사 기준을 확인하실 수 있습니다.",
  },
  "mortgage-loan": {
    whyMatters:
      "주담대(주택담보대출)는 LTV·DSR·기간·금리·상환 방식·중도상환수수료가 모두 맞물려 있어, 단순히 금리 0.1%p 차이만 보면 실제 총비용을 잘못 판단하기 쉽습니다. 같은 4억 원을 빌려도 30년 vs 40년, 원리금균등 vs 원금균등, 고정금리 vs 변동금리, 중도상환수수료 면제 시점이 어떻게 다른지에 따라 \"내가 매월 부담해야 하는 돈\"과 \"5년 후 갈아타기 가능 여부\"가 크게 달라집니다.",
    searchIntents: [
      "주택가격에서 LTV·DSR이 한도를 어떻게 묶는지 처음 알아볼 때",
      "원리금균등 vs 원금균등 vs 체증식 상환방식 차이가 궁금할 때",
      "고정금리·변동금리·혼합형(5년 고정+변동) 중 어느 쪽이 유리한지 비교하고 싶을 때",
      "기존 주담대를 더 낮은 금리로 갈아타는 절차와 중도상환수수료를 확인하고 싶을 때",
    ],
    whoNeedsThis: [
      "처음 내 집 마련을 준비하면서 주담대 한도와 월 상환을 점검하려는 사람",
      "기존 주담대 금리 부담으로 갈아타기(대환)를 고민하는 사람",
      "보금자리론·디딤돌·특례보금자리·시중은행 상품 중 어떤 걸 선택할지 비교하려는 사람",
    ],
    helpers: [
      { label: "주담대 계산기", href: "/cal/mortgage" },
      { label: "LTV 계산기", href: "/cal/ltv" },
      { label: "DSR 계산기", href: "/cal/dsr" },
      { label: "대출이자 계산기", href: "/cal/loan-interest" },
    ],
    related: ["loan-basics", "credit-loan"],
    outboundReference:
      "공식 자료는 한국주택금융공사(보금자리론·디딤돌대출 안내), 금융감독원 금융상품통합비교공시(주택담보대출 항목), 각 은행 주담대 상품 설명서에서 최신 한도와 금리, 우대조건을 확인하실 수 있습니다.",
  },
};

const RELATED_LABEL: Record<FinanceCategoryKey, string> = {
  isa: "ISA 질문 가이드",
  irp: "IRP 질문 가이드",
  pension: "연금저축 질문 가이드",
  cma: "CMA 질문 가이드",
  parking: "파킹통장 질문 가이드",
  "loan-basics": "대출기초 질문 가이드",
  "credit-loan": "신용대출 질문 가이드",
  "mortgage-loan": "주담대 질문 가이드",
};

export async function generateStaticParams() {
  return financeCategories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = getFinanceCategory(decodeURIComponent(rawCategory));
  if (!category) {
    return { title: "금융 가이드 | BlueDino" };
  }
  const fullTitle = `${category.shortTitle} 질문 가이드 | BlueDino`;
  const url = `https://bluedino.kr${category.basePath}`;
  return {
    title: fullTitle,
    description: category.description,
    alternates: { canonical: category.basePath },
    openGraph: {
      title: fullTitle,
      description: category.description,
      url,
      siteName: "BlueDino",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: category.description,
    },
  };
}

export default async function FinanceCategoryPage({ params }: PageProps) {
  const { category: rawCategory } = await params;
  const categoryKey = decodeURIComponent(rawCategory);
  const category = getFinanceCategory(categoryKey);

  if (!category) notFound();

  if (category.status !== "live") {
    return (
      <div className="bd-page">
        <div className="bd-container-narrow bd-section">
          <section className="bd-card bd-card-padding">
            <span className="bd-badge">추가 안내가 필요한 주제</span>
            <h1 className="bd-title-lg mt-4">{category.title}</h1>
            <p className="bd-text-main mt-4">{category.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/finance" className="bd-button-primary">금융 가이드 메인으로</Link>
              <Link href="/info/guide" className="bd-button-secondary">투자 기초 가이드 보기</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const rawQuestions = getQuestionsByCategory(category.key as FinanceCategoryKey);
  const questions = rawQuestions
    .map((question) => ({ question, indexable: isIndexableFinanceEntry(getFinanceEntry(category.key as FinanceCategoryKey, question.slug)) }))
    .sort((a, b) => Number(b.indexable) - Number(a.indexable) || (b.question.searchPriority ?? 0) - (a.question.searchPriority ?? 0))
    .map((item) => item.question);
  const featured = questions.slice(0, 6);
  const seo = CATEGORY_SEO[category.key as FinanceCategoryKey];
  const baseUrl = `https://bluedino.kr${category.basePath}`;

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.shortTitle} 질문 가이드`,
    description: category.description,
    url: baseUrl,
    inLanguage: "ko-KR",
    isPartOf: { "@type": "WebSite", name: "BlueDino", url: "https://bluedino.kr" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: questions.length,
      itemListElement: questions.slice(0, 30).map((q, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${baseUrl}/${encodeURIComponent(q.slug)}`,
        name: q.question,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BlueDino", item: "https://bluedino.kr" },
      { "@type": "ListItem", position: 2, name: "금융 가이드", item: "https://bluedino.kr/finance" },
      { "@type": "ListItem", position: 3, name: category.shortTitle, item: baseUrl },
    ],
  };

  return (
    <div className="bd-page">
      <Script
        id={`finance-${category.key}-collection-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Script
        id={`finance-${category.key}-breadcrumb-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="bd-container bd-section">
        <section className="bd-card bd-card-padding">
          <span className="bd-badge">{category.badge}</span>
          <h1 className="bd-title-xl mt-4">{category.title}</h1>
          <p className="bd-text-main mt-4">{category.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">질문 {questions.length}개</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">초보자 질문 정리</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">관련 계산기 연결</span>
          </div>
        </section>

        {seo && (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">{category.shortTitle}을(를) 처음 알아보는 분에게</h2>
            <p className="bd-text-main mt-4">{seo.whyMatters}</p>
          </section>
        )}

        {featured.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">먼저 많이 보는 질문</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {featured.map((item) => (
                <Link
                  key={item.slug}
                  href={`${category.basePath}/${encodeURIComponent(item.slug)}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-500/30 hover:bg-slate-900"
                >
                  {item.question}
                </Link>
              ))}
            </div>
          </section>
        )}

        {seo && seo.searchIntents.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{category.shortTitle} 관련해서 자주 검색하는 질문 흐름</h2>
            <div className="bd-list mt-5">
              {seo.searchIntents.map((intent) => (
                <div key={intent} className="bd-list-item">{intent}</div>
              ))}
            </div>
            <p className="bd-text-sub mt-5">
              비슷한 질문이 많아 보일 때는 본인 상황과 가장 가까운 항목부터 읽어보세요. 세금, 금리, 한도처럼 결과를 바꾸는 조건을 먼저 고르면 탐색 시간이 줄어듭니다.
            </p>
          </section>
        )}

        <AdFitAd variant="middle" label="본문 중간 광고 영역" className="rounded-2xl border border-white/5 bg-slate-950/20 py-4" />

        <FinanceQuestionList questions={questions} basePath={category.basePath} />

        {seo && (
          <section className="bd-card bd-card-padding">
            <h2 className="bd-title-md">이런 상황이라면 먼저 읽어보세요</h2>
            <div className="bd-list mt-5">
              {seo.whoNeedsThis.map((who) => (
                <div key={who} className="bd-list-item">{who}</div>
              ))}
            </div>
          </section>
        )}

        {seo && seo.helpers.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">{category.shortTitle} 질문과 같이 보면 좋은 페이지</h2>
            <p className="bd-text-main mt-4">
              개념을 읽은 뒤에는 본인 금액과 기간을 직접 넣어보세요. 숫자로 비교하면 어떤 조건이 결과를 바꾸는지 더 빠르게 볼 수 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {seo.helpers.map((helper) => (
                <Link key={helper.href} href={helper.href} className="bd-button-secondary">
                  {helper.label}
                </Link>
              ))}
              <Link href="/finance" className="bd-button-primary">
                금융 가이드 메인
              </Link>
            </div>
          </section>
        )}

        {seo && seo.related.length > 0 && (
          <section className="bd-card-soft bd-card-padding">
            <h2 className="bd-title-md">같은 고민에서 이어지는 카테고리</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {seo.related.map((relKey) => {
                const rel = financeCategories.find((c) => c.key === relKey);
                if (!rel) return null;
                return (
                  <Link key={relKey} href={rel.basePath} className="bd-button-secondary">
                    {RELATED_LABEL[relKey]}
                  </Link>
                );
              })}
            </div>
            <p className="bd-text-sub mt-5">{seo.outboundReference}</p>
          </section>
        )}
      </div>
    </div>
  );
}
