import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export class SQLiteConnection {
  private db: Database | undefined;

  constructor(private dbFilePath?: string) {
    if (!dbFilePath) {
      dbFilePath = process.env.DB_FILE_PATH;
    }
  }

  async connect() {
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
    }
  }
}
