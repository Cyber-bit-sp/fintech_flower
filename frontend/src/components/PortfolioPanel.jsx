import { WalletCards } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import PanelHeader from "./PanelHeader.jsx";

const allocationColors = ["#157f72", "#2f5c99", "#c48b2c", "#7a5cce", "#263238"];

function PortfolioPanel({ portfolio }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Portfolio" title="Allocation" icon={WalletCards} />
      <div className="portfolio-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={portfolio} dataKey="allocation" innerRadius={58} outerRadius={86} paddingAngle={3}>
              {allocationColors.map((color) => (
                <Cell fill={color} key={color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="asset-list">
        {portfolio.map((asset) => (
          <div key={asset.symbol}>
            <strong>{asset.symbol}</strong>
            <span>{asset.allocation}%</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default PortfolioPanel;
