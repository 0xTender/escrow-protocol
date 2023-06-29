// generate context for theme

import { type Dispatch, type SetStateAction, createContext } from "react";

export type ThemeContextType = {
  theme: "dark" | "light" | undefined;
  setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {
    // do nothing
  },
});

export const ThemeProvider = ThemeContext.Provider;
