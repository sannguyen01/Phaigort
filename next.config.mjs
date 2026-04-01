/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.phaigort.com",
      },
    ],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              isProd
                ? "script-src 'self' 'unsafe-inline'"
                : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // next/font/google self-hosts fonts at build time — no external font domains needed
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: https://cdn.phaigort.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            // Do NOT add `preload` until phaigort.com is on the HSTS preload list
            // (https://hstspreload.org). Premature preload permanently locks browsers
            // into HTTPS-only, making DNS migrations or SSL incidents unrecoverable.
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
