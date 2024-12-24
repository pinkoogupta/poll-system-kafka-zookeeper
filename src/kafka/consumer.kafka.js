import kafka from "kafka-node";
import { updatePollCount, getPollById } from "../models/Poll.model.js";
import { broadcastUpdate } from "../websockets/webSocketServer.js";

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "poll-votes" }], { autoCommit: true });

consumer.on("message", async (message) => {
  try {
    // console.log("Received message:", message.value);
    const { pollId, option } = JSON.parse(message.value); // Parse the message
    // console.log(`Poll ID: ${pollId}, Option: ${option}`); 
    await updatePollCount(pollId, option);
    const pollData = await getPollById(pollId); 
    broadcastUpdate(pollId, pollData);
  } catch (error) {
    console.error("Error processing message (consumer):", error);
  }
});

export const initKafkaConsumer = () => 
  consumer.on("error", (err) => console.error("Kafka Consumer error:", err));
