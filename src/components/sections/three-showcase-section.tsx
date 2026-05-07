"use client";

import {
	useEffect,
	useRef,
	useState,
	type PointerEvent,
} from "react";
import { SectionShell } from "@/components/layout/section-shell";
import { ScanLabel } from "@/components/layout/scan-label";
import { profile } from "@/content/portfolio";

type OsApp = {
	id: string;
	name: string;
	process: string;
	role: string;
	stack: string[];
	description: string;
	bullets: string[];
	icon: string;
	accent: "primary" | "secondary";
};

type WindowState = {
	id: string;
	x: number;
	y: number;
	w: number;
	z: number;
	minimized: boolean;
	maximized: boolean;
};

const osApps: OsApp[] = [
	{
		id: "runtime",
		name: "advisor_desktop.app",
		process: "Alpheya",
		role: "Advisor-facing platform",
		stack: ["Next.js", "React", "TypeScript", "Turborepo"],
		description:
			"Financial platform work in a large monorepo: client, account, transfer, and reference-data flows with strict integration and maintainability requirements.",
		bullets: [
			"Migrated flows from GraphQL patterns to ConnectRPC services.",
			"Handled SSR/RSC constraints and production-grade data flow.",
			"Improved maintainability through stronger typing and shared patterns.",
		],
		icon: "▣",
		accent: "primary",
	},
	{
		id: "realtime",
		name: "proxied_platform.app",
		process: "Proxied",
		role: "Lead full-stack work",
		stack: ["Next.js", "TypeScript", "Express", "Docker"],
		description:
			"Mobile proxy marketplace work across websites, dashboards, internal tools, backend APIs, SEO, and deployment workflows.",
		bullets: [
			"Led buyer, hoster, and staff-facing platform features.",
			"Reviewed code and helped define engineering standards.",
			"Set up development and staging environments with CI/CD.",
		],
		icon: "◉",
		accent: "secondary",
	},
	{
		id: "domain",
		name: "integration_layer.sys",
		process: "Service boundaries",
		role: "API and DTO mapping",
		stack: ["GraphQL", "ConnectRPC", "Buf", "Zod"],
		description:
			"Integration work is where small mistakes become expensive. I keep service clients, mapping, validation, and UI state separated enough to debug and change.",
		bullets: [
			"Builds typed integration layers around generated clients.",
			"Uses shared schemas and explicit DTO mappers.",
			"Keeps transport details out of reusable UI components.",
		],
		icon: "◈",
		accent: "primary",
	},
	{
		id: "webgl",
		name: "product_ui.exe",
		process: "Complex interfaces",
		role: "Forms, dashboards, flows",
		stack: ["React Hook Form", "React Query", "Tailwind", "Storybook"],
		description:
			"Most of my value is in product surfaces that combine forms, tables, permissions, service state, loading paths, validation, and edge cases.",
		bullets: [
			"Builds UI around behavior and contracts first.",
			"Keeps reusable pieces small enough to reason about.",
			"Treats empty, loading, error, and stale states as core UX.",
		],
		icon: "◇",
		accent: "secondary",
	},
	{
		id: "performance",
		name: "delivery_guard.bin",
		process: "Refactor and quality",
		role: "Maintainability",
		stack: ["Testing", "SEO", "CI/CD", "Code review"],
		description:
			"I care about code that a team can keep shipping: sensible abstractions, useful tests, performance where it affects users, and review habits that reduce future cost.",
		bullets: [
			"Refactors complex codebases without breaking product flow.",
			"Adds API and feature coverage where behavior matters.",
			"Improves SEO and load time when the website depends on it.",
		],
		icon: "▤",
		accent: "secondary",
	},
	{
		id: "public-code",
		name: "blob_api_repo.exe",
		process: "Public GitHub sample",
		role: "Multi-tenant filesystem",
		stack: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "Drizzle"],
		description:
			"Visible public architecture sample: a TypeScript monorepo with framework-agnostic domain logic, PostgreSQL metadata, pluggable blob stores, JWT auth, REST API, and Next.js UI.",
		bullets: [
			"Separates core filesystem logic from storage adapters.",
			"Uses Drizzle/PostgreSQL for metadata persistence.",
			"Shows API, web, and package boundaries in one repo.",
		],
		icon: "▦",
		accent: "primary",
	},
];

const initialWindows: WindowState[] = [
	{
		id: "runtime",
		x: 152,
		y: 64,
		w: 430,
		z: 11,
		minimized: false,
		maximized: false,
	},
	{
		id: "domain",
		x: 308,
		y: 192,
		w: 460,
		z: 12,
		minimized: false,
		maximized: false,
	},
];

export function ThreeShowcaseSection() {
	return (
		<SectionShell
			id="three-lab"
			eyebrow="// Sector 03 // GL OS Workstation"
			code="OS_SHELL_01"
			title={
				<>
					CV signals as an{" "}
					<span className="text-primary text-glow">interactive workstation</span>.
				</>
			}
			subtitle="Open the processes and inspect CV work areas: advisor platforms, marketplace dashboards, integrations, product UI, delivery quality, and public code."
			scanLabel="Client Workstation"
			scanDetail="React client state controls draggable windows, launcher, minimize, and maximize."
		>
			<ProjectsOS />
		</SectionShell>
	);
}

function ProjectsOS() {
	const [windows, setWindows] = useState<WindowState[]>(initialWindows);
	const [startOpen, setStartOpen] = useState(false);
	const [desktopSize, setDesktopSize] = useState({ width: 0, height: 0 });
	const desktopRef = useRef<HTMLDivElement>(null);
	const zTopRef = useRef(12);
	const dragRef = useRef<{
		id: string;
		offsetX: number;
		offsetY: number;
	} | null>(null);

	const focus = (id: string) => {
		const next = zTopRef.current + 1;
		zTopRef.current = next;
		setWindows((items) =>
			items.map((item) =>
				item.id === id ? { ...item, z: next, minimized: false } : item,
			),
		);
	};

	const open = (id: string) => {
		setStartOpen(false);
		const next = zTopRef.current + 1;
		zTopRef.current = next;
		setWindows((items) => {
			const existing = items.find((item) => item.id === id);
			if (existing) {
				return items.map((item) =>
					item.id === id
						? { ...item, z: next, minimized: false, maximized: false }
						: item,
				);
			}

			const index = items.length;
			return [
				...items,
				{
					id,
					x: 120 + index * 34,
					y: 54 + index * 30,
					w: id === "domain" ? 500 : 460,
					z: next,
					minimized: false,
					maximized: false,
				},
			];
		});
	};

	const close = (id: string) => {
		dragRef.current = null;
		setWindows((items) => items.filter((item) => item.id !== id));
	};

	const minimize = (id: string) => {
		dragRef.current = null;
		setWindows((items) =>
			items.map((item) =>
				item.id === id ? { ...item, minimized: true } : item,
			),
		);
	};

	const toggleMinimized = (id: string) => {
		const target = windows.find((item) => item.id === id);
		if (!target) {
			open(id);
			return;
		}
		if (target.minimized) focus(id);
		else minimize(id);
	};

	const toggleMaximized = (id: string) => {
		dragRef.current = null;
		const next = zTopRef.current + 1;
		zTopRef.current = next;
		setWindows((items) =>
			items.map((item) =>
				item.id === id
					? {
							...item,
							z: next,
							minimized: false,
							maximized: !item.maximized,
						}
					: item,
			),
		);
	};

	const resetLayout = () => {
		dragRef.current = null;
		zTopRef.current = 12;
		setStartOpen(false);
		setWindows(initialWindows);
	};

	const restoreAll = () => {
		setStartOpen(false);
		setWindows((items) =>
			items.map((item) => ({
				...item,
				minimized: false,
				maximized: false,
			})),
		);
	};

	const openAll = () => {
		setStartOpen(false);
		let nextZ = zTopRef.current;
		setWindows(
			osApps.map((app, index) => {
				nextZ += 1;
				return {
					id: app.id,
					x: 118 + (index % 3) * 52,
					y: 44 + (index % 4) * 42,
					w: app.id === "domain" ? 500 : 460,
					z: nextZ,
					minimized: index > 2,
					maximized: false,
				};
			}),
		);
		zTopRef.current = nextZ;
	};

	const closeAll = () => {
		dragRef.current = null;
		setStartOpen(false);
		setWindows([]);
	};

	useEffect(() => {
		const desktop = desktopRef.current;
		if (!desktop) return;

		const syncSize = () => {
			const rect = desktop.getBoundingClientRect();
			setDesktopSize({ width: rect.width, height: rect.height });
		};
		const observer = new ResizeObserver(syncSize);
		syncSize();
		observer.observe(desktop);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const onMove = (event: globalThis.PointerEvent) => {
			const drag = dragRef.current;
			const desktop = desktopRef.current;
			if (!drag || !desktop) return;

			const rect = desktop.getBoundingClientRect();
			setWindows((items) =>
				items.map((item) => {
					if (item.id !== drag.id) return item;
					const renderedWidth = getRenderedWindowWidth(item.w, rect.width);
					const maxX = Math.max(8, rect.width - renderedWidth - 8);
					const maxY = Math.max(0, rect.height - 80);
					return {
						...item,
						x: clamp(event.clientX - rect.left - drag.offsetX, 8, maxX),
						y: clamp(event.clientY - rect.top - drag.offsetY, 8, maxY),
					};
				}),
			);
		};

		const onUp = () => {
			dragRef.current = null;
		};

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
	}, []);

	const startDrag = (event: PointerEvent<HTMLDivElement>, id: string) => {
		const desktop = desktopRef.current;
		const target = windows.find((item) => item.id === id);
		if (!desktop || !target || target.maximized) return;

		focus(id);
		const rect = desktop.getBoundingClientRect();
		dragRef.current = {
			id,
			offsetX: event.clientX - rect.left - target.x,
			offsetY: event.clientY - rect.top - target.y,
		};
	};

	return (
		<div className="corner-brackets scan-target relative overflow-hidden border border-primary/25 bg-background/75 shadow-[0_24px_100px_rgb(0_0_0/0.32)] backdrop-blur">
			<ScanLabel detail="Client component: local React state, pointer drag, no server mutation.">
				OS Shell
			</ScanLabel>
			<div className="flex items-center justify-between gap-4 border-b border-border/60 bg-muted/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
				<span className="text-primary">GL/OS - Workstation</span>
				<span className="hidden sm:inline">
					{windows.length} processes / {profile.location}
				</span>
			</div>

			<div
				ref={desktopRef}
				className="micro-pixel-grid relative h-[620px] select-none overflow-hidden bg-[#05070f] sm:h-[680px]"
			>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgb(57_215_255/0.16),transparent_34%),radial-gradient(circle_at_34%_80%,rgb(158_255_79/0.1),transparent_28%),linear-gradient(145deg,rgb(5_7_12/0.62),rgb(9_12_23/0.86))]"
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute inset-0 opacity-20 scanline"
					aria-hidden="true"
				/>

				<div className="absolute left-4 top-4 z-10 grid grid-cols-2 gap-3 sm:grid-cols-1">
					{osApps.map((app) => (
						<button
							key={app.id}
							type="button"
							onClick={() => open(app.id)}
							onDoubleClick={() => open(app.id)}
							className="group flex w-[112px] flex-col items-center gap-1.5 p-2 text-center transition hover:bg-primary/10"
						>
							<span
								className={`grid size-12 place-items-center border bg-background/75 font-mono text-2xl backdrop-blur transition ${accentClasses(app.accent).icon}`}
							>
								{app.icon}
							</span>
							<span className="max-w-[104px] overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[9px] leading-tight text-foreground/85 group-hover:text-primary">
								{app.name}
							</span>
						</button>
					))}
				</div>

				{windows.map((windowState) => {
					const app = osApps.find((item) => item.id === windowState.id);
					if (!app || windowState.minimized) return null;
					const accent = accentClasses(app.accent);
					const width = getRenderedWindowWidth(
						windowState.w,
						desktopSize.width,
					);
					const left = windowState.maximized
						? 8
						: desktopSize.width
							? clamp(
									windowState.x,
									8,
									Math.max(8, desktopSize.width - width - 8),
								)
							: windowState.x;
					const top = windowState.maximized
						? 8
						: desktopSize.height
							? clamp(windowState.y, 8, Math.max(8, desktopSize.height - 80))
							: windowState.y;
					const renderedWidth = windowState.maximized
						? Math.max(280, desktopSize.width - 16)
						: width;
					const renderedHeight = windowState.maximized
						? Math.max(360, desktopSize.height - 16)
						: undefined;

					return (
						<div
							key={windowState.id}
							onPointerDown={() => focus(windowState.id)}
							className={`absolute border bg-background/92 shadow-[0_18px_70px_rgb(0_0_0/0.48)] backdrop-blur ${accent.window}`}
							style={{
								left,
								top,
								width: renderedWidth,
								height: renderedHeight,
								zIndex: windowState.z,
							}}
						>
							<div
								onPointerDown={(event) => startDrag(event, windowState.id)}
								className={`flex items-center justify-between gap-3 border-b border-border/60 bg-muted/35 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground ${
									windowState.maximized ? "cursor-default" : "cursor-move"
								}`}
							>
								<span className="flex shrink-0 items-center gap-2">
									<MacButton
										tone="close"
										label="Close"
										onClick={() => close(windowState.id)}
									/>
									<MacButton
										tone="minimize"
										label="Minimize"
										onClick={() => minimize(windowState.id)}
									/>
									<MacButton
										tone="expand"
										label={
											windowState.maximized ? "Restore window" : "Expand window"
										}
										onClick={() => toggleMaximized(windowState.id)}
									/>
								</span>
								<span className="flex min-w-0 flex-1 items-center gap-2 pl-1">
									<span className={accent.text}>{app.icon}</span>
									<span className="truncate text-foreground/90">{app.name}</span>
								</span>
							</div>

							<div
								className={
									windowState.maximized
										? "h-[calc(100%-37px)] overflow-y-auto p-5 sm:p-6"
										: "max-h-[430px] overflow-y-auto p-4"
								}
							>
								<div className="mb-3 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
									<span>
										<span className={accent.text}>Process:</span> {app.process}
									</span>
									<span>{app.role}</span>
								</div>
								<p className="text-sm leading-7 text-muted-foreground">
									{app.description}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{app.stack.map((item) => (
										<span
											key={item}
											className={`border bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${accent.badge}`}
										>
											{item}
										</span>
									))}
								</div>
								<ul className="mt-5 space-y-2 font-mono text-xs leading-6 text-foreground/88">
									{app.bullets.map((bullet) => (
										<li key={bullet} className="flex gap-2">
											<span className={accent.text}>▸</span>
											<span>{bullet}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex items-center gap-2 border-t border-border/60 bg-muted/30 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
				<button
					type="button"
					onClick={() => setStartOpen((current) => !current)}
					className="border border-primary/70 bg-primary/10 px-2 py-1 text-primary transition hover:bg-primary/20"
				>
					Start
				</button>
				{startOpen ? (
					<div className="absolute bottom-10 left-3 z-50 w-72 border border-primary/35 bg-background/95 p-3 shadow-[0_18px_70px_rgb(0_0_0/0.48)] backdrop-blur">
						<div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
							GL/OS Launcher
						</div>
						<div className="grid gap-1">
							<StartAction label="Open default workspace" onClick={resetLayout} />
							<StartAction label="Open all processes" onClick={openAll} />
							<StartAction label="Restore all windows" onClick={restoreAll} />
							<StartAction label="Close all windows" onClick={closeAll} />
						</div>
						<div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer"
								className="border border-border bg-background/70 px-2 py-1 text-center text-muted-foreground transition hover:border-secondary/60 hover:text-secondary"
							>
								GitHub
							</a>
							<a
								href={`mailto:${profile.email}`}
								className="border border-border bg-background/70 px-2 py-1 text-center text-muted-foreground transition hover:border-primary/60 hover:text-primary"
							>
								Email
							</a>
						</div>
					</div>
				) : null}
				<div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
					{windows.map((windowState) => {
						const app = osApps.find((item) => item.id === windowState.id);
						if (!app) return null;
						return (
							<button
								key={windowState.id}
								type="button"
								onClick={() => toggleMinimized(windowState.id)}
								className={`shrink-0 border px-2 py-1 transition ${
									windowState.minimized
										? "border-border text-muted-foreground hover:border-primary/60"
										: "border-primary/60 bg-primary/10 text-primary"
								}`}
							>
								{app.icon} {app.name}
							</button>
						);
					})}
				</div>
				<span className="hidden shrink-0 text-primary sm:inline">● online</span>
			</div>
		</div>
	);
}

function MacButton({
	tone,
	label,
	onClick,
}: {
	tone: "close" | "minimize" | "expand";
	label: string;
	onClick?: () => void;
}) {
	const toneClass =
		tone === "close"
			? "border-[#ff5f57]/70 bg-[#ff5f57]/80 hover:bg-[#ff5f57]"
			: tone === "minimize"
				? "border-[#ffbd2e]/70 bg-[#ffbd2e]/80 hover:bg-[#ffbd2e]"
				: "border-[#28c840]/70 bg-[#28c840]/80 hover:bg-[#28c840]";

	return (
		<button
			type="button"
			aria-label={label}
			onPointerDown={(event) => event.stopPropagation()}
			onClick={(event) => {
				event.stopPropagation();
				onClick?.();
			}}
			className={`size-3 rounded-full border text-transparent shadow-[0_0_10px_rgb(0_0_0/0.22)] transition ${toneClass}`}
		/>
	);
}

function StartAction({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center justify-between border border-border bg-background/70 px-3 py-2 text-left text-muted-foreground transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
		>
			<span>{label}</span>
			<span className="text-primary">↵</span>
		</button>
	);
}

function accentClasses(accent: OsApp["accent"]) {
	if (accent === "secondary") {
		return {
			icon: "border-secondary/55 text-secondary group-hover:border-secondary",
			window: "border-secondary/35",
			text: "text-secondary",
			badge: "border-secondary/35 text-secondary",
		};
	}

	return {
		icon: "border-primary/55 text-primary group-hover:border-primary",
		window: "border-primary/35",
		text: "text-primary",
		badge: "border-primary/35 text-primary",
	};
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function getRenderedWindowWidth(targetWidth: number, desktopWidth: number) {
	if (!desktopWidth) return targetWidth;
	return Math.min(targetWidth, Math.max(280, desktopWidth - 16));
}
