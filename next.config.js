/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  distDir: '.next',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'villaorit.co.il',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  output: 'standalone',
  env: {
    PUBLIC_FOLDER: './public',
  },
  assetPrefix: '',
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
  // הגדרת כתובות URL קבועות לדפים
  async redirects() {
    return [
      // URL ניהולי
      {
        source: '/villa-gilboa',
        destination: '/',
        permanent: true,
      },
      {
        source: '/villa-private-pool',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/northern-israel-family-vacation',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // הגדרת כותרות אבטחה
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/image/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 