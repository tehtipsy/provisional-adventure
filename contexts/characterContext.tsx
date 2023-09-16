import {createContext, ReactNode } from "react";
import useCharacterState from "@/utils/game/useCharacterState";
import { AttributesProps, CharacterProps } from "@/utils/props/CharacterProps";
import { ItemProps } from "@/utils/props/ItemsProps";

interface AttributesTotalsProps {
  [key: string]: number;
}

interface CharacterContextProps {
  character: CharacterProps | null;
  setCharacter: (character: CharacterProps | null) => void;
  attributes: AttributesProps;
  attributesTotals: AttributesTotalsProps;
  totalFocus: number;
  totalProwess: number;
  totalFiness: number;
  totalConstitution: number;
  totalWillpower: number;
  totalMotivation: number;
  weaponName: string;
  weaponQuantity: number;
  damageRating: number;
  damageTypeArray: string[] | [];
  actionPoints: number;
  characterEncumbrance: number;
  handsSlot: ItemProps;
  characterName: string;
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
