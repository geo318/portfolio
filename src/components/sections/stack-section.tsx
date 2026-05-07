import { SectionShell } from "@/components/layout/section-shell";
import { ScanLabel } from "@/components/layout/scan-label";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { skillMatrix } from "@/content/portfolio";

export function StackSection() {
	return (
		<SectionShell
			id="stack"
			eyebrow="// Sector 02 // Technical Stack"
			code="PARTS_MATRIX"
			title={
				<>
					Technology I have used in{" "}
					<span className="text-secondary cyan-glow">real product work</span>.
				</>
			}
			subtitle="Grouped from the CV: frontend, backend/API, database/ORM, and platform tooling."
			scanLabel="Typed Stack Map"
			scanDetail="Typed skill matrix from content config; no runtime fetch here."
		>
			<div className="grid gap-4 lg:grid-cols-4">
				{skillMatrix.map((group, groupIndex) => (
					<Reveal key={group.category} delay={groupIndex * 0.035}>
						<TiltCard
							className="panel corner-brackets scan-target relative h-full p-4"
							intensity={6}
						>
							{groupIndex === 0 ? (
								<ScanLabel detail="Repeated static card group from CV stack categories.">
									Config Card
								</ScanLabel>
							) : null}
							<h3 className="mb-4 border-b border-border/60 pb-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
								{group.category}
							</h3>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item, index) => (
									<span
										key={item}
										className="inline-flex items-center gap-2 border border-border bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground/90 transition hover:-translate-y-0.5 hover:border-secondary/50 hover:text-secondary"
									>
										<span className="text-muted-foreground">
											{String(index + 1).padStart(2, "0")}
										</span>
										{item}
									</span>
								))}
							</div>
						</TiltCard>
					</Reveal>
				))}
			</div>
		</SectionShell>
	);
}
