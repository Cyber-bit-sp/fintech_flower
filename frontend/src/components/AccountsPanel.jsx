import { Building2, Landmark } from "lucide-react";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function AccountsPanel({ accounts }) {
  return (
    <article className="panel accounts-panel">
      <PanelHeader eyebrow="Accounts" title="Connected balances" icon={Building2} />
      <div className="account-list">
        {accounts.map((account) => (
          <div className="account-row" key={account.id}>
            <div className="account-icon">
              <Landmark size={18} />
            </div>
            <div>
              <strong>{account.name}</strong>
              <span>{account.institution} - {account.type}</span>
            </div>
            <b>{money.format(account.balance)}</b>
            <small className={account.trend >= 0 ? "positive" : "negative"}>{account.trend}%</small>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AccountsPanel;
