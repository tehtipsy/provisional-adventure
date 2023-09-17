import { useState, createContext, ReactNode} from "react";
import useActionState from "@/utils/game/useActionState";
import { ActionContextProps } from "@/utils/props/ActionResolverProps";

export const ActionContext = createContext<Partial<ActionContextProps>>({});

interface ActionContextProviderProps {
  children: ReactNode;
}

export const ActionContextProvider = (props: ActionContextProviderProps) => {
  const [reciver, setReciver] = useState<string | null>("");
  const [actionType, setActionType] = useState<string | null>("");
  const actionState = useActionState();

  const value = {
    ...actionState,
    reciver,
    setReciver,
    actionType,
    setActionType,
  };

  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
};
