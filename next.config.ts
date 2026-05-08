import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const immutableAssetCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-DNS-Prefetch-Control", value: "on" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
					},
				],
			},
			// Hashed Next chunks under /_next/static are immutable by default on Vercel.
			// Public GLB assets are not, so pin the model cache explicitly.
			{
				source: "/models/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: immutableAssetCache,
					},
					{
						key: "CDN-Cache-Control",
						value: immutableAssetCache,
					},
					{
						key: "Vercel-CDN-Cache-Control",
						value: immutableAssetCache,
					},
				],
			},
			{
				source: "/Giorgi-Lomidze-CV.pdf",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=300, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
	turbopack: {
		root: repoRoot,
	},
};

export default nextConfig;
