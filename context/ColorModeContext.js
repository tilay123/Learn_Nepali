import { createContext, useState } from "react";

export const ColorContext = createContext("dark");

const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorContext.Provider value={{ toggleColorMode, mode }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorModeContextProvider;
