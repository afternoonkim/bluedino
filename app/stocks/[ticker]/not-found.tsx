import StockStatusMessage from "@/components/stocks/StockStatusMessage";

export default function StockNotFound() {
  return (
    <div className="bd-page">
      <div className="bd-container">
        <StockStatusMessage
          title="페이지를 찾을 수 없습니다"
          description="입력한 티커 경로가 올바른지 확인해주세요."
        />
      </div>
    </div>
  );
}
