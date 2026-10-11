import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpotlightCompanyPage from "@/components/company-analysis/SpotlightCompanyPage";
import { getSpotlightCompany, spotlightCompanies } from "@/lib/company-analysis/spotlightCompanies";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return spotlightCompanies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getSpotlightCompany(slug);

  if (!company) {
    return { title: "기업분석 | BlueDino" };
  }

  const title = `${company.companyNameKo}(${company.ticker}) 주가 전망과 기업분석 | BlueDino`;
  const description = `${company.companyNameKo}의 ${company.sector} 사업 구조, 최근 변화, 실적 체크포인트와 리스크를 2026년 10월 기준으로 정리했습니다.`;

  return {
    title,
    description,
    keywords: [
      `${company.companyNameKo} 주가`,
      `${company.companyNameKo} 주가 전망`,
      `${company.companyNameKo} 기업분석`,
      company.ticker,
      company.sector,
    ],
    alternates: { canonical: `/company-analysis/spotlight/${company.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function SpotlightDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = getSpotlightCompany(slug);

  if (!company) {
    notFound();
  }

  return <SpotlightCompanyPage company={company} />;
}
