import {
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalContext } from "@/contexts/globalContext";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { SelectSizeForm } from "@/components/ui/selectCharacterSize";
import { SelectOriginForm } from "@/components/ui/selectOriginForm";

interface Item {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
}

const items: Record<string, Array<Item>> = {
  weapons: [
    { name: "Sword", damage: 10, weight: 10, cost: 10 },
    { name: "Knife", damage: 4, weight: 1, cost: 3 },
    { name: "Bow", damage: 7, weight: 7, cost: 7 },
    { name: "Cross Bow", damage: 12, weight: 10, cost: 12 },
  ],
  armor: [
    { name: "Helmet", block: 10, cost: 5, weight: 3 },
    { name: "Rusty Chest Piece", block: 5, cost: 5, weight: 6 },
    { name: "Dirty Pants", block: 8, cost: 3, weight: 4 },
    { name: "Chain Mail Chest Plate", block: 10, cost: 10, weight: 10 },
  ],
  misc: [
    { name: "Shield", damage: 2, weight: 10, block: 10, cost: 3 },
    { name: "Note Book", damage: 10, cost: 3 },
    { name: "Gold Coin", damage: 5, cost: 3, weight: 1 },
    { name: "Healing Potion", damage: 8, cost: 3, weight: 1 },
    { name: "Arrow", damage: 4, cost: 3, weight: 1 },
    { name: "Battle Scar", damage: 4 },
  ],
};

const initialBudget = 100;

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
  const [prowess, setProwess] = useState<number>(0);
  const [finesse, setFinesse] = useState<number>(0);
  const [constitution, setConstitution] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);
  const [willpower, setWillpower] = useState<number>(0);
  const [motivation, setMotivation] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [budget, setBudget] = useState<number>(initialBudget);
  const [origin, setOrigin] = useState("");

  const setSizeSelection = (e: FormEvent) => {
    const sizeSelection = (e.target as HTMLSelectElement).value;
    setSize(parseInt(sizeSelection));
  };

  const setOriginSelection = (e: FormEvent) => {
    const originSelection = (e.target as HTMLSelectElement).value;
    console.log("Origin Selection: ", originSelection);
    setOrigin(originSelection);
  };

  useEffect(() => {
    if (size === 3) {
      const maxCapacity = 3 + prowess;
      setCapacity(maxCapacity);
    } else if (size === 2) {
      const maxCapacity = 1 + prowess;
      setCapacity(maxCapacity);
    } else {
      setCapacity(prowess);
    }
  }, [size, prowess]);

  useEffect(() => {
    const bonus = 20 * willpower;
    setBudget((prevBudget) => prevBudget + bonus);
  }, [willpower]);

  const initialSelectedStatus: Record<string, boolean> = {};
  Object.keys(items).forEach((key) => {
    const array = items[key];
    const obj = array.reduce(
      (obj: { [x: string]: boolean }, item: { name: string }) => {
        obj[item.name] = false;
        return obj;
      },
      {}
    );
    Object.assign(initialSelectedStatus, obj);
  });
  console.log("Initial Selected Status set to: ", initialSelectedStatus);

  const [selectedStatus, setDisabledStatus] = useState(initialSelectedStatus);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [remainingBudget, setRemainingBudget] = useState(budget);
  const [remainingCapacity, setRemainingCapacity] = useState(capacity);

  // useEffect(() => {
  const handleTotal = (buttonValue: string) => {
    const values = Object.values(items).flat();
    const item = values.filter((value) => value.name === buttonValue)[0];
    const cost = item.cost;
    const weight = item.weight;
    if (selectedStatus[buttonValue] === true) {
      setRemainingBudget(cost ? remainingBudget + cost : (prev) => prev);
      setRemainingCapacity(
        weight ? remainingCapacity + weight : (prev) => prev
      );
    } else {
      setRemainingBudget(cost ? remainingBudget - cost : (prev) => prev);
      setRemainingCapacity(
        weight ? remainingCapacity - weight : (prev) => prev
      );
    }
  };
  // }, []);

  // useEffect(() => {
  //   setRemainingCapacity(capacity);
  // }, [capacity]);

  // useEffect(() => {
  //   setRemainingBudget(budget);
  // }, [budget]);

  // useEffect(() => {
  //   setCapacity(
  //     remainingCapacity
  //       ? capacity - remainingCapacity
  //       : capacity + remainingCapacity
  //   );
  // }, [remainingCapacity]);

  useEffect(() => {
    console.log("Budget: ", budget);
    // setRemainingBudget((prev) => prev - budget);
  }, [budget]);

  useEffect(() => {
    console.log("Capacity: ", capacity);
    setRemainingCapacity((prev) => prev + capacity);
  }, [capacity]);

  useEffect(() => {
    console.log("remainingCapacity: ", remainingCapacity);
    console.log("remainingBudget: ", remainingBudget);
  }, [remainingCapacity, remainingBudget]);

  // useEffect(() => {
  //   console.log("Selected Items: ", selectedItems);
  //   console.log("Selected Status: ", selectedStatus);
  // }, [selectedItems, selectedStatus]);

  const handleClickSelction = (buttonValue: string) => {
    if (selectedItems.includes(buttonValue)) {
      setSelectedItems((prev) => prev.filter((item) => item !== buttonValue));
      setDisabledStatus((prev: any) => ({
        ...prev,
        [buttonValue]: false,
      }));
    } else {
      setSelectedItems((prev) => [...prev, buttonValue]);
      setDisabledStatus((prev: any) => ({
        ...prev,
        [buttonValue]: true,
      }));
    }
    handleTotal(buttonValue);
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const buttonValue = (e.target as HTMLSelectElement).value;
    handleClickSelction(buttonValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newSheet = {
      user_id: {}, // user.id
      name: user,
      characterName: name,
      characterSize: size,
      characterOrigin: origin,
      attributes: {
        prowess: {
          unmodifiedValue: prowess,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        finesse: {
          unmodifiedValue: finesse,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        constitution: {
          unmodifiedValue: constitution,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        focus: {
          unmodifiedValue: focus,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        willpower: {
          unmodifiedValue: willpower,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        motivation: {
          unmodifiedValue: motivation,
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
      },
      actionPoints: 0,
      equipment: {
        selectedItems: {
          ...selectedItems,
        },
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
        },
        quiver: {},
        backpack: {},
        armor: {
          head: {},
          chest: {},
          torso: {},
          gloves: {},
        },
      },
      statusEffects: {},
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
    <div className="flex justify-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
      <form
        onSubmit={handleSubmit}
        className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
      >
        <div className="text-center text-white text-xl leading-8 dark:text-gray-300">{`${user}'s New Character`}</div>
        <div className="m-4 text-center">
          <div className="m-4 text-center">
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Character Name"
              className="m-4 text-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Prowess"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setProwess(parseInt(e.target.value) || 0)}
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Finesse"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setFinesse(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Constitution"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setConstitution(parseInt(e.target.value) || 0)}
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Focus"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setFocus(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Willpower"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setWillpower(parseInt(e.target.value) || 0)}
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Motivation"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) => setMotivation(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
            <div className="text-center">
              <SelectSizeForm setSizeSelection={setSizeSelection} />
            </div>
            <div className="text-center">
              <SelectOriginForm setOriginSelection={setOriginSelection} />
            </div>
            <div>
              {/* <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Total Capacity: ${capacity}Kg`}
              </p> */}
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Remainig Capacity: ${remainingCapacity}Kg`}
              </p>
            </div>
            <div>
              {/* <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Total Budget: ${budget}$`}
              </p> */}
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Remainig Budget: ${remainingBudget}$`}
              </p>
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {"Select Weapon"}
              </p>
              <div className="text-center">
                {items.weapons.map((item: Item) => (
                  <div key={`div-button-${item.name}`}>
                    <Button
                      key={item.name}
                      className={
                        selectedStatus[item.name] === true
                          ? " bg-purple-900 hover:bg-purple-800 md:active:bg-purple-700"
                          : ""
                      }
                      onClick={handleClick}
                      value={item.name}
                    >
                      {`${item.name} ${item.cost}$ ${item.weight}Kg`}
                    </Button>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-lg text-center  leading-8 dark:text-gray-300">
                {"Select Armor"}
              </p>
              <div className="text-center">
                {items.armor.map((item: Item) => (
                  <div key={`div-button-${item.name}`}>
                    <Button
                      key={item.name}
                      className={
                        selectedStatus[item.name] === true
                          ? " bg-purple-900 hover:bg-purple-800 md:active:bg-purple-700"
                          : ""
                      }
                      onClick={handleClick}
                      value={item.name}
                    >
                      {`${item.name} ${item.cost}$ ${item.weight}Kg`}
                    </Button>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {"Select Misc"}
              </p>
              <div className="text-center">
                {items.misc.map((item: Item) => (
                  <div key={`div-button-${item.name}`}>
                    <Button
                      key={item.name}
                      className={
                        selectedStatus[item.name] === true
                          ? " bg-purple-900 hover:bg-purple-800 md:active:bg-purple-700"
                          : ""
                      }
                      onClick={handleClick}
                      value={item.name}
                    >
                      {`${item.name} ${item.cost}$ ${item.weight}Kg`}
                    </Button>
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          className="self-center bg-green-900 hover:bg-green-800 md:active:bg-green-700"
          type="submit"
        >
          {"Save New Character Sheet"}
        </Button>
      </form>
    </div>
  );
};
