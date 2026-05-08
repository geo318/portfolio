"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ThreeShowcaseSection = dynamic(
	() =>
		import("@/components/sections/three-showcase-section").then((mod) => mod.ThreeShowcaseSection),
	{
		ssr: false,
		loading: () => <ThreeShowcasePlaceholder />,
	},
);

export function DeferredThreeShowcaseSection() {
	const ref = useRef<HTMLDivElement>(null);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (window.location.hash === "#three-lab") {
			setLoad(true);
			return;
		}

		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setLoad(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "900px 0px" },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return <div ref={ref}>{load ? <ThreeShowcaseSection /> : <ThreeShowcasePlaceholder />}</div>;
}

function ThreeShowcasePlaceholder() {
	return (
		<section id="three-lab" className="super-parallax-section relative border-t border-border/40">
			<div className="section-depth-plane" aria-hidden="true" />
			<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
				<div className="mb-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
					<span className="text-primary">Sector 03 / GL OS Workstation</span>
					<span>OS_SHELL_01</span>
				</div>
				<div className="border border-primary/20 bg-background/68 p-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
					<span className="text-primary">Deferred client workstation</span> / Loading near viewport
				</div>
			</div>
		</section>
	);
}
