import AccountsPanel from "./AccountsPanel.jsx";
import CardsPanel from "./CardsPanel.jsx";
import CashflowPanel from "./CashflowPanel.jsx";
import GoalsPanel from "./GoalsPanel.jsx";
import PortfolioPanel from "./PortfolioPanel.jsx";
import SecurityPanel from "./SecurityPanel.jsx";
import TransactionsPanel from "./TransactionsPanel.jsx";
import TransferPanel from "./TransferPanel.jsx";

function DashboardView({
  activeView,
  dashboard,
  filteredTransactions,
  transfer,
  transferResult,
  transferError,
  onTransferChange,
  onTransferSubmit
}) {
  const transferPanel = (
    <TransferPanel
      accounts={dashboard.accounts}
      transfer={transfer}
      transferResult={transferResult}
      transferError={transferError}
      onTransferChange={onTransferChange}
      onTransferSubmit={onTransferSubmit}
    />
  );

  if (activeView === "Accounts") {
    return (
      <>
        <section className="workbench">
          <AccountsPanel accounts={dashboard.accounts} />
          <GoalsPanel goals={dashboard.goals} />
        </section>
        <section className="workbench">
          <CashflowPanel cashflow={dashboard.cashflow} />
          <TransactionsPanel transactions={filteredTransactions} />
        </section>
      </>
    );
  }

  if (activeView === "Payments") {
    return (
      <>
        <section className="dashboard-grid two-column">
          {transferPanel}
          <TransactionsPanel transactions={filteredTransactions} />
        </section>
        <section className="workbench">
          <CashflowPanel cashflow={dashboard.cashflow} />
          <AccountsPanel accounts={dashboard.accounts} />
        </section>
      </>
    );
  }

  if (activeView === "Cards") {
    return (
      <section className="workbench">
        <CardsPanel cards={dashboard.cards} />
        <TransactionsPanel transactions={filteredTransactions} />
      </section>
    );
  }

  if (activeView === "Invest") {
    return (
      <>
        <section className="dashboard-grid two-column">
          <PortfolioPanel portfolio={dashboard.portfolio} />
          <GoalsPanel goals={dashboard.goals} />
        </section>
        <section className="workbench">
          <CashflowPanel cashflow={dashboard.cashflow} />
          <AccountsPanel accounts={dashboard.accounts} />
        </section>
      </>
    );
  }

  if (activeView === "Security") {
    return (
      <section className="workbench">
        <SecurityPanel risk={dashboard.risk} />
        <CardsPanel cards={dashboard.cards} />
      </section>
    );
  }

  return (
    <>
      <section className="dashboard-grid">
        <CashflowPanel cashflow={dashboard.cashflow} />
        <PortfolioPanel portfolio={dashboard.portfolio} />
        {transferPanel}
      </section>

      <section className="workbench">
        <AccountsPanel accounts={dashboard.accounts} />
        <GoalsPanel goals={dashboard.goals} />
      </section>

      <section className="workbench">
        <TransactionsPanel transactions={filteredTransactions} />
        <CardsPanel cards={dashboard.cards} />
      </section>
    </>
  );
}

export default DashboardView;
