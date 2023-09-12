export const updateRoundCountInDatabase = async (newRoundCount: number) => {
  await fetch("/api/db/turn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roundCount: newRoundCount }),
  });
};
