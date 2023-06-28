// generate context for theme

import { Dispatch, SetStateAction, createContext } from "react";

export type ThemeContextType = {
  theme: "dark" | "light" | undefined;
  setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;
