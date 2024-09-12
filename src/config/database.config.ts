import { config as dotenvConfig } from "dotenv";

dotenvConfig(); // Load environment variables from .env file

export class ConfigService {
  private readonly envConfig: { [key: string]: string | undefined };

  constructor() {
    this.envConfig = process.env;
  }

  get(key: string): string {
    const value = this.envConfig[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  getDatabaseConfig(): { [key: string]: string } {
    return {
      postgresUrl: this.get("POSTGRES_URL"),
      mysqlUrl: this.get("MYSQL_URL"),
      mongodbUrl: this.get("MONGODB_URL"),
      sqliteUrl: this.get("SQLITE_URL"),
    };
  }
}

export const configService = new ConfigService();
