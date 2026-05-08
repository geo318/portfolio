"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

const PixelMatrixBackdrop = dynamic(
	() => import("@/components/motion/pixel-matrix-backdrop").then((mod) => mod.PixelMatrixBackdrop),
	{ ssr: false },
);

export function InteractiveBackdrop() {
	const reducedMotion = useReducedMotionPreference();
	const desktopBackdrop = useMediaQuery("(min-width: 768px)");
	const [canvasReady, setCanvasReady] = useState(false);
	const canvasReadyRef = useRef(false);
	const idleHandleRef = useRef<number | null>(null);

	const startCanvas = useCallback(() => {
		if (canvasReadyRef.current || reducedMotion || !desktopBackdrop) return;
		canvasReadyRef.current = true;
		setCanvasReady(true);
	}, [desktopBackdrop, reducedMotion]);

	useEffect(() => {
		if (reducedMotion || !desktopBackdrop) return;

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
	}, [desktopBackdrop, reducedMotion]);

	useEffect(() => {
		if (reducedMotion || !desktopBackdrop) {
			canvasReadyRef.current = false;
			setCanvasReady(false);
			return;
		}

		const idleWindow = window as Window & {
			cancelIdleCallback?: (handle: number) => void;
			requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
		};

		const loadAfterPageSettles = window.setTimeout(() => {
			if (typeof idleWindow.requestIdleCallback === "function") {
				idleHandleRef.current = idleWindow.requestIdleCallback(startCanvas, { timeout: 1600 });
				return;
			}

			startCanvas();
		}, 14000);

		window.addEventListener("pointermove", startCanvas, { once: true, passive: true });
		window.addEventListener("pointerdown", startCanvas, { once: true, passive: true });

		return () => {
			window.clearTimeout(loadAfterPageSettles);
			if (idleHandleRef.current !== null) {
				idleWindow.cancelIdleCallback?.(idleHandleRef.current);
				idleHandleRef.current = null;
			}
			window.removeEventListener("pointermove", startCanvas);
			window.removeEventListener("pointerdown", startCanvas);
		};
	}, [desktopBackdrop, reducedMotion, startCanvas]);

	return (
		<div className="interactive-backdrop" aria-hidden="true">
			{canvasReady && desktopBackdrop && !reducedMotion ? <PixelMatrixBackdrop /> : null}
		</div>
	);
}
