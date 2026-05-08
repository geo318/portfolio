"use client";

import { useEffect, useState } from "react";

type RuntimeStat = {
	label: string;
	value: string;
	max: string;
	ratio: number;
	tone: "primary" | "secondary";
};

export function PerformanceMonitor() {
	const enabled = useMonitorEnabled();
	const stats = useRuntimePerformance(enabled);

	return (
		<div
			className="fixed right-3 bottom-5 z-50 hidden w-60 border border-primary/20 bg-[#061018]/45 p-3 opacity-50 shadow-[0_16px_60px_rgb(0_0_0/0.2)] backdrop-blur-md transition-opacity duration-200 hover:opacity-95 md:block"
			aria-hidden="true"
		>
			<div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
				<span className="text-muted-foreground">Perf Monitor</span>
				<span className="flex items-center gap-1.5 text-primary">
					<span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_rgb(158_255_79/0.7)]" />
					{enabled ? "Live" : "Idle"}
				</span>
			</div>
			<div className="grid gap-2.5">
				{stats.map((stat) => (
					<PerformanceStat key={stat.label} {...stat} />
				))}
			</div>
		</div>
	);
}

function useMonitorEnabled() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(min-width: 768px)");
		let active = false;

		const sync = () => {
			setEnabled(active && query.matches && document.visibilityState === "visible");
		};

		const timer = window.setTimeout(() => {
			active = true;
			sync();
		}, 12000);

		query.addEventListener("change", sync);
		document.addEventListener("visibilitychange", sync);

		return () => {
			window.clearTimeout(timer);
			query.removeEventListener("change", sync);
			document.removeEventListener("visibilitychange", sync);
		};
	}, []);

	return enabled;
}

function PerformanceStat({ label, value, max, ratio, tone }: RuntimeStat) {
	const colorClass = tone === "secondary" ? "text-secondary" : "text-primary";
	const barClass = tone === "secondary" ? "bg-secondary" : "bg-primary";

	return (
		<div>
			<div className="mb-1 flex items-end justify-between gap-3">
				<span className="text-xs leading-none text-muted-foreground">{label}</span>
				<span className="font-mono text-xs leading-none">
					<span className={colorClass}>{value}</span>{" "}
					<span className="text-muted-foreground">/ {max}</span>
				</span>
			</div>
			<div className="h-1 bg-secondary/10">
				<div className={`h-full ${barClass}`} style={{ width: `${Math.round(ratio * 100)}%` }} />
			</div>
		</div>
	);
}

function useRuntimePerformance(enabled: boolean) {
	const [sample, setSample] = useState({
		fps: 60,
		frameTime: 16.7,
		heapUsedMb: 0,
		heapLimitMb: 1024,
		domNodes: 0,
		ready: false,
	});

	useEffect(() => {
		if (!enabled) return;

		let frame = 0;
		let last = performance.now();
		let lastCommit = last;
		let raf = 0;
		let totalFrameTime = 0;
		let frames = 0;

		const tick = (now: number) => {
			const delta = now - last;
			last = now;
			frame += 1;
			frames += 1;
			totalFrameTime += delta;

			if (now - lastCommit >= 700) {
				const elapsedSeconds = (now - lastCommit) / 1000;
				const memory = (
					performance as Performance & {
						memory?: {
							usedJSHeapSize: number;
							jsHeapSizeLimit: number;
						};
					}
				).memory;

				setSample({
					fps: Math.round(frame / elapsedSeconds),
					frameTime: totalFrameTime / Math.max(1, frames),
					heapUsedMb: memory ? memory.usedJSHeapSize / 1024 / 1024 : estimateMemoryFromDom(),
					heapLimitMb: memory ? memory.jsHeapSizeLimit / 1024 / 1024 : 1024,
					domNodes: document.getElementsByTagName("*").length,
					ready: true,
				});

				frame = 0;
				frames = 0;
				totalFrameTime = 0;
				lastCommit = now;
			}

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [enabled]);

	const heapMax = Math.max(256, sample.heapLimitMb || 1024);

	return [
		{
			label: "FPS",
			value: sample.ready ? String(sample.fps) : "--",
			max: "120",
			ratio: sample.ready ? clamp(sample.fps / 120, 0, 1) : 0,
			tone: "primary" as const,
		},
		{
			label: "Frame",
			value: sample.ready ? `${sample.frameTime.toFixed(1)}ms` : "--",
			max: "16ms",
			ratio: sample.ready ? clamp(sample.frameTime / 16.67, 0, 1) : 0,
			tone: "primary" as const,
		},
		{
			label: "DOM",
			value: formatNumber(sample.domNodes),
			max: "4K",
			ratio: clamp(sample.domNodes / 4000, 0, 1),
			tone: "secondary" as const,
		},
		{
			label: "Memory",
			value: `${Math.round(sample.heapUsedMb)}MB`,
			max: heapMax >= 1024 ? `${Math.round(heapMax / 1024)}GB` : `${Math.round(heapMax)}MB`,
			ratio: clamp(sample.heapUsedMb / heapMax, 0, 1),
			tone: "primary" as const,
		},
	];
}

function estimateMemoryFromDom() {
	return document.getElementsByTagName("*").length * 0.035 + 32;
}

function formatNumber(value: number) {
	return new Intl.NumberFormat("en-US").format(value);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
