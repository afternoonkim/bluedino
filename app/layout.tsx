import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import AdSenseScript from "@/components/ad/AdSenseScript";

export const metadata: Metadata = {
  metadataBase: new URL("https://bluedino.kr"),
  verification: {
    google: "v6lak7MNUZ5kKMsNH1T_ErDNqFl35Jgm3-GVAZ-M1qc",
    other: {
      "naver-site-verification": "7105657ffc86bbf65301008e5ca5a4c6f09a3fb0"
    }
  },
  title: { default: "BlueDino", template: "%s | BlueDino" },
  description:
    "금융이 궁금할 때 필요한 숫자를 바로 계산하고, ISA·IRP·연금저축·대출·ETF와 투자 정보를 함께 확인하세요.",
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-5407950462485150",
  },
  openGraph: {
    title: "BlueDino | 금융 계산기와 금융·투자정보",
    description:
      "금융이 궁금할 때 필요한 숫자를 바로 계산하고, ISA·IRP·연금저축·대출·ETF와 투자 정보를 함께 확인하세요.",
    url: "https://bluedino.kr",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueDino | 금융 계산기와 금융·투자정보",
    description:
      "금융이 궁금할 때 필요한 숫자를 바로 계산하고, ISA·IRP·연금저축·대출·ETF와 투자 정보를 함께 확인하세요.",
  },
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BlueDino",
  url: "https://bluedino.kr",
  email: "afternoonkim93@gmail.com",
  description: "금융 계산기와 금융·투자 정보를 제공하는 BlueDino",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BlueDino",
  url: "https://bluedino.kr",
  description: "할부·이자·배당·대출 계산기와 금융·투자 정보를 함께 확인하는 BlueDino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="BlueDino 금융 계산기와 투자 가이드 RSS"
          href="/rss.xml"
        />
      </head>
      <body suppressHydrationWarning>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <AdSenseScript />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
