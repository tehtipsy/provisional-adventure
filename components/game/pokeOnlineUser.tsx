import { useContext } from "react";
import AttackOptions from "../attackOptions";
import { CharacterContext } from "@/contexts/characterContext";
import useSelectionState from "@/utils/game/useSelectionState";

const PokeOnlineUser: React.FC<{}> = () => {
  const { damageTypeArray, damageRating, totalProwess } =
    useContext(CharacterContext);
  const {
    handlePartSelection,
    handleAttackSelection,
    handleRollSelection,
    showPartSelection,
    showAttackSelection,
    showAutoRollSelection,
    partSelectionArray,
    rollSelectionArray,
  } = useSelectionState();

  return (
    <div className="bg-gray-800 m-6 p-6 rounded">
      {showPartSelection ? (
        <div>
          <AttackOptions
            options={partSelectionArray}
            onOptionSelection={handlePartSelection}
          />
        </div>
      ) : showAttackSelection ? (
        damageTypeArray && (
          <div>
            <AttackOptions
              options={damageTypeArray}
              onOptionSelection={handleAttackSelection}
            />
          </div>
        )
      ) : showAutoRollSelection && damageRating && totalProwess ? (
        <div>
          <AttackOptions
            options={rollSelectionArray}
            onOptionSelection={(option) =>
              handleRollSelection(option, damageRating, totalProwess)
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default PokeOnlineUser;
