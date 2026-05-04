"use client";

import { motion } from "framer-motion";
import { Code2, Mail, MapPin, MoveUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { ScanLabel } from "@/components/layout/scan-label";
import { TiltCard } from "@/components/motion/tilt-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { heroNodes, heroStats, profile } from "@/content/portfolio";

export function HeroSection() {
	return (
		<section id="top" className="relative overflow-hidden">
			<div className="mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: "easeOut" }}
					className="scan-target relative"
				>
					<ScanLabel>Server Component</ScanLabel>
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
						Building reliable frontend systems for{" "}
						<span className="text-primary text-glow">
							interactive products.
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
							<a href="#three-lab">
								View 3D Showcase
								<MoveUpRight aria-hidden="true" />
							</a>
						</CyberButton>
						<CyberButton asChild variant="secondary">
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
					className="relative"
				>
					<TiltCard
						className="panel corner-brackets scan-target relative overflow-hidden"
						intensity={7}
					>
						<ScanLabel>Client Boundary</ScanLabel>
						<div className="flex items-center justify-between border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
							<span className="text-primary">Architectural Viewport</span>
							<span>Blueprint / Domain Map</span>
						</div>
						<div className="blueprint-grid relative min-h-[440px] overflow-hidden p-5">
							<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/70 scan-bar" />
							<div
								className="parallax-chip absolute left-[8%] top-[12%] h-[68%] w-[84%] border border-primary/25"
								style={{ "--px": "14px", "--py": "10px" } as CSSProperties}
							/>
							<div
								className="parallax-chip absolute left-[18%] top-[24%] h-[46%] w-[64%] border border-secondary/20"
								style={{ "--px": "-10px", "--py": "14px" } as CSSProperties}
							/>
							<svg
								className="parallax-chip absolute inset-0 h-full w-full"
								style={{ "--px": "9px", "--py": "-7px" } as CSSProperties}
								viewBox="0 0 720 460"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M80 330 L350 105 L640 330 Z"
									stroke="var(--primary)"
									strokeOpacity="0.75"
								/>
								<path
									d="M124 315 L350 130 L590 315"
									stroke="var(--secondary)"
									strokeOpacity="0.55"
								/>
								<path
									d="M180 302 L350 172 L520 302"
									stroke="var(--primary)"
									strokeOpacity="0.42"
								/>
								<path
									d="M80 330 H640"
									stroke="var(--primary)"
									strokeOpacity="0.55"
								/>
								<path
									d="M350 105 V352"
									stroke="var(--secondary)"
									strokeOpacity="0.3"
									strokeDasharray="4 8"
								/>
								{heroNodes.map((_, index) => {
									const x = 130 + index * 92;
									const y = index % 2 === 0 ? 190 : 265;
									return (
										<circle
											key={_}
											cx={x}
											cy={y}
											r="5"
											fill="var(--primary)"
											opacity="0.95"
										/>
									);
								})}
							</svg>

							{heroNodes.map((node, index) => (
								<div
									key={node}
									className="parallax-chip absolute border border-primary/40 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary backdrop-blur transition hover:border-secondary hover:text-secondary"
									style={
										{
											left: `${10 + index * 13}%`,
											top: `${index % 2 === 0 ? 38 : 56}%`,
											"--px": `${index % 2 === 0 ? 14 : -12}px`,
											"--py": `${index % 2 === 0 ? -10 : 12}px`,
										} as CSSProperties
									}
								>
									{node}
								</div>
							))}

							<div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-5">
								{heroStats.map((stat, index) => (
									<div
										key={stat}
										className="parallax-chip border border-border bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition hover:border-primary/60 hover:text-primary"
										style={
											{
												"--px": `${(index - 2) * 4}px`,
												"--py": "6px",
											} as CSSProperties
										}
									>
										{stat}
									</div>
								))}
							</div>
						</div>
					</TiltCard>
				</motion.div>
			</div>
		</section>
	);
}
