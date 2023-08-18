import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@/utils/mongodb";

import * as dotenv from "dotenv";

dotenv.config();

export default async function handler( // woundsHandler
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("fetching /api/db/wounds");

  const { client, db } = await connectToDatabase();

  if (req.method === "GET") {
    const { bodyPart, damageType } = req.query;
    console.log(req.query);
    console.log(bodyPart, damageType);
    const attackConfig = await db
      .collection("wounds")
      .findOne({ bodyPart: bodyPart, damageType: damageType });

    await client.close();

    return res.status(200).json({ attackConfig });
  } else if (req.method === "POST") {
  }
}
