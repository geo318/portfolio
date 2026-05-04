"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
import { cn } from "@/lib/utils";

export function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const reducedMotion = useReducedMotionPreference();

	return (
		<motion.div
			initial={
				reducedMotion ? false : { opacity: 0, y: 22, filter: "blur(10px)" }
			}
			whileInView={
				reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
			}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
			className={cn("will-change-transform", className)}
		>
			{children}
		</motion.div>
	);
}
