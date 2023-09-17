import { useState, createContext, ReactNode, useEffect } from "react";

interface TurnContextProps {
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  roundCount: number;
  setRoundCount: (roundCount: number) => void;
  totalActionPoints: number;
  setTotalActionPoints: (totalActionPoints: number) => void;
}

export const TurnContext = createContext<Partial<TurnContextProps>>({
})

interface TurnContextProviderProps {
  children: ReactNode;
}

export const TurnContextProvider = (props: TurnContextProviderProps) => {
  console.log("Loading TurnContextProvider"); 
  // move everything to useStateHook
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [roundCount, setRoundCount] = useState(0);
  const [totalActionPoints, setTotalActionPoints] = useState(0);

  useEffect(() => {
    // fix this garbaje
    const fetchTurnData = async () => {
      console.log("Fetching TurnData from database");
      const response = await fetch("/api/db/turn");
      const data = await response.json();
      setCurrentPlayer(data.currentPlayer);
      setRoundCount(data.roundCount);
      setTotalActionPoints(data.totalActionPoints);
      console.log(data.currentPlayer);
      console.log(data.totalActionPoints);
      console.log(data.roundCount);
    };
    fetchTurnData();
  }, []);

  // fix this garbaje too
  useEffect(() => {
    console.log(currentPlayer);
  }, [currentPlayer]);
  useEffect(() => {
    console.log(roundCount);
  }, [roundCount]);
  useEffect(() => {
    console.log(totalActionPoints);
  }, [totalActionPoints]);

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
