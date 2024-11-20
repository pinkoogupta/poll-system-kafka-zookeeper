import pkg from "pg";  // Import the entire 'pg' module
const { Pool } = pkg; // Destructure to get the 'Pool' class

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "poll-system",
  password: "pinkoo1234",
  port: 5500,
});

export default pool;
