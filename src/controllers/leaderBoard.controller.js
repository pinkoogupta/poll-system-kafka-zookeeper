import { getLeaderboard as fetchlLeaderboard } from "../models/leaderBoard.model.js";

export const getLeaderboard = async (req, res) => {
  const leaderboard = await fetchlLeaderboard();
  res.json(leaderboard);
};
