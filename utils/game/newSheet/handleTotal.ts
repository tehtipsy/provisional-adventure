interface Item {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
}

// handle total weight capacity and budget when creating a new character sheet 
export const handleTotal = (
  buttonValue: string,
  items: Record<string, Array<Item>>,
  selectedStatus: Record<string, boolean>,
  budget: number,
  setBudget: (value: number) => void,
  capacity: number,
  setCapacity: (value: number) => void
) => {
  const values = Object.values(items).flat();
  const item = values.find((value) => value.name === buttonValue);
  if (!item) return;
  const { cost = 0, weight = 0 } = item;
  const budgetChange = selectedStatus[buttonValue] ? cost : -cost;
  const capacityChange = selectedStatus[buttonValue] ? weight : -weight;
  setBudget(budget + budgetChange);
  setCapacity(capacity + capacityChange);
};
