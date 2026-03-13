import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export const metadata: Metadata = {
  verification: {
    google: "v6lak7MNUZ5kKMsNH1T_ErDNqFl35Jgm3-GVAZ-M1qc",
  },
  title: { default: "BlueDino", template: "%s | BlueDino" },
  description:
    "투자 계산기와 데이터 기반 투자 정보 플랫폼 BlueDino. 배당, FIRE, 양도세, 절세계좌 정보를 한곳에서 쉽게 확인하세요.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5407950462485150"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
