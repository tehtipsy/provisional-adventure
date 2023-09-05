import { useState, useEffect } from "react";

export default function useSheetState() {
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

  // useEffect(() => {
  //   console.log("Budget: ", budget);
  //   // setRemainingBudget((prev) => prev - budget);
  // }, [budget]);

  // useEffect(() => {
  //   console.log("Capacity: ", capacity);
  //   setRemainingCapacity((prev) => prev + capacity);
  // }, [capacity]);

  return {
    sheet: {
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
