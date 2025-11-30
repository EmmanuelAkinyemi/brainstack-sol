import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // ✅ KEEP THIS: actions.json needs config because it's a static file
        source: "/actions.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Action-Version, X-Blockchain-Ids" },
        ],
      },
      // ❌ DELETE THE "/api/:path*" SECTION COMPLETELY
      // Your route.ts code handles API headers now. Removing this prevents duplicates.
    ];
  },
};

export default nextConfig;