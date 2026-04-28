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
    "투자 계산기와 데이터 기반 투자 정보 플랫폼 BlueDino. 배당, FIRE, 양도세, 절세계좌 정보를 한곳에서 쉽게 확인하세요.",
  robots: { index: true, follow: true },
  other: {
    "google-adsense-account": "ca-pub-5407950462485150",
  },
  openGraph: {
    title: "BlueDino 투자 계산기 플랫폼",
    description:
      "복리 계산기, 배당 계산기, FIRE 계산기, 양도세 계산 등 투자 계산을 쉽게 할 수 있는 플랫폼",
    url: "https://bluedino.kr",
    siteName: "BlueDino",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueDino 투자 계산기 플랫폼",
    description:
      "복리 계산기, 배당 계산기, FIRE 계산기, 양도세 계산 등 투자 계산을 쉽게 할 수 있는 플랫폼",
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
  description: "개인 투자자와 예비 투자자를 위한 금융 계산기 및 설명형 가이드를 제공하는 정보 사이트",
  founder: {
    "@type": "Person",
    name: "BlueDino 운영자",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BlueDino",
  url: "https://bluedino.kr",
  description: "투자 계산기와 금융 가이드를 한곳에서 볼 수 있는 BlueDino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/*
         * Some browser extensions inject inline styles like style="user-select: auto"
         * into body's descendant nodes after the SSR HTML is delivered but before React
         * hydrates. This causes Next.js to throw a hydration mismatch error.
         * The affected node is sometimes Next.js's own __next_root_layout_boundary__
         * which we cannot directly mark with suppressHydrationWarning. So we strip
         * any injected user-select inline styles in a small inline script that runs
         * before React hydration.
         */}
        <script
          id="bd-strip-extension-userselect"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=document.querySelectorAll('[style*="user-select"]');for(var i=0;i<n.length;i++){var el=n[i];el.style.userSelect='';if(!el.getAttribute('style')){el.removeAttribute('style');}}}catch(e){}})();`,
          }}
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
