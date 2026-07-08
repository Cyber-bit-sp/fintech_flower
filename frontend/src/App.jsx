import { useEffect, useMemo, useState } from "react";
import { fetchDashboard, scheduleTransfer } from "./api.js";
import DashboardView from "./components/DashboardView.jsx";
import MetricGrid from "./components/MetricGrid.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";

const initialTransfer = {
  fromAccountId: "",
  toAccountId: "",
  amount: 2500,
  memo: "Treasury allocation"
};

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [activeView, setActiveView] = useState("Overview");
  const [query, setQuery] = useState("");
  const [transfer, setTransfer] = useState(initialTransfer);
  const [transferResult, setTransferResult] = useState(null);
  const [transferError, setTransferError] = useState("");

  useEffect(() => {
    fetchDashboard().then((data) => {
      setDashboard(data);
      setTransfer((current) => ({
        ...current,
        fromAccountId: data.accounts[0]?.id ?? "",
        toAccountId: data.accounts[1]?.id ?? ""
      }));
    });
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!dashboard) return [];

    return dashboard.transactions.filter((transaction) =>
      `${transaction.merchant} ${transaction.category} ${transaction.status}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [dashboard, query]);

  async function submitTransfer(event) {
    event.preventDefault();
    setTransferResult(null);
    setTransferError("");

    try {
      const receipt = await scheduleTransfer({ ...transfer, amount: Number(transfer.amount) });
      setTransferResult(receipt);
    } catch (error) {
      setTransferError(error.message);
    }
  }

  if (!dashboard) {
    return <div className="loading">Loading Aurora Fintech...</div>;
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onViewChange={setActiveView} risk={dashboard.risk} />

      <main className="content">
        <Topbar plan={dashboard.profile.plan} company={dashboard.profile.company} query={query} onQueryChange={setQuery} />
        <MetricGrid metrics={dashboard.metrics} />

        <DashboardView
          activeView={activeView}
          dashboard={dashboard}
          filteredTransactions={filteredTransactions}
          transfer={transfer}
          transferResult={transferResult}
          transferError={transferError}
          onTransferChange={setTransfer}
          onTransferSubmit={submitTransfer}
        />
      </main>
    </div>
  );
}

export default App;
