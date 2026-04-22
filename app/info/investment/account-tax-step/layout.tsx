import type { Metadata } from "next";
import type { ReactNode } from "react";

const canonicalPath = "/info/investment/account-tax-step";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "절세계좌 활용순서 | BlueDino";
const pageDescription =
  "연금저축, IRP, ISA를 어떤 순서로 활용해야 세액공제와 세후 수익 관리를 체계적으로 챙길 수 있는지 일반적인 우선순위 기준으로 정리한 BlueDino 절세 가이드입니다.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function AccountTaxStepLayout({ children }: { children: ReactNode }) {
  return children;
}
