import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler( // turnDataHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetched /api/db/turn");

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
  `^^^ Move to { connectToDatabase } from '@/utils/mongodb' ^^^`;

  if (req.method === "GET") {
    const turnData = await mongo
      .db("test")
      .collection("turn")
      .findOne({ _id: new ObjectId("64c535bb18f09cf42315a969") });

    return res.status(200).json({ currentPlayer: turnData?.currentPlayer });
  } else if (req.method === "POST") {
    const { players } = req.body;

    const savePlayers = await mongo
      .db("test") // move DB to .env
      .collection("turn")
      .updateOne(
        { _id: new ObjectId("64c535bb18f09cf42315a969") },
        { $set: { players } }
      );

    return res.status(200).json({ message: "Turn data updated successfully!" });
  }
}
