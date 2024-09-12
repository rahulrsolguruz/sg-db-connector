import { Client } from "pg";
import { IConnection } from "../interfaces/connection.interface";
import { configService } from "../config/database.config";

export class PostgreSQLConnection implements IConnection {
  private client: Client;

  constructor(private url: string = configService.get("POSTGRES_URL")) {
    if (!url) {
      throw new Error("PostgreSQL connection URL is not defined");
    }
    this.client = new Client({ connectionString: url });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to PostgreSQL");
    } catch (error) {
      console.error("Error connecting to PostgreSQL:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.end();
      console.log("Disconnected from PostgreSQL");
    } catch (error) {
      console.error("Error disconnecting from PostgreSQL:", error);
      throw error;
    }
  }
}
