import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import calculateEncumbranceTier from "@/utils/game/calculateEncumbranceTier";
import calculateWeightRating from "@/utils/game/calculateWeightRating";

const defaultBudget: number = 10; // set in config from db
const defaultSize: number = 2; // set in config from db
const defaultOrigin: string = "Commonfolk"; // set in config from db

interface Item {
  name: string;
  cost?: number;
  weight?: number;
  damage?: number;
  block?: number;
}

const itemsWeightRatings: Record<string, Array<Item>> = {
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

export default function useSheetState() {
  const { user } = useContext(GlobalContext);

  const [name, setName] = useState("");

  const [finesse, setFinesse] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [focus, setFocus] = useState(0);
  const [willpower, setWillpower] = useState(0);
  const [motivation, setMotivation] = useState(0);
  const [prowess, setProwess] = useState(0);

  const [budget, setBudget] = useState(defaultBudget);

  const [size, setSize] = useState(defaultSize);
  const [origin, setOrigin] = useState(defaultOrigin);
  const [encumbrance, setEncumbrance] = useState(0);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  // add origin useEffect here to apply origin bonuses
  useEffect(() => {
    const weight = calculateWeightRating({ selectedItems, itemsWeightRatings });
    setTotalWeight(weight);
  }, [selectedItems, itemsWeightRatings]);

  useEffect(() => {
    let encumbranceTier = 0;
    if (prowess !== 0) {
      encumbranceTier = calculateEncumbranceTier({ totalWeight, prowess });
    }
    setEncumbrance(encumbranceTier);
  }, [prowess, totalWeight]);

  useEffect(() => {
    if (size === 3) {
      setProwess((prev) => prev + 1);
      setConstitution((prev) => prev + 1);
      setFinesse((prev) => prev - 1);
    } else if (size === 1) {
      setFinesse((prev) => prev + 1);
      setProwess((prev) => prev - 1);
    }
  }, [size]);

  useEffect(() => {
    const bonus = 1 * willpower;
    setBudget(defaultBudget + bonus); // LEAST SHIT OPTION I GUESS, add sum of items cost
  }, [willpower]);

  return {
    sheet: {
      user,
      name,
      prowess,
      finesse,
      constitution,
      focus,
      willpower,
      motivation,
      size,
      encumbrance,
      budget,
      origin,
      selectedItems,
    },
    setSheet: {
      setName,
      setProwess,
      setFinesse,
      setConstitution,
      setFocus,
      setWillpower,
      setMotivation,
      setSize,
      setEncumbrance,
      setBudget,
      setOrigin,
      setSelectedItems,
    },
  };
}
