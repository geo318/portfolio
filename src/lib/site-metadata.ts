import { profile } from "@/content/portfolio";

export const siteKeywords = [
	"Giorgi Lomidze",
	"Full-stack Software Engineer",
	"React Developer",
	"Next.js Developer",
	"TypeScript Engineer",
	"Node.js Developer",
	"Frontend Architect",
	"Product Engineer",
	"GraphQL",
	"ConnectRPC",
	"Tbilisi Georgia",
];

export const siteDescription =
	"CV-backed portfolio for Giorgi Lomidze, a full-stack software engineer with 6+ years of React, Next.js, TypeScript, Node.js, SQL, API integration, and product delivery experience.";

export const siteTitle = "Giorgi Lomidze | Full-stack Software Engineer";

export function getSiteUrl() {
	const rawUrl =
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: undefined) ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
		"http://localhost:3000";

	return rawUrl.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${getSiteUrl()}${normalizedPath}`;
}

export const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	jobTitle: profile.role,
	description: profile.positioning,
	email: `mailto:${profile.email}`,
	telephone: profile.phone,
	url: getSiteUrl(),
	address: {
		"@type": "PostalAddress",
		addressLocality: "Tbilisi",
		addressCountry: "GE",
	},
	sameAs: [profile.github, profile.linkedin],
	knowsAbout: siteKeywords.filter((keyword) => keyword !== profile.name),
};

export const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	name: siteTitle,
	description: siteDescription,
	url: getSiteUrl(),
	inLanguage: "en",
	mainEntity: personJsonLd,
};
