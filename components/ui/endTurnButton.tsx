import { useContext, useState } from "react";
import Button from "@/components/ui/button";
import { TurnContext } from "@/contexts/turnContext";

type EndTurnButtonProps = {
  endTurn: (username: string) => Promise<string>;
  username: string;
};

export default function EndTurnButton({
  endTurn,
  username,
}: EndTurnButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const { setCurrentPlayer } = useContext(TurnContext); // move to GameChannlsState?

  const handleClick = async() => {
    setIsClicked(true);
    const newPlayer = await endTurn(username);
    if (setCurrentPlayer) setCurrentPlayer(newPlayer);
  };

  return (
    <Button
      className={`bg-red-500 hover:bg-red-700 ${
        isClicked ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isClicked}
      onClick={handleClick}
    >
      End Turn
    </Button>
  );
}
