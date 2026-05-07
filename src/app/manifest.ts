import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Giorgi Lomidze Portfolio",
		short_name: "GL Portfolio",
		description: "Full-stack software engineering portfolio for Giorgi Lomidze.",
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#070a0f",
		theme_color: "#9eff4f",
		icons: [
			{
				src: "/icon.svg",
				sizes: "any",
				type: "image/svg+xml",
				purpose: "any",
			},
		],
		categories: ["portfolio", "productivity", "developer"],
	};
}
