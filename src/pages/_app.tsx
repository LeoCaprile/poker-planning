import SwitchTheme from "@/modules/ToolBar/SwitchTheme";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { version } from "@/../package.json";
import dynamic from "next/dynamic";
const Toaster = dynamic(() =>
  import("react-hot-toast").then((mod) => mod.Toaster)
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <SwitchTheme />
      <Component {...pageProps} />
      <span className="absolute top-0 right-0">v{version}</span>
    </ConvexClientProvider>
  );
}
