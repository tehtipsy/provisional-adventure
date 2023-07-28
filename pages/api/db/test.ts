import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("/api/db/test");

  if (!process.env.MONGO_DB_CONNECTION_STRING) {
    return res
      .status(500)
      .setHeader("content-type", "application/json")
      .json({
        errorMessage: `Missing environment MONGO_DB_CONNECTION_STRING variable.
                If you're running locally, please ensure you have a ./.env file with a value for MONGO_DB_CONNECTION_STRING.`,
      });
  }

  const mongo = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

  await mongo.connect();

  const collections = await mongo
    .db("test")
    .collection("test")
    .find()
    .toArray();

  return res.status(200).json(collections);
}
