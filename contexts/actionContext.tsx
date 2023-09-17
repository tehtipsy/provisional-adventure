import { useState, createContext, ReactNode} from "react";
import useActionState from "@/utils/game/useActionState";

interface actionContextProps { // fix useStateHook component to get rid of this
  reciver: string | null;
  setReciver: React.Dispatch<React.SetStateAction<string | null>>;
  actionType: string | null;
  setActionType: React.Dispatch<React.SetStateAction<string | null>>;
  selectedBodyPart: string | null;
  setSelectedBodyPart: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDamageType: string | null;
  setSelectedDamageType: React.Dispatch<React.SetStateAction<string | null>>;
  numDiceToRoll: number | null;
  setNumDiceToRoll: React.Dispatch<React.SetStateAction<number | null>>;
  successfulRolls: number | null;
  setSuccessfulRolls: React.Dispatch<React.SetStateAction<number | null>>;
  handleClearRolls: () => void;
}

export const ActionContext = createContext<Partial<actionContextProps>>({});

interface ActionContextProviderProps {
  children: ReactNode;
}

export const ActionContextProvider = (props: ActionContextProviderProps) => {
  const [reciver, setReciver] = useState<string | null>("");
  const [actionType, setActionType] = useState<string | null>("");
  const {
    selectedBodyPart,
    setSelectedBodyPart,
    selectedDamageType,
    setSelectedDamageType,
    numDiceToRoll,
    setNumDiceToRoll,
    successfulRolls,
    setSuccessfulRolls,
    handleClearRolls,
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
    handleClearRolls,
  };

  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
};
