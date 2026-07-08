import { BadgeCheck, Building2, CreditCard, Database, Landmark, LockKeyhole, ShieldCheck, TrendingUp, Users } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

const iconMap = {
  "Real bank accounts": Landmark,
  "Real card issuing": CreditCard,
  "Real payments, ACH, and wires": Building2,
  "Real investment trading": TrendingUp,
  "Authentication and authorization": LockKeyhole,
  "Database persistence": Database,
  "User accounts": Users,
  "Production security and compliance": ShieldCheck
};

function ProductionReadinessPanel({ items }) {
  return (
    <article className="panel accounts-panel">
      <PanelHeader eyebrow="Production" title="Real fintech readiness" icon={BadgeCheck} />
      <div className="readiness-grid">
        {items.map((item) => {
          const Icon = iconMap[item.capability] ?? BadgeCheck;

          return (
            <div className="readiness-card" key={item.id}>
              <div className="readiness-icon">
                <Icon size={19} />
              </div>
              <div>
                <div className="readiness-heading">
                  <strong>{item.capability}</strong>
                  <span className="pill">{item.status}</span>
                </div>
                <small>{item.provider}</small>
                <p>{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default ProductionReadinessPanel;
