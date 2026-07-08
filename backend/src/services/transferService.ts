import { nanoid } from "nanoid";
import { accounts } from "../data/financeData.js";

export type TransferInput = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  memo?: string;
};

export function createTransfer(input: TransferInput) {
  const from = accounts.find((account) => account.id === input.fromAccountId);
  const to = accounts.find((account) => account.id === input.toAccountId);

  if (!from || !to) {
    const error = new Error("Transfer account could not be found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }

  if (from.id === to.id) {
    const error = new Error("Source and destination accounts must be different") as Error & { status?: number };
    error.status = 400;
    throw error;
  }

  if (from.balance < input.amount) {
    const error = new Error("Insufficient available balance") as Error & { status?: number };
    error.status = 409;
    throw error;
  }

  return {
    id: `trf_${nanoid(10)}`,
    status: "scheduled",
    eta: "1 business day",
    amount: input.amount,
    currency: from.currency,
    from: from.name,
    to: to.name,
    memo: input.memo ?? "Internal transfer",
    createdAt: new Date().toISOString()
  };
}
