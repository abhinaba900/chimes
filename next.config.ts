import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. React Settings */
  reactStrictMode: false, // Kept false for GSAP stability

  // ✅ Performance: Removes console.logs in production to save mobile CPU
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* 2. Transpilation */
  // Only transpile what is strictly necessary.
  // Removed 'react-icons' etc. as they are better handled by modularizeImports below.
  transpilePackages: ["gsap", "react-leaflet", "leaflet", "swiper", "react-slick", "react-player", ],

  /* 3. Experimental & Performance Features */
  experimental: {
    // ✅ Next.js 15: React Compiler reduces re-renders automatically (Huge speed boost)
    reactCompiler: true,

    // ✅ Force SWC to handle heavy lifting faster than Babel
    forceSwcTransforms: true,

    // ✅ Optimization: Automatically tree-shakes these libraries
    optimizePackageImports: ["lucide-react", "date-fns", "lodash", "react-use"],

    // ❌ REMOVED: urlImports (This was incorrect usage for local node_modules)
  },

  /* 4. Images */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* 5. Build Options (Your preferences) */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* 6. Webpack Config */
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
