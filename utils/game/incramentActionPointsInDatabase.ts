export const incramentActionPointsInDatabase = async (actionPoints:{totalActionPoints: number}) => {
  await fetch("/api/db/turn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionPoints: actionPoints }),
  });
};
