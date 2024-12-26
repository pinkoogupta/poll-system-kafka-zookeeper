# Polling System with Kafka, Zookeeper, WebSockets, and PostgreSQL

This project implements a polling system capable of handling multiple users voting in real-time. It ensures reliability and resilience, utilizing Kafka and Zookeeper for message handling and fault tolerance, PostgreSQL for data storage, and WebSockets to deliver real-time updates.

## Features

- Create polls with options
- Vote on polls and store votes in Kafka
- Real-time poll updates via WebSockets
- Leaderboard feature to show the most voted options across all polls
- Fault-tolerant voting using Kafka and Zookeeper

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/pinkoogupta/poll-system-kafka-zookeeper.git
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Set Up PostgreSQL Database
Create a database in postgresql named "polling" in pgAdmin, after creating run this query
```bash
-- Create polls table
CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create poll_options table
CREATE TABLE poll_options (
    id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES polls(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    vote_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create votes table
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES polls(id) ON DELETE CASCADE,
    option_id INT REFERENCES poll_options(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard view: Aggregates vote counts for each option across all polls
CREATE VIEW leaderboard AS
SELECT 
    p.id AS poll_id,
    o.option_text,
    o.vote_count,
    RANK() OVER (ORDER BY o.vote_count DESC) AS rank
FROM 
    polls p
JOIN 
    poll_options o ON p.id = o.poll_id
ORDER BY 
    o.vote_count DESC;
```
then, run this seperately from the above code.
```
ALTER TABLE polls ADD COLUMN options JSONB;
```
### 4. Edit db.js

```bash
import pkg from "pg";  // Import the entire 'pg' module
const { Pool } = pkg; // Destructure to get the 'Pool' class

const pool = new Pool({
  user: "user name",
  host: "localhost",
  database: "polling_system",
  password: "password",
  port: 5432,
});

export default pool;

```
### 5. Set Up Kafka with Zookeeper
```bash
# Start Zookeeper
zookeeper-server-start.bat ..\..\config\zookeeper.properties

# Start Kafka
kafka-server-start.bat ..\..\config\server.properties

```
In kafla folder, navigate to .\bin\windows\ and run this command in cmd 
```bash
.\kafka-topics.bat --create --topic votes --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```
### 6. Start the server
```bash
npm start
```
### 7. Testing APIs
Please connect your postman throught the localhost by postman desktop agent, then you'll be able to test the api's. (Postman doc is attached on top)
```bash
/polls -> create polls.
/polls/:id/vote -> vote on poll using specific id of poll.
/polls/:id -> get the votes on a specific polls.
/leaderboard/ -> get details of best polls with count.
```
