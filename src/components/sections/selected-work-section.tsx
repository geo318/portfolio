import { Code2 } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";
import { ScanLabel } from "@/components/layout/scan-label";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/portfolio";

export function SelectedWorkSection() {
	return (
		<SectionShell
			id="work"
			eyebrow="// Sector 05 // Selected Work"
			code="CASE_STUDIES"
			title={
				<>
					Selected projects from{" "}
					<span className="text-primary text-glow">the CV</span>.
				</>
			}
			subtitle="Advisor platforms, marketplaces, communication tooling, financial integrations, ERP work, and a personal multi-tenant marketplace."
			scanLabel="Project Config"
			scanDetail="Selected CV projects mapped from typed content; links render only when provided."
		>
			<div className="grid gap-4 md:grid-cols-2">
				{projects.map((project, index) => (
					<Reveal key={project.title} delay={index * 0.04}>
						<TiltCard
							className="panel corner-brackets scan-target relative flex min-h-80 flex-col p-5"
							intensity={7}
						>
							{index === 0 ? (
								<ScanLabel detail="Repeated project card: static data, optional external link, client tilt only.">
									Project Card
								</ScanLabel>
							) : null}
							<div className="mb-4 flex items-start justify-between gap-4">
								<h3 className="text-2xl font-semibold leading-tight">
									{project.title}
								</h3>
								{project.github ? (
									<a
										href={project.github}
										target="_blank"
										rel="noreferrer"
										className="grid size-9 place-items-center border border-border text-muted-foreground transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
										aria-label={`${project.title} GitHub`}
									>
										<Code2 className="size-5" />
									</a>
								) : null}
							</div>
							{project.company || project.role ? (
								<div className="mb-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
									{project.company ? (
										<span className="text-primary">{project.company}</span>
									) : null}
									{project.company && project.role ? <span>/</span> : null}
									{project.role ? <span>{project.role}</span> : null}
								</div>
							) : null}
							<p className="text-sm leading-7 text-muted-foreground">
								{project.copy}
							</p>
							<div className="mt-auto flex flex-wrap gap-2 pt-6">
								{project.tags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="rounded-none border-secondary/30 bg-secondary/5 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary transition group-hover:border-primary/40 group-hover:text-primary"
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
