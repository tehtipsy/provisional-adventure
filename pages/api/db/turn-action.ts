import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/mongodb";
import * as dotenv from "dotenv";

dotenv.config();

interface Turn {
  players: string[];
  currentPlayer: string;
}

export default async function handler( // actionHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetched /api/db/turn-action");

  const { client, db } = await connectToDatabase();

  if (!db) return;

  const data = req.body; // add validation
  const { name, username, timestamp } = data;

  if (name === "endTurn") {
    // get current game state from database
    const game = (await db.collection("turn").findOne({})) as Turn | null;

    if (game) {
      const { players, currentPlayer } = game;

      // find index of current player
      const currentPlayerIndex = players.indexOf(currentPlayer);

      // determine next player
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const nextPlayer = players[nextPlayerIndex];

      await db
        .collection("turn")
        .updateOne({}, { $set: { currentPlayer: nextPlayer } });

      await client.close();

      res.json({ success: true, currentPlayer: nextPlayer });
    } else {
      const action = await db.collection("actions").insertOne(data);

      await client.close();

      return res.status(200).json(action);
    }
  }
}
