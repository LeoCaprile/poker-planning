import SwitchTheme from "@/components/Atoms/SwitchTheme";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { version } from "@/../package.json";
import RoomToClipboard from "@/components/Atoms/RoomToClipboard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <SwitchTheme />
      <RoomToClipboard />
      <Component {...pageProps} />
      <span className="absolute top-0 right-0">version {version} </span>
    </ConvexClientProvider>
  );
}
