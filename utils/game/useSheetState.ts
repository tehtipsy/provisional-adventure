import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/contexts/globalContext";


export default function useSheetState() {
  const { user } = useContext(GlobalContext);

  const [name, setName] = useState("");

  const [prowess, setProwess] = useState(0);
  const [finesse, setFinesse] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [focus, setFocus] = useState(0);
  const [willpower, setWillpower] = useState(0);
  const [motivation, setMotivation] = useState(0);

  const initialBudget = 100;
  const [budget, setBudget] = useState(initialBudget);
  
  const [size, setSize] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    console.log("willpower in useSheetState: ",willpower);
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
    },
  };
}
