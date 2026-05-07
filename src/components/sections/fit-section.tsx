import { SectionShell } from "@/components/layout/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Badge } from "@/components/ui/badge";
import { fitCards } from "@/content/portfolio";

export function FitSection() {
	return (
		<SectionShell
			id="fit"
			eyebrow="// Sector 01 // Profile"
			code="ENGINEERING_BRIEF"
			title={
				<>
					What I actually{" "}
					<span className="text-primary text-glow">bring to a team</span>.
				</>
			}
			subtitle="Frontend-heavy full-stack delivery, clean integrations, product ownership, refactoring discipline, and enough backend/platform range to move fast."
			scanLabel="Cached Content"
		>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{fitCards.map((item, index) => (
					<Reveal key={item.title} delay={index * 0.035}>
						<TiltCard
							className="panel corner-brackets scan-target relative h-full p-5"
							intensity={8}
						>
							<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
								Profile Signal
							</div>
							<h3 className="text-xl font-semibold">{item.title}</h3>
							<p className="mt-3 min-h-28 text-sm leading-7 text-muted-foreground">
								{item.copy}
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{item.tags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="rounded-none border-primary/30 bg-primary/5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary transition group-hover:border-secondary/40 group-hover:text-secondary"
									>
										{tag}
									</Badge>
								))}
							</div>
						</TiltCard>
					</Reveal>
				))}
			</div>
		</SectionShell>
	);
}
