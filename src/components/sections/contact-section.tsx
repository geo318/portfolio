import { BriefcaseBusiness, Code2, Download, Mail, Phone } from "lucide-react";
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
					Contact and{" "}
					<span className="text-primary text-glow">full CV</span>.
				</>
			}
			subtitle="The CV has the full timeline. Best fit: frontend-heavy full-stack product work with React, Next.js, TypeScript, integrations, and maintainable delivery."
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
					<CyberButton asChild variant="secondary">
						<a href={profile.cvHref} download>
							<Download aria-hidden="true" />
							Download CV
						</a>
					</CyberButton>
					<CyberButton asChild variant="ghost">
						<a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
							<Phone aria-hidden="true" />
							Call
						</a>
					</CyberButton>
				</div>
			</div>
		</SectionShell>
	);
}
