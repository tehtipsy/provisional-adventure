import { useState } from "react";
import Button from "@/components/ui/button";

type EndTurnButtonProps = {
  endTurn: (username: string) => void;
  username: string;
};

export default function EndTurnButton({ endTurn, username }: EndTurnButtonProps) {
  const [buttonText, setButtonText] = useState("End Turn");

  const handleClick = () => {
    endTurn(username);
    setButtonText("Not Your Turn");
  };

  return (
    <Button
      className="bg-red-500 hover:bg-red-700"
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
}
