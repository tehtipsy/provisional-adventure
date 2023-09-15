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
    <div className="bg-gray-800 m-6 p-6 rounded justify-center flex-row space-x-8 mt-0">
      {numDiceToRoll && (
        <div key={`num-dice-div`}>
          <div key={`num-dice-inner-div`}>{`Roll ${numDiceToRoll} Dice`}</div>
        </div>
      )}
      {(numDiceToRoll && successfulRolls) ?? // test 0 result
        (false && (
          <div key={`successful-rolls-input-div`}>
            <p key={`successful-rolls-p`}>{"Successful Rolls "}</p>
            <Input
              key={`successful-rolls-input`}
              placeholder="0"
              type="number"
              min={1}
              max={numDiceToRoll ?? undefined}
              onChange={handleDiceInput(setSuccessfulRolls)}
            />
          </div>
        ))}
      <div>
        {successfulRolls ?? // test 0 result
          (false && (
            <div key={`successful-rolls-div`}>
              <div
                key={`successful-rolls-inner-div`}
              >{`${successfulRolls} Successful Rolls (5 or above)`}</div>
            </div>
          ))}
      </div>
      {(numDiceToRoll && successfulRolls) ?? // test 0 result
        (false && (
          <Button
            key={`clear-rolls-button`}
            className="bg-red-500 hover:bg-red-700"
            onClick={handleClearRolls}
          >
            {"Clear Rolls"}
          </Button>
        ))}
    </div>
  );
};
export default RollSelections;
