import { useContext, useEffect, useState } from "react";
import { handleDiceRolls } from "@/utils/game/handleDice";
import { CharacterContext } from "@/contexts/characterContext";
import { ActionContext } from "@/contexts/actionContext";

export default function useSelectionState() {
  const [pokeSender, setPokeSender] = useState<string | null>("");
  const [pokeReceiver, setPokeReceiver] = useState<string | null>("");
  const [showPartSelection, setShowPartSelection] = useState(false);
  const [showAttackSelection, setShowAttackSelection] = useState(false);
  const [showAutoRollSelection, setShowAutoRollSelection] = useState(false);
  
  const partSelectionArray = ["Head", "Torso", "Limbs"];
  const rollSelectionArray = ["Auto Roll", "Manual Roll"];

  const {
    // reciver, // useEffect?
    setReciver,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    handleClearRolls,
  } = useContext(ActionContext);

  const handlePokeSelection = (reciver: string) => {
    setPokeReceiver(reciver);
    setShowPartSelection(true);
    setReciver
      ? setReciver(reciver)
      : new Error("setReciver is Borked in ActionContext");
    handleClearRolls
      ? handleClearRolls()
      : new Error("handleClearRolls is Borked in ActionContext");
  };

  function handlePartSelection(selectedBodyPart: string) {
    setSelectedBodyPart
      ? setSelectedBodyPart(selectedBodyPart)
      : new Error("setSelectedBodyPart is borked in ActionContext");
    setShowPartSelection(false);
    setShowAttackSelection(true);
  }

  function handleAttackSelection(selectedDamageType: string) {
    setSelectedDamageType
      ? setSelectedDamageType(selectedDamageType)
      : new Error("setSelectedDamageType is borked in ActionContext");
    setShowAttackSelection(false);
    setShowAutoRollSelection(true);
  }

  const handleRollSelection = (
    choice: string,
    damageRating: number,
    totalProwess: number
  ) => {
    if (choice === "Auto Roll")
      handleDiceRolls({ damageRating: damageRating, prowess: totalProwess });
    setShowAutoRollSelection(false);
  };

  return {
    showPartSelection,
    showAttackSelection,
    showAutoRollSelection,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    handlePokeSelection,
    handlePartSelection,
    handleAttackSelection,
    handleRollSelection,
    partSelectionArray,
    rollSelectionArray,
    pokeSender,
    setPokeSender,
    pokeReceiver,
  };
}
