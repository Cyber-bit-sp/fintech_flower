# Aurora Fintech

Aurora Fintech is a full-stack MERN-style finance operations product: a polished React dashboard backed by a typed Node/Express API. It is designed as a serious starting point for digital banking, treasury, portfolio, and payment workflows.

## Stack

- Frontend: React, JavaScript, Vite, Recharts, Lucide icons
- Backend: Node.js, Express, TypeScript, Zod
- Tooling: npm workspaces, concurrently, tsx

## Features

- Executive finance dashboard with net worth, cash runway, risk posture, and payment health
- Account, card, investment, transaction, cashflow, and goal APIs
- Transfer simulation endpoint with validation and generated receipt metadata
- Responsive product UI built for dense, repeatable fintech workflows
- Mock service layer that can be replaced by MongoDB, PostgreSQL, Plaid, Stripe, or broker APIs

## Run Locally

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:4000`.

## Environment

Create `backend/.env` when you are ready to configure real integrations:

```bash
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

## Project Structure

```text
backend/
  src/
    data/        Mock portfolio, accounts, cards, and transactions
    middleware/  Error handling and request logging
    routes/      Express route modules
    services/    Business aggregation and transfer logic
frontend/
  src/
    App.jsx      Main React application
    api.js       API client with resilient local fallback
    data.js      Demo fallback dataset
    styles.css   Complete responsive UI system
```
