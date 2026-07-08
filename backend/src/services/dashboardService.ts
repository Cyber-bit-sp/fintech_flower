import { accounts, cards, cashflow, goals, portfolio, transactions } from "../data/financeData.js";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function getDashboard() {
  const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyIncome = cashflow.at(-1)?.income ?? 0;
  const monthlyExpenses = cashflow.at(-1)?.expenses ?? 1;
  const runwayMonths = Number((totalAssets / monthlyExpenses).toFixed(1));
  const pendingReviews = transactions.filter((transaction) => transaction.status === "review").length;

  return {
    profile: {
      company: "Aurora Labs",
      owner: "Jordan Rivera",
      plan: "Private Banking Plus",
      lastSync: new Date().toISOString()
    },
    metrics: [
      { label: "Net worth", value: currency.format(totalAssets), delta: "+8.4%", tone: "positive" },
      { label: "Monthly income", value: currency.format(monthlyIncome), delta: "+13.5%", tone: "positive" },
      { label: "Burn rate", value: currency.format(monthlyExpenses), delta: "-4.2%", tone: "positive" },
      { label: "Runway", value: `${runwayMonths} mo`, delta: "+1.1 mo", tone: "positive" }
    ],
    risk: {
      score: 87,
      label: "Low operational risk",
      pendingReviews,
      alerts: [
        "One SaaS charge needs policy review",
        "Payroll batch scheduled for tomorrow",
        "Treasury reserve is 71% funded"
      ]
    },
    accounts,
    transactions,
    cards,
    portfolio,
    cashflow,
    goals
  };
}
