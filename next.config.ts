import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_FORM_ENDPOINT: process.env.NEXT_PUBLIC_FORM_ENDPOINT || process.env.REACT_APP_FORM_ENDPOINT || "",
  },
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: true },
      { source: "/index.html", destination: "/fr", permanent: true },
      { source: "/project/Portfolio", destination: "/fr#projets", permanent: true },
    ];
  },
};

export default config;
