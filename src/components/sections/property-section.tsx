import { ScanLabel } from "@/components/layout/scan-label";
import { SectionShell } from "@/components/layout/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { experience } from "@/content/portfolio";

export function PropertySection() {
	return (
		<SectionShell
			id="experience"
			eyebrow="// Sector 07 // Experience"
			code="TIMELINE"
			title={
				<>
					Professional timeline, <span className="text-primary text-glow">without filler</span>.
				</>
			}
			subtitle="The CV condensed: companies, responsibilities, and the systems I touched."
			scanLabel="CV Timeline"
			scanDetail="Typed experience entries from portfolio content; rendered as repeated cards."
		>
			<div className="grid gap-4 lg:grid-cols-2">
				{experience.map((item, index) => (
					<Reveal key={`${item.company}-${item.period}`} delay={index * 0.035}>
						<TiltCard
							className="panel corner-brackets scan-target relative h-full p-5"
							intensity={6}
						>
							{index === 0 ? (
								<ScanLabel detail="Repeated timeline card: static CV data inside a React card wrapper.">
									Timeline Card
								</ScanLabel>
							) : null}
							<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
								<div>
									<div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
										{item.period}
									</div>
									<h3 className="mt-2 text-2xl font-semibold">{item.company}</h3>
								</div>
								<div className="max-w-72 text-right font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-muted-foreground">
									{item.role}
								</div>
							</div>
							<ul className="space-y-3 text-sm leading-7 text-muted-foreground">
								{item.items.map((detail) => (
									<li key={detail} className="flex gap-3">
										<span className="mt-1 font-mono text-primary">▸</span>
										<span>{detail}</span>
									</li>
								))}
							</ul>
						</TiltCard>
					</Reveal>
				))}
			</div>
		</SectionShell>
	);
}
