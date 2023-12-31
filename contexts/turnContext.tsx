import { useState, createContext, ReactNode, useEffect } from "react";

interface TurnContextProps {
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  roundCount: number;
  setRoundCount: (roundCount: number) => void;
  totalActionPoints: number;
  setTotalActionPoints: (totalActionPoints: number) => void;
}

export const TurnContext = createContext<TurnContextProps>({
  currentPlayer: "",
  setCurrentPlayer: () => {},
  roundCount: 0,
  setRoundCount: () => {},
  totalActionPoints: 0,
  setTotalActionPoints: () => {},
});

interface TurnContextProviderProps {
  children: ReactNode;
}

export const TurnContextProvider = (props: TurnContextProviderProps) => {
  console.log("Loading TurnContextProvider");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [roundCount, setRoundCount] = useState(0);
  const [totalActionPoints, setTotalActionPoints] = useState(0);

  useEffect(() => {
    // fix this garbaje
    console.log("Fetching TurnData from database");
    const fetchTurnData = async () => {
      const response = await fetch("/api/db/turn");
      const data = await response.json();
      setCurrentPlayer(data.currentPlayer);
      setRoundCount(data.roundCount);
      setTotalActionPoints(data.totalActionPoints);
      console.log(data.currentPlayer);
      console.log(data.roundCount);
    };
    fetchTurnData();
  }, []);

  const value = {
    currentPlayer,
    setCurrentPlayer,
    roundCount,
    setRoundCount,
    totalActionPoints,
    setTotalActionPoints,
  };

  return (
    <TurnContext.Provider value={value}>{props.children}</TurnContext.Provider>
  );
};
