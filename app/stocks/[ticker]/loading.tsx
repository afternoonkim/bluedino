export default function LoadingStockPage() {
  return (
    <div className="bd-page">
      <div className="bd-container space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/70" />
        ))}
      </div>
    </div>
  );
}
