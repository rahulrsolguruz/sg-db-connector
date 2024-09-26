import { createPool, Pool } from "mysql2/promise";
import { config } from "dotenv";
import { URL } from "url";

config(); // Load environment variables from .env file

export class MySQLConnection {
  private pool: Pool;

  constructor(connectionString?: string) {
    if (connectionString) {
      try {
        const parsedUrl = new URL(connectionString);
        const [user, password] = parsedUrl.username
          ? [parsedUrl.username, parsedUrl.password]
          : ["", ""];
        const host = parsedUrl.hostname;
        const database = parsedUrl.pathname.substring(1); // Remove the leading slash

        if (!host || !user || !password || !database) {
          throw new Error("Invalid MySQL connection string");
        }

        this.pool = createPool({
          host,
          user,
          password,
          database,
        });
      } catch (err) {
        throw new Error("Failed to parse MySQL connection string");
      }
    } else {
      const host = process.env.DB_HOST;
      const user = process.env.DB_USERNAME;
      const password = process.env.DB_PASSWORD;
      const database = process.env.DB_NAME;

      if (!host || !user || !password || !database) {
        throw new Error("Missing MySQL database configuration");
      }

      this.pool = createPool({
        host,
        user,
        password,
        database,
      });
    }
  }

  async connect(): Promise<void> {
    try {
      const connection = await this.pool.getConnection();
      console.log("MySQL connected");
      connection.release(); // Release the connection back to the pool
    } catch (error) {
      console.error("MySQL connection error:", error);
      throw new Error("Failed to connect to MySQL"); // Propagating the error
    }
  }

  async close(): Promise<void> {
    try {
      await this.pool.end(); // Close the pool to gracefully shutdown
      console.log("MySQL pool closed");
    } catch (error) {
      console.error("MySQL pool closing error:", error);
      throw new Error("Failed to close MySQL connection pool");
    }
  }

  getPool(): Pool {
    return this.pool;
  }
}
