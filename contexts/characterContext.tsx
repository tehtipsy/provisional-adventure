import {createContext, ReactNode } from "react";
import useCharacterState from "@/utils/game/useCharacterState";
import { CharacterContextProps } from "@/utils/props/CharacterProps";

export const CharacterContext = createContext<Partial<CharacterContextProps>>(
  {}
);

interface CharacterContextProviderProps {
  children: ReactNode;
}

export const CharacterContextProvider = (props: CharacterContextProviderProps) => {
  const characterState = useCharacterState();

  return (
    <CharacterContext.Provider value={characterState}>
      {props.children}
    </CharacterContext.Provider>
  );
};
