import { ItemsProps } from "@/utils/props/ItemsProps";

interface TotalWeightProps {
  selectedItems: string[];
  itemsWeightRatings: ItemsProps;
};

export default function calculateTotalWeight({
  selectedItems,
  itemsWeightRatings,
}: TotalWeightProps): number {
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
