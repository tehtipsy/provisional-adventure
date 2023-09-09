import { useEffect, useState } from "react";
import { AttributeProps, CharacterProps } from "@/utils/props/CharacterProps";
import { sumAttributeTotal } from "@/utils/game/sumAttributeTotal";
import createDefaultAttributes from "@/utils/game/createDefaultAttributes";

export default function useCharacterState() {
  const [character, setCharacter] = useState<CharacterProps | null>(null);
  
  useEffect(() => { }, [character]);
  
  const characterSheet = character?.characterSheet;

  const totalProwess = Object.values(
    characterSheet?.attributes.prowess ?? {}
  ).reduce((a, b) => a + b, 0);

  const focus = characterSheet?.attributes.focus;

  const defaultAttribute = createDefaultAttributes<AttributeProps>({
    attributeType: {} as AttributeProps,
  });

  const totalFocus = sumAttributeTotal(focus ?? defaultAttribute); // fix this trash

  const weaponName = characterSheet?.equipment.hands.name;

  const characterEncumbrance = characterSheet?.characterEncumbrance;
  
  const actionPoints = characterSheet?.actionPoints;

  return {
    character,
    setCharacter,
    totalFocus,
    totalProwess,
    weaponName,
    actionPoints,
    characterEncumbrance,
  };
}
