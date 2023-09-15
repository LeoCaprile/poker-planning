import SwitchTheme from "@/components/Atoms/SwitchTheme";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <SwitchTheme />
      <Component {...pageProps} />
    </ConvexClientProvider>
  );
}
