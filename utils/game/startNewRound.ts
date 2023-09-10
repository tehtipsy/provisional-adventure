import { updateRoundCountInDatabase } from "@/utils/game/updateRoundCountInDatabase";

export const startNewRound = async (roundCount: number) => {
  await updateRoundCountInDatabase(roundCount);
  // update action points total and current player?
  const response = await fetch("/api/db/turn");
  const data = await response.json();
  return data;
};
