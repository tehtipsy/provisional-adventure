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
import useSheetState from "@/utils/game/useSheetState";
import { handleTotal } from "@/utils/game/newSheet/handleTotal";
import { createNewSheet } from "@/utils/game/newCharacterSheet";

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

type CreateCharacterFormProps = {
  onFormSubmit: (sheet: any) => void;
};

export const CreateCharacterForm = ({
  onFormSubmit,
}: CreateCharacterFormProps) => {
  const { user } = useContext(GlobalContext);

  const { sheet, setSheet } = useSheetState();

  const setSizeSelection = (e: FormEvent) => {
    const sizeSelection = (e.target as HTMLSelectElement).value;
    setSheet.setSize(parseInt(sizeSelection));
  };

  const setOriginSelection = (e: FormEvent) => {
    const originSelection = (e.target as HTMLSelectElement).value;
    setSheet.setOrigin(originSelection);
  };

  useEffect(() => {
    if (sheet.size === 3) {
      const maxCapacity = 3 + sheet.prowess;
      setSheet.setCapacity(maxCapacity);
    } else if (sheet.size === 2) {
      const maxCapacity = 1 + sheet.prowess;
      setSheet.setCapacity(maxCapacity);
    } else {
      setSheet.setCapacity(sheet.prowess);
    }
  }, [sheet.size, sheet.prowess]);

  useEffect(() => {
    const bonus = 20 * sheet.willpower;
    setSheet.setBudget((prevBudget) => prevBudget + bonus);
  }, [sheet.willpower]);

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
  // console.log("Initial Selected Status set to: ", initialSelectedStatus);

  const [remainingBudget, setRemainingBudget] = useState(sheet.budget);
  const [remainingCapacity, setRemainingCapacity] = useState(sheet.capacity);

  const [selectedStatus, setDisabledStatus] = useState(initialSelectedStatus);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
    handleTotal(
      buttonValue,
      items,
      selectedStatus,
      remainingBudget,
      setRemainingBudget,
      remainingCapacity,
      setRemainingCapacity
    );
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const buttonValue = (e.target as HTMLSelectElement).value;
    handleClickSelction(buttonValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("sheet in character form submission: ", sheet);
    const newSheet = createNewSheet(sheet);
    onFormSubmit(newSheet);
  };

  return (
    <div className="flex justify-center flex-row mt-4 md:flex-row md:space-x-8 md:mt-0">
      <form
        onSubmit={handleSubmit}
        className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
      >
        <div className="text-center text-white text-xl leading-8 dark:text-gray-300">{`${user}'s New Character`}</div>
        <div className="m-4 text-center">
          <div className="m-4 text-center">
            <Input
              onChange={(e) => setSheet.setName(e.target.value)}
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
                onChange={(e) =>
                  setSheet.setProwess(parseInt(e.target.value) || 0)
                }
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Finesse"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) =>
                  setSheet.setFinesse(parseInt(e.target.value) || 0)
                }
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
                onChange={(e) =>
                  setSheet.setConstitution(parseInt(e.target.value) || 0)
                }
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Focus"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) =>
                  setSheet.setFocus(parseInt(e.target.value) || 0)
                }
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
                onChange={(e) =>
                  setSheet.setWillpower(parseInt(e.target.value) || 0)
                }
              />
              <br />
              <p className="text-white font-medium leading-8 dark:text-gray-300">
                {"Motivation"}
              </p>
              <Input
                type="number"
                min={0}
                max={4}
                onChange={(e) =>
                  setSheet.setMotivation(parseInt(e.target.value) || 0)
                }
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
              {/* <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Remainig Capacity: ${remainingCapacity}Kg`}
              </p> */}
            </div>
            <div>
              {/* <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Total Budget: ${budget}$`}
              </p> */}
              {/* <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Remainig Budget: ${remainingBudget}$`}
              </p> */}
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
