import { AttributeProps } from "@/utils/props/CharacterProps";

export const sumAttributeTotal = (attribute: AttributeProps) =>
  Object.values(attribute).reduce((a, b) => a + b, 0);
