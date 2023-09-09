interface Item {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
}

export default function calculateWeightRating(
  selectedItems: string[],
  itemsWeightRatings: Record<string, Array<Item>>
) {
  let weight = 0;
  selectedItems.forEach((itemName) => {
    const item = Object.values(itemsWeightRatings)
      .flat()
      .find((item) => item.name === itemName);
    if (item && item.weight) {
      weight += item.weight;
    }
  });
  return weight;
}
