import { Target } from "lucide-react";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function GoalsPanel({ goals }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Goals" title="Funding plan" icon={Target} />
      <div className="goal-list">
        {goals.map((goal) => {
          const progress = Math.round((goal.current / goal.target) * 100);

          return (
            <div className="goal" key={goal.id}>
              <div>
                <strong>{goal.name}</strong>
                <span>{money.format(goal.current)} of {money.format(goal.target)}</span>
              </div>
              <div className="progress">
                <i style={{ width: `${progress}%` }} />
              </div>
              <small>{progress}% - due {goal.due}</small>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default GoalsPanel;
