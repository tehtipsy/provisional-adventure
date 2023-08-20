import { useEffect, useState } from "react";

type CharacterSheetProps = {
  characterSheet: any;
  character: any;
};

export const CharacterSheet: React.FC<{
  character: CharacterSheetProps;
  isRefreshNeeded: boolean;
  setRefreshNeeded: (value: boolean) => void;
}> = ({ character, isRefreshNeeded, setRefreshNeeded }): JSX.Element => {
  const initialAttributeDisplayCols = [
    "total",
    "base",
    "t1",
    "t2",
    "t3",
    "t4",
    "bonus",
  ];

  const [attributeDisplayCols] = useState(initialAttributeDisplayCols);

  useEffect(() => {
    if (isRefreshNeeded) {
      setRefreshNeeded(false);
    }
  }, [isRefreshNeeded, setRefreshNeeded]);

  useEffect(() => {
    console.log(
      "Total Focus: ",
        // character.characterSheet.attributes["focus"].unmodifiedValue +
        //   character.characterSheet.attributes["focus"].t1 +
        character.characterSheet.attributes["focus"].t2 //+
        //   character.characterSheet.attributes["focus"].t3 +
        //   character.characterSheet.attributes["focus"].t4 +
        // character.characterSheet.attributes["focus"].bonus
    );
  }, [character]);

  return (
    <div className="flex justify-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
      <div className=" text-center w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
        <div className="text-center text-white text-xl leading-8 dark:text-gray-300">
          <h1>{"Character Sheet"}</h1>
        </div>
        {character && character.characterSheet.name && (
          <div>
            <h1>{`Action Points ${character.characterSheet.actionPoints}`}</h1>
            <br />
            <p>{`Character Name: ${character.characterSheet.characterName}`}</p>
            <br />
            <p>{"Attributes:"}</p>
            <br />
            <div className="flex-row justify-center">
              <ul>
                <div className="px-4 grid grid-cols-7 gap-1">
                  {Object.entries(attributeDisplayCols).map(([key, value]) => (
                    <div key={`div-${key}`}>{value}</div>
                  ))}
                </div>
                {Object.keys(character.characterSheet.attributes).map(
                  (attribute) => (
                    <div key={`div-${attribute}`}>
                      <li key={attribute}>
                        <h1>{attribute}</h1>
                        <br />
                        <div className="px-4 grid grid-cols-7 gap-1">
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .unmodifiedValue +
                                    character.characterSheet.attributes[
                                      attribute
                                    ].t1 +
                                    character.characterSheet.attributes[
                                      attribute
                                    ].t2 +
                                    character.characterSheet.attributes[
                                      attribute
                                    ].t3 +
                                    character.characterSheet.attributes[
                                      attribute
                                    ].t4 +
                                    character.characterSheet.attributes[
                                      attribute
                                    ].bonus
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`total-${i}-div`} className="py-1">
                                    <div
                                      className={
                                        character.characterSheet.attributes[
                                          attribute
                                        ].unmodifiedValue +
                                          character.characterSheet.attributes[
                                            attribute
                                          ].t1 +
                                          character.characterSheet.attributes[
                                            attribute
                                          ].t2 +
                                          character.characterSheet.attributes[
                                            attribute
                                          ].t3 +
                                          character.characterSheet.attributes[
                                            attribute
                                          ].t4 +
                                          character.characterSheet.attributes[
                                            attribute
                                          ].bonus >
                                        0
                                          ? "w-3 h-3 rounded-full bg-green-700"
                                          : "animate-pulse w-3 h-3 rounded-full bg-red-700"
                                      }
                                      key={`total-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .unmodifiedValue
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`base-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-blue-700"
                                      key={`base-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .t1
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`tier-1-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-red-700"
                                      key={`tier-1-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .t2
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`tier-2-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-red-700"
                                      key={`tier-2-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .t3
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`tier-3-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-red-700"
                                      key={`tier-3-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .t4
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`tier-4-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-red-700"
                                      key={`tier-4-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="px-4 grid grid-cols-2 gap-1">
                            <div className="px-1">
                              {Array(
                                Math.abs(
                                  character.characterSheet.attributes[attribute]
                                    .bonus
                                )
                              )
                                .fill(0)
                                .map((_, i) => (
                                  <div key={`bonus-${i}-div`} className="py-1">
                                    <div
                                      className="w-3 h-3 rounded-full bg-purple-700"
                                      key={`bonus-${i}-circle`}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  )
                )}
              </ul>
            </div>
            <br />
            <p>{"Hands Slot:"}</p>
            <br />
            {character.characterSheet.equipment.hands ? (
              <p>
                {character.characterSheet.equipment.hands.quantity}
                {" * "}
                {character.characterSheet.equipment.hands.name}
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
            <p>{"Effects:"}</p>
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
