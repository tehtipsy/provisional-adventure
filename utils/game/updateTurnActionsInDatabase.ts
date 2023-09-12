import { ActionMetaDataProps } from "@/utils/props/ActionResolverProps";

export const updateTurnActionsInDatabase = async (
  data: ActionMetaDataProps
) => {
  return await fetch("/api/db/turn-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
