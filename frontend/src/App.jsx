import { useEffect, useMemo, useState } from "react";
import { clearSession, fetchDashboard, getStoredSession, login, scheduleTransfer, verifySession } from "./api.js";
import DashboardView from "./components/DashboardView.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
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
  const [session, setSession] = useState(getStoredSession());
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(getStoredSession()));
  const [activeView, setActiveView] = useState("Overview");
  const [query, setQuery] = useState("");
  const [transfer, setTransfer] = useState(initialTransfer);
  const [transferResult, setTransferResult] = useState(null);
  const [transferError, setTransferError] = useState("");

  useEffect(() => {
    if (!session) return;

    fetchDashboard().then((data) => {
      setDashboard(data);
      setTransfer((current) => ({
        ...current,
        fromAccountId: data.accounts[0]?.id ?? "",
        toAccountId: data.accounts[1]?.id ?? ""
      }));
    });
  }, [session]);

  useEffect(() => {
    verifySession().then((verifiedSession) => {
      setSession(verifiedSession);
      setIsCheckingSession(false);
    });
  }, []);

  async function submitLogin(credentials) {
    const authenticatedSession = await login(credentials);
    setSession(authenticatedSession);
  }

  function logout() {
    clearSession();
    setSession(null);
    setDashboard(null);
    setActiveView("Overview");
  }

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

  if (isCheckingSession) {
    return <div className="loading">Checking secure session...</div>;
  }

  if (!session) {
    return <LoginScreen onLogin={submitLogin} />;
  }

  if (!dashboard) {
    return <div className="loading">Loading Aurora Fintech...</div>;
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onViewChange={setActiveView} risk={dashboard.risk} />

      <main className="content">
        <Topbar
          plan={dashboard.profile.plan}
          company={dashboard.profile.company}
          query={query}
          user={session.user}
          onLogout={logout}
          onQueryChange={setQuery}
        />
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
