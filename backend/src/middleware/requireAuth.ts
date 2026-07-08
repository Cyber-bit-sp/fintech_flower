import type { RequestHandler } from "express";
import { verifySession } from "../services/authService.js";

export const requireAuth: RequestHandler = (req, res, next) => {
  const header = req.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  const user = verifySession(token);

  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  res.locals.user = user;
  next();
};
