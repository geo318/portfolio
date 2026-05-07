import { Check } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";
import { Reveal } from "@/components/motion/reveal";
import { performanceHabits } from "@/content/portfolio";

export function PerformanceSection() {
	return (
		<SectionShell
			id="performance"
			eyebrow="// Sector 06 // Performance Habits"
			code="PROFILING_BOARD"
			title={
				<>
					Quality habits that show up{" "}
					<span className="text-secondary cyan-glow">in delivery</span>.
				</>
			}
			subtitle="Recurring delivery habits: typed boundaries, refactoring, SEO, deployment, API tests, and maintainability."
			scanLabel="Performance Guard"
		>
			<div className="panel corner-brackets scan-target relative overflow-hidden p-5">
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{performanceHabits.map((habit, index) => (
						<Reveal key={habit} delay={index * 0.018}>
							<div className="flex items-center gap-3 border border-border bg-background/60 p-3 font-mono text-xs text-foreground transition hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
								<span className="grid size-6 shrink-0 place-items-center border border-primary/50 text-primary">
									<Check className="size-3.5" aria-hidden="true" />
								</span>
								{habit}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</SectionShell>
	);
}
