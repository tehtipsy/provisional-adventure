import { useState, createContext, ReactNode, useEffect } from "react";

interface GlobalContextProps {
  user: string;
  setUser: (user: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: "",
  setUser: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [username, setUsername] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        user: username,
        setUser: setUsername,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};