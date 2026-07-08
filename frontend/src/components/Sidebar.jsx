import { Activity, CreditCard, Landmark, LineChart as LineChartIcon, Send, ShieldCheck } from "lucide-react";

const navItems = [
  ["Overview", Activity],
  ["Accounts", Landmark],
  ["Payments", Send],
  ["Cards", CreditCard],
  ["Invest", LineChartIcon],
  ["Security", ShieldCheck]
];

function Sidebar({ activeView, onViewChange, risk }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">A</div>
        <div>
          <strong>Aurora</strong>
          <span>Fintech OS</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {navItems.map(([item, Icon]) => (
          <button className={activeView === item ? "active" : ""} key={item} onClick={() => onViewChange(item)}>
            <Icon size={18} />
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="advisor">
        <ShieldCheck size={20} />
        <strong>{risk.score}/100</strong>
        <span>{risk.label}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
