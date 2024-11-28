import pkg from "pg";  // Import the entire 'pg' module
const { Pool } = pkg; // Destructure to get the 'Pool' class

const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "database name",
  password: "password",
  port: 5432,
});

export default pool;
