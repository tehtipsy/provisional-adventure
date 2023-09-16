import { useEffect, useState } from "react";
import {
  AttributeProps,
  AttributesProps,
  CharacterProps,
} from "@/utils/props/CharacterProps";
import getAttributeTotal from "./getAttributeTotal";

export default function useCharacterState() {
  const [character, setCharacter] = useState<CharacterProps | null>(null);

  if (character) {
    // useEffect(() => {}, [character]);
    const characterSheet = character.characterSheet;

    const attributes = characterSheet.attributes;
    const {
      prowess: totalProwess,
      focus: totalFocus,
      finesse: totalFiness,
      constitution: totalConstitution,
      willpower: totalWillpower,
      motivation: totalMotivation,
    } = getAttributeTotal(attributes);
    const attributesTotals = getAttributeTotal(attributes);
    
    const handsSlot = characterSheet.equipment.hands;
    const weaponName = handsSlot.name;
    const weaponQuantity = handsSlot.quantity;
    const damageRating = handsSlot.damageRating;
    const damageTypeArray = handsSlot.damageType || [];

    const characterEncumbrance = characterSheet.characterEncumbrance;

    const actionPoints = characterSheet.actionPoints;

    return {
      character,
      setCharacter,
      attributes,
      attributesTotals,
      totalFocus,
      totalProwess,
      totalFiness,
      totalConstitution,
      totalWillpower,
      totalMotivation,
      weaponName,
      weaponQuantity,
      damageRating,
      damageTypeArray,
      actionPoints,
      characterEncumbrance,
    };
  } else
    return {
      character,
      setCharacter,
    };
}
