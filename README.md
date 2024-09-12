````markdown
# SG DB Connector

`sg-db-connector` is a flexible, environment-driven npm package that facilitates easy connections to various databases like PostgreSQL, MySQL, MongoDB, and SQLite. This package follows SOLID principles and is designed to be simple, modular, and easy to integrate into any Node.js project.

## Features

- Supports multiple databases (PostgreSQL, MySQL, MongoDB, and SQLite).
- Configurable via environment variables.
- Provides a clean and consistent interface for database connections.
- Easy to integrate into any Node.js project.
- Includes logging functionality using `winston` for monitoring and debugging.
- Follows Clean Code and SOLID principles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Environment Configuration](#environment-configuration)
  - [Connecting to Databases](#connecting-to-databases)
- [Logging](#logging)
- [Examples](#examples)
- [License](#license)

## Installation

To install the package, run the following command:

```bash
npm install sg-db-connector
```
````

## Usage

### Environment Configuration

Before using this package, you need to set up your environment variables in a `.env` file. This file should include URLs for the databases you want to connect to:

```env
# PostgreSQL connection string
POSTGRES_URL=postgres://user:password@localhost:5432/mydatabase

# MySQL connection string
MYSQL_URL=mysql://user:password@localhost:3306/mydatabase

# MongoDB connection string
MONGODB_URL=mongodb://localhost:27017/mydatabase

# SQLite file path
SQLITE_URL=./mydatabase.db
```

### Connecting to Databases

You can import the connection classes provided by this package and connect to different databases as needed.

```typescript
import { PostgreSQLConnection } from "sg-db-connector/src/connections/postgresql.connection";
import { MySQLConnection } from "sg-db-connector/src/connections/mysql.connection";
import { MongoDBConnection } from "sg-db-connector/src/connections/mongodb.connection";
import { SQLiteConnection } from "sg-db-connector/src/connections/sqlite.connection";

// PostgreSQL
const postgresConnection = new PostgreSQLConnection();
await postgresConnection.connect();
await postgresConnection.disconnect();

// MySQL
const mysqlConnection = new MySQLConnection();
await mysqlConnection.connect();
await mysqlConnection.disconnect();

// MongoDB
const mongoConnection = new MongoDBConnection();
await mongoConnection.connect();
await mongoConnection.disconnect();

// SQLite
const sqliteConnection = new SQLiteConnection();
await sqliteConnection.connect();
await sqliteConnection.disconnect();
```

## Logging

This package includes a built-in logger using the `winston` library. You can use it for logging messages, warnings, errors, and debug information.

### Example:

```typescript
import logger from "sg-db-connector/src/utils/logger";

logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
logger.debug("This is a debug message");
```

## Examples

### Connecting to PostgreSQL:

```typescript
import { PostgreSQLConnection } from "sg-db-connector/src/connections/postgresql.connection";

async function main() {
  const postgresConnection = new PostgreSQLConnection();
  await postgresConnection.connect();

  // Perform your database operations here

  await postgresConnection.disconnect();
}

main();
```

### Connecting to MySQL:

```typescript
import { MySQLConnection } from "sg-db-connector/src/connections/mysql.connection";

async function main() {
  const mysqlConnection = new MySQLConnection();
  await mysqlConnection.connect();

  // Perform your database operations here

  await mysqlConnection.disconnect();
}

main();
```

### Author

SolGuruz® LLP

### Developer

Rahul Rathod
