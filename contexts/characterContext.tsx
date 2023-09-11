import {createContext, ReactNode } from "react";
import useCharacterState from "@/utils/game/useCharacterState";
import { CharacterProps } from "@/utils/props/CharacterProps";

interface CharacterContextProps {
  character: CharacterProps | null;
  setCharacter: (character: CharacterProps | null) => void;
}

export const CharacterContext = createContext<CharacterContextProps>({
  character: null,
  setCharacter: () => {},
});

interface CharacterContextProviderProps {
  children: ReactNode;
}

export const CharacterContextProvider = (props: CharacterContextProviderProps) => {
  const { character, setCharacter } = useCharacterState();

  const value = {
    character,
    setCharacter,
  };

  return (
    <CharacterContext.Provider value={value}>
      {props.children}
    </CharacterContext.Provider>
  );
};
