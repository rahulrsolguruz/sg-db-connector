import sqlite3, { Database } from "sqlite3";
import { IConnection } from "../interfaces/connection.interface";
import { configService } from "../config/database.config";

export class SQLiteConnection implements IConnection {
  private db: Database;

  constructor(private url: string = configService.get("SQLITE_URL")) {
    if (!url) {
      throw new Error("SQLite connection URL is not defined");
    }
    this.db = new sqlite3.Database(url, (err) => {
      if (err) {
        console.error("Error opening SQLite database:", err.message);
        throw err;
      }
      console.log("Connected to SQLite");
    });
  }

  async connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.get("SELECT 1", (err) => {
          if (err) {
            console.error("Error connecting to SQLite:", err.message);
            reject(err);
          } else {
            console.log("Connected to SQLite");
            resolve();
          }
        });
      });
    });
  }

  async disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          console.error("Error disconnecting from SQLite:", err.message);
          reject(err);
        } else {
          console.log("Disconnected from SQLite");
          resolve();
        }
      });
    });
  }
}
