import { Router } from "express";
import { z } from "zod";
import { authenticate, verifySession } from "../services/authService.js";
import { requireAuth } from "../middleware/requireAuth.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authRouter = Router();

authRouter.post("/login", (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    res.json(authenticate(payload.email, payload.password));
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, (_req, res) => {
  res.json({ user: res.locals.user });
});

authRouter.post("/logout", (_req, res) => {
  res.status(204).send();
});

authRouter.post("/verify", (req, res) => {
  const token = z.object({ token: z.string() }).safeParse(req.body);
  const user = token.success ? verifySession(token.data.token) : null;
  res.json({ authenticated: Boolean(user), user });
});
