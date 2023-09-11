import { useState } from "react";

export default function useActionState() {
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedDamageType, setSelectedDamageType] = useState("");
  const [numDiceToRoll, setNumDiceToRoll] = useState<number | null>(null);
  const [successfulRolls, setSuccessfulRolls] = useState<number | null>(null);

  return {
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    numDiceToRoll,
    setNumDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
  };
}