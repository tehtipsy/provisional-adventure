import { updateTurnActionsInDatabase } from "@/utils/game/updateTurnActionsInDatabase";
import { ActionMetaDataProps } from "@/utils/props/ActionResolverProps";

export const endTurn = async (user: string) => {
  const data: ActionMetaDataProps = {
    timestamp: new Date().toISOString(),
    action: "endTurn",
    username: user,
  };

  const response = await updateTurnActionsInDatabase(data);
  const result = await response.json();
  if (result.success) return result.currentPlayer;

  return new Error("No Response From turn-action DB Endpoint");
};
