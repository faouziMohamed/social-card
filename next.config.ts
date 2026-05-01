import type {NextConfig} from 'next';

const CORS_HEADERS = [
  {key: 'Access-Control-Allow-Origin', value: '*'},
  {key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS'},
  {key: 'Access-Control-Allow-Headers', value: 'Content-Type'},
];

// API routes serve images — not indexable content
const NOINDEX = [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {unoptimized: true},
  async headers() {
    return [
      // CORS + noindex on all API routes
      {
        source: '/api/:path*',
        headers: [...CORS_HEADERS, ...NOINDEX],
      },
    ];
  },
};

export default nextConfig;
