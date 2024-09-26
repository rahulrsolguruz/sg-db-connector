import { Pool } from "pg";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export class PostgreSQLConnection {
  private pool: Pool;

  constructor(connectionString?: string) {
    const connString = connectionString || process.env.DATABASE_URL;

    if (connString) {
      this.pool = new Pool({ connectionString: connString });
    } else {
      const host = process.env.DB_HOST;
      const port = parseInt(process.env.DB_PORT || "5432", 10);
      const user = process.env.DB_USERNAME;
      const password = process.env.DB_PASSWORD;
      const database = process.env.DB_NAME;

      if (!host || !user || !password || !database) {
        throw new Error("Missing PostgreSQL database configuration");
      }

      this.pool = new Pool({
        host,
        port,
        user,
        password,
        database,
      });
    }
  }

  async connect(): Promise<void> {
    try {
      const client = await this.pool.connect();
      console.log("PostgreSQL connected");
      client.release(); // Release the connection back to the pool
    } catch (error) {
      console.error("PostgreSQL connection error:", error);
      throw new Error("Failed to connect to PostgreSQL"); // Propagate the error
    }
  }

  async close(): Promise<void> {
    try {
      await this.pool.end(); // Close the pool to gracefully shut down
      console.log("PostgreSQL pool closed");
    } catch (error) {
      console.error("Error closing PostgreSQL pool:", error);
      throw new Error("Failed to close PostgreSQL connection pool");
    }
  }

  getPool(): Pool {
    return this.pool;
  }
}
