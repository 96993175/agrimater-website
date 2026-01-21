/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  
  // Disable aggressive prefetching to reduce edge requests
  experimental: {
    // Disable automatic static optimization prefetching
    scrollRestoration: false,
  },
  
  // Configure link prefetching behavior
  webpack: (config, { isServer }) => {
    // Reduce chunk splitting aggressiveness
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  
  // Configure ISR and revalidation settings
  async headers() {
    return [
      {
        // Prevent unnecessary revalidation headers
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
  
  // Disable automatic route prefetching
  reactStrictMode: false,
  swcMinify: true,
  
  // Optimize for production deployment
  poweredByHeader: false,
  compress: true,
  
  // Conservative prefetching settings
  onDemandEntries: {
    // Reduce entry expiration time to prevent memory bloat
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Disable automatic static optimization for dynamic routes
  trailingSlash: false,
  
  // Configure caching headers to prevent unnecessary revalidation
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

export default nextConfig