import { useState } from "react";
import { CharacterProps } from "@/utils/props/CharacterProps";
import getAttributeTotal from "./getAttributeTotal";

export default function useCharacterState() {
  const [character, setCharacter] = useState<CharacterProps | null>(null);

  if (character) {
    // useEffect(() => {}, [character]);
    const characterSheet = character.characterSheet;

    const attributes = characterSheet.attributes;
    const attributesTotals = getAttributeTotal(attributes);
    const {
      prowess: totalProwess,
      focus: totalFocus,
      finesse: totalFiness,
      constitution: totalConstitution,
      willpower: totalWillpower,
      motivation: totalMotivation,
    } = attributesTotals;

    const equipment = characterSheet.equipment;

    const statusEffects = characterSheet.statusEffects

    const handsSlot = equipment.hands;
    const weaponName = handsSlot.name;
    const weaponQuantity = handsSlot.quantity;
    const damageRating = handsSlot.damageRating;
    const damageTypeArray = handsSlot.damageType || [];

    const characterEncumbrance = characterSheet.characterEncumbrance;

    const actionPoints = characterSheet.actionPoints;
    const characterName = characterSheet.characterName;

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
      handsSlot,
      characterName,
      equipment,
      statusEffects,
    };
  } else
    return {
      character,
      setCharacter,
    };
}
