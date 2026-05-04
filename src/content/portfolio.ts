import { z } from "zod";

const taggedCardSchema = z.object({
	title: z.string(),
	copy: z.string(),
	tags: z.array(z.string()).default([]),
});

export type LinkItem = {
	label: string;
	href: string;
	disabled?: boolean;
};
export type TaggedCard = z.infer<typeof taggedCardSchema>;

export const profile = z
	.object({
		name: z.string(),
		role: z.string(),
		location: z.string(),
		headline: z.string(),
		subcopy: z.string(),
		positioning: z.string(),
		email: z.string(),
		github: z.string().url(),
		linkedin: z.string().url(),
	})
	.parse({
		name: "Giorgi Lomidze",
		role: "Frontend Systems Engineer",
		location: "Tbilisi, Georgia",
		headline: "Building reliable frontend systems for interactive products.",
		subcopy:
			"TypeScript, React, Next.js, real-time UI, DDD architecture, and a focused Three.js/WebGL lab for graphics-heavy interfaces.",
		positioning:
			"Production frontend experience in React, Next.js, TypeScript, real-time product UI, architecture, and performance. This portfolio adds a focused Three.js/WebGL showcase to demonstrate how I approach graphics-heavy interfaces.",
		email: "giorgilomidze318@gmail.com",
		github: "https://github.com/geo318",
		linkedin: "https://www.linkedin.com/in/giorgi-lomidze-7569742bb/",
	});

export const navLinks: LinkItem[] = [
	{ label: "Fit", href: "#fit" },
	{ label: "3D Lab", href: "#three-lab" },
	{ label: "Architecture", href: "#architecture" },
	{ label: "Work", href: "#work" },
	{ label: "Contact", href: "#contact" },
];

export const heroNodes = [
	"React",
	"Next.js",
	"TypeScript",
	"WebSocket",
	"DDD",
	"Three.js",
] as const;

export const heroStats = [
	"6+ years",
	"Next.js / React",
	"Real-time UI",
	"DDD / SOLID",
	"Three.js Lab",
];

export const fitCards = z.array(taggedCardSchema).parse([
	{
		title: "Maintainable TypeScript UI",
		copy: "Comfortable improving existing code, extracting reusable utilities, reducing duplicated logic, and making fragile flows easier to test.",
		tags: ["TypeScript", "React", "Testing"],
	},
	{
		title: "Complex Refactoring",
		copy: "Refactors start from behavior and boundaries: preserve flows, isolate risk, then make the code easier to change.",
		tags: ["Incremental change", "DX", "Regression control"],
	},
	{
		title: "Real-time Product State",
		copy: "Experience with WebSocket-oriented UI, cache invalidation, timers, optimistic state, and user-facing status sync.",
		tags: ["WebSockets", "React Query", "Timers"],
	},
	{
		title: "3D/WebGL Readiness",
		copy: "Dedicated Three.js/WebGL showcase built to demonstrate graphics-heavy frontend thinking without overstating experience.",
		tags: ["Three.js", "R3F", "Performance"],
	},
	{
		title: "OOP + DDD Boundaries",
		copy: "Domain services, providers, adapters, controllers, and typed contracts keep business rules testable outside UI and transport.",
		tags: ["DDD", "SOLID", "OOP where useful"],
	},
	{
		title: "Property / Spatial Context",
		copy: "Property appraisal and market analysis background adds practical context around layouts, renovation decisions, and value signals.",
		tags: ["Real estate", "Valuation", "Spatial reasoning"],
	},
]);

export const skillMatrix = z
	.array(
		z.object({
			category: z.string(),
			items: z.array(z.string()),
		}),
	)
	.parse([
		{
			category: "Frontend",
			items: [
				"React",
				"Next.js 16",
				"TypeScript",
				"App Router",
				"React Server Components",
				"Tailwind CSS",
				"shadcn/ui",
				"Framer Motion",
				"TanStack Query",
				"Zod",
				"Storybook",
			],
		},
		{
			category: "Graphics",
			items: [
				"Three.js",
				"React Three Fiber",
				"Drei",
				"WebGL",
				"Canvas",
				"SVG",
				"Spatial UI",
				"Scene optimization",
			],
		},
		{
			category: "Backend / Integration",
			items: [
				"Bun",
				"Elysia",
				"Node.js",
				"REST APIs",
				"WebSockets",
				"GraphQL",
				"ConnectRPC / Protobuf",
				"Clerk",
				"Drizzle",
				"PostgreSQL",
				"Docker",
			],
		},
		{
			category: "Architecture / Quality",
			items: [
				"DDD",
				"SOLID",
				"OOP where useful",
				"CI/CD",
				"Vitest/Jest",
				"Playwright",
				"Performance profiling",
				"Accessibility",
				"Typed contracts",
			],
		},
	]);

export const architectureLayers = [
	{
		title: "UI Layer",
		items: [
			"Next.js App Router",
			"Server Components",
			"Client Components",
			"React Query",
			"shadcn/ui",
		],
	},
	{
		title: "Application Layer",
		items: ["Actions", "API clients", "Use cases", "Validation", "Auth guards"],
	},
	{
		title: "Domain Layer",
		items: [
			"Product",
			"Inventory",
			"Auction",
			"Cart",
			"Order",
			"Payment",
			"Tenant",
		],
	},
	{
		title: "Infrastructure Layer",
		items: [
			"Drizzle/PostgreSQL",
			"Elysia/Bun API",
			"WebSockets",
			"Clerk",
			"Payment providers",
		],
	},
];

export const projects = z
	.array(
		taggedCardSchema.extend({
			github: z.string().url().optional(),
		}),
	)
	.parse([
		{
			title: "imall - Multi-tenant Marketplace",
			tags: [
				"Next.js 16",
				"React",
				"TypeScript",
				"Bun",
				"Elysia",
				"Drizzle",
				"PostgreSQL",
				"Clerk",
				"WebSockets",
				"DDD",
			],
			copy: "Path-based multi-tenant commerce platform with catalog, admin, inventory concepts, auctions, real-time bidding architecture, and typed domain boundaries.",
			github: "https://github.com/geo318/imall",
		},
		{
			title: "Real-time Auction UI",
			tags: [
				"WebSocket",
				"React Query",
				"Timers",
				"Cache invalidation",
				"Performance",
			],
			copy: "Live bidding interface with stable callbacks, optimized timers, winning-state UI, bid increment utilities, and real-time updates without polling.",
		},
		{
			title: "Enterprise Frontend / Advisor Desktop",
			tags: [
				"Next.js",
				"TypeScript",
				"GraphQL",
				"ConnectRPC",
				"Protobuf",
				"Storybook",
				"Testing",
			],
			copy: "Production frontend work in a large TypeScript monorepo with integration-heavy UI, generated clients, reference data flows, forms, and maintainability constraints.",
		},
		{
			title: "Property Appraisal & Market Analysis",
			tags: [
				"Real estate",
				"Valuation",
				"Market analysis",
				"Regression support",
				"Report writing",
			],
			copy: "Practical experience preparing property valuation and market analysis materials, useful for understanding how real users evaluate spaces, renovation, location, and property characteristics.",
		},
	]);

export const performanceHabits = [
	"Dynamic import heavy scenes",
	"Suspense boundaries",
	"React.memo for expensive components",
	"Refs for previous values",
	"Memoized callbacks",
	"WebSocket instead of polling",
	"Code-split Three.js",
	"Reuse geometries/materials",
	"Dispose GPU resources",
	"Mobile fallback",
	"Reduced motion support",
	"Measured profiling before optimization",
];

export const applicationNotes = [
	{
		title: "3D Graphics Experience",
		copy: "My production background is strongest in TypeScript, React, Next.js, complex UI systems, real-time flows, and performance-sensitive frontend work. I have not spent years as a dedicated 3D graphics engineer, so I do not want to overstate that. To close this gap directly, this portfolio includes a focused Three.js/WebGL showcase using React Three Fiber. It demonstrates scene composition, interaction, state isolation, lazy loading, instancing/reuse patterns, cleanup of GPU resources, responsive fallback behavior, and performance-minded rendering.",
	},
	{
		title: "OOP Approach",
		copy: "I use OOP where it gives clear boundaries and testable behavior: domain services, providers, adapters, controllers, and scene systems. In marketplace work, logic such as auctions, inventory reservation, payments, cart/order behavior, and bid increments is separated from transport and UI. I prefer a DDD/SOLID-friendly structure where API controllers delegate to services, UI projects domain state, and shared rules are tested as utilities or services.",
	},
	{
		title: "Code Samples",
		copy: "My main public code sample is the imall multi-tenant marketplace project: github.com/geo318/imall. It demonstrates Next.js 16, React, TypeScript, App Router, Bun/Elysia backend, Drizzle/PostgreSQL, Clerk authentication, Tailwind/shadcn UI, React Query, WebSocket-oriented auction flows, and domain-oriented architecture.",
	},
];

export const scanLabels = [
	"Server Component",
	"Client Boundary",
	"Lazy-loaded 3D",
	"Domain Service",
	"WebSocket Event",
	"Tested Utility",
	"Cached Content",
	"Performance Guard",
];
