import { AttributesProps } from "@/utils/props/CharacterProps";

export default function getAttributeTotal(attributes: AttributesProps) {
  const attributesTotals: { [key: string]: number } = {};
  Object.keys(attributes).forEach((attributeName) => {
    const attribute = attributes[attributeName];
    attributesTotals[attributeName] = Object.values(attribute).reduce(
      (a, b) => a + b,
      0
    );
  });
  return attributesTotals;
}