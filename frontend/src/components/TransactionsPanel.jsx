import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function TransactionsPanel({ transactions }) {
  return (
    <article className="panel accounts-panel">
      <PanelHeader eyebrow="Activity" title="Transactions" action={<span className="pill">{transactions.length} results</span>} />
      <div className="transaction-table">
        {transactions.map((transaction) => (
          <div className="transaction-row" key={transaction.id}>
            <div className={transaction.amount > 0 ? "activity-icon income" : "activity-icon expense"}>
              {transaction.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
            </div>
            <div>
              <strong>{transaction.merchant}</strong>
              <span>{transaction.category} - {transaction.date}</span>
            </div>
            <span className={`status ${transaction.status}`}>{transaction.status}</span>
            <b>{money.format(transaction.amount)}</b>
          </div>
        ))}
      </div>
    </article>
  );
}

export default TransactionsPanel;
