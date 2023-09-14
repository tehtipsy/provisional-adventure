import { handleDiceInput } from "@/utils/game/handleDice";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import useActionState from "@/utils/game/useActionState";

const RollSelections: React.FC = () => {
  // Terrible Name
  const {
    numDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
    handleClearRolls,
  } = useActionState();

  return (
    <div>
      {numDiceToRoll && (
        <div className="bg-gray-800 m-6 p-6 rounded">
          <div>{`Roll ${numDiceToRoll} Dice`}</div>
        </div>
      )}
      {numDiceToRoll && successfulRolls === null && (
        <div className="bg-gray-800 m-6 p-6 rounded">
          <p>{"Successful Rolls "}</p>
          <Input
            placeholder="0"
            type="number"
            min={1}
            max={numDiceToRoll}
            onChange={handleDiceInput(setSuccessfulRolls)}
          />
        </div>
      )}
      <div className="flex justify-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
        {successfulRolls !== null && successfulRolls !== undefined && (
          <div className="bg-gray-800 m-6 p-6 rounded">
            <div>{`${successfulRolls} Successful Rolls (5 or above)`}</div>
          </div>
        )}
      </div>
      {numDiceToRoll &&
        successfulRolls !== null &&
        successfulRolls !== undefined && (
          <div>
            <Button
              className="bg-red-500 hover:bg-red-700"
              onClick={handleClearRolls}
            >
              {"Clear Rolls"}
            </Button>
          </div>
        )}
    </div>
  );
};
export default RollSelections;
