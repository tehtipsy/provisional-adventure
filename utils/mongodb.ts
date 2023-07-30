import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

interface DatabaseConnection {
  client: MongoClient;
  db: Db;
}

export async function connectToDatabase(): Promise<DatabaseConnection> {
  if (!process.env.MONGO_DB_CONNECTION_STRING) {
    throw new Error(`Missing environment MONGO_DB_CONNECTION_STRING variable.
                If you're running locally, please ensure you have a ./.env file with a value for MONGO_DB_CONNECTION_STRING.`);
  }

  if (!process.env.MONGODB_DB) {
    throw new Error(`Missing environment MONGODB_DB variable.
      If you're running locally, please ensure you have a ./.env file with a value for MONGODB_DB.`);
  }

  const client = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB);

  return { client, db };
}
