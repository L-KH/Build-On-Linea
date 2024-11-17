/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'replicate.delivery','ipfs.io', 'oaidalleapiprodscus.blob.core.windows.net', 'pbs.twimg.com', 'abs.twimg.com'],

  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  eslint: {
    // Ignore during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
