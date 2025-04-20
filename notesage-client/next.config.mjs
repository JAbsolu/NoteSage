/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env["NEXT_PUBLIC_OPENAI_API_KEY"],
        OPENAI_ORG_ID: process.env["NEXT_PUBLIC_OPENAI_ORG_ID"],
        OPENAI_PROJECT_ID: process.env["NEXT_PUBLIC_OPENAI_PROJECT_ID"],
        API_URL: process.env["API_URL"]
    }
};

export default nextConfig;
