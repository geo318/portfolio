"use client";

import { MessageSquareText, Radar } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { navLinks } from "@/content/portfolio";
import { useScanMode } from "@/features/scan-mode/store";

export function SiteHeader() {
	const { enabled, toggle } = useScanMode();

	return (
		<header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
				<a
					href="#top"
					className="flex items-center gap-3"
					aria-label="Giorgi Lomidze home"
				>
					<span className="brand-mark corner-brackets grid size-9 place-items-center font-mono text-sm font-bold text-primary text-glow">
						<span className="brand-mark-label">GL</span>
					</span>
					<span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
						<span className="block text-primary">Giorgi Lomidze</span>
						<span>Full-stack Software Engineer</span>
					</span>
				</a>

				<nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground lg:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="transition hover:text-primary"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={toggle}
						aria-pressed={enabled}
						className="inline-flex h-9 items-center gap-2 border border-secondary/40 bg-secondary/10 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary transition hover:bg-secondary/20"
					>
						<Radar className="size-3.5" aria-hidden="true" />
						<span className="hidden sm:inline">Scan</span>
						<span>{enabled ? "On" : "Off"}</span>
					</button>
					<CyberButton asChild className="min-h-9 min-w-32 px-3 text-[10px]">
						<a href="#chat">
							<MessageSquareText aria-hidden="true" />
							Chat
						</a>
					</CyberButton>
				</div>
			</div>
		</header>
	);
}
