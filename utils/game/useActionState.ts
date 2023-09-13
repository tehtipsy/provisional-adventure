import { useState } from "react";

export default function useActionState() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>("");
  const [selectedDamageType, setSelectedDamageType] = useState<string | null>(
    ""
  );
  const [numDiceToRoll, setNumDiceToRoll] = useState<number | null>(null);
  const [successfulRolls, setSuccessfulRolls] = useState<number | null>(null);

  const handleClearRolls = () => {
    setSuccessfulRolls(null);
    setNumDiceToRoll(null);
  };

  return {
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    numDiceToRoll,
    setNumDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
    handleClearRolls,
  };
}