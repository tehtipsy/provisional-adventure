import { useState } from "react";
import Button from "@/components/ui/button";

type PokeButtonProps = {
  sendPoke: (username: string) => void;
  username: string;
};

export default function PokeButton({ sendPoke, username }: PokeButtonProps) {
  const [buttonText, setButtonText] = useState("Poke");
  const initialState = "Poke";

  const handleClick = () => {
    sendPoke(username);
    setButtonText("Poked");
    setTimeout(() => setButtonText(initialState), 1000);
  };

  return <Button onClick={handleClick}>{buttonText}</Button>;
}
