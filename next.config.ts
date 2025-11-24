import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/visuAR",
  assetPrefix: "/visuAR/",
  images: { unoptimized: true },
};

export default nextConfig;
