import { config as dotenvConfig } from "dotenv";

dotenvConfig(); // Load environment variables from .env file

export class ConfigService {
  private readonly envConfig: NodeJS.ProcessEnv;

  constructor() {
    this.envConfig = process.env;
    if (!this.envConfig) {
      throw new Error("Failed to load environment variables");
    }
  }

  get(key: string, defaultValue?: string): string {
    const value = this.envConfig[key];
    if (!value && defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value || defaultValue!;
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
