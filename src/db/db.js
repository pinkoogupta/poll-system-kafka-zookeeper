import pkg from "pg";  // Import the entire 'pg' module
const { Pool } = pkg; // Destructure to get the 'Pool' class

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "polling_system",
  password: "pinkoo1234",
  port: 5432,
});

export default pool;
