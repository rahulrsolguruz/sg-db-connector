import { createPool, Pool } from "mysql2/promise";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export class MySQLConnection {
  private pool: Pool;

  constructor(connectionString?: string) {
    if (connectionString) {
      const [userInfo, hostInfo] = connectionString.split("@");
      const [user, password] = userInfo.split(":");
      const [host, database] = hostInfo.split("/");
      this.pool = createPool({
        host,
        user,
        password,
        database,
      });
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

  async connect() {
    try {
      await this.pool.getConnection();
      console.log("MySQL connected");
    } catch (error) {
      console.error("MySQL connection error:", error);
    }
  }
}
