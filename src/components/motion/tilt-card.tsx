"use client";

import { useCallback, useRef } from "react";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
import { cn } from "@/lib/utils";

type TiltCardProps = React.HTMLAttributes<HTMLElement> & {
	intensity?: number;
};

export function TiltCard({
	children,
	className,
	intensity = 10,
	...props
}: TiltCardProps) {
	const ref = useRef<HTMLElement>(null);
	const reducedMotion = useReducedMotionPreference();

	const reset = useCallback(() => {
		const node = ref.current;
		if (!node) return;
		node.style.setProperty("--rx", "0deg");
		node.style.setProperty("--ry", "0deg");
		node.style.setProperty("--mx", "50%");
		node.style.setProperty("--my", "50%");
	}, []);

	const handlePointerMove = useCallback(
		(event: React.PointerEvent<HTMLElement>) => {
			if (reducedMotion || event.pointerType === "touch") return;
			const node = ref.current;
			if (!node) return;

			const rect = node.getBoundingClientRect();
			const px = (event.clientX - rect.left) / rect.width;
			const py = (event.clientY - rect.top) / rect.height;
			const rotateY = (px - 0.5) * intensity;
			const rotateX = (0.5 - py) * intensity;

			node.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
			node.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
			node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
			node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
		},
		[intensity, reducedMotion],
	);

	return (
		<article
			ref={ref}
			className={cn("motion-card group", className)}
			onPointerMove={handlePointerMove}
			onPointerLeave={reset}
			{...props}
		>
			<div className="motion-card-glare" aria-hidden="true" />
			<div className="motion-card-depth">{children}</div>
		</article>
	);
}
