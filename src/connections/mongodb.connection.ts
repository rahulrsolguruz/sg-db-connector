import { MongoClient, MongoClientOptions } from "mongodb";
import { IConnection } from "../interfaces/connection.interface";
import { configService } from "../config/database.config";

export class MongoDBConnection implements IConnection {
  private client: MongoClient;

  constructor(private url: string = configService.get("MONGODB_URL")) {
    if (!url) {
      throw new Error("MongoDB connection URL is not defined");
    }
    const options: MongoClientOptions = {};
    this.client = new MongoClient(url, options);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }
}
