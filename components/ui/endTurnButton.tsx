import { useState } from "react";
import Button from "@/components/ui/button";

type EndTurnButtonProps = {
  endTurn: (username: string) => void;
  username: string;
};

export default function EndTurnButton({ endTurn, username }: EndTurnButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    endTurn(username);
    setIsClicked(true);
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
