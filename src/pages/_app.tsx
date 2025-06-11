import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "./AuthContext/AuthContext";
import { Analytics } from "@vercel/analytics/next"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Analytics />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
