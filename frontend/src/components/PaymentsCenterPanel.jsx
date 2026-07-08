import { Clock, UserCheck } from "lucide-react";
import { money } from "../utils/formatters.js";
import PanelHeader from "./PanelHeader.jsx";

function PaymentsCenterPanel({ paymentQueue, beneficiaries }) {
  return (
    <article className="panel accounts-panel">
      <PanelHeader eyebrow="Payments" title="Queue and payees" icon={Clock} />
      <div className="payment-grid">
        <div className="feature-list">
          {paymentQueue.map((payment) => (
            <div className="payment-row" key={payment.id}>
              <div>
                <strong>{payment.payee}</strong>
                <span>{payment.method} - due {payment.due}</span>
              </div>
              <b>{money.format(payment.amount)}</b>
              <span className={`status ${payment.status === "approval" ? "review" : "pending"}`}>{payment.status}</span>
            </div>
          ))}
        </div>
        <div className="feature-list">
          {beneficiaries.map((beneficiary) => (
            <div className="beneficiary-row" key={beneficiary.id}>
              <UserCheck size={18} />
              <div>
                <strong>{beneficiary.name}</strong>
                <span>{beneficiary.rail} - {beneficiary.risk} - last {beneficiary.lastPaid}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PaymentsCenterPanel;
