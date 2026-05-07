"use client";

import { motion } from "framer-motion";
import { Code2, Download, Mail, MapPin, MoveUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { ScanLabel } from "@/components/layout/scan-label";
import { CyberButton } from "@/components/ui/cyber-button";
import { profile } from "@/content/portfolio";
import { SuitLoader } from "@/features/hero-suit/components/suit-loader";

const HeroSuitScene = dynamic(
	() =>
		import("@/features/hero-suit/scene/hero-suit-scene").then(
			(mod) => mod.HeroSuitScene,
		),
	{
		ssr: false,
		loading: () => <HeroSuitFallback />,
	},
);

export function HeroSection() {
	return (
		<section id="top" className="relative overflow-hidden">
			<div className="mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(620px,0.95fr)_minmax(0,1.05fr)]">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: "easeOut" }}
					className="hero-copy-base scan-target relative w-full min-w-0 justify-self-stretch"
				>
					<ScanLabel>CV Copy Source</ScanLabel>
					<div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
						<span className="text-primary">{profile.name}</span>
						<span>/</span>
						<span>{profile.role}</span>
						<span>/</span>
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="size-3" aria-hidden="true" />
							{profile.location}
						</span>
					</div>

					<h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
						Full-stack engineer building{" "}
						<span className="text-primary text-glow">
							reliable product interfaces and integrations.
						</span>
					</h1>

					<p className="mt-6 max-w-2xl border-l-2 border-primary/60 pl-4 font-mono text-sm leading-7 text-muted-foreground">
						{profile.subcopy}
					</p>

					<p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
						{profile.positioning}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<CyberButton asChild>
							<a href="#work">
								View work
								<MoveUpRight aria-hidden="true" />
							</a>
						</CyberButton>
						<CyberButton asChild variant="secondary">
							<a href={profile.cvHref} download>
								<Download aria-hidden="true" />
								Download CV
							</a>
						</CyberButton>
						<CyberButton asChild variant="ghost">
							<a href={profile.github} target="_blank" rel="noreferrer">
								<Code2 aria-hidden="true" />
								Open GitHub
							</a>
						</CyberButton>
						<CyberButton asChild variant="ghost">
							<a href={`mailto:${profile.email}`}>
								<Mail aria-hidden="true" />
								Contact
							</a>
						</CyberButton>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
					className="scan-target relative w-full min-w-0 justify-self-stretch lg:translate-x-6 xl:translate-x-10"
				>
					<ScanLabel>Lazy WebGL Boundary</ScanLabel>
					<div className="pointer-events-none absolute left-4 top-6 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
						Visual shell / WebGL
					</div>
					<HeroSuitScene />
				</motion.div>
			</div>
		</section>
	);
}

function HeroSuitFallback() {
	return (
		<div className="grid h-[430px] place-items-center sm:h-[540px] lg:h-[640px]">
			<SuitLoader label="Loading suit" />
		</div>
	);
}
