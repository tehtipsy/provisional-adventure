import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/contexts/characterContext";

const initialAttributeDisplayCols = [
  "attribute",
  "total",
  "base",
  "t1",
  "t2",
  "t3",
  "t4",
  "bonus",
];

interface CharacterSheetDisplayProps {
  // character: CharacterProps;
  isRefreshNeeded: boolean;
  setRefreshNeeded: (value: boolean) => void;
}

export const CharacterSheet: React.FC<CharacterSheetDisplayProps> = ({
  // character,
  isRefreshNeeded,
  setRefreshNeeded,
}): JSX.Element => {
  const [attributeDisplayCols] = useState(initialAttributeDisplayCols);
  const {
    character,
    attributes,
    attributesTotals,
    weaponName,
    weaponQuantity,
    actionPoints,
  } = useContext(CharacterContext);

  useEffect(() => {
    if (isRefreshNeeded) {
      setRefreshNeeded(false);
    }
  }, [isRefreshNeeded, setRefreshNeeded]);

  if (character && attributesTotals && attributes) {
    return (
      <div className="flex justify-center flex-row space-x-8 mt-0">
        <div className=" text-center w-autobg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
          <div className="text-center text-xl leading-8 text-gray-300">
            <h1>{"Character Sheet"}</h1>
          </div>
          <div>
            <h1>{`Action Points ${actionPoints}`}</h1>
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
                {Object.keys(attributes).map((attribute) => (
                  <div key={`div-${attribute}`}>
                    <li key={attribute}>
                      <div className="px-4 grid grid-cols-8 gap-1">
                        <h1>{attribute}</h1>
                        <div className="px-4 grid grid-cols-2 gap-1">
                          <div className="px-1">
                            {Array(Math.abs(attributesTotals[attribute]))
                              .fill(0)
                              .map((_, i) => (
                                <div key={`total-${i}-div`} className="py-1">
                                  <div
                                    className={
                                      attributesTotals[attribute] > 0
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
                              Math.abs(attributes[attribute].unmodifiedValue)
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
                            {Array(Math.abs(attributes[attribute].t1))
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
                            {Array(Math.abs(attributes[attribute].t2))
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
                            {Array(Math.abs(attributes[attribute].t3))
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
                            {Array(Math.abs(attributes[attribute].t4))
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
                            {Array(Math.abs(attributes[attribute].bonus))
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
                ))}
              </ul>
            </div>
            <br />
            <p>{"Hands Slot:"}</p>
            <br />
            {character.characterSheet.equipment.hands ? (
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
