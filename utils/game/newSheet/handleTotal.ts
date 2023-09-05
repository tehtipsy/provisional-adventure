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

export const handleTotal = (
  buttonValue: string,
  items: Record<string, Array<Item>>,
  selectedStatus: Record<string, boolean>,
  remainingBudget: number,
  setRemainingBudget: (value: number) => void,
  remainingCapacity: number,
  setRemainingCapacity: (value: number) => void
) => {
  const values = Object.values(items).flat();
  const item = values.filter((value) => value.name === buttonValue)[0];
  const cost = item.cost;
  const weight = item.weight;
  if (selectedStatus[buttonValue] === true) {
    setRemainingBudget(cost ? remainingBudget + cost : (prev) => prev);
    setRemainingCapacity(weight ? remainingCapacity + weight : (prev) => prev);
  } else {
    setRemainingBudget(cost ? remainingBudget - cost : (prev) => prev);
    setRemainingCapacity(weight ? remainingCapacity - weight : (prev) => prev);
  }
};
