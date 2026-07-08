import { TrendingUp } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

function InvestmentDetailsPanel({ watchlist }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Treasury" title="Yield watchlist" icon={TrendingUp} />
      <div className="feature-list">
        {watchlist.map((asset) => (
          <div className="watch-row" key={asset.symbol}>
            <div>
              <strong>{asset.symbol}</strong>
              <span>{asset.name}</span>
            </div>
            <b>{asset.yield}%</b>
            <span className="pill">{asset.rating}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default InvestmentDetailsPanel;
