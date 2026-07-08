import { Router } from "express";
import { z } from "zod";
import { createTransfer } from "../services/transferService.js";

const transferSchema = z.object({
  fromAccountId: z.string().min(1),
  toAccountId: z.string().min(1),
  amount: z.number().positive().max(500000),
  memo: z.string().max(160).optional()
});

export const transferRouter = Router();

transferRouter.post("/", (req, res, next) => {
  try {
    const payload = transferSchema.parse(req.body);
    res.status(201).json(createTransfer(payload));
  } catch (error) {
    next(error);
  }
});
