export type EtfUniverseItem = {
  symbol: string;
  name: string;
  category: string;
};

// export const ETF_UNIVERSE: EtfUniverseItem[] = [
//   { symbol: "SCHD", name: "Schwab U.S. Dividend Equity ETF", category: "배당 성장" },
//   { symbol: "VYM", name: "Vanguard High Dividend Yield ETF", category: "고배당" },
//   { symbol: "HDV", name: "iShares Core High Dividend ETF", category: "고배당" },
//   { symbol: "DGRO", name: "iShares Core Dividend Growth ETF", category: "배당 성장" },
//   { symbol: "JEPI", name: "JPMorgan Equity Premium Income ETF", category: "월배당" },
//   { symbol: "JEPQ", name: "JPMorgan Nasdaq Equity Premium Income ETF", category: "월배당" },
//   { symbol: "SPYD", name: "SPDR Portfolio S&P 500 High Dividend ETF", category: "고배당" },
//   { symbol: "DIVO", name: "Amplify CWP Enhanced Dividend Income ETF", category: "월배당" },
//   { symbol: "VOO", name: "Vanguard S&P 500 ETF", category: "지수 추종" },
//   { symbol: "SPY", name: "SPDR S&P 500 ETF Trust", category: "지수 추종" },
//   { symbol: "QQQM", name: "Invesco NASDAQ 100 ETF", category: "성장" },
//   { symbol: "QQQ", name: "Invesco QQQ Trust", category: "성장" },
//   { symbol: "VTI", name: "Vanguard Total Stock Market ETF", category: "지수 추종" },
//   { symbol: "VXUS", name: "Vanguard Total International Stock ETF", category: "해외 분산" },
//   { symbol: "VNQ", name: "Vanguard Real Estate ETF", category: "리츠" },
//   { symbol: "XLK", name: "Technology Select Sector SPDR Fund", category: "섹터" },
// ];

export const ETF_UNIVERSE: EtfUniverseItem[] = [
  { symbol: "SCHD", name: "Schwab U.S. Dividend Equity ETF", category: "배당 성장" },
  { symbol: "VYM", name: "Vanguard High Dividend Yield ETF", category: "고배당" },
  { symbol: "JEPI", name: "JPMorgan Equity Premium Income ETF", category: "월배당" },
  { symbol: "JEPQ", name: "JPMorgan Nasdaq Equity Premium Income ETF", category: "월배당" },
  { symbol: "VOO", name: "Vanguard S&P 500 ETF", category: "지수 추종" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", category: "성장" },
];

export const ETF_SYMBOLS = ETF_UNIVERSE.map((item) => item.symbol);

export const ETF_OPTIONS = ETF_UNIVERSE.map((item) => ({
  value: item.symbol,
  label: `${item.symbol} · ${item.name}`,
}));

export function getUniverseItem(symbol: string) {
  return ETF_UNIVERSE.find((item) => item.symbol === symbol.toUpperCase());
}
