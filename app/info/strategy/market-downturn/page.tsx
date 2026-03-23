import StrategyArticlePage from "@/components/info/StrategyArticlePage";
import { strategyArticles } from "@/lib/info/strategyArticles";

export default function Page() {
  return <StrategyArticlePage article={strategyArticles["market-downturn"]} />;
}
