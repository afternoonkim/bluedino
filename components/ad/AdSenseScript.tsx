import Script from "next/script";

// 광고 노출은 환경변수와 코드 레벨 스위치가 모두 허용될 때만 활성화됩니다.
// NEXT_PUBLIC_ADSENSE_ENABLED=true와 광고 클라이언트/슬롯 값이 설정된 경우에만 렌더링됩니다.
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
