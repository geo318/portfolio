import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Giorgi Lomidze | Frontend Systems Engineer",
	description:
		"3D-focused portfolio for Giorgi Lomidze: React, Next.js, TypeScript, real-time UI, DDD architecture, and a focused Three.js/WebGL showcase.",
	authors: [{ name: "Giorgi Lomidze" }],
	openGraph: {
		title: "Giorgi Lomidze | Frontend Systems Engineer",
		description:
			"Production frontend experience with a focused Three.js/WebGL technical showcase.",
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
