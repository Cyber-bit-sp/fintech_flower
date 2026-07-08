export type Account = {
  id: string;
  name: string;
  institution: string;
  type: "checking" | "savings" | "brokerage" | "credit";
  balance: number;
  currency: string;
  trend: number;
};

export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  status: "cleared" | "pending" | "review";
  accountId: string;
};

export const accounts: Account[] = [
  { id: "acc_operating", name: "Operating Cash", institution: "Aurora Bank", type: "checking", balance: 84250.4, currency: "USD", trend: 8.7 },
  { id: "acc_reserve", name: "Yield Reserve", institution: "Northstar Treasury", type: "savings", balance: 128430.15, currency: "USD", trend: 4.1 },
  { id: "acc_growth", name: "Growth Portfolio", institution: "Vertex Invest", type: "brokerage", balance: 96780.82, currency: "USD", trend: 11.8 },
  { id: "acc_credit", name: "Venture Card", institution: "Mercury Card", type: "credit", balance: -7320.66, currency: "USD", trend: -3.4 }
];

export const transactions: Transaction[] = [
  { id: "txn_1001", merchant: "Stripe Payout", category: "Revenue", amount: 18420.0, date: "2026-07-08", status: "cleared", accountId: "acc_operating" },
  { id: "txn_1002", merchant: "AWS", category: "Cloud", amount: -2460.82, date: "2026-07-07", status: "cleared", accountId: "acc_credit" },
  { id: "txn_1003", merchant: "Payroll Batch", category: "Payroll", amount: -38120.0, date: "2026-07-05", status: "pending", accountId: "acc_operating" },
  { id: "txn_1004", merchant: "Treasury Sweep", category: "Transfer", amount: 12000.0, date: "2026-07-04", status: "cleared", accountId: "acc_reserve" },
  { id: "txn_1005", merchant: "Datadog", category: "SaaS", amount: -718.44, date: "2026-07-03", status: "review", accountId: "acc_credit" },
  { id: "txn_1006", merchant: "ETF Dividend", category: "Investment", amount: 934.21, date: "2026-07-01", status: "cleared", accountId: "acc_growth" }
];

export const cards = [
  { id: "card_1", holder: "Maya Chen", last4: "9081", limit: 25000, spent: 7840, policy: "Engineering", status: "active" },
  { id: "card_2", holder: "Andre Ellis", last4: "4317", limit: 18000, spent: 4120, policy: "Sales", status: "active" },
  { id: "card_3", holder: "Priya Raman", last4: "7740", limit: 10000, spent: 1280, policy: "Ops", status: "locked" }
];

export const portfolio = [
  { symbol: "VTI", name: "Total Market ETF", allocation: 42, value: 40647.94, change: 1.8 },
  { symbol: "SGOV", name: "Treasury Bills ETF", allocation: 28, value: 27098.63, change: 0.2 },
  { symbol: "VXUS", name: "International ETF", allocation: 18, value: 17420.55, change: -0.4 },
  { symbol: "ETH", name: "Ethereum", allocation: 7, value: 6774.66, change: 3.6 },
  { symbol: "CASH", name: "Settlement Cash", allocation: 5, value: 4839.04, change: 0 }
];

export const cashflow = [
  { month: "Jan", income: 76000, expenses: 59000 },
  { month: "Feb", income: 82000, expenses: 63000 },
  { month: "Mar", income: 79000, expenses: 61750 },
  { month: "Apr", income: 91000, expenses: 68800 },
  { month: "May", income: 98000, expenses: 71400 },
  { month: "Jun", income: 104000, expenses: 75200 },
  { month: "Jul", income: 118000, expenses: 80400 }
];

export const goals = [
  { id: "goal_tax", name: "Quarterly tax reserve", current: 42600, target: 60000, due: "2026-09-15" },
  { id: "goal_runway", name: "Nine-month runway", current: 212680, target: 315000, due: "2026-12-31" },
  { id: "goal_expansion", name: "EU launch fund", current: 94000, target: 180000, due: "2027-03-01" }
];
