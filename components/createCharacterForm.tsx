import {
  FormEvent,
  useContext,
} from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { SelectSizeForm } from "@/components/ui/selectCharacterSize";
import { SelectOriginForm } from "@/components/ui/selectOriginForm";
import useSheetState from "@/utils/game/newSheet/useSheetState";
import { createNewSheet } from "@/utils/game/newSheet/newCharacterSheet";
import { handleTotal } from "@/utils/game/newSheet/handleTotal";
import useSelectedStatus from "@/utils/game/newSheet/useSelectedStatus";
import initializeSelectedStatus from "@/utils/game/newSheet/initializeSelectedStatus";

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
  const { sheet, setSheet } = useSheetState();
  const initialSelectedStatus = initializeSelectedStatus(items);
  const [selectedStatus, handleClickSelection] = useSelectedStatus(
    initialSelectedStatus
  );

  const handleClick = (buttonValue: string) => {
    handleClickSelection(buttonValue);
    setSheet.setSelectedItems((prev) =>
      selectedStatus[buttonValue]
        ? prev.filter((item) => item !== buttonValue)
        : [...prev, buttonValue]
    );
    handleTotal({
      buttonValue,
      items,
      selectedStatus,
      budget: sheet.budget,
      setBudget: setSheet.setBudget,
      capacity: sheet.totalWeight,
      setCapacity: setSheet.setTotalWeight,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("sheet in character form submission: ", sheet);
    const newSheet = createNewSheet(sheet);
    onFormSubmit(newSheet);
  };

  const categories = ["weapons", "armor", "misc"]; // get item categories from config, set in db

  return (
    <div className="flex justify-center flex-row mt-4 md:flex-row md:space-x-8 md:mt-0">
      <form
        onSubmit={handleSubmit}
        className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
      >
        <div className="text-center text-white text-xl leading-8 dark:text-gray-300">{`${sheet.user}'s New Character`}</div>
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
                {sheet.prowess}
                {" Prowess"}
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
                {sheet.finesse}
                {" Finesse"}
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
                {sheet.constitution}
                {" Constitution"}
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
                {sheet.focus}
                {" Focus"}
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
                {sheet.willpower}
                {" Willpower"}
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
                {sheet.motivation}
                {" Motivation"}
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
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {"Select Size"}
              </p>
            </div>
            <div className="text-center">
              <SelectSizeForm
                setSizeSelection={(e) =>
                  setSheet.setSize(
                    parseInt((e.target as HTMLSelectElement).value) || 0
                  )
                }
              />
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {"Select Origin"}
              </p>
            </div>
            <div className="text-center">
              <SelectOriginForm
                setOriginSelection={(e) =>
                  setSheet.setOrigin((e.target as HTMLSelectElement).value)
                }
              />
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Encumbrance Rating: ${sheet.encumbrance}`}
              </p>
            </div>
            <div>
              <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                {`Remainig Budget: ${sheet.budget} Coin`}
              </p>
            </div>
            <div>
              {categories.map((category) => (
                <div key={category}>
                  <p className="text-white text-lg text-center leading-8 dark:text-gray-300">
                    {`Select ${category}`}
                  </p>
                  <br />
                  <div className="text-center">
                    {items[category].map((item: Item) => (
                      <div key={`div-button-${item.name}`}>
                        <Button
                          key={item.name}
                          className={`${
                            selectedStatus[item.name] === true
                              ? " bg-purple-900 hover:bg-purple-800 md:active:bg-purple-700"
                              : ""
                          } ${
                            item.cost && item.cost > sheet.budget
                              ? "opacity-50"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick((e.target as HTMLButtonElement).value);
                          }}
                          value={item.name}
                          disabled={
                            selectedStatus[item.name] === false
                              ? item.cost
                                ? item.cost > sheet.budget
                                : false
                              : false
                          }
                        >
                          {`${item.name} | 
                            ${item.cost ? item.cost : 0} Coin | 
                            ${item.weight ? item.weight : 0} wr`}
                        </Button>
                        <br />
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
