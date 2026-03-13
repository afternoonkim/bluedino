import Script from "next/script";
import type { Metadata } from "next";
import FireCalculatorClient from "./FireCalculatorClient";

export const metadata: Metadata = {
  title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
  description:
    "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  keywords: ["FIRE 계산기",
    "경제적 자유 계산기",
    "조기 은퇴 계산기",
    "early retirement calculator",
    "은퇴 자금 계산",
    "BlueDino"],
  alternates: {
    canonical: "/cal/fire",
  },
  openGraph: {
    title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
    description:
      "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
    url: "https://bluedino.kr/cal/fire",
    siteName: "BlueDino",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIRE 계산기 | 경제적 자유 은퇴 계산 | BlueDino",
    description:
      "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FIRE 계산기",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "FIRE 목표 자산과 저축 계획을 입력하면 경제적 자유 달성 시점을 계산할 수 있는 FIRE 계산기입니다. 조기 은퇴 계획과 장기 자산 설계에 활용할 수 있습니다.",
  url: "https://bluedino.kr/cal/fire",
};

export default function Page() {
  return (
    <>
      <Script
        id="FIRE-계산기-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FireCalculatorClient />
    </>
  );
}
