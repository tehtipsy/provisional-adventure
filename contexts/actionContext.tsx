import useActionState from "@/utils/game/useActionState";
import { useState, createContext, ReactNode, useEffect } from "react";

interface actionContextProps {
  reciver: string;
  setReciver: (player: string) => void;
  actionType: string;
  setActionType: (actionType: string) => void;
}

export const ActionContext = createContext<actionContextProps>({
  reciver: "",
  setReciver: () => {},
  actionType: "",
  setActionType: () => {},
});

interface ActionContextProviderProps {
  children: ReactNode;
}

export const ActionContextProvider = (props: ActionContextProviderProps) => {
  const [reciver, setReciver] = useState("");
  const [actionType, setActionType] = useState("");
  const {
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    numDiceToRoll,
    setNumDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
  } = useActionState();

  const value = {
    reciver,
    setReciver,
    actionType,
    setActionType,
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    numDiceToRoll,
    setNumDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
  };

  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
};
