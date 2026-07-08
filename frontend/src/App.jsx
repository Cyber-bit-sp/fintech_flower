import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Building2,
  CreditCard,
  Landmark,
  LineChart as LineChartIcon,
  LockKeyhole,
  RefreshCcw,
  Search,
  Send,
  ShieldCheck,
  Target,
  WalletCards
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { fetchDashboard, scheduleTransfer } from "./api.js";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [activeView, setActiveView] = useState("Overview");
  const [query, setQuery] = useState("");
  const [transfer, setTransfer] = useState({ fromAccountId: "", toAccountId: "", amount: 2500, memo: "Treasury allocation" });
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
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Aurora</strong>
            <span>Fintech OS</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary">
          {[
            ["Overview", Activity],
            ["Accounts", Landmark],
            ["Payments", Send],
            ["Cards", CreditCard],
            ["Invest", LineChartIcon],
            ["Security", ShieldCheck]
          ].map(([item, Icon]) => (
            <button className={activeView === item ? "active" : ""} key={item} onClick={() => setActiveView(item)}>
              <Icon size={18} />
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="advisor">
          <ShieldCheck size={20} />
          <strong>{dashboard.risk.score}/100</strong>
          <span>{dashboard.risk.label}</span>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p>{dashboard.profile.plan}</p>
            <h1>{dashboard.profile.company}</h1>
          </div>
          <div className="topbar-actions">
            <label className="search">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search activity" />
            </label>
            <button className="icon-button" title="Refresh">
              <RefreshCcw size={18} />
            </button>
            <button className="icon-button" title="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <section className="metric-grid">
          {dashboard.metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.delta}</small>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel wide">
            <div className="panel-heading">
              <div>
                <p>Cashflow</p>
                <h2>Income and expenses</h2>
              </div>
              <span className="pill">Live forecast</span>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboard.cashflow}>
                  <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#157f72" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#157f72" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#dce7e2" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => money.format(value)} />
                  <Area type="monotone" dataKey="income" stroke="#157f72" fill="url(#income)" strokeWidth={3} />
                  <Area type="monotone" dataKey="expenses" stroke="#b65f2b" fill="transparent" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <p>Portfolio</p>
                <h2>Allocation</h2>
              </div>
              <WalletCards size={22} />
            </div>
            <div className="portfolio-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dashboard.portfolio} dataKey="allocation" innerRadius={58} outerRadius={86} paddingAngle={3}>
                    {["#157f72", "#2f5c99", "#c48b2c", "#7a5cce", "#263238"].map((color) => (
                      <Cell fill={color} key={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="asset-list">
              {dashboard.portfolio.map((asset) => (
                <div key={asset.symbol}>
                  <strong>{asset.symbol}</strong>
                  <span>{asset.allocation}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <p>Move Money</p>
                <h2>Schedule transfer</h2>
              </div>
              <Send size={22} />
            </div>
            <form className="transfer-form" onSubmit={submitTransfer}>
              <select value={transfer.fromAccountId} onChange={(event) => setTransfer({ ...transfer, fromAccountId: event.target.value })}>
                {dashboard.accounts.map((account) => (
                  <option value={account.id} key={account.id}>
                    From {account.name}
                  </option>
                ))}
              </select>
              <select value={transfer.toAccountId} onChange={(event) => setTransfer({ ...transfer, toAccountId: event.target.value })}>
                {dashboard.accounts.map((account) => (
                  <option value={account.id} key={account.id}>
                    To {account.name}
                  </option>
                ))}
              </select>
              <input type="number" min="1" value={transfer.amount} onChange={(event) => setTransfer({ ...transfer, amount: event.target.value })} />
              <input value={transfer.memo} onChange={(event) => setTransfer({ ...transfer, memo: event.target.value })} />
              <button type="submit">
                <Send size={17} />
                Schedule
              </button>
            </form>
            {transferResult && <div className="notice success">Transfer {transferResult.id} scheduled for {transferResult.eta}.</div>}
            {transferError && <div className="notice error">{transferError}</div>}
          </article>
        </section>

        <section className="workbench">
          <article className="panel accounts-panel">
            <div className="panel-heading">
              <div>
                <p>Accounts</p>
                <h2>Connected balances</h2>
              </div>
              <Building2 size={22} />
            </div>
            <div className="account-list">
              {dashboard.accounts.map((account) => (
                <div className="account-row" key={account.id}>
                  <div className="account-icon">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <strong>{account.name}</strong>
                    <span>{account.institution} · {account.type}</span>
                  </div>
                  <b>{money.format(account.balance)}</b>
                  <small className={account.trend >= 0 ? "positive" : "negative"}>{account.trend}%</small>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <p>Goals</p>
                <h2>Funding plan</h2>
              </div>
              <Target size={22} />
            </div>
            <div className="goal-list">
              {dashboard.goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100);
                return (
                  <div className="goal" key={goal.id}>
                    <div>
                      <strong>{goal.name}</strong>
                      <span>{money.format(goal.current)} of {money.format(goal.target)}</span>
                    </div>
                    <div className="progress"><i style={{ width: `${progress}%` }} /></div>
                    <small>{progress}% · due {goal.due}</small>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="workbench">
          <article className="panel accounts-panel">
            <div className="panel-heading">
              <div>
                <p>Activity</p>
                <h2>Transactions</h2>
              </div>
              <span className="pill">{filteredTransactions.length} results</span>
            </div>
            <div className="transaction-table">
              {filteredTransactions.map((transaction) => (
                <div className="transaction-row" key={transaction.id}>
                  <div className={transaction.amount > 0 ? "activity-icon income" : "activity-icon expense"}>
                    {transaction.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <strong>{transaction.merchant}</strong>
                    <span>{transaction.category} · {transaction.date}</span>
                  </div>
                  <span className={`status ${transaction.status}`}>{transaction.status}</span>
                  <b>{money.format(transaction.amount)}</b>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <div>
                <p>Cards</p>
                <h2>Spend control</h2>
              </div>
              <LockKeyhole size={22} />
            </div>
            <div className="card-stack">
              {dashboard.cards.map((card) => (
                <div className="team-card" key={card.id}>
                  <div>
                    <strong>{card.holder}</strong>
                    <span>{card.policy} · **** {card.last4}</span>
                  </div>
                  <b>{Math.round((card.spent / card.limit) * 100)}%</b>
                </div>
              ))}
            </div>
            <div className="mini-bars">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboard.cards}>
                  <XAxis dataKey="holder" hide />
                  <YAxis hide />
                  <Tooltip formatter={(value) => money.format(value)} />
                  <Bar dataKey="spent" fill="#2f5c99" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
