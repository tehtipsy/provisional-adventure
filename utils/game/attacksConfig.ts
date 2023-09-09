import * as dotenv from "dotenv";

dotenv.config();

export const fetchAttackObject = async (
  damageType: string,
  bodyPart: string
) => {
  if (!process.env.VERCEL_BRANCH_URL) {
    throw new Error(`Missing environment SERVER_BASE_URL variable.
              If you're running locally, please ensure you have a ./.env file with a value for SERVER_BASE_URL.`);
  }
  const params = new URLSearchParams({
    damageType: damageType,
    bodyPart: bodyPart,
  });
  const response = await fetch(
    `http://${process.env.VERCEL_BRANCH_URL}/api/db/wounds?${params}`
  );
  const attackConfig = await response.json();
  // console.log("fetched Attack Config: ", attackConfig);
  return attackConfig;
};
