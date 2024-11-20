import express from "express";
import { createPoll, vote, getPollResults } from "../controllers/poll.controller.js";

const router = express.Router();

router.post("/", createPoll);
router.post("/:id/vote", vote);
router.get("/:id", getPollResults);

export default router;
