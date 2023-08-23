import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/mongodb";

import * as dotenv from "dotenv";

dotenv.config();

export default async function handler( // turnDataHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetching /api/db/turn");

  const { client, db } = await connectToDatabase();

  if (req.method === "GET") {
    const turnData = await db.collection("turn").findOne({});

    await client.close();

    return res.status(200).json({
      currentPlayer: turnData?.currentPlayer,
      roundCount: turnData?.roundCount,
      totalActionPoints: turnData?.totalActionPoints,
    });
  } else if (req.method === "POST") {
    const data = req.body;
    if (data.actionPoints) {
      await db
        .collection("turn")
        .updateOne({}, { $inc: { ...data.actionPoints } });
    }

    await db.collection("turn").updateOne({}, { $set: { ...data } });

    await client.close();

    return res.status(200).json({ message: "Turn data updated successfully!" });
  }
}
