import { ItemsTotalProps } from "@/utils/props/ItemsProps";

// handle total weight capacity and budget when creating a new character sheet
export const handleTotal = ({
  buttonValue,
  items,
  selectedStatus,
  budget,
  setBudget,
  capacity,
  setCapacity,
}: ItemsTotalProps) => {
  const values = Object.values(items).flat();
  const item = values.find((value) => value.name === buttonValue);
  if (!item) return;
  const { cost = 0, weight = 0 } = item;
  const budgetChange = selectedStatus[buttonValue] ? cost : -cost;
  const capacityChange = selectedStatus[buttonValue] ? weight : -weight;
  setBudget(budget + budgetChange);
  setCapacity(capacity + capacityChange);
};
