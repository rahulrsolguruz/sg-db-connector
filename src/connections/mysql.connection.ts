import mysql, { Pool } from "mysql2/promise";
import { IConnection } from "../interfaces/connection.interface";
import { configService } from "../config/database.config";

export class MySQLConnection implements IConnection {
  private pool: Pool;

  constructor(private url: string = configService.get("MYSQL_URL")) {
    if (!url) {
      throw new Error("MySQL connection URL is not defined");
    }
    this.pool = mysql.createPool({ uri: url });
  }

  async connect(): Promise<void> {
    try {
      const connection = await this.pool.getConnection();
      console.log("Connected to MySQL");
      connection.release();
    } catch (error) {
      console.error("Error connecting to MySQL:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
      console.log("Disconnected from MySQL");
    } catch (error) {
      console.error("Error disconnecting from MySQL:", error);
      throw error;
    }
  }
}
