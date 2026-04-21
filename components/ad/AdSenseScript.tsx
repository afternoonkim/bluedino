import Script from "next/script";

// AdSense 재심사 대비: 승인될 때까지 코드 레벨에서 강제 비활성화.
// 재심사 통과 후 이 상수를 false로 바꾸고 NEXT_PUBLIC_ADSENSE_ENABLED=true를 설정하세요.
const FORCE_DISABLE_ADS = true;

const ADSENSE_ENABLED =
  !FORCE_DISABLE_ADS && process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export default function AdSenseScript() {
  if (!ADSENSE_ENABLED || !AD_CLIENT) return null;

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
