const endTurn = async (user: string) => {
  const data = {
    name: "endTurn",
    username: user,
    timestamp: new Date().toISOString(),
  };

  const response = await fetch("/api/db/turn-action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (result.success) return result.currentPlayer;

  return new Error("No Response From turn-action DB Endpoint");
};
