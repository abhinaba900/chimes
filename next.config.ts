import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  
  transpilePackages: ["gsap"],
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },

  // 👇 Here is the Webpack HMR delay configuration
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        // 5 Hours in milliseconds (18,000,000 ms)
        // This effectively DISABLES auto-updates.
        aggregateTimeout: 1000, 
        
        // Optional: Check for changes once every second (more stable)
        poll: 1000, 
      };
    }
    return config;
  },
};

export default nextConfig;