import rollDice from "@/utils/game/rollDice";

interface DiceRollsProps {
  prowess: number;
  damageRating: number;
}

interface DiceInputProps {
  e: React.ChangeEvent<HTMLInputElement>;
}

export const handleDiceRolls = (props: DiceRollsProps) => {
  const numDice = props.prowess + props.damageRating;
  const { count, rolls } = rollDice(numDice);
  return { tier: count, sucssfulRollsToDisplay: rolls };
};

// handleDiceRolls (choice === "Auto Roll"):
export const handleDiceInput = (props: DiceInputProps) => {
  const tier = parseInt(props.e.target.value);
  return tier;
};
