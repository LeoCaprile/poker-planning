import SwitchTheme from "@/modules/ToolBar/SwitchTheme";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { version } from "@/../package.json";

import { Poppins } from "next/font/google"

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConvexClientProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <SwitchTheme />
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
      <span className="absolute top-0 right-0">v{version} </span>
    </ConvexClientProvider>
  );
}
