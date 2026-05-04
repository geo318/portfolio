import { BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";
import { CyberButton } from "@/components/ui/cyber-button";
import { profile } from "@/content/portfolio";

export function ContactSection() {
	return (
		<SectionShell
			id="contact"
			eyebrow="// Sector 09 // Contact"
			code="HANDSHAKE"
			title={
				<>
					Let&apos;s talk{" "}
					<span className="text-primary text-glow">frontend systems</span>.
				</>
			}
			subtitle="Open to discussing 3D, graphics-heavy frontend work, real-time UI, and maintainable product architecture."
			scanLabel="Client Boundary"
		>
			<div className="panel corner-brackets scan-target relative p-5">
				<div className="flex flex-wrap gap-3">
					<CyberButton asChild>
						<a href={`mailto:${profile.email}`}>
							<Mail aria-hidden="true" />
							Email
						</a>
					</CyberButton>
					<CyberButton asChild variant="secondary">
						<a href={profile.github} target="_blank" rel="noreferrer">
							<Code2 aria-hidden="true" />
							GitHub
						</a>
					</CyberButton>
					<CyberButton asChild variant="ghost">
						<a href={profile.linkedin} target="_blank" rel="noreferrer">
							<BriefcaseBusiness aria-hidden="true" />
							LinkedIn
						</a>
					</CyberButton>
					<CyberButton disabled variant="ghost">
						Download CV unavailable
					</CyberButton>
				</div>
			</div>
		</SectionShell>
	);
}
