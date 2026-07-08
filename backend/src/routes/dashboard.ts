import { Router } from "express";
import { getDashboard } from "../services/dashboardService.js";

export const dashboardRouter = Router();

dashboardRouter.get("/", (_req, res) => {
  res.json(getDashboard());
});
