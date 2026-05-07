import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Giorgi Lomidze | Full-stack Software Engineer",
	description:
		"CV-backed portfolio for Giorgi Lomidze: full-stack software engineer with 6+ years of React, Next.js, TypeScript, Node.js, SQL, API integration, and product delivery experience.",
	authors: [{ name: "Giorgi Lomidze" }],
	openGraph: {
		title: "Giorgi Lomidze | Full-stack Software Engineer",
		description:
			"Full-stack product engineering portfolio covering React, Next.js, TypeScript, Node.js, SQL, GraphQL, ConnectRPC, dashboards, marketplaces, and integrations.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="min-h-full">{children}</body>
		</html>
	);
}
