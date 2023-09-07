import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/contexts/globalContext";

const initialBudget = 100;

export default function useSheetState() {
  const { user } = useContext(GlobalContext);

  const [name, setName] = useState("");

  const [prowess, setProwess] = useState(0);
  const [finesse, setFinesse] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [focus, setFocus] = useState(0);
  const [willpower, setWillpower] = useState(0);
  const [motivation, setMotivation] = useState(0);

  const [budget, setBudget] = useState(initialBudget);
  
  const [size, setSize] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [origin, setOrigin] = useState(""); // add origin useEffect here to apply origin bonuses

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  useEffect(() => {
    if (size === 3) {
      const maxCapacity = 3 + prowess;
      setCapacity(maxCapacity);
    } else if (size === 2) {
      const maxCapacity = 1 + prowess;
      setCapacity(maxCapacity);
    } else {
      setCapacity(prowess);
    }
  }, [size, prowess]);

  useEffect(() => {
    const bonus = 20 * willpower;
    // setBudget((prevBudget) => prevBudget + bonus); // doesnt update when willpower changes
    // setBudget(budget + bonus);
    setBudget(initialBudget + bonus); // LEAST SHIT OPTION I GUESS, add sum of items cost
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
      capacity,
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
      setCapacity,
      setBudget,
      setOrigin,
      setSelectedItems,
    },
  };
}
