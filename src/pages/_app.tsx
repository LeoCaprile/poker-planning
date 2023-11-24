import SwitchTheme from "@/modules/ToolBar/SwitchTheme";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { version } from "@/../package.json";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <SwitchTheme />
      <Component {...pageProps} />
      <span className="absolute top-0 right-0">version {version} </span>
    </ConvexClientProvider>
  );
}
