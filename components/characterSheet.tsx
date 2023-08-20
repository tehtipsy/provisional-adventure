import { useEffect } from "react";

type CharacterSheetProps = {
  characterSheet: any;
  character: any;
};

export const CharacterSheet: React.FC<{
  character: CharacterSheetProps;
  isRefreshNeeded: boolean;
  setRefreshNeeded: (value: boolean) => void;
}> = ({ character, isRefreshNeeded, setRefreshNeeded }): JSX.Element => {
  useEffect(() => {
    if (isRefreshNeeded) {
      setRefreshNeeded(false);
    }
  }, [isRefreshNeeded, setRefreshNeeded]);

  return (
    <div className="flex justify-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
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
            <div className="flex-row justify-center">
              <ul className="grid grid-cols-2 gap-1">
                {Object.keys(character.characterSheet.attributes).map(
                  (attribute) => (
                    <div key={`div-${attribute}`}>
                      <li className="px-4" key={attribute}>
                        <h1>{attribute}</h1>
                        <br />
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"total: "}</h3>
                          <h3 className="px-1">
                            {character.characterSheet.attributes[attribute]
                              .unmodifiedValue +
                              character.characterSheet.attributes[attribute]
                                .t1 +
                              character.characterSheet.attributes[attribute]
                                .t2 +
                              character.characterSheet.attributes[attribute]
                                .t3 +
                              character.characterSheet.attributes[attribute]
                                .t4 +
                              character.characterSheet.attributes[attribute]
                                .bonus}
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"base: "}</h3>
                          <h3 className="px-1">
                            {
                              character.characterSheet.attributes[attribute]
                                .unmodifiedValue
                            }
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"tier 1: "}</h3>
                          <h3 className="px-1">
                            {character.characterSheet.attributes[attribute].t1}
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"tier 2: "}</h3>
                          <h3 className="px-1">
                            {character.characterSheet.attributes[attribute].t2}
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"tier 3: "}</h3>
                          <h3 className="px-1">
                            {character.characterSheet.attributes[attribute].t3}
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"tier 4: "}</h3>
                          <h3 className="px-1">
                            {character.characterSheet.attributes[attribute].t4}
                          </h3>
                        </div>
                        <div className="flex grid-cols-2">
                          <h3 className="px-1">{"bonus: "}</h3>
                          <h3 className="px-1">
                            {
                              character.characterSheet.attributes[attribute]
                                .bonus
                            }
                          </h3>
                        </div>
                      </li>
                      <br />
                    </div>
                  )
                )}
              </ul>
            </div>
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
              {Object.keys(
                character.characterSheet.equipment.selectedItems
              ).map((equipment) => (
                <li key={equipment}>
                  <p>
                    {
                      character.characterSheet.equipment.selectedItems[
                        equipment
                      ]
                    }
                  </p>
                </li>
              ))}
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
    </div>
  );
};
