"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { InteractiveBackdrop } from "@/components/motion/interactive-backdrop";
import { PerformanceMonitor } from "@/components/motion/performance-monitor";
import { useScanMode } from "@/features/scan-mode/store";
import { cn } from "@/lib/utils";

const scanFacts = [
	{
		label: "Shell boundary",
		value: "Server page, client frame for scan state, backdrop, and live metrics.",
	},
	{
		label: "Chat path",
		value: "Provider request stays server-side; UI streams and memoizes repeated prompts.",
	},
	{
		label: "WebGL budget",
		value: "Suit scene is lazy loaded, DPR capped, and guarded by WebGL support checks.",
	},
	{
		label: "Content source",
		value: "Portfolio copy is typed config, CV-backed, and kept out of visual components.",
	},
	{
		label: "Render contract",
		value: "Heavy canvas work stays outside layout flow; reduced motion switches demand render.",
	},
];

export function PortfolioFrame({ children }: { children: React.ReactNode }) {
	const scanEnabled = useScanMode((state) => state.enabled);

	return (
		<main
			className={cn(
				"min-h-screen text-foreground",
				scanEnabled && "architecture-scan",
			)}
		>
			<InteractiveBackdrop />
			<PerformanceMonitor />
			<div className="pointer-events-none fixed inset-0 z-60 hidden scanline architecture-scan:block" />
			{scanEnabled ? <ScanModeHud /> : null}
			<SiteHeader />
			{children}
			<footer className="border-t border-border/40">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
					<span>
						<span className="text-primary">GL_</span> Giorgi Lomidze / Portfolio
					</span>
					<span>
						CV-backed copy / Next.js, TypeScript, React, and product systems.
					</span>
				</div>
			</footer>
		</main>
	);
}

function ScanModeHud() {
	return (
		<aside className="pointer-events-none fixed right-4 top-20 z-[70] hidden w-[min(22rem,calc(100vw-2rem))] border border-secondary/35 bg-background/82 p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground shadow-[0_24px_80px_rgb(0_0_0_/_0.34)] backdrop-blur-md lg:block">
			<div className="mb-4 flex items-center justify-between gap-4">
				<span className="text-primary">Architecture Scan</span>
				<span className="text-secondary">Live</span>
			</div>
			<div className="space-y-3">
				{scanFacts.map((fact) => (
					<div key={fact.label} className="border-l border-primary/35 pl-3">
						<div className="text-secondary">{fact.label}</div>
						<div className="mt-1 normal-case leading-5 tracking-[0.02em]">
							{fact.value}
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}
