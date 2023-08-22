import { useState, createContext, ReactNode, useEffect } from "react";

interface TurnContextProps {
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  roundCount: number;
  setRoundCount: (roundCount: number) => void;
}

export const TurnContext = createContext<TurnContextProps>({
  currentPlayer: "",
  setCurrentPlayer: () => {},
  roundCount: 0,
  setRoundCount: () => {},
});

interface TurnContextProviderProps {
  children: ReactNode;
}

export const TurnContextProvider = (props: TurnContextProviderProps) => {
  console.log("Loading TurnContextProvider");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [roundCount, setRoundCount] = useState(0);

  useEffect(() => {
    // fix this garbaje
    console.log("Fetching currentPlayer from database");
    const fetchCurrentPlayer = async () => {
      const response = await fetch("/api/db/turn");
      const data = await response.json();
      setCurrentPlayer(data.currentPlayer);
      setRoundCount(data.roundCount);
      console.log(data.currentPlayer);
      console.log(data.roundCount);
    };
    fetchCurrentPlayer();
  }, []);

  const value = {
    currentPlayer,
    setCurrentPlayer,
    roundCount,
    setRoundCount,
  };

  return (
    <TurnContext.Provider value={value}>{props.children}</TurnContext.Provider>
  );
};
