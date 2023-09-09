import { useCallback } from "react";

export const updateTurnPlayersInDatabase = useCallback(
  async (onlineUsers: string[]) => {
    // Post Online Users To turn MongoDB Doc
    await fetch("/api/db/turn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players: onlineUsers }),
    });
  },
  []
);
