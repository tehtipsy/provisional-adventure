import { FormEvent, useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

type CreateCharacterFormProps = {
  onFormSubmit: () => void;
  fetchCharacterData: () => void;
};

export const CreateCharacterForm = ({
  onFormSubmit,
  fetchCharacterData,
}: CreateCharacterFormProps) => {
  const { user } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [prowess, setProwess] = useState("");
  const [finesse, setFinesse] = useState("");
  const [constitution, setConstitution] = useState("");
  const [focus, setFocus] = useState("");
  const [willpower, setWillpower] = useState("");
  const [motivation, setMotivation] = useState("");

  const items = {
    weapons: [
      { name: "Sword", damage: 10, weight: 10, cost: 10 },
      { name: "Knife", damage: 4, weight: 1, cost: 3 },
      { name: "Bow", damage: 7, weight: 7, cost: 7 },
      { name: "Crossbow", damage: 12, weight: 10, cost: 12 },
    ],
    armor: [
      { name: "Helmet", block: 10, cost: 5 },
      { name: "Chest Piece", block: 5, cost: 5 },
      { name: "Leather Pants", block: 8, cost: 3 },
      { name: "Chainmail Chest Piece", block: 10, cost: 10 },
    ],
    misc: [
      { name: "Shield", damage: 2, weight: 10, block: 10, cost: 3 },
      { name: "Notebook", damage: 10, cost: 3 },
      { name: "Gold Coin", damage: 5, cost: 3 },
      { name: "Healing Potion", damage: 8, cost: 3 },
      { name: "Arrow", damage: 4, cost: 3 },
      { name: "Battle Scar", damage: 4, cost: 0 },
    ],
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]); // your state for selected items

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    // update the selected items array with the value of the option
    setSelectedItems((prev) => [
      ...prev,
      (e.target as HTMLSelectElement).value,
    ]);
  };
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create the newSheet object
    const newSheet = {
      user_id: {}, // {user.id}
      name: user,
      characterName: name,
      attributes: {
        prowess: {
          unmodifiedValue: parseInt(prowess),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        finesse: {
          unmodifiedValue: parseInt(finesse),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        constitution: {
          unmodifiedValue: parseInt(constitution),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        focus: {
          unmodifiedValue: parseInt(focus),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        willpower: {
          unmodifiedValue: parseInt(willpower),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        motivation: {
          unmodifiedValue: parseInt(motivation),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
      },
      actionPoints: 0,
      equipment: {
        hands: {
          quantity: 2,
          damageRating: 1,
          damageType: ["Bludgeoning", "Slapping"],
          name: "Fist of Fury",
        },
        belt: {
          quantity: 1,
          damageRating: 2,
          damageType: ["Piercing", "Slashing"],
          name: "Short Sword",
          //     // choose from items array
        },
        quiver: {
          //     // choose from items array
        },
        backpack: {
          //     // choose from items array
        },
        armor: {
          head: {
            //     // choose from items array
          },
          chest: {
            //     // choose from items array
          },
          torso: {
            //     // choose from items array
          },
          gloves: {
            //     // choose from items array
          },
        },
      },
      statusEffects: {
        //   // choose from Effects array
      },
    };

    fetch("/api/db/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newSheet: newSheet }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // return Character Sheet MongoDB doc _id and save to user, set in global context
        fetchCharacterData(); // Refetch character data after successful form submission
      })
      .catch((error) => console.error("Error: ", error));

    onFormSubmit();
  };

  return (
    <>
      <div className="text-2xl m-6 text-center">{`${user}'s New Character`}</div>
      <form
        onSubmit={handleSubmit}
        className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
      >
        <div className="m-4 text-center">
          <div className="m-4 text-center">
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Character Name"
              className="w-1/2 m-4 text-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Prowess
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setProwess(e.target.value)}
              />
              <br />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Finesse
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setFinesse(e.target.value)}
              />
            </div>
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Constitution
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setConstitution(e.target.value)}
              />
              <br />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Focus
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setFocus(e.target.value)}
              />
            </div>
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Willpower
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setWillpower(e.target.value)}
              />
              <br />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                Motivation
              </p>
              <Input
                type="number"
                min="0"
                max="6"
                onChange={(e) => setMotivation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                Select Weapon
              </p>
              <div className="text-center">
                {items.weapons.map((item) => (
                  <>
                    <Button
                      onClick={handleClick}
                      value={JSON.stringify({
                        "weapon": item.name,
                      })}
                    >
                      {item.name} - Cost: {item.cost}
                    </Button>
                    <br />
                    <br />
                  </>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-lg text-center  leading-8 dark:text-gray-300">
                Select Armor
              </p>
              <div className="text-center">
                {items.armor.map((item) => (
                  <>
                    <Button
                      onClick={handleClick}
                      value={JSON.stringify({
                        "armor": item.name,
                      })}
                    >
                      {item.name} - Cost: {item.cost}
                    </Button>
                    <br />
                    <br />
                  </>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                Select Misc
              </p>
              <div className="text-center">
                {items.misc.map((item) => (
                  <>
                    <Button
                      onClick={handleClick}
                      value={JSON.stringify({
                        "misc": item.name,
                      })}
                    >
                      {item.name} - Cost: {item.cost}
                    </Button>
                    <br />
                    <br />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          className="self-center bg-green-900 hover:bg-green-800 md:active:bg-green-700"
          type="submit"
        >
          Save New Character Sheet
        </Button>
      </form>
    </>
  );
};
