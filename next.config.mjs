/** @type {import('next').NextConfig} */

const getApiOrigins = () => {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://swap-shop-be.onrender.com";
  try {
    const origin = new URL(apiBase).origin;
    const wsOrigin = origin.replace(/^https:/i, "wss:").replace(/^http:/i, "ws:");
    return { origin, wsOrigin };
  } catch {
    return {
      origin: "https://swap-shop-be.onrender.com",
      wsOrigin: "wss://swap-shop-be.onrender.com",
    };
  }
};

const { origin: apiOrigin, wsOrigin: apiWsOrigin } = getApiOrigins();

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js / React need inline + eval in practice for this app setup
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  [
    "img-src 'self' data: blob:",
    "https://res.cloudinary.com",
    "https://images.unsplash.com",
    "https://plus.unsplash.com",
    "https://randomuser.me",
    "https://tse1.mm.bing.net",
    "https://tse2.mm.bing.net",
    "https://images.search.yahoo.com",
    "https://fastly.picsum.photos",
  ].join(" "),
  "media-src 'self' blob: https://res.cloudinary.com",
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} ${apiWsOrigin} https://api.cloudinary.com`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.paystack.com https://*.paystack.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "tse1.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "images.search.yahoo.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
