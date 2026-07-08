import { Gauge } from "lucide-react";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function BudgetsPanel({ budgets }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Controls" title="Budget guardrails" icon={Gauge} />
      <div className="feature-list">
        {budgets.map((budget) => {
          const progress = Math.round((budget.spent / budget.limit) * 100);

          return (
            <div className="budget-item" key={budget.id}>
              <div>
                <strong>{budget.category}</strong>
                <span>{money.format(budget.spent)} of {money.format(budget.limit)}</span>
              </div>
              <div className="progress">
                <i style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <small>{progress}% used</small>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default BudgetsPanel;
