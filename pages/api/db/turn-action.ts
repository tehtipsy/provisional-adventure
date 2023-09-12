import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/mongodb";
import * as dotenv from "dotenv";
import { setNextPlayer } from "@/utils/db/setNextPlayer";
import { TurnProps } from "@/utils/props/GameProps";

dotenv.config();

export default async function handler( // actionHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetching /api/db/turn-action");

  const { client, db } = await connectToDatabase();

  if (!db) return;

  const data = req.body; // add validation
  const { action, username, timestamp } = data;

  if (action === "endTurn") {
    // get current game state from database
    const game = (await db.collection("turn").findOne({})) as TurnProps | null;

    if (game) {
      const { players, currentPlayer } = game;
      const nextPlayer = setNextPlayer(players, currentPlayer);

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
