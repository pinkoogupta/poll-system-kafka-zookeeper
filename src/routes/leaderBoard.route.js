import express from "express";
import { getLeaderboard } from "../controllers/leaderBoard.controller.js";

const router = express.Router();

router.get("/", getLeaderboard);

export default router;
