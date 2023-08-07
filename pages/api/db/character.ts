import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/mongodb";

import * as dotenv from "dotenv";

dotenv.config();

export default async function handler( // CharacterSheetHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetching /api/db/character");

  const { client, db } = await connectToDatabase();

  if (req.method === "GET") {
    const { name } = req.query
    const characterSheet = await db.collection("character-sheets").findOne({name: name});

    await client.close();
    
    if (characterSheet === null ) {
      return res.status(200).json({ message: "User does not have a character sheet" });
    }
    return res.status(200).json({ characterSheet: characterSheet });
  } else if (req.method === "POST") {
    const data = req.body;
    const { sender, receiver } = data; // from poke event

    const updatedCharacterData = await db
      .collection("character-sheets")
      .findOneAndUpdate(
        { name: receiver },
        { $inc: { actionPoints: 1 } },
        { returnDocument: "after" }
      );

    const updatedSenderCharacterData = await db
      .collection("character-sheets")
      .findOneAndUpdate(
        { name: sender },
        { $inc: { actionPoints: -1 } },
        { returnDocument: "after" }
      );

    await client.close();

    // Send updated character data to client
    return res.status(200).json({
      updatedCharacterData: updatedCharacterData,
      updatedSenderCharacterData: updatedSenderCharacterData
    });
  }
}
