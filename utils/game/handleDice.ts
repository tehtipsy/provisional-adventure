import rollDice from "@/utils/game/rollDice";

interface DiceRollsProps {
  prowess: number;
  damageRating: number;
}

export const handleDiceRolls = (props: DiceRollsProps) => {
  const numDice = props.prowess + props.damageRating;
  const { count, rolls } = rollDice(numDice);
  return { tier: count, sucssfulRollsToDisplay: rolls };
};

// handleDiceRolls (choice === "Manual Roll"):
export const handleDiceInput = (
  setSuccessfulRolls: (value: number) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const tier = parseInt(e.target.value);
    setSuccessfulRolls(tier);
  };
};
