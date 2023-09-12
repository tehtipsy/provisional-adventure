import {createContext, ReactNode } from "react";
import useCharacterState from "@/utils/game/useCharacterState";
import { CharacterProps } from "@/utils/props/CharacterProps";

interface CharacterContextProps {
  character: CharacterProps | null;
  setCharacter: (character: CharacterProps | null) => void;
  totalFocus: number;
  totalProwess: number;
  weaponName: string;
  damageRating: number;
  damageTypeArray: string[] | [];
  actionPoints: number;
  characterEncumbrance: number;
}

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
