"use client";

import { useEffect } from "react";
import { PixelMatrixBackdrop } from "@/components/motion/pixel-matrix-backdrop";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

export function InteractiveBackdrop() {
	const reducedMotion = useReducedMotionPreference();

	useEffect(() => {
		if (reducedMotion) return;

		let frame = 0;
		const root = document.documentElement;

		const syncPointer = (event: PointerEvent) => {
			if (event.pointerType === "touch") return;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const x = event.clientX / window.innerWidth - 0.5;
				const y = event.clientY / window.innerHeight - 0.5;
				root.style.setProperty("--pointer-x", String(Number((x * 2).toFixed(3))));
				root.style.setProperty("--pointer-y", String(Number((y * 2).toFixed(3))));
			});
		};

		const syncScroll = () => {
			const max = document.body.scrollHeight - window.innerHeight || 1;
			root.style.setProperty("--scroll-ratio", String(Number((window.scrollY / max).toFixed(3))));
		};

		window.addEventListener("pointermove", syncPointer, { passive: true });
		window.addEventListener("scroll", syncScroll, { passive: true });
		syncScroll();

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", syncPointer);
			window.removeEventListener("scroll", syncScroll);
			root.style.removeProperty("--pointer-x");
			root.style.removeProperty("--pointer-y");
			root.style.removeProperty("--scroll-ratio");
		};
	}, [reducedMotion]);

	return (
		<div className="interactive-backdrop" aria-hidden="true">
			<PixelMatrixBackdrop />
		</div>
	);
}
