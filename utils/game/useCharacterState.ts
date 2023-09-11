import { useEffect, useState } from "react";
import { AttributeProps, CharacterProps } from "@/utils/props/CharacterProps";

export default function useCharacterState() {
  const [character, setCharacter] = useState<CharacterProps | null>(null);
  
  useEffect(() => {}, [character]);

  const characterSheet = character?.characterSheet;

  const totalProwess = Object.values(
    characterSheet?.attributes.prowess ?? {}
  ).reduce((a, b) => a + b, 0);

  const totalFocus = Object.values(
    characterSheet?.attributes.focus ?? {}
  ).reduce((a, b) => a + b, 0);

  const weaponName = characterSheet?.equipment.hands.name;
  const damageRating = characterSheet?.equipment.hands.damageRating;
  const damageTypeArray = characterSheet?.equipment.hands.damageType;

  const characterEncumbrance = characterSheet?.characterEncumbrance;

  const actionPoints = characterSheet?.actionPoints;

  return {
    character,
    setCharacter,
    totalFocus,
    totalProwess,
    weaponName,
    damageRating,
    damageTypeArray,
    actionPoints,
    characterEncumbrance,
  };
}
