import { SectionShell } from "@/components/layout/section-shell";
import { TiltCard } from "@/components/motion/tilt-card";
import { architectureLayers } from "@/content/portfolio";

export function ArchitectureSection() {
	return (
		<SectionShell
			id="architecture"
			eyebrow="// Sector 04 // DDD Architecture"
			code="BOUNDARY_MAP"
			title={
				<>
					How I structure{" "}
					<span className="text-primary text-glow">product code</span>.
				</>
			}
			subtitle="Business rules stay testable and transport-independent."
			scanLabel="Domain Service"
		>
			<div className="panel corner-brackets scan-target relative overflow-hidden p-4 md:p-6">
				<div className="blueprint-grid absolute inset-0 opacity-40" />
				<div className="relative grid gap-4 lg:grid-cols-4">
					{architectureLayers.map((layer, index) => (
						<TiltCard
							key={layer.title}
							className="relative border border-border bg-background/80 p-4 backdrop-blur"
							intensity={5}
						>
							<div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
								<span
									className={
										index % 2 === 0 ? "text-primary" : "text-secondary"
									}
								>
									L{index + 1}
								</span>
								<span className="text-muted-foreground">{layer.title}</span>
							</div>
							<h3 className="mb-4 text-lg font-semibold">{layer.title}</h3>
							<ul className="space-y-2 font-mono text-xs text-muted-foreground">
								{layer.items.map((item) => (
									<li key={item} className="flex items-start gap-2">
										<span className="mt-1 text-primary">▸</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
							{index < architectureLayers.length - 1 ? (
								<div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-background px-1 font-mono text-primary lg:block">
									→
								</div>
							) : null}
						</TiltCard>
					))}
				</div>
			</div>
		</SectionShell>
	);
}
