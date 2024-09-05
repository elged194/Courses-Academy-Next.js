/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "plus.unsplash.com",
      //   port: "",
      //   pathname: "/**",
      // },

      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
