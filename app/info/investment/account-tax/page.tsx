import type { Metadata } from "next";
import AccountTaxClient from "./AccountTaxClient";

const canonical = "/info/investment/account-tax";
const title = "계좌별 세금정보 | 일반계좌·ISA·연금저축·IRP 과세 비교";
const description =
  "일반계좌, ISA, 연금저축, IRP의 매매차익·배당·분배금 과세 방식을 한눈에 비교하고 세후 수익률 판단 기준을 확인할 수 있습니다.";

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

export default function AccountTaxPage() {
  return <AccountTaxClient />;
}
