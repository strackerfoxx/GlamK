/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'ecommerce-backend-7iki.onrender.com',
        },
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
  }
// domains: [`localhost`, 'i.imgur.com', 'images.unsplash.com']
    

export default nextConfig;
