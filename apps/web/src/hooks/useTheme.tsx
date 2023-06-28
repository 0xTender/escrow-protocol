// generate context for theme

import { Dispatch, SetStateAction, createContext } from "react";

export type ThemeContextType = {
  theme: "dark" | "light" | "front";
  setTheme: Dispatch<SetStateAction<"dark" | "light" | "front">>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;
