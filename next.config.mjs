/** @type {import('next').NextConfig} */
const nextConfig = {
    "compilerOptions": {
        "baseUrl": "src/",
        "paths": {
          "@/assets/*": ["assets/*"],
          "@/components/*": ["components/*"]
        }
      }
};

export default nextConfig;
