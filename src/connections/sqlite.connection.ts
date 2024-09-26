import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export class SQLiteConnection {
  private db: Database | undefined;

  constructor(private dbFilePath?: string) {
    this.dbFilePath = dbFilePath || process.env.DB_FILE_PATH;

    if (!this.dbFilePath) {
      throw new Error("Database file path is required");
    }
  }

  async connect(): Promise<void> {
    if (!this.dbFilePath) {
      throw new Error("Database file path is required");
    }

    try {
      this.db = await open({
        filename: this.dbFilePath,
        driver: sqlite3.Database,
      });
      console.log("SQLite connected");
    } catch (error) {
      console.error("SQLite connection error:", error);
      throw new Error("Failed to connect to SQLite"); // Propagating the error
    }
  }

  async close(): Promise<void> {
    if (!this.db) {
      throw new Error("No SQLite connection to close");
    }

    try {
      await this.db.close();
      console.log("SQLite connection closed");
    } catch (error) {
      console.error("SQLite closing error:", error);
      throw new Error("Failed to close SQLite connection"); // Propagating the error
    }
  }

  getDatabase(): Database | undefined {
    return this.db;
  }
}
