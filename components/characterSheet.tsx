import { useContext, useEffect } from "react";
import { CharacterContext } from "@/contexts/characterContext";
import SheetAttributes from "@/components/sheetAttributes";

interface CharacterSheetDisplayProps {
  // character: CharacterProps;
  // isRefreshNeeded: boolean;
  // setRefreshNeeded: (value: boolean) => void;
}

export const CharacterSheet: React.FC<CharacterSheetDisplayProps> = ({
  // character,
  // isRefreshNeeded,
  // setRefreshNeeded,
}): JSX.Element => {
  const {
    character,
    characterName,
    characterEncumbrance,
    actionPoints, // move to action something
    handsSlot, // move to equipment something
    weaponName, // move to equipment something
    weaponQuantity, // move to equipment something
  } = useContext(CharacterContext);

  // useEffect(() => {
  //   if (isRefreshNeeded) {
  //     setRefreshNeeded(false);
  //   }
  // }, [isRefreshNeeded, setRefreshNeeded]);

  if (character) {
    return (
      <div className="flex justify-center flex-row space-x-8 mt-0">
        <div className="text-center w-autobg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
          <div className="text-center text-xl leading-8 text-gray-300">
            <h1>{`Character Sheet`}</h1>
          </div>
          <div>
            <h1>{`Action Points ${actionPoints}`}</h1>
            <br />
            <p>{`Character Name: ${characterName}`}</p>
            <br />
            <p>{`Character Encumbrance: ${characterEncumbrance}`}</p>
            <br />
            <p>{"Attributes:"}</p>
            <br />
            <SheetAttributes /> 
            <br />
            <p>{"Hands Slot:"}</p>
            <br />
            {handsSlot ? (
              <p>
                {weaponQuantity}
                {" * "}
                {weaponName}
              </p>
            ) : (
              <p>{"Nothing in Hands"}</p>
            )}
            <br />
            <p>{"Selected Equipment:"}</p>
            <br />
            <ul>
              {Object.keys(
                character.characterSheet.equipment.selectedItems
              ).map((equipment) => (
                <li key={equipment}>
                  <p>{equipment}</p>
                </li>
              ))}
            </ul>
            <br />
            <br />
            <p>{"Effects:"}</p>
            <br />
            <ul>
              {Object.keys(character.characterSheet.statusEffects).map(
                (effect) => (
                  <li key={effect}>
                    {character.characterSheet.statusEffects[effect].quantity}
                    {" * "}
                    {effect}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{"No Character Loaded in CharacterContext"}</div>;
  }
};
