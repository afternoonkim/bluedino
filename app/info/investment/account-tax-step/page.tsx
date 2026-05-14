import type { Metadata } from "next";
import AccountTaxStepClient from "./AccountTaxStepClient";

const canonical = "/info/investment/account-tax-step";
const title = "절세계좌 활용순서 | 연금저축·IRP·ISA 우선순위 가이드";
const description =
  "연금저축, IRP, ISA를 어떤 순서로 활용하면 좋은지 세액공제, 중도 인출, 세후 운용 관점에서 쉽게 정리한 절세계좌 우선순위 가이드입니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: `https://bluedino.kr${canonical}`,
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AccountTaxStepPage() {
  return <AccountTaxStepClient />;
}
