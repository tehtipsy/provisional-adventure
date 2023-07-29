import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

interface Turn {
  _id: ObjectId;
  players: string[];
  currentPlayer: string;
}

export default async function handler( // actionHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetched /api/db/turn-action");

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

  const data = req.body; // add validation
  const { name, username, timestamp } = data;

  if (name === "endTurn") {
    // get current game state from database
    const game = (await mongo
      .db("test")
      .collection("turn")
      .findOne({
        _id: new ObjectId("64c535bb18f09cf42315a969"),
      })) as Turn | null;
    
    if (game) {
      const { players, currentPlayer } = game;

      // find index of current player
      const currentPlayerIndex = players.indexOf(currentPlayer);

      // determine next player
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const nextPlayer = players[nextPlayerIndex];

      // update currentPlayer field in database
      await mongo
        .db("test")
        .collection("turn")
        .updateOne(
          { _id: new ObjectId("64c535bb18f09cf42315a969") },
          { $set: { currentPlayer: nextPlayer } }
      );

      res.json({ success: true });
    } else {
      const action = await mongo
        .db("test") // move DB to .env
        .collection("actions")
        .insertOne(data);

      return res.status(200).json(action);
    }
  }
}
