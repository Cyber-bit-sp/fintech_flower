import { LockKeyhole, ShieldCheck } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

const controls = [
  { label: "Biometric approval", status: "Enabled" },
  { label: "Wire transfer review", status: "Required" },
  { label: "Device trust", status: "Healthy" },
  { label: "Card policy engine", status: "Active" }
];

function SecurityPanel({ risk }) {
  return (
    <article className="panel accounts-panel">
      <PanelHeader eyebrow="Security" title="Risk and controls" icon={ShieldCheck} />
      <div className="security-score">
        <div>
          <span>Risk score</span>
          <strong>{risk.score}/100</strong>
        </div>
        <p>{risk.label}</p>
      </div>
      <div className="control-grid">
        {controls.map((control) => (
          <div className="control-card" key={control.label}>
            <LockKeyhole size={18} />
            <div>
              <strong>{control.label}</strong>
              <span>{control.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="alert-list">
        {risk.alerts.map((alert) => (
          <div className="alert-row" key={alert}>
            <ShieldCheck size={17} />
            <span>{alert}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default SecurityPanel;
