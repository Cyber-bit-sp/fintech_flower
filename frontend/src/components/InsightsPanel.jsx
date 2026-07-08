import { Sparkles } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

function InsightsPanel({ insights }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Copilot" title="Smart insights" icon={Sparkles} />
      <div className="feature-list">
        {insights.map((insight) => (
          <div className="feature-item" key={insight.id}>
            <span className={`priority ${insight.priority.toLowerCase()}`}>{insight.priority}</span>
            <strong>{insight.title}</strong>
            <p>{insight.detail}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default InsightsPanel;
