import { type AppType } from "next/app";

import { api } from "@app/utils/api";

import "@app/styles/globals.css";
import { FCC } from "@app/utils";
import { ThemeProvider } from "@app/hooks/useTheme";
import { useEffect, useState } from "react";
import { WagmiWrapper } from "@app/components/WagmiWrapper";

const ThemeContextWrapper: FCC = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") {
      setTheme(localTheme);
    }
  }, []);

  return (
    <>
      <ThemeProvider value={{ theme, setTheme }}>
        <WagmiWrapper>{children}</WagmiWrapper>
      </ThemeProvider>
    </>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeContextWrapper>
      <Component {...pageProps} />
    </ThemeContextWrapper>
  );
};

export default api.withTRPC(MyApp);
