import express from "express";
import { getAnalyticsData } from "../controllers/AnalyticController.js";

const router = express.Router();

router.get("/", getAnalyticsData);

export default router;
