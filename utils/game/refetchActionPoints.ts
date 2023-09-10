export const refetchActionPoints = async (): Promise<number> => {
  const response = await fetch("/api/db/turn", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.totalActionPoints;
};
