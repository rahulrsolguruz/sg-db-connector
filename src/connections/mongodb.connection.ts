import { MongoClient } from "mongodb";
import { config } from "dotenv";

config(); // Load environment variables from .env file

export class MongoDBConnection {
  private client: MongoClient;

  constructor(connectionString?: string) {
    const connString = connectionString || process.env.MONGODB_URL;

    if (!connString) {
      throw new Error("MongoDB connection string is required");
    }

    this.client = new MongoClient(connString);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}
