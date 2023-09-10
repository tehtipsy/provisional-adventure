export const updateRoundCountInDatabase = async (newRoundCount: number) => {
  // Post Round Count To turn MongoDB Doc
  await fetch("/api/db/turn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roundCount: newRoundCount }),
  });
};
