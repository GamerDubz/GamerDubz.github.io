import type { NextConfig } from "next";

// The repo is named Portfolio, so GitHub Pages serves the site under this
// path instead of the domain root. Exposed to client code so hand-written
// asset URLs (next/image sources, the resume link) can be prefixed too.
const BASE_PATH = "/Portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  images: { unoptimized: true },
};

export default nextConfig;
