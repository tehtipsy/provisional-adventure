import { GlobalContextProvider } from "@/contexts/globalContext";
import { TurnContextProvider } from "@/contexts/turnContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <TurnContextProvider>
        <Component {...pageProps} />
      </TurnContextProvider>
    </GlobalContextProvider>
  );
}
