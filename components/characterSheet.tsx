import { useEffect } from "react";

type CharacterSheetProps = {
  characterSheet: any;
  character: any;
};

export const CharacterSheet: React.FC<{
  character: CharacterSheetProps;
  isRefreshNeeded: boolean;
  setRefreshNeeded: (value: boolean) => void; // add the setter function as a prop type
}> = ({ character, isRefreshNeeded, setRefreshNeeded }): JSX.Element => {
  useEffect(() => {
    if (isRefreshNeeded) {
      setRefreshNeeded(false);
    }
  }, [isRefreshNeeded, setRefreshNeeded]);
  return (
    <div className=" text-center w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
      <div className="text-center text-white text-xl leading-8 dark:text-gray-300">
        <h1>Character Sheet</h1>
      </div>
      {character && character.characterSheet.name && (
        <div>
          <h1>Action Points {character.characterSheet.actionPoints}</h1>
          <br />
          <p>Character Name: {character.characterSheet.characterName}</p>
          <br />
          <p>Attributes:</p>
          <br />
          <ul>
            {Object.keys(character.characterSheet.attributes).map(
              (attribute) => (
                <li key={attribute}>
                  <h1>{attribute}</h1>
                  <p>
                    {
                      character.characterSheet.attributes[attribute]
                        .unmodifiedValue
                    }
                  </p>
                </li>
              )
            )}
          </ul>
          <br />
          <p>Hands Slot:</p>
          <br />
          {character.characterSheet.equipment.hands ? (
            <p>
              {character.characterSheet.equipment.hands.quantity}
              {" * "}
              {character.characterSheet.equipment.hands.name}
            </p>
          ) : (
            <p>Nothing in Hands</p>
          )}
          <br />
          <p>Selected Equipment:</p>
          <br />
          <ul>
            {Object.keys(character.characterSheet.equipment.selectedItems).map(
              (equipment) => (
                <li key={equipment}>
                  <p>
                    {
                      character.characterSheet.equipment.selectedItems[
                        equipment
                      ]
                    }
                  </p>
                </li>
              )
            )}
          </ul>
          <br />
          <br />
          <p>Effects:</p>
          <br />
          <ul>
            {Object.keys(character.characterSheet.statusEffects).map(
              (effect) => (
                <li key={effect}>
                  {character.characterSheet.statusEffects[effect]}
                  {" * "}
                  {effect}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
