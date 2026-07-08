import { Send } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

function TransferPanel({ accounts, transfer, transferResult, transferError, onTransferChange, onTransferSubmit }) {
  return (
    <article className="panel">
      <PanelHeader eyebrow="Move Money" title="Schedule transfer" icon={Send} />
      <form className="transfer-form" onSubmit={onTransferSubmit}>
        <select value={transfer.fromAccountId} onChange={(event) => onTransferChange({ ...transfer, fromAccountId: event.target.value })}>
          {accounts.map((account) => (
            <option value={account.id} key={account.id}>
              From {account.name}
            </option>
          ))}
        </select>
        <select value={transfer.toAccountId} onChange={(event) => onTransferChange({ ...transfer, toAccountId: event.target.value })}>
          {accounts.map((account) => (
            <option value={account.id} key={account.id}>
              To {account.name}
            </option>
          ))}
        </select>
        <input type="number" min="1" value={transfer.amount} onChange={(event) => onTransferChange({ ...transfer, amount: event.target.value })} />
        <input value={transfer.memo} onChange={(event) => onTransferChange({ ...transfer, memo: event.target.value })} />
        <button type="submit">
          <Send size={17} />
          Schedule
        </button>
      </form>
      {transferResult && <div className="notice success">Transfer {transferResult.id} scheduled for {transferResult.eta}.</div>}
      {transferError && <div className="notice error">{transferError}</div>}
    </article>
  );
}

export default TransferPanel;
