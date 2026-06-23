import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Fixa a raiz do workspace nesta pasta (evita detecção de lockfiles externos).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
