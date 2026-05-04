"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ScanLabel } from "@/components/layout/scan-label";
import { SectionShell } from "@/components/layout/section-shell";

const DomainMapScene = dynamic(
	() =>
		import("@/features/three-lab/scene/domain-map-scene").then(
			(mod) => mod.DomainMapScene,
		),
	{
		ssr: false,
		loading: () => <ThreeFallback label="Loading 3D scene" />,
	},
);

const controls = [
	"Architecture Scan Mode",
	"Blueprint / Solid / Wireframe",
	"Lazy-loaded 3D",
	"WebSocket Event",
	"Domain Service",
	"Instanced Mesh",
	"Performance Guard",
	"Draw calls < 100",
];

export function ThreeShowcaseSection() {
	return (
		<SectionShell
			id="three-lab"
			eyebrow="// Sector 03 // Three.js / WebGL Showcase"
			code="DOMAIN_MAP_3D"
			title={
				<>
					Three.js / WebGL{" "}
					<span className="text-primary text-glow">Technical Showcase</span>
				</>
			}
			subtitle="A focused interactive scene built to demonstrate graphics-heavy frontend thinking: scene architecture, performance boundaries, state isolation, and maintainable rendering code."
			scanLabel="Lazy-loaded 3D"
		>
			<div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
				<div className="panel corner-brackets scan-target relative overflow-hidden">
					<ScanLabel>Lazy-loaded 3D</ScanLabel>
					<Suspense fallback={<ThreeFallback label="Preparing viewport" />}>
						<DomainMapScene />
					</Suspense>
				</div>

				<aside className="grid gap-4">
					<div className="panel corner-brackets scan-target relative p-4">
						<ScanLabel>Performance Guard</ScanLabel>
						<div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
							Scene Constraints
						</div>
						<div className="grid gap-2">
							{controls.map((control) => (
								<div
									key={control}
									className="flex items-center justify-between border border-border bg-background/60 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em]"
								>
									<span className="text-muted-foreground">{control}</span>
									<span className="text-primary">on</span>
								</div>
							))}
						</div>
					</div>

					<div className="panel corner-brackets p-4">
						<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
							Honesty boundary
						</div>
						<p className="text-sm leading-7 text-muted-foreground">
							The scene is a focused lab, not a claim of long production 3D
							tenure. It shows how I isolate state, lazy-load graphics code,
							handle fallbacks, and keep rendering logic maintainable.
						</p>
					</div>
				</aside>
			</div>
		</SectionShell>
	);
}

function ThreeFallback({ label }: { label: string }) {
	return (
		<div className="blueprint-grid grid min-h-[520px] place-items-center p-6">
			<div className="border border-primary/40 bg-background/80 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
				{label}
			</div>
		</div>
	);
}
