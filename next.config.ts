import type { NextConfig } from "next";

const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  /* =====================================================
      1. React + Compiler Optimizations
  ====================================================== */
  reactStrictMode: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: true,
  },

  /* =====================================================
      2. Experimental (SAFE ONLY)
  ====================================================== */
  experimental: {
    reactCompiler: true,
    forceSwcTransforms: true,

    optimizePackageImports: [
      "lucide-react",
      "lodash",
      "gsap",
      "react-use",
      "react-icons",
      "react-player",
      "react-slick",
      "react-intersection-observer",
      // ❌ removed react-leaflet
      
    ],

    typedRoutes: true,
  },

  /* =====================================================
      3. Transpiling Packages
  ====================================================== */
  transpilePackages: [
    "gsap",
    "react-player",
    "react-slick",
    "react-intersection-observer",
    // ❌ removed react-leaflet
    // ❌ removed leaflet
    "lodash",
    "react-use",
    "react-icons",
  ],

  /* =====================================================
      4. Image Optimization
  ====================================================== */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* =====================================================
      5. ESLint + TypeScript
  ====================================================== */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /* =====================================================
      6. Cache Headers
  ====================================================== */
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/assets/(.*)",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
    ];
  },

  /* =====================================================
      7. Webpack (Leaflet removed)
  ====================================================== */
  webpack(config: any) {
    // Reduce bundle size using lodash-es
    config.resolve.alias = {
      ...config.resolve.alias,
      lodash: "lodash-es",
    };

    // Remove Node API polyfills (Next.js recommended)
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    };

    // ❌ completely removed Leaflet alias 
    // config.resolve.alias["leaflet"] = "leaflet/dist/leaflet.js";

    return config;
  },
};

export default nextConfig;