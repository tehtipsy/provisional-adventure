import {createContext, ReactNode } from "react";
import useCharacterState from "@/utils/game/useCharacterState";
import { CharacterState } from "@/utils/props/CharacterProps";

interface CharacterContextProps extends CharacterState {}

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
