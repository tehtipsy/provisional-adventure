import { ItemsProps } from "@/utils/props/ItemsProps";

interface WeightRatingProps {
  selectedItems: string[];
  itemsWeightRatings: ItemsProps;
};

export default function calculateWeightRating(props: WeightRatingProps): number {
  let weight = 0;
  props.selectedItems.forEach((itemName) => {
    const item = Object.values(props.itemsWeightRatings)
      .flat()
      .find((item) => item.name === itemName);
    if (item && item.weight) {
      weight += item.weight;
    }
  });
  return weight;
}
