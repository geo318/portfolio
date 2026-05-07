"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScanLabel } from "@/components/layout/scan-label";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
import { cn } from "@/lib/utils";

export function SectionShell({
	id,
	eyebrow,
	code,
	title,
	subtitle,
	scanLabel = "Typed Content",
	scanDetail = "Next page composes this section; SectionShell is a client scroll-animation boundary.",
	children,
	className,
}: {
	id?: string;
	eyebrow: string;
	code: string;
	title?: React.ReactNode;
	subtitle?: string;
	scanLabel?: string;
	scanDetail?: string;
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLElement>(null);
	const reducedMotion = useReducedMotionPreference();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 92%", "end 8%"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 58,
		damping: 24,
		mass: 0.82,
	});
	const headerY = useTransform(smooth, [0, 0.46, 1], [74, 0, -58]);
	const contentY = useTransform(smooth, [0, 0.48, 1], [118, 0, -82]);
	const contentScale = useTransform(smooth, [0, 0.48, 1], [0.94, 1, 0.985]);
	const contentOpacity = useTransform(smooth, [0, 0.22, 0.78, 1], [0.58, 1, 1, 0.72]);

	return (
		<motion.section
			ref={ref}
			id={id}
			className={cn("super-parallax-section relative border-t border-border/40", className)}
		>
			<div className="section-depth-plane" aria-hidden="true" />
			<motion.div
				style={
					reducedMotion ? undefined : { opacity: contentOpacity, scale: contentScale, y: contentY }
				}
				className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28"
			>
				<motion.div
					style={reducedMotion ? undefined : { y: headerY }}
					className="mb-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs"
				>
					<span className="text-primary">{eyebrow}</span>
					<span>{code}</span>
				</motion.div>
				{title ? (
					<motion.div
						style={reducedMotion ? undefined : { y: headerY }}
						className="scan-target relative mb-8"
					>
						<ScanLabel detail={scanDetail}>{scanLabel}</ScanLabel>
						<h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{title}
						</h2>
						{subtitle ? (
							<p className="mt-4 max-w-3xl font-mono text-sm leading-7 text-muted-foreground">
								{subtitle}
							</p>
						) : null}
					</motion.div>
				) : null}
				{children}
			</motion.div>
		</motion.section>
	);
}
