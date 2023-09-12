import { useContext, useState } from "react";
import { handleDiceRolls } from "@/utils/game/handleDice";
import { CharacterContext } from "@/contexts/characterContext";
import { ActionContext } from "@/contexts/actionContext";

export default function useSelectionState() {
  const [showPartSelection, setShowPartSelection] = useState(false);
  const [showAttackSelection, setShowAttackSelection] = useState(false);
  const [showAutoRollSelection, setShowAutoRollSelection] = useState(false);
  const { damageRating, totalProwess } = useContext(CharacterContext);

  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedDamageType, setSelectedDamageType] = useState<string | null>(
    null
  );
  // const {
  //   selectedBodyPart,
  //   setSelectedBodyPart,
  //   selectedDamageType,
  //   setSelectedDamageType,
  // } = useContext(ActionContext);

  function handlePartSelection(selectedBodyPart: string) {
    setSelectedBodyPart(selectedBodyPart);
    setShowPartSelection(false);
    setShowAttackSelection(true);
  }

  function handleAttackSelection(selectedDamageType: string) {
    setSelectedDamageType(selectedDamageType);
    setShowAttackSelection(false);
    setShowAutoRollSelection(true);
  }

  const handleRollSelection = (damageRating: number, totalProwess: number) => {
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
    handlePartSelection,
    handleAttackSelection,
    handleRollSelection,
  };
}
