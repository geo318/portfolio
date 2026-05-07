import { SectionShell } from "@/components/layout/section-shell";
import { ScanLabel } from "@/components/layout/scan-label";
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
					Positioning notes.{" "}
					<span className="text-primary text-glow">Plain and useful</span>.
				</>
			}
			scanLabel="Static Notes"
			scanDetail="Application notes are typed copy, not generated at runtime."
		>
			<div className="grid gap-4 lg:grid-cols-3">
				{applicationNotes.map((note, index) => (
					<Reveal key={note.title} delay={index * 0.04}>
						<TiltCard
							className="panel corner-brackets scan-target relative h-full p-5"
							intensity={6}
						>
							{index === 0 ? (
								<ScanLabel detail="Repeated note card for compact claim boundaries and fit notes.">
									Note Card
								</ScanLabel>
							) : null}
							<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
								Portfolio Note
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
