// Post Online Users To turn MongoDB Doc
export const updateTurnPlayersInDatabase = async (onlineUsers: string[]) => {
  await fetch("/api/db/turn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ players: onlineUsers }),
  });
};
