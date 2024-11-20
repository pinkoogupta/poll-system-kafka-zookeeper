import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => console.log("Kafka Producer is ready"));
producer.on("error", (err) => console.error("Kafka Producer error:", err));

export const sendVoteMessage = (message) => {
  const payloads = [{ topic: "poll-votes", messages: JSON.stringify(message) }];
  producer.send(payloads, (err) => {
    if (err) console.error("Error sending vote message:", err);
  });
};







