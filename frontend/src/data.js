export const fallbackDashboard = {
  profile: {
    company: "Aurora Labs",
    owner: "Jordan Rivera",
    plan: "Private Banking Plus",
    lastSync: new Date().toISOString()
  },
  metrics: [
    { label: "Net worth", value: "$302,140.71", delta: "+8.4%", tone: "positive" },
    { label: "Monthly income", value: "$118,000.00", delta: "+13.5%", tone: "positive" },
    { label: "Burn rate", value: "$80,400.00", delta: "-4.2%", tone: "positive" },
    { label: "Runway", value: "3.8 mo", delta: "+1.1 mo", tone: "positive" }
  ],
  risk: {
    score: 87,
    label: "Low operational risk",
    pendingReviews: 1,
    alerts: ["One SaaS charge needs policy review", "Payroll batch scheduled for tomorrow", "Treasury reserve is 71% funded"]
  },
  accounts: [
    { id: "acc_operating", name: "Operating Cash", institution: "Aurora Bank", type: "checking", balance: 84250.4, currency: "USD", trend: 8.7 },
    { id: "acc_reserve", name: "Yield Reserve", institution: "Northstar Treasury", type: "savings", balance: 128430.15, currency: "USD", trend: 4.1 },
    { id: "acc_growth", name: "Growth Portfolio", institution: "Vertex Invest", type: "brokerage", balance: 96780.82, currency: "USD", trend: 11.8 },
    { id: "acc_credit", name: "Venture Card", institution: "Mercury Card", type: "credit", balance: -7320.66, currency: "USD", trend: -3.4 }
  ],
  transactions: [
    { id: "txn_1001", merchant: "Stripe Payout", category: "Revenue", amount: 18420, date: "2026-07-08", status: "cleared", accountId: "acc_operating" },
    { id: "txn_1002", merchant: "AWS", category: "Cloud", amount: -2460.82, date: "2026-07-07", status: "cleared", accountId: "acc_credit" },
    { id: "txn_1003", merchant: "Payroll Batch", category: "Payroll", amount: -38120, date: "2026-07-05", status: "pending", accountId: "acc_operating" },
    { id: "txn_1004", merchant: "Treasury Sweep", category: "Transfer", amount: 12000, date: "2026-07-04", status: "cleared", accountId: "acc_reserve" },
    { id: "txn_1005", merchant: "Datadog", category: "SaaS", amount: -718.44, date: "2026-07-03", status: "review", accountId: "acc_credit" },
    { id: "txn_1006", merchant: "ETF Dividend", category: "Investment", amount: 934.21, date: "2026-07-01", status: "cleared", accountId: "acc_growth" }
  ],
  cards: [
    { id: "card_1", holder: "Maya Chen", last4: "9081", limit: 25000, spent: 7840, policy: "Engineering", status: "active" },
    { id: "card_2", holder: "Andre Ellis", last4: "4317", limit: 18000, spent: 4120, policy: "Sales", status: "active" },
    { id: "card_3", holder: "Priya Raman", last4: "7740", limit: 10000, spent: 1280, policy: "Ops", status: "locked" }
  ],
  portfolio: [
    { symbol: "VTI", name: "Total Market ETF", allocation: 42, value: 40647.94, change: 1.8 },
    { symbol: "SGOV", name: "Treasury Bills ETF", allocation: 28, value: 27098.63, change: 0.2 },
    { symbol: "VXUS", name: "International ETF", allocation: 18, value: 17420.55, change: -0.4 },
    { symbol: "ETH", name: "Ethereum", allocation: 7, value: 6774.66, change: 3.6 },
    { symbol: "CASH", name: "Settlement Cash", allocation: 5, value: 4839.04, change: 0 }
  ],
  cashflow: [
    { month: "Jan", income: 76000, expenses: 59000 },
    { month: "Feb", income: 82000, expenses: 63000 },
    { month: "Mar", income: 79000, expenses: 61750 },
    { month: "Apr", income: 91000, expenses: 68800 },
    { month: "May", income: 98000, expenses: 71400 },
    { month: "Jun", income: 104000, expenses: 75200 },
    { month: "Jul", income: 118000, expenses: 80400 }
  ],
  goals: [
    { id: "goal_tax", name: "Quarterly tax reserve", current: 42600, target: 60000, due: "2026-09-15" },
    { id: "goal_runway", name: "Nine-month runway", current: 212680, target: 315000, due: "2026-12-31" },
    { id: "goal_expansion", name: "EU launch fund", current: 94000, target: 180000, due: "2027-03-01" }
  ],
  paymentQueue: [
    { id: "pay_001", payee: "Atlas Payroll", amount: 38120, due: "2026-07-09", method: "ACH", status: "scheduled" },
    { id: "pay_002", payee: "AWS", amount: 2460.82, due: "2026-07-12", method: "Card", status: "auto-pay" },
    { id: "pay_003", payee: "KPMG Advisory", amount: 6400, due: "2026-07-18", method: "Wire", status: "approval" },
    { id: "pay_004", payee: "Figma", amount: 540, due: "2026-07-22", method: "Card", status: "scheduled" }
  ],
  beneficiaries: [
    { id: "ben_001", name: "Atlas Payroll", rail: "ACH", risk: "trusted", lastPaid: "2026-06-30" },
    { id: "ben_002", name: "Northstar Treasury", rail: "Internal", risk: "trusted", lastPaid: "2026-07-04" },
    { id: "ben_003", name: "KPMG Advisory", rail: "Wire", risk: "review", lastPaid: "2026-05-14" }
  ],
  budgets: [
    { id: "bud_cloud", category: "Cloud", spent: 2460.82, limit: 5200 },
    { id: "bud_payroll", category: "Payroll", spent: 38120, limit: 46000 },
    { id: "bud_saas", category: "SaaS", spent: 718.44, limit: 2500 },
    { id: "bud_travel", category: "Travel", spent: 1280, limit: 8000 }
  ],
  insights: [
    { id: "ins_001", title: "Move idle cash", detail: "A $24k sweep to Yield Reserve keeps runway intact and improves projected interest income.", priority: "High" },
    { id: "ins_002", title: "Review SaaS charge", detail: "Datadog is outside the Engineering policy threshold and needs one approval.", priority: "Medium" },
    { id: "ins_003", title: "Tax goal pace", detail: "Quarterly tax reserve is 71% funded with 69 days remaining.", priority: "Low" }
  ],
  watchlist: [
    { symbol: "BIL", name: "1-3 Month T-Bill ETF", yield: 5.11, rating: "Treasury" },
    { symbol: "VMFXX", name: "Federal Money Market", yield: 5.03, rating: "Cash" },
    { symbol: "IGSB", name: "Short-Term Corporate Bond", yield: 4.82, rating: "A" }
  ],
  auditLog: [
    { id: "aud_001", actor: "Maya Chen", action: "Locked Ops card", time: "2026-07-08 14:21", severity: "info" },
    { id: "aud_002", actor: "Risk Engine", action: "Flagged Datadog charge", time: "2026-07-08 12:04", severity: "warning" },
    { id: "aud_003", actor: "Jordan Rivera", action: "Approved treasury sweep", time: "2026-07-07 16:33", severity: "success" }
  ],
  productionReadiness: [
    {
      id: "ready_bank_accounts",
      capability: "Real bank accounts",
      status: "Integration ready",
      provider: "Plaid, MX, Teller, or direct bank API",
      detail: "Connect live account aggregation, balances, identity, and transaction sync."
    },
    {
      id: "ready_card_issuing",
      capability: "Real card issuing",
      status: "Provider required",
      provider: "Stripe Issuing, Marqeta, Lithic, or Adyen",
      detail: "Issue virtual/physical cards, enforce spend controls, and stream card events."
    },
    {
      id: "ready_payments",
      capability: "Real payments, ACH, and wires",
      status: "Provider required",
      provider: "Modern Treasury, Dwolla, Stripe Treasury, Unit, or bank rails",
      detail: "Originate ACH/wire transfers, approvals, settlement tracking, and reconciliation."
    },
    {
      id: "ready_trading",
      capability: "Real investment trading",
      status: "Broker API required",
      provider: "Alpaca, DriveWealth, Interactive Brokers, or Apex",
      detail: "Place orders, manage positions, retrieve statements, and monitor suitability checks."
    },
    {
      id: "ready_auth",
      capability: "Authentication and authorization",
      status: "Prototype active",
      provider: "Auth0, Clerk, Cognito, WorkOS, or custom RBAC",
      detail: "Current signed session flow can evolve into roles, permissions, MFA, and SSO."
    },
    {
      id: "ready_database",
      capability: "Database persistence",
      status: "Next build step",
      provider: "MongoDB Atlas, PostgreSQL, or DynamoDB",
      detail: "Persist users, linked accounts, transfers, cards, audit logs, policies, and sessions."
    },
    {
      id: "ready_users",
      capability: "User accounts",
      status: "Prototype active",
      provider: "Application user model plus organization/workspace model",
      detail: "Expand the demo user into signup, invitations, teams, roles, and workspace settings."
    },
    {
      id: "ready_compliance",
      capability: "Production security and compliance",
      status: "Architecture required",
      provider: "SOC 2 controls, KYC/KYB, AML, audit logging, encryption, monitoring",
      detail: "Add compliance workflows, secrets management, rate limits, data retention, and incident response."
    }
  ]
};
