"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { InteractiveBackdrop } from "@/components/motion/interactive-backdrop";
import { PerformanceMonitor } from "@/components/motion/performance-monitor";
import { ApplicationNotes } from "@/components/sections/application-notes";
import { ArchitectureSection } from "@/components/sections/architecture-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FitSection } from "@/components/sections/fit-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LiveChatSection } from "@/components/sections/live-chat-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { PropertySection } from "@/components/sections/property-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { StackSection } from "@/components/sections/stack-section";
import { ThreeShowcaseSection } from "@/components/sections/three-showcase-section";
import { useScanMode } from "@/features/scan-mode/store";
import { cn } from "@/lib/utils";

export function PortfolioPage() {
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
			<SiteHeader />
			<HeroSection />
			<FitSection />
			<StackSection />
			<ThreeShowcaseSection />
			<ArchitectureSection />
			<SelectedWorkSection />
			<PerformanceSection />
			<PropertySection />
			<ApplicationNotes />
			<LiveChatSection />
			<ContactSection />
			<footer className="border-t border-border/40">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
					<span>
						<span className="text-primary">GL_</span> Giorgi Lomidze / Portfolio
					</span>
					<span>
						Built with Next.js 16, TypeScript, R3F, and blueprint discipline.
					</span>
				</div>
			</footer>
		</main>
	);
}
