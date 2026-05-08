import type { Metadata, Viewport } from "next";
import {
	absoluteUrl,
	getSiteUrl,
	siteDescription,
	siteKeywords,
	siteTitle,
	websiteJsonLd,
} from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: {
		default: siteTitle,
		template: "%s | Giorgi Lomidze",
	},
	description: siteDescription,
	applicationName: "Giorgi Lomidze Portfolio",
	keywords: siteKeywords,
	authors: [{ name: "Giorgi Lomidze" }],
	creator: "Giorgi Lomidze",
	publisher: "Giorgi Lomidze",
	category: "portfolio",
	alternates: {
		canonical: "/",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		title: siteTitle,
		description: siteDescription,
		url: "/",
		siteName: "Giorgi Lomidze Portfolio",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Giorgi Lomidze full-stack software engineer portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: siteDescription,
		images: ["/opengraph-image"],
	},
	icons: {
		icon: "/icon.svg",
		shortcut: "/icon.svg",
		apple: "/icon.svg",
	},
	manifest: "/manifest.webmanifest",
	verification: {
		other: {
			"portfolio-owner": "Giorgi Lomidze",
		},
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	colorScheme: "dark",
	themeColor: "#070a0f",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="h-full antialiased"
			style={{ backgroundColor: "#070a0f", color: "#f8fafc" }}
		>
			<body className="min-h-full" style={{ backgroundColor: "#070a0f", color: "#f8fafc" }}>
				<script
					type="application/ld+json"
					suppressHydrationWarning
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static site metadata.
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							...websiteJsonLd,
							url: getSiteUrl(),
							image: absoluteUrl("/opengraph-image"),
						}),
					}}
				/>
				{children}
			</body>
		</html>
	);
}
