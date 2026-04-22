import type { Metadata } from "next";
import type { ReactNode } from "react";

const canonicalPath = "/info/investment/account-tax";
const pageUrl = `https://bluedino.kr${canonicalPath}`;
const pageTitle = "계좌별 세금정보 | BlueDino";
const pageDescription =
  "일반계좌, ISA, 연금저축, IRP 등 계좌 유형에 따라 원금·매매차익·배당 과세가 어떻게 달라지는지 한눈에 비교할 수 있도록 정리한 절세 참고 가이드입니다.";

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

export default function AccountTaxLayout({ children }: { children: ReactNode }) {
  return children;
}
