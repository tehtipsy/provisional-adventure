export const setNextPlayer = (players: string[], currentPlayer: string) => {
  return players[(players.indexOf(currentPlayer) + 1) % players.length];
};
