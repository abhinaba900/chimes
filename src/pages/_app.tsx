import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "./AuthContext/AuthContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  // 1. Basic Metadata
  title: "Eco-Friendly Luxury Villas in Sarjapur | The Chimes by Raise Infra",
  description:
    "Discover The Chimes in Sarjapur—green-certified luxury villas with solar power, mud-brick cooling, vastu design, and premium amenities across 6.5 acres.",

  // 2. Open Graph (Facebook, LinkedIn, WhatsApp, Teams)
  openGraph: {
    title: "Eco-Friendly Luxury Villas in Sarjapur | The Chimes by Raise Infra",
    description:
      "Discover The Chimes in Sarjapur—green-certified luxury villas with solar power, mud-brick cooling, vastu design, and premium amenities across 6.5 acres.",
    url: "https://smartfactory.thirdeyegfx.com", // Your actual domain
    siteName: "Third Eye Creative",
    images: [
      {
        url: "/assets/Website.webp", // Path to your image in public folder
        width: 1200,
        height: 630,
        alt: "Third Eye Creative Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 3. Twitter Card (Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "Smart Inventory Management Software",
    description: "Improve manufacturing efficiency with Third Eye Creative.",
    images: ["/assets/Website.webp"], // Same image path
  },

  // 4. Base URL (Required for relative image paths to work in production)
  metadataBase: new URL("https://www.raiseinfra.in"),
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Analytics />
      {/* <SmoothScroller /> */}
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
