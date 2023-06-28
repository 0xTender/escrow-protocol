import { type AppType } from "next/app";

import { api } from "@app/utils/api";

import "@app/styles/globals.css";
import { FCC } from "@app/utils";
import { ThemeProvider } from "@app/hooks/useTheme";
import { useState } from "react";
import { WagmiWrapper } from "@app/components/WagmiWrapper";

const ThemeContextWrapper: FCC = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light" | "front">("light");

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
