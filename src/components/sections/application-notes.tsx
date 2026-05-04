import { SectionShell } from "@/components/layout/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { applicationNotes } from "@/content/portfolio";

export function ApplicationNotes() {
	return (
		<SectionShell
			id="notes"
			eyebrow="// Sector 08 // Application Notes"
			code="ANSWERS"
			title={
				<>
					Direct answers.{" "}
					<span className="text-primary text-glow">No inflated claims</span>.
				</>
			}
			scanLabel="Cached Content"
		>
			<div className="grid gap-4 lg:grid-cols-3">
				{applicationNotes.map((note, index) => (
					<Reveal key={note.title} delay={index * 0.04}>
						<TiltCard
							className="panel corner-brackets scan-target relative h-full p-5"
							intensity={6}
						>
							<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
								Application Note
							</div>
							<h3 className="text-xl font-semibold">{note.title}</h3>
							<p className="mt-4 text-sm leading-7 text-muted-foreground">
								{note.copy}
							</p>
						</TiltCard>
					</Reveal>
				))}
			</div>
		</SectionShell>
	);
}
