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
		phone: z.string(),
		github: z.string().url(),
		linkedin: z.string().url(),
		cvHref: z.string(),
	})
	.parse({
		name: "Giorgi Lomidze",
		role: "Full-stack Software Engineer",
		location: "Tbilisi, Georgia",
		headline:
			"Full-stack engineer building reliable product interfaces and integrations.",
		subcopy:
			"6+ years with TypeScript, React, Next.js, Node.js, SQL, GraphQL, ConnectRPC, and API integrations.",
		positioning:
			"Frontend-heavy full-stack work across product UI, backend services, integrations, typed boundaries, performance, and practical delivery.",
		email: "geo.lomidze@gmail.com",
		phone: "+995 595 350 320",
		github: "https://github.com/geo318",
		linkedin: "https://www.linkedin.com/in/geo318/",
		cvHref: "/Giorgi-Lomidze-CV.pdf",
	});

export const navLinks: LinkItem[] = [
	{ label: "Stack", href: "#stack" },
	{ label: "Workstation", href: "#three-lab" },
	{ label: "Projects", href: "#work" },
	{ label: "Experience", href: "#experience" },
	{ label: "Chat", href: "#chat" },
];

export const heroNodes = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"SQL",
	"ConnectRPC",
] as const;

export const heroStats = [
	"6+ years",
	"React / Next.js",
	"Node.js / APIs",
	"GraphQL / RPC",
	"SQL / Docker",
];

export const fitCards = z.array(taggedCardSchema).parse([
	{
		title: "Frontend-heavy full-stack delivery",
		copy: "Strongest where product UI meets backend reality: forms, dashboards, data flows, service integration, SSR/RSC boundaries, and maintainable code.",
		tags: ["React", "Next.js", "Node.js"],
	},
	{
		title: "Financial and advisor-facing products",
		copy: "At Alpheya I work in a large Turborepo monorepo on wealth-management flows: clients, accounts, transfers, and reference data.",
		tags: ["Turborepo", "ConnectRPC", "GraphQL"],
	},
	{
		title: "Lead execution in startup environments",
		copy: "At Proxied I lead buyer, hoster, and staff-facing work across websites, dashboards, internal tools, APIs, and deployment workflows.",
		tags: ["Leadership", "Dashboards", "CI/CD"],
	},
	{
		title: "Maintainable refactoring",
		copy: "I improve fragile code by tightening types, extracting shared validation, simplifying DTO mapping, separating concerns, and making the next change cheaper.",
		tags: ["TypeScript", "Validation", "Refactoring"],
	},
	{
		title: "Performance and SEO where it matters",
		copy: "I have rebuilt and optimized product websites, improved load times, technical SEO, SSR, structured data, and frontend quality.",
		tags: ["Performance", "SEO", "SSR"],
	},
	{
		title: "Team impact beyond tickets",
		copy: "I mentor developers, review code, help define standards, and prefer decisions that reduce risk without adding ceremony.",
		tags: ["Code review", "Mentoring", "Standards"],
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
			category: "Languages",
			items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"],
		},
		{
			category: "Frontend",
			items: [
				"React",
				"Next.js",
				"App Router",
				"React Query",
				"Redux",
				"Zustand",
				"Jotai",
				"React Hook Form",
				"Tailwind CSS",
				"shadcn/ui",
				"Storybook",
			],
		},
		{
			category: "Backend / API",
			items: [
				"Node.js",
				"Express",
				"NestJS",
				"Laravel",
				"REST APIs",
				"GraphQL",
				"ConnectRPC",
				"TRPC",
				"Zod",
			],
		},
		{
			category: "Data / Platform",
			items: [
				"PostgreSQL",
				"MySQL",
				"SQLite",
				"MongoDB",
				"Drizzle ORM",
				"Prisma",
				"Sequelize",
				"Mongoose",
				"Docker",
				"CI/CD",
				"Linux",
				"Nginx",
				"Coolify",
				"Turborepo",
			],
		},
	]);

export const architectureLayers = [
	{
		title: "UI Layer",
		items: [
			"Typed React components",
			"Next.js routing",
			"Server/client boundaries",
			"Forms and validation",
			"Dashboard UX",
		],
	},
	{
		title: "Integration Layer",
		items: [
			"GraphQL clients",
			"ConnectRPC clients",
			"REST services",
			"DTO mappers",
			"Reference data adapters",
		],
	},
	{
		title: "Application Layer",
		items: [
			"Product flows",
			"Shared validation",
			"Repository modules",
			"Permission-aware UI",
			"Error and loading states",
		],
	},
	{
		title: "Platform Layer",
		items: [
			"SQL persistence",
			"Docker deployments",
			"CI/CD workflows",
			"SSR/RSC constraints",
			"Monitoring-friendly code",
		],
	},
];

export const projects = z
	.array(
		taggedCardSchema.extend({
			company: z.string().optional(),
			role: z.string().optional(),
			github: z.string().url().optional(),
		}),
	)
	.parse([
		{
			title: "Advisor Desktop / Wealth Platform Integrations",
			company: "Alpheya",
			role: "Senior Full-stack Engineer",
			tags: [
				"Next.js",
				"TypeScript",
				"React",
				"GraphQL",
				"ConnectRPC",
				"Buf",
				"Zod",
				"Turborepo",
			],
			copy: "Advisor-facing financial platform work across frontend architecture, service integration, and migration from GraphQL patterns to RPC services.",
		},
		{
			title: "Marketplace for Mobile Proxies",
			company: "Proxied",
			role: "Lead Full-stack Developer",
			tags: [
				"Next.js",
				"GraphQL",
				"Tailwind CSS",
				"Zod",
				"shadcn/ui",
				"Docker",
			],
			copy: "Led three developers and shipped buyer, hoster, and staff dashboards for a mobile proxy marketplace: onboarding, payouts, ticket triage, SEO, and backend tools.",
			github: "https://proxied.com",
		},
		{
			title: "Connect",
			company: "DHC",
			role: "Full-stack Developer",
			tags: [
				"Next.js",
				"RSC",
				"TRPC",
				"React Query",
				"Drizzle",
				"Matrix.js",
				"Zod",
			],
			copy: "Platform for doctors supporting people with disabilities. Integrated Matrix.js communication/file sharing, built TRPC endpoints, and created responsive chat UI.",
		},
		{
			title: "MoneyAlive",
			company: "Redberry",
			role: "Full-stack Developer",
			tags: ["Laravel", "PEST", "React", "PostgreSQL", "REST API"],
			copy: "Built a REST API bridge to a JavaScript SDK, covered behavior with PEST tests, created a React testing UI, and reviewed code.",
		},
		{
			title: "Skippit",
			company: "Skippit",
			role: "Full-stack Developer",
			tags: ["Laravel", "MySQL", "Next.js", "Tailwind", "Chart.js"],
			copy: "Worked on a vertical ERP SaaS: backend/frontend development, reusable React components, performance-minded refactoring, and code reviews.",
		},
		{
			title: "iMall - Multi-tenant Marketplace",
			company: "Personal Project",
			role: "Full-stack Engineer",
			tags: [
				"Next.js",
				"TypeScript",
				"Tailwind CSS",
				"SQL",
				"Auth",
				"Multi-tenant",
			],
			copy: "Marketplace focused on tenant-aware routing, catalog/listing flows, filters, vendor/admin surfaces, SEO pages, and modular architecture.",
			github: "https://imall.ge",
		},
	]);

export const experience = [
	{
		company: "Alpheya",
		role: "Senior Full-stack Engineer / Frontend-heavy, contract",
		period: "2025 - present",
		items: [
			"Wealth-management products in a large Turborepo monorepo.",
			"Migrated GraphQL integrations to ConnectRPC and Buf clients.",
			"Built/refactored client, account, transfer, and reference-data flows.",
		],
	},
	{
		company: "Proxied",
		role: "Lead Full-stack Engineer",
		period: "Sept. 2024 - present",
		items: [
			"Built websites, dashboards, internal tools, APIs, and backend services.",
			"Led buyer, hoster, and staff-facing platform features.",
			"Improved performance/SEO and set up Docker/Coolify deployments.",
		],
	},
	{
		company: "Redberry",
		role: "Full-stack Developer",
		period: "Oct. 2022 - Sept. 2024",
		items: [
			"Built SaaS with React, TypeScript, Laravel, and SQL.",
			"Designed REST APIs and business-critical product flows.",
			"Refactored complex codebases and mentored developers.",
		],
	},
	{
		company: "Barambo",
		role: "Full-stack Engineer, contract",
		period: "Aug. 2023 - Dec. 2023",
		items: [
			"Built catalog UI with live search and infinite scrolling.",
			"Created markdown blog support and a custom admin panel.",
			"Dockerized the app and implemented CI/CD.",
		],
	},
	{
		company: "WallyPay",
		role: "Front-end Developer",
		period: "Jul. 2021 - Oct. 2022",
		items: [
			"Rebuilt a jQuery/PHP website in Next.js.",
			"Improved maintainability, load time, SEO, and frontend quality.",
		],
	},
	{
		company: "Auczon",
		role: "Frontend Developer",
		period: "Jun. 2020 - Jul. 2021",
		items: [
			"Built user-facing flows for an e-commerce startup.",
			"Improved compatibility, accessibility, SEO, analytics, and ad integrations.",
		],
	},
];

export const performanceHabits = [
	"Keep contracts typed between UI and services",
	"Prefer shared validation over duplicated checks",
	"Map DTOs explicitly at boundaries",
	"Handle SSR/RSC constraints intentionally",
	"Use React Query for server-state ownership",
	"Refactor large components into smaller behavior units",
	"Treat SEO and load time as product quality",
	"Add tests around business-critical API behavior",
	"Use Docker and CI/CD for repeatable delivery",
	"Review code for maintainability, not only syntax",
	"Measure before optimizing",
	"Keep fallback and error states visible",
];

export const applicationNotes = [
	{
		title: "What I am strongest at",
		copy: "My strongest experience is frontend-heavy full-stack product work: React, Next.js, TypeScript, forms, dashboards, service integration, API boundaries, maintainability, and performance.",
	},
	{
		title: "How I approach architecture",
		copy: "I prefer clean boundaries over clever abstractions: typed contracts, DTO mapping, shared validation, focused service modules, and UI components small enough to reason about.",
	},
	{
		title: "Public GitHub signal",
		copy: "GitHub shows current and older samples. The strongest visible architecture repo is blob-api: a TypeScript monorepo with PostgreSQL metadata, pluggable blob stores, Fastify API, JWT auth, and Next.js UI.",
	},
];

export const scanLabels = [
	"Server Component",
	"Client Boundary",
	"Service Adapter",
	"Typed Contract",
	"Reference Data",
	"Tested Flow",
	"Cached State",
	"Performance Guard",
];
