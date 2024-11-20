import express from "express";
import pollRoutes from "./routes/poll.route.js";
import leaderboardRoutes from "./routes/leaderBoard.route.js";
import { initWebSocketServer } from "./webSockets/webSocketServer.js";
import { initKafkaConsumer } from "./kafka/consumer.kafka.js";

const app = express();
app.use(express.json());

app.use("/polls", pollRoutes);
app.use("/leaderboard", leaderboardRoutes);

const server = app.listen(3000, () => console.log("Server running on port 3000"));

initWebSocketServer(server);
initKafkaConsumer();
