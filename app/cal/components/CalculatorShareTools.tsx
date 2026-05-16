"use client";

import { useRef, useState } from "react";
import type { RefObject } from "react";
import * as htmlToImage from "html-to-image";

type CalculatorShareToolsProps = {
  title: string;
  summary: string;
  resetLabel?: string;
  onReset?: () => void;
  resultRef?: RefObject<HTMLElement | null>;
};

export default function CalculatorShareTools({
  title,
  summary,
  resetLabel = "입력값 초기화",
  onReset,
  resultRef,
}: CalculatorShareToolsProps) {
  const [message, setMessage] = useState("");
  const localRef = useRef<HTMLDivElement | null>(null);

  const getCurrentUrl = () => (typeof window !== "undefined" ? window.location.href : "");
  const getShareText = () => `${title} 결과\n${summary}\n${getCurrentUrl()}`;

  const copyText = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(successMessage);
    } catch {
      setMessage("복사 권한이 제한되어 직접 선택해 복사해 주세요.");
    }
  };

  const saveImage = async () => {
    const captureTarget = resultRef?.current ?? localRef.current;

    if (!captureTarget) {
      setMessage("저장할 결과 영역을 찾지 못했습니다.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toPng(captureTarget, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${title.replace(/\s+/g, "-")}-result.png`;
      link.href = dataUrl;
      link.click();
      setMessage("결과 이미지를 저장했습니다.");
    } catch {
      setMessage("이미지 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div ref={localRef} className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-white">계산 결과 공유</div>
      <p className="mt-2 text-sm leading-6 text-slate-400">결과 요약을 복사하거나 현재 URL을 공유해 나중에 다시 확인할 수 있습니다.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="bd-button-secondary" onClick={() => copyText(summary, "결과 요약을 복사했습니다.")}>결과 요약 복사</button>
        <button type="button" className="bd-button-secondary" onClick={() => copyText(getCurrentUrl(), "현재 주소를 복사했습니다.")}>URL 복사</button>
        <button type="button" className="bd-button-secondary" onClick={() => copyText(getShareText(), "공유용 문장을 복사했습니다.")}>공유 문장 복사</button>
        <button type="button" className="bd-button-secondary" onClick={saveImage}>결과 이미지 저장</button>
        {onReset ? <button type="button" className="bd-button-secondary" onClick={onReset}>{resetLabel}</button> : null}
      </div>
      {message ? <p className="mt-3 text-xs font-semibold text-cyan-200">{message}</p> : null}
    </div>
  );
}
