import type { CSSProperties } from "react";
import { SectionShell } from "@/components/layout/section-shell";
import { TiltCard } from "@/components/motion/tilt-card";

export function PropertySection() {
	return (
		<SectionShell
			id="property"
			eyebrow="// Sector 07 // Property Context"
			code="VALUATION_GRID"
			title={
				<>
					Property appraisal{" "}
					<span className="text-primary text-glow">background</span>.
				</>
			}
			scanLabel="Tested Utility"
		>
			<div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
				<TiltCard
					className="panel corner-brackets scan-target relative p-5"
					intensity={5}
				>
					<p className="text-sm leading-8 text-muted-foreground">
						Alongside software work, I have experience preparing property
						valuation and market analysis materials: comparables, market trend
						reasoning, regression-supported checks, and structured report
						writing. For a product like 3D, this adds practical context around
						how people evaluate spaces, renovation decisions, layouts, and
						property value.
					</p>
				</TiltCard>

				<TiltCard
					className="panel corner-brackets scan-target blueprint-grid relative min-h-80 overflow-hidden p-5"
					intensity={7}
				>
					<svg
						className="parallax-chip absolute inset-0 h-full w-full"
						style={{ "--px": "10px", "--py": "-8px" } as CSSProperties}
						viewBox="0 0 620 340"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M65 70 H285 V160 H395 V285 H65 Z"
							stroke="var(--primary)"
							strokeOpacity="0.7"
						/>
						<path
							d="M285 70 H510 V285 H395 V160 H285 Z"
							stroke="var(--secondary)"
							strokeOpacity="0.65"
						/>
						<path
							d="M96 106 H244 V250 H96 Z"
							stroke="var(--primary)"
							strokeOpacity="0.35"
						/>
						<path
							d="M326 104 H476 V142 H326 Z"
							stroke="var(--secondary)"
							strokeOpacity="0.35"
						/>
						<path
							d="M326 176 H476 V250 H326 Z"
							stroke="var(--secondary)"
							strokeOpacity="0.35"
						/>
						<path
							d="M85 304 H538"
							stroke="var(--primary)"
							strokeOpacity="0.25"
						/>
						<path
							d="M100 304 V250 M155 304 V220 M210 304 V185 M265 304 V198 M320 304 V152 M375 304 V132 M430 304 V118 M485 304 V92"
							stroke="var(--primary)"
							strokeOpacity="0.45"
						/>
					</svg>
					<div
						className="parallax-chip absolute left-5 top-5 border border-primary/40 bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
						style={{ "--px": "-8px", "--py": "8px" } as CSSProperties}
					>
						Floor plan / comps
					</div>
					<div className="absolute bottom-5 right-5 grid gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
						{[
							"Renovation state",
							"Location signal",
							"Layout utility",
							"Market trend",
						].map((label) => (
							<div
								key={label}
								className="border border-border bg-background/80 px-3 py-2 transition hover:border-secondary/60 hover:text-secondary"
							>
								{label}
							</div>
						))}
					</div>
				</TiltCard>
			</div>
		</SectionShell>
	);
}
