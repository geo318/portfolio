"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { InteractiveBackdrop } from "@/components/motion/interactive-backdrop";
import { PerformanceMonitor } from "@/components/motion/performance-monitor";
import { useScanMode } from "@/features/scan-mode/store";
import { cn } from "@/lib/utils";

export function PortfolioFrame({ children }: { children: React.ReactNode }) {
	const scanEnabled = useScanMode((state) => state.enabled);

	return (
		<main className={cn("min-h-screen text-foreground", scanEnabled && "architecture-scan")}>
			<InteractiveBackdrop />
			<PerformanceMonitor />
			<div className="pointer-events-none fixed inset-0 z-60 hidden scanline architecture-scan:block" />
			<SiteHeader />
			{children}
			<footer className="border-t border-border/40">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
					<span>
						<span className="text-primary">GL_</span> Giorgi Lomidze / Portfolio
					</span>
					<span>CV-backed copy / Next.js, TypeScript, React, and product systems.</span>
					<a
						href="https://github.com/geo318/portfolio"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-primary"
					>
						Source / github.com/geo318/portfolio
					</a>
				</div>
			</footer>
		</main>
	);
}
