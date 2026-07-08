import AccountsPanel from "./AccountsPanel.jsx";
import AuditTrailPanel from "./AuditTrailPanel.jsx";
import BudgetsPanel from "./BudgetsPanel.jsx";
import CardsPanel from "./CardsPanel.jsx";
import CashflowPanel from "./CashflowPanel.jsx";
import GoalsPanel from "./GoalsPanel.jsx";
import InsightsPanel from "./InsightsPanel.jsx";
import InvestmentDetailsPanel from "./InvestmentDetailsPanel.jsx";
import PaymentsCenterPanel from "./PaymentsCenterPanel.jsx";
import PortfolioPanel from "./PortfolioPanel.jsx";
import ProductionReadinessPanel from "./ProductionReadinessPanel.jsx";
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
          <BudgetsPanel budgets={dashboard.budgets} />
        </section>
        <section className="workbench">
          <CashflowPanel cashflow={dashboard.cashflow} />
          <GoalsPanel goals={dashboard.goals} />
        </section>
        <section className="workbench">
          <TransactionsPanel transactions={filteredTransactions} />
          <InsightsPanel insights={dashboard.insights} />
        </section>
      </>
    );
  }

  if (activeView === "Payments") {
    return (
      <>
        <section className="dashboard-grid two-column">
          {transferPanel}
          <PaymentsCenterPanel paymentQueue={dashboard.paymentQueue} beneficiaries={dashboard.beneficiaries} />
        </section>
        <section className="workbench">
          <TransactionsPanel transactions={filteredTransactions} />
          <AccountsPanel accounts={dashboard.accounts} />
        </section>
      </>
    );
  }

  if (activeView === "Cards") {
    return (
      <>
        <section className="workbench">
          <CardsPanel cards={dashboard.cards} />
          <BudgetsPanel budgets={dashboard.budgets} />
        </section>
        <section className="workbench">
          <TransactionsPanel transactions={filteredTransactions} />
          <InsightsPanel insights={dashboard.insights} />
        </section>
      </>
    );
  }

  if (activeView === "Invest") {
    return (
      <>
        <section className="dashboard-grid two-column">
          <PortfolioPanel portfolio={dashboard.portfolio} />
          <InvestmentDetailsPanel watchlist={dashboard.watchlist} />
        </section>
        <section className="workbench">
          <CashflowPanel cashflow={dashboard.cashflow} />
          <GoalsPanel goals={dashboard.goals} />
        </section>
      </>
    );
  }

  if (activeView === "Security") {
    return (
      <>
        <section className="workbench">
          <SecurityPanel risk={dashboard.risk} />
          <AuditTrailPanel auditLog={dashboard.auditLog} />
        </section>
        <section className="workbench">
          <CardsPanel cards={dashboard.cards} />
          <InsightsPanel insights={dashboard.insights} />
        </section>
        <section className="workbench single">
          <ProductionReadinessPanel items={dashboard.productionReadiness} />
        </section>
      </>
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
        <InsightsPanel insights={dashboard.insights} />
      </section>

      <section className="workbench">
        <TransactionsPanel transactions={filteredTransactions} />
        <CardsPanel cards={dashboard.cards} />
      </section>

      <section className="workbench">
        <PaymentsCenterPanel paymentQueue={dashboard.paymentQueue} beneficiaries={dashboard.beneficiaries} />
        <BudgetsPanel budgets={dashboard.budgets} />
      </section>

      <section className="workbench single">
        <ProductionReadinessPanel items={dashboard.productionReadiness} />
      </section>
    </>
  );
}

export default DashboardView;
